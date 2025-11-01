<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import type { ComponentProps } from "svelte";
  import { _ } from "svelte-i18n";
  import { getTrailWidgetAction } from "../trail-widget-services";
  import { getTrailsContext } from "../trails-context.svelte";
  import TrailForm from "./trail-form.svelte";

  interface Props {
    open: boolean;
  }
  let { open = $bindable() }: Props = $props();

  const trailsContext = getTrailsContext();

  const formId = "add-trail-dialog";

  const onSubmit: ComponentProps<typeof TrailForm>["onSubmit"] = async (
    data
  ) => {
    const trailId = await getTrailWidgetAction();

    if (!trailId) {
      return;
    }

    await trailsContext.add({ ...data, trailId });

    open = false;
  };
</script>

<Dialog.Content class="sm:max-w-[425px]">
  <Dialog.Header>
    <Dialog.Title>{$_("trails.add_trail")}</Dialog.Title>
    <Dialog.Description>
      {$_("trails.add_description")}
    </Dialog.Description>
  </Dialog.Header>
  <TrailForm {formId} {onSubmit} />
  <Dialog.Footer>
    <Button type="submit" form={formId}>{$_("common.add")}</Button>
  </Dialog.Footer>
</Dialog.Content>
