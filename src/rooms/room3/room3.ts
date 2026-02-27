import "./room3.scss";
import { renderGameOverScene } from "../../scenes/game-over-scene/game-over-scene";

let currentQuestionIndex = 0;
let hasArtifactRoom3 = false;
let wrongAttempts = 0;
let hasStarted = false;

const questions = [
  {
    question: "Which part of the plant is responsible for photosynthesis?",
    options: ["Leaves", "Roots", "Flower", "Stem"],
    correct: "Leaves",
  },
  {
    question: "What pigment gives plants their green color?",
    options: ["Chlorophyll", "Carotenoid", "Anthocyanin", "Xanthophyll"],
    correct: "Chlorophyll",
  },
  {
    question: "Which process do plants use to convert sunlight into energy?",
    options: ["Respiration", "Transpiration", "Photosynthesis", "Germination"],
    correct: "Photosynthesis",
  },
];

export function room3(sceneWrapper: HTMLDivElement | null, next: () => void) {
  if (!sceneWrapper) return;

  currentQuestionIndex = 0;
  hasArtifactRoom3 = false;
  wrongAttempts = 0;
  hasStarted = false;

  sceneWrapper.innerHTML = `
    <section class="room room-3">
      <div class="room3-overlay">
        <h1>The Inner Jungle (Archive of Illusions)</h1>

        <p class="story" id="story1">
          You step into a grand inner jungle, hidden inside a glass palace.
          Everything feels unreal — a dream, a memory, or a map of the forest itself.
          A silent man stands by the water. A small boat waits at the shore.
        </p>

        <p class="hint" id="hint1">
          The man whispers: "Only those who understand plants may pass."
        </p>

        <button id="approachBtn">Approach the man</button>

        <p class="story hidden" id="story2">
          You step closer to the man.
          He looks at you with calm eyes, as if assessing your worthiness.
          The jungle breathes around you.
          The boat will only move if you prove your knowledge of plants.
        </p>

        <button id="startBtn" class="hidden">Start the trial</button>

        <div id="quiz" class="hidden">
          <p id="question"></p>

          <div class="options">
            <button class="option" disabled></button>
            <button class="option" disabled></button>
            <button class="option" disabled></button>
            <button class="option" disabled></button>
          </div>

          <p id="message"></p>
        </div>
      </div>
    </section>
  `;

  const approachBtn = sceneWrapper.querySelector("#approachBtn") as HTMLButtonElement;
  const startBtn = sceneWrapper.querySelector("#startBtn") as HTMLButtonElement;
  const story1 = sceneWrapper.querySelector("#story1") as HTMLParagraphElement;
  const hint1 = sceneWrapper.querySelector("#hint1") as HTMLParagraphElement;
  const story2 = sceneWrapper.querySelector("#story2") as HTMLParagraphElement;
  const quiz = sceneWrapper.querySelector("#quiz") as HTMLDivElement;

  const buttons = sceneWrapper.querySelectorAll<HTMLButtonElement>(".option");
  const message = sceneWrapper.querySelector("#message") as HTMLParagraphElement;
  const questionText = sceneWrapper.querySelector("#question") as HTMLParagraphElement;

  function renderQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.question;
    message.textContent = "";

    buttons.forEach((btn, index) => {
      btn.textContent = q.options[index];
      btn.disabled = false;
    });
  }

  // STEP 1 → Approach 
  approachBtn.addEventListener("click", () => {
    story1.remove();
    hint1.remove();
    approachBtn.remove();

    story2.classList.remove("hidden");
    startBtn.classList.remove("hidden");
  });

  // STEP 2 – Start trial
  startBtn.addEventListener("click", () => {
    story2.remove();
    startBtn.remove();
    quiz.classList.remove("hidden");
    renderQuestion();
  });

  // STEP 3 – Quiz logic
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      hasStarted = true;

      const current = questions[currentQuestionIndex];

      if (btn.textContent === current.correct) {
        message.textContent = "Correct. The jungle shifts slightly...";
        currentQuestionIndex++;

        if (currentQuestionIndex === questions.length) {
          hasArtifactRoom3 = true;
          message.textContent = "The man nods. The boat is now safe to enter.";

          setTimeout(() => next(), 1200);
        } else {
          setTimeout(renderQuestion, 700);
        }
      } else {
        wrongAttempts++;

        if (wrongAttempts === 1) {
          message.textContent = "Wrong. The leaves whisper in warning...";
        } else if (wrongAttempts === 2) {
          message.textContent = "Still wrong. The jungle grows darker around you...";
        } else {
          message.textContent =
            "You have failed the trial. The jungle rejects you.";
          buttons.forEach((b) => (b.disabled = true));
          setTimeout(() => {
            renderGameOverScene(0);
          }, 1000);
        }
      }
    });
  });
}