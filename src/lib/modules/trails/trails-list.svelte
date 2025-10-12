<script lang="ts">
  import TrailsListItem from "./trail-card/trails-list-item.svelte";
  import { getTrailsContext } from "./trails-context.svelte";

  const trailsContext = getTrailsContext();
</script>

<ul class="flex flex-col gap-2">
  {#each trailsContext.trails as trail (trail.id)}
    <TrailsListItem {trail} />
  {/each}
</ul>
