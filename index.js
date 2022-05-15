// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res){
    var dateString = req.params.date;
    //if no parameter is assigned
    if( dateString === undefined){
        res.json({
            unix: new Date(),
            utc: new Date().toString()
        })
    }

    //if parameter is integer value 
    if(/\d{5,}/.test(dateString)){

        var dateNum = parseInt(dateString);
        res.json({
            unix: dateNum,
            utc: new Date(dateNum).toString()
        })
    } else {
        
        var dateObject = new Date(dateString);
        console.log(dateObject)
        if( dateObject.toString() === "Invalid Date"){
            res.json({
                error: "Invalid Date"
            })
        } else{
            var dateInt = new Date(dateString);
            res.json({
                unix: new Date(dateString).getTime(),
                utc: new Date(dateInt).toString()
            })
        }
    }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });