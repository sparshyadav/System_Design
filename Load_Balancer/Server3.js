const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Response from Server 3");
})

app.post("/user", (req, res) => {
    res.send("User created successfully via Server 3");
})

app.listen(3003, () => {
    console.log("Server 3 is running on port 3003");
})