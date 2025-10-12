<script lang="ts">
  import ConfirmDialog from "$lib/components/ui/confirm-dialog/confirm-dialog.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
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

  const onOpenChange = (open: boolean) => {
    deleteConfirmOpen = open;
  };
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="absolute top-2 right-2">
    Open
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Item onclick={onDeleteClick} variant="destructive">
        {$_("trails.delete_trail")}
      </DropdownMenu.Item>

      <DropdownMenu.Item>Subscription</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<ConfirmDialog onContinue={onRemove} {onOpenChange} open={deleteConfirmOpen} />
