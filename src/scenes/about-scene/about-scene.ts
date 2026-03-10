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
        'Strange Woods is a digital escape room experience set in a mysterious woodland filled with secrets and wonders. Legend has it that those who enter may never return — but brave souls who dare to venture in may discover incredible things. The game consists of 6 interconnected rooms. The first five each conceal hidden artifacts, and collecting them is the key to unlocking and conquering the *Final Room* and claiming your escape.';
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
    devText.innerHTML =
        'Created by: <a href="https://github.com/MidnattLantern" target="_blank">Alma Isaksson</a>, <a href="https://github.com/aldacat-fed" target="_blank">Alda Catovic</a>, <a href="https://github.com/isabelletherese" target="_blank">Isabelle Reynolds</a>, <a href="https://github.com/Prxjec-t" target="_blank">Kimi Leminaho</a>, <a href="https://github.com/Linboe" target="_blank">Linn Boekhout</a> and <a href="https://github.com/RasmusFranssonHub" target="_blank">Rasmus Andreas Fransson</a>';

    const photoCredits = document.createElement('p');
    photoCredits.classList.add('credits-font');
    photoCredits.innerHTML = `<em>Images: 
        <a href="" target="_blank">Background by [photographer name]</a>, 
        <a href="" target="_blank">Background room1 by [photographer name]</a>,
        <a href="" target="_blank">Background room2 by [photographer name]</a>,
        <a href="" target="_blank">Background room3 by [photographer name]</a>,
        <a href="" target="_blank">Background room4 by [photographer name]</a>,
        <a href="" target="_blank">Background room5 by [photographer name]</a>,
        <a href="" target="_blank">Background room6 by [photographer name]</a>,
        <a href="" target="_blank">Amethyst by [photographer name]</a>, 
        <a href="" target="_blank">Feather by [photographer name]</a>,
        <a href="" target="_blank">Fish-statue by [photographer name]</a>,
        <a href="" target="_blank">Key by [photographer name]</a>,
        <a href="" target="_blank">Ladder by [photographer name]</a>,
        <a href="" target="_blank">Rubber-duck by [photographer name]</a>,
        <a href="" target="_blank">Walking-pot by [photographer name]</a>,
           <a href="" target="_blank">Dragon by [photographer name]</a>, 
        <a href="" target="_blank">Red Dragon by [photographer name]</a>,
        <a href="" target="_blank">Tiger by [photographer name]</a>,
        <a href="" target="_blank">Deer by [photographer name]</a>,
        <a href="" target="_blank">Roedeer by [photographer name]</a>,
        <a href="" target="_blank">Fox by [photographer name]</a>,
        <a href="" target="_blank">Horse by [photographer name]</a>,
        <a href="" target="_blank">Fairys by [photographer name]</a>,
        <a href="" target="_blank">Celestial night sky by [photographer name]</a>,
</em>`; //TODO: Lägg till mer info om bilderna, t.ex. länkar eller specifika användare, fråga gruppen

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
