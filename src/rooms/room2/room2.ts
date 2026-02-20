import './room2.scss';

export function renderRoom2Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-2">
      <h1>Room 2</h1>
    </section>
  `;
}