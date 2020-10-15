<script>
  import { store } from '../store';
  let { scope, scopes, changeScope } = store;
</script>

<section class="nav-container">
  {#each $scopes as scopeItem}
    <span on:click={() => changeScope(scopeItem)} class={scopeItem === $scope ? 'selected' : ''}>{scopeItem}</span>
  {/each}
</section>
