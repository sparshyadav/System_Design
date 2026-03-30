const express = require("express");
const primaryDB = require("./primaryDB");
const replica1 = require("./replica1");
const replica2 = require("./replica2");

const app = express();

app.use(express.json());

const replicate = () => {
    const data = primaryDB.getAll();
    replica1.sync(data);
    replica2.sync(data);
}

app.post("/user", (req, res) => {
    const newUser = req.body;
    const updatedData = primaryDB.write(newUser);
    replicate();

    res.send({
        messsage: "User Created Successfully(Primary DB)",
        data: updatedData
    })
});

app.get("/users", (req, res) => {
    const useReplica1 = Math.random() > 0.5;
    const data = useReplica1 ? replica1.read() : replica2.read();

    res.send({
        source: useReplica1 ? "Replica 1" : "Replica 2",
        data
    })
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
})