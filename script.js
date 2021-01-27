function submit_key() {
    var name = document.getElementById("keyID").value;
    postUsers(name);
}

async function postUsers(api_key) {
    //Posts users individually to Iterable API, returns number of users uploaded
    //Load csv file and split into rows
    const response = await fetch("data.csv");
    const data = await response.text();
    const table = data.split('\n');

    //Create an array to hold JSON result, parse into JSON
    var result = [];
    const titles = table[0].split(',');
    for(var x=1; x<table.length; x++){
        var user = {};
        var row = table[x].split(',');
        for(var y=0; y<titles.length; y++){
           user[titles[y]] = row[y];
        }
        result.push(user);
    }
    //Goes through each JSON object in the result array and uploads to Iterable
    var userCount = 0;
    result.forEach( entry => {
        fetch('https://api.iterable.com/api/users/update',
        {
            method:'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                email: entry.email,
                datafields: entry
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'API_Key': api_key
            }
        })
        userCount++;

    })
    alert("Success: " + userCount + " Users Sent, API Key: " + api_key);
    }

