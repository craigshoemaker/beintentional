<script>
  import { stores } from '../stores';
  let { scope, scopes, changeScope } = stores;
</script>

<section class="nav-container">
  {#each $scopes as scopeItem}
    <span on:click={() => changeScope(scopeItem)} class={scopeItem === $scope ? 'selected' : ''}>{scopeItem}</span>
  {/each}
</section>
