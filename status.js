"use strict";

const THRESHOLD_HIT = 0.1;    //less than threshold: considered hit
const THRESHOLD_DECIMAL = 10; //less than threshold: show one digit decimal
const COLOR_HIT = "SeaGreen";
const COLOR_MISS = "Crimson";
const COLOR_DEFAULT = "Black";
const ICON_HIT = "images/hit.png";
const ICON_MISS = "images/miss.png";
const ICON_DEFAULT = "images/icon.png";

function selectionStatusDisplay(selection) {
  var dx = Math.abs(selection.x1 - selection.x2);
  var badgeText, badgeColor, statusIcon;
  if ((!selection.valid) || (selection.collapsed)) {
    badgeText = "";
    badgeColor = COLOR_DEFAULT;
    statusIcon = ICON_DEFAULT;
  } else if (dx < THRESHOLD_HIT) {
    badgeText = "0";
    badgeColor = COLOR_HIT;
    statusIcon = ICON_HIT;
  } else {
    if (dx < THRESHOLD_DECIMAL) {
      badgeText = dx.toFixed(1).toString().replace(/.0+$/, ''); //strip off ending .0
    } else {
      badgeText = dx.toFixed(0).toString();
    }
    badgeColor = COLOR_MISS;
    statusIcon = ICON_MISS;
  }
  return {badgeText: badgeText, badgeColor: badgeColor, statusIcon: statusIcon}
}
