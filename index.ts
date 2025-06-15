const movedLocation = {
  x: 0,
  y: 0,
};

const keyPressEventHandler = (event: KeyboardEvent) => {
  const baedal = document.querySelector<HTMLElement>('.baedal');
  if (!baedal) return;

  if (event.code === 'KeyW') {
    movedLocation.y -= 10;
    baedal.style.top = `calc(50vh - 48px + ${movedLocation.y}px)`;
  }
  if (event.code === 'KeyA') {
    movedLocation.x -= 10;
    baedal.style.left = `calc(50vw - 48px + ${movedLocation.x}px)`;
  }
  if (event.code === 'KeyS') {
    movedLocation.y += 10;
    baedal.style.top = `calc(50vh - 48px + ${movedLocation.y}px)`;
  }
  if (event.code === 'KeyD') {
    movedLocation.x += 10;
    baedal.style.left = `calc(50vw - 48px + ${movedLocation.x}px)`;
  }
  checkCollision();
};

const createGift = () => {
  const gift = document.createElement('img');
  gift.src = 'images/gift.png';

  const randomLocation = createRandomLocation();
  gift.style.position = 'absolute';
  gift.style.left = `${randomLocation.x}px`;
  gift.style.top = `${randomLocation.y}px`;
  gift.classList.add('gift');

  document.body.appendChild(gift);
};

const createRandomLocation = () => {
  let randomX = Math.floor(Math.random() * window.innerWidth - 64);
  let randomY = Math.floor(Math.random() * window.innerHeight - 64);

  while (randomX < 200 && randomY < 100) {
    // Ensure the gift is not too close to the top-left corner
    randomX = Math.floor(Math.random() * window.innerWidth - 64);
    randomY = Math.floor(Math.random() * window.innerHeight - 64);
  }

  return {
    x: randomX,
    y: randomY,
  };
};

const showTimer = (remain: number) => {
  const timer = document.querySelector<HTMLElement>('.time');
  if (!timer) return;
  timer.innerHTML = remain.toString();
};

const showScore = (score: number) => {
  const scoreElement = document.querySelector('.count');
  if (!scoreElement) return;
  scoreElement.innerHTML = score.toString();
};

const checkCollision = () => {
  const baedal = document.querySelector('.baedal');
  const gifts = document.querySelectorAll('.gift');
  if (!baedal) {
    console.error('Baedal element not found');
    return;
  }

  gifts.forEach((gift) => {
    const baedalRect = baedal.getBoundingClientRect();
    const giftRect = gift.getBoundingClientRect();
    if (
      baedalRect.top < giftRect.bottom &&
      baedalRect.bottom > giftRect.top &&
      baedalRect.left < giftRect.right &&
      baedalRect.right > giftRect.left
    ) {
      score += 1;
      gift.remove();
    }
  });
};

const toggleModalDisplay = () => {
  const modal = document.querySelector('.modal_container');
  const result = document.querySelector('.result');
  if (!modal || !result) return;

  result.innerHTML = score.toString();
  modal.classList.toggle('hidden');
};

const startGame = () => {
  const timer = setInterval(() => {
    remainingTime -= 1;
    showTimer(remainingTime);
    createGift();
    showScore(score);
    if (remainingTime <= 0) {
      clearInterval(timer);
      gameState = 'end';
      toggleModalDisplay();
    }
  }, 1000);
};

const handleRestart = () => {
  remainingTime = 10;
  score = 0;
  showScore(0);
  showTimer(remainingTime);
  gameState = 'playing';
  movedLocation.x = 0;
  movedLocation.y = 0;
  toggleModalDisplay();
  startGame();
};

type GameState = 'idle' | 'playing' | 'end';
let gameState: GameState = 'idle';
let remainingTime = 10;
let score = 0;

window.addEventListener('load', () => {
  const body = document.querySelector('body');
  body?.addEventListener('keypress', keyPressEventHandler);

  const restartButton = document.querySelector('.restart');
  restartButton?.addEventListener('click', handleRestart);

  gameState = 'playing';
  showTimer(remainingTime);
  startGame();
});
