import { getArtifactById } from '../../../components/status-bar/status-bar'; //test drop-artefakt

// ===============================
// 1.Här ändras innehållet i boken som visas i room6
// ===============================

export interface BookPage {
    title: string;
    text: string;
    hasPrev?: boolean;
    hasNext?: boolean;
    isEscape?: boolean;
}

export const room6Book: BookPage[] = [
    {
        title: 'The Mysterious Book',
        text: 'This is the end, enter to escape.',
        hasNext: true
    },
    {
        title: 'Part I',
        text: 'Strange Woods tightens around you as an old stone awakens. Two marks glow faintly. One speaks of wandering close to the earth, carrying life step by step through mud and roots. The other whispers of currents and scales shaped by water. You offer the <div id="drop-zone-1" class="drop-zone">Släpp här</div> and the <div id="drop-zone-2" class="drop-zone">Släpp här</div>, and the forest listens.',
        hasPrev: true,
        hasNext: true
    },
    {
        title: 'Part II',
        text: 'The path opens to a second carving, higher now, where escape is measured in height and lightness. One mark demands a way upward beyond grasping branches. The other is weightless, etched as if by wind alone. You place the <div id="drop-zone-3" class="drop-zone">Släpp här</div> and the <div id="drop-zone-4" class="drop-zone">Släpp här</div>. The trees shift. Air stirs.',
        hasPrev: true,
        hasNext: true
    },
    {
        title: 'Part III',
        text: 'At the forest’s core, power and freedom wait together. A violet scar pulses like a living crystal, resisting your touch. Beside it rests a simple promise of release, shaped to turn and open. When you set the <div id="drop-zone-5" class="drop-zone">Släpp här</div> and use the <div id="drop-zone-6" class="drop-zone">Släpp här</div>, Strange Woods finally lets go.',
        hasPrev: true,
        isEscape: true
    }
];


// ===============================
// 3. Här hanterar vi dropp-zonerna i room6 där artefakter kan släppas
// ===============================

export function initRoom6Drop(sceneWrapper: HTMLDivElement) {

    const dropZones = sceneWrapper.querySelectorAll('.drop-zone');

    dropZones.forEach((zone) => {

        zone.addEventListener('dragover', (e) => e.preventDefault());

        zone.addEventListener('drop', (e) => {
            const artifactId = (e as DragEvent).dataTransfer?.getData('artifactId');
            const artifact = getArtifactById(artifactId ?? '');

            if (artifact) {
                (zone as HTMLDivElement).innerHTML = `
                <img
                  src="${artifact.image}"
                  alt="${artifact.name}"
                  style="width:100%; height:100%; object-fit:cover; border-radius:50%"
                />
                `;
            }
        });

    });

}
// -------------------