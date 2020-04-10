exports.missingCountries = function(res) {
    process.stdout.write("Adding missing countries ... ");
    res.Country["US"] = Object.assign({}, res.Country["France"]);
    res.Country["US"].Country_Region = "US";
    res.Country["US"].Lat = "39.381266";
    res.Country["US"].Long_ = "-97.922211";
    res.Country["US"].Combined_Key = "US";
    res.Country["US"].Confirmed = 0;
    res.Country["US"].Deaths = 0;
    res.Country["US"].Recovered =0;
    res.Country["US"].Active = 0;
    res.Country["US"].History = []
    res.Country["China"] = Object.assign({}, res.Country["France"]);
    res.Country["China"].Country_Region = "China";
    res.Country["China"].Lat = "35.486703";
    res.Country["China"].Long_ = "101.901875";
    res.Country["China"].Combined_Key = "China";
    res.Country["China"].Confirmed = 0;
    res.Country["China"].Deaths = 0;
    res.Country["China"].Recovered =0;
    res.Country["China"].Active = 0;
    res.Country["China"].History = []

    console.log("Done");
}

exports.affinate = function(res) {
    fc = true;
    process.stdout.write("Begining of the affination ... ");
    // other than History -> US - CHina
    for (key in res.Zone) {
        data = res.Zone[key];
        if (data.Country_Region == "China") {
            if (fc == true && data.History) {
                res.Country["China"].History = new Array(data.History.length).fill(0);
                fc = false;
            }
            res.Country["China"].Confirmed = parseInt(res.Country["China"].Confirmed, 10) + parseInt(data.Confirmed, 10);
            res.Country["China"].Deaths =  parseInt(res.Country["China"].Deaths, 10) + parseInt(data.Deaths, 10);
            res.Country["China"].Recovered =  parseInt(res.Country["China"].Recovered, 10) + parseInt(data.Recovered, 10);
            res.Country["China"].Active =  parseInt(res.Country["China"].Active, 10) + parseInt(data.Active, 10);
            if (data.History) {
                for (let i = 0; i < data.History.length; ++i) {
                    res.Country["China"].History[i] = parseInt(res.Country["China"].History[i], 10) + parseInt(data.History[i], 10);
                }
            }
        }
        if (data.Country_Region == "US") {
            res.Country["US"].Confirmed = parseInt(res.Country["US"].Confirmed, 10) + parseInt(data.Confirmed, 10);
            res.Country["US"].Deaths =  parseInt(res.Country["US"].Deaths, 10) + parseInt(data.Deaths, 10);
            res.Country["US"].Recovered =  parseInt(res.Country["US"].Recovered, 10) + parseInt(data.Recovered, 10);
            res.Country["US"].Active =  parseInt(res.Country["US"].Active, 10) + parseInt(data.Active, 10);
        }
    }
    for (key in res.City) {
        data = res.City[key];
        if (data.Country_Region == "US") {
            res.Country["US"].Confirmed = parseInt(res.Country["US"].Confirmed, 10) + parseInt(data.Confirmed, 10);
            res.Country["US"].Deaths =  parseInt(res.Country["US"].Deaths, 10) + parseInt(data.Deaths, 10);
            res.Country["US"].Recovered =  parseInt(res.Country["US"].Recovered, 10) + parseInt(data.Recovered, 10);
            res.Country["US"].Active =  parseInt(res.Country["US"].Active, 10) + parseInt(data.Active, 10);
        }
    }
    console.log("Done");
}

exports.Total = function(res) {
    process.stdout.write("Begining of total calculation ... ");
    res.Country["Total"] = Object.assign({}, res.Country["France"]);
    res.Country["Total"].Country_Region = "Total";
    res.Country["Total"].Lat = "0";
    res.Country["Total"].Long_ = "0";
    res.Country["Total"].Combined_Key = "Total";
    res.Country["Total"].Confirmed = 0;
    res.Country["Total"].Deaths = 0;
    res.Country["Total"].Recovered =0;
    res.Country["Total"].Active = 0;
    res.Country["Total"].History = new Array(res.Country["France"].History.length).fill(0);
    for (key in res.Country) {
        data = res.Country[key];
        if (data.Country_Region != "Total") {
            res.Country["Total"].Confirmed = parseInt(res.Country["Total"].Confirmed, 10) + parseInt(data.Confirmed, 10);
            res.Country["Total"].Deaths =  parseInt(res.Country["Total"].Deaths, 10) + parseInt(data.Deaths, 10);
            res.Country["Total"].Recovered =  parseInt(res.Country["Total"].Recovered, 10) + parseInt(data.Recovered, 10);
            res.Country["Total"].Active =  parseInt(res.Country["Total"].Active, 10) + parseInt(data.Active, 10);
            if (data.History) {
                for (let i = 0; i < data.History.length; ++i) {
                    res.Country["Total"].History[i] = parseInt(res.Country["Total"].History[i], 10) + parseInt(data.History[i], 10);
                }
            }
        }
    }
    for (key in res.Zone) {
        data = res.Zone[key];
        if (data.Country_Region != "China" && data.Country_Region != "US") {
            res.Country["Total"].Confirmed = parseInt(res.Country["Total"].Confirmed, 10) + parseInt(data.Confirmed, 10);
            res.Country["Total"].Deaths =  parseInt(res.Country["Total"].Deaths, 10) + parseInt(data.Deaths, 10);
            res.Country["Total"].Recovered =  parseInt(res.Country["Total"].Recovered, 10) + parseInt(data.Recovered, 10);
            res.Country["Total"].Active =  parseInt(res.Country["Total"].Active, 10) + parseInt(data.Active, 10);
        }
        if (data.History && data.Country_Region != "China") {
            for (let i = 0; i < data.History.length; ++i) {
                res.Country["Total"].History[i] = parseInt(res.Country["Total"].History[i], 10) + parseInt(data.History[i], 10);
            }
        }
    }
    console.log("Done");
}
