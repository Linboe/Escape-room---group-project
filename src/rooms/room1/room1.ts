import './room1.scss';

export function renderRoom1Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-1">
      <h1>Room 1</h1>
    </section>
  `;
}

export function room1(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-1">
      <div class="room-frame">
        <div class="game-session-wrapper">
            <h2>Rum 1</h2>

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

    const correctBtn: HTMLButtonElement | null = document.querySelector('#correct');
    const wrongBtn: HTMLButtonElement | null = document.querySelector('#wrong');
    const message: HTMLParagraphElement | null = document.querySelector('#message');

    correctBtn?.addEventListener('click', () => {
        next(); // går vidare till nästa rum
    });

    wrongBtn?.addEventListener('click', () => {
        if (message) {
            message.textContent = 'Fel val! Försök igen.';
        }
    });
}

