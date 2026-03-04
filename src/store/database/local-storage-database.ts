// This folder is a part of architectual scaffolding. The structure of localstorage is not yet decided
// This is the directory where you fetch, read, json.strinfigy between localstorage and javascript states
import {
    getMySessionStringState,
    getCurrentRoom,
    setCurrentRoom,
    getProgress,
    setProgress,
    getIsGameCompleted,
    setGameCompleted,
} from '../session/session-memory';


// part of scaffolding, to check that everything is wired
export function saveMyStringState() {
    localStorage.setItem('my-string-state', getMySessionStringState());
    console.log('check your browser\'s localstorage');
}

const STORAGE_KEY = 'escape-room-save';

// SAVE
export function saveGameToLocalStorage() {
    const data = {
        currentRoom: getCurrentRoom(),
        progress: getProgress(),
        isGameCompleted: getIsGameCompleted(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// LOAD
export function loadGameFromLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
        const data = JSON.parse(raw);

        if (data.currentRoom !== undefined) setCurrentRoom(data.currentRoom);
        if (data.progress !== undefined) setProgress(data.progress);
        if (data.isGameCompleted !== undefined) setGameCompleted(data.isGameCompleted);
    } catch (e) {
        console.error('Failed to parse save data from localStorage', e);
    }
}

// RESET
export function clearLocalStorageSave() {
    localStorage.removeItem(STORAGE_KEY);
}
