import './room6.scss';
import {
    setRoom6Mode,
    getArtifactById,
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

    sceneWrapper.innerHTML = `
    <section class="room room-6">
      <div class="room-frame">
        <div class="game-session-wrapper">
            <h2>Rum 6</h2>
 <div id="drop-zone-1" class="drop-zone">Släpp här</div> 
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

    //test drop-artefakt
    const dropZone = document.getElementById('drop-zone-1');
    dropZone?.addEventListener('dragover', (e) => e.preventDefault());
    dropZone?.addEventListener('drop', (e) => {
        const artifactId = (e as DragEvent).dataTransfer?.getData('artifactId');
        const artifact = getArtifactById(artifactId ?? '');

        if (artifact && dropZone) {
            dropZone.innerHTML = `
            <img 
                src="${artifact.image}" 
                alt="${artifact.name}"
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
            />
        `;
        }
    });
    // -------------------
    const buttons = sceneWrapper.querySelectorAll('.option');
    const message: HTMLParagraphElement | null =
        document.querySelector('#message');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.textContent === 'dddd rätt knapp') {
                next(); // går vidare till nästa rum
            } else {
                if (message) {
                    message.textContent = 'Fel kod!';
                }
            }
        });
    });
}
