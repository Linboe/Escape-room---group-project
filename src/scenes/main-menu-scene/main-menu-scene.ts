import './main-menu-scene.scss';

console.log('connected main menu scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderMainMenuScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ''; // reset

    // innerHTML method
    //    sceneWrapper.innerHTML = `<h2>Main menu scene</h2>`;

    // Imperative DOM building method
    const h2PlaceholderText = document.createElement('h2');
    h2PlaceholderText.textContent = 'Main menu scene';
    sceneWrapper.append(h2PlaceholderText);
}