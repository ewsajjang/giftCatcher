var keyPressEventHandler = function (event) {
    console.log('Key pressed:', event);
};
window.addEventListener('load', function () {
    var body = document.querySelector('body');
    body === null || body === void 0 ? void 0 : body.addEventListener('keypress', keyPressEventHandler);
});
