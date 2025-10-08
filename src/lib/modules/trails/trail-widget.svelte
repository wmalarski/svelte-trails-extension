<script lang="ts">
  import type { TrailEntry } from "./trails-storage";

  interface Props {
    trail: TrailEntry;
  }

  const { trail }: Props = $props();
</script>

<div style="max-width:600px;overflow:hidden;margin:0 auto;min-width:300px;">
  <iframe
    title="widget"
    src="https://mapa-turystyczna.pl/map/widget/route/h1l0p1/33i84.html"
    height="680"
    style="width:100%;border:0;"
    loading="lazy"
  ></iframe>
  <a
    href="https://mapa-turystyczna.pl/route/33i84?utm_source=external_web&amp;utm_medium=widget&amp;utm_campaign=route_widget"
    target="_blank"
    rel="noopener"
    style="color:#999;padding:7px 0;font-size: 13px;font-family:Roboto,Arial,sans-serif;display: inline-block;"
    >Trasa: | mapa-turystyczna.pl</a
  >
</div>

<span>{trail.url}</span>
