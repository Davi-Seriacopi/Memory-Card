// ======================================================
// JOGO DA MEMÓRIA
// ======================================================

// Elementos do DOM
const cards = document.querySelectorAll('.memory-card');

// Variáveis de estado do jogo
let primeiraCarta = null;   // guarda a 1ª carta clicada
let segundaCarta = null;    // guarda a 2ª carta clicada
let podeClicar = true;      // impede novos cliques enquanto o jogo "pensa"
let paresEncontrados = 0;   // conta quantos pares já foram descobertos

const totalDePares = cards.length / 2;

let segundosPassados = 0;   // quantos segundos já se passaram na partida atual
let temporizador = null;   // guarda o setInterval, para podermos pará-lo depois

// ------------------------------------------------------
// FUNÇÕES DO TEMPORIZADOR
// ------------------------------------------------------
function iniciarTemporizador() {
  if (temporizador) return; // Evita criar múltiplos intervalos
  
  temporizador = setInterval(() => {
    segundosPassados++;
  }, 1000);
}

function pararTemporizador() {
  clearInterval(temporizador);
  temporizador = null;
}

// ------------------------------------------------------
// LÓGICA DO JOGO
// ------------------------------------------------------
function virarCarta() {
  // Impede clicar na mesma carta duas vezes ou durante a animação de verificação
  if (!podeClicar || this === primeiraCarta) return;

  iniciarTemporizador(); // Inicia o tempo no primeiro clique
  this.classList.add('flip');

  if (!primeiraCarta) {
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;
  verificarPar();
}

function verificarPar() {
  // Compara pelo data-framework do seu HTML
  const eIgual = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

  eIgual ? desativarCartas() : desvirarCartas();
}

function desativarCartas() {
  primeiraCarta.removeEventListener('click', virarCarta);
  segundaCarta.removeEventListener('click', virarCarta);

  paresEncontrados++;
  resetarJogada();

  if (paresEncontrados === totalDePares) {
    pararTemporizador();
    setTimeout(() => {
      alert(`Parabéns! Você venceu em ${segundosPassados} segundos!`);
    }, 500);
  }
}

function desvirarCartas() {
  podeClicar = false;

  setTimeout(() => {
    primeiraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');
    resetarJogada();
  }, 1000);
}

function resetarJogada() {
  primeiraCarta = null;
  segundaCarta = null;
  podeClicar = true;
}

// ------------------------------------------------------
// EMBARALHAR E INICIALIZAR
// ------------------------------------------------------
(function embaralhar() {
  cards.forEach(card => {
    let posicaoAleatoria = Math.floor(Math.random() * cards.length);
    card.style.order = posicaoAleatoria;
  });
})();

// Atribui o evento de clique a cada carta
cards.forEach(card => card.addEventListener('click', virarCarta));