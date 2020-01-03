browser.browserAction.setPopup({ popup: browser.i18n.getUILanguage().includes("fr") ? "../data/html/popup_menu-fr.html" : "../data/html/popup_menu.html" });

function updateVideosLinks() {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {"action":"add-video"}, function (response) { 
            console.log(response) 
        });
    });
}

function updateLoadableInfo(requestDetails) {
    console.log("Loading: " + requestDetails.url);
    updateVideosLinks()
    return requestDetails.url
}

browser.runtime.onMessage.addListener(request => {
    updateVideosLinks()
});
var filter = { urls: ['<all_urls>'] }
var extraInfoSpec = ['responseHeaders']

browser.webRequest.onCompleted.addListener(function(details){
    console.log(`Woo got a request, here's the details!`, details)
}, filter, extraInfoSpec) 


browser.webRequest.onBeforeRequest.addListener(
    updateLoadableInfo,
    {urls: ["https://media.licdn.com/*", "https://dms.licdn.com/*"], 
    types: ["media"]}
);
