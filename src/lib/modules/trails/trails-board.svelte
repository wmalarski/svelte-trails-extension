<script lang="ts">
  import { _ } from "svelte-i18n";
  import { getOriginContext } from "../origin";
  import AddTrailForm from "./add-trail-form.svelte";
  import { MT_WEBSITE_URL } from "./constants";
  import ExportButton from "./export-button.svelte";
  import TrailsList from "./trails-list.svelte";

  const originContext = getOriginContext();
</script>

{#if originContext.origin === MT_WEBSITE_URL}
  <main class="flex flex-col gap-4 p-2">
    <ExportButton />
    <AddTrailForm />
    <TrailsList />
  </main>
{:else}
  <main>
    <span>{originContext.origin}</span>
    <p>{$_("incorect_site")}</p>
  </main>
{/if}
