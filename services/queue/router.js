const express = require('express');
const router = express.Router();

const queue = [];

router.post('/', newMessage);

function newMessage(req, res) {
    if (queue.length > 5) {
        res.status(429).end();  // too many requests
        return;
    }

    const msg = req.body;
    queue.push(msg);
    res.status(204); // empty response
    res.end();
}

router.delete('/first', getMessage);

function getMessage(req, res) {
    if (queue.length > 0) {
        const msg = queue.shift();
        res.json(msg);
    } else {
        res.status(204).end();
    }
}

module.exports = router;
