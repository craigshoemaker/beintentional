<script>
  import { store } from '../store';
  import { storageKeys } from '../core';
  import Question from './Question.svelte';

  const { questions, updateQuestions } = store;
  const { QUESTIONS_LIST } = storageKeys;

  let show = !localStorage[QUESTIONS_LIST]
    ? {
        textarea: true,
        description: true,
      }
    : JSON.parse(localStorage[QUESTIONS_LIST]);

  const toggleShow = (name) => {
    show[name] = !show[name];
    localStorage[QUESTIONS_LIST] = JSON.stringify(show);
  };
</script>

<div>
  <h2 class="title-2 sm:text-4xl">Questions</h2>
  <div class="text-center mt-3">
    <button
      class="button"
      on:click={() => toggleShow('description')}
      title="Show/hide descriptions">📄</button>
    <button
      class="button"
      on:click={() => toggleShow('textarea')}
      title="Show/hide response boxes">⌨</button>
    <button
      class="button"
      on:click={() => {
        updateQuestions();
      }}
      title="Recycle questions">♻</button>
  </div>
  {#each $questions as question}
    <Question {question} {show} />
  {/each}
</div>
