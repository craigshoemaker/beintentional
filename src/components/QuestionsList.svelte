<script>
  import { questionsStore } from "../stores/questionsStore";
  import getRandomNumber from "../utils/getRandomNumber";

  const indexes = Array.from({ length: 3 }, () =>
    getRandomNumber(0, $questionsStore.length)
  );

  const filtered = $questionsStore.filter((q, index) =>
    indexes.includes(index)
  );
</script>

<style>
  .card {
    border: 1px solid #eee;
    border-radius: 3px;
    margin: 3rem;
    padding: 3rem;
  }

  .card textarea {
    width: 100%;
    height: 10rem;
  }
</style>

<div>
  {#each filtered as question, i}
    <div class="card">
      <h3>{question.text}</h3>
      <p>{question.description}</p>
      <textarea name="" id="" />
    </div>
  {/each}
</div>
