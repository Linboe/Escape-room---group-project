import './sign-in-scene.scss'

console.log('connected sign in scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderSignInScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ``; // reset

    // innerHTML method
//    sceneWrapper.innerHTML = `<h2>Sign in scene</h2>`;

    // Imperative DOM building method
    const h2PlaceholderText = document.createElement('h2');
    h2PlaceholderText.textContent = 'Sign in scene';
    sceneWrapper.append(h2PlaceholderText);
}