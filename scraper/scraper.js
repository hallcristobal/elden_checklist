const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const minify = require('html-minifier').minify;

const steps = [];
const startID = 99001;
const name = "All Sorceries";

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

// async function run2() {
//     const postContent = minify(`<main>${(await readFile(path.join(__dirname, "scrape.html"))).toString()}</main>`, { collapseWhitespace: true });
//     const $ = cheerio.load(postContent, { decodeEntities: false, ignoreWhitespace: true, normalizeWhitespace: true });

//     const outObj = {};
//     const steps = {};
//     $("a[href^='/'], img[src^='/']", $0).each(function (i, _this) {
//         const $this = $(_this);
//         if ($this.attr("href")) {
//             $this.attr("href", `https://eldenring.wiki.fextralife.com${$this.attr("href")}`);
//         }
//         if ($this.attr("src")) {
//             $this.attr("src", `https://eldenring.wiki.fextralife.com${$this.attr("src")}`);
//         }
//     });

//     $("tr", $0).each((i, e) => {
//         const tds = $("td", e),
//             name = $(tds[0]).text(),
//             img = $("img", tds[0]).attr("src"),
//             src = $("a", tds[0]).attr("href"),
//             effect = $(tds[1]).text(),
//             fp = $(tds[2]).text(),
//             int = $(tds[4]).text(),
//             location = $("ul>li", tds[9]).html();

//         steps.push({
//             ID: startID + i,
//             Name: name,
//             Image: img,
//             link: src,
//             effect,
//             fp,
//             int,
//             Description: location
//         });
//     });
//     outObj[name] = steps;
//     console.log(outObj);
//     fs.writeFileSync(path.join(__dirname, "scraped.json"), Buffer.from(JSON.stringify(outObj, null, 2)));
// }

run();