export function room6(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
        <h2>Rum 6</h2>
        <p>Välj rätt kod:</p>
        <button class="option">aaaa</button>
        <button class="option">bbbb</button>
        <button class="option">cccc</button>
        <button class="option">dddd rätt knapp</button>
        <p id="message"></p>
    `;

    const buttons = sceneWrapper.querySelectorAll(".option");
    const message: HTMLParagraphElement | null = document.querySelector("#message");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.textContent === "dddd rätt knapp") {
                next(); // går vidare till nästa rum
            } else {
                if (message) {
                    message.textContent = "Fel kod!";
                }

            }
        });
    });
}