import './room4.scss';

export function renderRoom4Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-4">
      <h1>Room 4</h1>
    </section>
  `;
}