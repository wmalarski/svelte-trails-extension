<script lang="ts">
  import SearchSection from "./search/search-section.svelte";
  import { applyQueryFilter } from "./search/search-utils";
  import TrailsListItem from "./trail-card/trails-list-item.svelte";
  import { getTrailsContext } from "./trails-context.svelte";

  const trailsContext = getTrailsContext();

  let query = $state("");

  const filteredTrails = $derived.by(() => {
    return applyQueryFilter(trailsContext.trails, query);
  });
</script>

<SearchSection bind:query />

<ul class="flex flex-col gap-2">
  {#each filteredTrails as trail (trail.id)}
    <TrailsListItem {trail} />
  {/each}
</ul>
