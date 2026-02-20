import './room1.scss';

export function renderRoom1Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-1">
      <h1>Room 1</h1>
    </section>
  `;
}