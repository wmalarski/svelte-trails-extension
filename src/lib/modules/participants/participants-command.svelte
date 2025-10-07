<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type { InputKeyboardEvent } from "$lib/utils";
  import { cn } from "$lib/utils";
  import CheckIcon from "@lucide/svelte/icons/check";
  import { _ } from "svelte-i18n";
  import { getParticipantsContext } from "./participants-context.svelte";

  interface Props {
    onSelect: (participant: string) => void;
    selectedParticipant: string[];
  }

  const { onSelect, selectedParticipant }: Props = $props();

  const participantsContext = getParticipantsContext();

  const onCommandKeyUp = async (event: InputKeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }

    const newParticipant = event.currentTarget.value;
    await participantsContext.add(newParticipant);
    onSelect(newParticipant);
  };
</script>

<Command.Root>
  <Command.Input
    placeholder={$_("participant.search_label")}
    name="participant"
    onkeyup={onCommandKeyUp}
  />
  <Command.List>
    <Command.Empty>{$_("common.not_found")}</Command.Empty>
    <Command.Group value="participants">
      {#each participantsContext.participants as participant}
        <Command.Item
          value={participant}
          onSelect={() => onSelect(participant)}
        >
          <CheckIcon
            class={cn(
              !selectedParticipant.includes(participant) && "text-transparent"
            )}
          />
          {participant}
        </Command.Item>
      {/each}
    </Command.Group>
  </Command.List>
</Command.Root>
