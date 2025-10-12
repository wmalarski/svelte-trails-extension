<script lang="ts">
  import { _ } from "svelte-i18n";
  import {
    getTrailWidgetFrameSource,
    getTrailWidgetHref,
  } from "./trail-widget-services";
  import type { TrailEntry } from "./trails-storage";

  interface Props {
    trail: TrailEntry;
  }

  const { trail }: Props = $props();
</script>

<div class="max-w-[600px] overflow-hidden min-w-[300px] mx-auto my-0">
  <iframe
    title="widget"
    src={getTrailWidgetFrameSource(trail.trailId)}
    height="680"
    class="w-full border-0"
    loading="lazy"
  ></iframe>
  <a
    href={getTrailWidgetHref(trail.trailId)}
    target="_blank"
    rel="noopener"
    style="text-[#999] text-[13px] inline-block px-0 py-[7px]"
  >
    {$_("trails.widget_credit")}
  </a>
</div>
