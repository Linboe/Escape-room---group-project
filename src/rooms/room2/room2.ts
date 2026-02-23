import './room2.scss';

export function renderRoom2Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-2">
      <h1>Room 2</h1>
    </section>
  `;
}

export function room2(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <div class="game-session-wrapper">
        <h2>Rum 2</h2>
        <div style="
            background-image: url('src/assets/alternative/greenhouse_alt_2.jpg');
            background-size: cover;
            background-position: center;
            width: 100%;
            height: 500px;">
        </div>

        <p>Välj rätt kod:</p>
        <button class="option">1111</button>
        <button class="option">2222</button>
        <button class="option">3333 rätt knapp</button>
        <button class="option">4444</button>
        <p id="message"></p>
    </div>
    `;

    const buttons = document.querySelectorAll(".option");
    const message: HTMLParagraphElement | null = document.querySelector("#message");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.textContent === "3333 rätt knapp") {
                next(); // går vidare till nästa rum
            } else {
                if (message) {
                    message.textContent = "Fel kod!";
                }
            }
        });
    });
}