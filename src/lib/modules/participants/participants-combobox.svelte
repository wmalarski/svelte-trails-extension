<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Popover from "$lib/components/ui/popover";
  import { formatList } from "$lib/integrations/i18n/formatters/format-list";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import { _, locale } from "svelte-i18n";
  import ParticipantsCommand from "./participants-command.svelte";
  import { getParticipantsContext } from "./participants-context.svelte";

  interface Props {
    name: string;
    id: string;
  }

  const { name, id }: Props = $props();

  const participantsContext = getParticipantsContext();

  let open = $state(false);
  let values = $state<string[]>([]);
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedText = $derived.by(() => {
    const selectedValues = participantsContext.participants.filter(
      (participant) => values.includes(participant)
    );
    return formatList(selectedValues, $locale);
  });

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  const closeAndFocusTrigger = () => {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  };

  const onSelect = (clickedParticipant: string) => {
    const index = values.indexOf(clickedParticipant);
    if (index < 0) {
      values.push(clickedParticipant);
    } else {
      values.splice(index, 1);
    }
    closeAndFocusTrigger();
  };
</script>

<input type="hidden" {name} value={values.join(",")} />
<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        {id}
        class="justify-between"
        role="combobox"
        aria-expanded={open}
      >
        {selectedText || $_("participant.button_label")}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="p-0">
    <ParticipantsCommand {onSelect} selectedParticipant={values} />
  </Popover.Content>
</Popover.Root>
