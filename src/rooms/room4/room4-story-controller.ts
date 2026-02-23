import type { ButtonEvent, ScriptEvent } from './models';
import room4Story from '../../data/stories-data/room4-story/room4-story.json';
import { reRenderRoom4 } from './room4';

let room4ScriptToUse: ScriptEvent[] = room4Story;
let room4ScriptIndex: number = 0;
let room4TitleText: string = 'The silent tide';
let room4TextEvent: string = '';
let room4EventMarker: string = '';
let room4StoryEventButtons: ButtonEvent[] = [];

export function getRoom4TitleText() {
    return room4TitleText;
}

export function getRoom4TextEvent() {
    return room4TextEvent;
}

export function getRoom4EventMarker() {
    return room4EventMarker;
}

export function getRoom4StoryEventButtons() {
    return room4StoryEventButtons;
}

function turnPage() {
    room4ScriptIndex++;
    updateRoom4StoryController();
    reRenderRoom4();
}

export function handleRoom4ClickStoryEventButton(event: Event) {
    const clickedStoryEventButton = event.currentTarget as HTMLElement;
    const _functionMarker = clickedStoryEventButton.dataset.functionMarker;

    switch(_functionMarker) {
        case 'no-event-next':
            turnPage();
            return;
        default:
            return;
    }
}

function updateRoom4StoryController() {
    const currentStoryObject = room4ScriptToUse[room4ScriptIndex];
    room4TextEvent = currentStoryObject.textEvent!;
    room4EventMarker = currentStoryObject.eventMarker!;
    if (currentStoryObject.buttonEvents) { // fetch event buttons
        room4StoryEventButtons = currentStoryObject.buttonEvents;
    } else { // if there are not event buttons, make one that flips to the next page
        room4StoryEventButtons = [
            {
                label: 'Next',
                buttonMarker: 'no-event-next'
            },
        ];
    }
}

// initialize
updateRoom4StoryController();