const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Response from Server 1");
})

app.post("/user", (req, res) => {
    res.send("User created successfully via Server 1");
})

app.listen(3001, () => {
    console.log("Server 1 is running on port 3001");
})