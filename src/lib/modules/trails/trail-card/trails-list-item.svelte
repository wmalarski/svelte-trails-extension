<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { formatDate } from "$lib/integrations/i18n/formatters/format-date";
  import { formatList } from "$lib/integrations/i18n/formatters/format-list";
  import { locale } from "svelte-i18n";
  import type { TrailEntry } from "../trails-storage";
  import TrailDetailsDropdown from "./trail-details-dropdown.svelte";
  import TrailWidget from "./trail-widget.svelte";

  interface Props {
    trail: TrailEntry;
  }

  const { trail }: Props = $props();
</script>

<li>
  <Card.Root class="w-full relative">
    <TrailDetailsDropdown {trail} />
    <Card.Header>
      <Card.Description class="text-xs">
        {formatDate(trail.date, $locale)}
      </Card.Description>
      <Card.Title class="text-lg">{trail.name}</Card.Title>
      <Card.Description>
        {formatList(trail.participants, $locale)}
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <TrailWidget {trail} />
    </Card.Content>
  </Card.Root>
</li>
