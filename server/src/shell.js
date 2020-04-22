var Input = require('prompt-input');
const dataRequest = require('./dataRequest');
const affinater = require('./affinateResults')
const database = require('./databaseManagement')
var EventEmitter = require('events').EventEmitter;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://NoobyBoy:testtest@data-6apbx.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connection to MongoDB Done !'))
  .catch(() => console.log('Connection to MongoDB failed !'));

function toUpper(str) {
return str
  .toLowerCase()
  .split(' ')
  .map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
  })
  .join(' ');
}


data = null;

ranger = function(daaa, range) {
    if (range == "countries" || range == "country") {
        return daaa.country;
    }
    if (range == "zones" || range == "zone") {
        return daaa.country;
    }
    if (range == "city" || range == "cities") {
        return daaa.country;
    }
}
var dd = new Input({
  name: 'date',
  message: 'date >'
});
var rr = new Input({
  name: 'range',
  message: 'range (countries, zones or cities) >'
});
var sp = new Input({
  name: 'specific',
  message: 'more precisely >'
});



commands = { "create": function(rest) {
    return new Promise((resolve, reject) => {
        if (rest[0]) {
            var em = new EventEmitter();
            database.FillForDate(rest[0], em, false);
        }
        else
            database.GetAllData(false);
        resolve(null);
    });
},
"read": function(rest) {
    return new Promise((resolve, reject) => {
        database.GetData(rest[0])
        .then(d => {console.log(d); resolve(null)})
        .catch(err => {console.log(err); reject(err)});
    });
},
"update": function(rest) {
    return new Promise((resolve, reject) => {
        if (rest[0]) {
            var em = new EventEmitter();
            database.FillForDate(rest[0], em, true);
        }
        else
            database.GetAllData(true);
        resolve(null);
    });
},
"delete": function(rest) {
    return new Promise((resolve, reject) => {
        if (rest[0]) {
            var em = new EventEmitter();
            database.DeleteForDate(rest[0], em);
        }
        else
            database.DeleteAllData();
        resolve(null);
    });
}
};



decode = function(answers) {
    answers = answers.split(" ");
    for (var i = 0; i < answers.length; i++) {
        answers[i] = answers[i].toLowerCase();
    }
    com = answers[0];
    answers.shift();
    if (commands[com]) {
        commands[com](answers)
        .then()
        .catch();
    }
}

var input = new Input({
  name: 'prompt',
  message: '>'
});

shell = function() {
    input.run()
      .then(function(answers) {
          if (answers) {
              decode(answers);
          }
          shell();
      });
}

exports.shell = shell;
