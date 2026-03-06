import type { Artifact } from '../components/artifacts/artifactSystem';

export type Screen = 'login' | 'menu' | 'room' | 'savedgame' | 'settings' | 'about' | 'victory' | 'gameover';

export type GameState = {
    screen: Screen;
    username: string;
    step: number;
    currentRoom: number;
    message: string;
    codes: string[][];
    completed: boolean[];
    artifacts: Artifact[];
    questionIndex: number;
    isReturningPlayer: boolean;
};

export let state: GameState = {
    screen: 'login',
    username: '',
    step: 1,
    currentRoom: 0,
    message: '',
    codes: [],
    completed: [],
    artifacts: [],
    questionIndex: 0,
    isReturningPlayer: false
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
        roomTime: 400// TODO: make it possible to fetch room time from localstorage
    },
    {
        roomTime: 400
    },
    {
        roomTime: 400
    },
    {
        roomTime: 400
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

export function setRoomTime(targetIndex: number, newValue: number) {
    if (roomStates[targetIndex]) {
        roomStates[targetIndex].roomTime = newValue;
    }
}
// ======
