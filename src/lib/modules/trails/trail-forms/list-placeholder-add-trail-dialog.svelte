<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import { _ } from "svelte-i18n";
  import AddTrailDialogContent from "./add-trail-dialog-content.svelte";

  let open = $state(false);
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button variant="outline" class="w-full h-52" {...props}>
        <PlusIcon />
        {$_("trails.add_trail")}
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <AddTrailDialogContent bind:open />
</Dialog.Root>
