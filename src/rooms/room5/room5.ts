import './room5.scss';

export function renderRoom5Scene() {
    const sceneWrapper = document.getElementById('sceneWrapper');
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <h1>Room 5</h1>
    </section>
  `;
}