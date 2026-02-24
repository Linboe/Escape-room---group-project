import './room3.scss';

export function renderRoom3Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-3">
      <h1>Room 3</h1>
    </section>
  `;
}

export function room3(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-3">
        <div class="game-session-wrapper">
            <h2>Rum 3</h2>

            <div class="game-session-style">
                <p>Välj rätt kod:</p>
                <button class="option">1111</button>
                <button class="option">2222</button>
                <button class="option">3333 rätt knapp</button>
                <button class="option">4444</button>
                <p id="message"></p>
            </div>
        </div>
    </section>
    `;

    const buttons = sceneWrapper.querySelectorAll('.option');
    const message: HTMLParagraphElement | null = document.querySelector('#message');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent === 'aaaa rätt knapp') {
                next(); // går vidare till nästa rum
            } else {
                if (message) {
                    message.textContent = 'Fel kod!';
                }

            }
        });
    });
}