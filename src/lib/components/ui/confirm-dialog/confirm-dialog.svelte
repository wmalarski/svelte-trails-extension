<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { _ } from "svelte-i18n";

  interface Props {
    open: boolean;
    // onOpenChange: (open: boolean) => void;
    onContinue: () => void;
    // child: ComponentProps<typeof AlertDialog.Trigger>["child"];
  }

  let { onContinue, open = $bindable() }: Props = $props();

  const onOpenChange = (newOpen: boolean) => {
    open = newOpen;
  };
</script>

<AlertDialog.Root {open} {onOpenChange}>
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
