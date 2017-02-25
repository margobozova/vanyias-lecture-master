'use strict';

let data = require('./data.js');
const express = require('express');

const  app = express();

app.use(express.static(__dirname));
app.listen(8080);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
});

app.get('/photos', (request, response) => {
   response.send(JSON.stringify((data.photos)))
});

console.log('Server running on port 8080');