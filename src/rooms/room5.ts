export function room5(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
        <h2>Rum 5</h2>
        <p>Välj rätt kod:</p>
        <button class="option">1111</button>
        <button class="option">2222 rätt knapp</button>
        <button class="option">3333</button>
        <button class="option">4444</button>
        <p id="message"></p>
    `;

    const buttons = document.querySelectorAll(".option");
    const message: HTMLParagraphElement | null = document.querySelector("#message");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.textContent === "2222 rätt knapp") {
                next(); // går vidare till nästa rum
            } else {
                if (message) {
                    message.textContent = "Fel kod!";
                }
            }
        });
    });
}