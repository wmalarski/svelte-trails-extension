const getUrlOrigin = (url: string) => {
  return new URL(url).origin;
};

export const getCurrentUrl = async () => {
  const args = { active: true, lastFocusedWindow: true };
  const tabs = await chrome.tabs.query(args);
  const url = tabs[0]?.url;
  return url;
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
