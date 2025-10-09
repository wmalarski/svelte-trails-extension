import { getCurrentTab } from "$lib/integrations/browser/tabs";

const wait = async (time: number) => {
  await new Promise((resolve) => setTimeout(() => resolve({}), time));
};

async function injectedFunction() {
  const detailsLink = document.querySelector(
    "[data-track-event='Route details,Map widget']"
  ) as HTMLAnchorElement;

  detailsLink.click();

  await wait(1000);

  const form = document.querySelector(
    "form[action^='/map']"
  ) as HTMLFormElement;

  console.log("[form]", form);

  return form.action;
}

export const getTrailWidgetAction = async () => {
  const tab = await getCurrentTab();

  if (!tab.id) {
    return;
  }

  const injectionResults = await chrome.scripting.executeScript({
    func: injectedFunction,
    target: { tabId: tab.id },
  });

  const firstAction = injectionResults[0]?.result;

  return firstAction;
};
