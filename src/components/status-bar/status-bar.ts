
import './status-bar.scss';
import { getProgress } from '../../store/session/session-memory';

const statusBarWrapper = document.getElementById(
  "statusBarWrapper",
) as HTMLDivElement;

// Skapa elementen utanför så att timern kan nå dem utan att starta om
const spanTimerElement = document.createElement("span");
const spanCountUpElement = document.createElement("span");

export function renderStatusBar() {
  if (!statusBarWrapper) return;
  statusBarWrapper.innerHTML = ``; 

  const pWrapperElement = document.createElement("p");
  pWrapperElement.classList.add("status-bar");

  const spanStatusBarElement = document.createElement("span");
  spanStatusBarElement.textContent = "Strange Woods"; 

  const spanRoomsElement = document.createElement('span');
  spanRoomsElement.textContent = `Progress: ${getProgress()}/6`;

  // Lägg till allt i containern
  pWrapperElement.append(
    spanStatusBarElement,
    spanTimerElement,
    spanCountUpElement,
    spanRoomsElement
  );
  statusBarWrapper.append(pWrapperElement);
}

// Dessa körs bara EN gång när spelet startar
export function startGlobalTimers() {
    // Din countdown (900 sekunder = 15 minuter per rum?)
    let time = 900;
    setInterval(() => {
        if (time >= 0) {
            const mins = Math.floor(time / 60);
            const secs = time % 60;
            spanTimerElement.textContent = `Room Time: ${mins}:${secs.toString().padStart(2, "0")}`;
            time--;
        }
    }, 1000);

    // Din countup (total tid i spelet)
    let secondsElapsed = 0;
    setInterval(() => {
        secondsElapsed++;
        const mins = Math.floor(secondsElapsed / 60);
        const secs = secondsElapsed % 60;
        spanCountUpElement.textContent = `Total: ${mins}:${secs.toString().padStart(2, "0")}`;
    }, 1000);
}