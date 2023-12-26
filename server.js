const path = require("path");
const express = require("express");

const app = new express();

app.use("/static", express.static(path.resolve(__dirname, "static")))
app.get("/sw_cache_ex.js", (req, res) => {
    res.type('application/javascript');
    return res.sendFile(path.resolve(__dirname, "sw_cache_ex.js"));
});
app.get("/*", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(8000, () => {
    console.log('server listening on 5000');

})