export type Screen = 'login' | 'menu' | 'room' | 'savedgame' | 'settings' | 'about' | 'victory' | 'gameover';

export type GameState = {
    screen: Screen;
    username: string;
    step: number;
    currentRoom: number;
    message: string;
    totalTime: number;
    roomTime: number;
};

export let state: GameState = {
    screen: 'login',
    username: '',
    step: 1,
    currentRoom: 0,
    message: '',
    totalTime: 0,
    roomTime: 0
};

export function getState() {
    return state;
}

// ======
// Timers
// ======
let gameSessionElapsedTime: number = 0; // Seconds counting upwards

export function getGameSessionElapsedTime() {
    return gameSessionElapsedTime;
}

// hourglass hold seconds
let roomStates = [
    {
        label: 'Room 1',
        marker: 'room-1',
        isUnlocked: true,
        hourglass: 500
    },
    {
        label: 'Room 2',
        marker: 'room-2',
        isUnlocked: false,
        hourglass: 400
    },
    {
        label: 'Room 3',
        marker: 'room-3',
        isUnlocked: false,
        hourglass: 500
    },
    {
        label: 'The silent tide',
        marker: 'room-4',
        isUnlocked: false,
        hourglass: 500
    },
    {
        label: 'Room 5',
        marker: 'room-5',
        isUnlocked: false,
        hourglass: 500
    },
    {
        label: 'Room 6',
        marker: 'room-6',
        isUnlocked: false,
        hourglass: 500
    }
];

export function getRoomStates() {
    return roomStates;
}

export function setHourglass(targetIndex:number, newValue: number) {
    roomStates[targetIndex].hourglass = newValue;
}
// ======
