import './room5.scss';

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
