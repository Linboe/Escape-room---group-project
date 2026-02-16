import './game-session-scene.scss';

console.log('connected game session scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameSessionScene() {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = ''; // reset

  // innerHTML method
  //    sceneWrapper.innerHTML = `<h2>Game session scene</h2>`;

  // Imperative DOM building method
  const h2PlaceholderText = document.createElement('h2');
  h2PlaceholderText.textContent = 'Game session scene';
  sceneWrapper.append(h2PlaceholderText);
}