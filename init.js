const Axios = require('axios');
const axios = Axios.create({validateStatus: null});

/* init()
 * Diese Funktion wird direkt nach dem Server-Start automatisch aufgerufen.
 * Sie kann dazu benützt werden, Services zu konfigurieren.
 */
async function init() {

}

module.exports = init;
