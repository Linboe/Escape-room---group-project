console.log('connected about scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderAboutScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ``; // reset

    sceneWrapper.innerHTML = `<h1>About scene</h1>`;
}