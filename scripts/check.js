#!/usr/bin/env node
'use strict';

/*
 * Checks the site before it is published:  node scripts/check.js
 * The deploy workflow runs this too and stops the deploy if anything fails.
 *
 *   1. Every content file is valid (the same rules the build applies).
 *   2. content/site-content.js is up to date with the Markdown files.
 *   3. index.html has no duplicate ids, every in-page link has a target,
 *      and every local file it points to exists.
 *   4. Every element the script looks up by id exists in index.html.
 *   5. Every file the stylesheet points to exists.
 */

const fs = require('fs');
const path = require('path');
const { generate, OUTPUT, PAGE, ROOT } = require('./build.js');

const problems = [];
const read = file => fs.readFileSync(path.join(ROOT, file), 'utf8');
const exists = file => fs.existsSync(path.join(ROOT, file));
const isExternal = url => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url);
const stripQuery = url => url.split('#')[0].split('?')[0];

// 1 and 2: content
const { source, projects, posts, errors, page } = generate();
problems.push(...errors);
if (!errors.length) {
    const onDisk = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : null;
    if (onDisk === null) {
        problems.push('content/site-content.js is missing. Run: node scripts/build.js');
    } else if (onDisk !== source) {
        problems.push('content/site-content.js is out of date. Run: node scripts/build.js');
    }
    if (page !== fs.readFileSync(PAGE, 'utf8')) {
        problems.push('index.html has old version stamps on its stylesheet or scripts. Run: node scripts/build.js');
    }
}

// 3: index.html
const html = read('index.html').replace(/<!--[\s\S]*?-->/g, '');
const ids = [...html.matchAll(/\sid="([^"]*)"/g)].map(m => m[1]);
const idSet = new Set(ids);
for (const id of idSet) {
    if (ids.filter(other => other === id).length > 1) problems.push(`index.html: the id "${id}" is used more than once`);
    // Addresses starting with #project- and #post- open a project or post.
    if (/^(?:project|post)-/.test(id)) problems.push(`index.html: the id "${id}" clashes with project/post addresses; rename it`);
}

const links = [...html.matchAll(/\s(?:href|src)="([^"]*)"/g)].map(m => m[1]);
for (const url of links) {
    if (url.startsWith('#')) {
        const target = url.slice(1);
        if (target && !idSet.has(target)) problems.push(`index.html: the link "${url}" has no matching id on the page`);
    } else if (!isExternal(url)) {
        const file = stripQuery(url);
        if (file && !exists(file)) problems.push(`index.html: "${url}" points to a file that does not exist`);
    }
}

for (const attr of [...html.matchAll(/\s(?:aria-labelledby|aria-describedby|aria-controls|for)="([^"]*)"/g)]) {
    for (const id of attr[1].split(/\s+/).filter(Boolean)) {
        if (!idSet.has(id)) problems.push(`index.html: "${attr[0].trim()}" refers to a missing id "${id}"`);
    }
}

// 4: ids the script relies on
const script = read('assets/site.js');
for (const m of script.matchAll(/byId\('([^']+)'\)/g)) {
    if (!idSet.has(m[1])) problems.push(`assets/site.js looks for id "${m[1]}", which is not in index.html`);
}

// 5: files the stylesheet relies on
const css = read('assets/site.css').replace(/\/\*[\s\S]*?\*\//g, '');
for (const m of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    if (!isExternal(m[1]) && !exists(path.join('assets', stripQuery(m[1])))) {
        problems.push(`assets/site.css: "${m[1]}" points to a file that does not exist`);
    }
}

if (problems.length) {
    console.error(`Found ${problems.length} problem${problems.length === 1 ? '' : 's'}:\n  ` + problems.join('\n  '));
    process.exit(1);
}
console.log(`All checks passed: ${projects.length} projects, ${posts.length} posts, ${idSet.size} ids, ${links.length} links.`);
