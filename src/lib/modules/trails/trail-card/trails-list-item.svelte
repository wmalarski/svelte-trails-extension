<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card";
  import ConfirmDialog from "$lib/components/ui/confirm-dialog/confirm-dialog.svelte";
  import { formatDate } from "$lib/integrations/i18n/formatters/format-date";
  import { formatList } from "$lib/integrations/i18n/formatters/format-list";
  import { _, locale } from "svelte-i18n";
  import { getTrailsContext } from "../trails-context.svelte";
  import type { TrailEntry } from "../trails-storage";
  import TrailDetailsDropdown from "./trail-details-dropdown.svelte";
  import TrailWidget from "./trail-widget.svelte";

  interface Props {
    trail: TrailEntry;
  }

  const { trail }: Props = $props();

  const trailsContext = getTrailsContext();

  const onContinue = () => {
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

<li>
  <Card.Root class="w-full relative">
    <TrailDetailsDropdown {trail} />
    <Card.Header>
      <Card.Description class="text-xs">
        {formatDate(trail.date, $locale)}
      </Card.Description>
      <Card.Title class="text-lg">{trail.name}</Card.Title>
      <Card.Description>
        {formatList(trail.participants, $locale)}
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <TrailWidget {trail} />
    </Card.Content>
    <Card.Footer class="flex-col gap-2 items-end">
      <Button onclick={onDeleteClick} variant="destructive">
        {$_("trails.delete_trail")}
      </Button>
      <ConfirmDialog {onContinue} {onOpenChange} open={deleteConfirmOpen} />
    </Card.Footer>
  </Card.Root>
</li>
