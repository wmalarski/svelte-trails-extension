<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { getCurrentUrl, onCurrentUrlChange } from "../tabs.js";
  import { setCurrentUrlContext } from "./current-url-context.svelte.js";

  interface Props {
    children: Snippet;
  }

  let currentUrl = $state({ url: "/" });

  const { children }: Props = $props();

  setCurrentUrlContext(currentUrl);

  onMount(() => {
    const handleChange = async () => {
      const updatedUrl = await getCurrentUrl();
      if (updatedUrl) {
        currentUrl.url = updatedUrl;
      }
    };
    handleChange();
    return onCurrentUrlChange(handleChange);
  });
</script>

{@render children()}
<span>URL:{currentUrl.url}</span>
