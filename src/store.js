import { derived, writable } from 'svelte/store';
import { getRandomNumber, storageKeys } from './core';
import { data } from './data';

let tasksState = localStorage[storageKeys.TASKS]
  ? JSON.parse(localStorage[storageKeys.TASKS])
  : data.tasks;

/**
 * Writable store values can be changed from the outside
 */
let scope = writable('daily');
let scopes = writable(data.scopes);

const converter = new showdown.Converter();
const getTimeString = () => new Date().toTimeString();
const questionsTimeStamp = writable(getTimeString());

/**
 * Functions to modify the store
 */
function changeScope(newScope) {
  scope.set(newScope);
}

function updateQuestions() {
  questionsTimeStamp.set(getTimeString());
}

function updateTasks(currentScope, markdown) {
  tasks.update((state) => {
    state[currentScope] = markdown;
    localStorage[storageKeys.TASKS] = JSON.stringify(state);
    return state;
  });
}

/**
 * Derived Store values
 */
const tasks = derived([scope], ([$scope]) => getTasks($scope));

const questions = derived([scope, questionsTimeStamp], ([$scope, $timeStamp]) =>
  getQuestions($scope /* , $timeStamp */),
);

/**
 * Internal store functions
 */
function getQuestions(scope) {
  const questionsByCategory = data.questions.filter((question) =>
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

function getTasks(currentScope) {
  const whitespaceRegEx = /^\s+|\s+$/gm;
  const liRegEx = /<li>(.*)?<\/li>/g;

  let value = { html: '', markdown: '' };

  // if the tasks nor scope don't match, get out gracefully as possible
  if (tasksState && tasksState[currentScope]) {
    value.markdown = tasksState[currentScope].replace(whitespaceRegEx, '');
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

/**
 * Reveal and export the store
 */
export const store = {
  questions,
  scope,
  scopes,
  tasks,
  updateQuestions,
  changeScope,
  updateTasks,
};
