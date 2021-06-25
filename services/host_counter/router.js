const express = require('express');
const router = express.Router();

const hosts = {};

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
    const host = req.body.host;

    if (host in hosts) {
        hosts[host]++;
    } else {
        hosts[host] = 1;
    }

    res.status(204).end();
}


router.get('/', getHostCount);

function getHostCount(req, res) {
    res.json(hosts);
}

module.exports = router;
