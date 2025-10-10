import { getCurrentUrl } from "$lib/integrations/browser/tabs";

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
