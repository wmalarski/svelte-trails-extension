<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import type { FormSubmitEvent } from "$lib/utils";
  import { decode } from "decode-formdata";
  import { _ } from "svelte-i18n";
  import * as v from "valibot";
  import ParticipantsCombobox from "../../participants/participants-combobox.svelte";

  const trailFormSchema = v.object({
    name: v.string(),
    date: v.pipe(
      v.date(),
      v.transform((v) => v.toJSON().split("T")[0])
    ),
    participants: v.pipe(
      v.string(),
      v.transform((input) =>
        input.split(",").filter((value) => value.length > 0)
      )
    ),
  });

  type TrailFormData = v.InferOutput<typeof trailFormSchema>;

  interface Props {
    formId: string;
    initialData?: TrailFormData;
    onSubmit: (data: TrailFormData) => void;
  }

  const { formId, onSubmit, initialData }: Props = $props();

  const onFormSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const decoded = decode(formData, { dates: ["date"] });

    const parsed = await v.safeParseAsync(trailFormSchema, decoded);

    if (!parsed.success) {
      return;
    }

    onSubmit(parsed.output);
  };
</script>

<form onsubmit={onFormSubmit} class="flex flex-col gap-6" id={formId}>
  <div class="grid gap-2">
    <Label for="name">{$_("trails.name_label")}</Label>
    <Input
      id="name"
      type="text"
      name="name"
      defaultValue={initialData?.name}
      placeholder={$_("trails.name_description")}
      required
    />
  </div>
  <div class="grid gap-2">
    <Label for="participants">{$_("trails.participants_label")}</Label>
    <ParticipantsCombobox
      id="participants"
      name="participants"
      initialValues={initialData?.participants}
    />
  </div>
  <div class="grid gap-2">
    <Label for="date">{$_("trails.date_label")}</Label>
    <Input
      name="date"
      id="date"
      type="date"
      required
      defaultValue={initialData?.date}
    />
  </div>
</form>
