"use strict";
exports.__esModule = true;
var assert_1 = require("assert");
function blueHeartPattern(lines) {
    var result = "";
    for (var i = 1; i <= lines; i++) {
        result += "💙 ".repeat(i).trim() + "\n";
    }
    return result.trim();
}
var expected = "\uD83D\uDC99\n\uD83D\uDC99 \uD83D\uDC99\n\uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99\n\uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99\n\uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99\n\uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99\n\uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99\n\uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99 \uD83D\uDC99";
assert_1["default"].strictEqual(blueHeartPattern(8), expected);
console.log("Tests passed");
