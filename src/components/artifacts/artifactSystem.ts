import artifactDataRaw from './artifacts.json';
import './artifacts.scss';

export interface Artifact {
    id: string;
    name: string;
    image: string;
    description: string;
}

export interface ArtifactData {
    [key: string]: Artifact[];
}

// Här mappar vi om JSON-datan till vårt interface
const artifactData = artifactDataRaw as ArtifactData;

export function triggerArtifact(roomKey: string, artifactId: string) {
    const roomItems = artifactData[roomKey];

    const artifact = roomItems?.find((item) => item.id === artifactId);

    if (!artifact) {
        console.warn(`Artifact with id ${artifactId} not found in ${roomKey}`);
        return;
    }

    // 2. Skapa HTML för popupen dynamiskt
    const popupHtml = `
        <div id="artifact-popup-overlay" class="artifact-overlay">
            <div class="artifact-card">
                <h2 class="artifact-title"> Congratulations!</h2>
                <p>A new artifact has been unlocked - Click to collect</p>
                <div class="artifact-image-container">
                    <img id="close-artifact-btn" src="${artifact.image}" alt="${artifact.name}" class="artifact-img-large">
                </div>
                <h3 class="artifact-name">${artifact.name}</h3>
                <p class="artifact-desc">${artifact.description}</p>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHtml);

    document
        .getElementById('close-artifact-btn')
        ?.addEventListener('click', () => {
            const overlay = document.getElementById('artifact-popup-overlay');
            if (overlay) {
                overlay.remove();
            }
        });
}

/*
 1. Importera --> import { triggerArtifact } from '../../components/artifacts/artifactSystem'; till ditt rum
 2. Koppla på funktionen där du vill/vid klarad uppgigt (ange rum + vilken artefakt) ---> triggerArtifact('room5', 'amethyst');
 3. Om du vill ändra din artefakt/lägga till gör det direkt i ---> artifacts.json
 */
