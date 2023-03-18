const fs = require("fs");
const path = require("path");
const publicJsonPath = path.join(__dirname, "..", "public", "er_checklist.json");
var existing = JSON.parse(fs.readFileSync(publicJsonPath).toString());
var toInject = JSON.parse(fs.readFileSync(path.join(__dirname, "scraped.json")).toString());

if (!existing["All Sorceries"]) {
    existing["All Sorceries"] = [];
}

existing["All Sorceries"] = toInject["All Sorceries"];

// for (var key of Object.keys(toInject)) {
//     if (existing["All Sorceries"][key]) {
//         console.log("Replacing", key);
//         delete existing["All Sorceries"][key];
//     } else {
//         console.log("Inserting", key);
//     }
//     existing["All Sorceries"][key] = toInject[key];
// }

fs.writeFileSync(publicJsonPath, JSON.stringify(existing));