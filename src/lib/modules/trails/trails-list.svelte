<script lang="ts">
  import { getTrailsContext } from "./trails-context.svelte";

  const trailsContext = getTrailsContext();
</script>

<ul>
  {#each trailsContext.trails as trail}
    <li>{JSON.stringify(trail, null, 2)}</li>
  {/each}
</ul>
