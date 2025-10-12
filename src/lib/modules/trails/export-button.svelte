<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { getTrailHref } from "./trail-widget-services";
  import { getTrailsContext } from "./trails-context.svelte";

  const trailsContext = getTrailsContext();

  const onClick = async () => {
    const columnDelimiter = ";";
    const rowsDelimiter = "\n";

    const header = ["Nazwa", "Data", "Uczestnicy", "Szlak"].join(
      columnDelimiter
    );

    const dataRows = trailsContext.trails
      .map((trail) => [
        trail.name,
        trail.date,
        trail.participants.join(" "),
        getTrailHref(trail.trailId),
      ])
      .map((columns) => columns.join(columnDelimiter));

    const data = [header, ...dataRows].join(rowsDelimiter);

    const link = document.createElement("a");
    link.download = "file.csv";
    link.href = encodeURI("data:text/csv," + data);
    link.click();
  };
</script>

<Button onclick={onClick}>Export</Button>
