exports.missingCountries = function(res) {
    process.stdout.write("Adding missing countries ... ");
    res.Country["Us"] = res.Country["France"];
    res.Country["Us"].Country_Region = "US";
    res.Country["Us"].Lat = "39.381266";
    res.Country["Us"].Long_ = "-97.922211";
    res.Country["Us"].Combined_Key = "US";
    res.Country["China"] = res.Country["France"];
    res.Country["China"].Country_Region = "China";
    res.Country["China"].Lat = "35.486703";
    res.Country["China"].Long_ = "101.901875";
    res.Country["China"].Combined_Key = "China";
    console.log("Done");
}

exports.affinate = function(res) {
    process.stdout.write("Begining of the affination ... ");
    res.Country["Us"].History = new Array(res.Country["Us"].History.length).fill(0)
    res.Country["China"].History = new Array(res.Country["China"].History.length).fill(0)
    for (key in res.Zone) {
        data = res.Zone[key];
        if (res.Country[data.Country_Region]) {
            res.Country[data.Country_Region].Confirmed = parseInt(res.Country[data.Country_Region].Confirmed, 10) + parseInt(data.Confirmed, 10);
            res.Country[data.Country_Region].Deaths = parseInt(res.Country[data.Country_Region].Deaths, 10) + parseInt(data.Deaths, 10);
            res.Country[data.Country_Region].Recovered = parseInt(res.Country[data.Country_Region].Recovered, 10) + parseInt(data.Recovered, 10);
            res.Country[data.Country_Region].Active = parseInt(res.Country[data.Country_Region].Active, 10) + parseInt(data.Active, 10);
        }
    }
    for (key in res.City) {
        data = res.City[key];
        if (res.Country[data.Country_Region]) {
            res.Country[data.Country_Region].Confirmed = parseInt(res.Country[data.Country_Region].Confirmed, 10) + parseInt(data.Confirmed, 10);
            res.Country[data.Country_Region].Deaths = parseInt(res.Country[data.Country_Region].Deaths, 10) + parseInt(data.Deaths, 10);
            res.Country[data.Country_Region].Recovered = parseInt(res.Country[data.Country_Region].Recovered, 10) + parseInt(data.Recovered, 10);
            res.Country[data.Country_Region].Active = parseInt(res.Country[data.Country_Region].Active, 10) + parseInt(data.Active, 10);
        }
    }
    console.log("Done");
}
