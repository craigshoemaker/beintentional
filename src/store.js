import { derived, writable } from 'svelte/store';
import { getRandomNumber, storageKeys } from './core';
import { data } from './data';

let scope = writable('daily');
let scopes = writable(data.scopes);

let tasksState = {};
if (!localStorage[storageKeys.TASKS]) {
  tasksState = data.tasks;
} else {
  tasksState = JSON.parse(localStorage[storageKeys.TASKS]);
}

const converter = new showdown.Converter();
const questions = writable(data.questions);
const tasks = writable(tasksState);
const getTimeString = () => new Date().toTimeString();
const questionsRefresh = writable(getTimeString());

function changeScope(newScope) {
  scope.set(newScope);
}

function getQuestions(questions, scope) {
  const questionsByCategory = questions.filter((question) =>
    question.categories.includes(scope),
  );
  const size = { length: 3 };
  const indexes = Array.from(size, () =>
    getRandomNumber(0, questionsByCategory.length),
  );
  return questionsByCategory.filter((question, index) =>
    indexes.includes(index),
  );
}

function updateQuestions() {
  questionsRefresh.set(getTimeString());
}

function getTasks(originalTasks, currentScope) {
  let value = {};
  value.markdown = originalTasks[currentScope].replace(/^\s+|\s+$/gm, '');
  const liRegEx = /<li>(.*)?<\/li>/g;
  let html = converter.makeHtml(value.markdown);
  if (html && html.length) {
    html = html.replace(liRegEx, (match, group) => {
      const id = getRandomNumber(1, 10000);
      return `
        <li>
          <input id="${id}" type="checkbox" class="inline-block mr-2">
          <label for="${id}" class="cursor-pointer">${group}</label>
        </li>`;
    });
  }
  value.html = html;
  return value;
}

function updateTasks(currentScope, markdown) {
  tasks.update((state) => {
    state[currentScope] = markdown;
    localStorage[storageKeys.TASKS] = JSON.stringify(state);
    return state;
  });
}

const _tasks = derived([tasks, scope], ([$tasks, $scope]) =>
  getTasks($tasks, $scope),
);

const _questions = derived(
  [questions, scope, questionsRefresh],
  ([$questions, $scope, $refresh]) =>
    getQuestions($questions, $scope /* , $refresh */),
);

export const store = {
  questions: _questions,
  scope,
  scopes,
  tasks: _tasks,
  updateQuestions,
  changeScope,
  updateTasks,
};
