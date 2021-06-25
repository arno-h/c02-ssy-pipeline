const Axios = require('axios');
const axios = Axios.create({validateStatus: null});
const logs = require('./logParser');

// Default: 1 Eintrag pro Sekunde (1000ms)
let postDelay = process.argv.length < 3 ? 1000 : Number(process.argv[2]);

// Wir lesen die gesamte Log-Datei synchron ein und splitten sie gleich in ein Array von Zeilen auf
const logLines = logs.load('../example.log');

// Start mit der ersten Zeile
publishLogLine(0);

function publishLogLine(lineNr) {
    let logEntry = logs.clf2JSON(logLines[lineNr]);

    axios.post('http://127.0.0.1:3000/pubsub/publish/', logEntry).then();   // Fehler werden ignoriert

    if (lineNr < logLines.length - 1) {
        setTimeout(publishLogLine, postDelay, lineNr + 1);
    }
}
