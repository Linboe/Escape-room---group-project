import './game-session-scene.scss';
import placeholderImage from '../../assets/placeholder-image.jpg';

// TODO: Discuss with team where script index should live
let scriptIndex = 2;

// TODO: Discuss with team where room data should live
const constantRoomData = {
    roomTitleText: 'Abandoned Train-station',
    backgroundImage: placeholderImage,
    backgroundImageScreenReader: 'Image of an overgrown train station',
};

// TODO: Discuss with team where script data should live
const scriptData = [
    {
        textEvent: 'You enter what seem to have been a train station... What will you do?',
        buttonEvents: [
            {
                label: 'test 1', // displayed in the UI
                functionMarker: 'script-1-test-1' // to know what function to call
            },
            {
                label: 'test 2',
                functionMarker: 'script-1-test-2'
            }
        ]
    },
    {
        textEvent: "The train doesn't seem to be comming", // eslint-disable-line
        buttonEvents: [
            {
                label: 'test 1',
                functionMarker: 'script-2-test-1'
            },
            {
                label: 'test 2',
                functionMarker: 'script-2-test-2'
            },
            {
                label: 'test 3',
                functionMarker: 'script-2-test-3'
            },
            {
                label: 'test 4',
                functionMarker: 'script-2-test-4'
            },
        ]
    },
    {
        textEvent: "This action has no buttons", // eslint-disable-line
        buttonEvents: []
    },
];

function pushEventButton(event: Event) {
    const clickedButton = event.currentTarget as HTMLElement;
    if (!clickedButton) return;
    console.log(clickedButton.dataset.functionMarker);
}

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameSessionScene() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = ''; // reset

    // parent wrapper
    const gameSessionWrapper = document.createElement('div');
    gameSessionWrapper.classList.add('game-session-wrapper');

    const roomTitleTextElement = document.createElement('h2');
    roomTitleTextElement.textContent = constantRoomData.roomTitleText; //placeholder name
    roomTitleTextElement.classList.add('room-title-text');

    const backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = constantRoomData.backgroundImage;
    backgroundImageElement.loading = 'lazy';
    backgroundImageElement.alt = constantRoomData.backgroundImageScreenReader;
    backgroundImageElement.classList.add('room-background-image');

    const eventTextElement = document.createElement('p');
    eventTextElement.innerText = scriptData[scriptIndex].textEvent; // placeholder
    eventTextElement.classList.add('event-text');

    const playerInteractionButtonsWrapper = document.createElement('div');
    playerInteractionButtonsWrapper.classList.add('player-interaction-buttons-wrapper');

    // placeholder interact buttons

    const buttonEvents = scriptData[scriptIndex].buttonEvents;
    console.log(buttonEvents.length);

    for (let i: number = 0; i < buttonEvents.length; i++) {
        console.log(buttonEvents[i]);
        const newActionButton = document.createElement('button');
        newActionButton.innerText = buttonEvents[i].label;
        newActionButton.classList.add('interaction-button');
        newActionButton.dataset.functionMarker = buttonEvents[i].functionMarker;
        newActionButton.addEventListener('click', pushEventButton);
        playerInteractionButtonsWrapper.append(newActionButton);
    }

    gameSessionWrapper.append(roomTitleTextElement, eventTextElement, playerInteractionButtonsWrapper, backgroundImageElement);
    sceneWrapper.append(gameSessionWrapper);
}
