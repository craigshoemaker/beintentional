import { derived, writable } from 'svelte/store';
import { getRandomNumber, storageKeys } from './core';
import { data } from './data';

let scope = writable('daily');
let scopes = writable(data.scopes);

let tasksState = localStorage[storageKeys.TASKS]
  ? JSON.parse(localStorage[storageKeys.TASKS])
  : data.tasks;

const converter = new showdown.Converter();
const questions = writable(data.questions);
const tasks = writable(tasksState);
const getTimeString = () => new Date().toTimeString();
const questionsTimeStamp = writable(getTimeString());

/**
 * Modify the store
 */
function changeScope(newScope) {
  scope.set(newScope);
}

function updateQuestions() {
  questionsTimeStamp.set(getTimeString());
}

/**
 * Derived Store values
 */

const _tasks = derived([tasks, scope], ([$tasks, $scope]) =>
  getTasks($tasks, $scope),
);

const _questions = derived(
  [questions, scope, questionsTimeStamp],
  ([$questions, $scope, $timeStamp]) =>
    getQuestions($questions, $scope /* , $timeStamp */),
);

function getQuestions(questions, scope) {
  const questionsByCategory = questions.filter((question) =>
    question.categories.includes(scope),
  );
  const size = { length: 2 };
  const indexes = Array.from(size, () =>
    getRandomNumber(0, questionsByCategory.length),
  );
  return questionsByCategory.filter((question, index) =>
    indexes.includes(index),
  );
}

/**
 * Internal store functions
 */
function getTasks(originalTasks, currentScope) {
  const whitespaceRegEx = /^\s+|\s+$/gm;
  const liRegEx = /<li>(.*)?<\/li>/g;

  let value = { html: '', markdown: '' };

  // if the tasks nor scope don't match, get out gracefully as possible
  if (originalTasks && originalTasks[currentScope]) {
    value.markdown = originalTasks[currentScope].replace(whitespaceRegEx, '');
    let html = converter.makeHtml(value.markdown);
    if (html && html.length) {
      html = html.replace(liRegEx, createTaskListItems());
    }
    value.html = html;
  }
  return value;

  function createTaskListItems() {
    return (match, group) => {
      const id = getRandomNumber(1, 10000);
      let value = `
        <li>
          <input id="${id}" type="checkbox" class="inline-block mr-2">
          <label for="${id}" class="cursor-pointer">${group}</label>
        </li>`;
      value = value.replace('<a href=', '<a target="blank" href=');
      return value;
    };
  }
}

function updateTasks(currentScope, markdown) {
  tasks.update((state) => {
    state[currentScope] = markdown;
    localStorage[storageKeys.TASKS] = JSON.stringify(state);
    return state;
  });
}

/**
 * Reveal and export the store
 */
export const store = {
  questions: _questions,
  scope,
  scopes,
  tasks: _tasks,
  updateQuestions,
  changeScope,
  updateTasks,
};
