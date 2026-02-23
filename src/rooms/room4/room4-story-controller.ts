import type { ButtonEvent, ScriptEvent } from './models';
import { reRenderRoom4 } from './room4';
import { renderGameOverScene } from '../../scenes/game-over-scene/game-over-scene';

// enter silent tide stories
import room4Story from '../../data/stories-data/room4-story/room4-story.json';
import attemptSwimStory from '../../data/stories-data/room4-story/attempt-swim.json';
import climbTreeStory from '../../data/stories-data/room4-story/climb-tree.json';

// crossroads stories
import atCrossroadsStory from '../../data/stories-data/room4-story/at-crossroads-story/at-crossroads.json';

// crossroads monument stories
import atCrossroadsMonumentStory from '../../data/stories-data/room4-story/at-crossroads-story/at-crossroads-monument-story/at-crossroads-monument.json';
import inspectCrossroadsMonumentStory from '../../data/stories-data/room4-story/at-crossroads-story/at-crossroads-monument-story/inspect-crossroads-monument-story/inspect-crossroads-monument.json';
import crossroadsMonumentWinStory from '../../data/stories-data/room4-story/at-crossroads-story/at-crossroads-monument-story/inspect-crossroads-monument-story/crossroads-monument-win.json';
import crossroadsMonumentLoseStory from '../../data/stories-data/room4-story/at-crossroads-story/at-crossroads-monument-story/inspect-crossroads-monument-story/crossroads-monument-lose.json';

// ravine stories
import atRavineStory from '../../data/stories-data/room4-story/at-crossroads-story/at-ravine-story/at-ravine.json';
import ravineJumpStory from '../../data/stories-data/room4-story/at-crossroads-story/at-ravine-story/ravine-jump.json';
import ravineLadderStory from '../../data/stories-data/room4-story/at-crossroads-story/at-ravine-story/ravine-ladder.json';
import inspectRavineMonumentStory from '../../data/stories-data/room4-story/at-crossroads-story/at-ravine-story/inspect-ravine-monument-story/inspect-ravine-monument.json';
import ravineMonumentWinStory from '../../data/stories-data/room4-story/at-crossroads-story/at-ravine-story/inspect-ravine-monument-story/ravine-monument-win.json';
import ravineMonumentLoseStory from '../../data/stories-data/room4-story/at-crossroads-story/at-ravine-story/inspect-ravine-monument-story/ravine-monument-lose.json';

let room4StoryToUse: ScriptEvent[] = room4Story;
let room4StoryIndex: number = 0;
let room4TitleText: string = 'The silent tide';
let room4TextEvent: string = '';
let room4EventMarker: string = '';
let room4StoryEventButtons: ButtonEvent[] = [];
let room4HasLadder: boolean = false; // consider moving to store directory
let room4HasCliffArtifact: boolean = false; // consider moving to store directory
let room4HasRavineArtifact: boolean = false; // consider moving to store directory
let room4CrossroadsMonumentIsBeaten: boolean = false; // consider moving to store directory
let room4RavineMonumentIsBeaten: boolean = false; // consider moving to store directory
let room4CliffMonumentIsBeaten: boolean = false; // consider moving to store directory

export const getRoom4TitleText = () => room4TitleText;
export const getRoom4TextEvent = () => room4TextEvent;
export const getRoom4EventMarker = () => room4EventMarker;
export const getRoom4StoryEventButtons = () => room4StoryEventButtons;
export const getRoom4HasLadder = () => room4HasLadder; // consider moving to store directory
export const getRoom4HasCliffArtifact = () => room4HasCliffArtifact; // consider moving to store directory
export const getRoom4HasRavineArtifact = () => room4HasRavineArtifact; // consider moving to store directory
export const getRoom4CrossroadsMonumentIsBeaten = () => room4CrossroadsMonumentIsBeaten; // consider moving to store directory
export const getRoom4RavineMonumentIsBeaten = () => room4RavineMonumentIsBeaten; // consider moving to store directory
export const getRoom4CliffMonumentIsBeaten = () => room4CliffMonumentIsBeaten; // consider moving to store directory

function turnPage() {
    room4StoryIndex++;
    updateRoom4StoryController();
    reRenderRoom4();
}

// Enter the silent tide specific events - consider converting to a Class
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

// crossroads specific events - consider converting to a Class
function enterCrossroadsMonument() {
    room4StoryToUse = atCrossroadsMonumentStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function enterRavine() {
    room4StoryToUse = atRavineStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function enterCliff() {
    console.log('enter cliff');
}
function escapeWithRavineMonument() {
    console.log('escape with ravine monument');
}
function escapeWithCliffMonument() {
    console.log('escape with cliff monument');
}

// crossroads monument specific events - consider converting to a Class
function inspectCrossroadsMonument() {
    room4StoryToUse = inspectCrossroadsMonumentStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function crossroadsMonumentWin() {
    room4StoryToUse = crossroadsMonumentWinStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function crossroadsMonumentLose() {
    room4StoryToUse = crossroadsMonumentLoseStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}

// ravine specific events - consider converting to a Class
function attemptJumpAcrossRavine() {
    room4StoryToUse = ravineJumpStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function useLadderAsBridge() {
    room4StoryToUse = ravineLadderStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function atRavineMonument() {
    room4StoryToUse = ravineLadderStory;
    room4StoryIndex = 1;
    updateRoom4StoryController();
    reRenderRoom4();
}
function inspectRavineMonument() {
    room4StoryToUse = inspectRavineMonumentStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function ravineMonumentWin() {
    room4StoryToUse = ravineMonumentWinStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}
function ravineMonumentLose() {
    room4StoryToUse = ravineMonumentLoseStory;
    room4StoryIndex = 0;
    updateRoom4StoryController();
    reRenderRoom4();
}

// multi-use events - consider converting to a Class
function returnToCrossroads() {
    room4StoryToUse = atCrossroadsStory;
    room4StoryIndex = 1;
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

        // crossroad events
        case 'at-crossroads-approach-ravine':
            enterRavine();
            return;
        case 'at-crossroads-approach-crossroads-monument':
            enterCrossroadsMonument();
            return;
        case 'at-crossroads-approach-cliff':
            enterCliff();
            return;
        case 'at-crossroads-use-cliff-artifact':
            escapeWithCliffMonument();
            return;
        case 'at-crossroads-use-ravine-artifact':
            escapeWithRavineMonument();
            return;

        // crossroad monument events
        case 'crossroads-monument-turn-around':
            returnToCrossroads();
            return;
        case 'crossroads-monument-inspect-tablet':
            inspectCrossroadsMonument();
            return;
        case 'inspect-crossroads-monument-win':
            crossroadsMonumentWin();
            return;
        case 'inspect-crossroads-monument-lose':
            crossroadsMonumentLose();
            return;
        case 'crossroads-monument-win-turn-back-continue':
            room4HasLadder = true;
            room4CrossroadsMonumentIsBeaten = true;
            returnToCrossroads();
            return;
        case 'crossroads-monument-failed-try-again':
            inspectCrossroadsMonument();
            return;
        case 'crossroads-monument-failed-exit':
            enterCrossroadsMonument();
            return;

        // ravine events
        case 'at-ravine-attempt-jump-across':
            attemptJumpAcrossRavine();
            return;
        case 'at-ravine-turn-around':
            returnToCrossroads();
            return;
        case 'at-ravine-use-ladder-as-bridge':
            useLadderAsBridge();
            return;
        case 'ravine-trip-continue':
            console.log('game over');
            renderGameOverScene();
            return;
        case 'across-ravine-turn-around':
            returnToCrossroads();
            return;
        case 'across-ravine-inspect-monument':
            inspectRavineMonument();
            return;
        case 'inspect-ravine-monument-lose':
            ravineMonumentLose();
            return;
        case 'ravine-monument-failed-exit':
            atRavineMonument();
            return;
        case 'ravine-monument-failed-try-again':
            inspectRavineMonument();
            return;
        case 'inspect-ravine-monument-win':
            ravineMonumentWin();
            return;
        case 'ravine-monument-win-turn-back-continue':
            room4HasRavineArtifact = true;
            room4RavineMonumentIsBeaten = true;
            returnToCrossroads();
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