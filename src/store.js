import { derived, writable } from 'svelte/store';
import { getRandomNumber, storageKeys } from './core';
import { data } from './data';

const tasksState = localStorage[storageKeys.TASKS]
  ? JSON.parse(localStorage[storageKeys.TASKS])
  : data.tasks;

/**
 * Writable store values can be changed from the outside
 */
const scope = writable('daily');
const scopes = writable(data.scopes);
const tasks = writable(tasksState);

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
const scopedTasks = derived([tasks, scope], ([$tasks, $scope]) =>
  getTasks($tasks, $scope),
);

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

  const questionsCount = {
    daily: 2,
    weekly: 3,
    monthly: 4,
    yearly: 5,
  };

  const size = questionsCount[scope];
  const indexes = [];

  while (indexes.length < size) {
    let index = getRandomNumber(0, questionsByCategory.length);
    if (!indexes.includes(index)) {
      indexes.push(index);
    }
  }

  const currentQuestions = questionsByCategory.filter((question, index) =>
    indexes.includes(index),
  );

  return currentQuestions;
}

function getTasks(currentTasks, currentScope) {
  const extraLinesRegEx = /^\s+|\s+$/gm;
  const liRegEx = /<li>(.*)?<\/li>/g;

  let value = { html: '', markdown: '' };

  // if the tasks nor scope don't match, get out gracefully as possible
  if (currentTasks && currentTasks[currentScope]) {
    value.markdown = currentTasks[currentScope].replace(extraLinesRegEx, '');
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
  tasks: scopedTasks,
  updateQuestions,
  changeScope,
  updateTasks,
};
