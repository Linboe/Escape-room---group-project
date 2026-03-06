<<<<<<< HEAD
import "./room6.scss";
import { room6Book } from "./story/room6story";
import {
  setRoom6Mode,
  getArtifactById,
} from "../../components/status-bar/status-bar"; //test drop-artefakt
import { showRoomIntro } from "../../components/room-intro/room-intro";
=======
import './room6.scss';
import { room6Book, initRoom6Drop } from './story/room6story';
import {
    setRoom6Mode,
} from '../../components/status-bar/status-bar'; //test drop-artefakt
>>>>>>> origin/main

export function renderRoom6Scene() {
  const sceneWrapper = document.getElementById("sceneWrapper");
  if (!sceneWrapper) return;

  sceneWrapper.innerHTML = `
      <section class="room room-6">
        <h1>Room 6</h1>
      </section>
    `;
}

export function room6(sceneWrapper: HTMLDivElement | null, next: () => void) {
  if (!sceneWrapper) return;

<<<<<<< HEAD
  showRoomIntro(
    6,
    () => {
      /* pauseTimer */
    },
    () => {
      /* resumeTimer */
    },
    () => {
      setRoom6Mode(true); //test drop-artefakt
      document.addEventListener("dragover", (e) => e.preventDefault()); //test drop-artefakt tar bort röd varning
=======
    setRoom6Mode(true); //test drop-artefakt
    document.addEventListener('dragover', (e) => e.preventDefault()); //test drop-artefakt tar bort röd varning
>>>>>>> origin/main

      // ===============================
      // 1. HTML
      // ===============================
      sceneWrapper.innerHTML = `
      <section class="room room-6">
        <div class="room-frame">
          <div class="game-session-wrapper">

          <h2 id="roomTitleText">END GAME</h2>

            <!-- BOOK -->
            <div class="book" id="book"></div>

            <!-- PICK ART -->
            <div class="pick-art-style">
            </div>

          </div>
        </div>
      </section>
    `;

<<<<<<< HEAD
      // ===============================
      // 2. BOOK-LOGIK
      // ===============================
      const book = sceneWrapper.querySelector("#book") as HTMLDivElement;
      if (!book) return;
=======

    // ===============================
    // 2. BOOK-LOGIK
    // ===============================
    const book = sceneWrapper.querySelector('#book') as HTMLDivElement;
    if (!book) return;
>>>>>>> origin/main

      let page = 0;

      function renderBook() {
        const current = room6Book[page];

        book.innerHTML = `
<<<<<<< HEAD
    <h2 class="book-title">${current.title}</h2>
  <div class="event-text">
    <p>${current.text} </p>
    <div class="bookNav">
      ${current.hasPrev ? `<button id="prevPage">Back</button>` : ""}
      ${current.hasNext ? `<button id="nextPage">Next</button>` : ""}
      ${current.isEscape ? `<button id="escapeBtn">ESCAPE</button>` : ""}
    </div>
  </div>
`;
=======
        <h2 class='book-title'>${current.title}</h2>
        <div class='event-text'>
            ${current.text}
        
          <div class='bookNav'>
              ${current.hasPrev ? '<button id=\'prevPage\'>Back</button>' : ''}
              ${current.hasNext ? '<button id=\'nextPage\'>Next</button>' : ''}
              ${current.isEscape ? '<button id=\'escapeBtn\'>ESCAPE</button>' : ''}
          </div>
        </div>
    `;
>>>>>>> origin/main

        book.querySelector("#prevPage")?.addEventListener("click", () => {
          page--;
          renderBook();
        });

        book.querySelector("#nextPage")?.addEventListener("click", () => {
          page++;
          renderBook();
        });

        book.querySelector("#escapeBtn")?.addEventListener("click", () => {
          next();
        });
<<<<<<< HEAD
      }

      renderBook();

      // ===============================
      // 3. PICK-ART LOGIK
      // ===============================
      const buttons = sceneWrapper.querySelectorAll(".pick-art");
      const message = sceneWrapper.querySelector(
        "#message",
      ) as HTMLParagraphElement | null;

      //test drop-artefakt
      const dropZone = document.getElementById("drop-zone-1");
      dropZone?.addEventListener("dragover", (e) => e.preventDefault());
      dropZone?.addEventListener("drop", (e) => {
        const artifactId = (e as DragEvent).dataTransfer?.getData("artifactId");
        const artifact = getArtifactById(artifactId ?? "");

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
=======

        // koppla dropp igen
        initRoom6Drop(sceneWrapper!);
    }
    renderBook();

    // ===============================
    // 3. PICK-ART LOGIK
    // ===============================
    const buttons = sceneWrapper.querySelectorAll('.pick-art');
    const message = sceneWrapper.querySelector('#message') as HTMLParagraphElement | null;
>>>>>>> origin/main

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.textContent === "3") {
            next();
          } else if (message) {
            message.textContent = "Wrong item!";
          }
        });
      });
    },
  );
}
