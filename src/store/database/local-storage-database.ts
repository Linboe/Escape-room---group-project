// This folder is a part of architectual scaffolding. The structure of localstorage is not yet decided
// This is the directory where you fetch, read, json.strinfigy between localstorage and javascript states
import { getMySessionStringState } from '../session/session-memory';

// part of scaffolding, to check that everything is wired
export function saveMyStringState() {
  localStorage.setItem('my-string-state', getMySessionStringState());
  console.log('check your browser\'s localstorage');
}