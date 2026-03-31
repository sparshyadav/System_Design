const express = require("express");
const axios = require("axios");

const app = express();

const cache = {};

const origin = 'http://localhost:3000';

app.use(async (req, res) => {
    const key = req.originalUrl;

    if (cache[key]) {
        console.log("CDN CACHE HIT:", key);
        return res.send(cache[key]);
    }

    console.log("CDN CACHE MISS: ", key);

    try {
        const response = await axios({
            method: req.method,
            url: origin + req.originalUrl,
            data: req.body
        })

        cache[key] = response.data;

        return res.send(response.data);
    }
    catch (err) {
        res.status(500).send("CDN Error");
    }
});

app.listen(3004, () => {
    console.log("CDN Server running on port 3004");
})