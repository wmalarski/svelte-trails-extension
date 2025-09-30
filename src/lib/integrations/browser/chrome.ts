export const isChromeExtension = () => {
  // biome-ignore lint/suspicious/noExplicitAny: needed
  const app = (chrome as any).app;
  return app ? app.isInstalled : true;
};
