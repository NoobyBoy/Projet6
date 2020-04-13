const http = require('http');
const dataRequest = require('./src/dataRequest');
const affinater = require('./src/affinateResults')
const express = require('express');

var app = express();
var EventEmitter = require('events').EventEmitter;
var results = [];
var attempt = 1;



var em = new EventEmitter();

dataRequest.scrapData(em);
em.on('scraped', function(result) {
    results = result;
    if (Object.keys(results.Country).length < 90|| Object.keys(results.Zone).length < 43 || Object.keys(results.City).length < 700) {
        console.log("Invalid data : new attempt to get it.");
        console.log(Object.keys(results.Country).length + " " + Object.keys(results.Zone).length + " " + Object.keys(results.City).length)
        attempt = 1;
        dataRequest.scrapData(em);
        return;
    }
    affinater.missingCountries(results);
    var em2 = new EventEmitter();
    dataRequest.scrapDataHistory(em2, results);
    em2.on('scraped', function(result) {
        affinater.affinate(results);
        affinater.Total(results);
    })
    em2.on('scrapeFailRequest', function(result){
        throw result
    });
    em2.on('scrapeFailFile', function(result){
        throw result
    });
});
em.on('scrapeFailUrl', function(result) {
    console.log(result + "'s Data is not yet available")
    var d = new Date();
    d.setDate(d.getDate() - attempt);
    attempt++;
    if (attempt == 10) throw "Problem with the url or the date"
    dataRequest.scrapData(em, d);
});
em.on('scrapeFailRequest', function(result){
    throw result
});
em.on('scrapeFailFile', function(result){
    throw result
});

////////////////////////////////////////////////////////////////////////////////
// Routes                                                                     //
////////////////////////////////////////////////////////////////////////////////

function toUpper(str) {
return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
 }

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/data', function(req, res) {
    if (results) res.status(200).json({status : 200, data : {countries : results.Country, zones : results.Zone, cities : results.City}});
    else res.status(400).json({status : 400, data : []})
});

app.get('/data/countries', function(req, res) {
    if (results.Country) res.status(200).json({status : 200, data : results.Country});
    else res.status(400).json({status : 400, data : []})
});

app.get('/data/countries/:country', function(req, res) {
    if (req.params.country) {
        country = toUpper(req.params.country)
        if (country == "Us") country = "US";
        if (results.Country[country]) res.status(200).json({status : 200, data : results.Country[country]});
        else res.status(400).json({status : 400, data : []})
    } else res.status(400).json({status : 400, data : []})
});

app.get('/data/zones', function(req, res) {
    if (results.Zone) res.status(200).json({status : 200, data : results.Zone});
    else res.status(400).json({status : 400, data : []})
});

app.get('/data/zones/:zone', function(req, res) {
    if (req.params.zone) {
        zone = toUpper(req.params.zone)
        if (results.Zone[zone]) res.status(200).json({status : 200, data : results.Zone[zone]});
        else res.status(400).json({status : 400, data : []})
    } else res.status(400).json({status : 400, data : []})
});

app.get('/data/cities', function(req, res) {
    if (results.City) res.status(200).json({status : 200, data : results.City});
    else res.status(400).json({status : 400, data : []})
});

app.get('/data/cities/:city', function(req, res) {
    if (req.params.city) {
        city = toUpper(req.params.city)
        if (results.City[city]) res.status(200).json({status : 200, data : results.City[city]});
        else res.status(400).json({status : 400, data : []})
    } else res.status(400).json({status : 400, data : []})
});

app.set('port', 8080);


////////////////////////////////////////////////////////////////////////////////
// Server                                                                    //
////////////////////////////////////////////////////////////////////////////////

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + '8080';
  console.log('Listening on ' + bind);
});

server.listen(8080);
