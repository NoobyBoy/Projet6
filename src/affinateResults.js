exports.missingCountries = function(res) {
    process.stdout.write("Adding missing countries ... ");
    res.Country["US"] = Object.assign({}, res.Country["France"]);
    res.Country["US"].Country_Region = "US";
    res.Country["US"].Lat = "39.381266";
    res.Country["US"].Long_ = "-97.922211";
    res.Country["US"].Combined_Key = "US";
    res.Country["US"].History = []
    res.Country["China"] = Object.assign({}, res.Country["France"]);
    res.Country["China"].Country_Region = "China";
    res.Country["China"].Lat = "35.486703";
    res.Country["China"].Long_ = "101.901875";
    res.Country["China"].Combined_Key = "China";
    res.Country["China"].History = []

    console.log("Done");
}

exports.affinate = function(res) {
    fu = true;
    process.stdout.write("Begining of the affination ... ");
    for (key in res.Zone) {
        data = res.Zone[key];
        if (data.Country_Region == "China" && data.History) {
            if (fu == true) {res.Country["China"].History = Array.from(data.History); fu = false; continue}
            for (let i = 0; i < data.History.length; ++i) {
                res.Country["China"].History[i] = parseInt(res.Country["China"].History[i], 10) + parseInt(data.History[i], 10);
            }
        }
    }
    console.log("Done");
}
