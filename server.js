var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var server = app.listen(8081, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
// use it before all route definitions

var url = require('url');
var mysql = require('mysql');
var cors = require('cors');
app.use(cors({origin: 'http://localhost:63342'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // for reading JSON
var jsonParser = bodyParser.json();

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D!bYAhc$t?}Aqz3f',
    database: 'example_db',
    multipleStatements: true
});
// MYSQL
con.connect((err) => {
    if (err) {
        throw err;
    }
    con.query('SELECT * FROM location', (err, result, fields) => {
        if (err) {
            throw err;
        }
        console.log(result);
    });
});

// NODE POSTS and GETS
// This responds with "Hello World" on the homepage
app.get('/', (req, res) => {
    console.log('Got a GET request for the homepage');
    res.send('Hello from origin');
});

// This responds a POST request for the homepage
app.post('/addEvent', jsonParser, (req, res) => {
    console.log("body: %j", req.body);
    let q = url.parse(req.url, true).query;
    let evName = req.body.eventName;
    let evDate = req.body.eventDate;
    let evTime = req.body.eventTime;
    let evType = req.body.eventType;
    let evStar = req.body.eventStar;
    let evLocation = req.body.eventLocationName;
    let evLocationAddress = req.body.eventLocationStreetAddress;
    let evLocationCity = req.body.eventLocationCity;
    let evLocationZip = req.body.eventLocationZip;
    let evLocationCountry = req.body.eventLocationCountry;
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');

    console.log('Got a POST request for the addEvent');
    res.send(`Hello POST ${evName}, ${evDate}, ${evTime}, ${evType}, ${evStar}, ${evLocation}, ${evLocationAddress}, 
    ${evLocationCity}, ${evLocationZip}, ${evLocationCountry}`);

    /*
       app.use(bodyParser.urlencoded({ extended: false }));
       app.use(bodyParser.json()); // for reading JSON
    */
});

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', (req, res) => {
    console.log('Got a DELETE request for /del_user');
    res.send('Hello DELETE');
});

// This responds a GET request for the /list_user page.
app.get('/location', (req, res) => {
    let q = url.parse(req.url, true).query;
    let locationName = q.locationName;
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    console.log('Got a GET request for /location');

    con.query('SELECT location.Location_name, location.Street_address, location.City, location.Zip, location.Country ' +
        'FROM location' +
        ' WHERE location.Location_name = ?' +
        ' GROUP BY Location_name' +
        ' ORDER BY Location_name;', [locationName], (err, result, fields) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send(result);
        // ESIMERKKI: http://localhost:8081/location?locationName=Tavastia
    });
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
let ab = app.get('/event', (req, res) => {
    let q = url.parse(req.url, true).query;
    let startDate = q.start;
    let endDate = q.end;
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    console.log('Got a GET request for /event');
    // res.send('Page Pattern Match');

    con.query('SELECT event_date.Date, event.Name, event.Type, Location.Location_name ' +
    'FROM event_date, event, location' +
    ' WHERE event_date.Event_id = event.Event_id AND event.Location_Location_id = Location.Location_id' +
    ' AND event_date.Date >= ? AND event_date.Date <= ?' +
    ' GROUP BY Name' +
        ' ORDER BY event_date.Date;', [startDate, endDate], (err, result, fields) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send(result);

        // ESIMERKKI: http://localhost:8081/event?start=2019-01-01&end=2019-12-31
    });
});


