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

const cache = {};

app.post("/user", (req, res) => {
    const newUser = req.body;
    const updatedData = primaryDB.write(newUser);
    replicate();

    delete cache["users"];


    res.send({
        messsage: "User Created Successfully(Primary DB)",
        data: updatedData
    })
});

app.get("/users", (req, res) => {
    if(cache["users"]){
        console.log("Cache HI");

        return res.send({
            source: "Cache",
            data: cache["users"]
        })
    }

    console.log("Cache Miss");

    const useReplica1 = Math.random() > 0.5;
    const data = useReplica1 ? replica1.read() : replica2.read();

    cache["users"]=data;

    res.send({
        source: useReplica1 ? "Replica 1" : "Replica 2",
        data
    })
});

app.get("/health", (req, res) => {
    res.send("OK");
});

app.listen(3002, () => {
    console.log("Server running on port 3002");
})