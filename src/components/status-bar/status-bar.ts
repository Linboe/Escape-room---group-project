
import './status-bar.scss';
import { getProgress } from '../../store/session/session-memory';
import { getRoomStates, getState, setHourglass } from '../../state/gamestate';

const statusBarWrapper = document.getElementById(
    'statusBarWrapper',
) as HTMLDivElement;

let secondsElapsed: number = 0;
let time = 90;

// counting states preventing doublettes 
let countdownStarted: boolean = false;
let countupStarted: boolean = false;

// as null when paused/ as interval when playing
let countdownIntervalState: ReturnType<typeof setInterval> | null = null;
let countupIntervalState: ReturnType<typeof setInterval> | null = null;

// parent
const pWrapperElement = document.createElement('p');
pWrapperElement.classList.add('status-bar');

// children
const spanStatusBarElement = document.createElement('span');
spanStatusBarElement.textContent = 'Status Bar';

const spanTimerElement = document.createElement('span');
spanTimerElement.textContent = '--:--';

const countupSpanElement = document.createElement('span');
countupSpanElement.textContent = '--:--';

const spanRoomsElement = document.createElement('span');

/*
function startCountUp2() {
    if (countupStarted) return;
    countupStarted = true;

    const targetSeconds = 90 * 60; // Counts up to 90 minutes

    const interval = setInterval(() => {
        secondsElapsed++;

        // UI update
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        countupSpanElement.textContent = `Elapsed Time: ${formattedTime}`;

        if (secondsElapsed >= targetSeconds) {
            clearInterval(interval);
            countupSpanElement.textContent = '90 Minutes Reached!';
        }
    }, 1000);
}
*/

/*
function startCountdown2(currentRoomIndex: number, hourglass: number) {
    if (countdownStarted) return;
    countdownStarted = true;
    let time = hourglass;

    if (countdownIntervalState) return; // prevent duplicate
    //countdownIntervalState = setInterval(handleTick, 1000);

    const interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        spanTimerElement.textContent = 'Room Time Left: ' + formattedTime;

        setHourglass(currentRoomIndex, time);

        if (--time < 0) {
            clearInterval(interval);
            spanTimerElement.textContent = 'Time\'s up!';
        }
    }, 1000);
}
*/

export function startStatusBarTimers() { // initialize)
    const currentRoomState = getRoomStates();
    const currentRoomIndex = getState().currentRoom;
    const currentHourglass = currentRoomState[currentRoomIndex].hourglass;
    if (!currentHourglass) return;

    startCountUp();
    //startCountdown(currentRoomIndex,currentHourglass);
    startCountdown();
}

export function renderStatusBar() {
    if (!statusBarWrapper) return;
    statusBarWrapper.innerHTML = '';

    spanRoomsElement.textContent = `Progress: ${getProgress()}/6`;

    pWrapperElement.append(
        //spanStatusBarElement,
        spanTimerElement,
        countupSpanElement,
        spanRoomsElement
    );

    statusBarWrapper.append(pWrapperElement);
}

// tick
function handleCountdownTick() {
    updateCountdownTextContent();
}

function handleCountupTick() {
    secondsElapsed++;
    updateCountupTextContent();

    if (--time < 0) {
        stopCountdown();
        stopCountup();
        spanTimerElement.textContent = 'Time\'s up!';
    }
}

// play/ pause
function startCountdown() {
    if (countdownIntervalState) return; // only run once
    countdownIntervalState = setInterval(handleCountdownTick, 1000);
    countdownStarted = true;
}
function stopCountdown() {
    clearInterval(countdownIntervalState!);
    countdownIntervalState = null;
    countdownStarted = false;
}
function startCountUp() {
    if (countupIntervalState) return; // only run once
    countupIntervalState = setInterval(handleCountupTick, 1000);
    countupStarted = true;
}
function stopCountup() {
    clearInterval(countupIntervalState!);
    countupIntervalState = null;
    countupStarted = false;
}

// UI helper(s)
function updateCountupTextContent() {
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    countupSpanElement.textContent = `Elapsed Time: ${formattedTime}`;
}

function updateCountdownTextContent() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    spanTimerElement.textContent = 'Room Time Left: ' + formattedTime;
}

// etc
export function testPause(): void {
    stopCountdown();
    stopCountup();
}