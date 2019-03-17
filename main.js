var json; // json is global...


function makeQuery() {
    let startdate = document.getElementById('startingDate').value;
    let enddate = document.getElementById('endingDate').value;
    if (startdate.length == 0) { // fix this and support empty field
        return;
    }
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json = JSON.parse(xmlhttp.responseText);
            // myFunction(resultArr);
            // document.getElementById("locationInfo").innerHTML = xmlhttp.responseText;
            if (json.length > 0) { // something found
                // document.getElementById("locationInfo").innerHTML = json[0].Date;
                // console.log(json.numOfRows + ", " + json.rows[0].Location_place_name);
                showList(json);
            } else {
                document.getElementById('locationInfo').innerHTML = '<br/>Ei tapahtumatietoja tältä ajalta.';
            }
        }
    };
    // ESIMERKKI: localhost:8081/event?start=2019-01-01&end=2019-12-31
    xmlhttp.open('GET', `http://localhost:8081/event?start=${startdate}&end=${enddate}`, true);
    xmlhttp.send();
}

function showList(json) {
    let body = document.getElementsByTagName('body')[0];
    body.padding = '25px';
    body.margin = '25px';

    let tbl = document.createElement('table');
    tbl.padding = '25px';
    tbl.margin = '25px';
    tbl.class = 'table';

    tbl.setAttribute('border', '1');
    let tableBody = document.createElement('tbody');
    tableBody.padding = '25px';
    tableBody.margin = '25px';

    // Start building the table
    let trA = document.createElement('tr');
    trA.style.backgroundColor = '#cfcfd1';
    // var td = document.createElement('td');

    let tdDate = document.createElement('td');
    tdDate.appendChild(document.createTextNode('Happening date'));
    trA.appendChild(tdDate);

    let tdName = document.createElement('td');
    tdName.appendChild(document.createTextNode('Star of the show'));
    trA.appendChild(tdName);

    let tdType = document.createElement('td');
    tdType.appendChild(document.createTextNode('Type of the show'));
    trA.appendChild(tdType);

    let tdLocation = document.createElement('td');
    tdLocation.appendChild(document.createTextNode('Where'));
    trA.appendChild(tdLocation);
    tableBody.appendChild(trA);

    // td.setAttribute('rowSpan', '1')
    // tr.appendChild(td)

    for (let i = 0; i < json.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 4; j++) {
            if (i == 2 && j == 3) {
                break;
            } else {
                let tdB = document.createElement('td');
                switch (j) {
                    case j = 0:
                        //var dateAndTime = moment(json[i].Date).format('MMMM Do YYYY, h:mm:ss a');
                        let d = new Date(json[i].Date);
                        //let date = d.toLocaleDateString();
                        let time = d.toTimeString();
                        tdB.appendChild(document.createTextNode(" Time: " + time));
                        break;
                    case j = 1:
                        tdB.appendChild(document.createTextNode(json[i].Name));
                        break;
                    case j = 2:
                        tdB.appendChild(document.createTextNode(json[i].Type));
                        break;
                    case j = 3:
                        tdB.appendChild(document.createTextNode(json[i].Location_name));
                        break;
                    default:
                        break;
                }

                i == 1 && j == 1 ? tdB.setAttribute('rowSpan', '3') : null;
                tr.appendChild(tdB);
            }
        }
        tableBody.appendChild(tr);
    }
    tbl.appendChild(tableBody);
    body.appendChild(tbl);


    /*
     //myObj = JSON.parse(this.responseText);
     txt += "<select>"
     for (x in myObj) {
         txt += "<option>" + myObj[x].name;
     }
      txt += "</select>"
      document.getElementById("demo").innerHTML = txt;
      */

    /*
    document.getElementById("locationInfo").innerHTML = "New text!";

    var table = document.createElement("P");                       // Create a <p> element
    var t = document.createTextNode("This is a paragraph.");      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("myDIV").appendChild(table);           // Append <p> to <div> with id="myDIV"
    */
}


function Clear() {
    $('.del').remove(); // delete unordered list with jQuery

    // delete Ok-button
    let btn = document.getElementById('Ok');
    var parent = document.getElementById('wholeContainer');
    parent.removeChild(btn);

    // put submit-button again on the form...
    submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'button');
    submitBtn.setAttribute('value', 'Lähetä');
    submitBtn.setAttribute('id', 'submit');
    submitBtn.setAttribute('onclick', 'makeQuery()');
    var parent = document.getElementById('wholeContainer');
    parent.appendChild(submitBtn);
}

function submitForm() {


    /*    POST /addEvent HTTP/1.1
          Host: localhost:8081
          Content-Type: application/json
          cache-control: no-cache
            {
                "eventName":"evNameJSON",
                "eventDate":"evDateJSON",
                "eventStar":"evStarJSON",
                "eventLocation":"evLocationJSON"
            }*/
}
