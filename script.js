// ══ CURSOR VARINHA ══
const cursor = document.getElementById("cursor");
const cores = ["#ffd700", "#c0a0ff", "#80ffcc", "#ff9900", "#fff"];

document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  // Partícula
  if (Math.random() > 0.6) {
    const p = document.createElement("div");
    p.className = "particula-cursor";
    const sz = Math.random() * 6 + 2;
    p.style.cssText = [
      "width:" + sz + "px",
      "height:" + sz + "px",
      "left:" + e.clientX + "px",
      "top:" + e.clientY + "px",
      "background:" + cores[Math.floor(Math.random() * cores.length)],
      "box-shadow:0 0 6px " + cores[0],
    ].join(";");
    document.body.appendChild(p);
    setTimeout(function () {
      p.remove();
    }, 800);
  }
});

// ══ NAVEGAÇÃO ══
function irPara(id) {
  document.querySelectorAll(".pagina").forEach(function (p) {
    p.classList.remove("ativa");
  });
  document.getElementById(id).classList.add("ativa");
  if (id === "pg-dementadores") iniciarDementadores();
  if (id === "pg-mapa") iniciarMapa();
}

// ══ 1. PORTA ══
function abrirPorta() {
  document.getElementById("esq").classList.add("aberta");
  document.getElementById("dir").classList.add("aberta");
  setTimeout(function () {
    document.getElementById("nav").classList.add("visivel");
    irPara("pg-personagens");
  }, 1300);
}

// ══ 2. PERSONAGENS ══
var personagens = [
  {
    nome: "Harry Potter",
    img: "img/harry.png",
    casa: "Grifinória",
    casaClass: "casa-gryffindor",
    desc: "O Menino que Sobreviveu. Portador da cicatriz em forma de raio e do destino de derrotar Voldemort.",
    efeito: "⚡🦅✨",
  },
  {
    nome: "Hermione Granger",
    img: "img/hermione.png",
    casa: "Grifinória",
    casaClass: "casa-gryffindor",
    desc: "A bruxa mais inteligente de sua geração. Seu conhecimento salvou Harry e Ron inúmeras vezes.",
    efeito: "📚🪄✨",
  },
  {
    nome: "Ron Weasley",
    img: "img/ron.png",
    casa: "Grifinória",
    casaClass: "casa-gryffindor",
    desc: "Leal e corajoso amigo de Harry. Mestre em xadrez mágico e dono de um coração de ouro.",
    efeito: "♟️🧡🦁",
  },
  {
    nome: "Dumbledore",
    img: "img/dumbledor.png",
    casa: "Grifinória",
    casaClass: "casa-gryffindor",
    desc: "O maior bruxo da era moderna. Diretor de Hogwarts e mentor de Harry Potter.",
    efeito: "🌟🔮🕊️",
  },
  {
    nome: "Voldemort",
    img: "img/voldemort.png",
    casa: "Slytherin",
    casaClass: "casa-slytherin",
    desc: "O Lorde das Trevas. Aquele-que-não-deve-ser-nomeado buscou a imortalidade a qualquer custo.",
    efeito: "🐍💀🌑",
  },
  {
    nome: "Snape",
    img: "img/snape.png",
    casa: "Slytherin",
    casaClass: "casa-slytherin",
    desc: "Duplamente leal. Seu amor eterno por Lily Potter foi sua maior força — e segredo.",
    efeito: "🖤🪄Always",
  },
  {
    nome: "Hagrid",
    img: "img/hagrid.png",
    casa: "Grifinória",
    casaClass: "casa-gryffindor",
    desc: "Guardião de Hogwarts e amigo fiel. Coração enorme num corpo ainda maior.",
    efeito: "🌲🐉❤️",
  },
  {
    nome: "Draco Malfoy",
    img: "img/draco.png",
    casa: "Slytherin",
    casaClass: "casa-slytherin",
    desc: "Rival de Harry. Nascido numa família de sangue puro, carregou o peso das escolhas do pai.",
    efeito: "🐲🐍✦",
  },
  {
    nome: "Luna Lovegood",
    img: "img/luna.png",
    casa: "Corvinal",
    casaClass: "casa-ravenclaw",
    desc: "Excêntrica e sábia. Via o mundo de forma única e era fiel aos seus amigos acima de tudo.",
    efeito: "🌙🦋✨",
  },
  {
    nome: "Neville",
    img: "img/neville.png",
    casa: "Grifinória",
    casaClass: "casa-gryffindor",
    desc: "De garoto inseguro a herói de Hogwarts. Destruiu a última Horcrux com a Espada de Grifinória.",
    efeito: "🌿⚔️🦁",
  },
  {
    nome: "Sirius Black",
    img: "img/sirius.png",
    casa: "Grifinória",
    casaClass: "casa-gryffindor",
    desc: "Padrinho de Harry e melhor amigo de James Potter. Inocente, sobreviveu a Azkaban por amor.",
    efeito: "🐕⭐🗡️",
  },
  {
    nome: "Cedrico",
    img: "img/cedric.png",
    casa: "Lufa-Lufa",
    casaClass: "casa-hufflepuff",
    desc: "Justo, gentil e corajoso. Campeão de Hogwarts no Torneio Tribruxo. Um herói verdadeiro.",
    efeito: "🏆💛⚡",
  },
];

var grid = document.getElementById("grid-personagens");
personagens.forEach(function (p, i) {
  var div = document.createElement("div");
  div.className = "card-personagem";
  div.innerHTML =
    '<img class="card-img" src="' +
    p.img +
    '">' +
    '<span class="card-nome">' +
    p.nome +
    "</span>" +
    '<span class="card-casa ' +
    p.casaClass +
    '">' +
    p.casa +
    "</span>" +
    '<p class="card-desc">' +
    p.desc.substring(0, 60) +
    "...</p>";
  div.onclick = function () {
    abrirModal(i);
  };
  grid.appendChild(div);
});

function abrirModal(i) {
  var p = personagens[i];
  document.getElementById("modal-emoji").textContent = p.emoji;
  document.getElementById("modal-nome").textContent = p.nome;
  document.getElementById("modal-desc").textContent = p.desc;
  document.getElementById("modal-efeito").textContent = p.efeito;
  document.getElementById("modal-personagem").classList.add("aberto");
}
function fecharModal() {
  document.getElementById("modal-personagem").classList.remove("aberto");
}

// ══ 3. MAPA ══
var salas = [
  {
    nome: "Grande Salão",
    desc: "Onde os alunos fazem refeições e a Seleção acontece.",
    x: 40,
    y: 35,
    w: 18,
    h: 14,
  },
  {
    nome: "Biblioteca",
    desc: "Milhares de livros mágicos. Proibidos ficam na seção restrita.",
    x: 65,
    y: 15,
    w: 16,
    h: 12,
  },
  {
    nome: "Sala Precisa",
    desc: "Aparece apenas quando alguém realmente precisa dela.",
    x: 15,
    y: 20,
    w: 15,
    h: 10,
  },
  {
    nome: "Quadribol",
    desc: "Campo de Quadribol — onde Harry brilha como Apanhador.",
    x: 10,
    y: 60,
    w: 20,
    h: 18,
  },
  {
    nome: "Torre Grifinória",
    desc: "Torre da casa mais corajosa de Hogwarts.",
    x: 75,
    y: 55,
    w: 14,
    h: 22,
  },
  {
    nome: "Câmara Secreta",
    desc: "Escondida nas profundezas. Lar da Basilísca de Slytherin.",
    x: 40,
    y: 70,
    w: 18,
    h: 12,
  },
];

var mapaOk = false;
var tooltip = document.getElementById("tooltip-mapa");

function iniciarMapa() {
  if (mapaOk) return;
  mapaOk = true;

  var container = document.getElementById("mapa-container");

  // Salas
  salas.forEach(function (s) {
    var el = document.createElement("div");
    el.className = "sala-mapa";
    el.style.left = s.x + "%";
    el.style.top = s.y + "%";
    el.style.width = s.w + "%";
    el.style.height = s.h + "%";
    el.textContent = s.nome;
    el.addEventListener("mouseenter", function (e) {
      document.getElementById("tt-nome").textContent = s.nome;
      document.getElementById("tt-desc").textContent = s.desc;
      tooltip.style.display = "block";
      tooltip.style.left = e.clientX + 12 + "px";
      tooltip.style.top = e.clientY - 10 + "px";
    });
    el.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
    container.appendChild(el);
  });

  // Pegadas
  var pegadas = ["👣", "👣", "👣"];
  pegadas.forEach(function (_, i) {
    var el = document.createElement("div");
    el.className = "pegada";
    el.textContent = "👣";
    var delay = i * 1.3;
    el.style.left = 10 + Math.random() * 70 + "%";
    el.style.top = 10 + Math.random() * 70 + "%";
    el.style.setProperty("--dx", Math.random() * 200 - 100 + "px");
    el.style.setProperty("--dy", Math.random() * 100 - 50 + "px");
    el.style.animationDelay = delay + "s";
    container.appendChild(el);
  });

  // Frase digitando
  var frase = "I solemnly swear that I am up to no good";
  var fraseEl = document.getElementById("frase-mapa");
  var i = 0;
  function digitarFrase() {
    if (i <= frase.length) {
      fraseEl.textContent = frase.slice(0, i);
      i++;
      setTimeout(digitarFrase, 60);
    } else {
      setTimeout(function () {
        i = 0;
        fraseEl.textContent = "";
        setTimeout(digitarFrase, 1000);
      }, 3000);
    }
  }
  digitarFrase();
}

// ══ 4. DEMENTADORES ══
var dementOk = false;

function iniciarDementadores() {
  if (dementOk) return;
  dementOk = true;

  var pg = document.getElementById("pg-dementadores");

  // Dementadores
  var posicoes = [
    { x: 15, y: 20 },
    { x: 70, y: 10 },
    { x: 40, y: 50 },
    { x: 80, y: 60 },
    { x: 5, y: 70 },
  ];
  posicoes.forEach(function (pos, i) {
    var el = document.createElement("div");
    el.className = "dementador";
    el.innerHTML =
      '<div class="dem-cabeca">' +
      '<div class="dem-olhos"><div class="dem-olho"></div><div class="dem-olho"></div></div>' +
      "</div>" +
      '<div class="dem-corpo">' +
      '<div class="dem-bracos"><div class="dem-braco esq"></div><div class="dem-braco dir"></div></div>' +
      "</div>";
    el.style.left = pos.x + "%";
    el.style.top = pos.y + "%";
    el.style.setProperty("--dur", 4 + i * 0.8 + "s");
    el.style.setProperty("--dx1", Math.random() * 120 - 60 + "px");
    el.style.setProperty("--dy1", Math.random() * 80 - 40 + "px");
    el.style.setProperty("--dx2", Math.random() * 120 - 60 + "px");
    el.style.setProperty("--dy2", Math.random() * 80 - 40 + "px");
    el.style.setProperty("--dx3", Math.random() * 120 - 60 + "px");
    el.style.setProperty("--dy3", Math.random() * 80 - 40 + "px");
    el.style.animationDelay = i * 0.4 + "s";
    pg.appendChild(el);
  });

  // Gelo caindo
  for (var j = 0; j < 20; j++) {
    var g = document.createElement("div");
    g.className = "gelo-particula";
    g.textContent = ["❄", "❅", "❆", "*"][Math.floor(Math.random() * 4)];
    g.style.left = Math.random() * 100 + "%";
    g.style.top = Math.random() * 100 + "%";
    g.style.setProperty("--gd", 3 + Math.random() * 4 + "s");
    g.style.animationDelay = Math.random() * 4 + "s";
    pg.appendChild(g);
  }

  // Botão expecto após 3s
  setTimeout(function () {
    document.getElementById("expecto-btn").classList.add("visivel");
  }, 3000);
}

function expecto() {
  var luz = document.getElementById("luz-patrono");
  var pg = document.getElementById("pg-dementadores");
  luz.classList.add("ativo");

  // Dementadores somem
  pg.querySelectorAll(".dementador").forEach(function (d) {
    d.style.transition = "opacity 1s";
    d.style.opacity = "0";
  });

  setTimeout(function () {
    luz.classList.remove("ativo");
    // Ressurge dementadores
    pg.querySelectorAll(".dementador").forEach(function (d) {
      d.style.opacity = "0.8";
    });
  }, 2000);
}

// ══ 6. TIMELINE ══
var eventos = [
  {
    ano: "1981",
    titulo: "A Profecia",
    desc: "Voldemort tenta matar Harry bebê. A maldição ricocheteie e ele desaparece.",
  },
  {
    ano: "1991",
    titulo: "A Carta de Hogwarts",
    desc: "Harry recebe sua carta e descobre que é um bruxo.",
  },
  {
    ano: "1991",
    titulo: "A Pedra Filosofal",
    desc: "Harry, Ron e Hermione impedem Quirrell de roubar a pedra.",
  },
  {
    ano: "1992",
    titulo: "A Câmara Secreta",
    desc: "Harry enfrenta a Basilísca e destrói o diário de Riddle.",
  },
  {
    ano: "1993",
    titulo: "O Prisioneiro de Azkaban",
    desc: "Sirius Black escapa. O verdadeiro traidor, Pettigrew, é revelado.",
  },
  {
    ano: "1994",
    titulo: "O Cálice de Fogo",
    desc: "Harry é forçado a competir no Torneio Tribruxo. Voldemort ressurge.",
  },
  {
    ano: "1995",
    titulo: "A Ordem da Fênix",
    desc: "Harry vê Cedrico morrer e tenta alertar o mundo sobre Voldemort.",
  },
  {
    ano: "1997",
    titulo: "As Relíquias da Morte",
    desc: "Harry, Ron e Hermione caçam as Horcruxes para derrotar Voldemort.",
  },
  {
    ano: "1998",
    titulo: "A Batalha de Hogwarts",
    desc: "A batalha final. Harry sacrifica-se e Voldemort é derrotado para sempre.",
  },
];

var tl = document.getElementById("timeline");
eventos.forEach(function (e) {
  var div = document.createElement("div");
  div.className = "evento";
  div.innerHTML =
    '<div class="ano">' +
    e.ano +
    "</div><h4>" +
    e.titulo +
    "</h4><p>" +
    e.desc +
    "</p>";
  tl.appendChild(div);
});

// ══ ESTRELAS ══
var canvas = document.getElementById("estrelas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var stars = [];
for (var s = 0; s < 150; s++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random(),
  });
}
function desenharEstrelas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(function (s) {
    s.a += 0.008;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle =
      "rgba(255,255,255," + (0.3 + Math.abs(Math.sin(s.a)) * 0.7) + ")";
    ctx.fill();
  });
  requestAnimationFrame(desenharEstrelas);
}
desenharEstrelas();
