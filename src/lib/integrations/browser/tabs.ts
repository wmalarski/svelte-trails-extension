const getUrlOrigin = (url: string) => {
  return new URL(url).origin;
};

export const getCurrentTab = async () => {
  const args = { active: true, lastFocusedWindow: true };
  const tabs = await chrome.tabs.query(args);
  return tabs[0];
};

export const getCurrentUrl = async () => {
  const tab = await getCurrentTab();
  return tab?.url;
};

export const getCurrentOrigin = async () => {
  const url = await getCurrentUrl();
  return url && getUrlOrigin(url);
};

type OnActivatedListener = Parameters<
  typeof chrome.tabs.onActivated.addListener
>[0];

export const onCurrentUrlChange = (callback: () => void) => {
  const onActivatedListener: OnActivatedListener = async () => {
    callback();
  };

  chrome.tabs.onActivated.addListener(onActivatedListener);
  return () => chrome.tabs.onActivated.removeListener(onActivatedListener);
};

export const navigateToPage = async (path: string) => {
  const tab = await getCurrentTab();

  const navigateToPageScript = () => {
    // const anchor = document.createElement('a')
    // anchor.href = path
    window.location.pathname = path;
  };

  if (tab.id) {
    chrome.scripting.executeScript({
      func: navigateToPageScript,
      target: { tabId: tab.id },
    });
  }
};
