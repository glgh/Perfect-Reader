"use strict";

function getSelectionInfo() {
  var valid = false, x1 = 0, y1 = 0, x2 = 0, y2 = 0;
  var sel = window.getSelection()
  if (sel.rangeCount > 0){
    var rangeRects = sel.getRangeAt(0).getClientRects();
    if (rangeRects.length > 0){ //fail if zero
      valid = true;
      var rectFirst = rangeRects[0];
      x1 = rectFirst.left;
      y1 = rectFirst.top;
      var rectLast = rangeRects[rangeRects.length - 1];
      x2 = rectLast.right;
      y2 = rectLast.bottom;
    }
  }
  return {valid: valid, collapsed: sel.isCollapsed, x1: x1, y1: y1, x2: x2, y2: y2};
}

function sendSelectionInfo() {
  // when an already selected area is clicked, the mouseup event will be fired
  // before deselection is resolved
  // this returns an incorrect isCollapsed value
  // so use a 0ms timeout to wait for (possible) deselction to finish
  setTimeout(function(){
    chrome.runtime.sendMessage(getSelectionInfo(), function(response) {});
  }, 0);
}

// Side note: use event listener, not inline event handlers (e.g., "onclick")
// new inline events could overwrite any existing inline event handlers
document.addEventListener("mouseup", function(event) {
  sendSelectionInfo();
});

document.addEventListener("keyup", function(event) {
  sendSelectionInfo();
});

window.addEventListener("resize", function(event) {
  sendSelectionInfo();
});
