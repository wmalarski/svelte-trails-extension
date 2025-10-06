<script lang="ts">
  import { OriginProvider } from "$lib/integrations/browser/origin-context";
  import "$lib/integrations/i18n";
  import ParticipantsProvider from "$lib/modules/participants/participants-provider.svelte";
  import TrailsBoard from "$lib/modules/trails/trails-board.svelte";
</script>

<OriginProvider>
  <ParticipantsProvider>
    <main>
      <TrailsBoard />
    </main>
  </ParticipantsProvider>
</OriginProvider>
