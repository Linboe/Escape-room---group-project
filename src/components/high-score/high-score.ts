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

// --------------------------------------------------------------
// -------------------- const & Interface -----------------------
// --------------------------------------------------------------

const HIGHSCORE_KEY = 'escaperoom_highscores'; //Ex på localStorage-nyckel
const MAX_ENTRIES = 10;

export interface HighscoreEntry {
  name: string;
  score: number; // poäng = sekunder kvar på timer
}

// --------------------------------------------------------------
// ------------- get Highscore from localStorage ----------------
// --------------------------------------------------------------

export function getHighScores(): HighscoreEntry[] {
  // Steg 1: Försök hämta datan från localStorage
  const stored = localStorage.getItem(HIGHSCORE_KEY);

  // Steg 2: Om ingenting finns i localStorage, returnera tom array
  if (!stored) {
    return [];
  }

  // Steg 3: Försök konvertera JSON-strängen till array
  try {
    // JSON.parse() omvandlar '{"name":"Alice","score":100}' → {name: "Alice", score: 100}
    const parsedScores = JSON.parse(stored) as HighscoreEntry[];
    return parsedScores;
  } catch (error) {
    // Steg 4: Om JSON.parse() misslyckas (korrupt data), logga felet
    console.error('Failed to parse highscores:', error);
    // Returnera tom array istället för att krascha
    return [];
  }
}

// --------------------------------------------------------------
// ---------------------- save Highscore ------------------------
// --------------------------------------------------------------
export function saveHighscore(name: string, score: number): void {
  // === STEG 1: VALIDERA INPUT ===
  const nameIsEmpty = !name.trim(); // trim() tar bort mellanslag, kolla om tomt
  const scoreIsInvalid = score < 0;

  if (nameIsEmpty || scoreIsInvalid) {
    console.warn('Invalid highscore entry');
    return; // Avsluta funktionen om datan är felaktig
  }

  // === STEG 2: HÄMTA BEFINTLIGA HIGHSCORES ===
  const allScores: HighscoreEntry[] = getHighScores();

  // === STEG 3: NORMALISERA NAMNET ===
  // "Alice" och "ALICE" ska räknas som samma person
  const cleanName: string = name.trim(); // Ta bort mellanslag i början/slutet
  const normalizedName: string = cleanName.toLowerCase(); // Gör om till gemener

  // === STEG 4: KOLLA OM SPELAREN REDAN FINNS ===
  // findIndex() returnerar index om hittat, annars -1
  const existingPlayerIndex: number = allScores.findIndex(
    (entry) => entry.name.toLowerCase() === normalizedName,
  );

  const playerExists: boolean = existingPlayerIndex !== -1;

  if (playerExists) {
    // === STEG 5A: SPELAREN FINNS - UPPDATERA OM BÄTTRE POÄNG ===
    const oldScore: number = allScores[existingPlayerIndex].score;
    const newScoreIsBetter: boolean = score > oldScore;

    if (newScoreIsBetter) {
      // Ersätt gamla posten med ny poäng
      allScores[existingPlayerIndex] = {
        name: cleanName,
        score: score,
      };
    }
    // Om nya poängen är sämre: gör ingenting, behåll gamla
  } else {
    // === STEG 5B: NY SPELARE - LÄGG TILL I LISTAN ===
    const newEntry: HighscoreEntry = {
      name: cleanName,
      score: score,
    };
    allScores.push(newEntry);
  }

  // === STEG 6: SORTERA LISTAN ===
  // Sortera så högst poäng kommer först
  // b.score - a.score betyder: störst först (descending order)
  allScores.sort((a, b) => b.score - a.score);

  // === STEG 7: BEHÅLL BARA TOP 10 ===
  const top10: HighscoreEntry[] = allScores.slice(0, MAX_ENTRIES);
  // slice(0, 10) tar första 10 elementen

  // === STEG 8: SPARA TILL LOCALSTORAGE ===
  // Konvertera array → JSON-sträng
  const jsonString: string = JSON.stringify(top10);
  localStorage.setItem(HIGHSCORE_KEY, jsonString);
}

// --------------------------------------------------------------
// ------------------------- XSS-skydd --------------------------
// --------------------------------------------------------------

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// --------------------------------------------------------------
// ------------------- Rendering Highscore ----------------------
// --------------------------------------------------------------
export function renderHighScore(): void {
  const sceneWrapper = document.getElementById(
    'sceneWrapper',
  ) as HTMLDivElement | null;
  if (!sceneWrapper) {
    console.error('sceneWrapper element not found');
    return;
  }

  sceneWrapper.innerHTML = '';
  const scores = getHighScores();
  let content = '';

  // If no Highscores
  if (scores.length === 0) {
    content = `
    <div class="highscore-container">
      <h2 class="highscore-title">🏆 Top 10 Highscores</h2>
      <p class="no-scores">No highscores yet! Be the first to escape.</p>
      <button id="backToMenuBtn">Back to Main Menu</button>
    </div>
  `;
  } else {
    // If highscore
    const listItems = scores
      .map((entry: HighscoreEntry, index) => {
        const medal =
          index === 0
            ? '🥇'
            : index === 1
              ? '🥈'
              : index === 2
                ? '🥉'
                : `#${index + 1}`;
        return `
      <li class="highscore-item">
        <span class="rank">${medal}</span>
        <span class="name">${escapeHtml(entry.name)}</span>
        <span class="score">${entry.score} pts</span>
      </li>
    `;
      })
      .join('');

    content = `
      <div class="highscore-container">
        <h2 class="highscore-title">🏆 Top 10 Highscores</h2>
        <ul class="highscore-list">
          ${listItems}
        </ul>
        <button id="backToMenuBtn">Back to Main Menu</button>
      </div>
    `;
  }

  // HTML-DOM & eventlisteners
  sceneWrapper.innerHTML = content;

  //knapp till main-menu: ta bort ev
  const backButton = document.getElementById('backToMenuBtn');
  if (backButton) {
    backButton.addEventListener('click', () => {
      console.log('Navigate back to main menu');
      // renderMainMenuScene();
    });
  }

  /*
 // TEMPORÄR TESTDATA - TA BORT SENARE!
function addMockData() {
  const mockScores = [
    {name: "Alice", score: 245},
    {name: "Bob", score: 180},
    {name: "Charlie", score: 320},
    {name: "Diana", score: 150},
    {name: "Rasmus", score: 200}
    {name: "Alma", score: 245},
    {name: "Linn", score: 180},
    {name: "Alda", score: 320},
    {name: "Kimi", score: 250},
    {name: "Eve", score: 200}
  ];
  localStorage.setItem('escaperoom_highscores', JSON.stringify(mockScores));
}

// Kör bara första gången
if (!localStorage.getItem('escaperoom_highscores')) {
  addMockData();
}

renderHighscore();
 */
}

/*Alternative to only show the list (not whole scene)
  export function renderHighscoreList(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }
  // ... renderar bara listan utan container och back-knapp
}
  */

/*
  // innerHTML method
  //    sceneWrapper.innerHTML = `<h2>Main menu scene</h2>`;

  // Imperative DOM building method
  const h2PlaceholderText = document.createElement('h2');
  h2PlaceholderText.textContent = 'Highscore';
  sceneWrapper.append(h2PlaceholderText);
  */
