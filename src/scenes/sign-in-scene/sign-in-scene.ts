console.log('connected sign in scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderSignInScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ``; // reset

    sceneWrapper.innerHTML = `<h1>Sign in scene</h1>`;
}