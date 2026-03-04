
import './status-bar.scss';
import { getProgress } from '../../store/session/session-memory';
import { getRoomStates, getGameState, setRoomTime } from '../../state/gamestate';
import { renderGameOverScene } from '../../scenes/game-over-scene/game-over-scene';

const statusBarWrapper = document.getElementById(
    'statusBarWrapper',
) as HTMLDivElement;

// ===============
// Timer variables
// ===============

// variable values are initial
let secondsElapsed: number = 0;
let roomStates = getRoomStates();
let gameState = getGameState();
let hourglassState = roomStates[gameState.currentRoom].roomTime; // how many seconds left for said room

// as null when paused/ as interval when playing
let countdownIntervalState: ReturnType<typeof setInterval> | null = null;
let countupIntervalState: ReturnType<typeof setInterval> | null = null;
// ===============

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

export function startStatusBarTimers() { // initialize
    startCountUp();
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

// ===============
// Timer functions
// ===============

// ticks
function handleCountdownTick() {
    secondsElapsed++;
    updateCountdownTextContent();
    setRoomTime(gameState.currentRoom, hourglassState);

    if (--hourglassState < 0) {
        stopCountdown();
        stopCountup();
        spanTimerElement.textContent = 'Time\'s up!';
        renderGameOverScene();
    }
}
function handleCountupTick() {
    updateCountupTextContent();
}

// play & pause
function startCountdown() {
    if (countdownIntervalState) return; // only run once
    countdownIntervalState = setInterval(handleCountdownTick, 1000);
    refetchGamestate();
}
function stopCountdown() {
    clearInterval(countdownIntervalState!);
    countdownIntervalState = null;
}
function startCountUp() {
    if (countupIntervalState) return; // only run once
    countupIntervalState = setInterval(handleCountupTick, 1000);
    refetchGamestate();
}
function stopCountup() {
    clearInterval(countupIntervalState!);
    countupIntervalState = null;
}

// UI helper(s)
function updateCountupTextContent() {
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    countupSpanElement.textContent = `Elapsed Time: ${formattedTime}`;
}
function updateCountdownTextContent() {
    const minutes = Math.floor(hourglassState / 60);
    const seconds = hourglassState % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    spanTimerElement.textContent = 'Room Time Left: ' + formattedTime;
}

// pause
export function pauseCountdown() {
    stopCountdown();
}
export function pauseCountup() {
    stopCountup();
}
export function stopAllStatusBarTimers(): void {
    stopCountdown();
    stopCountup();
}

// refresh i.e when switching rooms
export function refetchGamestate() {
    roomStates = getRoomStates();
    gameState = getGameState();
    hourglassState = roomStates[gameState.currentRoom].roomTime;
}
// ===============
