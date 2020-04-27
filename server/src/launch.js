const database = require('./databaseManagement');
const shell = require('./shell');
const delayer = require('./delayer');


ParseArg = function(arg, next) {
    switch (arg) {
        case 'help':
            console.log("yup");
            break;
        case 'no-logs':
            console.log = function() {};
            process.stdout.write = function() {};
            break;
        case 'update-all':
            shell.decode('update');
            break;
        case 'update':
            shell.decode('update ' + next);
            break;
        case 'create-all':
            shell.decode('create');
            break;
        case 'create':
            shell.decode('create ' + next);
            break;
        case 'delete-all':
            shell.decode('delete');
            break;
        case 'delete':
            shell.decode('delete ' + next);
            break;
        case 'create-missing':
            shell.decode('create-missing');
            break;
        case 'delay':
            delayer.setTimer(next);
        default:
            break;
    }
}

CleanArg = function(arg) {
    return arg.slice(0, 2).split('-').join('') + arg.slice(2);
}

exports.LaunchServer = function() {
    return new Promise((resolve, reject) => {
        var av = process.argv.slice(2);
        av.forEach(function(arg, i, arr) {ParseArg(CleanArg(arg), arr[i + 1]);});
        resolve();
    });
}
