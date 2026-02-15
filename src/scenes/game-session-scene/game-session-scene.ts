import './game-session-scene.scss'

console.log('connected game session scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameSessionScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ``; // reset

    sceneWrapper.innerHTML = `<h1>Game session scene</h1>`;
}