const THRESHOLD_HIT = 0.1;    //less than threshold: considered hit
const THRESHOLD_DECIMAL = 10; //less than threshold: show one digit decimal
const COLOR_HIT = "SeaGreen";
const COLOR_MISS = "Crimson";
const ICON_HIT = "hit.png";
const ICON_MISS = "miss.png";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var dx = Math.abs(request.x1 - request.x2);
        var badge_text, badge_color, status_icon;
        if (dx < THRESHOLD_HIT) {
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
        chrome.browserAction.setBadgeText({text: badge_text});
        chrome.browserAction.setBadgeBackgroundColor({color: badge_color});
        chrome.browserAction.setIcon({path: status_icon});

    }
);
