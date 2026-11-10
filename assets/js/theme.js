// Light/dark toggle. Light is the default; a visitor's choice is remembered
// in their browser. The saved theme is applied early by a one-line script in
// <head> (see _layouts/default.html) so the page doesn't flash on load.
(function () {
  var button = document.querySelector('.theme-toggle');
  if (!button) return;
  var root = document.documentElement;

  function sync() {
    var dark = root.dataset.theme === 'dark';
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.title = dark ? 'Light mode' : 'Dark mode';
  }

  button.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (next === 'dark') root.dataset.theme = 'dark'; else delete root.dataset.theme;
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });

  sync();
  button.hidden = false;
})();
