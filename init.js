const Axios = require('axios');
const axios = Axios.create({validateStatus: null});
const byteCounterQueuePolling = require('./services/byte_counter/polling');

/* init()
 * Diese Funktion wird direkt nach dem Server-Start automatisch aufgerufen.
 * Sie kann dazu benützt werden, Services zu konfigurieren.
 */
async function init() {
    // await byteCounterQueuePolling();
    await axios.post('http://localhost:3000/pubsub/subscribe',
        {url: "http://localhost:3000/byte_counter/"}
    );
    await axios.post('http://localhost:3000/pubsub/subscribe',
        {url: "http://localhost:3000/host_counter/"}
    );
}

module.exports = init;
