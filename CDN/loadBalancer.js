const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

let servers = [
    { url: 'http://localhost:3001', alive: true },
    { url: 'http://localhost:3002', alive: true },
    { url: 'http://localhost:3003', alive: true }
];

let current = 0;

setInterval(async () => {
    for (let server of servers) {
        try {
            await axios.get(`${server.url}/health`);
            server.alive = true;
        }
        catch (err) {
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
            console.log("Incoming request:", req.method, req.originalUrl);
            console.log("Forwarding to:", server.url + req.originalUrl);
            try {
                const response = await axios({
                    method: req.method,
                    url: server.url + req.originalUrl,
                    data: req.body,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                return res.send(response.data);
            }
            catch (err) {
                console.log("Request failed for:", server.url);
                
                // If the upstream server actually responded with an error (like 404 or 400), 
                // we should forward that error to the client instead of trying the next server.
                if (err.response) {
                    return res.status(err.response.status).send(err.response.data);
                }
            }
        }

        attempts++;
    }

    res.status(500).send("No Servers Available");
});

app.listen(3000, () => {
    console.log("Load Balancer is running on port 3000");
})