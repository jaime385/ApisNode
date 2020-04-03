ipData();
async function ipData() {
    const country = await fetch('https://ipapi.co/json/');
    const countryJson = await country.json();
    console.log(countryJson.country_name);
    const countryToServer = await fetch(`ipCountry/${countryJson.country_name}`);
    const responseFromServer = await countryToServer.json();
    console.log(responseFromServer);
    document.getElementById('paragraph1').textContent = countryJson.country_name;
    for (item in responseFromServer) {
        console.log(`Hola ${item}`);
        const time = document.createElement(`div`);
        time.setAttribute('id', `div${item}`);
        const newDate = new Date(responseFromServer[item].time);
        const stringHour = newDate;
        time.textContent = stringHour;
        const divTimes = document.getElementById('times');
        divTimes.append(time);
        console.log(newDate);
    }
}