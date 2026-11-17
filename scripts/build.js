#!/usr/bin/env node
'use strict';

/*
 * Builds content/site-content.js, the one file the site reads its projects
 * and blog posts from.
 *
 *   node scripts/build.js            build once
 *   node scripts/build.js --watch    rebuild whenever a content file changes
 *
 * Sources:  content/projects/*.md  and  content/blog/*.md
 *
 * The deploy workflow runs this on every push, so publishing is just:
 * add or edit a .md file, then push. No packages to install.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { marked } = require('./vendor/marked.umd.cjs');

const ROOT = path.join(__dirname, '..');
const OUTPUT = path.join(ROOT, 'content', 'site-content.js');
const PAGE = path.join(ROOT, 'index.html');
// Files index.html loads that change between deploys. Each gets a version
// stamp (?v=...) made from its contents, so a browser never pairs a new page
// with an old stylesheet or script it saved earlier.
const STAMPED = ['assets/site.css', 'assets/site.js', 'content/site-content.js'];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const YEAR_MONTH_RE = /^(\d{4})-(0[1-9]|1[0-2])$/;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

// ---------- Frontmatter ----------

function unquote(value) {
    const m = value.match(/^(['"])(.*)\1$/);
    return m ? m[2] : value;
}

// Reads the "key: value" block between the --- lines at the top of a file.
// Lists are written as [one, two, three].
function parseFrontmatter(text, where, errors) {
    const source = (text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text).replace(/\r\n?/g, '\n');
    const match = source.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n|$)([\s\S]*)$/);
    if (!match) {
        errors.push(`${where}: the file must start with a frontmatter block (title and other fields between two --- lines)`);
        return { data: {}, body: source };
    }
    const data = {};
    match[1].split('\n').forEach((line, i) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const idx = line.indexOf(':');
        const key = idx === -1 ? '' : line.slice(0, idx).trim();
        if (!key) {
            errors.push(`${where}: line ${i + 2} of the frontmatter is not written as "key: value"`);
            return;
        }
        const value = line.slice(idx + 1).trim();
        data[key] = value.startsWith('[') && value.endsWith(']')
            ? value.slice(1, -1).split(',').map(v => unquote(v.trim())).filter(Boolean)
            : unquote(value);
    });
    return { data, body: match[2] };
}

function asList(value) {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
}

// ---------- Dates ----------

function monthName(yearMonth, short) {
    const name = MONTHS[Number(yearMonth.slice(5, 7)) - 1];
    return short ? name.slice(0, 3) : name;
}

// start / end are "YYYY-MM"; end may also be "present" or left out.
function projectDates(start, end, where, errors) {
    if (!start) return null;
    if (!YEAR_MONTH_RE.test(start)) {
        errors.push(`${where}: "start" must look like 2026-08 (year-month), not "${start}"`);
        return null;
    }
    const ongoing = /^present$/i.test(end || '');
    if (end && !ongoing && !YEAR_MONTH_RE.test(end)) {
        errors.push(`${where}: "end" must look like 2026-11 (year-month) or "present", not "${end}"`);
        return null;
    }
    if (end && !ongoing && end < start) {
        errors.push(`${where}: "end" (${end}) is earlier than "start" (${start})`);
        return null;
    }
    const startYear = start.slice(0, 4);
    const first = { short: `${monthName(start, true)} ${startYear}`, long: `${monthName(start)} ${startYear}` };
    if (ongoing) {
        return { start, end: 'present', label: `${first.short} – Present`, spoken: `${first.long} to present` };
    }
    if (!end || end === start) {
        return { start, end: start, label: first.short, spoken: first.long };
    }
    const endYear = end.slice(0, 4);
    if (endYear === startYear) {
        return {
            start, end,
            label: `${monthName(start, true)} – ${monthName(end, true)} ${endYear}`,
            spoken: `${monthName(start)} to ${monthName(end)} ${endYear}`
        };
    }
    return {
        start, end,
        label: `${first.short} – ${monthName(end, true)} ${endYear}`,
        spoken: `${first.long} to ${monthName(end)} ${endYear}`
    };
}

// Accepts 2026-11-20 (preferred) or anything JavaScript can read, such as "November 20, 2026".
function postDate(value) {
    if (!value) return null;
    let year, month, day;
    const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (iso) {
        [year, month, day] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
        const check = new Date(Date.UTC(year, month - 1, day));
        if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return null;
    } else {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return null;
        [year, month, day] = [parsed.getFullYear(), parsed.getMonth() + 1, parsed.getDate()];
    }
    const pad = n => String(n).padStart(2, '0');
    return {
        iso: `${year}-${pad(month)}-${pad(day)}`,
        label: `${MONTHS[month - 1]} ${day}, ${year}`,
        sort: year * 10000 + month * 100 + day
    };
}

// ---------- Markdown ----------

// Plain-text preview of a post, used when it has no "summary" field:
// the opening paragraphs of the rendered post, without tags.
function makeExcerpt(html, length) {
    const text = (html.match(/<p>[\s\S]*?<\/p>/g) || [])
        .map(p => p.replace(/<[^>]+>/g, ''))
        .join(' ')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > length ? text.slice(0, length).replace(/\s+\S*$/, '') + '…' : text;
}

function renderMarkdown(markdown) {
    let html = marked.parse(markdown, { gfm: true, async: false }).trim();
    // The page already has an <h1> (the title), so body headings start at <h2>.
    if (/<h1[\s>]/.test(html)) {
        html = html.replace(/<(\/?)h([1-5])(?=[\s>])/g, (_, slash, level) => `<${slash}h${Number(level) + 1}`);
    }
    return html
        .replace(/<a href="(https?:\/\/[^"]*)"/g, '<a href="$1" rel="noopener noreferrer"')
        .replace(/<img /g, '<img loading="lazy" decoding="async" ')
        .replace(/<table>/g, '<div class="table-scroll" role="region" aria-label="Table" tabindex="0"><table>')
        .replace(/<\/table>/g, '</table></div>');
}

// Only http(s) links or paths inside this site are accepted for images.
function safeImage(value) {
    const url = String(value || '').trim();
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//')) return '';
    return url;
}

// ---------- Reading the content folders ----------

function readEntries(dir, errors) {
    const full = path.join(ROOT, 'content', dir);
    if (!fs.existsSync(full)) return [];
    return fs.readdirSync(full)
        .filter(file => file.endsWith('.md'))
        .sort()
        .map(file => {
            const where = `content/${dir}/${file}`;
            const slug = file.slice(0, -3);
            if (!SLUG_RE.test(slug) || slug.length > 80) {
                errors.push(`${where}: file names use lowercase letters, numbers and single hyphens only (for example my-new-post.md)`);
            }
            const { data, body } = parseFrontmatter(fs.readFileSync(path.join(full, file), 'utf8'), where, errors);
            return { where, slug, data, body };
        })
        .filter(entry => String(entry.data.draft).toLowerCase() !== 'true');
}

function buildProjects(errors) {
    return readEntries('projects', errors)
        .map(({ where, slug, data, body }) => {
            if (!data.title) errors.push(`${where}: add a "title" to the frontmatter`);
            const order = data.order === undefined || data.order === '' ? Number.MAX_SAFE_INTEGER : Number(data.order);
            if (Number.isNaN(order)) errors.push(`${where}: "order" must be a number, not "${data.order}"`);
            return {
                order,
                item: {
                    slug,
                    title: data.title || slug,
                    subtitle: data.subtitle || '',
                    summary: data.summary || '',
                    dates: projectDates(data.start, data.end, where, errors),
                    tags: asList(data.tags),
                    // Skill names exactly as they appear in the Skills section, separated by " | ".
                    skills: String(data.skills || '').split('|').map(skill => skill.trim()).filter(Boolean),
                    html: renderMarkdown(body)
                }
            };
        })
        .sort((a, b) => a.order - b.order || a.item.slug.localeCompare(b.item.slug))
        .map(entry => entry.item);
}

function buildPosts(errors) {
    return readEntries('blog', errors)
        .map(({ where, slug, data, body }) => {
            if (!data.title) errors.push(`${where}: add a "title" to the frontmatter`);
            const date = postDate(data.date);
            if (!date) errors.push(`${where}: add a "date" to the frontmatter, written like 2026-11-20`);
            const image = safeImage(data.image);
            if (data.image && !image) errors.push(`${where}: "image" must be an http(s) address or a path inside this site`);
            const words = body.trim().split(/\s+/).filter(Boolean).length;
            const html = renderMarkdown(body);
            return {
                sort: date ? date.sort : 0,
                item: {
                    slug,
                    title: data.title || slug,
                    summary: data.summary || makeExcerpt(html, 180),
                    date: date ? { iso: date.iso, label: date.label } : null,
                    readingMinutes: Math.max(1, Math.ceil(words / 200)),
                    tags: asList(data.tags),
                    image,
                    imageAlt: data.image_alt || '',
                    html
                }
            };
        })
        .sort((a, b) => b.sort - a.sort || a.item.slug.localeCompare(b.item.slug))   // newest first
        .map(entry => entry.item);
}

// ---------- Output ----------

// Returns the text of content/site-content.js without writing it.
function generate() {
    const errors = [];
    const projects = buildProjects(errors);
    const posts = buildPosts(errors);
    // Everything outside plain ASCII is written as an escape, so the file reads
    // the same whatever character encoding a server or browser assumes for it.
    const json = JSON.stringify({ projects, posts }, null, 2)
        .replace(/[^\x00-\x7f]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
    const source =
        '/* Generated by scripts/build.js from content/projects and content/blog.\n' +
        '   Do not edit this file by hand: edit the .md files and run the build. */\n' +
        `window.SITE_CONTENT = ${json};\n`;
    return { source, projects, posts, errors, page: stampPage(source) };
}

// Returns index.html with a current version stamp on each stamped file.
function stampPage(contentSource) {
    let page = fs.readFileSync(PAGE, 'utf8');
    for (const file of STAMPED) {
        const data = file === 'content/site-content.js' ? contentSource : fs.readFileSync(path.join(ROOT, file));
        const version = crypto.createHash('sha256').update(data).digest('hex').slice(0, 10);
        const escaped = file.replace(/[.\/]/g, '\\$&');
        page = page.replace(new RegExp(`"${escaped}(?:\\?v=[0-9a-f]*)?"`, 'g'), `"${file}?v=${version}"`);
    }
    return page;
}

function build() {
    const { source, projects, posts, errors, page } = generate();
    if (errors.length) {
        console.error(`Content problems (${errors.length}):\n  ` + errors.join('\n  '));
        return false;
    }
    fs.writeFileSync(OUTPUT, source);
    if (page !== fs.readFileSync(PAGE, 'utf8')) fs.writeFileSync(PAGE, page);
    console.log(`Wrote content/site-content.js: ${projects.length} projects, ${posts.length} posts`);
    return true;
}

function watch() {
    build();
    let timer = null;
    for (const dir of ['projects', 'blog']) {
        const full = path.join(ROOT, 'content', dir);
        if (!fs.existsSync(full)) continue;
        fs.watch(full, () => {
            clearTimeout(timer);
            timer = setTimeout(build, 150);
        });
    }
    console.log('Watching content/projects and content/blog. Press Ctrl+C to stop.');
}

if (require.main === module) {
    if (process.argv.includes('--watch')) watch();
    else if (!build()) process.exit(1);
}

module.exports = { generate, OUTPUT, PAGE, ROOT };
