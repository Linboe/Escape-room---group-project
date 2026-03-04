import './status-bar.scss';
import { getProgress } from '../../store/session/session-memory';
import type { Artifact } from '../artifacts/artifactSystem';
import {
    getRoomStates,
    getGameState,
    setRoomTime,
} from '../../state/gamestate';
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

const divArtifactsElement = document.createElement('div'); //added Artefact
divArtifactsElement.classList.add('status-bar-artifacts'); //added Artefact

// ----------------------------------------------------
// --------------------- Artefact ---------------------
// ----------------------------------------------------
const collectedArtifacts: Artifact[] = [];
let isRoom6 = false;

export function setRoom6Mode(active: boolean) {
    isRoom6 = active;
    renderArtifacts();
}

// Lägger till en artefakt i statusbaren — ignorerar dubletter
export function addArtifactToStatusBar(artifact: Artifact) {
    const alreadyCollected = collectedArtifacts.find(
        (existingArtifact) => existingArtifact.id === artifact.id,
    );
    if (alreadyCollected) return;

    collectedArtifacts.push(artifact);
    renderArtifacts();
}

// Hämtar en artefakt från samlingen via id — används av room6
export function getArtifactById(id: string): Artifact | undefined {
    return collectedArtifacts.find((a) => a.id === id);
}

function renderArtifacts() {
    console.log(
        'renderArtifacts called, collectedArtifacts:',
        collectedArtifacts,
    );
    console.log('isRoom6:', isRoom6);
    const slots = Array.from({ length: 6 }).map((_, i) => {
        const artifact = collectedArtifacts[i];
        const slotIsEmpty = !artifact;

        if (slotIsEmpty) {
            return '<div class="artifact-slot"></div>';
        }

        return `
              <div class="artifact-slot ${isRoom6 ? 'draggable' : ''}"
                draggable="${isRoom6}"
                data-id="${artifact.id}"
            >
                <img 
                    src="${artifact.image}" 
                    alt="${artifact.name}" 
                    title="${artifact.name}"
                    class="status-bar-artifact"
                />
            </div>`;
    });

    divArtifactsElement.innerHTML = slots.join('');

    if (isRoom6) {
        divArtifactsElement
            .querySelectorAll('.artifact-slot.draggable')
            .forEach((slot) => {
                slot.addEventListener('dragstart', (e) => {
                    const artifactId = (slot as HTMLElement).dataset.id ?? '';
                    console.log('dragstart artifactId:', artifactId);
                    (e as DragEvent).dataTransfer?.setData(
                        'artifactId',
                        artifactId,
                    );

                    const img = slot.querySelector('img') as HTMLImageElement;
                    if (img) {
                        const canvas = document.createElement('canvas');
                        canvas.width = 30;
                        canvas.height = 30;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0, 30, 30);
                        (e as DragEvent).dataTransfer?.setDragImage(
                            canvas,
                            15,
                            15,
                        );
                    }
                });
            });
    }
}

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

export function startStatusBarTimers() {
    // initialize
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
        divArtifactsElement, //added Artefact
        spanRoomsElement,
    );

    statusBarWrapper.append(pWrapperElement);
    renderArtifacts(); //added Artefact
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
        spanTimerElement.textContent = "Time's up!";
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
