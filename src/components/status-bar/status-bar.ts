import './status-bar.scss'

const statusBarWrapper = document.getElementById('statusBarWrapper') as HTMLDivElement;

export function renderStatusBar() {
    if (!statusBarWrapper) return;
    statusBarWrapper.innerHTML = ``; // reset
    
    // innerHTML method
//    statusBarWrapper.innerHTML = `<p class="status-bar"><span>Status bar</span><span>i.e timer</span><span>i.e rooms</span></p>`

    // Imperative DOM building method
    // parent
    const pWrapperElement = document.createElement('p');
    pWrapperElement.classList.add('status-bar');

    // children
    const spanStatusBarElement = document.createElement('span');
    spanStatusBarElement.textContent = 'Status Bar';

    const spanTimerElement = document.createElement('span');
    spanTimerElement.textContent = 'i.e timer';

    const spanRoomsElement = document.createElement('span');
    spanRoomsElement.textContent = 'i.e rooms';

    // compile
    pWrapperElement.append(spanStatusBarElement, spanTimerElement, spanRoomsElement);
    statusBarWrapper.append(pWrapperElement);
}