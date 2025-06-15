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
};

const createGift = () => {
  const gift = document.createElement('img');
  gift.src = 'images/gift.png';

  const randomLocation = createRandomLocation();
  gift.style.position = 'absolute';
  gift.style.left = `${randomLocation.x}px`;
  gift.style.top = `${randomLocation.y}px`;

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

type GameState = 'idle' | 'playing' | 'end';
let gameState: GameState = 'idle';
let remainingTime = 10; // 60 seconds
window.addEventListener('load', () => {
  const body = document.querySelector('body');
  body?.addEventListener('keypress', keyPressEventHandler);

  gameState = 'playing';
  const timer = setInterval(() => {
    remainingTime -= 1;
    createGift();
    if (remainingTime <= 0) {
      clearInterval(timer);
      gameState = 'end';
    }
  }, 1000);
});
