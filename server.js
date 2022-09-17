'use strict';

const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const request = require('request');
require('dotenv').config();

const app = express();
app.use(history());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'dist')));

app.all('/api/*', function(req, res) {
  request('https://northwind-api.onrender.com' + req.url.substring(4),
    {
      method: req.method,
      body: (req.method === 'POST' || req.method === 'PUT') ? JSON.stringify(req.body) : null,
      headers: { 'Content-Type': req.headers['content-type'] }
    },
    function(error, response, body) {
      if (error)
        res.status(500).send({ message: 'Error calling Northwind service: ' + (error.code ? error.code : error) });
      else
        res.status(response.statusCode).send(body);
    });
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Northwind web server started on port ' + port);
