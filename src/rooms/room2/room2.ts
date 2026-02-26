import './room2.scss';

export function room2(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    let collectedCodes: string[] = [];
    let currentPath: 'A' | 'B' | null = null;

    sceneWrapper.innerHTML = `
     <section class= "room room-2">
        <div class="room-frame">
            <div class="game-session-wrapper">
                <h2>Victoria House</h2>
                <div id="gameScreen" class="game-screen"></div>
            </div>
        </div>
     </section>   
        `;

    const gameScreen: HTMLDivElement | null = document.querySelector('#gameScreen');

    function showStart() {
        if (!gameScreen) return;

        gameScreen.innerHTML = `  
                <p>The air in the Victoria House is thick with humidity and the scent of damp earth. <br>
                Ahead of you, the path vanishes into a wall of green. You know the code out of here is hidden in three fragments.<br>
                Where do you begin your search?</p>

                <p>Option A: Push through the dense ferns and hanging air roots to the right. It’s dark, but you feel something watching you from the leaves.</p>
                <p>Option B: Step onto the giant lily pads. They look like floating plates, sturdy enough to hold your weight, shimmering under the glass roof.</p>
                
                <button id="ferns" >Option A</button>
                <button id= "lilyPads" >Option B</button>
                <p id="message"></p>
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
    }

    function startGame(choice: 'A' | 'B') {
        currentPath === choice;

        if (choice === 'A') {
            riddleGame();
        } else {
            orderGrowthPuzzle();
        }
    }

    function riddleGame() {
        if (!gameScreen) return;

        gameScreen.innerHTML = `  
            <h3>The Brass Plaque</h3>
                <p>"I am the mirror that never breaks, I cradle the giant but have no arms. What am I?"</p>
                <button id= "roof" class="answer-btn" data-correct="false">The Glass Roof</button>
                <button id= "surface" class="answer-btn" data-correct="true">The Water's Surface</button>
                <button id= "shadows" class="answer-btn" data-correct="false">The Deep Shadows</button>
                <p id="message"></p>
            `;


        const answerBtns = gameScreen.querySelectorAll('.answer-btn');
        const message: HTMLParagraphElement | null = gameScreen.querySelector('#message');

        answerBtns.forEach(btn => {
            btn.addEventListener('click', () => {

                if (btn.id === 'surface') {
                    collectedCodes.push('11');
                    winGame('11', 'Your sharp mind saw through the mystery of the brass plaque.');
                    console.log(collectedCodes);
                }

                else {

                    if (message) {
                        if (btn.id === 'roof') {
                            message.textContent = 'You look up at the glass panes, but they remain silent. The glass reflects the sky, but it does not cradle the life within the water.';
                        } else if (btn.id === 'shadows') {
                            message.textContent = 'The shadows grow longer as you speak, but they offer no reflection. Look where the light meets the water.';
                        }
                    }
                }
            });
        });
    }

    type GameObject = 'flower' | 'leaf' | 'unknown1' | 'unknown2' | 'roof' | 'unknown3';

    const correctOrder: GameObject[] = ['flower', 'leaf', 'roof'];
    let playerChoice: GameObject[] = [];

    function checkPlayerChoice(clickedObject: GameObject, message: HTMLParagraphElement | null) {

        const nextCorrrectObject = correctOrder[playerChoice.length];

        if (clickedObject === nextCorrrectObject) {
            playerChoice.push(clickedObject);
            console.log('playerChoice array:', playerChoice);

            if (message) {
                if (playerChoice.length === 1) {
                    message.textContent = 'The plants lean closer...';
                }
                else if (playerChoice.length === 2) {
                    message.textContent = 'The air grows heavy. You are almost there, the hierarchy is nearly complete...';
                }
                else if (playerChoice.length === correctOrder.length) {
                    message.textContent = 'The glass ceiling shimmers. You have mastered the hierarchy of growth!';
                    winGame('24', 'The numbers emerged from the leaves as you followed the path of growth.');
                    collectedCodes.push('24');
                    console.log(collectedCodes);
                }
            }
        }

        else {
            playerChoice = [];
            console.log('fel- börja om', playerChoice);
            if (message) {
                message.textContent = 'The equilibrium of the greenhouse shifts. The plants recoil as if sensing a mistake. The cycle of growth has been broken—you must start again from the roots.';
            }
        }
    }

    function orderGrowthPuzzle() {
        const gameScreen: HTMLDivElement | null = document.querySelector('#gameScreen');

        if (!gameScreen) return;

        gameScreen.innerHTML = `
        <p> The giant lily pads feel surprisingly firm beneath your feet. From here, you see the life of the greenhouse rising toward the sun.<br>
        Follow the path of growth to unlock the first secret.</p>
        <button id="flower" class="orderGameBtn" >The pink flower</button>
        <button id="unknown1" class="orderGameBtn">unknown1</button>
        <button id="leaf" class="orderGameBtn" >The giant Lily</button>
        <button id="unknown2" class="orderGameBtn" >unknown2</button>
        <button id="roof" class="orderGameBtn" >The glass ceiling</button>
        <button id="unknown3" class="orderGameBtn" >unknown3</button>
        <p id="gameMessage"></p>
        `;

        const gameMessage: HTMLParagraphElement | null = document.querySelector('#gameMessage');
        const gameBtns = gameScreen.querySelectorAll('.orderGameBtn');

        gameBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.id as GameObject;

                checkPlayerChoice(id, gameMessage);
            });
        });
    }

    function winGame(code: string, specificText: string) {

        if (gameScreen)

            gameScreen.innerHTML = `
        <div class="fragment-win">
            <p><i>${specificText}</i></p>
            <div class="code-display">Fragment found: <strong>${code}</strong></div>
            <button id="continueBtn">Continue</button>
        </div>
    `;

        const continueBtn = gameScreen?.querySelector('#continueBtn');

        continueBtn?.addEventListener('click', () => {
            next();
        });
    }

    showStart();
}
