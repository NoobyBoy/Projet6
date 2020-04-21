const express = require('express');
const cors = require('cors')

const dataRequest = require('./src/dataRequest');
const affinater = require('./src/affinateResults')
const database = require('./src/databaseManagement')
const Day = require('./models/day');

var app = express();


function toUpper(str) {
return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
 }

app.use(cors());

////////////////////////////////////////////////////////////////////////////////
// Routes                                                                     //
////////////////////////////////////////////////////////////////////////////////

////////////////
/// DATA ALL ///
////////////////

app.get('/data/all', function(req, res) {
    database.GetLastData()
    .then(data => {
        if (data) {
            res.status(200).json({status : 200, data : {countries : data.country, zones : data.zone, cities : data.city}});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/all/:date', function(req, res) {
    database.GetDataFor(req.params.date)
    .then(data => {
        if (data) {
            res.status(200).json({status : 200, data : {countries : data.country, zones : data.zone, cities : data.city}});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

/////////////////
/// COUNTRIES ///
/////////////////

app.get('/data/countries', function(req, res) {
    database.GetLastData()
    .then(data => {
        if (data.country) {
            res.status(200).json({status : 200, data : data.country});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/countries/:date', function(req, res) {
    database.GetDataFor(req.params.date)
    .then(data => {
        if (data.country) {
            res.status(200).json({status : 200, data : data.country});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/countries/:country', function(req, res) {
    if (req.params.country) {
        country = toUpper(req.params.country)
        if (country == "Us") country = "US";
        database.GetLastData()
        .then(data => {
            if (data.country && data.country[country]) {
                res.status(200).json({status : 200, data : data.country[country]});
            } else {
                res.status(400).json({status : 400, data : []});
            }
        })
        .catch(err => res.status(400).json(err));
    }
});

app.get('/data/countries/:country/:date', function(req, res) {
    if (req.params.country) {
        country = toUpper(req.params.country)
        if (country == "Us") country = "US";
        database.GetDataFor(req.params.date)
        .then(data => {
            if (data.country && data.country[country]) {
                res.status(200).json({status : 200, data : data.country[country]});
            } else {
                res.status(400).json({status : 400, data : []});
            }
        })
        .catch(err => res.status(400).json(err));
    }
});

/////////////
/// ZONES ///
/////////////

app.get('/data/zones', function(req, res) {
    database.GetLastData()
    .then(data => {
        if (data.zone) {
            res.status(200).json({status : 200, data : data.zone});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/zones/:date', function(req, res) {
    database.GetDataFor(req.params.date)
    .then(data => {
        if (data.zone) {
            res.status(200).json({status : 200, data : data.zone});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/zones/:zone', function(req, res) {
    if (req.params.zone) {
        zone = toUpper(req.params.zone)
        database.GetLastData()
        .then(data => {
            if (data.zone && data.zone[zone]) {
                res.status(200).json({status : 200, data : data.zone[zone]});
            } else {
                res.status(400).json({status : 400, data : []});
            }
        })
        .catch(err => res.status(400).json(err));
    }
});

app.get('/data/zones/:zone/:date', function(req, res) {
    if (req.params.zone) {
        zone = toUpper(req.params.zone)
        database.GetDataFor(req.params.date)
        .then(data => {
            if (data.zone && data.zone[zone]) {
                res.status(200).json({status : 200, data : data.zone[zone]});
            } else {
                res.status(400).json({status : 400, data : []});
            }
        })
        .catch(err => res.status(400).json(err));
    }
});

//////////////
/// CITIES ///
//////////////

app.get('/data/cities', function(req, res) {
    database.GetLastData()
    .then(data => {
        if (data.city) {
            res.status(200).json({status : 200, data : data.city});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/cities/:date', function(req, res) {
    database.GetDataFor(req.params.date)
    .then(data => {
        if (data.city) {
            res.status(200).json({status : 200, data : data.city});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/cities/:city', function(req, res) {
    if (req.params.city) {
        city = toUpper(req.params.city)
        database.GetLastData()
        .then(data => {
            if (data.city && data.city[city]) {
                res.status(200).json({status : 200, data : data.city[city]});
            } else {
                res.status(400).json({status : 400, data : []});
            }
        })
        .catch(err => res.status(400).json(err));
    }
});

app.get('/data/cities/:city/:date', function(req, res) {
    if (req.params.city) {
        city = toUpper(req.params.city)
        database.GetDataFor(req.params.date)
        .then(data => {
            if (data.city && data.city[city]) {
                res.status(200).json({status : 200, data : data.city[city]});
            } else {
                res.status(400).json({status : 400, data : []});
            }
        })
        .catch(err => res.status(400).json(err));
    }
});

////////////
/// LIST ///
////////////

app.get('/data/list/countries', function(req, res) {
    database.GetLastData()
    .then(data => {
        if (data.country) {
            res.status(200).json({status : 200, data : Object.keys(data.country)});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/list/zones', function(req, res) {
    database.GetLastData()
    .then(data => {
        if (data.zone) {
            res.status(200).json({status : 200, data : Object.keys(data.zone)});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});

app.get('/data/list/cities', function(req, res) {
    database.GetLastData()
    .then(data => {
        if (data.city) {
            res.status(200).json({status : 200, data : Object.keys(data.city)});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});



app.set('port', 8080);

module.exports = app;
