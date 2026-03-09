import { state } from '../../state/gamestate';
import { render } from '../../main';
import './about-scene.scss';

console.log('connected about scene');

const sceneWrapper = document.getElementById(
    'sceneWrapper',
) as HTMLDivElement | null;

export function renderAboutScene() {
    if (!sceneWrapper) {
        console.error('sceneWrapper element not found');
        return;
    }
    sceneWrapper.innerHTML = ''; // reset

    // Container
    const aboutContainer = document.createElement('div');
    aboutContainer.classList.add('about-container');

    // Title
    const title = document.createElement('h2');
    title.textContent = 'About Strange Woods';
    aboutContainer.append(title);

    // Story
    const storySection = document.createElement('section');
    const storyTitle = document.createElement('h3');
    storyTitle.textContent = 'The Story';

    const storyText = document.createElement('p');
    storyText.textContent =
        'Strange Woods is a digital escape room experience set in a mysterious woodland filled with secrets and wonders. Legend has it that those who enter may never return — but brave souls who dare to venture in may discover incredible things. The game consists of 6 interconnected rooms. The first five each conceal hidden artifacts, and collecting them is the key to unlocking and conquering the *Final Room* and claiming your escape. However, not all artifacts are what they seem, one is an impostor. Using it in the Final Room will make it unsolvable, so choose wisely. If you find yourself stuck, you may need to retrace your steps and hunt down the correct artifact before time runs out.';
    storySection.append(storyTitle, storyText); //TODO: Lägg till mer story senare

    // How to play
    const instrSection = document.createElement('section');
    const instrTitle = document.createElement('h3');
    instrTitle.textContent = 'How to Play';
    const instrList = document.createElement('ul');

    const instructions = [
        'Keep an eye on the timer - you have a 50-minute total timer to escape the forest. Every second counts.',
        'Each room has its own individual timer, solve the room before time runs out. If you fail, you must replay it and the lost time is deducted from your total.',
        'Collect the artifacts hidden in each of the first five rooms. The artifacts are required to complete the Final Room.',
        'Complete the game fast enough and you may earn a place on the Top 10 Highscore — and share your results with the world.',
        'Log in with a username to start the game.',
        'If you leave the game, your progress and remaining time are automatically saved so you can pick up exactly where you left off.',
        'To start over or play under a different username, simply log out and start a new game.',
        'A hidden feature exists to clear the highscore list.',
    ];

    instructions.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        instrList.append(li);
    });

    instrSection.append(instrTitle, instrList);

    // Credits (gruppmedlemmar & bilder)
    const creditSection = document.createElement('section');
    const creditTitle = document.createElement('h3');
    creditTitle.classList.add('credits-font');
    creditTitle.textContent = 'Credits';

    const devText = document.createElement('p');
    devText.classList.add('credits-font');
    devText.textContent =
        'Created by: Alma Isaksson, Alda Catovic, Isabelle Reynolds , Kimi Leminaho, Linn Boekhout and Rasmus Andreas Fransson';

    const photoCredits = document.createElement('p');
    photoCredits.classList.add('credits-font');
    photoCredits.innerHTML = '<em>Images: Sources will be added.</em>'; //TODO: Lägg till mer info om bilderna, t.ex. länkar eller specifika användare, fråga gruppen

    creditSection.append(creditTitle, devText, photoCredits);

    // Back button
    const backBtn = document.createElement('button');
    backBtn.id = 'backToMenuBtn';
    backBtn.textContent = 'Back to main menu';
    backBtn.addEventListener('click', () => {
        console.log('Back to main menu clicked');
        state.screen = 'menu';
        render();
    });

    // Lägg till alla sektioner i containern och sedan i wrapper
    aboutContainer.append(storySection, instrSection, creditSection, backBtn);
    sceneWrapper.append(aboutContainer);
}
