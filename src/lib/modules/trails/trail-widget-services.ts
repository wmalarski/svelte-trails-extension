import { getCurrentUrl } from "$lib/integrations/browser/tabs";
import { MT_WEBSITE_URL } from "./constants";

export const getTrailWidgetFrameSource = (trailId: string) => {
  return `${MT_WEBSITE_URL}/map/widget/route/h1l0p1/${trailId}.html`;
};

export const getTrailHref = (trailId: string) => {
  return `${MT_WEBSITE_URL}/route/${trailId}`;
};

export const getTrailWidgetHref = (trailId: string) => {
  const base = getTrailHref(trailId);
  return `${base}?utm_source=external_web&amp;utm_medium=widget&amp;utm_campaign=route_widget`;
};

export const getTrailWidgetAction = async () => {
  const currentUrl = await getCurrentUrl();

  if (!currentUrl) {
    return;
  }

  const url = new URL(currentUrl);
  const routeQuery = url.searchParams.get("q") as string;
  const formData = new FormData();

  formData.set("display_label", "true");
  formData.set("event_category", "Route details");
  formData.set("route_query", routeQuery);
  formData.set("route_type", "v=foot,m=hiking");

  const response = await fetch(`${url.origin}/widget/route`, {
    body: formData,
    method: "post",
  });

  const text = await response.text();

  const matches = text.match(/action=(.*)\.html/g);
  const trailId = matches?.[0].split(/(\/|\.)/).at(-3);

  return trailId;
};
