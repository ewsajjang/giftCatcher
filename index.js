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
};
var createGift = function () {
    var gift = document.createElement('img');
    gift.src = 'images/gift.png';
    var randomLocation = createRandomLocation();
    gift.style.position = 'absolute';
    gift.style.left = "".concat(randomLocation.x, "px");
    gift.style.top = "".concat(randomLocation.y, "px");
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
var gameState = 'idle';
var remainingTime = 10; // 60 seconds
window.addEventListener('load', function () {
    var body = document.querySelector('body');
    body === null || body === void 0 ? void 0 : body.addEventListener('keypress', keyPressEventHandler);
    gameState = 'playing';
    var timer = setInterval(function () {
        remainingTime -= 1;
        createGift();
        if (remainingTime <= 0) {
            clearInterval(timer);
            gameState = 'end';
        }
    }, 1000);
});
