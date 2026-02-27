import './room4.scss';
import backgroundImage from '../../assets/alternative/soaked-alt-1.jpg';
import { getRoom4CliffMonumentIsBeaten, getRoom4CrossroadsMonumentIsBeaten, getRoom4EventMarker, getRoom4HasCliffArtifact, getRoom4HasLadder, getRoom4HasRavineArtifact, getRoom4RavineMonumentIsBeaten, getRoom4StoryEventButtons, getRoom4TextEvent, getRoom4TitleText, handleRoom4ClickStoryEventButton } from './room4-story-controller';

export function room4(sceneWrapper: HTMLDivElement | null, nextRoom: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.classList.add('scene-wrapper');
    sceneWrapper.innerHTML = ''; // reset
    sceneWrapper.append(initRenderRoom4());
    reRenderRoom4();

    const escapeRoom4Button = document.createElement('button');
    if (!escapeRoom4Button) return;
    escapeRoom4Button.textContent = 'Escape The silent tide';
    escapeRoom4Button.addEventListener('click', () => {
        nextRoom(); // Proceed to room 5
    });
    escapeRoom4Button.classList.add('escape-room-4-button');
    escapeRoom4Button.id = 'escapeRoom4Button';
    escapeRoom4Button.disabled = true;
    sceneWrapper.append(escapeRoom4Button);
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

    const storyEventButtonsWrapperElement = document.getElementById('storyEventButtonsWrapper') as HTMLDivElement | null;
    if (!storyEventButtonsWrapperElement) return;
    storyEventButtonsWrapperElement.innerHTML = ''; // reset

    const room4StoryEventButtons = getRoom4StoryEventButtons();
    for (let i: number = 0; i < room4StoryEventButtons.length; i++) {
        const _buttonMarker = room4StoryEventButtons[i].buttonMarker;
        const _eventMarker = getRoom4EventMarker();
        const _conditionalMarker = room4StoryEventButtons[i].conditionalMarker;

        const newStoryEventButton = document.createElement('button');
        // dataset for event marker need to look different whether it has a specific event
        if (room4StoryEventButtons[i].buttonMarker === 'no-event-next') {
            newStoryEventButton.dataset.functionMarker = 'no-event-next';
        } else {
            newStoryEventButton.dataset.functionMarker = `${_eventMarker}-${_buttonMarker}`;
        }

        // give conditional marker & gatekeep buttons that does not meet the given condition(s)
        if (_conditionalMarker) {
            newStoryEventButton.disabled = true;
            newStoryEventButton.dataset.conditionalMarker = _conditionalMarker;

            // revert the gatekept button if condition is met
            switch (_conditionalMarker) {
                case 'has-ladder':
                    if (getRoom4HasLadder()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                case 'need-cliff-artifact':
                    if (getRoom4HasCliffArtifact()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                case 'need-ravine-artifact':
                    if (getRoom4HasRavineArtifact()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                // Monuments work the opposite: gatekept when beaten
                case 'crossroads-monument-is-beaten':
                    if (!getRoom4CrossroadsMonumentIsBeaten()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                case 'ravine-monument-is-beaten':
                    if (!getRoom4RavineMonumentIsBeaten()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                case 'cliff-monument-is-beaten':
                    if (!getRoom4CliffMonumentIsBeaten()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                default:
                    break;
            }
        }

        newStoryEventButton.innerText = room4StoryEventButtons[i].label!;
        newStoryEventButton.classList.add('interaction-button');
        newStoryEventButton.addEventListener('click', handleRoom4ClickStoryEventButton);
        // insert conditional here
        storyEventButtonsWrapperElement.append(newStoryEventButton);
    }
}