// Clickable prototype viewer: one screen at a time, with real hotspots from the Figma build.
(function () {
    'use strict';
    var data = window.PROTOTYPE;
    if (!data) return;
    var screens = data.screens;
    var byId = {};
    screens.forEach(function (s, i) { s.index = i; byId[s.id] = s; });

    var stage = document.getElementById('stage');
    var img = document.getElementById('screen');
    var counter = document.getElementById('counter');
    var noteTitle = document.getElementById('note-title');
    var noteBody = document.getElementById('note-body');
    var autoLine = document.getElementById('auto');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var restart = document.getElementById('restart');
    var showAll = document.getElementById('show-all');
    var autoOn = document.getElementById('auto-on');
    var list = document.getElementById('screen-list');
    var live = document.getElementById('live');
    var current = null;
    var timer = null;
    var flashTimer = null;

    function src(s) { return 'screens/' + s.image; }

    // the list of screens, for jumping around
    screens.forEach(function (s) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = s.id + ' · ' + s.title;
        b.addEventListener('click', function () { go(s.id); });
        s.listButton = b;
        li.appendChild(b);
        list.appendChild(li);
    });

    function clearTimer() { if (timer) { clearTimeout(timer); timer = null; } autoLine.textContent = ''; }

    function scheduleAuto(s) {
        clearTimer();
        if (!s.auto || !autoOn.checked) {
            if (s.auto) autoLine.textContent = 'Auto-advance is off. Click the progress card, or press Next, to move on.';
            return;
        }
        var secs = Math.round(s.auto.ms / 1000);
        autoLine.textContent = 'This screen moves on by itself after ' + secs + ' seconds, as the app would. You can also click the progress card.';
        timer = setTimeout(function () { go(s.auto.to); }, s.auto.ms);
    }

    function render(s) {
        current = s;
        img.src = src(s);
        img.alt = 'Screen ' + s.id + ': ' + s.title;
        Array.prototype.slice.call(stage.querySelectorAll('.hotspot')).forEach(function (h) { h.remove(); });
        s.links.forEach(function (l) {
            var target = byId[l.to];
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'hotspot';
            b.style.left = l.x + '%';
            b.style.top = l.y + '%';
            b.style.width = l.w + '%';
            b.style.height = l.h + '%';
            b.setAttribute('aria-label', l.label + ' (goes to screen ' + target.id + ', ' + target.title + ')');
            b.title = l.label;
            b.addEventListener('click', function (e) { e.stopPropagation(); go(l.to); });
            stage.appendChild(b);
        });
        counter.textContent = 'Screen ' + (s.index + 1) + ' of ' + screens.length + ': ' + s.title;
        noteTitle.textContent = s.note.title || s.title;
        noteBody.innerHTML = '';
        String(s.note.body || '').split('\n').forEach(function (para) {
            if (!para.trim()) return;
            var p = document.createElement('p');
            p.textContent = para;
            noteBody.appendChild(p);
        });
        prev.disabled = s.index === 0;
        next.disabled = s.index === screens.length - 1;
        screens.forEach(function (o) { if (o === s) o.listButton.setAttribute('aria-current', 'step'); else o.listButton.removeAttribute('aria-current'); });
        live.textContent = 'Screen ' + s.id + ': ' + s.title;
        // warm the cache for wherever this screen can lead
        s.links.concat(s.auto ? [{ to: s.auto.to }] : []).forEach(function (l) { var i = new Image(); i.src = src(byId[l.to]); });
        scheduleAuto(s);
    }

    function go(id, fromHistory) {
        var s = byId[id];
        if (!s) return;
        if (!fromHistory && current && current.id !== id) history.pushState({ id: id }, '', '#' + id);
        if (!fromHistory && !current) history.replaceState({ id: id }, '', '#' + id);
        render(s);
    }

    stage.addEventListener('click', function () {
        // like Figma: a click that misses shows where you can click
        stage.classList.remove('flash');
        void stage.offsetWidth;
        stage.classList.add('flash');
        clearTimeout(flashTimer);
        flashTimer = setTimeout(function () { stage.classList.remove('flash'); }, 900);
    });
    prev.addEventListener('click', function () { if (current.index > 0) go(screens[current.index - 1].id); });
    next.addEventListener('click', function () { if (current.index < screens.length - 1) go(screens[current.index + 1].id); });
    restart.addEventListener('click', function () { go(data.start); });
    showAll.addEventListener('change', function () { stage.classList.toggle('show-all', showAll.checked); });
    autoOn.addEventListener('change', function () { scheduleAuto(current); });
    window.addEventListener('popstate', function (e) { var id = (e.state && e.state.id) || location.hash.slice(1) || data.start; go(id, true); });

    var first = location.hash.slice(1);
    go(byId[first] ? first : data.start);
})();
