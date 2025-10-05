<script lang="ts">
  import { getOriginContext } from "$lib/integrations/browser/origin-context";
  import AddTrailForm from "./add-trail-form.svelte";
  import { MT_WEBSITE_URL } from "./constants";
  import TrailsList from "./trails-list.svelte";
  import TrailsProvider from "./trails-provider.svelte";

  const originContext = getOriginContext();
</script>

<span>{originContext.origin}</span>

{#if originContext.origin === MT_WEBSITE_URL}
  <TrailsProvider>
    <AddTrailForm />
    <TrailsList />
  </TrailsProvider>
{:else}
  <p>Wrong website</p>
{/if}
