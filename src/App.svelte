<script lang="ts">
  import "$lib/integrations/i18n";
  import OriginProvider from "$lib/modules/origin/origin-provider.svelte";
  import ParticipantsProvider from "$lib/modules/participants/participants-provider.svelte";
  import TrailsBoard from "$lib/modules/trails/trails-board.svelte";
  import TrailsProvider from "$lib/modules/trails/trails-provider.svelte";
</script>

<OriginProvider>
  <TrailsProvider>
    <ParticipantsProvider>
      <TrailsBoard />
    </ParticipantsProvider>
  </TrailsProvider>
</OriginProvider>
