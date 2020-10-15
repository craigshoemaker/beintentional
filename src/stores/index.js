import { uiStore } from "./uiStore.js";
import { questionsStore } from "./questionsStore.js";
import { tasksStore } from "./tasksStore.js";
import getRandomNumber from "../utils/getRandomNumber";
import { derived } from "svelte/store";

const converter = new showdown.Converter();
const { questions } = questionsStore;
const { scope } = uiStore;
const { tasks } = tasksStore;

function getFiltered(q, s) {
  const questions = q.filter((q) => q.categories.includes(s));
  const max = { length: 3 };
  const indexes = Array.from(max, () => getRandomNumber(0, questions.length));
  return questions.filter((q, index) => indexes.includes(index));
}

function getTasks(t, s) {
  const markdown = t[s];
  let html = converter.makeHtml(markdown);
  if (html && html.length) {
    html = html.replace(/<li>(.*)?<\/li>/g, (match, group) => {
      const id = getRandomNumber(1, 10000);
      return `
        <li>
          <input id="${id}" type="checkbox" class="inline-block mr-2">
          <label for="${id}" class="cursor-pointer">${group}</label>
        </li>`;
    });
  }
  return html;
}

const scopedTasks = derived([tasks, scope], ([$t, $s]) => getTasks($t, $s));

const filteredQuestions = derived([questions, scope], ([$q, $s]) =>
  getFiltered($q, $s)
);

export const stores = {
  ...uiStore,
  // ...questionsStore,
  // ...tasksStore,
  filteredQuestions,
  tasks: scopedTasks,
};
