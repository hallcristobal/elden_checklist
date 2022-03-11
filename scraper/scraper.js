const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const minify = require('html-minifier').minify;

const steps = [];
const startID = 7001;
const name = "Dung Eater";

function readFile(path) {
    return new Promise((res, _rej) => {
        try {
            fs.readFile(path, (err, data) => {
                if (err)
                    throw err;
                res(data);
            });
        } catch (e) {
            throw e;
        }
    })
}

async function run() {
    const postContent = minify(`<main>${(await readFile(path.join(__dirname, "scrape.html"))).toString()}</main>`, { collapseWhitespace: true });
    const $ = cheerio.load(postContent, { decodeEntities: false, ignoreWhitespace: true, normalizeWhitespace: true });

    $("a[href^='/'], img[src^='/']").each(function (i, _this) {
        const $this = $(_this);
        if ($this.attr("href")) {
            $this.attr("href", `https://eldenring.wiki.fextralife.com${$this.attr("href")}`);
        }
        if ($this.attr("src")) {
            $this.attr("src", `https://eldenring.wiki.fextralife.com${$this.attr("src")}`);
        }
    });

    $("main>ul>li").each((i, e) => {
        steps.push({
            ID: startID + i,
            Name: `Step ${i + 1}`,
            Description: $(e).html()
        });
    });

    var outObj = {};
    outObj[name] = steps;
    fs.writeFileSync(path.join(__dirname, "scraped.json"), Buffer.from(JSON.stringify(outObj, null, 2)));
}

run();