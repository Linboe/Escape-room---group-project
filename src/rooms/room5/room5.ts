import './room5.scss';
import cardsData from '../../data/cardsData.json';

/** Memory
 * 12 kort i JSON (cards.json med id, bild)
 * shuffle-funktion
 * state: vilka kort som är vända, matchade, antal försök/tid
 * rendera korten
 */

// ---------------------------------------------------------------
// ------------------------- Define type -------------------------
// ---------------------------------------------------------------
type Card = {
  id: number;
  pairId: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

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

// ---------------------------------------------------------------
// ------------------------ Render cards  ------------------------
// ---------------------------------------------------------------

function renderCards(cards: Card[]): void {
  const board = document.getElementById('board') as HTMLDivElement;
  board.innerHTML = cards
    .map((card) => `<div class="card" data-id="${card.id}">?</div>`)
    .join('');
}
// -------------------------- Inner-HMTL -------------------------
// ---------------------------------------------------------------

export function renderRoom5Scene() {
  const sceneWrapper = document.getElementById('sceneWrapper');
  if (!sceneWrapper) return;

  sceneWrapper.innerHTML = `
    <section class="room room-5">
      <h1>Room 5</h1>
    </section>
  `;
}

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
  const cards = shuffleCards(initCards());
  renderCards(cards);

  // State
  let selectedCards: Card[] = [];

  // Kolla match
  function checkMatch(): void {
    const [first, second] = selectedCards;

    if (first.pairId === second.pairId) {
      // Match!
      first.isMatched = true;
      second.isMatched = true;
      selectedCards = [];
    } else {
      // Ingen match — vänd tillbaka efter delay
      setTimeout(() => {
        first.isFlipped = false;
        second.isFlipped = false;

        document.querySelectorAll('.card').forEach((el) => {
          const id = Number((el as HTMLElement).dataset.id);
          if (id === first.id || id === second.id) {
            el.textContent = '?';
          }
        });

        selectedCards = [];
      }, 1000);
    }
  }

  // Vänd kort
  function flipCard(card: Card, element: HTMLElement): void {
    if (card.isFlipped || card.isMatched) return;
    if (selectedCards.length === 2) return;

    card.isFlipped = true;
    element.textContent = card.value;
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      checkMatch();
    }
  }

  // Event listeners på korten
  function addCardListeners(cards: Card[]): void {
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((element) => {
      element.addEventListener('click', () => {
        const id = Number((element as HTMLElement).dataset.id);
        const card = cards.find((c) => c.id === id);
        if (!card) return;
        flipCard(card, element as HTMLElement);
      });
    });
  }

  addCardListeners(cards);

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
