import type { ButtonEvent, ScriptEvent } from './models';
import { reRenderRoom4 } from './room4';

// enter silent tide stories
import room4Story from '../../data/stories-data/room4-story/room4-story.json';
import attemptSwimStory from '../../data/stories-data/room4-story/attempt-swim.json';
import climbTreeStory from '../../data/stories-data/room4-story/climb-tree.json';

// crossroad scripts
import atCrossroadsStory from '../../data/stories-data/room4-story/at-crossroads-story/at-crossroads-story.json';

let room4StoryToUse: ScriptEvent[] = room4Story;
let room4StoryIndex: number = 0;
let room4TitleText: string = 'The silent tide';
let room4TextEvent: string = '';
let room4EventMarker: string = '';
let room4StoryEventButtons: ButtonEvent[] = [];
let room4HasLadder: boolean = false; // consider moving to store directory
let room4HasCliffArtifact: boolean = false; // consider moving to store directory
let room4HasRavineArtifact: boolean = false; // consider moving to store directory

export const getRoom4TitleText = () => room4TitleText;
export const getRoom4TextEvent = () => room4TextEvent;
export const getRoom4EventMarker = () => room4EventMarker;
export const getRoom4StoryEventButtons = () => room4StoryEventButtons;
export const getRoom4HasLadder = () => room4HasLadder; // consider moving to store directory
export const getRoom4HasCliffArtifact = () => room4HasCliffArtifact; // consider moving to store directory
export const getRoom4HasRavineArtifact = () => room4HasRavineArtifact; // consider moving to store directory

function turnPage() {
    room4StoryIndex++;
    updateRoom4StoryController();
    reRenderRoom4();
}

// Enter the silent tide specific events
function attemptSwim() {
    room4StoryToUse = attemptSwimStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function attemptSwimContinue() {
    room4StoryToUse = room4Story;
    room4StoryIndex = 2;
    updateRoom4StoryController();
    reRenderRoom4();
}
function climbTree() {
    room4StoryToUse = climbTreeStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function climbTreeContinue() {
    room4StoryToUse = room4Story;
    room4StoryIndex = 2;
    updateRoom4StoryController();
    reRenderRoom4();
}
function enterCrossroads() {
    room4StoryToUse = atCrossroadsStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}

export function handleRoom4ClickStoryEventButton(event: Event) {
    const clickedStoryEventButton = event.currentTarget as HTMLElement;
    const _functionMarker = clickedStoryEventButton.dataset.functionMarker;

    switch(_functionMarker) {
        // no event next
        case 'no-event-next':
            turnPage();
            return;

        // enter the silent tide events
        case 'enter-silent-tide-attempt-swim':
            attemptSwim();
            return;
        case 'cannot-swim-towards-surface-continue':
            attemptSwimContinue();
            return;
        case 'enter-silent-tide-climb-tree':
            climbTree();
            return;
        case 'cannot-climb-tree-continue':
            climbTreeContinue();
            return;
        case 'enter-silent-tide-go-to-crossroads':
            enterCrossroads();
            return;

        // default
        default:
            return;
    }
}

function updateRoom4StoryController() {
    const currentStoryObject = room4StoryToUse[room4StoryIndex];
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