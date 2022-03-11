const fs = require("fs");
const path = require("path");
const publicJsonPath = path.join(__dirname, "..", "public", "er_checklist.json");
var existing = JSON.parse(fs.readFileSync(publicJsonPath).toString());
var toInject = JSON.parse(fs.readFileSync(path.join(__dirname, "scraped.json")).toString());
for (var key of Object.keys(toInject)) {
    if (existing[key])
        delete existing[key];
    existing[key] = toInject[key];
}

fs.writeFileSync(publicJsonPath, JSON.stringify(existing, null, 2));