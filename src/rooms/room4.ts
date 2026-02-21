export function room4(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
        <h2>Rum 4</h2>
        <p>Välj rätt knapp för att gå vidare:</p>
        <button id="wrong">Fel knapp</button>
        <button id="correct">Rätt knapp</button>
        <p id="message"></p>
    `;

    const correctBtn: HTMLButtonElement | null = document.querySelector('#correct');
    const wrongBtn: HTMLButtonElement | null = document.querySelector('#wrong');
    const message: HTMLParagraphElement | null = document.querySelector("#message");

    correctBtn?.addEventListener("click", () => {
        next(); // går vidare till nästa rum
    });

    wrongBtn?.addEventListener("click", () => {
        if (message) {
            message.textContent = "Fel val! Försök igen.";
        }
    });
}