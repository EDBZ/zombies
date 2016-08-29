var rouge = document.getElementById('rouge'),
  vert = document.getElementById('vert'),
  bleu = document.getElementById('bleu'),
  rose = document.getElementById('rose'),
  w = window.innerWidth,
  h = window.innerHeight,
  max_dist = [w, h],
  i = 1,
  argh = document.getElementById('argh'),
  brain = document.getElementById('brain');

var pointcible = document.getElementById('pointcible'),
  distance = document.getElementById('distance'),
  speedM = document.getElementById('speedM'),
  speedz1 = document.getElementById('speedz1'),
  speedz2 = document.getElementById('speedz2'),
  distz1 = document.getElementById('distz1'),
  distz2 = document.getElementById('distz2');

// point random, cible de l'objet rouge
function fcible() {
  var w_rdm = Math.floor(Math.random() * w),
    h_rdm = Math.floor(Math.random() * h);
  return cible = [w_rdm, h_rdm];
};

// détermine la position [x,y] de l'objet
function posif(obj) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curleft, curtop];
  };
};

// détermine la distance [x,y] que sépare l'objet rouge de la cible
// renvoie la valeur en pixel et en %
function fdist(cible, position) {
  var x = Math.abs(cible[0] - position[0]),
    y = Math.abs(cible[1] - position[1]),
    xpc = Math.floor((x * 100) / max_dist[0]),
    ypc = Math.floor((y * 100) / max_dist[1]);
  return dist = [x, y], dist_pc = [xpc, ypc];
};

// détermine la proximité entre rouge et vert
// renvoie en px et en %
function fproxV(posF, posM) {
  var x = Math.abs(posF[0] - posM[0]),
    y = Math.abs(posF[1] - posM[1]),
    xpc = Math.floor((x * 100) / max_dist[0]),
    ypc = Math.floor((y * 100) / max_dist[1]);
  return proxV = [x, y], proxV_pc = [xpc, ypc];
};

function fproxB(posF, posM) {
  var x = Math.abs(posF[0] - posM[0]),
    y = Math.abs(posF[1] - posM[1]),
    xpc = Math.floor((x * 100) / max_dist[0]),
    ypc = Math.floor((y * 100) / max_dist[1]);
  return proxB = [x, y], proxB_pc = [xpc, ypc];
};


// incrémentation par rapport à la distance rouge objet
function f_i_dist(a, b) {
  var x = Math.abs(Math.round(Math.pow(a, 1 / 2) * 2)),
    y = Math.abs(Math.round(Math.pow(a, 1 / 2) * 2));
  return i_dist = [x, y];
};

// incrémentation pour rouge en fonction de la proximité de vert/bleu
function f_i_prox(a, b) {
  var x = Math.round(Math.pow(a, 1 / 2)),
    y = Math.round(Math.pow(b, 1 / 2));
  return i_prox = [x, y];
};

// incrémentation pour vert en fonction de la proximité de rouge
function f_m_prox(a, b) {
  // sin(5/x)*10+1
  var x = Math.round(Math.pow(a+1, 1 / 5) * 2),
    y = Math.round(Math.pow(b+1, 1 / 5) * 2);
  return m_prox = [x, y];
};

// incrémentation pour bleu en fonction de la proximité de rouge
function f_b_prox(a, b) {
  var x = Math.round(Math.pow(a+1, -1) * 10),
    y = Math.round(Math.pow(b+1, -1) * 10);
  return b_prox = [x, y];
};

// les sons
function sound(a) {
  brain.loop = true;
  argh.loop = true;
  if (a >= 20) {
    brain.play();
    argh.pause();
    rouge.style.backgroundImage = 'none';
  } else {
    argh.play();
    brain.pause();
    rouge.style.backgroundImage = 'url(sang.png)';
    rouge.style.backgroundSize = 'contain';
    rouge.style.backgroundRepeat = 'no-repeat';

  };
};

// mouvement de rouge
function moveF(obj) {
  posif(obj);
  posif(vert);
  posif(bleu);
  fdist(cible, posif(obj));
  fproxV(posif(obj), posif(vert));
  fproxB(posif(obj), posif(bleu));
  f_i_dist(dist_pc[0], dist_pc[1]);
  f_i_prox(((proxV_pc[0])+(proxB_pc[0]))/2, ((proxV_pc[1])+(proxB_pc[1]))/2);
  if (posif(obj)[0] < cible[0] && posif(obj)[1] < cible[1]) {
    obj.style.left = (posif(obj)[0] += i_dist[0] + i_prox[0] + 1) + 'px';
    obj.style.top = (posif(obj)[1] += i_dist[1] + i_prox[1] + 1) + 'px';
    obj.style.transform = 'scaleX(1)';
  } else if (posif(obj)[0] > cible[0] && posif(obj)[1] > cible[1]) {
    obj.style.left = (posif(obj)[0] -= i_dist[0] + i_prox[0] + 1) + 'px';
    obj.style.top = (posif(obj)[1] -= i_dist[1] + i_prox[1] + 1) + 'px';
    obj.style.transform = 'scaleX(-1)';
  } else if (posif(obj)[0] > cible[0] && posif(obj)[1] < cible[1]) {
    obj.style.left = (posif(obj)[0] -= i_dist[0] + i_prox[0] + 1) + 'px';
    obj.style.top = (posif(obj)[1] += i_dist[1] + i_prox[1] + 1) + 'px';
    obj.style.transform = 'scaleX(-1)';
  } else if ((posif(obj)[0] < cible[0] && posif(obj)[1] > cible[1])) {
    obj.style.left = (posif(obj)[0] += i_dist[0] + i_prox[0] + 1) + 'px';
    obj.style.top = (posif(obj)[1] -= i_dist[1] + i_prox[1] + 1) + 'px';
    obj.style.transform = 'scaleX(1)';
  } else {
    fcible();
  };
  pointcible.innerHTML = 'coor cible : ' + cible;
  distance.innerHTML = 'distance : ' + dist + ' ' + dist_pc + '%';
  speedM.innerHTML = 'speed meuf : ' + (i_dist[0] + i_prox[0] + 1) + ' ' + (i_dist[1] + i_prox[1] + 1);
};

function moveR(obj) {
  posif(obj);
  posif(vert);
  fdist(cible, posif(obj));
  fproxV(posif(obj), posif(vert));
  fproxB(posif(obj), posif(bleu));
  f_i_dist(dist_pc[0], dist_pc[1]);
  f_i_prox(((proxV_pc[0])+(proxB_pc[0]))/2, ((proxV_pc[1])+(proxB_pc[1]))/2);
  if (posif(obj)[0] < cible[0] && posif(obj)[1] < cible[1]) {
    obj.style.left = (posif(obj)[0] += i_dist[0] + i_prox[0] + 1) + 'px';
    obj.style.top = (posif(obj)[1] += i_dist[1] + i_prox[1] + 1) + 'px';
    obj.style.transform = 'scaleX(1)';
  } else if (posif(obj)[0] > cible[0] && posif(obj)[1] > cible[1]) {
    obj.style.left = (posif(obj)[0] -= i_dist[0] + i_prox[0] + 1) + 'px';
    obj.style.top = (posif(obj)[1] -= i_dist[1] + i_prox[1] + 1) + 'px';
    obj.style.transform = 'scaleX(-1)';
  } else if (posif(obj)[0] > cible[0] && posif(obj)[1] < cible[1]) {
    obj.style.left = (posif(obj)[0] -= i_dist[0] + i_prox[0] + 1) + 'px';
    obj.style.top = (posif(obj)[1] += i_dist[1] + i_prox[1] + 1) + 'px';
    obj.style.transform = 'scaleX(-1)';
  } else if ((posif(obj)[0] < cible[0] && posif(obj)[1] > cible[1])) {
    obj.style.left = (posif(obj)[0] += i_dist[0] + i_prox[0] + 1) + 'px';
    obj.style.top = (posif(obj)[1] -= i_dist[1] + i_prox[1] + 1) + 'px';
    obj.style.transform = 'scaleX(1)';
  } else {
    fcible();
  };
  pointcible.innerHTML = 'coor cible : ' + cible;
  distance.innerHTML = 'distance : ' + dist + ' ' + dist_pc + '%';
  speedM.innerHTML = 'speed meuf : ' + (i_dist[0] + i_prox[0] + 1) + ' ' + (i_dist[1] + i_prox[1] + 1);
};

// mouvement de vert
function moveM(obj) {
  posif(obj);
  posif(rouge);
  fproxV(posif(rouge), posif(obj));
  f_m_prox(proxV_pc[0], proxV_pc[1]);
  (posif(obj)[0] < posif(rouge)[0]) ? (obj.style.left = (posif(obj)[0] += m_prox[0] + i) + 'px', obj.style.transform = 'scaleX(1)') : (obj.style.left = (posif(obj)[0] -= m_prox[0] + i) + 'px', obj.style.transform = 'scaleX(-1)');
  (posif(obj)[1] < posif(rouge)[1]) ? obj.style.top = (posif(obj)[1] += m_prox[1] + i) + 'px': obj.style.top = (posif(obj)[1] -= m_prox[1] + i) + 'px';
  distz1.innerHTML = 'distance zombi 1 : ' + proxV + ' ' + proxV_pc + '%';
  speedz1.innerHTML = 'speed zombi 1 : ' + (m_prox[0] + i) + ' ' + (m_prox[1] + i);
};

// mouvement de bleu
function moveB(obj) {
  posif(obj);
  posif(rouge);
  fproxB(posif(rouge), posif(obj));
  f_b_prox(proxB_pc[0], proxB_pc[1]);
  (posif(obj)[0] < posif(rouge)[0]) ? (obj.style.left = (posif(obj)[0] += b_prox[0] + i) + 'px', obj.style.transform = 'scaleX(1)') : (obj.style.left = (posif(obj)[0] -= b_prox[0] + 5) + 'px', obj.style.transform = 'scaleX(-1)');
  (posif(obj)[1] < posif(rouge)[1]) ? obj.style.top = (posif(obj)[1] += b_prox[1] + i) + 'px': obj.style.top = (posif(obj)[1] -= b_prox[1] + i) + 'px';
  distz2.innerHTML = 'distance zombi 2 : ' + proxB + ' ' + proxB_pc + '%';
  speedz2.innerHTML = 'speed zombi 2 : ' + (b_prox[0] + i) + ' ' + (b_prox[1] + i);
};


fcible();
setInterval(function() {
  moveF(rouge);
  moveM(vert);
  moveB(bleu);
  moveR(rose);
  sound(proxB[0]);
  sound(proxV[0]);
}, 50);
