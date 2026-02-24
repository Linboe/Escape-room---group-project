import './room5.scss';
import cardsData from '../../data/cardsData.json';

/** Memory
 * x kort i JSON (cards.json med id, bild)
 * x shuffle-funktion
 * x state: vilka kort som är vända, matchade, antal försök/tid
 * x rendera korten
 * x bild fram och baksida
 *   animation när rätt match
 *   animation när alla rätt - få artefakten
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
  return cards.sort(() => Math.random() - 0.5); // math.random ger slumpmässigt tal mellan 0 och 1. minus 0.5 --> negativt=byt ej plats el positivit=byt plats
}

// Vänd kort
function flipCard(card: Card): void {
  if (card.isFlipped || card.isMatched) return;
  if (selectedCards.length === 2) return;

  card.isFlipped = true;
  selectedCards.push(card);
  renderCards(cards);

  if (selectedCards.length === 2) {
    checkMatch();
  }
}

// Kolla match
function checkMatch(): void {
  const [first, second] = selectedCards;
  if (!first || !second) return;

  if (first.pairId === second.pairId) {
    // Match!
    first.isMatched = true;
    second.isMatched = true;
    selectedCards = [];
    renderCards(cards); // visa framsida på matchade kort
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
    '/fed25d-js-intro-grupparbete-the-dopefish-admirers/img/cardBack2.jpg'; // bas-path för baksidan

  // Skapa korten EN gång
  if (board.childElementCount === 0) {
    board.innerHTML = cards
      .map(
        (card) => `<div class="card" data-id="${card.id}">
         <img src="${cardBack}" class="cardImage" />
        </div>`,
      )
      .join('');

    // Lägg på click-event en gång
    const cardElements = board.querySelectorAll('.card');
    cardElements.forEach((el) => {
      const id = Number((el as HTMLElement).dataset.id);
      const card = cards.find((c) => c.id === id);
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
      img.src = img.src =
        card.isFlipped || card.isMatched ? card.value : cardBack;
    }
  });
}
// -------------------------- Inner-HMTL -------------------------
// ---------------------------------------------------------------

export function room5(sceneWrapper: HTMLDivElement | null, next: () => void) {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = `
    <div class="container">
        <h2>Rum 5</h2>
        <div class="board" id="board"></div>
        <p>Välj rätt kod:</p>
        <button class="option">1111</button>
        <button class="option">2222 rätt knapp</button>
        <button class="option">3333</button>
        <button class="option">4444</button>
        <p id="message"></p>
    </div>
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
