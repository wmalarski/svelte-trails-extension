<script lang="ts">
  import { type Snippet } from "svelte";
  import {
    createTrailsContext,
    setTrailsContext,
  } from "./trails-context.svelte.js";

  interface Props {
    children: Snippet;
  }

  let context = createTrailsContext();

  const { children }: Props = $props();

  setTrailsContext(context);
</script>

{@render children()}
