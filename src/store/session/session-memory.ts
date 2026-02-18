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
let sessionMemory = [
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
    },
    room3: {
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
    room4: {
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
    room5: {
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
    room6: {
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
  }
];

// GET
let currentRoom: number = 0; //0-5
let progress: number = 0; //0-6
let isGameCompleted: boolean = false;

export function getCurrentRoom(): number {
  return currentRoom;
}

export function getProgress(): number {
  return progress;
}

export function getIsGameCompleted(): boolean {
  return isGameCompleted;
}

// SET
export function setCurrentRoom(room: number) {
  currentRoom = room;
}

export function setProgress(value: number) {
  progress = value;
}

export function setGameCompleted(value: boolean) {
  isGameCompleted = value;
}

// GAME LOGIC
export function completeRoom() {
  if (isGameCompleted) return;

  progress++;

  if (progress >= 6) {
    progress = 6;
    isGameCompleted = true;
    console.log('Congratulations! You have completed the game!');
  } else {
    currentRoom++;
    console.log(`You have completed room ${currentRoom}. Progress:${progress}/6`);
  }
}

// RESET
export function resetSessionMemory () {
  currentRoom = 0;
  progress = 0;
  isGameCompleted = false;
}