ipData();
async function ipData() {
    const country = await fetch('https://ipapi.co/json/');
    const countryJson = await country.json();
    console.log(countryJson);
    const countryToServer = await fetch(`ipCountry/${countryJson.country_name}`);
    const responseFromServer = await countryToServer.json();
    console.log(responseFromServer);
}