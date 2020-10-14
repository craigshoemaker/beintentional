import { uiStore } from './uiStore.js';
import { questionsStore } from './questionsStore.js';
import { tasksStore } from './tasksStore.js';
import getRandomNumber from '../utils/getRandomNumber';
import { derived } from 'svelte/store';

const { questions } = questionsStore;
const { scope } = uiStore;

function getFiltered(q, s) {
  let temp = q.filter((q) => q.categories.includes(s));
  const max = { length: 3 };
  const indexes = Array.from(max, () => getRandomNumber(0, temp.length));
  return temp.filter((q, index) => indexes.includes(index));
}

const filteredQuestions = derived([questions, scope], ([$q, $s]) => getFiltered($q, $s));

export const stores = {
  ...uiStore,
  ...questionsStore,
  ...tasksStore,
  filteredQuestions,
};
