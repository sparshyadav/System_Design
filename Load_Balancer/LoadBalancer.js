const express = require("express");
const axios = require("axios");

const app = express();

let servers = [
    { url: 'http://localhost:3001', alive: true },
    { url: 'http://localhost:3002', alive: true },
    { url: 'http://localhost:3003', alive: true },
];

let current = 0;

setInterval(async () => {
    for (let server of servers) {
        try {
            await axios.get(server.url);
            server.alive = true;
        } catch (err) {
            server.alive = false;
        }
    }
}, 5000);

app.use(async (req, res) => {
    let attempts = 0;

    while (attempts < servers.length) {
        const server = servers[current];
        current = (current + 1) % servers.length;

        if (server.alive) {
            try {
                const response = await axios({
                    method: req.method,
                    url: server.url + req.originalUrl,
                    data: req.body,
                    headers: req.headers
                });
                return res.send(response.data);
            } catch (err) {
                server.alive = false;
            }
        }

        attempts++;
    }

    res.status(500).send("No Servers Available");
});

app.listen(3000, () => {
    console.log("Load Balancer is running on port 3000");
});