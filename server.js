const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('Public'));
//app.use(json({limit: '1mb'}));

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

app.get('/search/:country/:all' , (request , response) => {
    const countrySelected = request.params.country;
    
    if (request.params.country == "USA" && request.params.all == "all") {
        console.log(dataUsa);
    }
    response.send(`I have got ${countrySelected}`);
});

app.get('/api', (request, response) => {
    console.log(request.params);
    response.send({
        "saludo": "Hi"
    });
});