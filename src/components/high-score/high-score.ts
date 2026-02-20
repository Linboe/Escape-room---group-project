import './high-score.scss';

/**
 * Definiera ett gemensamt interface - hur ska data struktureras
 * LockalStorage-nyckel
 * Vem ansvarar för att spara till localStorage (timer eller highscore-branch)? utgår från timer
 */

// --------------------------------------------------------------
// -------------------- const & Interface -----------------------
// --------------------------------------------------------------

const HIGHSCORE_KEY = 'escaperoom_highscores'; //localStorage-nyckel
const MAX_ENTRIES = 10;

export interface HighscoreEntry {
  name: string;
  score: number; // poäng = sekunder kvar på timer
}

// --------------------------------------------------------------
// ------------- get Highscore from localStorage ----------------
// --------------------------------------------------------------

export function getHighScores(): HighscoreEntry[] {
  const stored = localStorage.getItem(HIGHSCORE_KEY); // hämta datan från localStorage
  if (!stored) {
    return []; // om ingenting finns i localStorage, returnera tom array
  }

  // konvertera JSON-string till array med JSON.parse //try --> om koden kraschar (ogilitg json) hoppar det dirket till catch istället för att appen kraschar
  try {
    const parsedScores = JSON.parse(stored) as HighscoreEntry[];
    return parsedScores;
  } catch (error) {
    // om JSON.parse misslyckas (korrupt data) --> logga felet
    console.error('Failed to parse highscores:', error);
    return []; // returnera tom array istället för att krascha
  }
}

// --------------------------------------------------------------
// ---------------------- save Highscore ------------------------
// --------------------------------------------------------------
export function saveHighscore(name: string, score: number): void {
  // validera input
  const nameIsEmpty = !name.trim(); // trim() tar bort mellanslag, kolla om tomt
  const scoreIsInvalid = score < 0;

  if (nameIsEmpty || scoreIsInvalid) {
    console.warn('Invalid highscore entry');
    return; // avsluta funktionen om datan är felaktig
  }

  // hämta highscores som finns
  const allScores: HighscoreEntry[] = getHighScores();

  // fixa versaler och gemener s & S räknas som samma
  const cleanName: string = name.trim(); // ta bort mellanslag i början/slutet
  const normalizedName: string = cleanName.toLowerCase(); // till gemener

  // checka om spelaren redan finns
  // findIndex() returnerar index om hittat, annars -1
  const existingPlayerIndex: number = allScores.findIndex(
    (entry) => entry.name.toLowerCase() === normalizedName,
  );

  const playerExists: boolean = existingPlayerIndex !== -1;

  if (playerExists) {
    // om spelaren finns
    const oldScore: number = allScores[existingPlayerIndex].score;
    const newScoreIsBetter: boolean = score > oldScore;

    if (newScoreIsBetter) {
      // ersätt gammal p med ny p
      allScores[existingPlayerIndex] = {
        name: cleanName,
        score: score,
      };
    }
  } else {
    // ny spelare - lägg till
    const newEntry: HighscoreEntry = {
      name: cleanName,
      score: score,
    };
    allScores.push(newEntry);
  }

  // ragnordna listan, (b.score - a.score) betyder = störst först
  allScores.sort((a, b) => b.score - a.score);

  // visa endast top 10
  const top10: HighscoreEntry[] = allScores.slice(0, MAX_ENTRIES); //slice tar ut de första 10 elementen/p

  // spara till LS och konvertera array → JSON-sträng
  const jsonString: string = JSON.stringify(top10);
  localStorage.setItem(HIGHSCORE_KEY, jsonString);
}

// --------------------------------------------------------------
// ------------------- Rendering Highscore ----------------------
// --------------------------------------------------------------
export function renderHighScore(): void {
  //void: funktionen retunerar inget värde (den renderar men skickar inte tillbaka ngt)
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

  // om inga highscores än
  if (scores.length === 0) {
    content = `
    <div class="highscore-container">
      <h2 class="highscore-title">🏆 Top 10 Highscores</h2>
      <p class="no-scores">No highscores yet! Be the first to escape.</p>
    </div>
  `;
  } else {
    const listItems = scores
      .map((entry: HighscoreEntry, index) => {
        //map går igenom varje element i scores arrayen (.map returnerar en array med strings (<li>...</li>).) entry är objektet med name, score, i är positionen i arrayen
        let medal = `#${index + 1}`;
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        return `
      <li class="highscore-item">
        <span class="rank">${medal}</span>
        <span class="name">${entry.name}</span>
        <span class="score">${entry.score} pts</span>
      </li>
    `;
      })
      .join(''); //join: slår ihop alla strings till en enda HTML-sträng.

    content = `
      <div class="highscore-container">
        <h2 class="highscore-title">🏆 Top 10 Highscores</h2>
        <ul class="highscore-list">
          ${listItems}
        </ul>
      </div>
    `;
  }

  // HTML-DOM & eventlisteners
  sceneWrapper.innerHTML = content;

  // TEMPORÄR TESTDATA - TA BORT SENARE!
  /*
  function addMockData() {
    const mockScores = [
      { name: 'Alice', score: 245 },
      { name: 'Bob', score: 180 },
      { name: 'Charlie', score: 320 },
      { name: 'Diana', score: 150 },
      { name: 'Rasmus', score: 200 },
      { name: 'Alma', score: 245 },
      { name: 'Linn', score: 180 },
      { name: 'Alda', score: 320 },
      { name: 'Kimi', score: 250 },
      { name: 'Eve', score: 200 },
    ];
    localStorage.setItem('escaperoom_highscores', JSON.stringify(mockScores));
  }

  // Kör bara första gången
  if (!localStorage.getItem('escaperoom_highscores')) {
    addMockData();
  }
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
