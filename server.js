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
    const timestamp = Date.now();
    const timestampOneDayAfter = timestamp + 86400000;
    const x = new Date(timestampOneDayAfter);
    console.log(timestampOneDayAfter);
    const country = request.params.country;
    console.log(`The country is: ${country}`);
    const dataCountry = await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`);
    const countryDataReceived = await dataCountry.json();
    const allDataCountries = await fetch(`https://coronavirus-19-api.herokuapp.com/countries`);
    const allDataCountriesReceived = await allDataCountries.json();
    const generalData = await fetch('https://coronavirus-19-api.herokuapp.com/all');
    const generaldataReceived = await generalData.json();
    console.log(generaldataReceived);
    database.insert({ timestamp, generaldataReceived, countryDataReceived, allDataCountriesReceived }, function (err, newDoc) {
        //console.log(newDoc);
    });

    const dateNow = database.find({ allDataCountriesReceived: { $exists: true } }, function (err, docs) {
        //console.log(docs[0]);
        response.json(docs[0]);
    });
});

app.get('search/:what', async (requestingWhat, respondingWhat) => {
    console.log(requestingWhat.params);
    respondingWhat.end();
});