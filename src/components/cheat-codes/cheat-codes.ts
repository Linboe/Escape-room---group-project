// Cheat Codes is created for the development team to test the logic responsiveness of logic by clicking on buttons
// Do not make this accessible for production
// TODO: Discuss with the team how we mark dev-team instructions
import { renderAboutScene } from '../../scenes/about-scene/about-scene';
import { renderGameOverScene } from '../../scenes/game-over-scene/game-over-scene';
import { renderGameSessionScene } from '../../scenes/game-session-scene/game-session-scene';
import { renderMainMenuScene } from '../../scenes/main-menu-scene/main-menu-scene';
import { renderSignInScene } from '../../scenes/sign-in-scene/sign-in-scene';
import { saveMyStringState } from '../../store/database/local-storage-database';
import { changeMySessionStringState, logMySessionStringState, logSessionBooleanState, toggleMySessionBooleanState } from '../../store/session/session-memory';
import { renderStatusBar } from '../status-bar/status-bar';
import './cheat-code-styles.scss';
import {createCheatButton} from './cheat-codes-helper';

let showCheatCodes: boolean = false;
const showCheatCodesButton = document.getElementById('showCheatCodesButton') as HTMLButtonElement | null;
const cheatCodesWrapper = document.getElementById('cheatCodesWrapper') as HTMLDivElement | null;

// ===================================
// Create and store cheat buttons here
// ===================================
const cheatButtons = {
  cheatButton1: createCheatButton('cheat test 1', specialCheatCode1),
  cheatButton2: createCheatButton('cheat test 2', specialCheatCode2),
  cheatRenderSignInScene: createCheatButton('render sign in scene', renderSignInScene),
  cheatRenderMainMenuScene: createCheatButton('render main menu scene', renderMainMenuScene),
  cheatRenderAboutScene: createCheatButton('render about scene', renderAboutScene),
  cheatRenderGameSessionScene: createCheatButton('render game session scene', renderGameSessionScene),
  cheatRenderGameOverScene: createCheatButton('render game over scene', renderGameOverScene),
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
      // ==================================================
      // Append cheat buttons here, disable to hide from UI
      // ==================================================
      //            cheatButtons.cheatButton1,
      //            cheatButtons.cheatButton2,
      cheatButtons.cheatRenderSignInScene,
      cheatButtons.cheatRenderMainMenuScene,
      cheatButtons.cheatRenderAboutScene,
      cheatButtons.cheatRenderGameSessionScene,
      cheatButtons.cheatRenderGameOverScene,
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