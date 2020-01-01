///// Update HTML with Internationalisation
////////////////////////////////
if (browser.i18n.getUILanguage().includes("fr")) {
    browser.browserAction.setPopup({ popup: "../data/html/popup_menu-fr.html" });
} else {
    browser.browserAction.setPopup({ popup: "../data/html/popup_menu.html" });
}

function sendMessageToContentScript(jsonMessage) {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, jsonMessage, function (response) { });
    });
}


