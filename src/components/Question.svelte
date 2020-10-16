<script>
  export let question = {};
  export let show = {};
</script>

<div class="p-4 mt-4 mb-4">
  <h3 class="font-semibold text-2xl">{question.text}</h3>
  {#if show.description}
    <p class="text-gray-700 mt-3">{question.description}</p>
  {/if}
  {#if show.textarea}
    <textarea placeholder="Responses are never analyzed, stored, or shared." />
  {/if}
</div>
