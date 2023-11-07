const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://pasta:mymumzgangsta@cluster0.kvabqh5.mongodb.net/shop?retryWrites=true&w=majority")
    .then(() => {
    console.log("mongo db running")
}).catch((err) => {
        console.log(err);
    })

app.listen(5000, () => {
    console.log("app running");
})