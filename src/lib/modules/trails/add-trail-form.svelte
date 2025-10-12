<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import type { ComponentProps } from "svelte";
  import { _ } from "svelte-i18n";
  import TrailForm from "./trail-forms/trail-form.svelte";
  import { getTrailWidgetAction } from "./trail-widget-services";
  import { getTrailsContext } from "./trails-context.svelte";

  const trailsContext = getTrailsContext();

  const onSubmit: ComponentProps<typeof TrailForm>["onSubmit"] = async (
    data
  ) => {
    const trailId = await getTrailWidgetAction();

    if (!trailId) {
      return;
    }

    await trailsContext.add({ ...data, trailId });
  };
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title class="text-lg">{$_("trails.add_trail")}</Card.Title>
    <Card.Description>
      {$_("trails.add_description")}
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <TrailForm formId="add-trail" {onSubmit} />
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button form="add-trail" type="submit" class="w-full">
      {$_("common.add")}
    </Button>
  </Card.Footer>
</Card.Root>
