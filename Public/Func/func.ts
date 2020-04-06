export {};

async function saveData() {
  const country = await fetch('https://ipapi.co/json/');
  const countryJson = await country.json();
  console.log(countryJson.country_name);
  const countryToServer = await fetch(`ipCountry/${countryJson.country_name}`);
  const responseFromServer = await countryToServer.json();
  console.log(responseFromServer);
  document.getElementById('usersCountry').textContent =
    countryJson.country_name;
  for (let item in responseFromServer.allDataCountriesReceived) {
    const countries = responseFromServer.allDataCountriesReceived[item].country;
    //console.log(countries);
    const datalist = document.getElementById('countries');
    const datalistElement = document.createElement('option');
    datalistElement.setAttribute('value', `${countries}`);
    datalist.append(datalistElement);
  }
  const datTime = document.createElement('div');
  const timeNow = new Date(responseFromServer.timestamp);
  datTime.textContent = timeNow.toString();
  document.getElementById('body').append(datTime);
}
