<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { _ } from "svelte-i18n";

  interface Props {
    query: string;
  }

  let { query = $bindable() }: Props = $props();
</script>

<div>
  <Input
    id="query"
    type="search"
    bind:value={query}
    placeholder={$_("trails.search_placeholder")}
    aria-label={$_("trails.search_placeholder")}
  />
</div>
