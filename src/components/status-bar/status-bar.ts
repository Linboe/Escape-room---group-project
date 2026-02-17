import "./status-bar.scss";

const statusBarWrapper = document.getElementById(
  "statusBarWrapper",
) as HTMLDivElement;

export function renderStatusBar() {
  if (!statusBarWrapper) return;
  statusBarWrapper.innerHTML = ``; // reset

  // innerHTML method
  //   statusBarWrapper.innerHTML = `<p class="status-bar"><span>Status bar</span><span>i.e timer</span><span>i.e rooms</span></p>`;

  // Imperative DOM building method
  // parent
  const pWrapperElement = document.createElement("p");
  pWrapperElement.classList.add("status-bar");

  // children
  const spanStatusBarElement = document.createElement("span");
  spanStatusBarElement.textContent = "Status Bar";

  const spanTimerElement = document.createElement("span");
  spanTimerElement.textContent = "i.e timer";

  const spanCountUpElement = document.createElement("span");
  spanCountUpElement.textContent = "Elapsed: 0:00";

  function startCountUp() {
    let secondsElapsed = 0; // Seconds counting upwards
    const targetSeconds = 90 * 60; // Counts up to 90 minutes

    const interval = setInterval(() => {
      secondsElapsed++;

      const minutes = Math.floor(secondsElapsed / 60);
      const seconds = secondsElapsed % 60;
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      spanCountUpElement.textContent = `Elapsed Time: ${formattedTime}`;

      if (secondsElapsed >= targetSeconds) {
        clearInterval(interval);
        spanCountUpElement.textContent = "90 Minutes Reached!";
      }
    }, 1000);
  }

  startCountUp();

  function startCountdown(roomTime: number) {
    let time = roomTime;

    const interval = setInterval(() => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      spanTimerElement.textContent = "Room Time Left: " + formattedTime;

      if (--time < 0) {
        clearInterval(interval);
        spanTimerElement.textContent = "Time's up!";
      }
    }, 1000);
  }

  startCountdown(900);

  const spanRoomsElement = document.createElement("span");
  // spanRoomsElement.textContent = "i.e rooms";

  let currentRoom = "The Forest";

  const roomName = currentRoom;
  spanRoomsElement.textContent = `You are in: ${roomName}`;

  // compile
  pWrapperElement.append(
    spanStatusBarElement,
    spanTimerElement,
    spanCountUpElement,
    spanRoomsElement,
  );
  statusBarWrapper.append(pWrapperElement);
}
