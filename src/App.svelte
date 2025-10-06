<script lang="ts">
  import OriginProvider from "$lib/modules/origin/origin-provider.svelte";
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
