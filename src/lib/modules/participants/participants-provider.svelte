<script lang="ts">
  import { type Snippet } from "svelte";
  import {
    createParticipantsContext,
    setParticipantsContext,
  } from "./participants-context.svelte";

  interface Props {
    children: Snippet;
  }

  let context = createParticipantsContext();

  const { children }: Props = $props();

  setParticipantsContext(context);
</script>

{@render children()}
