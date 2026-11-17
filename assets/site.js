/*
 * Page behaviour: project list and filters, the single project / post view,
 * the small-screen menu, the contact form and optional blog likes.
 *
 * No dependencies. Projects and posts come from content/site-content.js,
 * which scripts/build.js generates from the Markdown files in content/.
 */
(function () {
    'use strict';

    // ---------- Settings ----------

    // Blog likes are optional and off by default. To turn them on, create a
    // Firebase project with a Realtime Database, paste its web config object
    // here (Firebase console > Project settings > Your apps) and deploy.
    // While this is null no like button is shown and nothing loads from Firebase.
    const FIREBASE_CONFIG = null;
    // Optional: a reCAPTCHA v3 site key, to protect the database with App Check.
    const RECAPTCHA_V3_SITE_KEY = '';
    const FIREBASE_SDK = 'https://www.gstatic.com/firebasejs/10.14.1/';
    const NETWORK_TIMEOUT_MS = 8000;

    // ---------- Content ----------

    const content = window.SITE_CONTENT || null;
    const projects = content && Array.isArray(content.projects) ? content.projects : [];
    const posts = content && Array.isArray(content.posts) ? content.posts : [];
    const LISTS = { project: projects, post: posts };
    const WORDS = {
        project: { one: 'project', many: 'projects', section: 'projects', all: 'All projects' },
        post: { one: 'post', many: 'posts', section: 'blog', all: 'All posts' }
    };

    // ---------- Small helpers ----------

    const byId = id => document.getElementById(id);

    // el('a', { class: 'x', href: '#y' }, 'text', childNode)
    function el(tag, attrs, ...children) {
        const node = document.createElement(tag);
        for (const [name, value] of Object.entries(attrs || {})) {
            if (value === null || value === undefined || value === false) continue;
            if (name === 'class') node.className = value;
            else node.setAttribute(name, value === true ? '' : String(value));
        }
        node.append(...children.filter(child => child !== null && child !== undefined && child !== false));
        return node;
    }

    function hiddenText(text) {
        return el('span', { class: 'visually-hidden' }, text);
    }

    // Replaces everything inside a node.
    function fill(node, ...children) {
        while (node.firstChild) node.removeChild(node.firstChild);
        node.append(...children);
    }

    // Each feature starts on its own, so a failure in one never takes down the rest.
    function start(name, fn) {
        try {
            fn();
        } catch (error) {
            console.error(`Could not set up ${name}:`, error);
        }
    }

    function jumpTo(top) {
        try {
            window.scrollTo({ top, left: 0, behavior: 'instant' });
        } catch (error) {
            window.scrollTo(0, top);
        }
    }

    function scrollToSection(section) {
        try {
            section.scrollIntoView({ behavior: 'instant', block: 'start' });
        } catch (error) {
            section.scrollIntoView(true);
        }
    }

    function focusQuietly(node) {
        if (!node || !node.isConnected) return;
        try {
            node.focus({ preventScroll: true });
        } catch (error) {
            node.focus();
        }
    }

    function withTimeout(promise, ms) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error(`No response after ${ms} ms`)), ms);
            Promise.resolve(promise).then(
                value => { clearTimeout(timer); resolve(value); },
                error => { clearTimeout(timer); reject(error); }
            );
        });
    }

    // ---------- Lists of projects and posts ----------

    function entryNode(type, item) {
        const link = el('a', { href: `#${type}-${item.slug}` }, el('span', { class: 'entry-name' }, item.title));
        const title = el('h3', { class: 'entry-title' }, link);
        const row = el('li', { class: 'entry' }, title);

        // Second line: the subtitle when there is one (it is part of the title),
        // otherwise the one-line summary.
        if (item.subtitle) {
            link.append(el('span', { class: 'entry-subtitle' }, hiddenText(': '), item.subtitle));
        } else if (item.summary) {
            row.append(el('p', { class: 'entry-summary' }, item.summary));
        }

        if (type === 'project' && item.dates) {
            row.append(el('p', { class: 'entry-date' },
                el('span', { 'aria-hidden': 'true' }, item.dates.label),
                hiddenText(item.dates.spoken)));
        } else if (type === 'post' && item.date) {
            row.append(el('p', { class: 'entry-date' }, el('time', { datetime: item.date.iso }, item.date.label)));
        }

        const tags = Array.isArray(item.tags) ? item.tags : [];
        if (tags.length) {
            row.append(el('ul', { class: 'entry-tags', role: 'list' }, ...tags.map(tag => el('li', null, tag))));
        }
        return row;
    }

    function setupProjects() {
        const list = byId('projects-list');
        if (!list) return;

        if (!projects.length) {
            const message = content
                ? 'Projects will appear here once they are added to content/projects.'
                : 'The project list did not load. Reload the page to try again.';
            list.replaceWith(el('p', { class: 'notice' }, message));
            return;
        }

        const rows = projects.map(project => ({ project, node: entryNode('project', project) }));
        list.append(...rows.map(row => row.node));
        setupFilters(rows);
    }

    function setupFilters(rows) {
        const box = byId('projects-filters');
        const status = byId('projects-status');
        if (!box) return;

        const counts = new Map();
        for (const { project } of rows) {
            for (const tag of project.tags || []) counts.set(tag, (counts.get(tag) || 0) + 1);
        }
        if (counts.size < 2) return;   // nothing worth filtering

        const tags = [...counts.keys()].sort((a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b));
        const buttons = [null, ...tags].map(tag => {
            const button = el('button', { type: 'button', class: 'filter', 'aria-pressed': tag === null ? 'true' : 'false' },
                tag === null ? 'All' : tag,
                el('span', { class: 'count' }, hiddenText('('), String(tag === null ? rows.length : counts.get(tag)), hiddenText(')')));
            button.addEventListener('click', () => apply(tag));
            return { tag, button };
        });

        function apply(tag) {
            let visible = 0;
            for (const { project, node } of rows) {
                const match = tag === null || (project.tags || []).includes(tag);
                node.hidden = !match;
                if (match) visible += 1;
            }
            for (const entry of buttons) {
                entry.button.setAttribute('aria-pressed', entry.tag === tag ? 'true' : 'false');
            }
            if (status) {
                status.textContent = tag === null
                    ? `Showing all ${rows.length} projects`
                    : `Showing ${visible} of ${rows.length} projects: ${tag}`;
            }
        }

        box.append(...buttons.map(entry => entry.button));
        box.hidden = false;
    }

    // The Blog section and its menu link stay hidden until there is a post.
    function setupPosts() {
        const list = byId('posts-list');
        const section = byId('blog');
        const navItem = byId('nav-blog');
        if (!list || !section || !posts.length) return;
        list.append(...posts.map(post => entryNode('post', post)));
        section.hidden = false;
        if (navItem) navItem.hidden = false;
    }

    // ---------- Single project / post view ----------

    const homeView = byId('home-view');
    const detailView = byId('detail-view');
    const detail = {
        back: byId('detail-back'),
        backLabel: byId('detail-back-label'),
        meta: byId('detail-meta'),
        title: byId('detail-title'),
        subtitle: byId('detail-subtitle'),
        summary: byId('detail-summary'),
        figure: byId('detail-figure'),
        body: byId('detail-body'),
        pager: byId('detail-pager')
    };
    const baseTitle = document.title;
    const brand = document.querySelector('.brand');
    const siteName = brand ? brand.textContent.trim() : baseTitle;

    let view = 'home';
    let homeHash = '';        // the address the visitor left the main page from
    let homeScrollY = 0;      // ...and how far down they were
    let lastTrigger = null;   // ...and the link they used
    let shown = null;         // { type, slug } of the item on screen, if any

    function parseHash(hash) {
        const match = /^#(project|post)-([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(hash);
        return match ? { type: match[1], slug: match[2] } : null;
    }

    function setText(node, text) {
        node.textContent = text || '';
        node.hidden = !text;
    }

    function addMeta(label, ...value) {
        detail.meta.append(el('div', null, el('dt', null, label), el('dd', null, ...value)));
    }

    function pagerLink(type, item, direction) {
        const label = `${direction === 'prev' ? 'Previous' : 'Next'} ${WORDS[type].one}`;
        return el('a', { class: `pager-${direction}`, href: `#${type}-${item.slug}` },
            el('span', { class: 'pager-label' }, label),
            hiddenText(': '),
            el('span', { class: 'pager-title' }, item.title));
    }

    function renderDetail(type, slug) {
        const words = WORDS[type];
        const list = LISTS[type];
        const index = list.findIndex(item => item.slug === slug);
        const item = list[index];

        fill(detail.meta);
        fill(detail.pager);
        detail.pager.hidden = true;
        fill(detail.figure);
        detail.figure.hidden = true;
        hideLike();

        // With no posts the Blog section is hidden, so "back" goes to the top instead.
        const hasList = list.length > 0;
        detail.back.setAttribute('href', hasList ? `#${words.section}` : '#home');
        detail.backLabel.textContent = hasList ? words.all : 'Home';

        if (!item) {
            const name = words.one.charAt(0).toUpperCase() + words.one.slice(1);
            detail.title.textContent = `${name} not found`;
            setText(detail.subtitle, '');
            setText(detail.summary, '');
            fill(detail.body, el('p', null,
                content
                    ? `This address does not match a ${words.one} on this site. It may have been renamed or removed.`
                    : 'The content for this page did not load. Reload the page to try again.'));
            document.title = `${name} not found | ${siteName}`;
            return;
        }

        detail.title.textContent = item.title;
        setText(detail.subtitle, item.subtitle);
        setText(detail.summary, type === 'project' ? item.summary : '');

        if (type === 'project' && item.dates) {
            addMeta('Timeline', el('span', { 'aria-hidden': 'true' }, item.dates.label), hiddenText(item.dates.spoken));
        }
        if (type === 'post' && item.date) {
            addMeta('Published', el('time', { datetime: item.date.iso }, item.date.label));
            addMeta('Reading time', `${item.readingMinutes} min`);
        }
        if (Array.isArray(item.tags) && item.tags.length) {
            addMeta(type === 'project' ? 'Discipline' : 'Topics', item.tags.join(', '));
        }

        if (item.image) {
            detail.figure.append(el('img', { class: 'detail-image', src: item.image, alt: item.imageAlt || '' }));
            detail.figure.hidden = false;
        }

        // Rendered from this repository's own Markdown by scripts/build.js.
        detail.body.innerHTML = item.html || '';

        const previous = list[index - 1];
        const next = list[index + 1];
        if (previous) detail.pager.append(pagerLink(type, previous, 'prev'));
        if (next) detail.pager.append(pagerLink(type, next, 'next'));
        detail.pager.setAttribute('aria-label', `More ${words.many}`);
        detail.pager.hidden = !previous && !next;

        document.title = `${item.title} | ${siteName}`;
        if (type === 'post') showLike(item.slug);
    }

    function markCurrent(sectionId) {
        document.querySelectorAll('#nav-list a').forEach(link => {
            if (sectionId && link.getAttribute('href') === `#${sectionId}`) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    }

    function openDetail(target, isFirstLoad) {
        shown = target;
        renderDetail(target.type, target.slug);
        homeView.hidden = true;
        detailView.hidden = false;
        view = 'detail';
        markCurrent(WORDS[target.type].section);
        jumpTo(0);
        if (!isFirstLoad) focusQuietly(detail.title);
    }

    function openHome(hash, isFirstLoad) {
        let id = hash.slice(1);
        try {
            id = decodeURIComponent(id);
        } catch (error) {
            id = '';
        }
        const wasDetail = view === 'detail';
        if (wasDetail) {
            detailView.hidden = true;
            homeView.hidden = false;
            view = 'home';
            shown = null;
            hideLike();
            document.title = baseTitle;
            markCurrent(null);
        }

        // Worked out only now that the main page is showing again.
        const section = id ? byId(id) : null;
        const reachable = Boolean(section) && homeView.contains(section) && !section.closest('[hidden]');

        if (wasDetail) {
            // Back to the list the visitor came from: put them where they were.
            const cameFromHere = Boolean(lastTrigger) && lastTrigger.isConnected &&
                (hash === homeHash || (reachable && section.contains(lastTrigger)));
            if (cameFromHere) {
                jumpTo(homeScrollY);
                focusQuietly(lastTrigger);
            } else if (reachable) {
                scrollToSection(section);
            } else {
                jumpTo(0);
            }
        } else if (isFirstLoad && reachable) {
            settleAnchor(section, hash);
        }
    }

    // Web fonts can shift the layout just after load. If the page opened at a
    // section link and the visitor has not started using it, line the section up again.
    function settleAnchor(section, hash) {
        if (!document.fonts || !document.fonts.ready) return;
        let touched = false;
        const touch = () => { touched = true; };
        ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(type =>
            window.addEventListener(type, touch, { once: true, passive: true }));
        document.fonts.ready.then(() => {
            if (!touched && view === 'home' && location.hash === hash) scrollToSection(section);
        });
    }

    function route(isFirstLoad) {
        const hash = location.hash;
        const target = parseHash(hash);
        if (target) openDetail(target, isFirstLoad);
        else openHome(hash, isFirstLoad);
    }

    function setupRouting() {
        if (!homeView || !detailView || Object.values(detail).some(node => !node)) return;
        // Remember where the visitor left the main page: the link they used, the
        // address and how far down they were. This is read at the click itself,
        // because by the time the address changes on Back or Forward the browser
        // may already have moved the page.
        document.addEventListener('click', event => {
            const link = event.target.closest && event.target.closest('a[href^="#project-"], a[href^="#post-"]');
            if (link && view === 'home') {
                lastTrigger = link;
                homeHash = location.hash;
                homeScrollY = window.scrollY;
            }
        });
        window.addEventListener('hashchange', () => route(false));
        route(true);
    }

    // ---------- Blog likes (optional, see Settings) ----------

    const likes = { db: null, counts: new Map(), busy: new Set() };
    const likeBox = byId('detail-like');
    const likeButton = byId('like-button');
    const likeCount = byId('like-count');
    const likeStatus = byId('like-status');

    function loadScript(src) {
        return withTimeout(new Promise((resolve, reject) => {
            const script = el('script', { src });
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Could not load ${src}`));
            document.head.append(script);
        }), NETWORK_TIMEOUT_MS);
    }

    function hasLiked(slug) {
        try {
            return localStorage.getItem(`liked-${slug}`) === 'true';
        } catch (error) {
            return false;   // storage unavailable (private mode and similar)
        }
    }

    function rememberLiked(slug, liked) {
        try {
            localStorage.setItem(`liked-${slug}`, liked ? 'true' : 'false');
        } catch (error) {
            // Nothing to do: the like still counts, it just is not remembered here.
        }
    }

    function hideLike() {
        if (likeBox) likeBox.hidden = true;
    }

    function drawLike(slug) {
        if (!likeBox || !shown || shown.type !== 'post' || shown.slug !== slug || !likes.counts.has(slug)) return;
        const liked = hasLiked(slug);
        const count = likes.counts.get(slug);
        likeButton.textContent = liked ? 'Liked' : 'Like';
        likeButton.setAttribute('aria-pressed', liked ? 'true' : 'false');
        likeButton.disabled = likes.busy.has(slug);
        likeCount.textContent = `${count} ${count === 1 ? 'like' : 'likes'}`;
        likeBox.hidden = false;
    }

    // Shows the like button once the count has arrived. A slow or unreachable
    // database only means no button; the post itself never waits for it.
    async function showLike(slug) {
        if (!likes.db) return;
        try {
            const snapshot = await withTimeout(likes.db.child(slug).child('count').once('value'), NETWORK_TIMEOUT_MS);
            const value = snapshot.val();
            likes.counts.set(slug, typeof value === 'number' ? value : 0);
            drawLike(slug);
        } catch (error) {
            console.warn('Like count unavailable:', error);
        }
    }

    async function toggleLike() {
        if (!likes.db || !shown || shown.type !== 'post') return;
        const slug = shown.slug;
        if (likes.busy.has(slug)) return;
        likes.busy.add(slug);
        drawLike(slug);
        const wasLiked = hasLiked(slug);
        let message = '';
        try {
            // Add or remove one like atomically; never go below zero.
            const result = await withTimeout(likes.db.child(slug).child('count').transaction(current => {
                const next = (typeof current === 'number' ? current : 0) + (wasLiked ? -1 : 1);
                return next < 0 ? undefined : next;
            }), NETWORK_TIMEOUT_MS);
            if (result && result.committed) {
                rememberLiked(slug, !wasLiked);
                likes.counts.set(slug, result.snapshot.val());
                message = wasLiked ? 'Like removed' : 'Liked';
            }
        } catch (error) {
            console.warn('Could not save the like:', error);
            message = 'Your like could not be saved. Try again in a moment.';
        }
        likes.busy.delete(slug);
        drawLike(slug);
        if (likeStatus) likeStatus.textContent = message;
    }

    async function setupLikes() {
        if (!FIREBASE_CONFIG || !posts.length || !likeBox || !likeButton || !likeCount) return;
        try {
            await loadScript(`${FIREBASE_SDK}firebase-app-compat.js`);
            await loadScript(`${FIREBASE_SDK}firebase-database-compat.js`);
            if (RECAPTCHA_V3_SITE_KEY) await loadScript(`${FIREBASE_SDK}firebase-app-check-compat.js`);
            const firebase = window.firebase;
            firebase.initializeApp(FIREBASE_CONFIG);
            if (RECAPTCHA_V3_SITE_KEY && typeof firebase.appCheck === 'function') {
                firebase.appCheck().activate(RECAPTCHA_V3_SITE_KEY, true);
            }
            likes.db = firebase.database().ref('blog-likes');
            likeButton.addEventListener('click', toggleLike);
            if (shown && shown.type === 'post') showLike(shown.slug);
        } catch (error) {
            console.warn('Blog likes are unavailable:', error);
        }
    }

    // ---------- Menu (small screens) ----------

    function setupMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const list = byId('nav-list');
        if (!toggle || !list) return;

        const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
        const setOpen = open => {
            list.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.textContent = open ? 'Close' : 'Menu';
        };

        toggle.addEventListener('click', () => setOpen(!isOpen()));
        list.addEventListener('click', event => {
            if (event.target.closest('a')) setOpen(false);
        });
        document.addEventListener('click', event => {
            if (isOpen() && !event.target.closest('.site-header')) setOpen(false);
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && isOpen()) {
                setOpen(false);
                toggle.focus();
            }
        });

        // Leaving the small-screen layout closes the menu.
        const wide = window.matchMedia('(min-width: 52.0625rem)');
        const onChange = event => { if (event.matches) setOpen(false); };
        if (wide.addEventListener) wide.addEventListener('change', onChange);
        else if (wide.addListener) wide.addListener(onChange);
    }

    // ---------- Display choices: dark mode and dyslexia-friendly font ----------

    // Both choices are kept in the browser, and applied before first paint by
    // the small script in the page head. Dark is the default.
    function setupPrefs() {
        const root = document.documentElement;
        const themeButton = byId('theme-toggle');
        const fontButton = byId('font-toggle');
        const themeColor = document.querySelector('meta[name="theme-color"]');
        const save = (key, value) => {
            try {
                localStorage.setItem(key, value);
            } catch (error) {
                // Storage unavailable: the choice lasts for this visit only.
            }
        };

        function drawTheme() {
            const dark = root.getAttribute('data-theme') !== 'light';
            if (themeButton) themeButton.setAttribute('aria-pressed', dark ? 'true' : 'false');
            if (themeColor) themeColor.setAttribute('content', dark ? '#121212' : '#ffffff');
        }
        function drawFont() {
            const on = root.getAttribute('data-font') === 'dyslexic';
            if (fontButton) fontButton.setAttribute('aria-pressed', on ? 'true' : 'false');
        }

        if (themeButton) {
            themeButton.addEventListener('click', () => {
                const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
                root.setAttribute('data-theme', next);
                save('theme', next);
                drawTheme();
            });
        }
        if (fontButton) {
            fontButton.addEventListener('click', () => {
                const on = root.getAttribute('data-font') !== 'dyslexic';
                if (on) root.setAttribute('data-font', 'dyslexic');
                else root.removeAttribute('data-font');
                save('font', on ? 'dyslexic' : 'default');
                drawFont();
            });
        }
        drawTheme();
        drawFont();
    }

    // ---------- Skills: press one to see where it was used ----------

    // Every role, every point under a role (data-skills in index.html) and every
    // project (the "skills" line in its .md file) lists the skills it involved,
    // spelled exactly as in the Skills section. A skill used somewhere becomes a
    // button; pressing it lists that work right under its group.
    function setupSkills() {
        const chips = [...document.querySelectorAll('#skills .chips li')];
        if (!chips.length) return;
        const listed = node => (node.getAttribute('data-skills') || '').split('|').map(name => name.trim()).filter(Boolean);
        const text = node => (node ? node.textContent.trim() : '');

        const roles = [...document.querySelectorAll('#experience .role')].map(role => ({
            id: role.id,
            title: text(role.querySelector('.role-name')),
            org: text(role.querySelector('.role-org')),
            skills: listed(role),
            points: [...role.querySelectorAll('.points li')].map(point => ({ node: point, skills: listed(point) }))
        }));

        function find(skill) {
            const inRoles = roles
                .map(role => ({ role, points: role.points.filter(point => point.skills.includes(skill)) }))
                .filter(match => match.points.length || match.role.skills.includes(skill));
            const inProjects = projects.filter(project => Array.isArray(project.skills) && project.skills.includes(skill));
            return { inRoles, inProjects, total: inRoles.length + inProjects.length };
        }

        const status = el('p', { class: 'visually-hidden', role: 'status' });
        const panel = el('div', { class: 'skill-results', hidden: true });
        let active = null;   // { skill, button }

        function close() {
            if (active) active.button.setAttribute('aria-pressed', 'false');
            active = null;
            panel.hidden = true;
            status.textContent = '';
        }

        function open(skill, button, found) {
            if (active) active.button.setAttribute('aria-pressed', 'false');
            active = { skill, button };
            button.setAttribute('aria-pressed', 'true');

            const closeButton = el('button', { type: 'button', class: 'skill-results-close' }, 'Clear');
            closeButton.addEventListener('click', () => {
                const last = active && active.button;
                close();
                focusQuietly(last);
            });
            fill(panel, el('div', { class: 'skill-results-head' }, el('h4', { class: 'skill-results-title' }, skill), closeButton));

            if (found.inRoles.length) {
                panel.append(el('p', { class: 'skill-results-label' }, 'Experience'));
                panel.append(el('ul', { class: 'skill-results-list', role: 'list' }, ...found.inRoles.map(({ role, points }) => {
                    const item = el('li', null, el('a', { href: `#${role.id}` }, role.title), el('span', { class: 'skill-results-org' }, hiddenText(', '), role.org));
                    if (points.length) {
                        const list = el('ul', { class: 'points', role: 'list' });
                        for (const point of points) {
                            const copy = el('li');
                            copy.innerHTML = point.node.innerHTML;   // this page's own markup
                            list.append(copy);
                        }
                        item.append(list);
                    }
                    return item;
                })));
            }
            if (found.inProjects.length) {
                panel.append(el('p', { class: 'skill-results-label' }, 'Projects'));
                panel.append(el('ul', { class: 'skill-results-list', role: 'list' }, ...found.inProjects.map(project =>
                    el('li', null,
                        el('a', { href: `#project-${project.slug}` }, project.title),
                        project.subtitle ? el('span', { class: 'skill-results-org' }, hiddenText(': '), project.subtitle) : null))));
            }

            // Show the results right under the group the skill belongs to.
            button.closest('.skill-group').append(panel);
            panel.hidden = false;
            const count = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
            status.textContent = `${skill}: ${count(found.inRoles.length, 'role')} and ${count(found.inProjects.length, 'project')} listed below the group`;
        }

        for (const chip of chips) {
            const skill = text(chip);
            const found = find(skill);
            if (!found.total) continue;   // not tied to a role or project: stays a plain label
            const button = el('button', { type: 'button', class: 'chip-button', 'aria-pressed': 'false' },
                skill, el('span', { class: 'count' }, hiddenText('('), String(found.total), hiddenText(')')));
            button.addEventListener('click', () => {
                if (active && active.button === button) close();
                else open(skill, button, found);
            });
            fill(chip, button);
            chip.classList.add('has-button');
        }
        const body = document.querySelector('#skills .section-body');
        if (body) body.append(status);
    }

    // ---------- Name in the header ----------

    // The name is shown once at a time: large in the intro, or small in the
    // header after the intro's name has scrolled up behind it. On a project or
    // post page the intro is not shown, so the header keeps the name.
    function setupBrand() {
        const root = document.documentElement;
        const name = byId('hero-name');
        const header = document.querySelector('.site-header');
        if (!name || !header || !('IntersectionObserver' in window)) {
            root.classList.remove('name-in-view');
            return;
        }
        const observer = new IntersectionObserver(entries => {
            root.classList.toggle('name-in-view', entries[entries.length - 1].isIntersecting);
        }, { rootMargin: `-${Math.round(header.getBoundingClientRect().height)}px 0px 0px 0px` });
        observer.observe(name);
    }

    // ---------- Skip link ----------

    // Moves focus to the content without changing the address (which would
    // otherwise close an open project). The content area is only focusable for
    // that moment, so ordinary clicks inside it do not steal focus.
    function setupSkipLink() {
        const link = document.querySelector('.skip-link');
        const main = byId('main');
        if (!link || !main) return;
        link.addEventListener('click', event => {
            event.preventDefault();
            main.setAttribute('tabindex', '-1');
            main.focus();
            main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true });
        });
    }

    // ---------- Contact form ----------

    // There is no server behind this site, so the form hands the message to
    // the visitor's own email app. It never claims a message was sent.
    function setupContactForm() {
        const form = byId('contact-form');
        const status = byId('contact-status');
        if (!form || !status) return;
        const address = (form.getAttribute('action') || '').replace(/^mailto:/i, '');
        if (!address) return;

        form.addEventListener('submit', event => {
            event.preventDefault();
            const nameField = form.elements.name;
            const messageField = form.elements.message;
            const name = nameField.value.trim();
            const message = messageField.value.trim();
            if (!name || !message) {
                status.textContent = 'Add your name and a message first.';
                (name ? messageField : nameField).focus();
                return;
            }
            const subject = encodeURIComponent(`Portfolio message from ${name}`);
            const body = encodeURIComponent(`${message}\n\n${name}`);
            const url = `mailto:${address}?subject=${subject}&body=${body}`;
            // Very long addresses are dropped by some email apps and browsers.
            if (url.length > 1900) {
                status.textContent = `This message is too long to hand to an email app. Copy it and send it to ${address} instead.`;
                return;
            }
            window.location.href = url;
            // Some browsers block that hand-off, so the same draft is also offered as a link.
            fill(status,
                'A draft should now be open in your email app. If nothing opened, ',
                el('a', { href: url }, 'open the draft'),
                ` or write to ${address} directly.`);
        });
    }

    // ---------- Footer ----------

    function setupFooter() {
        const year = byId('footer-year');
        if (year) year.textContent = String(new Date().getFullYear());
    }

    // ---------- Start ----------

    start('the display choices', setupPrefs);
    start('the header name', setupBrand);
    start('the menu', setupMenu);
    start('the skip link', setupSkipLink);
    start('the contact form', setupContactForm);
    start('the footer', setupFooter);
    start('the project list', setupProjects);
    start('the blog list', setupPosts);
    start('the skills', setupSkills);
    start('page navigation', setupRouting);
    setupLikes();
})();
