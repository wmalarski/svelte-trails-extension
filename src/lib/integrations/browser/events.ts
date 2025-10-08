import { getCurrentTab } from "./tabs";

export const sendMessageToTab = async () => {
  const tab = await getCurrentTab();

  if (!tab.id) {
    return;
  }

  chrome.tabs.sendMessage(tab.id, { text: "report_back" }, (response) => {
    console.log("[response]", response);
  });
};
