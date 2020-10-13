<script>
  import { questionsStore } from "../stores/questionsStore";
  import { scope } from "../stores/uiStore";
  import { onMount } from "svelte";
  import Question from "./Question.svelte";
  import getRandomNumber from "../utils/getRandomNumber";

  let currentScope = $scope;
  let filtered = {};
  let show = {};

  if (!localStorage.settings) {
    show = {
      textarea: true,
      description: true,
    };
  } else {
    show = JSON.parse(localStorage.settings);
  }

  const getFilteredQuestions = () => {
    filtered = $questionsStore.filter((q) =>
      q.categories.includes(currentScope)
    );
    const max = { length: 3 };
    const indexes = Array.from(max, () => getRandomNumber(0, filtered.length));
    filtered = filtered.filter((q, index) => indexes.includes(index));
  };

  const toggleShow = (name) => {
    show[name] = !show[name];
    localStorage.settings = JSON.stringify(show);
  };

  getFilteredQuestions();

  onMount(() =>
    scope.subscribe((value) => {
      currentScope = value;
      getFilteredQuestions();
    })
  );
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
      on:click={getFilteredQuestions}
      title="Recycle questions">♻</button>
  </div>
  {#each filtered as question}
    <Question {question} {show} />
  {/each}
</div>
