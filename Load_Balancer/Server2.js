const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Response from Server 2");
})

app.post("/user", (req, res) => {
    res.send("User created successfully via Server 2");
})

app.listen(3002, () => {
    console.log("Server 2 is running on port 3002");
})