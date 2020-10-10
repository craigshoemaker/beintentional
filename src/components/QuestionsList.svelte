<script>
  import { quesionsStore } from "../stores/quesionsStore";
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
      getRandomNumber(0, $quesionsStore.length)
    );

    filtered = $quesionsStore.filter((q, index) => indexes.includes(index));
  };

  const toggleShow = (name) => {
    show[name] = !show[name];
    localStorage.settings = JSON.stringify(show);
  };

  getFilteredQuestions();
</script>

<div>
  <div class="text-right">
    <button
      class="button"
      on:click={() => toggleShow('description')}>Descriptions</button>
    <button
      class="button"
      on:click={() => toggleShow('textarea')}>Textareas</button>
    <button class="button" on:click={getFilteredQuestions}>New</button>
  </div>
  {#each filtered as question, i}
    <Question {question} {show} />
  {/each}
</div>
