import './game-session-scene.scss';
import placeholderImage from '../../assets/placeholder-image.jpg';

let scriptIndex = 2;

const constantRoomData = {
    roomTitleText: 'Abandoned Train-station',
    backgroundImage: placeholderImage,
    backgroundImageScreenReader: 'Image of an overgrown train station',
};

const scriptData = [
    {
        textEvent: 'You enter what seem to have been a train station... What will you do?',
        buttonEvents: [
            {
                text: 'event 1 button 1'
            },
            {
                text: 'event 1 button 2'
            },
        ]
    },
    {
        textEvent: "The train doesn't seem to be comming", // eslint-disable-line
        buttonEvents: [
            {
                text: 'event 2 button 1'
            },
            {
                text: 'event 2 button 2'
            },
            {
                text: 'event 2 button 3'
            },
            {
                text: 'event 2 button 4'
            }
        ]
    },
    {
        textEvent: "This action has no buttons", // eslint-disable-line
        buttonEvents: []
    },
];

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
        console.log(buttonEvents[i].text);
        const newActionButton = document.createElement('button');
        newActionButton.innerText = buttonEvents[i].text;
        newActionButton.classList.add('interaction-button');
        playerInteractionButtonsWrapper.append(newActionButton);
    }
    /*
    const actionButtonPlaceholder1 = document.createElement('button');
    actionButtonPlaceholder1.innerText = 'button 1';
    actionButtonPlaceholder1.classList.add('interaction-button');

    const actionButtonPlaceholder2 = document.createElement('button');
    actionButtonPlaceholder2.innerText = 'button 2';
    actionButtonPlaceholder2.classList.add('interaction-button');

    playerInteractionButtonsWrapper.append(actionButtonPlaceholder1, actionButtonPlaceholder2);
    */
    

    gameSessionWrapper.append(roomTitleTextElement, eventTextElement, playerInteractionButtonsWrapper, backgroundImageElement);
    sceneWrapper.append(gameSessionWrapper);
}
