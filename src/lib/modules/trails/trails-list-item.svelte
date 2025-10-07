<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { _ } from "svelte-i18n";
  import { getTrailsContext } from "./trails-context.svelte";
  import type { TrailEntry } from "./trails-storage";

  interface Props {
    trail: TrailEntry;
  }

  const { trail }: Props = $props();

  const trailsContext = getTrailsContext();

  const onDeleteClick = () => {
    trailsContext.remove(trail.id);
  };
</script>

<li>
  {JSON.stringify(trail, null, 2)}
  <Button onclick={onDeleteClick}>{$_("trails.delete_trail")}</Button>
</li>
