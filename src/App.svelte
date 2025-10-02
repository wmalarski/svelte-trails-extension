<script lang="ts">
  import { CurrentUrlProvider } from "$lib/integrations/browser/current-url-context";
  import TrailsList from "./lib/modules/trails/trails-list.svelte";
</script>

<CurrentUrlProvider>
  <main>
    <TrailsList />
  </main>
</CurrentUrlProvider>
