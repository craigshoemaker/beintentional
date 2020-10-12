<script>
  import { onMount } from "svelte";
  import { scope } from "../stores/uiStore";

  let scopeName = $scope;
  let scopes = ["daily", "weekly", "monthly", "yearly"];
  const handleClick = (newScope) => {
    scope.set(newScope);
  };

  onMount(() =>
    scope.subscribe((value) => {
      scopeName = value;
    })
  );
</script>

<section class="nav-container">
  {#each scopes as scope}
    <span
      on:click={() => handleClick(scope)}
      class={scope === scopeName ? 'selected' : ''}>{scope}</span>
  {/each}
</section>
