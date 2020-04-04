ipData();
async function ipData() {
    const country = await fetch('https://ipapi.co/json/');
    const countryJson = await country.json();
    console.log(countryJson.country_name);
    const countryToServer = await fetch(`ipCountry/${countryJson.country_name}`);
    const responseFromServer = await countryToServer.json();
    console.log(responseFromServer);
    document.getElementById('paragraph1').textContent = countryJson.country_name;
    for (item in responseFromServer.allDataCountriesReceived) {
        const countries = responseFromServer.allDataCountriesReceived[item].country;
        //console.log(countries);
        const datalist = document.getElementById('countries');
        datalistElement = document.createElement('option');
        datalistElement.setAttribute('value', `${countries}`);
        datalist.append(datalistElement);
    }
}