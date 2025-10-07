<script lang="ts">
  import { _ } from "svelte-i18n";
  import { getOriginContext } from "../origin";
  import AddTrailForm from "./add-trail-form.svelte";
  import { MT_WEBSITE_URL } from "./constants";
  import TrailsList from "./trails-list.svelte";

  const originContext = getOriginContext();
</script>

<span>{originContext.origin}</span>

{#if originContext.origin === MT_WEBSITE_URL}
  <main class="flex flex-col gap-4 p-2">
    <AddTrailForm />
    <TrailsList />
  </main>
{:else}
  <main>
    <p>{$_("incorect_site")}</p>
  </main>
{/if}
