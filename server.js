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
    //console.log(timestampOneDayAfter);
    const country = request.params.country;
    console.log(`The country is: ${country}`);
    const dataCountry = await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`);
    const countryDataReceived = await dataCountry.json();
    const allDataCountries = await fetch(`https://coronavirus-19-api.herokuapp.com/countries`);
    const allDataCountriesReceived = await allDataCountries.json();
    const generalData = await fetch('https://coronavirus-19-api.herokuapp.com/all');
    const generaldataReceived = await generalData.json();
    //console.log(generaldataReceived);
    database.insert({ timestamp, generaldataReceived, countryDataReceived, allDataCountriesReceived }, function (err, newDoc) {
        //console.log(newDoc);
    });
    const dateNow = database.find({ "allDataCountriesReceived.0.country": "USA" }, function (err, docs) {
        console.log(docs);
        response.json(docs[0]);
    });
});

app.get('/api/:word', (request, response) => {
    //console.log(request.params.word);
    const dateLogs = database.find({}, function (err, docs) {
        if (request.params.word == 'all') {
            var size = 0;
            let timestamps = [];
            for (item in docs) {
                size++;
                timestamps[item] = docs[item].timestamp;
            }
            //The next two lines of code show how to do the same time with the timestamps but using the map method instead.
            /*const dataDatabase = docs.map(docs => docs.timestamp);
            console.log(dataDatabase);*/
            response.json({
                "Status": 'Succes',
                "Elements": size,
                "Times": timestamps /*,
                'Map Method': dataDatabase*/
            });
        } else {
            response.json({
                "Status": "Not Logging"
            });
        }
    });
});