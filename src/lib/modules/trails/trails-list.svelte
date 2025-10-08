<script lang="ts">
  import { getTrailsContext } from "./trails-context.svelte";
  import TrailsListItem from "./trails-list-item.svelte";

  const trailsContext = getTrailsContext();
</script>

<ul class="flex flex-col gap-2">
  {#each trailsContext.trails as trail (trail.id)}
    <TrailsListItem {trail} />
  {/each}
</ul>
