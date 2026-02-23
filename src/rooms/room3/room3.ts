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
        <h2>Rum 3</h2>
        <p>Välj rätt kod:</p>
        <button class="option">aaaa rätt knapp</button>
        <button class="option">bbbb</button>
        <button class="option">cccc</button>
        <button class="option">dddd</button>
        <p id="message"></p>
    `;

    const buttons = sceneWrapper.querySelectorAll(".option");
    const message: HTMLParagraphElement | null = document.querySelector("#message");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.textContent === "aaaa rätt knapp") {
                next(); // går vidare till nästa rum
            } else {
                if (message) {
                    message.textContent = "Fel kod!";
                }

            }
        });
    });
}