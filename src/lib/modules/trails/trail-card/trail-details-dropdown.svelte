<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import ConfirmDialog from "$lib/components/ui/confirm-dialog/confirm-dialog.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import ElipsisVerticalIcon from "@lucide/svelte/icons/ellipsis-vertical";
  import { _ } from "svelte-i18n";
  import { getTrailsContext } from "../trails-context.svelte";
  import type { TrailEntry } from "../trails-storage";

  interface Props {
    trail: TrailEntry;
  }

  const { trail }: Props = $props();

  const trailsContext = getTrailsContext();

  const onRemove = () => {
    trailsContext.remove(trail.id);
  };

  let deleteConfirmOpen = $state(false);

  const onDeleteClick = () => {
    deleteConfirmOpen = true;
  };
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="absolute top-2 right-2">
    {#snippet child({ props })}
      <Button
        {...props}
        variant="link"
        aria-label={$_("trails.open_trail_menu")}
      >
        <ElipsisVerticalIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item onclick={onDeleteClick} variant="destructive">
        {$_("trails.delete_trail")}
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<ConfirmDialog onContinue={onRemove} bind:open={deleteConfirmOpen} />
