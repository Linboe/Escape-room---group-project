import './room2.scss';
import { state } from '../../state/gamestate';
import { render } from '../../main';

export function room2(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    let collectedCodes: string[] = [];
    let currentPath: 'A' | 'B' | null = null;

    sceneWrapper.innerHTML = `
     <section class= "room room-2">
        <div class="room-frame">
            <div class="game-session-wrapper">
                <h2 class="room-title-text">Victoria House</h2>
            </div>
        </div>
     </section>   
        `;

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

        const startBtn: HTMLButtonElement | null = document.querySelector('#startJourney');

        startBtn?.addEventListener('click', () => {
            if (!sceneWrapper) return;

            sceneWrapper.innerHTML = `
               <section class= "room room-2">
                    <div class="room-frame">
                        <div class="game-session-wrapper">
                            <h2 class="room-title-text">Victoria House</h2>

                            <div class="game-wrapper choose-path-wrapper">
                                <p class="event-text">Where do you begin your search?</p>
                                <div class="option-wrapper">
                                    <button id="ferns" class="interaction-button">Push through the dense ferns and hanging air roots to the right. It’s dark, but you feel something watching you from the leaves.</button>
                                    <button id= "lilyPads" class="interaction-button">Step onto the giant lily pads. They look like floating plates, sturdy enough to hold your weight, shimmering under the glass roof.</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>  
            `;

            const ferns: HTMLButtonElement | null = document.querySelector('#ferns');
            const lilyPads: HTMLButtonElement | null = document.querySelector('#lilyPads');

            ferns?.addEventListener('click', () => {
                startGame('A');
                console.log('option A');
            });

            lilyPads?.addEventListener('click', () => {
                startGame('B');
                console.log('option B');
            });
        });
    }

    function startGame(choice: 'A' | 'B') {
        currentPath = choice;

        if (choice === 'A') {
            riddleGame();
        } else {
            orderGrowthPuzzle();
        }
    }

    function riddleGame() {
        if (!sceneWrapper) return;

        sceneWrapper.innerHTML = `  
        <section class= "room room-2">
            <div class="room-frame">
                <div class="game-session-wrapper">
                    <h2 class="room-title-text">The Brass Plaque</h2>

                    <div class="game-wrapper riddle-game-wrapper">
                        <p class="event-text">"I am the mirror that never breaks, I cradle the giant but have no arms. What am I?"</p>
                        <div class="riddle-game-btns">
                            <button id= "roof" class="answer-btn interaction-button" data-correct="false">The Glass Roof</button>
                            <button id= "surface" class="answer-btn interaction-button" data-correct="true">The Water's Surface</button>
                            <button id= "shadows" class="answer-btn interaction-button" data-correct="false">The Deep Shadows</button>
                        </div>
                        <p class="event-text game-message hidden"></p>
                    </div>
                </div>
            </div>
         </section>  
        `;

        const answerBtns = sceneWrapper.querySelectorAll('.answer-btn');
        const message: HTMLParagraphElement | null = sceneWrapper.querySelector('.game-message');

        answerBtns.forEach(btn => {
            btn.addEventListener('click', () => {

                if (btn.id === 'surface') {
                    collectedCodes.push('11');
                    winGame('11', 'Your sharp mind saw through the mystery of the brass plaque.');
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

    type GameObject = 'flower' | 'lilyLeaf' | 'hangingFern' | 'sign' | 'ceiling' | 'redPlant';

    const correctOrder: GameObject[] = ['flower', 'lilyLeaf', 'ceiling'];
    let playerChoice: GameObject[] = [];

    function checkPlayerChoice(clickedObject: GameObject, message: HTMLParagraphElement | null) {

        const nextCorrrectObject = correctOrder[playerChoice.length];

        if (clickedObject === nextCorrrectObject) {
            playerChoice.push(clickedObject);

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
                    winGame('24', 'The numbers emerged from the leaves as you followed the path of growth.');
                }
            }
        }

        else {
            playerChoice = [];

            if (message) {
                message.classList.remove('hidden');

                if (clickedObject === 'hangingFern') {
                    message.textContent = 'The ferns rustle, but they are merely part of the curtain.';
                } else if (clickedObject === 'redPlant') {
                    message.textContent = 'The red leaves reach high, but they are not the final boundary.';
                } else if (clickedObject === 'sign') {
                    message.textContent = 'The faded sign offers no guidance. The cycle is broken.';
                } else {
                    message.textContent = 'The cycle of growth has been broken—start again from the roots.';
                }

                setTimeout(() => {
                    message.classList.add('hidden');
                }, 2000);
            }
        }
    }

    function orderGrowthPuzzle() {

        if (!sceneWrapper) return;

        sceneWrapper.innerHTML = `
        <section class= "room room-2">
            <div class="room-frame">
                <div class="game-session-wrapper">
                    <h2 class="room-title-text">The Watcher of Victoria House</h2>

                    <div class="game-wrapper puzzle-game-wrapper">
                    <p class="event-text">The giant lily pads feel surprisingly firm beneath your feet. From here, you see the life of the greenhouse rising toward the sun.
                    Follow the path of growth — from the roots to the sky — to unlock the first secret.</p>
                    <button id="startPuzzleBtn" class="interaction-button startPuzzleBtn">Begin</button>
                </div>
            </div>
        </section>  
    `;
        const startPuzzleBtn = document.querySelector('#startPuzzleBtn');
        startPuzzleBtn?.addEventListener('click', () => {

            sceneWrapper.innerHTML = `
            <section class= "room room-2">
                <div class="room-frame">
                    <div class="game-session-wrapper puzzle-overlay-wrapper">
                        <button id="flower" class="orderGameBtn invisible-btn" aria-label="Pink Flower"></button>
                        <button id="hangingFern" class="orderGameBtn invisible-btn" aria-label="Hanging Fern"></button>
                        <button id="lilyLeaf" class="orderGameBtn invisible-btn" aria-label="Giant Lily"></button>
                        <button id="sign" class="orderGameBtn invisible-btn" aria-label="Info sign"></button>
                        <button id="ceiling" class="orderGameBtn invisible-btn" aria-label="Glass ceiling"></button>
                        <button id="redPlant" class="orderGameBtn invisible-btn" aria-label="Red Plant"></button>
                        <p class="event-text game-message hidden"></p>
                    </div>
                </div>
            </section>            
            `;

            const message: HTMLParagraphElement | null = document.querySelector('.game-message');
            const gameBtns = sceneWrapper.querySelectorAll('.orderGameBtn');

            gameBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.id as GameObject;

                    checkPlayerChoice(id, message);
                });
            });
        });
    }

    function progressToNextStep() {
        if (!sceneWrapper) return;


        if (collectedCodes.length === 1) {
            if (currentPath === 'A') {
                orderGrowthPuzzle();

            } else {
                numberGuessGame();
            }
        }

        else if (collectedCodes.length === 2) {
            if (currentPath === 'A') {
                numberGuessGame();
            } else {
                riddleGame();
            }
        }
        else if (collectedCodes.length === 3) {
            showFinalExit();
        }
    }

    function numberGuessGame() {
        if (!sceneWrapper) return;

        sceneWrapper.innerHTML = `
        <section class= "room room-2">
            <div class="room-frame">
                <div class="game-session-wrapper">
                    <h2 class="room-title-text">The Foggy Window</h2>

                    <div class="game-wrapper number-guess-wrapper">
                        <p class="event-text">The glass is fogged up. Adjust the humidity (1-20) to see the code.</p>
                        <input type="number" id="guessInput" min="1" max="20">
                        <button id="guessBtn" class="interaction-button">Adjust</button>
                        <p class="event-text game-message hidden"></p>  
                    </div>

                </div>
            </div>
        </section>
        `;

        const guessBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#guessBtn');
        const guessInput: HTMLInputElement | null = sceneWrapper.querySelector('#guessInput');
        const message: HTMLParagraphElement | null = sceneWrapper.querySelector('.game-message');

        guessBtn?.addEventListener('click', () => {
            if (!sceneWrapper) return;

            const inputValue = Number(guessInput?.value);

            if (inputValue === 12) {
                collectedCodes.push('55');
                winGame('55', 'The fog clears!');

            } else if (inputValue < 12) {
                if (message) {
                    message.classList.remove('hidden');
                    message.textContent = 'Too dry. Increase the humidity.';
                }

            } else if (inputValue > 12) {
                if (message) {
                    message.classList.remove('hidden');
                    message.textContent = 'Too damp. The glass is dripping!';
                }
            }

            setTimeout(() => {
                message?.classList.add('hidden');
            }, 2000);
        });
    }

    function showFinalExit() {
        const correctExitCode = ['55', '11', '24'];
        let attempts = 0;

        if (!sceneWrapper) return;

        sceneWrapper.innerHTML = `
        <section class= "room room-2">
            <div class="room-frame">
                <div class="game-session-wrapper">
                    <h2 class="room-title-text">The Final Exit</h2>

                    <div class="game-wrapper final-exit-wrapper">
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
               </div>
            </div>
        </section>
        `;

        const input0: HTMLInputElement | null = sceneWrapper.querySelector('#input0');
        const input1: HTMLInputElement | null = sceneWrapper.querySelector('#input1');
        const input2: HTMLInputElement | null = sceneWrapper.querySelector('#input2');

        const unlockBtn = sceneWrapper.querySelector('#unlockBtn');
        const message = sceneWrapper.querySelector('.game-message');

        unlockBtn?.addEventListener('click', () => {
            attempts = attempts + 1;

            if (input0?.value === correctExitCode[0] && input1?.value === correctExitCode[1] && input2?.value === correctExitCode[2]) {

                sceneWrapper.innerHTML = `
                <section class= "room room-2">
                    <div class="room-frame">
                        <div class="game-session-wrapper">
                            <h2 class="room-title-text">The Final Exit</h2>

                            <div class="game-wrapper artefact-wrapper">
                                <p class="event-text">The lock clicks open. The cool air rushes in as the doors of Victoria House swing wide. You have escaped!</p>

                                <p class="event-text artifact-discovery">
                                As the heavy doors creak open, a small, intricate object falls from the lock mechanism. 
                                It is <strong>The Watcher's Key</strong>. You pick it up and feel its cold metal before tucking it away.
                                </p>

                                <button id="nextRoomBtn" class="interaction-button">Continue to next room</button>
                            </div>
                        </div>
                    </div>
                </section>            
                `;

                const nextRoomBtn = document.querySelector('#nextRoomBtn');
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

    function winGame(code: string, specificText: string) {

        if (!sceneWrapper) return;

        sceneWrapper.innerHTML = `
        <section class= "room room-2">
            <div class="room-frame">
                <div class="game-session-wrapper">

                    <div class="game-wrapper win-game-wrapper">
                        <p class="event-text win-game-text"><i>${specificText}</i>
                        Fragment found: <strong>${code}</strong></p>
                    
                        <button id="continueBtn" class="interaction-button continue-btn">Continue</button>
                    </div>
                </div> 
            </div> 
        </section>       
            `;

        const continueBtn = sceneWrapper?.querySelector('#continueBtn');

        continueBtn?.addEventListener('click', () => {
            progressToNextStep();
        });
    }

    showStart();
}
