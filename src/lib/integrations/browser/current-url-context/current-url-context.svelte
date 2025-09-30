<script lang="ts">
  import { type Snippet } from "svelte";
  import { setCurrentUrlContext } from "./current-url-context.svelte.ts";

  interface Props {
    children: Snippet;
  }

  const { children }: Props = $props();

  setCurrentUrlContext({ url: "/" });
</script>

{@render children()}
