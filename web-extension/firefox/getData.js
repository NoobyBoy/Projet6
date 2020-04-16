
var field = '';
var value = '';

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
    console.log(url);
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(json => applyValue(json))
      .catch(error => console.log('error', error));

}

function applyValue(resp) {
    console.log(resp);
    var bar = document.createElement("div");
    bar.id = "coronaBoardBar"
    bar.class = "banner";

    var h2 = document.createElement("h2");
    h2.innerHTML = "<center>CoronaBoard</center>";
    h2.id = "coronaBoardBarh2";

    var h3 = document.createElement("h1");
    h3.id = "coronaBoardBarplocalisation"
    var txt =  resp.data.Country_Region
    if (resp.data.Province_State)
        txt = resp.data.Province_State + ", " + txt;
    if (resp.data.Admin2)
        txt = resp.data.Admin2 + ", " + txt;
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
    bar.style.cssText = "position:fixed; bottom:0; overflow:hidden; width:100%; background-color:#363031; height:auto";
    h2.style.cssText = "left:200px; color:#e00034";
    h3.style.cssText = "color:#e00034; text-align:center;  font-size:xx-large; top:5px;";
    textLine.style.cssText = "display:flex; flex-direction:row;, top:0;"
    conf.style.cssText = "text-align:center; width:25%; color:#e64825; font-weight:bold; font-size:large;";
    isded.style.cssText = "text-align:center; width:25%; color:#2552e6; font-weight:bold; font-size:large;";
    recov.style.cssText = "text-align:center; width:25%; color:#20d447; font-weight:bold; font-size:large;";
    act.style.cssText = "text-align:center; width:25%; color:#bd1e3e; font-weight:bold; font-size:large;";

    //adding each elem inside the correct place
    //bar.appendChild(h2);
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

function changeValues(request, sender, sendResponse) {
    if (request.field == null || request.field == null)
        loadValues();
    browser.storage.local.set({
        field : request.field,
        value : request.value
    });
    loadValues();
}

function loadValues() {
    let getter = browser.storage.local.get("field");
    getter.then(onGotField, onError);
}


function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

function insertBeast(beastURL) {
    var t = document.createTextNode(beastURL);
    document.body.appendChild(t);
}


browser.runtime.onMessage.addListener(changeValues);
loadValues();
