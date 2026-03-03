import './status-bar.scss';
import { getProgress } from '../../store/session/session-memory';
import type { Artifact } from '../artifacts/artifactSystem';

const statusBarWrapper = document.getElementById(
    'statusBarWrapper',
) as HTMLDivElement;

let timersStarted = false;

// parent
const pWrapperElement = document.createElement('p');
pWrapperElement.classList.add('status-bar');

// children
const spanStatusBarElement = document.createElement('span');
spanStatusBarElement.textContent = 'Status Bar';

const spanTimerElement = document.createElement('span');
spanTimerElement.textContent = 'Room Time Left: 15:00';

const spanCountUpElement = document.createElement('span');
spanCountUpElement.textContent = 'Elapsed: 0:00';

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
            return `<div class="artifact-slot"></div>`;
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
                });
            });
    }
}

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

function startCountUp() {
    let secondsElapsed = 0; // Seconds counting upwards
    const targetSeconds = 90 * 60; // Counts up to 90 minutes

    const interval = setInterval(() => {
        secondsElapsed++;

        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        spanCountUpElement.textContent = `Elapsed Time: ${formattedTime}`;

        if (secondsElapsed >= targetSeconds) {
            clearInterval(interval);
            spanCountUpElement.textContent = '90 Minutes Reached!';
        }
    }, 1000);
}

function startCountdown(roomTime: number) {
    let time = roomTime;

    const interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        spanTimerElement.textContent = 'Room Time Left: ' + formattedTime;

        if (--time < 0) {
            clearInterval(interval);
            spanTimerElement.textContent = "Time's up!";
        }
    }, 1000);
}

export function startStatusBarTimers() {
    if (timersStarted) return; // start only once
    timersStarted = true;

    startCountUp();
    startCountdown(900);
}

export function renderStatusBar() {
    if (!statusBarWrapper) return;
    statusBarWrapper.innerHTML = '';

    spanRoomsElement.textContent = `Progress: ${getProgress()}/6`;

    pWrapperElement.append(
        spanStatusBarElement,
        spanTimerElement,
        spanCountUpElement,
        divArtifactsElement, //added Artefact
        spanRoomsElement,
    );

    statusBarWrapper.append(pWrapperElement);
    renderArtifacts(); //added Artefact
}
