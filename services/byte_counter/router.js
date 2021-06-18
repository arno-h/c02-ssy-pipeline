const express = require('express');
const router = express.Router();
const Axios = require('axios');
const logic = require('./logic');

router.post('/', newLogEntry);
/*
{
        host: "34.5.6.7",
        date: "2018-06-13T23:12:11",
        request: "/url",
        status: 200,
        bytes: 35533,  <<<<<<
        referrer: "...",
        userAgent: "Mozilla..."
}
*/
function newLogEntry(req, res) {
    logic.increaseCount(req.body);
    res.status(204); // empty response
    res.end();
}


router.get('/', getTotalByteCount);

function getTotalByteCount(req, res) {
    const result = {
        total_bytes: logic.totalByteCount
    };
    res.json(result);
}

// Initial delay, because server is still in setup phase
setTimeout(pollQueue, 50);

async function pollQueue() {
    // repeat function every 800ms
    setTimeout(pollQueue, 800);

    const response = await Axios.delete("http://localhost:3000/queue/first");
    if (response.status === 200) {
        logic.increaseCount(response.data);
    } else {
        console.log("queue is empty");
    }
}

module.exports = router;
