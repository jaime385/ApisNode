console.log('This is the logs javascript');
getLogsData();
async function getLogsData() {
    const logsData = await fetch('/api/all');
    const logsDataJson = await logsData.json();
    console.log(logsDataJson);
    for (let item in logsDataJson.Times) {
        const logs = logsDataJson.Times[item];
        const dataList = document.getElementById('dispData');
        const datalistElement = document.createElement('Div');
        const formattedDate = new Date(logs);
        datalistElement.textContent = formattedDate.toString();
        console.log(formattedDate);
        dataList.append(datalistElement);
    }
}
