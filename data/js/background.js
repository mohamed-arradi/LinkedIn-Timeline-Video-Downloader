const ContextMenuId = {
    addVideoMenu: 'addVideosLinkMenu'
}

function updateVideosLinks() {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { action : "videolink" }, function (response) { });
    });
}

var filter = {
    url: [{ hostContains: "linkedin.com" }]
}

function logOnDOMContentLoaded(details) {
    updateVideosLinks();
}

browser.runtime.onMessage.addListener(function (data) {
    if (data.action === "donation") {
        browser.tabs.create({
            url: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RUFXEXSGY7UAY&source=url"
        });
    } else if (data.action === "videolink") {
        updateVideosLinks()
    } else {
        updateVideosLinks();
    }
});

browser.webNavigation.onDOMContentLoaded.addListener(logOnDOMContentLoaded, filter);

/////////// Context Menu Management //////
/////////////////////////////////////////

browser.contextMenus.create({
    id: ContextMenuId.addVideoMenu,
    title: browser.i18n.getMessage("contextMenuItemTranslation"),
    contexts: ["all"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == ContextMenuId.addVideoMenu) {
        updateVideosLinks()
    }
});

///// Main Frame Loading ///////
browser.browserAction.setPopup({ popup: browser.i18n.getUILanguage().includes("fr") ? "../data/html/popup_menu-fr.html" : "../data/html/popup_menu.html" });
