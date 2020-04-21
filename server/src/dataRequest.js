const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const dateFormater = require('./dateFormater');
var EventEmitter = require('events').EventEmitter;

const GetErr = '404: Not Found'

exports.scrapData = function(em, date=null)  {
    //Initialisation of url and date etc...
    base_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'
    var today = ''
    var today_non_retard;
    if (!date) {
        var d = new Date();
        today = dateFormater.mm_dd_yyyy(d);
        today_non_retard = dateFormater.yyyy_mm_dd(d);
    } else {
        today = dateFormater.mm_dd_yyyy(date);
        today_non_retard = dateFormater.yyyy_mm_dd(date);
    }
    process.stdout.write("Begining of the Request to " + base_url + today + ".csv ... ");

    //Begining of the request
    axios.get(base_url + today + ".csv")
    .then(response => {
        console.log("Request Done")
        process.stdout.write("Writing data in the file ...");

        fs.writeFile('./data/' + today + '.csv', response.data.toString().replace(/\//g, "_"), function() {
            console.log(" Done");
            const country = {};
            const zone = {};
            const city = {};
            process.stdout.write("Starting parsing of the csv File ...");
            fs.createReadStream('./data/' + today + '.csv')
            .pipe(csv())
            .on('data', (data) => {
                  if (!data.Admin2 && !data.Province_State) country[data.Country_Region] = data;
                  else if (!data.Admin2) zone[data.Province_State] = data;
                  else city[data.Admin2] = data;
            })
            .on('end', () => {
                  console.log(" Parsing Done")
                  fs.unlink('./data/' + today + '.csv', function(){})
                  em.emit('scraped', {Country : country, Zone : zone, City : city, Date : today_non_retard});
            });
        });
    })
    .catch(error => {
        console.log(error.message);
        em.emit('scrapeFailRequest', {error : error.message, date : today});
    });
}

getHistory = function(data, date) {
    var today;
    if (date == null)
        today = new Date();
    else
        today = date;
    firstDay = new Date("January 22, 2020");

    history = [];
    while (dateFormater.m_d_yy(today) != dateFormater.m_d_yy(firstDay)) {
        history.push(data[dateFormater.m_d_yy(firstDay)]);
        firstDay.setDate(firstDay.getDate() + 1);
    }
    return(history);
}

exports.scrapDataHistory = function(em, res, date=null)  {
    //Initialisation of url and date etc...

    base_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
    const country = {};
    const zone = {};

    fs.writeFile('./data/' + 'History.csv', '', function() {});
    process.stdout.write("Begining of the Request to " + base_url + " ... ");

    //Begining of the request
    axios.get(base_url)
    .then(response => {
        console.log("Request Done")
        process.stdout.write("Writing data in the file ...");
        fs.writeFile('./data/' + 'History.csv', response.data.toString().replace(/\//g, "_"), function() {
            console.log(" Done");
            // we parse it
            process.stdout.write("Starting parsing of the csv File ...")
            fs.createReadStream('./data/' + 'History.csv')
            .pipe(csv())
            .on('data', (data) => {
                  if (!data.Province_State && res.Country[data.Country_Region]) res.Country[data.Country_Region].History = getHistory(data, date);
                  else if (res.Zone[data.Province_State]) res.Zone[data.Province_State].History = getHistory(data, date);
            })
            .on('end', () => {
                  console.log(" Parsing Done")
                  fs.unlink('./data/' + 'History.csv', function(){})
                  em.emit('scraped', null);
              });
          });

    })
    .catch(error => {
        console.log(error.message);
        em.emit('scrapeFailRequest', {error : error.message, date : today});
    });
}
