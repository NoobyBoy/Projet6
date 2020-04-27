
var field = '';
var value = '';
var optionDir = '';
var date = '';
var visible;
var value;


function onGotField(it) {
    field = it.field;
    let getter = browser.storage.local.get("value");
    getter.then(onGotValue, onError);
}
function onGotValue(it) {
    value = it.value;

    base_url = "http://localhost:8080/data/";
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      mode : 'no-cors'
    };
    url = base_url + field + "/" + value;
    if (date != "")
        url += "?date=" + date;
    console.log(url);
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(json => {value = json; applyValue(json)})
      .catch(error => console.log('error', error));

}

function applyValue(resp) {
    var bb = document.getElementById('coronaBoardBar')
    var bar;
    if (bb) {
        bb.innerHTML = "";
        bar = bb;
    } else {
        bar = document.createElement("div");
        bar.id = "coronaBoardBar"
        bar.class = "banner";
    }
    if (!visible)
        return;

    var h3 = document.createElement("h1");
    h3.id = "coronaBoardBarplocalisation"
    var txt =  resp.data.Country_Region
    if (resp.data.Province_State)
        txt = resp.data.Province_State + ", " + txt;
    if (resp.data.Admin2)
        txt = resp.data.Admin2 + ", " + txt;
    if (optionDir == 'left' || optionDir == 'right') txt = txt.split(', ').join('<br/>')
    h3.innerHTML =  "<center>" + txt + "</center>";

    var textLine = document.createElement("div");
    textLine.id = "coronaBoardBarline"

    var conf = document.createElement("p");
    conf.id = "coronaBoardBarlineconf";
    conf.innerHTML = "Confirmed case : " + resp.data.Confirmed;

    var isded = document.createElement("p");
    isded.id = "coronaBoardBarlineisded";
    isded.innerHTML = "Deaths : " + resp.data.Deaths;

    var recov = document.createElement("p");
    recov.id = "coronaBoardBarlinerecov";
    recov.innerHTML = "Recovered : " + resp.data.Recovered;

    var act = document.createElement("p");
    act.id = "coronaBoardBarlineact";
    act.innerHTML = "Active case : " + resp.data.Active;

    //applying css to the html
    console.log(optionDir);
    if (optionDir == "top" || optionDir == "bot") {
        if (optionDir == "top") {
            bar.style.cssText = "position:fixed; top:0; overflow:hidden; width:100%; background-color:#363031; height:auto";
        } else {
            bar.style.cssText = "position:fixed; bottom:0; overflow:hidden; width:100%; background-color:#363031; height:auto";
        }
        textLine.style.cssText = "display:flex; flex-direction:row;, top:0;"
        conf.style.cssText = "text-align:center; width:25%; color:#e64825; font-weight:bold; font-size:large;";
        isded.style.cssText = "text-align:center; width:25%; color:#2552e6; font-weight:bold; font-size:large;";
        recov.style.cssText = "text-align:center; width:25%; color:#20d447; font-weight:bold; font-size:large;";
        act.style.cssText = "text-align:center; width:25%; color:#bd1e3e; font-weight:bold; font-size:large;";
    } else if (optionDir == "left" || optionDir == "right") {
        if (optionDir ==  "left") {
            bar.style.cssText = "position:fixed; top:0; overflow:hidden; width:auto; background-color:#363031; height:100%; z-index:1; left:0; padding-top:20px;";
        } else {
            bar.style.cssText = "position:fixed; top:0; overflow:hidden; width:auto; background-color:#363031; height:100%; z-index:1; right:0; padding-top:20px;";
        }
        textLine.style.cssText = "padding-top:10px"
        conf.style.cssText = "text-align:center; padding-top:35%; color:#e64825; font-weight:bold; font-size:large;";
        isded.style.cssText = "text-align:center; padding-top:35%; color:#2552e6; font-weight:bold; font-size:large;";
        recov.style.cssText = "text-align:center; padding-top:35%; color:#20d447; font-weight:bold; font-size:large;";
        act.style.cssText = "text-align:center; padding-top:35%; color:#bd1e3e; font-weight:bold; font-size:large;";
    }
    h3.style.cssText = "color:#e00034; text-align:center;  font-size:xx-large; top:5px;";

    //adding each elem inside the correct place
    bar.appendChild(h3);
    textLine.appendChild(conf);
    textLine.appendChild(isded);
    textLine.appendChild(recov);
    textLine.appendChild(act);
    bar.appendChild(textLine);
    document.body.appendChild(bar);
}

function onError(er) {
  console.log(`Error: ${error}`);
}

function hide() {
    var bb = document.getElementById('coronaBoardBar')
    if (bb) {
        bb.innerHTML = "";
    }
}

function whoIsIt(request, sender, sendResponse) {
    if (request.type == null)
        return;
    if (request.type == "NewData")
        changeValues(request);
    if (request.type == "Option")
        changeOption(request);
}

function changeOption(request) {
    if (request.dir != null) {
        browser.storage.local.set({
            optionDir : request.dir
        });
    }
    if (request.visible != null) {
        browser.storage.local.set({
            visible : request.visible
        });
    }
    if (request.date != null) {
        browser.storage.local.set({
            date : request.date
        });
    }
    loadValues();
}

function changeValues(request) {
    if (request.field == null || request.field == null)
        loadValues();
    browser.storage.local.set({
        field : request.field,
        value : request.value
    });
    loadValues();
}

function loadValues() {
    let herewegoagain = browser.storage.local.get("date");
    herewegoagain.then(function(it){
        date = it.date;
        let yoyo = browser.storage.local.get("visible");
        yoyo.then(function(it) {
            visible = it.visible;
            if (!visible)
                return hide();
            let geto = browser.storage.local.get("optionDir");
            geto.then(function(it) {
                optionDir = it.optionDir;
                let getter = browser.storage.local.get("field");
                getter.then(onGotField, onError);
            }, onError);
        }, onError)
    }, onError);


}



browser.runtime.onMessage.addListener(whoIsIt);
loadValues();
