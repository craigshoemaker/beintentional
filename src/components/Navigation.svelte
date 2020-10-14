<script>
  import { stores } from "../stores";
  let { scope, changeScope } = stores;
  let scopes = ["daily", "weekly", "monthly", "yearly"];
</script>

<section class="nav-container">
  {#each scopes as scopeItem}
    <span
      on:click={() => changeScope(scopeItem)}
      class={scopeItem === $scope ? 'selected' : ''}>{scopeItem}</span>
  {/each}
</section>
