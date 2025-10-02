<script lang="ts">
  import { getOriginContext } from "$lib/integrations/browser/origin-context";
  import AddTrailForm from "./add-trail-form.svelte";
  import { MT_WEBSITE_URL } from "./constants";

  const originContext = getOriginContext();
</script>

<span>{originContext.origin}</span>
{#if originContext.origin === MT_WEBSITE_URL}
  <p>what was the question?</p>
{:else}
  <p>Wrong website</p>
{/if}

<AddTrailForm />
