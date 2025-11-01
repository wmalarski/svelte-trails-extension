<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { navigateToPage } from "$lib/integrations/browser/tabs";
  import { MT_WEBSITE_URL } from "$lib/integrations/map/constants";
  import { _ } from "svelte-i18n";
  import { getOriginContext } from "../origin";
  import TrailsList from "./trails-list.svelte";

  const originContext = getOriginContext();

  const onRedirectToMtClick = () => {
    navigateToPage(MT_WEBSITE_URL);
  };
</script>

{#if originContext.origin === MT_WEBSITE_URL}
  <main class="flex flex-col">
    <TrailsList />
  </main>
{:else}
  <main class="p-2">
    <Button variant="outline" class="w-full h-52" onclick={onRedirectToMtClick}>
      {$_("incorect_site")}
    </Button>
  </main>
{/if}
