<script lang="ts">
  import {
    getCurrentOrigin,
    onCurrentUrlChange,
  } from "$lib/integrations/browser/tabs";
  import { onMount, type Snippet } from "svelte";
  import { setOriginContext, type OriginContextState } from "./origin-context";

  interface Props {
    children: Snippet;
  }

  let context = $state<OriginContextState>({});

  const { children }: Props = $props();

  setOriginContext(context);

  onMount(() => {
    const handleChange = async () => {
      const updatedOrigin = await getCurrentOrigin();
      context.origin = updatedOrigin;
    };
    handleChange();
    return onCurrentUrlChange(handleChange);
  });
</script>

{@render children()}
