const THRESHOLD_HIT = 0.1;    //less than threshold: considered hit
const THRESHOLD_DECIMAL = 10; //less than threshold: show one digit decimal
const COLOR_HIT = "SeaGreen";
const COLOR_MISS = "Crimson";
const COLOR_DEFAULT = "";
const ICON_HIT = "hit.png";
const ICON_MISS = "miss.png";
const ICON_DEFAULT = "icon.png";

// Note: chrome.runtime.onMessage only receive message from *this* erxtension
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        var dx = Math.abs(message.x1 - message.x2);
        var badge_text, badge_color, status_icon;
        if ((!message.success) || (message.isCollapsed)) {
            badge_text = "";
            badge_color = COLOR_DEFAULT;
            status_icon = ICON_DEFAULT;
        } else if (dx < THRESHOLD_HIT) {
            badge_text = "0";
            badge_color = COLOR_HIT;
            status_icon = ICON_HIT;
        } else {
            if (dx < THRESHOLD_DECIMAL) {
                badge_text = dx.toFixed(1).toString().replace(/.0+$/, ''); //strip off ending .0
            } else {
                badge_text = dx.toFixed(0).toString();
            }
            badge_color = COLOR_MISS;
            status_icon = ICON_MISS;
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            var tab = tabs[0]
            chrome.browserAction.setBadgeText({text: badge_text, tabId: tab.id});
            chrome.browserAction.setBadgeBackgroundColor({color: badge_color, tabId: tab.id});
            chrome.browserAction.setIcon({path: status_icon, tabId: tab.id});
        });

    }
);
