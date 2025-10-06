<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { getCurrentUrl } from "$lib/integrations/browser/tabs";
  import type { FormSubmitEvent } from "$lib/utils";
  import { decode } from "decode-formdata";
  import { _ } from "svelte-i18n";
  import * as v from "valibot";
  import { getTrailsContext } from "./trails-context.svelte";

  const trailsContext = getTrailsContext();

  const onSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = await getCurrentUrl();

    const parsed = await v.safeParseAsync(
      v.object({
        name: v.string(),
        participants: v.array(v.string()),
        date: v.date(),
      }),
      decode(formData, { arrays: ["values"], dates: ["date"] })
    );

    if (!parsed.success || !url) {
      return;
    }

    await trailsContext.add({ ...parsed.output, url });
  };
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>{$_("trails.add_trail")}</Card.Title>
    <Card.Description>
      {$_("trails.add_description")}
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <form onsubmit={onSubmit} class="flex flex-col gap-6" id="add-trail">
      <div class="grid gap-2">
        <Label for="text">{$_("trails.name_label")}</Label>
        <Input
          id="name"
          type="text"
          placeholder={$_("trails.name_description")}
          required
        />
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div class="grid gap-2">
        <Label for="date">{$_("trails.date_label")}</Label>
        <Input id="date" type="date" required />
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button type="submit" class="w-full">Login</Button>
  </Card.Footer>
</Card.Root>
