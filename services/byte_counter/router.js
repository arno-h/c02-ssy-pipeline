const express = require('express');
const router = express.Router();

let totalByteCount = 0;

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
    const bytes = req.body.bytes;
    totalByteCount += bytes;
    res.status(204); // empty response
    res.end();
}


router.get('/', getTotalByteCount);

function getTotalByteCount(req, res) {
    const result = {
        total_bytes: totalByteCount
    };
    res.json(result);
}

module.exports = router;
