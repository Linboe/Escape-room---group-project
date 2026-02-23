import './room4.scss';
import backgroundImage from '../../assets/alternative/soaked-alt-1.jpg';
import { getRoom4EventMarker, getRoom4StoryEventButtons, getRoom4TextEvent, getRoom4TitleText, handleRoom4ClickStoryEventButton } from './room4-story-controller';

export function room4(sceneWrapper: HTMLDivElement | null, nextRoom: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = ''; // reset
    sceneWrapper.append(initRenderRoom4());
    reRenderRoom4();

    const escapeRoomButton: HTMLButtonElement | null = document.querySelector('#escapeRoom4Button');
    escapeRoomButton?.addEventListener('click', () => {
        nextRoom(); // Proceed to room 5
    });
}

function initRenderRoom4() {
    // parent wrapper
    const gameSessionWrapper = document.createElement('div');
    gameSessionWrapper.classList.add('game-session-wrapper');

    // gameSessionWrapper's children
    const roomTitleTextElement = document.createElement('h2');
    roomTitleTextElement.classList.add('room-title-text');
    roomTitleTextElement.id = 'roomTitleText';

    const backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = backgroundImage;
    backgroundImageElement.loading = 'lazy';
    backgroundImageElement.alt = 'Background image';
    backgroundImageElement.classList.add('room-background-image');

    const eventTextElement = document.createElement('p');
    eventTextElement.id = 'eventText';
    eventTextElement.classList.add('event-text');

    const storyEventButtonsWrapperElement = document.createElement('div');
    storyEventButtonsWrapperElement.classList.add('player-interaction-buttons-wrapper');
    storyEventButtonsWrapperElement.id = 'storyEventButtonsWrapper';

    // compile
    gameSessionWrapper.append(
        roomTitleTextElement, eventTextElement, storyEventButtonsWrapperElement, backgroundImageElement
    );
    return gameSessionWrapper;
}

export function reRenderRoom4() { // accessible for story-controller
    const roomTitleTextElement = document.getElementById('roomTitleText') as HTMLHeadElement | null;
    if (!roomTitleTextElement) return;
    roomTitleTextElement.textContent = getRoom4TitleText();

    const eventTextElement = document.getElementById('eventText') as HTMLParagraphElement | null;
    if (!eventTextElement) return;
    eventTextElement.textContent = getRoom4TextEvent();

    const storyEventButtonsWrapperElement = document.getElementById('storyEventButtonsWrapper');
    if (!storyEventButtonsWrapperElement) return;
    storyEventButtonsWrapperElement.innerHTML = ''; // reset

    console.log(getRoom4StoryEventButtons());
    const room4StoryEventButtons = getRoom4StoryEventButtons();

    for (let i: number = 0; i < room4StoryEventButtons.length; i++) {
        const _buttonMarker = room4StoryEventButtons[i].buttonMarker;
        const _eventMarker = getRoom4EventMarker();

        const newStoryEventButton = document.createElement('button');
        if (room4StoryEventButtons[i].buttonMarker === 'no-event-next') {
            newStoryEventButton.dataset.functionMarker = 'no-event-next';
        } else {
            newStoryEventButton.dataset.functionMarker = `${_eventMarker}-${_buttonMarker}`;
        }

        newStoryEventButton.innerText = room4StoryEventButtons[i].label!;
        newStoryEventButton.classList.add('interaction-button');
        newStoryEventButton.addEventListener('click', handleRoom4ClickStoryEventButton);
        // insert conditional here
        storyEventButtonsWrapperElement.append(newStoryEventButton);
    }
}