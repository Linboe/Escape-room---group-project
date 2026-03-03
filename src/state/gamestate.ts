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

export function getGameState() {
    return state;
}

// ======
// Timers
// ======
let gameSessionElapsedTime: number = 0; // Seconds counting upwards

export function getGameSessionElapsedTime() {
    return gameSessionElapsedTime;
}

let roomStates = [
    {
        //isUnlocked: true,
        hourglass: 400
    },
    {
        hourglass: 400
    },
    {
        hourglass: 400
    },
    {
        hourglass: 400
    },
    {
        hourglass: 400
    },
    {
        hourglass: 400
    }
];

export function getRoomStates() {
    return roomStates;
}

export function setHourglass(targetIndex:number, newValue: number) {
    roomStates[targetIndex].hourglass = newValue;
}
// ======
