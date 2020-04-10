const http = require('http');
const dataRequest = require('./src/dataRequest');
const affinater = require('./src/affinateResults')
const express = require('express');

var app = express();
var EventEmitter = require('events').EventEmitter;
var results = [];



var em = new EventEmitter();

dataRequest.scrapData(em);
em.on('scraped', function(result) {
    results = result;
    affinater.missingCountries(results);
    var em2 = new EventEmitter();
    dataRequest.scrapDataHistory(em2, results);
    em2.on('scraped', function(result) {
        affinater.affinate(results)
    })
    em2.on('scrapeFailRequest', function(result){
        throw result
    });
    em2.on('scrapeFailFile', function(result){
        throw result
    });
});
var attempt = 1;
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});


app.get('/data/countries', function(req, res) {
    if (results.Country) res.json({status : 200, data : results.Country});
    else res.json({status : 400, data : []})
});

app.get('/data/countries/:country', function(req, res) {
    if (req.params.country) {
        country = req.params.country[0].toUpperCase() + req.params.country.slice(1).toLowerCase();
        if (country == "Us") country = "US";
        if (results.Country[country]) res.json({status : 200, data : results.Country[country]});
        else res.json({status : 400, data : []})
    } else res.json({status : 400, data : []})
});

app.get('/data/zones', function(req, res) {
    if (results.Zone) res.json({status : 200, data : results.Zone});
    else res.json({status : 400, data : []})
});

app.get('/data/zones/:zone', function(req, res) {
    if (req.params.zone) {
        zone = req.params.zone[0].toUpperCase() + req.params.zone.slice(1).toLowerCase();
        if (results.Zone[zone]) res.json({status : 200, data : results.Zone[zone]});
        else res.json({status : 400, data : []})
    } else res.json({status : 400, data : []})
});

app.get('/data/cities', function(req, res) {
    if (results.City) res.json({status : 200, data : results.City});
    else res.json({status : 400, data : []})
});

app.get('/data/cities/:city', function(req, res) {
    if (req.params.city) {
        city = req.params.city[0].toUpperCase() + req.params.city.slice(1).toLowerCase();
        if (results.City[city]) res.json({status : 200, data : results.City[city]});
        else res.json({status : 400, data : []})
    } else res.json({status : 400, data : []})
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
