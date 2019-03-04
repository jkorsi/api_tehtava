var express = require('express');
var app = express();
var server = app.listen(8081, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
var url = require('url');
var mysql = require('mysql');
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
    res.send('Hello Dude');
});

// This responds a POST request for the homepage
app.post('/', (req, res) => {
    console.log('Got a POST request for the homepage');
    res.send('Hello POST');
});

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', (req, res) => {
    console.log('Got a DELETE request for /del_user');
    res.send('Hello DELETE');
});

// This responds a GET request for the /list_user page.
app.get('/list_user', (req, res) => {
    console.log('Got a GET request for /list_user');
    res.send('Page Listing');
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
let ab = app.get('/ab*cd', (req, res) => {
    let q = url.parse(req.url, true).query;
    let startDate = q.start;
    let endDate = q.end;
    console.log('Got a GET request for /ab*cd');
    // res.send('Page Pattern Match');

    con.query('SELECT event_date.Date, event.Name, event.Type, Location.Location_name ' +
    'FROM event_date, event, location' +
    ' WHERE event_date.Event_id = event.Event_id AND event.Location_Location_id = Location.Location_id' +
    ' AND event_date.Date >= ? AND event_date.Date <= ?' +
    ' GROUP BY Name' +
    ' ORDER BY event_date.Date;',[startDate, endDate], (err, result, fields) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send(result);

        // ESIMERKKI: http://localhost:8081/ab*cd?start=2019-01-01&end=2019-12-31
    });
});