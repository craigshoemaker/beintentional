<script>
  import { onMount } from "svelte";
  import { tasksStore } from "../stores/tasksStore";
  import { scope } from "../stores/uiStore";
  import getRandomNumber from "../utils/getRandomNumber";

  const converter = new showdown.Converter();
  let html = "";

  const renderTasks = () => {
    html = converter.makeHtml($tasksStore[$scope]);
    html = html.replace(/<li>(.*)?<\/li>/g, (match, group) => {
      const id = getRandomNumber(1, 10000);
      return `
      <li>
        <input id="${id}" type="checkbox" class="inline-block mr-2">
        <label for="${id}" class="cursor-pointer">${group}</label>
      </li>`;
    });
  };

  onMount(() => scope.subscribe(renderTasks));
  renderTasks();
</script>

<div class="p-4 pl-8">
  <h2 class="title-2 sm:text-4xl">Tasks</h2>
  <div>
    {@html html}
  </div>
</div>
