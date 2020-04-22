const Day = require('../models/day');
const mongoose = require('mongoose');
const dataRequest = require('./dataRequest');
const affinater = require('./affinateResults')
const dateFormater = require('./dateFormater')
var EventEmitter = require('events').EventEmitter;




FillForDate = function(date, em, update) {
    Day.findOne({date : new Date(date)})
        .then(day => {
            if (day == null) {
                console.log("Data not yet saved in the Database for the date of " + date);
                fillDatabase(new Date(date), em, update);
            } else {
                console.log("Data already saved in the Database for the date of " + date);
                if (update) {
                    fillDatabase(new Date(date), em, update);
                } else {
                    em.emit('next');
                }
            }
        })
        .catch(error => console.log(error));
};

exports.FillForDate = FillForDate;

fillDatabase = function(date, emiter, update) {

    var results = [];
    var em = new EventEmitter();

    dataRequest.scrapData(em, date);
    em.on('scraped', function(result) {
        results = result;
        console.log("Contries got : " + Object.keys(results.Country).length + " \nZones got : " + Object.keys(results.Zone).length + " \nCities got : " + Object.keys(results.City).length)
        console.log("Data scraped Ok");
        affinater.missingCountries(results);
        var em2 = new EventEmitter();
        dataRequest.scrapDataHistory(em2, results, date);
        em2.on('scraped', function(result) {
            affinater.affinate(results);
            affinater.Total(results);
            //save it to the db
            const day = new Day({
                date : new Date(results.Date),
                country : JSON.stringify(results.Country),
                zone : JSON.stringify(results.Zone),
                city : JSON.stringify(results.City)
            });
            if (update) {
                Day.findOne({date : new Date(date)})
                .then (d => {
                    if (d == null) {
                        day.save()
                          .then(() => {console.log("Data succesffully save in the Database"), emiter.emit("next")})
                          .catch(error => console.log(error));
                    } else {
                        Day.updateOne({date : new Date(date)}, {
                            country : JSON.stringify(results.Country),
                            zone : JSON.stringify(results.Zone),
                            city : JSON.stringify(results.City)
                        })
                        .then(() => {console.log("Data succesffully save in the Database"), emiter.emit("next")})
                        .catch(error => console.log(error));
                    }
                })
            } else {
                day.save()
                  .then(() => {console.log("Data succesffully save in the Database"), emiter.emit("next")})
                  .catch(error => console.log(error));
            }
        })
        em2.on('scrapeFailRequest', function(result){
            emiter.emit('stop');
        });
        em2.on('scrapeFailFile', function(result){
            emiter.emit('stop');
        });
    })
    em.on('scrapeFailRequest', function(result){
        emiter.emit('stop');
    });

    em.on('scrapeFailFile', function(result){
        emiter.emit('stop');
    });
}

exports.GetAllData = function(update=false) {
    var em = new EventEmitter();

    dayAct = new Date("January 22, 2020");

    FillForDate(dateFormater.yyyy_mm_dd(dayAct), em, update);
    em.on('next', function() {
        dayAct.setDate(dayAct.getDate() + 1);
        FillForDate(dateFormater.yyyy_mm_dd(dayAct), em, update);
    });
    em.on('stop', function() {
        console.log("stoped");
        return;
    });

}

DeleteForDate = function(date, em) {
    Day.deleteOne({date : new Date(date)})
        .then(day => {
            if (day == null) {
                em.emit('stop')
            } else {
            console.log("day of " + date + "deleted");
            em.emit('next')
            }
        })
        .catch(error => {console.log(error); em.emit('stop')});
}

exports.DeleteForDate = DeleteForDate;

exports.DeleteAllData = function() {
    var em = new EventEmitter();
    ohoh = new Date();
    dayAct = new Date("January 22, 2020");

    DeleteForDate(dateFormater.yyyy_mm_dd(dayAct), em);
    em.on('next', function() {
        dayAct.setDate(dayAct.getDate() + 1);
        if (dateFormater.yyyy_mm_dd(dayAct) == dateFormater.yyyy_mm_dd(ohoh))
            return;
        DeleteForDate(dateFormater.yyyy_mm_dd(dayAct), em);
    });
    em.on('stop', function() {
        console.log("stoped");
        return;
    });

}

GetDataFor = function(d) {
    return new Promise((resolve, reject) => {
        Day.findOne({date : d})
            .then(day => {
                if (day == null) {
                    resolve(null);
                } else {
                    resolve({date : day.date, country : JSON.parse(day.country), zone : JSON.parse(day.zone), city : JSON.parse(day.city)});
                }
            })
            .catch(error => reject(error));
    });
}

GetLastData = function(i = 0) {
    dd = new Date();
    date = new Date(dateFormater.yyyy_mm_dd(dd));
    date.setDate(date.getDate() - i)
    return new Promise((resolve, reject) => {
        GetDataFor(date)
        .then(d => {
            if (d == null) {
                resolve(GetLastData(i + 1));
            } else {
                resolve(d);
            }

        })
        .catch(d => reject(d));
    });

}

exports.GetData = function(date=null) {
    return new Promise((resolve, reject) => {
        if (date) {
            GetDataFor(new Date(date))
            .then(data => {resolve(data)})
            .catch(err => reject(err));
        } else {
            GetLastData()
            .then(data => {resolve(data)})
            .catch(err => reject(err));
        }
    });
}


/*
exports.GetDataToday = function() {

    var EventEmitter = require('events').EventEmitter;
    var results = [];
    var attempt = 1;
    var em = new EventEmitter();

    dataRequest.scrapData(em);
    em.on('scraped', function(result) {
        results = result;
        console.log("Contries got : " + Object.keys(results.Country).length + " \nZones got : " + Object.keys(results.Zone).length + " \nCities got : " + Object.keys(results.City).length)
        if (!affinater.testResult(results)) {
            console.log("Invalid data : new attempt to get it.");
            attempt = 1;
            dataRequest.scrapData(em);
            return;
        }
        console.log("Data scraped Ok");
        affinater.missingCountries(results);
        var em2 = new EventEmitter();
        dataRequest.scrapDataHistory(em2, results);
        em2.on('scraped', function(result) {
            affinater.affinate(results);
            affinater.Total(results);
            //save it to the db
            const day = new Day({
                date : new Date(results.Date),
                country : JSON.stringify(results.Country),
                zone : JSON.stringify(results.Zone),
                city : JSON.stringify(results.City)
            });
            day.save()
              .then(() => console.log("Data succesffully save in the Database"))
              .catch(error => console.log(error));
        })
        em2.on('scrapeFailRequest', function(result){
            throw result
        });
        em2.on('scrapeFailFile', function(result){
            throw result
        });
    });

    em.on('scrapeFailRequest', function(result){
        console.log(result.date + "'s Data is not yet available")
        var d = new Date();
        d.setDate(d.getDate() - attempt);
        attempt++;
        if (attempt == 10) throw "Problem with the url or the date"
        dataRequest.scrapData(em, d);
    });

    em.on('scrapeFailFile', function(result){
        throw result
    });
}
*/
