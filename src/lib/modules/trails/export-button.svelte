<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import DownloadIcon from "@lucide/svelte/icons/download";
  import { _ } from "svelte-i18n";
  import { getTrailHref } from "./trail-widget-services";
  import { getTrailsContext } from "./trails-context.svelte";

  const trailsContext = getTrailsContext();

  const onClick = async () => {
    const columnDelimiter = ";";
    const rowsDelimiter = "\n";

    const header = [
      $_("trails.name_label"),
      $_("trails.date_label"),
      $_("trails.participants_label"),
      $_("trails.widget_link_label"),
    ].join(columnDelimiter);

    const dataRows = trailsContext.trails
      .map((trail) => [
        trail.name,
        trail.date,
        trail.participants.join(","),
        getTrailHref(trail.trailId),
      ])
      .map((columns) => columns.join(columnDelimiter));

    const data = [header, ...dataRows].join(rowsDelimiter);

    const link = document.createElement("a");
    link.download = `${$_("trails.export_filename")}.csv`;
    link.href = encodeURI("data:text/csv," + data);
    link.click();
  };
</script>

<Button onclick={onClick}>
  <DownloadIcon />
  {$_("trails.export_button")}
</Button>
