const $ = (id) => document.getElementById(id);
const $all = (sel) => document.querySelectorAll(sel);
const cores = ["#ffd700", "#c0a0ff", "#80ffcc", "#ff9900", "#fff"];

// Inicialização — só a entrada visível
$all(".pagina").forEach(p => (p.style.display = "none"));
$("pg-entrada").style.display = "flex";

// ══ NAVEGAÇÃO ══
const irPara = (id) => {
  $all(".pagina").forEach(p => {
    p.style.display = "none";
    p.classList.remove("ativa");
  });
  const pg = $(id);
  if (pg) { pg.style.display = "flex"; pg.classList.add("ativa"); }
  if (id === "pg-dementadores") iniciarDementadores();
  if (id === "pg-mapa") iniciarMapa();
};

// ══ CURSOR MÁGICO ══
document.addEventListener("mousemove", (e) => {
  $("cursor").style.left = e.clientX + "px";
  $("cursor").style.top  = e.clientY + "px";

  if (Math.random() > 0.6) {
    const sz = Math.random() * 6 + 2;
    const p  = document.createElement("div");
    p.className = "particula-cursor";
    p.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX}px;top:${e.clientY}px;background:${cores[Math.floor(Math.random() * cores.length)]};box-shadow:0 0 6px ${cores[0]}`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
});

// ══ 1. POMO DE OURO ══
function abrirPorta() {
  const pomo = $("pomo");
  if (pomo.classList.contains("aberto")) return;
  pomo.classList.add("aberto");

  const rect = pomo.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;

  for (let i = 0; i < 24; i++) {
    const p = document.createElement("div");
    p.className = "particula-cursor";
    p.style.cssText = `width:8px;height:8px;left:${cx}px;top:${cy}px;background:#ffd700;box-shadow:0 0 10px #ff8800;transition:1s;`;
    document.body.appendChild(p);
    setTimeout(() => {
      p.style.transform = `translate(${(Math.random() - 0.5) * 260}px, ${(Math.random() - 0.5) * 260}px)`;
      p.style.opacity   = "0";
      setTimeout(() => p.remove(), 1100);
    }, 30);
  }

  setTimeout(() => {
    $("pg-entrada").style.display = "none";
    $all("#nav, #footer").forEach(el => el.classList.add("visivel"));
    irPara("pg-azkaban");
  }, 1100);
}

// ══ 2. PERSONAGENS ══
const personagens = [
  { nome: "Harry Potter",    img: "img/harry.png",     casa: "Grifinória", cl: "casa-gryffindor", desc: "O Menino que Sobreviveu. Portador da cicatriz e do destino de derrotar Voldemort.", ef: "⚡🦅✨"     },
  { nome: "Hermione Granger",img: "img/hermione.png",  casa: "Grifinória", cl: "casa-gryffindor", desc: "A bruxa mais inteligente de sua geração. Seu conhecimento salvou a todos.", ef: "📚🪄✨"     },
  { nome: "Ron Weasley",     img: "img/ron.png",       casa: "Grifinória", cl: "casa-gryffindor", desc: "Leal amigo de Harry. Mestre em xadrez mágico e dono de um coração de ouro.",       ef: "♟️🧡🦁"    },
  { nome: "Dumbledore",      img: "img/dumbledor.png", casa: "Grifinória", cl: "casa-gryffindor", desc: "O maior bruxo da era moderna. Diretor de Hogwarts e mentor de Harry.",              ef: "🌟🔮🕊️"    },
  { nome: "Voldemort",       img: "img/voldemort.png", casa: "Slytherin",  cl: "casa-slytherin",  desc: "O Lorde das Trevas. Buscou a imortalidade a qualquer custo.",                      ef: "🐍💀🌑"     },
  { nome: "Snape",           img: "img/snape.png",     casa: "Slytherin",  cl: "casa-slytherin",  desc: "Duplamente leal. Seu amor eterno por Lily foi sua maior força.",                   ef: "🖤🪄Always" },
  { nome: "Hagrid",          img: "img/hagrid.png",    casa: "Grifinória", cl: "casa-gryffindor", desc: "Guardião de Hogwarts. Coração enorme num corpo ainda maior.",                      ef: "🌲🐉❤️"     },
  { nome: "Draco Malfoy",    img: "img/draco.png",     casa: "Slytherin",  cl: "casa-slytherin",  desc: "Rival de Harry. Carregou o peso das escolhas de sua família.",                     ef: "🐲🐍✦"      },
  { nome: "Luna Lovegood",   img: "img/luna.png",      casa: "Corvinal",   cl: "casa-ravenclaw",  desc: "Excêntrica e sábia. Via o mundo de forma única e fiel aos amigos.",                ef: "🌙🦋✨"     },
  { nome: "Neville",         img: "img/neville.png",   casa: "Grifinória", cl: "casa-gryffindor", desc: "De garoto inseguro a herói. Destruiu a última Horcrux.",                           ef: "🌿⚔️🦁"    },
  { nome: "Sirius Black",    img: "img/sirius.png",    casa: "Grifinória", cl: "casa-gryffindor", desc: "Padrinho de Harry. Inocente, sobreviveu a Azkaban por amor.",                      ef: "🐕⭐🗡️"    },
  { nome: "Cedrico",         img: "img/cedric.png",    casa: "Lufa-Lufa",  cl: "casa-hufflepuff", desc: "Justo e gentil. Campeão de Hogwarts no Torneio Tribruxo.",                         ef: "🏆💛⚡"     }
];

personagens.forEach(p => {
  const card = document.createElement("div");
  card.className = "card-personagem";
  card.innerHTML = `
    <img class="card-img" src="${p.img}">
    <span class="card-nome">${p.nome}</span>
    <span class="card-casa ${p.cl}">${p.casa}</span>
    <p class="card-desc">${p.desc.substring(0, 60)}...</p>`;
  card.onclick = () => {
    $("modal-emoji").innerHTML = `<img src="${p.img}" style="width:100px;height:100px;object-fit:cover;border-radius:50%">`;
    $("modal-nome").textContent  = p.nome;
    $("modal-desc").textContent  = p.desc;
    $("modal-efeito").textContent = p.ef;
    $("modal-casa").textContent  = p.casa;
    $("modal-casa").className    = "modal-casa " + p.cl;
    $("modal-personagem").classList.add("aberto");
  };
  $("grid-personagens").appendChild(card);
});

const fecharModal = () => $("modal-personagem").classList.remove("aberto");

// ══ 3. MAPA ══
function iniciarMapa() {
  if (this.done) return;
  this.done = true;

  const salas = [
    { n: "Grande Salão",     d: "Onde a Seleção acontece.",       x: 40, y: 35, w: 18, h: 14 },
    { n: "Biblioteca",       d: "Milhares de livros mágicos.",    x: 65, y: 15, w: 16, h: 12 },
    { n: "Sala Precisa",     d: "Aparece quando alguém precisa.", x: 15, y: 20, w: 15, h: 10 },
    { n: "Quadribol",        d: "Campo onde Harry brilha.",       x: 10, y: 60, w: 20, h: 18 },
    { n: "Torre Grifinória", d: "Torre da casa mais corajosa.",   x: 75, y: 55, w: 14, h: 22 },
    { n: "Câmara Secreta",   d: "Lar da Basilísca.",              x: 40, y: 70, w: 18, h: 12 }
  ];

  salas.forEach(s => {
    const el = document.createElement("div");
    el.className  = "sala-mapa";
    el.style.cssText = `left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%`;
    el.textContent   = s.n;
    el.onmouseenter  = (e) => {
      $("tt-nome").textContent = s.n;
      $("tt-desc").textContent = s.d;
      $("tooltip-mapa").style.cssText = `display:block;left:${e.clientX + 12}px;top:${e.clientY - 10}px`;
    };
    el.onmouseleave = () => ($("tooltip-mapa").style.display = "none");
    $("mapa-container").appendChild(el);
  });

  // Pegadas
  for (let i = 0; i < 3; i++) {
    const p = document.createElement("div");
    p.className  = "pegada";
    p.textContent = "👣";
    p.style.cssText = `left:${10 + Math.random() * 70}%;top:${10 + Math.random() * 70}%;--dx:${Math.random() * 200 - 100}px;--dy:${Math.random() * 100 - 50}px;animation-delay:${i * 1.3}s`;
    $("mapa-container").appendChild(p);
  }

  // Frase digitando
  const txt = "I solemnly swear that I am up to no good";
  let char = 0;
  const digita = () => {
    $("frase-mapa").textContent = txt.slice(0, char++);
    if (char <= txt.length) setTimeout(digita, 60);
    else setTimeout(() => { char = 0; digita(); }, 4000);
  };
  digita();
}

// ══ 4. DEMENTADORES ══
function iniciarDementadores() {
  if (this.done) return;
  this.done = true;

  const pg = $("pg-dementadores");

  [{x:15,y:20},{x:70,y:10},{x:40,y:50},{x:80,y:60},{x:5,y:70}].forEach((pos, i) => {
    const d = document.createElement("div");
    d.className = "dementador";
    d.innerHTML = `
      <div class="dem-cabeca">
        <div class="dem-olhos">
          <div class="dem-olho"></div>
          <div class="dem-olho"></div>
        </div>
      </div>
      <div class="dem-corpo">
        <div class="dem-bracos">
          <div class="dem-braco esq"></div>
          <div class="dem-braco dir"></div>
        </div>
      </div>`;
    d.style.cssText = `left:${pos.x}%;top:${pos.y}%;--dur:${4 + i * 0.8}s;animation-delay:${i * 0.4}s;opacity:0.8`;
    pg.appendChild(d);
  });

  for (let j = 0; j < 20; j++) {
    const g = document.createElement("div");
    g.className  = "gelo-particula";
    g.textContent = ["❄","❅","❆","*"][Math.floor(Math.random() * 4)];
    g.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--gd:${3 + Math.random() * 4}s;animation-delay:${Math.random() * 4}s`;
    pg.appendChild(g);
  }

  setTimeout(() => $("expecto-btn").classList.add("visivel"), 3000);
}

const expecto = () => {
  $("luz-patrono").classList.add("ativo");
  $all(".dementador").forEach(d => (d.style.opacity = "0"));
  setTimeout(() => {
    $("luz-patrono").classList.remove("ativo");
    $all(".dementador").forEach(d => (d.style.opacity = "0.8"));
  }, 2000);
};

// ══ 5. TIMELINE ══
const eventos = [
  { a: "1981", t: "A Profecia",         d: "Voldemort tenta matar Harry bebê. A maldição ricocheteia."   },
  { a: "1991", t: "A Carta",            d: "Harry descobre que é um bruxo."                              },
  { a: "1991", t: "A Pedra Filosofal",  d: "Harry, Ron e Hermione impedem o roubo da pedra."             },
  { a: "1992", t: "A Câmara Secreta",   d: "Harry enfrenta a Basilísca e destrói o diário."              },
  { a: "1993", t: "O Prisioneiro",      d: "Sirius Black escapa e a verdade é revelada."                 },
  { a: "1994", t: "O Cálice de Fogo",   d: "O Torneio Tribruxo e o ressurgimento de Voldemort."          },
  { a: "1995", t: "A Ordem da Fênix",   d: "Harry alerta o mundo sobre o retorno das trevas."            },
  { a: "1997", t: "Relíquias da Morte", d: "A caça às Horcruxes começa."                                 },
  { a: "1998", t: "A Batalha Final",    d: "Voldemort é derrotado para sempre em Hogwarts."              }
];

eventos.forEach(e => {
  const div = document.createElement("div");
  div.className = "evento";
  div.innerHTML = `<div class="ano">${e.a}</div><h4>${e.t}</h4><p>${e.d}</p>`;
  $("timeline").appendChild(div);
});

// ══ ESTRELAS ══
const cvs = $("estrelas");
const ctx = cvs.getContext("2d");
let stars = [];

const resize = () => {
  cvs.width  = window.innerWidth;
  cvs.height = window.innerHeight;
  stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * cvs.width,
    y: Math.random() * cvs.height,
    r: Math.random() * 1.5,
    a: Math.random()
  }));
};

window.onresize = resize;
resize();

(function render() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  stars.forEach(s => {
    s.a += 0.008;
    ctx.globalAlpha = 0.3 + Math.abs(Math.sin(s.a)) * 0.7;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 7);
    ctx.fillStyle = "white";
    ctx.fill();
  });
  requestAnimationFrame(render);
})();