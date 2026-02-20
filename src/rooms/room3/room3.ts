import './room3.scss';

export function renderRoom3Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-3">
      <h1>Room 3</h1>
    </section>
  `;
}