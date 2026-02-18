import './high-score.scss';

/**
 * Definiera ett gemensamt interface - hur ska data struktureras mellan timer-branchen och highscore branchen
 * LockalStorage-nyckel, vilken (t.ex. 'escaperoom_highscores')
 * Vem ansvarar för att spara till localStorage (timer eller highscore-branch?)
 */

//Bygg modulärt - Skapa funktioner som är oberoende av resten av appen så att de fungerar när branches mergas:
/*
getHighscores() → hämtar från localStorage
saveHighscore(name, score) → sparar ny score
renderHighscoreList() → visar listan i DOM
*/

const sceneWrapper = document.getElementById(
  'sceneWrapper',
) as HTMLDivElement | null;

export function renderHighScore() {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = ''; // reset

  // innerHTML method
  //    sceneWrapper.innerHTML = `<h2>Main menu scene</h2>`;

  // Imperative DOM building method
  const h2PlaceholderText = document.createElement('h2');
  h2PlaceholderText.textContent = 'Highscore';
  sceneWrapper.append(h2PlaceholderText);
}

/*
export function renderHighScore() {
  if (!highScoreWrapper) return;
  highScoreWrapper.innerHTML = '';
}
*/
