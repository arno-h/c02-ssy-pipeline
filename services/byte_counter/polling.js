const Axios = require('axios');
const axios = Axios.create({validateStatus: null});
const logic = require('./logic');

// initial call is done by init() function in init.js
async function pollQueue() {
    // repeat function every 1400ms
    setTimeout(pollQueue, 1400);

    const response = await axios.delete("http://localhost:3000/queue/first");
    if (response.status === 200) {
        logic.increaseCount(response.data);
    } else {
        console.log("queue is empty");
    }
}

module.exports = pollQueue;
