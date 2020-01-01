'use strict';

function notifyExtension(event) {

    var targetElement = event.target || event.srcElement;
    
    if (targetElement.id === "add_video_button") {
        console.log("action send")
           addVideoLinks();
    } else if (targetElement.id === "support_us") {
        browser.runtime.sendMessage({ type: "donation" });
    } else if (targetElement.id === "report_issue") {
        window.location.href = "mailto:hello@arradimohamed.fr";
    }
}

function addVideoLinks() {
    browser.runtime.sendMessage({
        "action": 'add-video'
    });
}

window.addEventListener('DOMContentLoaded', addVideoLinks);


