<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    dateSchema,
    dateToInputValue,
  } from "$lib/integrations/valibot/date-schema";
  import type { FormSubmitEvent } from "$lib/utils";
  import FunnelIcon from "@lucide/svelte/icons/funnel";
  import { decode } from "decode-formdata";
  import { _ } from "svelte-i18n";
  import * as v from "valibot";

  const filtersSchema = v.object({
    minDate: v.nullish(dateSchema),
    maxDate: v.nullish(dateSchema),
  });

  interface Props {
    minDate?: Date;
    maxDate?: Date;
  }

  let { minDate = $bindable(), maxDate = $bindable() }: Props = $props();

  let open = $state(false);

  const formId = "filter-dialog";

  const onFormSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const decoded = decode(formData, { dates: ["maxDate", "minDate"] });

    const parsed = await v.safeParseAsync(filtersSchema, decoded);

    if (!parsed.success) {
      return;
    }

    minDate = parsed.output.minDate
      ? new Date(parsed.output.minDate)
      : undefined;
    maxDate = parsed.output.maxDate
      ? new Date(parsed.output.maxDate)
      : undefined;
    open = false;
  };
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button
        variant="outline"
        aria-label={$_("trails.filters_header")}
        {...props}
      >
        <FunnelIcon />
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>{$_("trails.filters_header")}</Dialog.Title>
    </Dialog.Header>
    <form onsubmit={onFormSubmit} class="flex flex-col gap-6" id={formId}>
      <div class="grid gap-2">
        <Label for="minDate">{$_("trails.from_date_label")}</Label>
        <Input
          name="minDate"
          id="minDate"
          type="date"
          defaultValue={minDate && dateToInputValue(minDate)}
        />
      </div>
      <div class="grid gap-2">
        <Label for="maxDate">{$_("trails.to_date_label")}</Label>
        <Input
          name="maxDate"
          id="maxDate"
          type="date"
          defaultValue={maxDate && dateToInputValue(maxDate)}
        />
      </div>
    </form>
    <Dialog.Footer>
      <Button type="submit" form={formId}>{$_("common.save")}</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
