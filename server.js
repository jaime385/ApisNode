const express = require('express');
const fetch = require('node-fetch');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('Public'));
app.use(express.json({ limit: '1mb' }));
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/ipCountry/:country', async (request, response) => {
    const country = request.params.country;
    console.log(`The country is: ${country}`);
    const dataCountry = await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`);
    const dataReceived = await dataCountry.json();
    const timestamp = Date.now();
    dataReceived['time'] = timestamp;
    database.insert({ dataReceived }, function (err, newDoc) {
        //console.log(newDoc);
    });
    const dateNow = database.find({ "dataReceived.country": "Costa Rica" }, function (err, docs) {
        response.json(docs);
    });
});
