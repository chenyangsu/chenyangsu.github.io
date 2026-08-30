/* Small helpers shared by /blog/ pages.
   Everything here degrades quietly: with JS off you still get the full post,
   a working nav and a real (if slightly stale) copyright year. */
(function () {
	'use strict';

	/* ---- Current year in the footer ---- */
	var yr = document.getElementById('yr');
	if (yr) yr.textContent = new Date().getFullYear();

	/* ---- Email, assembled at runtime so scrapers do not get a plain mailto ----
	   Same trick as the home page: any element with .js-email becomes a real
	   <a href="mailto:..."> keeping its classes, title and aria-label. */
	var addr = ['csu59', 'wisc', 'edu'];
	var email = addr[0] + '@' + addr[1] + '.' + addr[2];
	document.querySelectorAll('.js-email').forEach(function (el) {
		var a = document.createElement('a');
		a.href = 'mail' + 'to:' + email;
		a.innerHTML = el.innerHTML;
		a.className = el.className.replace('js-email', '').trim();
		if (el.title) a.title = el.title;
		var lbl = el.getAttribute('aria-label');
		if (lbl) a.setAttribute('aria-label', lbl);
		el.parentNode.replaceChild(a, el);
	});

	/* ---- Reading time ----
	   Counted from the rendered article so it can never drift from the text.
	   220 wpm is the usual estimate for non-fiction on screen. Any element with
	   [data-reading-time] is filled in; the markup carries no hardcoded number. */
	var prose = document.querySelector('.prose');
	var slot = document.querySelector('[data-reading-time]');
	if (prose && slot) {
		var words = (prose.innerText || prose.textContent || '').trim().split(/\s+/).length;
		var mins = Math.max(1, Math.round(words / 220));
		slot.textContent = mins + ' min read';
	}

	/* ---- Back to top, shown once the reader is well into a post ---- */
	var btt = document.getElementById('backToTop');
	if (btt) {
		window.addEventListener('scroll', function () {
			btt.classList.toggle('visible', window.scrollY > 400);
		}, { passive: true });
		btt.addEventListener('click', function () {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}
})();
