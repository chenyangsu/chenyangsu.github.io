/* Light / dark theme toggle.
   Loaded in <head> so the theme is set on <html> before the first paint;
   without this the page would flash in the wrong palette on every load. */
(function () {
	var KEY = 'theme';
	var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

	function stored() {
		try {
			var v = localStorage.getItem(KEY);
			return (v === 'light' || v === 'dark') ? v : null;
		} catch (e) {
			return null;   /* storage blocked (private mode, cookies off) */
		}
	}

	function apply(theme) {
		document.documentElement.setAttribute('data-theme', theme);
		var btn = document.getElementById('themeToggle');
		if (!btn) return;
		var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
		btn.setAttribute('aria-label', label);
		btn.setAttribute('title', label);
		btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
	}

	apply(stored() || (media && media.matches ? 'dark' : 'light'));

	/* Keep following the OS for anyone who has not picked a theme. */
	if (media && media.addEventListener) {
		media.addEventListener('change', function (e) {
			if (!stored()) apply(e.matches ? 'dark' : 'light');
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		var btn = document.getElementById('themeToggle');
		if (!btn) return;
		apply(document.documentElement.getAttribute('data-theme'));
		btn.addEventListener('click', function () {
			var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			try { localStorage.setItem(KEY, next); } catch (e) { /* storage blocked */ }
			apply(next);
		});
	});
})();
