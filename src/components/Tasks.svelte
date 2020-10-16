<script>
  import { store } from '../store';
  let { tasks, scope, updateTasks } = store;
  let markdown = $tasks.markdown;
  let isEditing = false;

  function handleUpdate(scope, markdown) {
    updateTasks(scope, markdown);
    isEditing = false;
  }
</script>

<div class="p-4 pl-8">
  <h2 class="title-2 sm:text-4xl">Tasks</h2>
  {#if isEditing}
    <button on:click={() => handleUpdate($scope, markdown)}>💾</button>
    <textarea bind:value={markdown} />
  {:else}
    <button on:click={() => (isEditing = true)}>📝</button>
    <div>
      {@html $tasks.html}
    </div>
  {/if}
</div>
