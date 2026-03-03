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