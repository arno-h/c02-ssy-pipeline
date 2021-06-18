const express = require('express');
const router = express.Router();

const queue = [];

router.post('/', newMessage);

function newMessage(req, res) {
    const msg = req.body;
    queue.push(msg);
    res.status(204); // empty response
    res.end();
}

router.delete('/first', getMessage);

function getMessage(req, res) {
    const msg = queue.shift();
    res.json(msg);
}

module.exports = router;
