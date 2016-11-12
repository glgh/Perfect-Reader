QUnit.test("Reality Check", function(assert) {
  assert.ok( 2 + 2 === 4, "2 plus 2 equals 4." );
});

QUnit.test("Selection - Valid Perfect", function(assert) {
    var selection = {valid: true, collapsed: false, x1: 0, x2: 0, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "0", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_HIT, 'Badge Color');
    assert.equal(display.statusIcon, ICON_HIT, 'Status Icon');

    var selection = {valid: true, collapsed: false, x1: 0, x2: 0.04, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "0", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_HIT, 'Badge Color');
    assert.equal(display.statusIcon, ICON_HIT, 'Status Icon');
});

QUnit.test("Selection - Valid Imperfect - Decimal Point", function(assert) {
    var selection = {valid: true, collapsed: false, x1: 0, x2: 5.9, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "5.9", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_MISS, 'Badge Color');
    assert.equal(display.statusIcon, ICON_MISS, 'Status Icon');

    var selection = {valid: true, collapsed: false, x1: 0, x2: 4.1333, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "4.1", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_MISS, 'Badge Color');
    assert.equal(display.statusIcon, ICON_MISS, 'Status Icon');

    var selection = {valid: true, collapsed: false, x1: 0, x2: 0.1001, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "0.1", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_MISS, 'Badge Color');
    assert.equal(display.statusIcon, ICON_MISS, 'Status Icon');
});

QUnit.test("Selection - Valid Imperfect - No Decimal Point", function(assert) {
    var selection = {valid: true, collapsed: false, x1: 0, x2: 35, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "35", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_MISS, 'Badge Color');
    assert.equal(display.statusIcon, ICON_MISS, 'Status Icon');

    var selection = {valid: true, collapsed: false, x1: 0, x2: 3.0, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "3", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_MISS, 'Badge Color');
    assert.equal(display.statusIcon, ICON_MISS, 'Status Icon');

    var selection = {valid: true, collapsed: false, x1: 0, x2: 9.04, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "9", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_MISS, 'Badge Color');
    assert.equal(display.statusIcon, ICON_MISS, 'Status Icon');

    var selection = {valid: true, collapsed: false, x1: 0, x2: 9.99, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "10", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_MISS, 'Badge Color');
    assert.equal(display.statusIcon, ICON_MISS, 'Status Icon');
});

QUnit.test("Selection - Invalid", function(assert) {
    var selection = {valid: false, collapsed: false, x1: 0, x2: 5, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_DEFAULT, 'Badge Color');
    assert.equal(display.statusIcon, ICON_DEFAULT, 'Status Icon');

    var selection = {valid: false, collapsed: true, x1: 0, x2: 5, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_DEFAULT, 'Badge Color');
    assert.equal(display.statusIcon, ICON_DEFAULT, 'Status Icon');

    var selection = {valid: true, collapsed: true, x1: 0, x2: 5, y1: 2, y2: 3};
    var display = selectionStatusDisplay(selection)
    assert.equal(display.badgeText, "", 'Badge Text');
    assert.equal(display.badgeColor, COLOR_DEFAULT, 'Badge Color');
    assert.equal(display.statusIcon, ICON_DEFAULT, 'Status Icon');
});
