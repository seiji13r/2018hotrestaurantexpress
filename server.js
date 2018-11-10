var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [];
var waitlist = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
});
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

app.post("/reserve", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);
    if (tables.length <= 5) {
        tables.push(newTable);
    }
    else {
        waitlist.push(newTable);
    }


    res.json(newTable);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});