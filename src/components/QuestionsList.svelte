<script>
  import { questionsStore } from "../stores/questionsStore";
  import Question from "./Question.svelte";
  import getRandomNumber from "../utils/getRandomNumber";

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
    const indexes = Array.from({ length: 3 }, () =>
      getRandomNumber(0, $questionsStore.length)
    );

    filtered = $questionsStore
      .filter((q) => {
        return q.categories.includes("daily");
      })
      .filter((q, index) => indexes.includes(index));
  };

  const toggleShow = (name) => {
    show[name] = !show[name];
    localStorage.settings = JSON.stringify(show);
  };

  getFilteredQuestions();
</script>

<div>
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
  {#each filtered as question, i}
    <Question {question} {show} />
  {/each}
</div>
