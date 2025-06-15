var movedLocation = {
    x: 0,
    y: 0,
};
var keyPressEventHandler = function (event) {
    var baedal = document.querySelector('.baedal');
    if (!baedal)
        return;
    if (event.code === 'KeyW') {
        movedLocation.y -= 10;
        baedal.style.top = "calc(50vh - 48px + ".concat(movedLocation.y, "px)");
    }
    if (event.code === 'KeyA') {
        movedLocation.x -= 10;
        baedal.style.left = "calc(50vw - 48px + ".concat(movedLocation.x, "px)");
    }
    if (event.code === 'KeyS') {
        movedLocation.y += 10;
        baedal.style.top = "calc(50vh - 48px + ".concat(movedLocation.y, "px)");
    }
    if (event.code === 'KeyD') {
        movedLocation.x += 10;
        baedal.style.left = "calc(50vw - 48px + ".concat(movedLocation.x, "px)");
    }
    checkCollision();
};
var createGift = function () {
    var gift = document.createElement('img');
    gift.src = 'images/gift.png';
    var randomLocation = createRandomLocation();
    gift.style.position = 'absolute';
    gift.style.left = "".concat(randomLocation.x, "px");
    gift.style.top = "".concat(randomLocation.y, "px");
    gift.classList.add('gift');
    document.body.appendChild(gift);
};
var createRandomLocation = function () {
    var randomX = Math.floor(Math.random() * window.innerWidth - 64);
    var randomY = Math.floor(Math.random() * window.innerHeight - 64);
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
var showTimer = function (remain) {
    var timer = document.querySelector('.time');
    if (!timer)
        return;
    timer.innerHTML = remain.toString();
};
var showScore = function (score) {
    var scoreElement = document.querySelector('.count');
    if (!scoreElement)
        return;
    scoreElement.innerHTML = score.toString();
};
var checkCollision = function () {
    var baedal = document.querySelector('.baedal');
    var gifts = document.querySelectorAll('.gift');
    if (!baedal) {
        console.error('Baedal element not found');
        return;
    }
    gifts.forEach(function (gift) {
        var baedalRect = baedal.getBoundingClientRect();
        var giftRect = gift.getBoundingClientRect();
        if (baedalRect.top < giftRect.bottom &&
            baedalRect.bottom > giftRect.top &&
            baedalRect.left < giftRect.right &&
            baedalRect.right > giftRect.left) {
            score += 1;
            gift.remove();
        }
    });
};
var toggleModalDisplay = function () {
    var modal = document.querySelector('.modal_container');
    var result = document.querySelector('.result');
    if (!modal || !result)
        return;
    result.innerHTML = score.toString();
    modal.classList.toggle('hidden');
};
var startGame = function () {
    var timer = setInterval(function () {
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
var handleRestart = function () {
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
var gameState = 'idle';
var remainingTime = 10;
var score = 0;
window.addEventListener('load', function () {
    var body = document.querySelector('body');
    body === null || body === void 0 ? void 0 : body.addEventListener('keypress', keyPressEventHandler);
    var restartButton = document.querySelector('.restart');
    restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener('click', handleRestart);
    gameState = 'playing';
    showTimer(remainingTime);
    startGame();
});
