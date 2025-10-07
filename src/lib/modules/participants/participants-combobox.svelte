<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Popover from "$lib/components/ui/popover";
  import { DEFAULT_LOCALE } from "$lib/integrations/i18n";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import { locale } from "svelte-i18n";
  import ParticipantsCommand from "./participants-command.svelte";
  import { getParticipantsContext } from "./participants-context.svelte";

  const participantsContext = getParticipantsContext();

  let open = $state(false);
  let values = $state<string[]>([]);
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedText = $derived.by(() => {
    const localeValue = $locale ?? DEFAULT_LOCALE;
    const formatter = new Intl.ListFormat(localeValue, {
      style: "long",
      type: "conjunction",
    });

    console.log(
      "participantsContext.participants",
      participantsContext.participants
    );
    const selectedValues = (participantsContext.participants ?? []).filter(
      (participant) => values.includes(participant)
    );

    return formatter.format(selectedValues);
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

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        class="w-[200px] justify-between"
        role="combobox"
        aria-expanded={open}
      >
        {selectedText || "Select a framework..."}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <ParticipantsCommand {onSelect} selectedParticipant={values} />
  </Popover.Content>
</Popover.Root>
