// Cheat Codes is created for the development team to test the logic responsiveness of logic by clicking on buttons
// Do not make this accessible for production
import './cheat-code-styles.scss';

console.log('connected cheat codes script');

let showCheatCodes: boolean = false;

const showCheatCodesButton = document.getElementById('showCheatCodesButton') as HTMLButtonElement | null;
const cheatCodesWrapper = document.getElementById('cheatCodesWrapper') as HTMLDivElement | null;

showCheatCodesButton?.addEventListener('click', toggleCheatCodeButtons);

function createCheatButton(
    label: string,
    callFunction: () => void
): HTMLButtonElement {
    const newCheatButton = document.createElement('button');
    newCheatButton.textContent = label;
    newCheatButton.addEventListener('click', callFunction);
    return newCheatButton;
}

function toggleCheatCodeButtons() {
    showCheatCodes = !showCheatCodes;
    if (!cheatCodesWrapper) return; // if element doesn't exist
    console.log(showCheatCodes);
    
    // create and store cheat codes inside this if statement
    if (showCheatCodes) {
        const cheatButton1 = createCheatButton('cheat 4', cheatCode3);
        const cheatButton2 = createCheatButton('cheat button 5', cheatCode1);
        const cheatButton3 = createCheatButton('DRY cheat', cheatCode2);

        // don't forget to append the cheat code button to the wrapper to make it appear
        cheatCodesWrapper.append(
            cheatButton1,
            cheatButton2,
            cheatButton3,
        );
    } else {
        cheatCodesWrapper.innerHTML = ``
    }
}

function cheatCode1() {
    console.log(`run cheat code 1`);
}

function cheatCode2() {
    console.log('run cheat code 2');
}

function cheatCode3() {
    console.log('run cheat code 3');
}