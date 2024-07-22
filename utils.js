const fs = require("node:fs");
const path = require("node:path");

function getInputFile(fname) {
    try {
        var data = fs.readFileSync(path.resolve(fname), "utf8");
    } catch (err) {
        console.log(err);
    }
    return data;
}

module.exports = {
    getInputFile,
};
