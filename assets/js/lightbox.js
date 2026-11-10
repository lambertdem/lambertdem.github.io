// Minimal lightbox for `.zoom` links in a `.photo-grid`. No dependencies.
// Without JS (or without <dialog> support) the links still open the full image.
(function () {
  var links = document.querySelectorAll('.photo-grid a.zoom');
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML =
    '<button type="button" aria-label="Close">&times;</button>' +
    '<figure style="margin:0"><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(dialog);

  var img = dialog.querySelector('img');
  var caption = dialog.querySelector('figcaption');

  dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
  // Clicking the backdrop (outside the image) closes it.
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', function () { img.removeAttribute('src'); });

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      img.src = link.getAttribute('href');
      img.alt = link.title || '';
      caption.textContent = link.title || '';
      dialog.showModal();
    });
  });
})();
