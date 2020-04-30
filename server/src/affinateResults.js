const dateFormater = require('./dateFormater');

function roughScale(x) {
  const parsed = parseInt(x, 10);
  if (isNaN(parsed)) { return 0 }
  return parsed;
}

exports.testResult = function(res) {
    process.stdout.write("Testing the integrity of the data ... ");
    if (Object.keys(res.Country).length < 90|| Object.keys(res.Zone).length < 43 || Object.keys(res.City).length < 700)
        return false;
    if (!res.Country["France"] || !res.Country["Afghanistan"] || !res.Country["Russia"] || !res.Country["Zimbabwe"])
        return false
    if (!res.Zone["Alberta"] || !res.Zone["Quebec"] || !res.Zone["Hubei"] || !res.Zone["Zhejiang"])
        return false
    if (!res.City["Abbeville"] || !res.City["Delta"] || !res.City["Mesa"] || !res.City["Zavala"])
        return false
    console.log("Done");
    return true;
}


exports.missingCountries = function(res) {
    process.stdout.write("Adding missing countries ... ");
    if (!res.Country["US"]) {
        res.Country["US"] = Object.assign({}, res.Country[Object.keys(res.Country)[0]]);
        res.Country["US"].Country_Region = "US";
        res.Country["US"].Lat = "39.381266";
        res.Country["US"].Long_ = "-97.922211";
        res.Country["US"].Combined_Key = "US";
        res.Country["US"].Confirmed = 0;
        res.Country["US"].Deaths = 0;
        res.Country["US"].Recovered =0;
        res.Country["US"].Active = 0;
        res.Country["US"].History = []
    }
    if (!res.Country["China"]) {
        res.Country["China"] = Object.assign({}, res.Country[Object.keys(res.Country)[0]]);
        res.Country["China"].Country_Region = "China";
        res.Country["China"].Lat = "35.486703";
        res.Country["China"].Long_ = "101.901875";
        res.Country["China"].Combined_Key = "China";
        res.Country["China"].Confirmed = 0;
        res.Country["China"].Deaths = 0;
        res.Country["China"].Recovered =0;
        res.Country["China"].Active = 0;
        res.Country["China"].History = []
    }
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
            res.Country["China"].Confirmed = roughScale(res.Country["China"].Confirmed, 10) + roughScale(data.Confirmed, 10);
            res.Country["China"].Deaths =  roughScale(res.Country["China"].Deaths, 10) + roughScale(data.Deaths, 10);
            res.Country["China"].Recovered =  roughScale(res.Country["China"].Recovered, 10) + roughScale(data.Recovered, 10);
            res.Country["China"].Active =  roughScale(res.Country["China"].Active, 10) + roughScale(data.Active, 10);
            if (data.History) {
                for (let i = 0; i < data.History.length; ++i) {
                    res.Country["China"].History[i] = roughScale(res.Country["China"].History[i], 10) + roughScale(data.History[i], 10);
                }
            }
        }
        if (data.Country_Region == "US") {
            res.Country["US"].Confirmed = roughScale(res.Country["US"].Confirmed, 10) + roughScale(data.Confirmed, 10);
            res.Country["US"].Deaths =  roughScale(res.Country["US"].Deaths, 10) + roughScale(data.Deaths, 10);
            res.Country["US"].Recovered =  roughScale(res.Country["US"].Recovered, 10) + roughScale(data.Recovered, 10);
            res.Country["US"].Active =  roughScale(res.Country["US"].Active, 10) + roughScale(data.Active, 10);
        }
    }
    for (key in res.City) {
        data = res.City[key];
        if (data.Country_Region == "US") {
            res.Country["US"].Confirmed = roughScale(res.Country["US"].Confirmed, 10) + roughScale(data.Confirmed, 10);
            res.Country["US"].Deaths =  roughScale(res.Country["US"].Deaths, 10) + roughScale(data.Deaths, 10);
            res.Country["US"].Recovered =  roughScale(res.Country["US"].Recovered, 10) + roughScale(data.Recovered, 10);
            res.Country["US"].Active =  roughScale(res.Country["US"].Active, 10) + roughScale(data.Active, 10);
        }
    }
    console.log("Done");
}

exports.Total = function(res) {
    process.stdout.write("Begining of total calculation ... ");
    res.Country["Total"] = Object.assign({}, res.Country[Object.keys(res.Country)[0]]);
    res.Country["Total"].Country_Region = "Total";
    res.Country["Total"].Lat = "0";
    res.Country["Total"].Long_ = "0";
    res.Country["Total"].Combined_Key = "Total";
    res.Country["Total"].Confirmed = 0;
    res.Country["Total"].Deaths = 0;
    res.Country["Total"].Recovered =0;
    res.Country["Total"].Active = 0;
    res.Country["Total"].History = new Array(res.Country[Object.keys(res.Country)[0]].History).fill(0);
    for (key in res.Country) {
        data = res.Country[key];
        if (data.Country_Region != "Total") {
            res.Country["Total"].Confirmed = roughScale(res.Country["Total"].Confirmed, 10) + roughScale(data.Confirmed, 10);
            res.Country["Total"].Deaths =  roughScale(res.Country["Total"].Deaths, 10) + roughScale(data.Deaths, 10);
            res.Country["Total"].Recovered =  roughScale(res.Country["Total"].Recovered, 10) + roughScale(data.Recovered, 10);
            res.Country["Total"].Active =  roughScale(res.Country["Total"].Active, 10) + roughScale(data.Active, 10);
            if (data.History) {
                for (let i = 0; i < data.History.length; ++i) {
                    res.Country["Total"].History[i] = roughScale(res.Country["Total"].History[i], 10) + roughScale(data.History[i], 10);
                    console.log(res.Country["Total"].History[i]);
                }
            }
        }
    }
    for (key in res.Zone) {
        data = res.Zone[key];
        if (data.Country_Region != "China" && data.Country_Region != "US") {
            res.Country["Total"].Confirmed = roughScale(res.Country["Total"].Confirmed, 10) + roughScale(data.Confirmed, 10);
            res.Country["Total"].Deaths =  roughScale(res.Country["Total"].Deaths, 10) + roughScale(data.Deaths, 10);
            res.Country["Total"].Recovered =  roughScale(res.Country["Total"].Recovered, 10) + roughScale(data.Recovered, 10);
            res.Country["Total"].Active =  roughScale(res.Country["Total"].Active, 10) + roughScale(data.Active, 10);
        }
        if (data.History && data.Country_Region != "China") {
            for (let i = 0; i < data.History.length; ++i) {
                res.Country["Total"].History[i] = roughScale(res.Country["Total"].History[i], 10) + roughScale(data.History[i], 10);
            }
        }
    }
    console.log("Done");
}
