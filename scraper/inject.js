const fs = require("fs");
const path = require("path");
const publicJsonPath = path.join(__dirname, "..", "public", "er_checklist.json");
var existing = JSON.parse(fs.readFileSync(publicJsonPath).toString());
var toInject = JSON.parse(fs.readFileSync(path.join(__dirname, "scraped.json")).toString());

if (!existing["QuestLines"]) {
    existing["QuestLines"] = {};
}

for (var key of Object.keys(toInject)) {
    if (existing["QuestLines"][key]) {
        console.log("Replacing", key);
        delete existing["QuestLines"][key];
    } else {
        console.log("Inserting", key);
    }
    existing["QuestLines"][key] = toInject[key];
}

fs.writeFileSync(publicJsonPath, JSON.stringify(existing));