import './about-scene.scss';

console.log('connected about scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderAboutScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ''; // reset

    // innerHTML method
    //    sceneWrapper.innerHTML = `<h2>About scene</h2>`;

    // Imperative DOM building method
    const h2PlaceholderText = document.createElement('h2');
    h2PlaceholderText.textContent = 'About scene';
    sceneWrapper.append(h2PlaceholderText);
}