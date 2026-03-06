import './room6.scss';
import { room6Book, initRoom6Drop } from './story/room6story';
import {
    setRoom6Mode,
} from '../../components/status-bar/status-bar'; //test drop-artefakt

export function renderRoom6Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
      <section class="room room-6">
        <h1>Room 6</h1>
      </section>
    `;
}

export function room6(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    setRoom6Mode(true); //test drop-artefakt
    document.addEventListener('dragover', (e) => e.preventDefault()); //test drop-artefakt tar bort röd varning


    // ===============================
    // 1. HTML
    // ===============================
    sceneWrapper.innerHTML = `
      <section class="room room-6">
        <div class="room-frame">
          <div class="game-session-wrapper">

          <h2 id="roomTitleText">END GAME</h2>

            <!-- BOOK -->
            <div class="book" id="book"></div>

            <!-- PICK ART -->
            <div class="pick-art-style">
            </div>

          </div>
        </div>
      </section>
    `;


    // ===============================
    // 2. BOOK-LOGIK
    // ===============================
    const book = sceneWrapper.querySelector('#book') as HTMLDivElement;
    if (!book) return;

    let page = 0;

    function renderBook() {
        const current = room6Book[page];

        book.innerHTML = `
        <h2 class='book-title'>${current.title}</h2>
        <div class='event-text'>
            ${current.text}
        
          <div class='bookNav'>
              ${current.hasPrev ? '<button id=\'prevPage\'>Back</button>' : ''}
              ${current.hasNext ? '<button id=\'nextPage\'>Next</button>' : ''}
              ${current.isEscape ? '<button id=\'escapeBtn\'>ESCAPE</button>' : ''}
          </div>
        </div>
    `;

        book.querySelector('#prevPage')?.addEventListener('click', () => {
            page--;
            renderBook();
        });

        book.querySelector('#nextPage')?.addEventListener('click', () => {
            page++;
            renderBook();
        });

        book.querySelector('#escapeBtn')?.addEventListener('click', () => {
            next();
        });

        // koppla dropp igen
        initRoom6Drop(sceneWrapper!);
    }
    renderBook();

    // ===============================
    // 3. PICK-ART LOGIK
    // ===============================
    const buttons = sceneWrapper.querySelectorAll('.pick-art');
    const message = sceneWrapper.querySelector('#message') as HTMLParagraphElement | null;

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.textContent === '3') {
                next();
            } else if (message) {
                message.textContent = 'Wrong item!';
            }
        });
    });
}
