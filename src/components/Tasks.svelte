<script>
  import { onMount } from "svelte";
  import { tasksStore } from "../stores/tasksStore";
  import { scope } from "../stores/uiStore";

  const converter = new showdown.Converter();
  let html = "";

  const renderTasks = () => {
    html = converter.makeHtml($tasksStore[$scope]);
    html = html.replace(
      /\<li\>/g,
      '<li><input type="checkbox" class="inline-block mr-2">'
    );
  };

  onMount(() => scope.subscribe(renderTasks));
  renderTasks();
</script>

<div class="p-4 pl-8">
  <h2
    class="text-center w-full text-2xl sm:text-4xl font-semibold font-serif mb-5">
    Tasks
  </h2>
  <div class={scope}>
    {@html html}
  </div>
</div>
