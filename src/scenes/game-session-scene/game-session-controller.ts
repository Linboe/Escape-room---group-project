// TS file handling game flow and function calling
import { renderGameOverScene } from '../game-over-scene/game-over-scene';
import { reRenderSameRoom } from './game-session-scene';

export let scriptIndex: number = 0;

export function nextScript() {
    scriptIndex++;
    console.log('script index is now:', scriptIndex);
    reRenderSameRoom();
}

export function actionButtonEvent(event: Event) {
    const clickedButton = event.currentTarget as HTMLElement;
    if (!clickedButton) return;
    const _functionMarker = clickedButton.dataset.functionMarker;

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