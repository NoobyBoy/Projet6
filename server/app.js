const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const dataRequest = require('./src/dataRequest');
const affinater = require('./src/affinateResults')
const database = require('./src/databaseManagement')
const graph = require('./src/graph')

var app = express();

var death;

graph.getDeath()
.then(r => death = r)
.catch(r => death = r);

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

app.use(bodyParser.urlencoded({ extended: false }))

////////////////////////////////////////////////////////////////////////////////
// Routes                                                                     //
////////////////////////////////////////////////////////////////////////////////

////////////////
/// DATA ALL ///
////////////////

app.get('/data/all', function(req, res) {
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    if (req.params.country) {
        country = toUpper(req.params.country)
        if (country == "Us") country = "US";
        database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    if (req.params.zone) {
        zone = toUpper(req.params.zone)
        database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    if (req.params.city) {
        city = toUpper(req.params.city)
        database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    database.GetData(date)
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
    var date = null
    if (req.body.date) {
        date = req.body.date;
    }
    database.GetData(date)
    .then(data => {
        if (data.city) {
            res.status(200).json({status : 200, data : Object.keys(data.city)});
        } else {
            res.status(400).json({status : 400, data : []});
        }
    })
    .catch(err => res.status(400).json(err))
});


app.get('/data/graph', function(req, res) {
    if (death)
        res.status(200).json({status : 200, data : death});
    else
        res.status(400).json({status : 400, data : [] })
})


app.set('port', 8080);

module.exports = app;
