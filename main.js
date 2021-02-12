"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
function loadData(fileName) {
    var items = fs_1.readFileSync(fileName).toString().split("\n");
    console.log(items);
}
loadData("data.txt");
