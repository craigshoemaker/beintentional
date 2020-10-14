import { uiStore } from './uiStore.js';
import { questionsStore } from './questionsStore.js';
import { tasksStore } from './tasksStore.js';
import getRandomNumber from '../utils/getRandomNumber';
import { writable, derived } from 'svelte/store';

// let filtered = writable([]);

// $: {
//   let temp = questionsStore.questions.filter((q) => q.categories.includes(uiStore.scope));
//   const max = { length: 3 };
//   const indexes = Array.from(max, () => getRandomNumber(0, temp.length));
//   filtered.set(temp.filter((q, index) => indexes.includes(index)));
// }

const { questions } = questionsStore;
const { scope } = uiStore;

function getFiltered(q, s) {
  let temp = q.filter((q) => q.categories.includes(s));
  const max = { length: 3 };
  const indexes = Array.from(max, () => getRandomNumber(0, temp.length));
  return temp.filter((q, index) => indexes.includes(index));
}

const filtered = derived([questions, scope], ([$q, $s]) => getFiltered($q, $s));

export const stores = {
  ...uiStore,
  ...questionsStore,
  ...tasksStore,
  filtered,
};
