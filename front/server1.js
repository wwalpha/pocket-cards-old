const express = require('express');
//const path = require('path');

const app = express();

app.use(express.static('public'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));
