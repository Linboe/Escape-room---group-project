import './room5.scss';
import cardsData from '../../rooms/room5/cardsData.json';
import { triggerArtifact } from '../../components/artifacts/artifactSystem';
import { showRoomIntro } from '../../components/room-intro/room-intro';
import {
    startStatusBarTimers,
    stopAllStatusBarTimers,
} from '../../components/status-bar/status-bar';

/*
export function renderRoom5Scene() {
  const sceneWrapper = document.getElementById('sceneWrapper');
  if (!sceneWrapper) return;

  sceneWrapper.innerHTML = `
    <section class="room room-5">
      <h1>Room 5</h1>
    </section>
  `;
}
*/
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
/** Memory
 * x kort i JSON (cards.json med id, bild)
 * x shuffle-funktion
 * x state: vilka kort som är vända, matchade, antal försök/tid
 * x rendera korten
 * x bild fram och baksida
 * x states för story
 * x animation när rätt match
 * x ladda in memoryt i ett flow- ett kort i taget
 * x artefakten
 * x aktivera gå vidare knapp efter man fått artefakten
 * x juster tid mellan klarat spel och att state-completed kommer
 *  //startBarTimers()
    //stopAllStatusBarTimers
 * x skriva storyn - sammanfoga med Almas idé
 */

// ---------------------------------------------------------------
// ------------------------- Define type -------------------------
// ---------------------------------------------------------------
const COLUMNS = 4; // antal kolumner i memory-brädet

type Card = {
    id: number;
    pairId: number;
    value: string; //URL till bild
    isFlipped: boolean;
    isMatched: boolean;
    justMatched?: boolean; //för puls-animation
};

type Room5State =
    | 'story'
    | 'options'
    | 'wrong-choice'
    | 'right-choice'
    | 'game'
    | 'completed';

// ---------------------------------------------------------------
// --------------------------- State -----------------------------
// ---------------------------------------------------------------

let currentState: Room5State = 'story';
let selectedCards: Card[] = [];
let cards: Card[] = []; // Globalt för renderCards

// ---------------------------------------------------------------
// ------------- Function returning array of cards  --------------
// ---------------------------------------------------------------

function initCards(): Card[] {
    return cardsData.map((card) => ({
        ...card, // kopiera id, pairId, value från JSON ...=spread operator - kopierar ut alla fält från ett objekt
        isFlipped: false, // kortet är inte vänt vid start
        isMatched: false, // kortet är inte matchat vid start
    }));
}
// ---------------------------------------------------------------
// ----------------------- Shuffle cards  ------------------------
// ---------------------------------------------------------------
/*
function shuffleCards(cards: Card[]): Card[] {
  //tar emot en array av indata-kort och retunerar en lista av kort
  return cards.sort(() => Math.random() - 0.5); // math.random ger slumpmässigt tal mellan 0 och 1. minus 0.5 --> negativt=byt ej plats el positivit=byt plats
}
*/

function shuffleCards(cards: Card[]): Card[] {
    const arr = [...cards];
    const shuffled: Card[] = [];

    while (arr.length > 0) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        shuffled.push(arr.splice(randomIndex, 1)[0]); //fortsätter loopa splänge det finns kort kvar i arr
    }

    return shuffled;
}

// ---------------------------------------------------------------
// ----------------------- setState ------------------------------
// ---------------------------------------------------------------
function setState(
    state: Room5State,
    sceneWrapper: HTMLDivElement,
    next: () => void,
): void {
    currentState = state;
    console.log('Current state:', currentState);

    switch (state) {
        case 'story':
            showStory(sceneWrapper, next);
            break;
        case 'options':
            showOptions(sceneWrapper, next);
            break;
        case 'wrong-choice':
            showWrongChoice(sceneWrapper, next);
            break;
        case 'right-choice':
            showRightChoice(sceneWrapper, next);
            break;
        case 'game':
            showGame(sceneWrapper, next);
            break;
        case 'completed':
            showCompleted(sceneWrapper, next);
            break;
    }
}

// Vänd kort
function flipCard(
    card: Card,
    sceneWrapper: HTMLDivElement,
    next: () => void,
): void {
    if (card.isFlipped || card.isMatched) return;
    if (selectedCards.length === 2) return; //kan vända max 2 kort i taget

    card.isFlipped = true;
    selectedCards.push(card);
    renderCards(cards, sceneWrapper, next); //visar att kortet vänds

    if (selectedCards.length === 2) {
        checkMatch(sceneWrapper, next); //skickar med sceneWrapper och next
    }
}

// ---------------------------------------------------------------
// ------------------------ Check match --------------------------
// ---------------------------------------------------------------
function checkMatch(sceneWrapper: HTMLDivElement, next: () => void): void {
    const [first, second] = selectedCards; //plockar ut de vända korten ur arrayen
    if (!first || !second) return;

    if (first.pairId === second.pairId) {
        first.isMatched = true; //markeras som matchad så de EJ kan väljas igen
        second.isMatched = true;

        // trigga puls-animation
        first.justMatched = true;
        second.justMatched = true;

        selectedCards = []; //tömmer listan på valda kort så anv kan välja 2 nya
        renderCards(cards, sceneWrapper, next); // visa framsida på matchade kort

        // Ta bort puls efter animationen (för att kunna trigga igen om behövs)
        setTimeout(() => {
            first.justMatched = false;
            second.justMatched = false;
            renderCards(cards, sceneWrapper, next);

            //när alla kort är matchade går vi till completed-state
            if (cards.every((card) => card.isMatched)) {
                setState('completed', sceneWrapper, next);
            }
        }, 600);
    } else {
        setTimeout(() => {
            first.isFlipped = false;
            second.isFlipped = false;
            selectedCards = [];
            renderCards(cards, sceneWrapper, next);
        }, 1000);
    }
}

// ---------------------------------------------------------------
// ------------------------ Render cards  ------------------------
// ---------------------------------------------------------------
function renderCards(
    cards: Card[],
    sceneWrapper: HTMLDivElement,
    next: () => void,
): void {
    const board = document.getElementById('board') as HTMLDivElement;
    const cardBack =
        '/fed25d-js-intro-grupparbete-the-dopefish-admirers/img/cardBack2.jpg'; // bild kort-baksida

    if (board.childElementCount === 0) {
        // Skapa korten EN gång pga endast dess state/visuella ska uppdateras - om ej denna skapas alla kort om från scratch = massa problem
        board.innerHTML = cards
            .map(
                (card) => `<div class="card" data-id="${card.id}">
         <img src="${cardBack}" class="cardImage" />
        </div>`,
            )
            .join(''); //alla kort strängar till en HTML-sträng på skärmen

        // Wave-animation
        board.querySelectorAll('.card').forEach((el, i) => {
            const row = Math.floor(i / COLUMNS); // vilken rad kortet befinner sig på
            const col = i % COLUMNS; // vilken kolumn kortet befinner sig på
            const delay = row * 0.5 + col * 0.08; // rad-fördröjning + kolumn-fördröjning = wave-effekt

            const card = el as HTMLElement;
            card.style.animationDelay = `${delay}s`; // applicera fördröjningen på kortet
            card.classList.add('reveal'); // starta animationen

            // sätt visible efter att animationen är klar (delay + animationens längd 0.35s)
            setTimeout(
                () => {
                    card.classList.remove('reveal');
                    card.classList.add('visible'); // håller kortet synligt permanent
                    card.style.animationDelay = '';
                },
                (delay + 0.35) * 1000,
            );
        });

        // Lägg på click-event en gång
        const cardElements = board.querySelectorAll('.card');
        cardElements.forEach((el) => {
            //el - enskilda kort-elementet som loopen jobbar med, el=html-kort
            const id = Number((el as HTMLElement).dataset.id); //Hämtar kortets data-id från HTML-elementet (som sattes när korten skapades) och omvandlar det till ett nummer.
            const card = cards.find((c) => c.id === id); //Letar upp rätt Card-objekt i arrayen som matchar det id:t. Kopplar alltså ihop HTML-elementet med sitt Card-objekt.
            if (card) {
                el.addEventListener('click', () =>
                    flipCard(card, sceneWrapper, next),
                );
            }
        });
    }

    // Uppdatera bilder baserat på state
    cards.forEach((card) => {
        const img = board.querySelector(
            `.card[data-id="${card.id}"] img`,
        ) as HTMLImageElement;
        if (img) {
            if (card.isFlipped || card.isMatched) {
                img.src = card.value;
            } else {
                img.src = cardBack;
            }

            // Lägg till animation och glow utan att ändra img-query

            const cardElement = img.parentElement as HTMLDivElement;
            if (!cardElement) return;

            // Permanent glow på matchade kort
            cardElement.classList.toggle('matched', card.isMatched);

            // Puls-animation ENDAST om kortet just matchades
            if (card.justMatched) {
                cardElement.classList.add('pulse');
            } else {
                cardElement.classList.remove('pulse');
            }
        }
    });
}

// ---------------------------------------------------------------
// show-funktioner för varje state
// ---------------------------------------------------------------
function showStory(sceneWrapper: HTMLDivElement, next: () => void): void {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
          <p class="event-text" id="eventText">
            You’ve traveled far on your journey, wandering deep into the forest.
            Suddenly, something catches your eye — white shapes hidden among the thick undergrowth.
            What could be waiting quietly in the shadows?
          </p>
          <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
              <button id="continue-btn" class="option">Make a choice</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    document
        .getElementById('continue-btn')!
        .addEventListener('click', () =>
            setState('options', sceneWrapper, next),
        );
}

function showOptions(sceneWrapper: HTMLDivElement, next: () => void): void {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
            <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
              <button id="wrong-btn" class="option">Creepy… I’ll turn back!</button>
              <button id="right-btn" class="option">I’ll get closer to take a look</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    document
        .getElementById('wrong-btn')!
        .addEventListener('click', () =>
            setState('wrong-choice', sceneWrapper, next),
        );
    document
        .getElementById('right-btn')!
        .addEventListener('click', () =>
            setState('right-choice', sceneWrapper, next),
        );
}

function showWrongChoice(sceneWrapper: HTMLDivElement, next: () => void): void {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
          <p class="event-text" id="eventText">
            Some things can feel frightening when you don’t yet understand them. 
            To move forward, you must summon courage.
          </p>
          <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
              <button id="back-btn" class="option">I am ready to face it</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    document
        .getElementById('back-btn')!
        .addEventListener('click', () =>
            setState('options', sceneWrapper, next),
        );
}

function showRightChoice(sceneWrapper: HTMLDivElement, next: () => void): void {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
          <p class="event-text" id="eventText">
            As you step closer, you discover that the white shapes are statues. 
            They guard the forest’s heart and the secret gathering place of its mystical creatures.
            Shy and rarely seen, these beings have protected you on your journey.
            Use your memory to uncover them and unlock the room.
          </p>
          <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
              <button id="start-memory-btn" class="option">Begin the memory challenge</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    document
        .getElementById('start-memory-btn')!
        .addEventListener('click', () => setState('game', sceneWrapper, next));
}

function showGame(sceneWrapper: HTMLDivElement, next: () => void): void {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
          <div class="game-session-style game-board">
            <div class="board" id="board"></div>
          </div>
        </div>
      </div>
    </section>
  `;

    cards = shuffleCards(initCards());
    selectedCards = [];
    renderCards(cards, sceneWrapper, next);
    startStatusBarTimers(); //OBS tiden rullar redan när man kommer till rummet
}

function showCompleted(sceneWrapper: HTMLDivElement, next: () => void): void {
    setTimeout(() => {
        sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
         <p class="event-text" id="eventText">You are now ready for the final step on your journey.
        
         </p>
          <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
             <button id="finish-room-btn" class="option">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

        triggerArtifact('room5', 'amethyst');
        stopAllStatusBarTimers(); //OBS - all tid stannar

        // 3. Knapp för att faktiskt lämna rummet och gå till nästa (next)
        document
            .getElementById('finish-room-btn')
            ?.addEventListener('click', () => {
                next();
            });
    }, 2000);
}

// ---------------------------------------------------------------
// -------------------------- Export  ----------------------------
// ---------------------------------------------------------------
// ÄNDRAD - anropar nu setState('story') istället för att rendera HTML direkt
export function room5(
    sceneWrapper: HTMLDivElement | null,
    next: () => void,
): void {
    if (!sceneWrapper) return;
    showRoomIntro(
        5,
        () => { /* pauseTimer */ },
        () => { /* resumeTimer */ },
        () => {
            setState('story', sceneWrapper, next);
        }
    );
}
