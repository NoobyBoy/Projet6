var EventEmitter = require('events').EventEmitter;
const dataRequest = require('./dataRequest');

exports.getDeath = function() {
    return new Promise((resolve, reject) => {
        var em3 = new EventEmitter();
        dataRequest.getDeathByDay(em3);
        em3.on('scraped', function(result) {
            resolve(result);
        })

        em3.on('scrapeFailRequest', function(result) {
            reject(result);
        });

        em3.on('scrapeFailFile', function(result) {
            reject(result);
        });
    });
}
