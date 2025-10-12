<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { TrailEntry } from "./trails-storage";

  interface Props {
    trail: TrailEntry;
  }

  const { trail }: Props = $props();
</script>

<div class="max-w-[600px] overflow-hidden min-w-[300px] mx-auto my-0">
  <iframe
    title="widget"
    src={`https://mapa-turystyczna.pl/map/widget/route/h1l0p1/${trail.trailId}.html`}
    height="680"
    class="w-full border-0"
    loading="lazy"
  ></iframe>
  <a
    href={`https://mapa-turystyczna.pl/route/${trail.trailId}?utm_source=external_web&amp;utm_medium=widget&amp;utm_campaign=route_widget`}
    target="_blank"
    rel="noopener"
    style="text-[#999] text-[13px] inline-block px-0 py-[7px]"
  >
    {$_("trails.widget_credit")}
  </a>
</div>
