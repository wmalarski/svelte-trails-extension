<script lang="ts">
  import { OriginProvider } from "$lib/integrations/browser/origin-context";
  import TrailsList from "$lib/modules/trails/trails-list.svelte";
</script>

<OriginProvider>
  <main>
    <TrailsList />
  </main>
</OriginProvider>
