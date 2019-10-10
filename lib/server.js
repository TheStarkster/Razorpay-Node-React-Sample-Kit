const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body Parser  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Configs
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  })

//Headers
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store');
    next();
  });

// Root Route Config
app.use('/', require('./routes/paths'));

// Port Configs
const PORT = process.env.PORT || 2024;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
