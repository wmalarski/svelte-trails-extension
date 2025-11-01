<script lang="ts">
  import ExportButton from "./export-button.svelte";
  import SearchSection from "./search/search-section.svelte";
  import {
    applyDatesFilter,
    applyQueryFilter,
    applySort,
    mapToTrailEntry,
    mapToTrailTimeTuples,
  } from "./search/search-utils";
  import TrailsListItem from "./trail-card/trails-list-item.svelte";
  import AddTrailDialog from "./trail-forms/add-trail-dialog.svelte";
  import ListPlaceholderAddTrailDialog from "./trail-forms/list-placeholder-add-trail-dialog.svelte";
  import { getTrailsContext } from "./trails-context.svelte";

  const trailsContext = getTrailsContext();

  let query = $state("");
  let minDate = $state<Date>();
  let maxDate = $state<Date>();

  const filteredTrails = $derived.by(() => {
    const queryFiltered = applyQueryFilter(trailsContext.trails, query);

    const tuples = mapToTrailTimeTuples(queryFiltered);
    const dateFiltered = applyDatesFilter(tuples, minDate, maxDate);
    const sorted = applySort(dateFiltered);

    return mapToTrailEntry(sorted);
  });
</script>

<header
  class="flex flex-col gap-2 sticky top-0 z-10 p-2 bg-background border-card border"
>
  <div class="flex gap-2">
    <ExportButton />
    <AddTrailDialog />
  </div>
  <SearchSection bind:query bind:minDate bind:maxDate />
</header>

<ul class="flex flex-col gap-2 px-2">
  {#each filteredTrails as trail (trail.id)}
    <TrailsListItem {trail} />
  {:else}
    <li>
      <ListPlaceholderAddTrailDialog />
    </li>
  {/each}
</ul>
