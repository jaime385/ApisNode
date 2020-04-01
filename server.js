const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('Public'));
//app.use(json({limit: '1mb'}));