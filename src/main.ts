import './styles/style.scss';
import './components/cheat-codes/cheat-codes';
import './scenes/sign-in-scene/sign-in-scene';
import './scenes/main-menu-scene/main-menu-scene';
import './scenes/game-session-scene/game-session-scene';
import './scenes/game-over-scene/game-over-scene';
import './scenes/about-scene/about-scene';

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
const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

function initializeMain() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = '<h1>Strange woods (working title)</h1>';
}
initializeMain();
