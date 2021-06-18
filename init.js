const Axios = require('axios');
const axios = Axios.create({validateStatus: null});
const byteCounterQueuePolling = require('./services/byte_counter/polling');

/* init()
 * Diese Funktion wird direkt nach dem Server-Start automatisch aufgerufen.
 * Sie kann dazu benützt werden, Services zu konfigurieren.
 */
async function init() {
    await byteCounterQueuePolling();
}

module.exports = init;
