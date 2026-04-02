const express = require("express");
const app = express();

const queue = [];

app.use(express.json());

app.post("/order", (req, res) => {
    const order = req.body;
    queue.push(order);

    res.send("Order Received");
});

setInterval(() => {
    if (queue.length > 0) {
        const job = queue.shift();
        console.log("Processing Order: ", job);
    }
}, 2000);

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})
