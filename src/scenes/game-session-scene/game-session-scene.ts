// TS file handling the UI logic
import {
  actionButtonEvent,
  nextScript,
  scriptIndex,
} from "./game-session-controller";
import "./game-session-scene.scss";
import { completeRoom } from "../../store/session/session-memory";
import { saveGameToLocalStorage } from "../../store/database/local-storage-database";
import { renderStatusBar } from "../../components/status-bar/status-bar";
import { getIsGameCompleted } from "../../store/session/session-memory";
import { renderGameOverScene } from "../game-over-scene/game-over-scene";
import { constantRoomData, scriptData } from "./placeholder-data";
import { startStatusBarTimers } from "../../components/status-bar/status-bar";

console.log("connected game session scene");

const sceneWrapper = document.getElementById(
  "sceneWrapper",
) as HTMLDivElement | null;

export function renderGameSessionScene() {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = ""; // reset

  startStatusBarTimers(); // starta timers när spelet börjar
  
  // Imperative DOM building method
  const h2PlaceholderText = document.createElement("h2");
  h2PlaceholderText.textContent = "Game session scene";
  sceneWrapper.append(h2PlaceholderText);

  // TEST-knapp för att simulera att ett rum klaras
  const solveRoomBtn = document.createElement("button");
  solveRoomBtn.textContent = "Complete Room";
  solveRoomBtn.addEventListener("click", () => {
    completeRoom(); // 1. uppdaterar progress (0/6 -> 6/6)
    saveGameToLocalStorage(); // 2. sparar progress i localStorage
    renderStatusBar(); // 3. uppdaterar UI

    if (getIsGameCompleted()) {
      renderGameOverScene(); // 4. om spelet är klart, rendera game over-scenen/går till Game Over när 6/6 är nått
    }

    console.log("Room completed (test)");
  });

  sceneWrapper.append(solveRoomBtn);

  // parent wrapper
  const gameSessionWrapper = document.createElement("div");
  gameSessionWrapper.classList.add("game-session-wrapper");

  // gameSessionWrapper's children
  const roomTitleTextElement = document.createElement("h2");
  roomTitleTextElement.textContent = constantRoomData.roomTitleText;
  roomTitleTextElement.classList.add("room-title-text");

  const backgroundImageElement = document.createElement("img");
  backgroundImageElement.src = constantRoomData.backgroundImage;
  backgroundImageElement.loading = "lazy";
  backgroundImageElement.alt = constantRoomData.backgroundImageScreenReader;
  backgroundImageElement.classList.add("room-background-image");

  const eventTextElement = document.createElement("p");
  eventTextElement.id = "eventTextElement";
  eventTextElement.classList.add("event-text");

  const playerInteractionButtonsWrapper = document.createElement("div");
  playerInteractionButtonsWrapper.classList.add(
    "player-interaction-buttons-wrapper",
  );
  playerInteractionButtonsWrapper.id = "playerInteractionButtonsWrapper";

  // compile and initialize
  gameSessionWrapper.append(
    roomTitleTextElement,
    eventTextElement,
    playerInteractionButtonsWrapper,
    backgroundImageElement,
  );
  sceneWrapper.append(gameSessionWrapper);
  reRenderSameRoom(); // initialize
}

export function reRenderSameRoom() {
  // accessible for game-session-controller.ts
  if (!sceneWrapper) return;

  // the black square at the bottom
  const newEventText = document.getElementById(
    "eventTextElement",
  ) as HTMLParagraphElement | null;
  if (!newEventText) return;
  newEventText.innerText = scriptData[scriptIndex].textEvent;

  // the clickable elements above "event text element" & parent element for buttons
  const playerInteractionButtonsWrapper = document.getElementById(
    "playerInteractionButtonsWrapper",
  ) as HTMLDivElement | null;
  if (!playerInteractionButtonsWrapper) return;
  playerInteractionButtonsWrapper.innerHTML = ""; // reset

  const _eventMarker = scriptData[scriptIndex].eventMarker;
  const buttonEvents = scriptData[scriptIndex].buttonEvents;

  // children to playerInteractionButtonsWrapper
  if (buttonEvents.length === 0) {
    // there are no clickable options for the player, only show a next script button
    const nextScriptButton = document.createElement("button");
    nextScriptButton.innerText = "next";
    nextScriptButton.classList.add("next-script-button");
    nextScriptButton.addEventListener("click", nextScript);

    playerInteractionButtonsWrapper.append(nextScriptButton);
  } else {
    // current script index expect the player to choose between one or more options
    for (let i: number = 0; i < buttonEvents.length; i++) {
      const _buttonMarker = buttonEvents[i].buttonMarker;
      const newActionButton = document.createElement("button");

      // newActionButton.dataset enable the actionButtonEvent() function to know which button was clicked
      newActionButton.dataset.functionMarker = `${_eventMarker}-${_buttonMarker}`;

      newActionButton.innerText = buttonEvents[i].label;
      newActionButton.classList.add("interaction-button");
      newActionButton.addEventListener("click", actionButtonEvent);

      playerInteractionButtonsWrapper.append(newActionButton);
    }
  }
}

// TODO suggestion: make a renderNewRoom() function
