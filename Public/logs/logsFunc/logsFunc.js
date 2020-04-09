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
        const dataList3 = document.getElementById('dispData3');
        const dataList4 = document.getElementById('dispData4');
        const datalistElement = document.createElement('Div');
        const formattedDate = new Date(logs);
        datalistElement.textContent = formattedDate.toDateString();
        if ((elements >= 3 * numberElements)) {
            dataList.append(datalistElement);
            elements--;
            console.log(elements);
        }
        if ((elements <= 3 * numberElements) && (elements >= 2 * numberElements)) {
            dataList2.append(datalistElement);
            elements--;
            console.log(elements);
        }
        if ((elements <= 2 * numberElements) && (elements >= numberElements)) {
            dataList3.append(datalistElement);
            elements--;
            console.log(elements);
        }
        if ((elements <= numberElements) && (elements >= 0)) {
            dataList4.append(datalistElement);
            elements--;
            console.log(elements);
        }
    }
}