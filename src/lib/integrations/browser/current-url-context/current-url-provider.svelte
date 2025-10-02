<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { getCurrentOrigin, onCurrentUrlChange } from "../tabs.js";
  import { setCurrentUrlContext } from "./current-url-context.svelte.js";

  interface Props {
    children: Snippet;
  }

  let currentUrl = $state({ url: "/" });

  const { children }: Props = $props();

  setCurrentUrlContext(currentUrl);

  onMount(() => {
    const handleChange = async () => {
      const updatedUrl = await getCurrentOrigin();
      if (updatedUrl) {
        currentUrl.url = updatedUrl;
      }
    };
    handleChange();
    return onCurrentUrlChange(handleChange);
  });
</script>

{@render children()}
