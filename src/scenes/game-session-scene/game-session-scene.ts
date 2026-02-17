import './game-session-scene.scss';
import placeholderImage from '../../assets/placeholder-image.jpg';
import { renderGameOverScene } from '../game-over-scene/game-over-scene';

// TODO: Discuss with team where script index should live
let scriptIndex: number = 0;

// TODO: Discuss with team where room data should live
const constantRoomData = {
    roomTitleText: 'Abandoned Train-station',
    backgroundImage: placeholderImage,
    backgroundImageScreenReader: 'Image of an overgrown train station',
};

// TODO: Discuss with team where script data should live (consider turning this to a JSON to live inside the data directory)
const scriptData = [
    {
        textEvent: 'You enter what seem to have been a train station... What will you do?',
        eventMarker: 'enter-train-station',
        buttonEvents: [
            {
                label: 'Action A (next script)',
                buttonMarker: 'action-a'
            },
            {
                label: 'Action B',
                buttonMarker: 'action-b'
            }
        ]
    },
    {
        textEvent: "The train doesn't seem to be comming", // eslint-disable-line
        eventMarker: 'train-not-comming',
        buttonEvents: [
            {
                label: 'Action A',
                buttonMarker: 'action-a'
            },
            {
                label: 'Action B',
                buttonMarker: 'action-b'
            },
            {
                label: 'Action C (next script)',
                buttonMarker: 'action-c'
            },
            {
                label: 'action D',
                buttonMarker: 'action-d'
            },
        ]
    },
    {
        textEvent: "This action has no buttons", // eslint-disable-line
        eventMarker: '',
        buttonEvents: []
    },
    {
        textEvent: "It's a dead end", // eslint-disable-line
        eventMarker: 'dead-end',
        buttonEvents: [
            {
                label: 'Give up',
                buttonMarker: 'give-up'
            }
        ]
    },
];

function pushEventButton(event: Event) {
    const clickedButton = event.currentTarget as HTMLElement;
    if (!clickedButton) return;
    const _functionMarker = clickedButton.dataset.functionMarker;
    console.log(clickedButton.dataset.functionMarker);

    switch (_functionMarker) {
        case 'enter-train-station-action-a':
            console.log("There's a train station and the player performed action A"); // eslint-disable-line
            nextScript();
            break;
        case 'enter-train-station-action-b':
            console.log("There's a train station and the player performed action B"); // eslint-disable-line
            break;
        case 'train-not-comming-action-a':
            console.log("The train isn't comming and the player performed action A"); // eslint-disable-line
            break;
        case 'train-not-comming-action-b':
            console.log("The train isn't comming and the player performed action B"); // eslint-disable-line
            break;
        case 'train-not-comming-action-c':
            console.log("The train isn't comming and the player performed action C"); // eslint-disable-line
            nextScript();
            break;
        case 'train-not-comming-action-d':
            console.log("The train isn't comming and the player performed action D"); // eslint-disable-line
            break;
        case 'dead-end-give-up':
            console.log('player gave up');
            renderGameOverScene();
            break;
    }
}

function nextScript() {
    scriptIndex++;
    console.log('script index is now:', scriptIndex);
    reRenderSameRoom();
}

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameSessionScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ''; // reset

    // parent wrapper
    const gameSessionWrapper = document.createElement('div');
    gameSessionWrapper.classList.add('game-session-wrapper');

    const roomTitleTextElement = document.createElement('h2');
    roomTitleTextElement.textContent = constantRoomData.roomTitleText;
    roomTitleTextElement.classList.add('room-title-text');

    const backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = constantRoomData.backgroundImage;
    backgroundImageElement.loading = 'lazy';
    backgroundImageElement.alt = constantRoomData.backgroundImageScreenReader;
    backgroundImageElement.classList.add('room-background-image');

    const eventTextElement = document.createElement('p');
    eventTextElement.id = 'eventTextElement';
    eventTextElement.innerText = scriptData[scriptIndex].textEvent;
    eventTextElement.classList.add('event-text');

    const playerInteractionButtonsWrapper = document.createElement('div');
    playerInteractionButtonsWrapper.classList.add('player-interaction-buttons-wrapper');
    playerInteractionButtonsWrapper.id = 'playerInteractionButtonsWrapper';

    // placeholder interact buttons
    const _eventMarker = scriptData[scriptIndex].eventMarker;
    const buttonEvents = scriptData[scriptIndex].buttonEvents;

    if (buttonEvents.length === 0) {
        console.log('no buttons');
        const nextScriptButton = document.createElement('button');
        nextScriptButton.innerText = 'next';
        nextScriptButton.classList.add('next-script-button');
        nextScriptButton.addEventListener('click', nextScript);

        playerInteractionButtonsWrapper.append(nextScriptButton);
    } else {
        for (let i: number = 0; i < buttonEvents.length; i++) {
            const _buttonMarker = buttonEvents[i].buttonMarker;
            const newActionButton = document.createElement('button');

            newActionButton.innerText = buttonEvents[i].label;
            newActionButton.classList.add('interaction-button');
            newActionButton.dataset.functionMarker = `${_eventMarker}-${_buttonMarker}`;
            newActionButton.addEventListener('click', pushEventButton);

            playerInteractionButtonsWrapper.append(newActionButton);
        }
    }


    gameSessionWrapper.append(roomTitleTextElement, eventTextElement, playerInteractionButtonsWrapper, backgroundImageElement);
    sceneWrapper.append(gameSessionWrapper);
}

function reRenderSameRoom() {
    console.log('re render same room');
    if (!sceneWrapper) return;

    const newEventText = document.getElementById('eventTextElement') as HTMLParagraphElement | null;
    if (!newEventText) return;

    const playerInteractionButtonsWrapper = document.getElementById('playerInteractionButtonsWrapper') as HTMLDivElement | null;
    if (!playerInteractionButtonsWrapper) return;
    playerInteractionButtonsWrapper.innerHTML = ``; // eslint-disable-line

    const _eventMarker = scriptData[scriptIndex].eventMarker;
    const buttonEvents = scriptData[scriptIndex].buttonEvents;

    if (buttonEvents.length === 0) {
        console.log('no buttons');
        const nextScriptButton = document.createElement('button');
        nextScriptButton.innerText = 'next';
        nextScriptButton.classList.add('next-script-button');
        nextScriptButton.addEventListener('click', nextScript);

        playerInteractionButtonsWrapper.append(nextScriptButton);
    } else {
        for (let i: number = 0; i < buttonEvents.length; i++) {
            const _buttonMarker = buttonEvents[i].buttonMarker;
            const newActionButton = document.createElement('button');

            newActionButton.innerText = buttonEvents[i].label;
            newActionButton.classList.add('interaction-button');
            newActionButton.dataset.functionMarker = `${_eventMarker}-${_buttonMarker}`;
            newActionButton.addEventListener('click', pushEventButton);

            playerInteractionButtonsWrapper.append(newActionButton);
        }
    }

    newEventText.innerText = scriptData[scriptIndex].textEvent;
}