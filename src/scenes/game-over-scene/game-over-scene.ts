import './game-over-scene.scss'

console.log('connected game over scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameOverScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ``; // reset

    // innerHTML method
//    sceneWrapper.innerHTML = `<h2>Game over scene</h2>`;

    // Imperative DOM building method
    const h2PlaceholderText = document.createElement('h2');
    h2PlaceholderText.textContent = 'Game over scene';
    sceneWrapper.append(h2PlaceholderText);
}