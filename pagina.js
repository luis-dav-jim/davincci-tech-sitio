(function () {
  'use strict';
  var menu = document.querySelector('.menu');
  if (menu) {
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.open = false; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
    menu.addEventListener('toggle', function () { document.documentElement.classList.toggle('menu-abierto', menu.open); });
  }
})();
(function () {
  'use strict';
  var caja = document.getElementById('logoDespliega'), resto = document.querySelector('.heroe-resto');
  if (!caja || !resto || !window.LogoAnimado || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var logo = window.LogoAnimado(caja, { ancla: 'izquierda' });
  var hueco = 0, cuadro = 0, tramo = 1;
  function medir() {
    var enLinea = resto.offsetTop < caja.offsetTop + caja.offsetHeight * 0.8;
    hueco = enLinea ? caja.offsetWidth * (100 / 186) : 0;
    tramo = Math.max(40, Math.min(innerHeight * 0.25, caja.getBoundingClientRect().top + scrollY - 64 - 56));
    pintar();
  }
  function pintar() {
    cuadro = 0;
    var p = Math.min(1, scrollY / tramo), t = Math.min(1, p / 0.92);
    logo.dibujar(p);
    resto.style.transform = hueco ? 'translateX(' + (-(1 - (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)) * hueco).toFixed(1) + 'px)' : '';
  }
  addEventListener('scroll', function () { cuadro = cuadro || requestAnimationFrame(pintar); }, { passive: true });
  addEventListener('resize', medir);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
  medir();
})();
