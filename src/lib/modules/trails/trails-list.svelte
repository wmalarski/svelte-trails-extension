<script lang="ts">
  import { getCurrentUrlContext } from "$lib/integrations/browser/current-url-context/current-url-context.svelte.ts";
  import AddTrailForm from "./add-trail-form.svelte";
  import { MT_WEBSITE_URL } from "./constants";

  const currentUrlContext = getCurrentUrlContext();
</script>

<span>{currentUrlContext.url}</span>
{#if currentUrlContext.url === MT_WEBSITE_URL}
  <p>what was the question?</p>
{:else}
  <p>Wrong website</p>
{/if}

<AddTrailForm />
