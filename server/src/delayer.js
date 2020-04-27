const shell = require('./shell');

var timer = 1000 * 60 * 60 * 24; // one Day

setTimer = function(time) {
    if (!time)
        return;
    t = Number(time);
    timer = t * 1000;
}


LaunchWaiter = function() {
    setTimeout(() => {
        shell.decode('create-missing');
        LaunchWaiter();
    }, timer);
}

exports.LaunchWaiter = LaunchWaiter;
exports.setTimer = setTimer
