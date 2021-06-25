const date = require('date-and-time');
const fs = require('fs');

/**
 * Liest Logfile ein und retourniert Array von Zeilen
 */
function load(filepath) {
    const path = __dirname + '/' + filepath;
    return fs.readFileSync(path).toString().split('\n');
}

/**
 * Einfacher Parser, um einen CLF-Log-Eintrag in JSON zu transformieren
 */
function clf2JSON(line) {
    const re = /([^ ]*) - - \[([^\]]*) \+\d+\] "([^"]*)" ([^ ]*) ([^ ]*) "([^"]*)" "([^"]*)"/;
    const matches = line.match(re);
    if (!matches) {
        return {};
    }
    return {
        host: matches[1],
        date: date.parse(matches[2], 'DD/MMM/YYYY:HH:mm:ss'),
        request: matches[3],
        status: Number(matches[4]),
        bytes: Number(matches[5]) || 0,
        referrer: matches[6],
        userAgent: matches[7]
    };
}

module.exports = {
    load,
    clf2JSON
}