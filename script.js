const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameBoard = document.getElementById('gameBoard');

// Carregar áudios
const jumpSound = new Audio('./audio/jump-up-245782.mp3');
const gameOverSound = new Audio('./audio/8d82b5_SMW_Game_Over_Sound_Effect.mp3');

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        jumpSound.currentTime = 0;
        jumpSound.play();
        setTimeout(() => mario.classList.remove('jump'), 500);
    }
};

// Pontos e fases
let pontos = 0;
let fase = 1;
const pontosDisplay = document.getElementById('pontos');
const faseDisplay = document.getElementById('fase');

// Atualizar pontuação e fases
const pontosInterval = setInterval(() => {
    pontos += 1;
    pontosDisplay.textContent = pontos;

    // Aumenta fase a cada 50 pontos
    if (pontos % 50 === 0) {
        fase += 1;
        faseDisplay.textContent = fase;

        // Acelerar o cano progressivamente
        let newPipeSpeed = 1.5 - (fase * 0.1); // diminui tempo da animação
        pipe.style.animation = `pipe-animation ${newPipeSpeed > 0.3 ? newPipeSpeed : 0.3}s infinite linear`;

        // Acelerar nuvens levemente
        let cloudsSpeed = 20 - (fase * 1);
        clouds.style.animation = `clouds-animation ${cloudsSpeed > 5 ? cloudsSpeed : 5}s linear infinite`;
    }
}, 1000);

// Loop do jogo
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px'; 

        clearInterval(loop);
        clearInterval(pontosInterval);

        gameOverSound.play();
    }
}, 10);

// ---- Controles ----
// Teclado (PC)
document.addEventListener('keydown', jump);

// Toque na tela (Mobile)
gameBoard.addEventListener('touchstart', jump);

// Clique do mouse também (opcional, funciona em PC e celular)
gameBoard.addEventListener('click', jump);

function restartGame() {
    location.reload();
}
