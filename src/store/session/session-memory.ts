// This folder is a part of architectual scaffolding. The structure of a session memory is not yet decided
// This is the directory where you store JavaScript logic states

// all varibles are part of scaffolding architecture, to check that everything is wired
let mySessionStringState: string = 'Hello world'; // export 
let mySessionBooleanState: boolean = false;

export function changeMySessionStringState(newString: string) {
    mySessionStringState = newString;
}
export function logMySessionStringState() {
    console.log(`My session string is "${mySessionStringState}"`);
}
export function getMySessionStringState(): string { // making a variable accessible across other TS files
    return mySessionStringState;
}
export function toggleMySessionBooleanState() {
    mySessionBooleanState = !mySessionBooleanState;
}
export function logSessionBooleanState() {
    console.log(`My session boolean is: ${mySessionBooleanState}`);
}
export function getMySessionBooleanState(): boolean {
    return mySessionBooleanState;
}

// early suggestion (example)
// @ts-ignore
let sessionMemory = [ // eslint-disable-line
    {
        name: 'vera',
        sessionTimer: 13290,
        room1: {
            isUnlocked: true,
            foundEscape: false,
            roomTimer: 198420,
            artifact1: {
                relevant: true,
                found: false
            },
            artifact2: {
                relevant: false,
                found: false
            },
            artifact3: {
                relevant: false,
                found: true
            }
        },
        room2: {
            isUnlocked: true,
            foundEscape: false,
            roomTimer: 198420,
            artifact1: {
                relevant: true,
                found: false
            },
            artifact2: {
                relevant: false,
                found: false
            },
            artifact3: {
                relevant: false,
                found: true
            }
        }
    // repeat for all 6 rooms
    }
];