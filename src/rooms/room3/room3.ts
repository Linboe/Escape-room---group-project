import "./room3.scss";

let currentQuestionIndex = 0;
let correctAnswers = 0;
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

export function renderRoom3Scene() {
  const sceneWrapper = document.getElementById("sceneWrapper");
  if (!sceneWrapper) return;

  sceneWrapper.innerHTML = `
    <section class='room room-3'>
      <h1>The Inner Jungle (Archive of Illusions)</h1>
      <p class="story">
        You step into a grand inner jungle, hidden inside a glass palace.
        Everything feels unreal — a dream, a memory, or a map of the forest itself.
        A silent man stands by the water. A small boat waits at the shore.
      </p>
      <p class="hint">
        The man whispers: 'Only those who understand plants may pass.'
      </p>
      <button id='startPuzzleBtn'>Approach the man</button>
    </section>
  `;
}

export function room3(sceneWrapper: HTMLDivElement | null, next: () => void) {
  if (!sceneWrapper) return;

  currentQuestionIndex = 0;
  correctAnswers = 0;
  hasArtifactRoom3 = false;
  wrongAttempts = 0;
  hasStarted = false;

  sceneWrapper.innerHTML = `
        <h2>The Inner Jungle (Archive of Illusions)</h2>

        <p class='story' id='story1'>You step into a grand inner jungle, hidden inside a glass palace.
        Everything feels unreal — a dream, a memory, or a map of the forest itself.
        A silent man stands by the water. A small boat waits at the shore.
        </p>

        <p class='hint' id='hint1'>
        The man whispers: 'Only those who understand plants may pass.'
        </p>

        <button id='approachBtn'>Approach the man</button>

        <p class='story hidden' id='story2'>
        You step closer to the man. 
        He looks at you with calm eyes, as if assessing your worthiness.
        The jungle breathes around you.
        The boat will only move if you prove your knowledge of plants.
        </p>

        <button id='startBtn' class='hidden'>Start the trial</button>

        <div id='quiz' class='hidden'>
        <p id='question'></p>

        <button class='option' disabled>rätt knapp</button>
        <button class='option' disabled></button>
        <button class='option' disabled></button>
        <button class='option' disabled></button>

        <p id='message'></p>
        </div>
    `;

  const approachBtn = sceneWrapper.querySelector(
    "#approachBtn",
  ) as HTMLButtonElement;
  const startBtn = sceneWrapper.querySelector("#startBtn") as HTMLButtonElement;
  const story2 = sceneWrapper.querySelector("#story2") as HTMLParagraphElement;
  const quiz = sceneWrapper.querySelector("#quiz") as HTMLDivElement;

  const buttons = sceneWrapper.querySelectorAll(".option");
  const message = sceneWrapper.querySelector(
    "#message",
  ) as HTMLParagraphElement;
  const questionText = sceneWrapper.querySelector(
    "#question",
  ) as HTMLParagraphElement;

  function renderQuestion() {
    const q = questions[currentQuestionIndex];
    questionText!.textContent = q.question;
    message!.textContent = "";

    buttons.forEach((btn, index) => {
      btn.textContent = q.options[index];
      btn.removeAttribute("disabled");
    });
  }

  //Step 1
  approachBtn.addEventListener("click", () => {
    story2.classList.remove("hidden");
    startBtn.classList.remove("hidden");
    approachBtn.disabled = true;
  });

  //Step 2
  approachBtn.addEventListener("click", () => {
    quiz.classList.remove("hidden");
    startBtn.remove();
    renderQuestion();
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!hasStarted) return;
      const current = questions[currentQuestionIndex];

      if (btn.textContent === current.correct) {
        message.textContent = "Correct. The jungle shifts slightly...";
        currentQuestionIndex++;

        if (currentQuestionIndex === questions.length) {
          hasArtifactRoom3 = true; // artefakt: mannens ledtråd har vunnits
          message.textContent = "The man nods. The boat is now safe to enter.";
          setTimeout(() => {
            next(); // går vidare till nästa rum
          }, 1200);
        } else {
          setTimeout(renderQuestion, 800);
        }
      } else {
        wrongAttempts++;

        if (wrongAttempts === 1) {
          message.textContent = "Wrong. The leaves whispers in warning...";
        } else if (wrongAttempts === 2) {
          message.textContent =
            "Still wrong. The jungle grows darker around you...";
        } else {
          message.textContent =
            "You have failed the trial. The jungle rejects you. The boat will not move. You must try again.";

          buttons.forEach((b) => b.setAttribute("disabled", "true"));
        }
      }
    });
  });
}
