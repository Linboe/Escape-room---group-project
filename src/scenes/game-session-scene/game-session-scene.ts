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

    // parent wrapper
    const gameSessionWrapper = document.createElement('div');
    gameSessionWrapper.classList.add('test-wrapper');

    const roomTitleText = document.createElement('h2');
    roomTitleText.textContent = 'Abandoned Train-station'; //placeholder name
    roomTitleText.classList.add('room-title-text');

    const backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = backgroundImage;
    backgroundImageElement.loading = 'lazy';
    backgroundImageElement.alt = 'Image of an overgrown train station';
    backgroundImageElement.classList.add('room-background-image');

    const eventText = document.createElement('p');
    eventText.innerText = 'You enter what seem to have been a train station...'; // placeholder
    eventText.classList.add('event-text');

    const playerInteractionButtonsWrapper = document.createElement('div');
    playerInteractionButtonsWrapper.classList.add('player-interaction-buttons-wrapper');

    // placeholder interact buttons
    const actionButtonPlaceholder1 = document.createElement('button');
    actionButtonPlaceholder1.innerText = 'action 1';
    actionButtonPlaceholder1.classList.add('interaction-button');

    const actionButtonPlaceholder2 = document.createElement('button');
    actionButtonPlaceholder2.innerText = 'action 2';
    actionButtonPlaceholder2.classList.add('interaction-button');

    // compile
    playerInteractionButtonsWrapper.append(actionButtonPlaceholder1, actionButtonPlaceholder2);

    gameSessionWrapper.append(roomTitleText, eventText, playerInteractionButtonsWrapper, backgroundImageElement);
    sceneWrapper.append(gameSessionWrapper);
}

function initializeGameSession() {
    console.log('initialize game session rendition');
    backgroundImage = placeholderImage;
}
initializeGameSession();