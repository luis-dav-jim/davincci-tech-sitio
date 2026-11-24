window.LogoAnimado = function (box, opciones) {
  'use strict';
  var svg = box.querySelector('svg'), orig = box.querySelector('#lg-orig'), anim = box.querySelector('#lg-anim');
  var por = function (id) { return box.querySelector('#' + id); };
  var pal = por('lg-pal'), br = por('lg-brush');
  var letras = [['lg-a', .34, .56], ['lg-V', .46, .68], ['lg-i1', .54, .74], ['lg-n', .62, .80], ['lg-c1', .70, .88], ['lg-c2', .78, .94], ['lg-i2', .86, 1]].map(function (x) { return [por(x[0]), x[1], x[2]]; });
  var C0 = opciones && opciones.ancla === 'izquierda' ? 0 : 49.5, VX = 91.44, VB = 43.7, K = 0.5, ANG = -112;
  var cl = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  var fac = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  svg.setAttribute('viewBox', '1.5 0 186 64');
  orig.setAttribute('display', 'none'); anim.removeAttribute('display');
  function dibujar(p) {
    var g = fac(cl(p / .7));
    pal.setAttribute('transform', 'translate(' + (C0 * (1 - g)).toFixed(2) + ' 0)');
    br.setAttribute('transform', 'translate(' + lerp(62 + C0, VX, g).toFixed(2) + ' ' + lerp(58, VB, g).toFixed(2) + ') rotate(' + lerp(-72, ANG, g).toFixed(2) + ') scale(' + lerp(1, K, g).toFixed(3) + ')');
    for (var i = 0; i < letras.length; i++) letras[i][0].style.opacity = cl((p - letras[i][1]) / (letras[i][2] - letras[i][1]));
    return g;
  }
  dibujar(0);
  return { dibujar: dibujar };
};
