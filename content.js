//Get the begin and end coordinates of selction
function getSelectionEnds() {
    var success = false, x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    var sel = window.getSelection()
    if (sel.rangeCount > 0){
        var range_rects = sel.getRangeAt(0).getClientRects();
        if (range_rects.length > 0){ //fail if zero
            success = true;
            var rect_first = range_rects[0];
            x1 = rect_first.left;
            y1 = rect_first.top;
            var rect_last = range_rects[range_rects.length - 1];
            x2 = rect_last.right;
            y2 = rect_last.bottom;
        }
    }
    return {success: success, isCollapsed: sel.isCollapsed, x1: x1, y1: y1, x2: x2, y2: y2};
}

function sendSelectionStatus() {
    // when an already selected area is clicked, the mouseup event will be fired
    // before deselection is resolved
    // this returns an incorrect isCollapsed value
    // so use a 0ms timeout to wait for (possible) deselction to finish
    setTimeout(function(){
        chrome.runtime.sendMessage(getSelectionEnds(), function(response) {});
    }, 0);
}

// A side note: use event listener, not inline event handlers (e.g., "onclick")
// new inline events could overwrite any existing inline event handlers
document.addEventListener("mouseup", function(event) {
    sendSelectionStatus();
});

window.addEventListener("resize", function(event) {
    sendSelectionStatus();
});
