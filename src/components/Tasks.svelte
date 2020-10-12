<script>
  import { onMount } from "svelte";
  import { tasksStore } from "../stores/tasksStore";
  import { scope } from "../stores/uiStore";

  const converter = new showdown.Converter();
  let html = "";

  const renderTasks = () => {
    html = converter.makeHtml($tasksStore[$scope]);
    html = html.replace(/\<h2 ([="a-zA-Z]+)\>/, (match, group) => {
      return `<h2 class="text-3xl" ${group}>`;
    });
    html = html.replace(/\<ul\>/, '<ul class="list-disc">');
  };

  onMount(() => scope.subscribe(renderTasks));
  renderTasks();
</script>

<div class="p-4 container">
  <h2 class="text-center w-full text-4xl font-semibold">Tasks</h2>
  <div class={scope}>
    {@html html}
  </div>
</div>
