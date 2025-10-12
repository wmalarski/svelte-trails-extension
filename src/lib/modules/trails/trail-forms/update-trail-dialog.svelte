<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import type { ComponentProps } from "svelte";
  import { _ } from "svelte-i18n";
  import { getTrailsContext } from "../trails-context.svelte";
  import type { TrailEntry } from "../trails-storage";
  import TrailForm from "./trail-form.svelte";

  interface Props {
    open: boolean;
    trail: TrailEntry;
  }

  let { trail, open = $bindable() }: Props = $props();

  const trailsContext = getTrailsContext();

  const formId = "update-trail-dialog";

  const onSubmit: ComponentProps<typeof TrailForm>["onSubmit"] = async (
    data
  ) => {
    await trailsContext.update({ ...trail, ...data });

    open = false;
  };
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>{$_("trails.update_trail")}</Dialog.Title>
      <Dialog.Description>
        {$_("trails.update_description")}
      </Dialog.Description>
    </Dialog.Header>
    <TrailForm {formId} {onSubmit} initialData={trail} />
    <Dialog.Footer>
      <Button type="submit" form={formId}>{$_("common.save")}</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
