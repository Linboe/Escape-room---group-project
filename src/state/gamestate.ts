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
    totalTime: 0, // likely unnecessary 
    roomTime: 0 // likely unnecessary 
};

export function getGameState() {
    return state;
}

// ======
// Timers
// ======

let roomStates = [
    {
        //isUnlocked: true,
        roomTime: 400 // TODO: make it possible to fetch room time from localstorage
    },
    {
        roomTime: 400
    },
    {
        roomTime: 400
    },
    {
        roomTime: 570
    },
    {
        roomTime: 400
    },
    {
        roomTime: 400 
    }
];

export function getRoomStates() {
    return roomStates;
}

export function setRoomTime(targetIndex:number, newValue: number) {
    if (roomStates[targetIndex]) {
        roomStates[targetIndex].roomTime = newValue;
    }
}
// ======
