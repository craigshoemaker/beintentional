import { derived, writable } from 'svelte/store';
import { getRandomNumber } from './core';
import { data } from './data';

let scope = writable('daily');
let scopes = writable(data.scopes);

const converter = new showdown.Converter();
const questions = writable(data.questions);
const tasks = writable(data.tasks);
const getTimeString = () => new Date().toTimeString();
const questionsRefresh = writable(getTimeString());

function changeScope(newScope) {
  scope.set(newScope);
}

function getNewQuestions() {
  questionsRefresh.set(getTimeString());
}

function filterQuestions(questions, scope) {
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

function getTasksHTML(originalTasks, currentScope) {
  const markdown = originalTasks[currentScope];
  const liRegEx = /<li>(.*)?<\/li>/g;
  let html = converter.makeHtml(markdown);
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
  return html;
}

const scopedTasks = derived([tasks, scope], ([$tasks, $scope]) =>
  getTasksHTML($tasks, $scope),
);

const filteredQuestions = derived(
  [questions, scope, questionsRefresh],
  ([$questions, $scope, $refresh]) =>
    filterQuestions($questions, $scope /* , $refresh */),
);

export const store = {
  changeScope,
  questions: filteredQuestions,
  scope,
  scopes,
  tasks: scopedTasks,
  getNewQuestions,
};