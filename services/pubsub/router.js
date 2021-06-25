const express = require('express');
const router = express.Router();
const Axios = require('axios');
const axios = Axios.create({validateStatus: null});

const subscribers = [];

// 1x subscribe endpoint
router.post('/subscribe', newSubscriber);
/*
    {
        "url": "http://...."
    }
 */
function newSubscriber(req, res) {
    const url = req.body.url;
    subscribers.push(url);
    res.status(204).end();
}

// 1x publish endpoint
router.post('/publish', newMessage);

async function newMessage(req, res) {
    const message = req.body;
    for (let subscriber of subscribers) {
        await axios.post(subscriber, message);
    }
    res.status(204).end();
}

module.exports = router;
