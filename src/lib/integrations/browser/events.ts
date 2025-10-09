import { getCurrentTab } from "./tabs";

function injectedFunction() {
  document.body.style.backgroundColor = "orange";

  const query = document.querySelector("form[action^='/map']");

  console.log("[query]", query);
}

export const sendMessageToTab = async () => {
  const tab = await getCurrentTab();

  console.log("[sendMessageToTab]", tab);

  if (!tab.id) {
    return;
  }

  chrome.scripting.executeScript({
    func: injectedFunction,
    target: { tabId: tab.id },
  });

  // try {
  //   chrome.tabs.sendMessage(tab.id, { text: "report_back" }, (response) => {
  //     console.log("[response]", response);
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
};
