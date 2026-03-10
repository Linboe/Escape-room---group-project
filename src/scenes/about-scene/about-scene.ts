import { state } from '../../state/gamestate';
import { render } from '../../main';
import './about-scene.scss';

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

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
        'Strange Woods is a mysterious forest filled with secrets and wonders. It is said that those who enter may never return, but some brave souls have ventured in and discovered incredible things.';
    storySection.append(storyTitle, storyText); //TODO: Lägg till mer story senare

    // How to play
    const instrSection = document.createElement('section');
    const instrTitle = document.createElement('h3');
    instrTitle.textContent = 'How to Play';
    const instrList = document.createElement('ul');

    const instructions = [
        'Keep an eye on the timer - you have limited time to escape the forest (60 minutes).',
        'Solve rooms to collect artifacts.',
        'All artifacts are needed to complete the final room.'  //TODO: Lägg till fler instruktioner senare
    ];

    instructions.forEach(text => {
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
    devText.textContent = 'Created by: Alma Isaksson, Alda Catovic, Isabelle Reynolds, Kimi Leminaho, Linn Boekhout and Rasmus Andreas Fransson'; 

    const photoCredits = document.createElement('p');
    photoCredits.classList.add('credits-font');
    photoCredits.innerHTML = '<em>Images: Sources will be added.</em>'; //TODO: Lägg till mer info om bilderna, t.ex. länkar eller specifika användare, fråga gruppen

    creditSection.append(creditTitle, devText, photoCredits);

    // Back button
    const backBtn = document.createElement('button');
    backBtn.id = 'backToMenuBtn';
    backBtn.textContent = 'Back to main menu';
    backBtn.addEventListener('click', () => {
        state.screen = 'menu';
        render();
    });

    // Lägg till alla sektioner i containern och sedan i wrapper
    aboutContainer.append(storySection, instrSection, creditSection, backBtn);
    sceneWrapper.append(aboutContainer);
}