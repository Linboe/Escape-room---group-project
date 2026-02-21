import './components/cheat-codes/cheat-codes';
import './styles/style.scss'
import { state } from './state/gamestate';
import { renderSignInScene } from './scenes/sign-in-scene/sign-in-scene';
import { renderMainMenuScene } from './scenes/main-menu-scene/main-menu-scene';
import { renderGameOverScene } from './scenes/game-over-scene/game-over-scene';

import { room1 } from './rooms/room1';
import { room2 } from './rooms/room2';
import { room3 } from './rooms/room3';
import { room4 } from './rooms/room4';
import { room5 } from './rooms/room5';
import { room6 } from './rooms/room6';
import { renderAboutScene } from './scenes/about-scene/about-scene';

// please check the document in this link:
// https://medieinstitutet-my.sharepoint.com/:w:/g/personal/alda_catovic_medieinstitutet_se/IQApMQpuaX8YToqheHZBk5Y4AQvnQa3uXsRg0XzjSP18ehU?rtime=AQuzKQlr3kg

/** Pseudo engine architecture (scrap)
 * Each room has an enterable state, unlocked when conditions met, trigger with a unlockRoom() function 
 * The progress bar could also be used as a quicktravel, trigger with a travelTo() function
 * Some sort of state knowing what room the player is currently at
 * Consider storing scores and time in localstorage
 * Each artifact has a relevancy metadata: true if needed to complete the escape, false if not
 * For the first engine architecture scrap, there will be cheat code buttons
 */

/** Session states
 * room x is unlocked boolean
 * You can only revisit previous rooms after beating room 6, and all the hourglasses are remembered
 * Session states and localstrage memory not to be confused with each other
 * Session states is like the RAM
 * Localstorage is like the SSD
 */

const sceneWrapper: HTMLDivElement | null = document.querySelector("#sceneWrapper");

export function render() {
    switch (state.screen) {
        case "login":
            renderSignInScene(sceneWrapper, render);
            break;
        case "menu":
            renderMainMenuScene(sceneWrapper, render);
            break;
        case "room":
            renderNextRoom();
            break;
        case "victory":
            renderVictory();
            break;
        case "gameover":
            renderGameOverScene();
            break;
        case "about":
            renderAboutScene();
    }
}

let currentRoom = 0;
const allRooms = [room1, room2, room3, room4, room5, room6];

function renderNextRoom() { // TODO koppla på timers
    if (currentRoom >= allRooms.length) {
        state.screen = 'victory';
        render();
        return;
    }

    const room = allRooms[currentRoom];
    room(sceneWrapper, () => {
        currentRoom++;
        renderNextRoom();
    });
}

function renderVictory() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = `
        <h2>🎉 Grattis!</h2>
        <p>Du klarade alla rum!</p>
        <button id="backToMenu">Till meny</button>
    `;

    const backToMenuBtn: HTMLButtonElement | null = document.querySelector('#backToMenu');

    backToMenuBtn?.addEventListener('click', () => {
        state.screen = "menu";
        render();

    });
}

render();