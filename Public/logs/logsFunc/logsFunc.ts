export {};

console.log('This is the logs javascript');
getLogsData();
async function getLogsData() {
  const logsData = await fetch('/api/all');
  const logsDataJson = await logsData.json();
  console.log(logsDataJson);
  var elements = logsDataJson.Elements;
  var numberElements = Math.round(elements / 4);
  console.log(2 * numberElements);
  for (let item in logsDataJson.Times) {
    const logs = logsDataJson.Times[item];
    const dataList = document.getElementById('dispData');
    const dataList2 = document.getElementById('dispData2');
    const datalistElement = document.createElement('Div');
    const formattedDate = new Date(logs);
    datalistElement.textContent = formattedDate.toDateString();
    if (elements >= 2 * numberElements) {
      dataList.append(datalistElement);
      elements--;
      console.log(elements);
    } else {
      dataList2.append(datalistElement);
    }
  }
}
