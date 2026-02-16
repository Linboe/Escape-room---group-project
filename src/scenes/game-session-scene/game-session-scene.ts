import './game-session-scene.scss';
import placeholderImage from '../../assets/placeholder-image.jpg';

/** pseudo
 * wrapper for background image
 * wrapper for displaying appending text
 * wrapper for the player to click and select actions
 * background image is a reference to a variable
 * title text is a reference to a variable
 */

let backgroundImage: string | null = null;

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameSessionScene() {
    if (!sceneWrapper || !backgroundImage) return;
    sceneWrapper.innerHTML = ''; // reset

    const backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = backgroundImage;
    backgroundImageElement.loading = 'lazy';
    backgroundImageElement.alt = 'Image of an overgrown train station';

    const roomTitleText = document.createElement('h2');
    roomTitleText.textContent = 'Abandoned Train-station'; //placeholder name

    sceneWrapper.append(roomTitleText, backgroundImageElement);
}

function initializeGameSession() {
    console.log('initialize game session rendition');
    backgroundImage = placeholderImage;
}
initializeGameSession();