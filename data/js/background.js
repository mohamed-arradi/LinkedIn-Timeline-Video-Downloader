const ContextMenuId = {
    addVideoMenu: 'addVideosLinkMenu'
}

function updateVideosLinks() {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {"action":"add-video"}, function (response) {});
    });
}

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

browser.browserAction.setPopup({ popup: browser.i18n.getUILanguage().includes("fr") ? "../data/html/popup_menu-fr.html" : "../data/html/popup_menu.html" });
