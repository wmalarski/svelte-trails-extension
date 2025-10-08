<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import type { ComponentProps } from "svelte";
  import { _ } from "svelte-i18n";

  interface Props {
    onContinue: () => void;
    child: ComponentProps<typeof AlertDialog.Trigger>["child"];
  }

  const { onContinue, child }: Props = $props();
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger {child} />
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{$_("confirm_dialog.title")}</AlertDialog.Title>
      <AlertDialog.Description>
        {$_("confirm_dialog.description")}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>{$_("common.cancel")}</AlertDialog.Cancel>
      <AlertDialog.Action onclick={onContinue}>
        {$_("common.continue")}
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
