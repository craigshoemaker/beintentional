<script>
  import { stores } from '../stores';
  import Question from './Question.svelte';

  const { filtered } = stores;
  let show = {};

  if (!localStorage.settings) {
    show = {
      textarea: true,
      description: true,
    };
  } else {
    show = JSON.parse(localStorage.settings);
  }

  const toggleShow = (name) => {
    show[name] = !show[name];
    localStorage.settings = JSON.stringify(show);
  };
</script>

<div>
  <h2 class="title-2 sm:text-4xl">Questions</h2>
  <div class="text-center mt-3">
    <button class="button" on:click={() => toggleShow('description')} title="Show/hide descriptions">📄</button>
    <button class="button" on:click={() => toggleShow('textarea')} title="Show/hide response boxes">⌨</button>
    <button
      class="button"
      on:click={() => {
        /* TODO: getFilteredQuestions*/
      }}
      title="Recycle questions">♻</button>
  </div>
  {#each $filtered as question}
    <Question {question} {show} />
  {/each}
</div>
