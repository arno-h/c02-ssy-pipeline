const Request = require('request');
const fs = require('fs');
const date = require('date-and-time');

// Default: 1 Eintrag pro Sekunde (1000ms)
const postDelay = process.argv.length < 3 ? 1000 : Number(process.argv[2]);

// Wir lesen die gesamte Log-Datei synchron ein und splitten sie gleich in ein Array von Zeilen auf
const logLines = fs.readFileSync(__dirname + '/../example.log').toString().split('\n');

// Start mit der ersten Zeile
postLogLine(0);

function postLogLine(lineNr) {
    let logEntry = clf2JSON(logLines[lineNr]);
    // An die Queue posten -- wir ignorieren Fehlermeldungen
    Request.post({
        url: 'http://localhost:3000/queue/',
        json: { msg: logEntry }
    });

    // Solange wir noch Zeilen haben: mit Delay erneut aufrufen
    if (lineNr < logLines.length - 1) {
        setTimeout(function() { postLogLine(lineNr + 1)}, postDelay);
    }
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