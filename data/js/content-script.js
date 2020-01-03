"use strict";

browser.runtime.onMessage.addListener(request => {
    addVideoLink();
    return Promise.resolve({response: "success"});
});

// Small hack to avoid duplicate
function cleanUpDuplicate(videoID, element) {
    var numberElements = Array.from(element.querySelectorAll("#" + videoID));
    if (numberElements.length > 1 && numberElements.length < 3) {
        numberElements[0].parentNode.removeChild(numberElements[0]);
    }
}

function addVideoLink() {

    var feedCardClass = "relative ember-view";
    var allVideos = Array.from(document.getElementsByClassName(feedCardClass));

        allVideos.forEach(element => {
            if (element !== undefined &&
                element.className == feedCardClass) {

                var data = Array.from(element.getElementsByTagName("artdeco-dropdown-content"));

                data.forEach(subElement => {
                    
                    var dropDown = subElement.getElementsByClassName("artdeco-dropdown__content-inner")[0];
                    var listOptions = dropDown.getElementsByTagName("li");
                    var videoID = "video_dwl";
                    var videoElements = element.querySelectorAll('[id^="vjs_video_"][id$="_html5_api"]');
                    
                    if (listOptions !== undefined &&
                        videoElements !== undefined &&
                        videoElements.length > 0) {
                        var listOptionsArray = Array.from(listOptions);

                        if (listOptionsArray[0].className.startsWith("option")) {

                            var parent = dropDown.getElementsByTagName("ul")[0];
                            var li = parent.getElementsByTagName("li")[0];
                            var liHTML = li;

                            liHTML.classList.remove("option-save");
                            
                            var elementIsNotPresent = dropDown.querySelector("#" + videoID) === null;
                            var numberElements = Array.from(dropDown.querySelectorAll("#" + videoID));

                            if (elementIsNotPresent === true && numberElements.length == 0) {
                                liHTML.id = videoID;
                                liHTML.getElementsByTagName("span")[1].innerHTML = "It will open a new window to download it"
                                liHTML.getElementsByTagName("li-icon")[0].innerHTML = ""
                                liHTML.getElementsByTagName("li-icon")[0].innerHTML = "<li-icon aria-hidden=\"true\" type=\"ribbon-icon\" class=\"flex-shrink-zero mr2\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" class=\"svg-icon\" viewBox=\"0 0 20 20\"><path d=\"M17.927,5.828h-4.41l-1.929-1.961c-0.078-0.079-0.186-0.125-0.297-0.125H4.159c-0.229,0-0.417,0.188-0.417,0.417v1.669H2.073c-0.229,0-0.417,0.188-0.417,0.417v9.596c0,0.229,0.188,0.417,0.417,0.417h15.854c0.229,0,0.417-0.188,0.417-0.417V6.245C18.344,6.016,18.156,5.828,17.927,5.828 M4.577,4.577h6.539l1.231,1.251h-7.77V4.577z M17.51,15.424H2.491V6.663H17.51V15.424z\"></path></svg></li-icon>"
                                
                                var videoElements = element.querySelectorAll('[id^="vjs_video_"][id$="_html5_api"]');
                               
                                if (videoElements.length > 0) {
                                    var videoElemSrc = videoElements[0].src;
                                    var innerHTMLText = "<a href=" + videoElemSrc + ">Download Embedded Video</a>"
                                    liHTML.getElementsByTagName("span")[0].innerHTML = innerHTMLText;
                                }

                                parent.insertAdjacentHTML('beforeend', liHTML.outerHTML);
                            }
                            cleanUpDuplicate(videoID, dropDown);
                        }
                    }
                });
            }
        });
}
