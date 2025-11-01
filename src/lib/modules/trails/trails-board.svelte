<script lang="ts">
  import { MT_WEBSITE_URL } from "$lib/integrations/map/constants";
  import { _ } from "svelte-i18n";
  import { getOriginContext } from "../origin";
  import ExportButton from "./export-button.svelte";
  import AddTrailDialog from "./trail-forms/add-trail-dialog.svelte";
  import TrailsList from "./trails-list.svelte";

  const originContext = getOriginContext();
</script>

{#if originContext.origin === MT_WEBSITE_URL}
  <main class="flex flex-col gap-4 p-2">
    <ExportButton />
    <AddTrailDialog />
    <TrailsList />
  </main>
{:else}
  <main>
    <p>{$_("incorect_site")}</p>
  </main>
{/if}
