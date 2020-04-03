const express = require('express');
const fetch = require('node-fetch');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('Public'));
app.use(express.json({limit: '1mb'}));
const database = new Datastore('database.db'); //Basic querying means you are looking for documents whose fields match the ones you specify. 
// Let's say our datastore contains the following collection. (json file)
database.loadDatabase();

const dataUsa = {
    "country": "USA",
    "cases": 215215,
    "todayCases": 212,
    "deaths": 5110,
    "todayDeaths": 8,
    "recovered": 8878,
    "active": 201227,
    "critical": 5005,
    "casesPerOneMillion": 650,
    "deathsPerOneMillion": 15,
    "firstCase": "\nJan 20 "
};

app.get('/search/:country/:element', (request, response) => {
    const data = request.params;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data); 
    if (data.country == "USA" && data.element == "all") {
        console.log(request.params);
        response.send({
            dataUsa,
            "Time" :  Date(data.timestamp)
        });
    } else {
        console.log(request.params);
        response.send({
            "status": "failed",
            "error": `${request.params.element} related to ${request.params.country} does not exists.`,
            "Time" :  Date(data.timestamp)
        });
    }
});

const dataFrame = {};
app.get('/api/:word/:num', (request, response) => {
    console.log(request.params);
    dataFrame["word"] = request.params.word;
    dataFrame["num"] = request.params.num;
    database.find({ country: "USA" }, function (err, docs) {
        // docs is an array containing documents with the element country: "USA" inside them.
        // If no document is found, docs is equal to []
        response.send({
            dataFrame,
            docs
        });
      });
});

app.get('/ipCountry/:country', async (request, response) => {
    const country = request.params.country;
    console.log(`The country is: ${country}`);
    const dataCountry = await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`);
    const dataReceived = await dataCountry.json();
    database.insert(dataReceived); 
    response.json(dataReceived);
});
