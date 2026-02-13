// Cheat Codes is created for the development team to test the logic responsiveness of logic by clicking on buttons
// Do not make this accessible for production
// TODO: Discuss with the team how we mark dev-team instructions
import './cheat-code-styles.scss';
import {createCheatButton} from './cheat-codes-helper';

let showCheatCodes: boolean = false;
const showCheatCodesButton = document.getElementById('showCheatCodesButton') as HTMLButtonElement | null;
const cheatCodesWrapper = document.getElementById('cheatCodesWrapper') as HTMLDivElement | null;

// ===================================
// Create and store cheat buttons here
// ===================================
const cheatButton1 = createCheatButton('cheat', specialCheatCode3);
const cheatButton2 = createCheatButton('sheet', specialCheatCode1);
const cheatButton3 = createCheatButton('sheep', specialCheatCode2);
// ===================================

// =============================
// Local special cheat functions
// =============================
function specialCheatCode1() {
    console.log(`run special cheat code 1`);
}

function specialCheatCode2() {
    console.log('run special cheat code 2');
}

function specialCheatCode3() {
    console.log('run special cheat code 3');
}
// =============================

showCheatCodesButton?.addEventListener('click', toggleCheatCodeButtons);
function toggleCheatCodeButtons() {
    showCheatCodes = !showCheatCodes;
    if (!cheatCodesWrapper) return;
    if (showCheatCodes) {
        cheatCodesWrapper.append(
            // =========================
            // Append cheat buttons here
            // =========================
            cheatButton1,
            cheatButton2,
            cheatButton3
            // =========================
        );
    } else {
        cheatCodesWrapper.innerHTML = ``
    }
}