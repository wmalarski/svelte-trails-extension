<script lang="ts">
  import { getTrailsContext } from "./trails-context.svelte";
  import TrailsListItem from "./trails-list-item.svelte";

  const trailsContext = getTrailsContext();
</script>

<ul>
  {#each trailsContext.trails as trail (trail.id)}
    <TrailsListItem {trail} />
  {/each}
</ul>
