import { uiStore } from "./uiStore.js";
import { questionsStore } from "./questionsStore.js";
import { tasksStore } from "./tasksStore.js";
import getRandomNumber from "../utils/getRandomNumber";

function getFilteredQuestions() {
  let temp = questionsStore.$questions.filter((q) =>
    q.categories.includes(uiStore.$scope)
  );
  const max = { length: 3 };
  const indexes = Array.from(max, () => getRandomNumber(0, temp.length));
  filtered.set(temp.filter((q, index) => indexes.includes(index)));
}

export const stores = {
  foo: 1,
  getFilteredQuestions,
  ...uiStore,
  ...questionsStore,
  ...tasksStore,
};
