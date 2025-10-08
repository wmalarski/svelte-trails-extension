console.log("BACKGROUND");

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  console.log("BACKGROUND", msg);
  if (msg.text && msg.text === "report_back") {
    const element = document.querySelector("form[action^='/map']") as
      | HTMLFormElement
      | undefined;

    console.log("BACKGROUND", element);

    if (!element) {
      sendResponse("not_found");
      return;
    }

    /* Call the specified callback, passing 
           the web-pages DOM content as argument */
    sendResponse(element.action);
  }
});
