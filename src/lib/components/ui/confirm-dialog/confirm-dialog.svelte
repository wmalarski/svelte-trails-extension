<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { _ } from "svelte-i18n";

  interface Props {
    open: boolean;
    onContinue: () => void;
  }

  let { onContinue, open = $bindable() }: Props = $props();
</script>

<AlertDialog.Root bind:open>
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
