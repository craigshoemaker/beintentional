import { writable } from 'svelte/store';

let scope = writable('daily');
let scopes = writable(['daily', 'weekly', 'monthly', 'yearly']);

function changeScope(newScope) {
  scope.set(newScope);
}

export const uiStore = { scope, scopes, changeScope };
