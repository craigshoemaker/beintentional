<script>
  import { store } from '../store';

  const { tasks, scope, updateTasks } = store;

  let markdown = $tasks.markdown;
  tasks.subscribe((updatedTasks) => (markdown = updatedTasks.markdown));

  let isEditing = false;

  function handleUpdate(markdown) {
    updateTasks($scope, markdown);
    isEditing = false;
  }
</script>

<div class="p-4 pl-8">
  <h2 class="title-2 sm:text-4xl">Tasks</h2>
  {#if isEditing}
    <div class="-mt-10"><textarea bind:value={markdown} /></div>
    <div class="task-button" on:click={() => handleUpdate(markdown)}>💾</div>
  {:else}
    <div>
      {@html $tasks.html}
    </div>
    <div class="task-button" on:click={() => (isEditing = true)}>📝</div>
  {/if}
</div>
