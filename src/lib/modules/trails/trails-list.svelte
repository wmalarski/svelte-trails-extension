<script lang="ts">
  import { getCurrentUrlContext } from "$lib/integrations/browser/current-url-context/current-url-context.svelte.ts";
  import { Button } from "../../components/ui/button";

  let count: number = $state(0);
  const increment = () => {
    count += 1;
  };

  const context = getCurrentUrlContext();
</script>

<Button onclick={increment}>
  count IS {count}
</Button>

<span>
  {context.url}
</span>
