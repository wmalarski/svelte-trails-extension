<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { _ } from "svelte-i18n";
  import FiltersDialog from "./filters-dialog.svelte";

  interface Props {
    query: string;
    minDate?: Date;
    maxDate?: Date;
  }

  let {
    query = $bindable(),
    minDate = $bindable(),
    maxDate = $bindable(),
  }: Props = $props();
</script>

<div class="flex gap-2 w-full">
  <Input
    id="query"
    type="search"
    bind:value={query}
    placeholder={$_("trails.search_placeholder")}
    aria-label={$_("trails.search_placeholder")}
  />
  <FiltersDialog bind:maxDate bind:minDate />
</div>
