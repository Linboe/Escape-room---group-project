import './room2.scss';
import { state } from '../../state/gamestate';
import { render } from '../../main';
import { showRoomIntro } from '../../components/room-intro/room-intro';

export function room2(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    let collectedCodes: string[] = [];
    let currentPath: 'A' | 'B' | null = null;

    //------------------ 1. FLOW CONTROL --------------------

    function updateUI(content: string) {
        if (!sceneWrapper) return;

        let sessionWrapper = sceneWrapper.querySelector('.game-session-wrapper');

        if (!sessionWrapper) {
            sceneWrapper.innerHTML = `
            <section class="room room-2">
                <div class="room-frame">
                    <div class="game-session-wrapper">
                        ${content}
                    </div>
                </div>
            </section>`;
        } else {
            sessionWrapper.innerHTML = content;
        }
    }

    function showStart() {
        if (!sceneWrapper) return;

        sceneWrapper.innerHTML = `  
        <section class= "room room-2">
            <div class="room-frame">
                <div class="game-session-wrapper">
                    <h2 class="room-title-text">Victoria House</h2>

                    <div class="game-wrapper event-text show-start-wrapper">
                        <p class="text"> The air in the Victoria House is thick with humidity and the scent of damp earth.</p>
                        <p class="text"> Ahead of you, the path vanishes into a wall of green.</p>
                        <p class="quest"> You know the code out of here is hidden in <strong>three fragments.</strong></p>

                        <button id="startJourney" class="interaction-button start-journey-btn">Begin Search</button>
                    </div>
                </div>
            </div>
        </section>  
     `;

        const startBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#startJourney');

        startBtn?.addEventListener('click', () => {
            if (!sceneWrapper) return;

            updateUI(`
                <h2 class="room-title-text">Victoria House</h2>

                <div class="game-wrapper choose-path-wrapper">
                    <p class="event-text">Where do you begin your search?</p>
                    <div class="option-wrapper">
                        <button id="ferns" class="interaction-button">Push through the dense ferns and hanging air roots to the right. It’s dark, but you feel something watching you from the leaves.</button>
                        <button id= "lilyPads" class="interaction-button">Step onto the giant lily pads. They look like floating plates, sturdy enough to hold your weight, shimmering under the glass roof.</button>
                    </div>
                </div>
            `);

            const ferns: HTMLButtonElement | null = sceneWrapper.querySelector('#ferns');
            const lilyPads: HTMLButtonElement | null = sceneWrapper.querySelector('#lilyPads');

            ferns?.addEventListener('click', () => {
                choosePath('A');
            });

            lilyPads?.addEventListener('click', () => {
                choosePath('B');
            });
        });
    }

    function choosePath(choice: 'A' | 'B') {
        currentPath = choice;

        if (choice === 'A') {
            riddleGame();
        } else {
            sequenceGame();
        }
    }

    function nextGame() {
        if (!sceneWrapper) return;

        if (collectedCodes.length === 3) {
            finalCodeGame();
            return;
        }

        if (currentPath === 'A') {
            if (collectedCodes.length === 1) sequenceGame();
            else if (collectedCodes.length === 2) numberGuessGame();
        } else {
            if (collectedCodes.length === 1) numberGuessGame();
            else if (collectedCodes.length === 2) riddleGame();
        }
    }

    //-------------- 2. MINI GAMES - in order they appear on path A ---------------

    function riddleGame() {
        if (!sceneWrapper) return;

        updateUI(`
            <h2 class="room-title-text">The Brass Plaque</h2>

            <div class="game-wrapper riddle-game-wrapper">
                <p class="event-text">"I am the mirror that never breaks, I cradle the giant but have no arms. What am I?"</p>
                <div class="riddle-game-btns">
                    <button id= "roof" class="answer-btn interaction-button">The Glass Roof</button>
                    <button id= "surface" class="answer-btn interaction-button">The Water's Surface</button>
                    <button id= "shadows" class="answer-btn interaction-button">The Deep Shadows</button>
                </div>
                <p class="event-text game-message hidden"></p>
            </div>
        `);

        const answerBtns = sceneWrapper.querySelectorAll('.answer-btn');
        const message: HTMLParagraphElement | null = sceneWrapper.querySelector('.game-message');

        answerBtns.forEach(btn => {
            btn.addEventListener('click', () => {

                if (btn.id === 'surface') {
                    collectedCodes.push('11');
                    fragmentFound('11', 'Your sharp mind saw through the mystery of the brass plaque.');
                }

                else {

                    if (message) {
                        if (btn.id === 'roof') {
                            message.classList.remove('hidden');
                            message.textContent = 'You look up at the glass panes, but they remain silent. The glass reflects the sky, but it does not cradle the life within the water.';
                        } else if (btn.id === 'shadows') {
                            message.classList.remove('hidden');
                            message.textContent = 'The shadows grow longer as you speak, but they offer no reflection. Look where the light meets the water.';
                        }

                        setTimeout(() => {
                            message.classList.add('hidden');
                        }, 3000);
                    }
                }
            });
        });
    }

    function sequenceGame() {
        if (!sceneWrapper) return;

        type GameObject = 'flower' | 'lilyLeaf' | 'hangingFern' | 'sign' | 'ceiling' | 'redPlant';
        const correctOrder: GameObject[] = ['flower', 'lilyLeaf', 'ceiling'];
        let playerChoice: GameObject[] = [];

        updateUI(`
            <h2 class="room-title-text">The Watcher of Victoria House</h2>

            <div class="game-wrapper sequence-game-wrapper">
                <p class="event-text">The giant lily pads feel surprisingly firm beneath your feet. From here, you see the life of the greenhouse rising toward the sun.
                Follow the path of growth — from the roots to the sky — to unlock the first secret.</p>
                <button id="startSequenceBtn" class="interaction-button">Begin</button>
            </div>
        `);

        const startSequenceBtn = sceneWrapper.querySelector('#startSequenceBtn');
        startSequenceBtn?.addEventListener('click', () => {

            updateUI(`
                <div class="sequence-overlay-wrapper">
                    <button id="flower" class="sequence-btn invisible-btn" aria-label="Pink Flower"></button>
                    <button id="hangingFern" class="sequence-btn invisible-btn" aria-label="Hanging Fern"></button>
                    <button id="lilyLeaf" class="sequence-btn invisible-btn" aria-label="Giant Lily"></button>
                    <button id="sign" class="sequence-btn invisible-btn" aria-label="Info sign"></button>
                    <button id="ceiling" class="sequence-btn invisible-btn" aria-label="Glass ceiling"></button>
                    <button id="redPlant" class="sequence-btn invisible-btn" aria-label="Red Plant"></button>
                    <p class="event-text game-message hidden"></p> 
                </div>         
            `);

            const message: HTMLParagraphElement | null = sceneWrapper.querySelector('.game-message');
            const gameBtns = sceneWrapper.querySelectorAll('.sequence-btn');

            gameBtns.forEach(btn => {
                btn.addEventListener('click', () => {

                    const id = btn.id as GameObject;
                    const nextCorrrectObject = correctOrder[playerChoice.length];

                    if (id === nextCorrrectObject) {
                        playerChoice.push(id);

                        if (message) {
                            message.classList.remove('hidden');

                            if (playerChoice.length === 1) {
                                message.textContent = 'The plants lean closer...';
                            }
                            else if (playerChoice.length === 2) {
                                message.textContent = 'The air grows heavy. You are almost there, the hierarchy is nearly complete...';
                            }
                            else if (playerChoice.length === correctOrder.length) {
                                message.textContent = 'The glass ceiling shimmers. You have mastered the hierarchy of growth!';
                                collectedCodes.push('24');
                                fragmentFound('24', 'The numbers emerged from the leaves as you followed the path of growth.');
                            }

                            setTimeout(() => {
                                message.classList.add('hidden');
                            }, 2000);
                        }
                    } else {
                        playerChoice = [];

                        if (message) {
                            message.classList.remove('hidden');

                            if (id === 'hangingFern') {
                                message.textContent = 'The ferns rustle, but they are merely part of the curtain.';
                            } else if (id === 'redPlant') {
                                message.textContent = 'The red leaves reach high, but they are not the final boundary.';
                            } else if (id === 'sign') {
                                message.textContent = 'The faded sign offers no guidance. The cycle is broken.';
                            } else {
                                message.textContent = 'The cycle of growth has been broken—start again from the roots.';
                            }

                            setTimeout(() => {
                                message.classList.add('hidden');
                            }, 2000);
                        }
                    }
                });
            });
        });
    }

    function numberGuessGame() {
        if (!sceneWrapper) return;

        let attempts = 0;

        updateUI(`
            <h2 class="room-title-text">The Foggy Window</h2>

            <div class="game-wrapper number-guess-wrapper">
                <p class="event-text">The glass is fogged up. Adjust the humidity (1-20) to see the code.</p>
                <input type="number" id="guessInput" min="1" max="20">
                <button id="guessBtn" class="interaction-button">Adjust</button>
                <p class="event-text game-message hidden"></p>  
            </div>
        `);

        const guessBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#guessBtn');
        const guessInput: HTMLInputElement | null = sceneWrapper.querySelector('#guessInput');
        const message: HTMLParagraphElement | null = sceneWrapper.querySelector('.game-message');

        guessBtn?.addEventListener('click', () => {

            const inputValue = Number(guessInput?.value);

            if (inputValue === 12) {
                collectedCodes.push('55');
                fragmentFound('55', 'The fog clears!');

            } else {
                attempts++;

                if (attempts >= 5) {
                    if (message) {
                        message.classList.remove('hidden');
                        message.textContent = 'The fog thickens. You can no longer breathe. Game over!';
                    }
                    setTimeout(() => {
                        state.screen = 'gameover';
                        render();
                    }, 2000);

                } else if (inputValue < 12) {
                    if (message) {
                        message.classList.remove('hidden');
                        message.innerHTML = `Too dry. Increase the humidity. <br> Attempts left: ${5 - attempts}`;
                    }

                } else if (inputValue > 12) {
                    if (message) {
                        message.classList.remove('hidden');
                        message.innerHTML = `Too damp. The glass is dripping! <br> Attempts left: ${5 - attempts}`;
                    }
                }

                setTimeout(() => {
                    message?.classList.add('hidden');
                }, 2000);

            }
        });
    }

    function finalCodeGame() {
        const correctExitCode = ['55', '11', '24'];
        let attempts = 0;

        if (!sceneWrapper) return;

        updateUI(`
            <h2 class="room-title-text">The Final Exit</h2>

            <div class="game-wrapper final-code-wrapper">
                <p class="event-text">You've reached the Victoria House exit. The electronic lock requires the combined sequence of the fragments you've discovered among the leaves and water. 
                The air here is thinner, cooler — the exit is just one correct code away.</p>

                <div class="event-text">
                    <p>Your fragments: <strong>${collectedCodes[0]}</strong> - <strong>${collectedCodes[1]}</strong> - <strong>${collectedCodes[2]}</strong></p>
                    <div class="final-exit-inputs">
                        <input type="text" id="input0" class="code-input" maxlength="2" pattern="[0-9]">
                        <input type="text" id="input1" class="code-input" maxlength="2" pattern="[0-9]">
                        <input type="text" id="input2" class="code-input" maxlength="2" pattern="[0-9]">
                    </div>
                    <p class="game-message hidden"></p>
                </div>

                <button id="unlockBtn" class="interaction-button">Unlock Exit</button>
            </div>
        `);

        const input0: HTMLInputElement | null = sceneWrapper.querySelector('#input0');
        const input1: HTMLInputElement | null = sceneWrapper.querySelector('#input1');
        const input2: HTMLInputElement | null = sceneWrapper.querySelector('#input2');

        const unlockBtn = sceneWrapper.querySelector('#unlockBtn');
        const message = sceneWrapper.querySelector('.game-message');

        unlockBtn?.addEventListener('click', () => {
            attempts++;

            if (input0?.value === correctExitCode[0] && input1?.value === correctExitCode[1] && input2?.value === correctExitCode[2]) {

                updateUI(`
                    <h2 class="room-title-text">The Final Exit</h2>

                    <div class="game-wrapper artefact-wrapper">
                        <p class="event-text">The lock clicks open. The cool air rushes in as the doors of Victoria House swing wide. You have escaped!</p>

                        <p class="event-text artifact-discovery">
                            As the heavy doors creak open, a small, intricate object falls from the lock mechanism. 
                            It is <strong>The Watcher's Key</strong>. You pick it up and feel its cold metal before tucking it away.
                        </p>

                        <button id="nextRoomBtn" class="interaction-button">Continue to next room</button>
                    </div>          
                `);

                const nextRoomBtn = sceneWrapper.querySelector('#nextRoomBtn');
                nextRoomBtn?.addEventListener('click', () => {
                    next();
                });

            } else if (attempts >= 5) {
                if (message) {
                    message.classList.remove('hidden');
                    message.textContent = 'The alarm sounds. The Victoria House locks down forever. Game over!';

                    setTimeout(() => {
                        state.screen = 'gameover';
                        render();
                    }, 2000);
                }

            } else {
                if (message) {
                    message.classList.remove('hidden');
                    message.innerHTML = `Wrong code. The door remains shut... <br> Attempts left: ${5 - attempts}`;
                }
            }
        });
    }

    //------------------- 3. VICTORY SCREEN -------------------

    function fragmentFound(code: string, specificText: string) {

        if (!sceneWrapper) return;

        updateUI(`
            <div class="game-wrapper fragment-found-wrapper">
                <p class="event-text fragment-found-text"><i>${specificText}</i>
                Fragment found: <strong>${code}</strong></p>
                    
                <button id="continueBtn" class="interaction-button continue-btn">Continue</button>
            </div>    
            `);

        const continueBtn = sceneWrapper?.querySelector('#continueBtn');

        continueBtn?.addEventListener('click', () => {
            nextGame();
        });
    }

    //---------------------- 4. START -------------------------
    showRoomIntro(
        2,
        () => { /* pauseTimer */ },
        () => { /* resumeTimer */ },
        () => {
            showStart();
        }
    );
}
