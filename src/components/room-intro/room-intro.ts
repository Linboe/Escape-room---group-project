import './room-intro.scss';
import data from '../../data/data.json';

export function showRoomIntro(
    roomNumber: number,
    pauseTimer: () => void,
    resumeTimer: () => void,
    onEnter: () => void
): void {
    const intro = data.roomIntros.find((r) => r.room === roomNumber);
    if (!intro) {
        onEnter();
        return;
    }

    pauseTimer();

    const overlay = document.createElement('div');
    overlay.classList.add('room-intro-overlay');

    overlay.innerHTML = `
        <div class="room-intro-card">
            <h2 class="room-intro-title">${intro.name}</h2>
            <p class="room-intro-description">${intro.description}</p>
            <button class="room-intro-btn">Enter</button>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('.room-intro-btn')!.addEventListener('click', () => {
        overlay.remove();
        resumeTimer();
        onEnter();
    });
}