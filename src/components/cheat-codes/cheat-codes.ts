// Cheat Codes is created for the development team to test the logic responsiveness of logic by clicking on buttons
// Do not make this accessible for production
// TODO: Discuss with the team how we mark dev-team instructions
//import { renderAboutScene } from '../../scenes/about-scene/about-scene';
//import { renderGameOverScene } from '../../scenes/game-over-scene/game-over-scene';
//import { renderGameSessionScene } from '../../scenes/game-session-scene/game-session-scene';
//import { renderMainMenuScene } from '../../scenes/main-menu-scene/main-menu-scene';
//import { renderSignInScene } from '../../scenes/sign-in-scene/sign-in-scene';
//import { renderHighScore } from '../high-score/high-score';
import { saveMyStringState } from '../../store/database/local-storage-database';
import {
    changeMySessionStringState,
    logMySessionStringState,
    logSessionBooleanState,
    toggleMySessionBooleanState,
} from '../../store/session/session-memory';
import { renderStatusBar } from '../status-bar/status-bar';
import './cheat-code-styles.scss';
import {  createCheatButton  } from './cheat-codes-helper';
import { state } from '../../state/gamestate';
import { render } from '../../main';
import { renderNextRoom } from '../../main';
import { room1 } from '../../rooms/room1/room1';
import { room3 } from '../../rooms/room3/room3';
import { room4 } from '../../rooms/room4/room4';
import { room5 } from '../../rooms/room5/room5';
import { room6 } from '../../rooms/room6/room6';

let showCheatCodes: boolean = false;
const showCheatCodesButton = document.getElementById(
    'showCheatCodesButton',
) as HTMLButtonElement | null;
const cheatCodesWrapper = document.getElementById(
    'cheatCodesWrapper',
) as HTMLDivElement | null;

// ===================================
// Create and store cheat buttons here
// ===================================
const cheatButtons = {
    cheatButton1: createCheatButton('cheat test 1', specialCheatCode1),
    cheatButton2: createCheatButton('cheat test 2', specialCheatCode2),

    cheatRenderSignInScene: createCheatButton('render sign in scene', () => {
        state.screen = 'login';
        render();
    }),

    cheatRenderMainMenuScene: createCheatButton('render main menu scene', () => {
        state.screen = 'menu';
        render();
    }),

    cheatRenderAboutScene: createCheatButton('render about scene', () => {
        state.screen = 'about';
        render();
    }),

    cheatRenderGameOverScene: createCheatButton('render game over scene', () => {
        state.screen = 'gameover';
        render();
        console.log('Showing game over scene');
    }),

    cheatRenderVictoryScene: createCheatButton('render victory scene', () => {
        state.screen = 'victory';
        render();
        console.log('Showing victory scene');
    }),

    cheatRenderRoom1: createCheatButton(
        'render room 1',
        () => room1(document.querySelector('#sceneWrapper'), renderNextRoom)
    ),

    cheatRenderRoom2: createCheatButton( 
        'render room 2',
        () => {
            state.currentRoom =1; 
            state.screen = 'room';
            render();
        }),

    cheatRenderRoom3: createCheatButton(
        'render room 3',
        () => room3(document.querySelector('#sceneWrapper'), renderNextRoom)
    ),
    cheatRenderRoom4: createCheatButton(
        'render room 4',
        () => room4(document.querySelector('#sceneWrapper'), renderNextRoom)
    ),
    cheatRenderRoom5: createCheatButton(
        'render room 5',
        () => room5(document.querySelector('#sceneWrapper'), renderNextRoom)
    ),
    cheatRenderRoom6: createCheatButton(
        'render room 6',
        () => room6(document.querySelector('#sceneWrapper'), renderNextRoom)
    ),

    /*cheatRenderRoom6: createCheatButton( // BUGG
        'render room 6',
        () => {
            state.currentRoom =5; 
            state.screen = 'room';
            render();
        }
    ),*/

    cheatCheckMySessionString: createCheatButton('check my session string', logMySessionStringState),
    cheatSetMySessionStringToFoo: createCheatButton('set my session string to Foo', setSessionStringToFoo),
    cheatSetMySessionStringToBar: createCheatButton('set my session string to Bar', setSessionStringToBar),
    cheatCheckMySessionBoolean: createCheatButton('check my session boolean', logSessionBooleanState),
    cheatToggleMySessionBoolean: createCheatButton('toggle my session boolean', toggleMySessionBooleanState),
    cheatSaveMyStringToDB: createCheatButton('save my string to DB', saveMyStringState),
    cheatRenderStatusBar: createCheatButton('render status bar', renderStatusBar)
};
// ===================================

// =============================
// Local special cheat functions
// =============================
function specialCheatCode1() {
    console.log('run special cheat code 1');
}
function specialCheatCode2() {
    console.log('run special cheat code 2');
}
function setSessionStringToFoo() {
    changeMySessionStringState('Foo'); // an example why special local cheat functions may be needed
}
function setSessionStringToBar() {
    changeMySessionStringState('Bar');
}
// =============================

showCheatCodesButton?.addEventListener('click', toggleCheatCodeButtons);
function toggleCheatCodeButtons() {
    showCheatCodes = !showCheatCodes;
    if (!cheatCodesWrapper) return;
    if (showCheatCodes) {
        cheatCodesWrapper.append(

            // ======================
            // DEV – ROOMS
            // ======================
            cheatButtons.cheatRenderRoom1,
            cheatButtons.cheatRenderRoom2,
            cheatButtons.cheatRenderRoom3,
            cheatButtons.cheatRenderRoom4,
            cheatButtons.cheatRenderRoom5,
            cheatButtons.cheatRenderRoom6,

            // ======================
            // DEV – ROOMS
            // ======================
            cheatButtons.cheatRenderRoom1,
            cheatButtons.cheatRenderRoom2,
            cheatButtons.cheatRenderRoom3,
            cheatButtons.cheatRenderRoom4,
            cheatButtons.cheatRenderRoom5,
            cheatButtons.cheatRenderRoom6,
            // ==================================================
            // Append cheat buttons here, disable to hide from UI
            // ==================================================
            //            cheatButtons.cheatButton1,
            //            cheatButtons.cheatButton2,
            cheatButtons.cheatRenderSignInScene,
            cheatButtons.cheatRenderMainMenuScene,
            cheatButtons.cheatRenderAboutScene,
            cheatButtons.cheatRenderGameOverScene,
            cheatButtons.cheatRenderVictoryScene,
            cheatButtons.cheatCheckMySessionString,
            cheatButtons.cheatSetMySessionStringToFoo,
            cheatButtons.cheatSetMySessionStringToBar,
            cheatButtons.cheatCheckMySessionBoolean,
            cheatButtons.cheatToggleMySessionBoolean,
            cheatButtons.cheatSaveMyStringToDB,
            cheatButtons.cheatRenderStatusBar
            // ==================================================
        );
    } else {
        cheatCodesWrapper.innerHTML = '';
    }
}
