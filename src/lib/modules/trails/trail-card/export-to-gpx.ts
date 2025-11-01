import { MT_WEBSITE_URL } from "$lib/integrations/map/constants";
import type { TrailEntry } from "../trails-storage";

export const exportToGpx = async (trail: TrailEntry) => {
  const pathname = `${MT_WEBSITE_URL}/route/${trail.trailId}.gpx`;

  const response = await fetch(pathname);

  const text = await response.text();

  const nowTime = Date.now();
  const trailDate = new Date(trail.date);
  trailDate.setUTCHours(8);

  const replaced = text.replaceAll(
    /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ/g,
    (value) => {
      const pointTime = new Date(value).getTime();
      const diffTime = Math.abs(pointTime - nowTime);

      const newDate = new Date(trailDate);
      newDate.setTime(newDate.getTime() + diffTime);

      return newDate.toJSON();
    },
  );

  const link = document.createElement("a");
  link.download = `${trail.name}.gpx`;
  link.href = encodeURI(`data:text/xml,${replaced}`);
  link.click();
};
