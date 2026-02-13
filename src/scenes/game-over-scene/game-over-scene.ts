console.log('connected game over scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameOverScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ``; // reset

    sceneWrapper.innerHTML = `<h1>Game over scene</h1>`;
}