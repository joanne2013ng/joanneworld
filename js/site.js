document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.kebab-btn');
  if (!buttons.length) return;

  function closeAllMenus(except) {
    buttons.forEach(function (btn) {
      if (btn === except) return;
      btn.setAttribute('aria-expanded', 'false');
      var menu = btn.nextElementSibling;
      if (menu) menu.hidden = true;
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var temp = document.createElement('textarea');
      temp.value = text;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.focus();
      temp.select();
      try {
        document.execCommand('copy');
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(temp);
      }
    });
  }

  buttons.forEach(function (btn) {
    var menu = btn.nextElementSibling;
    var input = menu.querySelector('.share-link-input');
    var copyBtn = menu.querySelector('.copy-link-btn');
    var feedback = menu.querySelector('.copy-feedback');
    var url = new URL(btn.dataset.shareUrl, window.location.href).href;
    input.value = url;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAllMenus(btn);
      btn.setAttribute('aria-expanded', String(!isOpen));
      menu.hidden = isOpen;
      feedback.textContent = '';
      if (!isOpen) {
        input.focus();
        input.select();
      }
    });

    menu.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    copyBtn.addEventListener('click', function () {
      copyToClipboard(url).then(
        function () {
          feedback.textContent = 'Link copied!';
        },
        function () {
          feedback.textContent = 'Could not copy — select and copy manually.';
        }
      );
    });
  });

  document.addEventListener('click', function () {
    closeAllMenus(null);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllMenus(null);
  });
});
