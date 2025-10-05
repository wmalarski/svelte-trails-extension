<script lang="ts">
  import { OriginProvider } from "$lib/integrations/browser/origin-context";
  import TrailsBoard from "$lib/modules/trails/trails-board.svelte";
</script>

<OriginProvider>
  <main>
    <TrailsBoard />
  </main>
</OriginProvider>
