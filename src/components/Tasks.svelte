<script>
  import { stores } from "../stores";
  import getRandomNumber from "../utils/getRandomNumber";

  let { scope, tasks } = stores;
  const converter = new showdown.Converter();
  let html = "";

  const renderTasks = () => {
    html = converter.makeHtml($tasks[$scope]);
    if (html && html.length) {
      html = html.replace(/<li>(.*)?<\/li>/g, (match, group) => {
        const id = getRandomNumber(1, 10000);
        return `
        <li>
          <input id="${id}" type="checkbox" class="inline-block mr-2">
          <label for="${id}" class="cursor-pointer">${group}</label>
        </li>`;
      });
    }
  };

  renderTasks();
</script>

<div class="p-4 pl-8">
  <h2 class="title-2 sm:text-4xl">Tasks</h2>
  <div>
    {@html html}
  </div>
</div>
