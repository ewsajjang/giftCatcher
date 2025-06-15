const keyPressEventHandler = (event: KeyboardEvent) => {
  console.log('Key pressed:', event);
};

window.addEventListener('load', () => {
  const body = document.querySelector('body');
  body?.addEventListener('keypress', keyPressEventHandler);
});
