const https = require('https');
const fs = require('fs');
const csv = require('csv-parser');
const dateFormater = require('./dateFormater');
var EventEmitter = require('events').EventEmitter;

const GetErr = '404: Not Found'



exports.scrapData = function(em, date=null)  {
    //Initialisation of url and date etc...
    base_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'
    const country = {};
    const zone = {};
    const city = {};
    var today = ''
    if (!date) {
        var d = new Date();
        today = dateFormater.mm_dd_yyyy(d)
    } else {
        today = dateFormater.mm_dd_yyyy(date);
    }
    fs.writeFile('./data/' + today + '.csv', '', function() {});
    process.stdout.write("Begining of the Request to " + base_url + today + ".csv ");

    //Begining of the request
    https.get(base_url + today + ".csv", (resp) => {
      let data = '';
      // A chunk of data has been recieved. we copy it into the corresponding file
      resp.on('data', (chunk) => {
        process.stdout.write(".");
        data += chunk
        fs.appendFile('./data/' + today + '.csv', chunk, function (err) {
            if (err) em.emit('scrapeFailFile', err.message);
        });
      });

      // The whole response has been received.
      resp.on('end', () => {
          console.log(" Request Done")
          if (data == GetErr) {
              em.emit('scrapeFailUrl', today);
              return;
          }
          // we parse it
          process.stdout.write("Starting parsing of the csv File ...")
          fs.createReadStream('./data/' + today + '.csv')
            .pipe(csv())
            .on('data', (data) => {
                if (!data.Admin2 && !data.Province_State) country[data.Country_Region] = data;
                else if (!data.Admin2) zone[data.Province_State] = data
                else city[data.Admin2] = data;
            })
            .on('end', () => {
                console.log(" Parsing Done")
                em.emit('scraped', {Country : country, Zone : zone, City : city});
            });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
      em.emit('scrapeFailRequest', "Error: " + err.message);
    });
}


getHistory = function(data) {
    today = new Date();
    firstDay = new Date("January 22, 2020");

    history = [];
    while (dateFormater.m_d_yy(today) != dateFormater.m_d_yy(firstDay)) {
        history.push(data[dateFormater.m_d_yy(firstDay)])
        firstDay.setDate(firstDay.getDate() + 1)
    }
    return(history);
}

exports.scrapDataHistory = function(em, res)  {
    //Initialisation of url and date etc...

    base_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
    const country = {};
    const zone = {};

    fs.writeFile('./data/' + 'History.csv', '', function() {});
    process.stdout.write("Begining of the Request to " + base_url);

    //Begining of the request
    https.get(base_url, (resp) => {
      let data = '';
      // A chunk of data has been recieved. we copy it into the corresponding file
      resp.on('data', (chunk) => {
        process.stdout.write(".");
        data += chunk
        var c = ''
        c += chunk

        fs.appendFile('./data/' + 'History.csv', c.replace(/\//g, "_"), function (err) {
            if (err) em.emit('scrapeFailFile', err.message);
        });
      });

      // The whole response has been received.
      resp.on('end', () => {
          console.log(" Request Done")
          if (data == GetErr) {
              em.emit('scrapeFailUrl', today);
              return;
          }
          // we parse it
          process.stdout.write("Starting parsing of the csv File ...")
          fs.createReadStream('./data/' + 'History.csv')
            .pipe(csv())
            .on('data', (data) => {
                if (!data.Province_State && res.Country[data.Country_Region]) res.Country[data.Country_Region].History = getHistory(data);
                else if (res.Zone[data.Province_State]) res.Zone[data.Province_State].History = getHistory(data);
            })
            .on('end', () => {
                console.log(" Parsing Done")
                em.emit('scraped', null);
            });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
      em.emit('scrapeFailRequest', "Error: " + err.message);
    });
}
