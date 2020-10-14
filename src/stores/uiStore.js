import { writable } from "svelte/store";

let scope = writable("daily");

function changeScope(newScope) {
  scope.set(newScope);
}

export const uiStore = { scope, changeScope };
