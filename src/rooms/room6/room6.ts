import './room6.scss';

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

    // ===============================
    // 1. HTML
    // ===============================
    sceneWrapper.innerHTML = `
      <section class="room room-6">
        <div class="room-frame">
          <div class="game-session-wrapper">

            <!-- BOOK -->
            <div class="book" id="book"></div>

            <!-- PICK ART -->
            <div class="pick-art-style">
              <p class="instruction-style">Choose the correct item:</p>
              <div class="pick-art-wrapper">
                <button class="pick-art">1</button>
                <button class="pick-art">2</button>
                <button class="pick-art">3</button>
                <button class="pick-art">4</button>
                <button class="pick-art">5</button>
                <button class="pick-art">6</button>
              </div>
              <p id="message"></p>
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
        if (page === 0) {
            book.innerHTML = `
              <p class="book-text">
                You find a book with a riddle. Solve it to proceed.
              </p>
              <div class="bookNav">
                <button id="nextPage">Next</button>
              </div>
            `;

            book.querySelector('#nextPage')?.addEventListener('click', () => {
                page = 1;
                renderBook();
            });
        }

        if (page === 1) {
            book.innerHTML = `
              <p class="book-text">
                Blad 2 – Hint: The answer is hidden in plain sight.
              </p>
              <div class="bookNav">
                <button id="prevPage">Back</button>
                <button id="nextPage">Next</button>
            </div>
            `;

            book.querySelector('#prevPage')?.addEventListener('click', () => {
                page = 0;
                renderBook();
            });

            book.querySelector('#nextPage')?.addEventListener('click', () => {
                page = 2;
                renderBook();
            });
        }

        if (page === 2) {
            book.innerHTML = `
              <p class="book-text">
                Blad 3 – Hint: The correct item is the one that stands out.
              </p>
              <div class="bookNav">
                <button id="prevPage">Back</button>
                <button id="nextPage">Next</button>
            </div>
            `;

            book.querySelector('#prevPage')?.addEventListener('click', () => {
                page = 1;
                renderBook();
            });

            book.querySelector('#nextPage')?.addEventListener('click', () => {
                page = 3;
                renderBook();
            });
        }

        if (page === 3) {
            book.innerHTML = `
              <p class="book-text">
                Blad 4 – You are free, RUN
              </p>
              <div class="bookNav">
                <button id="prevPage">Back</button>
                <button id="escapeBtn">ESCAPE</button>
              </div>
            `;

            book.querySelector('#prevPage')?.addEventListener('click', () => {
                page = 2;
                renderBook();
            });

            book.querySelector('#escapeBtn')?.addEventListener('click', () => {
                next();
            });
        }
    }

    renderBook();

    // ===============================
    // 3. PICK-ART LOGIK
    // ===============================
    const buttons = sceneWrapper.querySelectorAll('.pick-art');
    const message = sceneWrapper.querySelector('#message') as HTMLParagraphElement | null;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent === '3') {
                next();
            } else if (message) {
                message.textContent = 'Wrong item!';
            }
        });
    });
}
