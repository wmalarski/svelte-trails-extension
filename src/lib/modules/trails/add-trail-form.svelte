<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { getCurrentUrl } from "$lib/integrations/browser/tabs";
  import type { FormSubmitEvent } from "$lib/utils";
  import { decode } from "decode-formdata";
  import * as v from "valibot";

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

    console.log({ parsed, url });
  };
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Login to your account</Card.Title>
    <Card.Description
      >Enter your email below to login to your account</Card.Description
    >
    <Card.Action>
      <Button variant="link">Sign Up</Button>
    </Card.Action>
  </Card.Header>
  <Card.Content>
    <form onsubmit={onSubmit}>
      <div class="flex flex-col gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a
              href="##"
              class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button type="submit" class="w-full">Login</Button>
    <Button variant="outline" class="w-full">Login with Google</Button>
  </Card.Footer>
</Card.Root>
