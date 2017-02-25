'use strict';

let data = require('./data.js');
const express = require('express');

const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const  app = express();


app.use(express.static(__dirname));
app.listen(8080);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
});

app.get('/photos', (request, response) => {
   response.send(JSON.stringify((data.photos)))
});
app.post('/photos', (request, response) => {
  let form = new formidable.IncomingForm();

  let name = '';

  form.uploadDir = path.join(__dirname, '/uploads');

  form.on('file', (field, file) => {
    name = file.name;

    fs.rename(file.path, path.join(form.uploadDir, name))
  });

  form.on('end', () => {
    let container = {
      id: Date.now()*Math.random(),
      url: `/uploads/${name}`
    };
    response.send(JSON.stringify(container));
  });
  
  form.parse(request);
});
console.log('Server running on port 8080');