import { getCurrentTab } from "./tabs";

async function injectedFunction() {
  document.body.style.backgroundColor = "orange";

  const detailsLink = document.querySelector(
    "[data-track-event='Route details,Map widget']"
  ) as HTMLAnchorElement;

  detailsLink.click();

  await new Promise((resolve) => setTimeout(() => resolve({}), 1000));

  const form = document.querySelector(
    "form[action^='/map']"
  ) as HTMLFormElement;

  return form.action;
}

export const sendMessageToTab = async () => {
  const tab = await getCurrentTab();

  console.log("[sendMessageToTab]", tab);

  if (!tab.id) {
    return;
  }

  const result = await chrome.scripting.executeScript({
    func: injectedFunction,
    target: { tabId: tab.id },
  });

  const first = result[0]?.result;

  console.log("[result]", first);

  // try {
  //   chrome.tabs.sendMessage(tab.id, { text: "report_back" }, (response) => {
  //     console.log("[response]", response);
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
};
