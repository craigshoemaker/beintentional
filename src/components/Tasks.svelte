<script>
  import { store } from '../store';
  let { tasks } = store;
</script>

<div class="p-4 pl-8">
  <h2 class="title-2 sm:text-4xl">Tasks</h2>
  <div>
    {@html $tasks}
  </div>
</div>
