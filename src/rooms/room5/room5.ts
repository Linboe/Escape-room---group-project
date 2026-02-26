import './room5.scss';
import cardsData from '../../data/cardsData.json';

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
 *   animation när rätt match
 *   animation när alla rätt
 *   animation när man får artefakten
 *   aktivera gå vidare knapp efter man fått artefakten
 *   skriva storyn - sammanfoga med Almas idé
 */

// ---------------------------------------------------------------
// ------------------------- Define type -------------------------
// ---------------------------------------------------------------
type Card = {
  id: number;
  pairId: number;
  value: string; //URL till bild
  isFlipped: boolean;
  isMatched: boolean;
  justMatched?: boolean; //för puls-animation
};

// State
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

function shuffleCards(cards: Card[]): Card[] {
  //tar emot en array av indata-kort och retunerar en lista av kort
  return cards.sort(() => Math.random() - 0.5); // math.random ger slumpmässigt tal mellan 0 och 1. minus 0.5 --> negativt=byt ej plats el positivit=byt plats
}

// Vänd kort
function flipCard(card: Card): void {
  if (card.isFlipped || card.isMatched) return; //om kortet är vänt eller matchat retunera pga - så ej kan klicka på samma kort 2 ggr
  if (selectedCards.length === 2) return; //kan vända max 2 kort i taget

  card.isFlipped = true;
  selectedCards.push(card);
  renderCards(cards); //visar att kortet vänds

  if (selectedCards.length === 2) {
    checkMatch();
  }
}

// Kolla match
function checkMatch(): void {
  const [first, second] = selectedCards; //plockar ut de vända korten ur arrayen
  if (!first || !second) return;

  if (first.pairId === second.pairId) {
    first.isMatched = true; //markeras som matchad så de EJ kan väljas igen
    second.isMatched = true;

    // trigga puls-animation
    first.justMatched = true;
    second.justMatched = true;

    selectedCards = []; //tömmer listan på valda kort så anv kan välja 2 nya
    renderCards(cards); // visa framsida på matchade kort

    // Ta bort puls efter animationen (för att kunna trigga igen om behövs)
    setTimeout(() => {
      first.justMatched = false;
      second.justMatched = false;
      renderCards(cards);
    }, 600);
  } else {
    setTimeout(() => {
      first.isFlipped = false;
      second.isFlipped = false;
      selectedCards = [];
      renderCards(cards); // vänd tillbaka baksida
    }, 1000);
  }
}

// ---------------------------------------------------------------
// ------------------------ Render cards  ------------------------
// ---------------------------------------------------------------
function renderCards(cards: Card[]): void {
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

    // Lägg på click-event en gång
    const cardElements = board.querySelectorAll('.card');
    cardElements.forEach((el) => {
      //el - enskilda kort-elementet som loopen jobbar med, el=html-kort
      const id = Number((el as HTMLElement).dataset.id); //Hämtar kortets data-id från HTML-elementet (som sattes när korten skapades) och omvandlar det till ett nummer.
      const card = cards.find((c) => c.id === id); //Letar upp rätt Card-objekt i arrayen som matchar det id:t. Kopplar alltså ihop HTML-elementet med sitt Card-objekt.
      if (card) {
        el.addEventListener('click', () => flipCard(card));
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
// -------------------------- Inner-HMTL -------------------------
// ---------------------------------------------------------------

export function room5(sceneWrapper: HTMLDivElement | null, next: () => void) {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = `
    <section class="room room-5">
    <div class="room-frame">
      <div class="game-session-wrapper">
        <h2>Rum 5</h2>
        <div class="board" id="board"></div>
        <div class="game-session-style">
          <p class="instruction-style">Välj rätt kod:</p>
          <div class="options-wrapper">
            <button class="option">1111</button>
            <button class="option">2222 rätt knapp</button>
            <button class="option">3333</button>
            <button class="option">4444</button>
          </div>
          <p id="message"></p>
        </div>
      </div>
    </div>
  </section>
  `;

  // Rendera memory-korten
  cards = shuffleCards(initCards());
  renderCards(cards);

  // Knapp-logik
  const buttons = document.querySelectorAll('.option');
  const message: HTMLParagraphElement | null =
    document.querySelector('#message');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.textContent === '2222 rätt knapp') {
        next();
      } else {
        if (message) {
          message.textContent = 'Fel kod!';
        }
      }
    });
  });
}

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
/*
export function room5(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper">
            <h2>Rum 5</h2>

            <div class="game-session-style">
                <p class="instruction-style">Välj rätt kod:</p>
                <div class="options-wrapper">
                  <button class="option">1111</button>
                  <button class="option">2222</button>
                  <button class="option">3333 rätt knapp</button>
                  <button class="option">4444</button>
                </div>
                <p id="message"></p>
            </div>
        </div>
      </div>
    </section>
    `;

    const buttons = document.querySelectorAll('.option');
    const message: HTMLParagraphElement | null =
        document.querySelector('#message');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.textContent === '2222 rätt knapp') {
                next(); // går vidare till nästa rum
            } else {
                if (message) {
                    message.textContent = 'Fel kod!';
                }
            }
        });
    });
}

*/
