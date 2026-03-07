import './components/cheat-codes/cheat-codes';
import './styles/style.scss';
import { state } from './state/gamestate';
import { renderSignInScene } from './scenes/sign-in-scene/sign-in-scene';
import { renderMainMenuScene } from './scenes/main-menu-scene/main-menu-scene';
import { renderGameOverScene } from './scenes/game-over-scene/game-over-scene';
import { room1 } from './rooms/room1/room1';
import { room2 } from './rooms/room2/room2';
import { room3 } from './rooms/room3/room3';
import { room4 } from './rooms/room4/room4';
import { room5 } from './rooms/room5/room5';
import { room6 } from './rooms/room6/room6';
import { renderAboutScene } from './scenes/about-scene/about-scene';
import './components/high-score/high-score';
import { renderVictoryScene } from './scenes/victory-scene/victory-scene';
import { getSecondsElapsed } from './components/status-bar/status-bar';
import { saveHighscore } from './components/high-score/high-score';
import { saveGameToLocalStorage, clearLocalStorageSave } from './store/database/local-storage-database';

// please check the document in this link:
// https://medieinstitutet-my.sharepoint.com/:w:/g/personal/alda_catovic_medieinstitutet_se/IQApMQpuaX8YToqheHZBk5Y4AQvnQa3uXsRg0XzjSP18ehU?rtime=AQuzKQlr3kg

/** Session states
 * room x is unlocked boolean
 * You can only revisit previous rooms after beating room 6, and all the hourglasses are remembered
 * Session states and localstrage memory not to be confused with each other
 * Session states is like the RAM
 * Localstorage is like the SSD
 */

const sceneWrapper: HTMLDivElement | null = document.querySelector('#sceneWrapper');

export function render() {
    switch (state.screen) {
        case 'login':
            renderSignInScene(sceneWrapper, render);
            break;
        case 'menu':
            renderMainMenuScene(sceneWrapper, render);
            break;
        case 'room':
            renderNextRoom();
            break;
        case 'victory':
            renderVictoryScene();
            break;
        case 'gameover':
            renderGameOverScene();
            break;
        case 'about':
            renderAboutScene();
    }

    // show & hide h1
    const h1Element = document.querySelector('h1');
    if (state.screen === 'login' || state.screen === 'menu') {
        if (h1Element) h1Element.classList.remove('hidden');
    } else {
        if (h1Element) h1Element.classList.add('hidden');
    }
    

}

const allRooms = [room1, room2, room3, room4, room5, room6];

export function renderNextRoom() { // TODO koppla på timers
    console.log('renderNextRoom called. currentRoom:', state.currentRoom);

    if (state.currentRoom >= allRooms.length) {
        saveHighscore(state.username, getSecondsElapsed());
        clearLocalStorageSave();
        state.screen = 'victory';
        render();
        return;
    }

    const room = allRooms[state.currentRoom];

    room(sceneWrapper, () => {
        console.log('Room completed:', state.currentRoom);
        if (state.screen === 'victory') return;

        state.completed[state.currentRoom] = true;
        saveGameToLocalStorage();

        state.currentRoom++;
        saveGameToLocalStorage();
        renderNextRoom();
    });
}

render();
