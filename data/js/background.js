///// Update HTML with Internationalisation
////////////////////////////////

browser.browserAction.setPopup({ popup: browser.i18n.getUILanguage().includes("fr") ? "../data/html/popup_menu-fr.html" : "../data/html/popup_menu.html" });

browser.runtime.onMessage.addListener(request => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {"action":"add-video"}, function (response) { 
            console.log(response) 
        });

    });
});