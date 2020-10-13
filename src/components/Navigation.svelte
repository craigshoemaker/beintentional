<script>
  import { scope } from "../stores/uiStore";

  let scopes = ["daily", "weekly", "monthly", "yearly"];
  const handleClick = (newScope) => {
    scope.set(newScope);
  };
</script>

<section class="nav-container">
  {#each scopes as scopeItem}
    <span
      on:click={() => handleClick(scopeItem)}
      class={scopeItem === $scope ? 'selected' : ''}>{scopeItem}</span>
  {/each}
</section>
