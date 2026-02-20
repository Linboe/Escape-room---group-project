import './room6.scss';

export function renderRoom6Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-6">
      <h1>Room 6</h1>
    </section>
  `;
}