console.log('connected main menu scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderMainMenuScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ``; // reset

    sceneWrapper.innerHTML = `<h1>Main menu scene</h1>`;
}