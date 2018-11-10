var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [
    { 
    customerName: 'Seiji',
    phoneNumber: '111-111-111',
    customerEmail: 'seiji@seiji.com',
    customerID: '123' 
    },
    { 
        customerName: 'Alix',
        phoneNumber: '111-111-111',
        customerEmail: 'alix',
        customerID: '124' 
    },
    {
        customerName: 'Robert',
        phoneNumber: '111-111-111',
        customerEmail: 'seiji@seiji.com',
        customerID: '125' 
    },
    {
        customerName: 'Jona',
        phoneNumber: '111-111-111',
        customerEmail: 'XXXX',
        customerID: '126' 
    },
    {
        customerName: 'Snoopy',
        phoneNumber: '111-111-111',
        customerEmail: 'XXXX',
        customerID: '127' 
    },
];
var waitlist = [
    {
        customerName: 'Carlitos',
        phoneNumber: '111-111-111',
        customerEmail: 'XXXX',
        customerID: '130' 
    },
];

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

app.post("/api/clear", function (req, res) {
    tables = [];
});

app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);
    if (tables.length < 5) {
        tables.push(newTable);
        res.json(true);
    }
    else {
        waitlist.push(newTable);
        res.json(false);
    }

    // res.json(newTable);
});

app.post("/api/cancel", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var idObj = req.body;
    id=idObj.id;

    for (var i=0; i < tables.length ; i++){
        if(tables[i].customerID===id){
            tables.splice(i, 1);
        }

        if(waitlist[0]){
            temp = waitlist.shift();
            tables.push(temp);
        }

    }
    res.json("Success!!");
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});