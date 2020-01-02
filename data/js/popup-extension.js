'use strict';

function notifyExtension(event) {

    var targetElement = event.target || event.srcElement;
 
    if (targetElement.id === "add_video_button") {
        addVideoLinks();
    } else if (targetElement.id === "support_us") {
        browser.runtime.sendMessage({ type: "donation" });
    } else if (targetElement.id === "report_issue") {
        window.location.href = "mailto:hello@arradimohamed.fr";
    }
}

function addVideoLinks() {
    browser.runtime.sendMessage({
        "action": "videolink"
    });
}
window.addEventListener('click', notifyExtension);
window.addEventListener('DOMContentLoaded', addVideoLinks);


