const express = require('express');
const app = express();
const Datastore = require('nedb');
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('Public'));
app.use(express.json({limit: '1mb'}));
const database = new Datastore('database.db');
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
    dataFrame[request.params.word] = request.params.num;
    response.send(dataFrame);
});