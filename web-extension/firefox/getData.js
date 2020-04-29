
var field = '';
var value = '';
var optionDir = '';
var date = '';
var dataMode = '';
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
    h3.style.cssText = "color:#e00034; text-align:center;  font-size:xx-large; top:5px;";
    bar.appendChild(h3);

    if (dataMode == "number") {
        numberData(bar, resp);
    } else {
        graphData(bar, resp);
    }


}

function numberData(bar, resp) {

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
        //adding each elem inside the correct place
        textLine.appendChild(conf);
        textLine.appendChild(isded);
        textLine.appendChild(recov);
        textLine.appendChild(act);
        bar.appendChild(textLine);
        document.body.appendChild(bar);
}

function graphData(bar, resp) {

    var dd = document.createElement("div");
    dd.id = "coronaBoardBarline"

    var br = document.createElement("p");
    br.id = "coronaBoardBarbr";
    br.innerHTML = "</br>";

    var can = document.createElement("canvas");
    can.id = "coronaBoardBarCanvascase"
    can.innerHTML = "No data found for history"
    can.width = "300";
    can.height = "200";

    var can2 = document.createElement("canvas");
    can2.id = "coronaBoardBarCanvasNewcase"
    can2.innerHTML = "No data found for history"
    can2.width = "300";
    can2.height = "200";

    if (optionDir == "top" || optionDir == "bot") {
        if (optionDir == "top") {
            bar.style.cssText = "position:fixed; top:0; overflow:hidden; width:100%; background-color:#363031; height:auto";
        } else {
            bar.style.cssText = "position:fixed; bottom:0; overflow:hidden; width:100%; background-color:#363031; height:auto";
        }
        can.style.cssText = "   margin-left: auto; margin-right: 50px;"
        can2.style.cssText = "   margin-left: 50px; margin-right: auto;"
        dd.style.cssText = "display:flex; flex-direction:row;, top:0;"
    } else if (optionDir == "left" || optionDir == "right") {
        if (optionDir ==  "left") {
            bar.style.cssText = "position:fixed; top:0; overflow:hidden; width:auto; background-color:#363031; height:100%; z-index:1; left:0; padding-top:20px;";
        } else {
            bar.style.cssText = "position:fixed; top:0; overflow:hidden; width:auto; background-color:#363031; height:100%; z-index:1; right:0; padding-top:20px;";
        }
        dd.style.cssText = "padding-top:10px"
        dd.style.cssText = "display:flex; flex-direction:column;, top:0;"
    }

    can.style.cssText += "border:4px solid #000000; color=#3d4040;";
    can2.style.cssText += "border:4px solid #000000; color=#3d4040;";

    if (optionDir == "left" || optionDir == "right") {
        dd.appendChild(br);
    }
    dd.appendChild(can);
    if (optionDir == "left" || optionDir == "right") {
        dd.appendChild(br);
    }
    dd.appendChild(can2);
    bar.appendChild(dd);

    newCaseGraph(resp.data.History);
    caseGraph(resp.data.History);

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
    if (request.dataMode != null) {
        browser.storage.local.set({
            dataMode : request.dataMode
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
                let ge = browser.storage.local.get("dataMode");
                ge.then(function(it) {
                    dataMode = it.dataMode;
                    let getter = browser.storage.local.get("field");
                    getter.then(onGotField, onError);
                }, onError);
            }, onError);
        }, onError)
    }, onError);


}



browser.runtime.onMessage.addListener(whoIsIt);
loadValues();



///////////////////////////////////////////////////////////////////////

function caseGraph(history) {
    var canvas = document.getElementById("coronaBoardBarCanvascase");
    var ctx = canvas.getContext("2d");
    const h = canvas.height;
    const w = canvas.width;

    const mx = history.length;
    const maxW = w - 10;
    const minW = 20;
    const my = Math.max(...history);
    const maxH = h - 10;
    const minH = 20;
    const step = (maxW - minW) / mx;


    //Background
    ctx.fillStyle = "#474444";
    ctx.fillRect(0,0, w, h);


    //HUD
    ctx.strokeStyle = "#000"
    //x line
    ctx.moveTo(0, maxH);
    ctx.lineTo(w, maxH);
    ctx.stroke();
    //y line
    ctx.moveTo(minW, 0);
    ctx.lineTo(minW, h);
    ctx.stroke();



    // graph
    ctx.fillStyle = "#FF0000";
    for (var i = 0; i < history.length; ++i) {
        placePoint(history[i], i);
    }

    //max line
    ctx.setLineDash([4, 2]);
    ctx.strokeStyle = "#a8a0a0"
    ctx.moveTo(minW, minH);
    ctx.lineTo(maxW, minH);
    ctx.stroke();
    // 3/4 line
    ctx.moveTo(minW, (maxH + minH)  / 4);
    ctx.lineTo(maxW, (maxH + minH) / 4);
    ctx.stroke();
    // 1/2 line
    ctx.moveTo(minW, (maxH + minH) / 2);
    ctx.lineTo(maxW, (maxH + minH) / 2);
    ctx.stroke();
    // 1/4 line
    ctx.moveTo(minW, ((maxH + minH) / 4) * 3);
    ctx.lineTo(maxW, ((maxH + minH) / 4) * 3);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = "#000"
    ctx.fillStyle = "#78acf5";
    ctx.font = "20px Arial";
    ctx.fillText("0", 2, maxH + 2);
    ctx.fillText(my, 2, 17);
    ctx.font = "15px Arial";
    ctx.fillText(Math.round((my / 4) * 3), 2, (maxH + minH) / 4 - 3 );
    ctx.fillText(Math.round((my / 2)), 2, (maxH + minH) / 2 - 3);
    ctx.fillText(Math.round((my / 4)), 2, ((maxH + minH) / 4) * 3 - 3);



    function placePoint(value, i) {
        const resX = i * step + minW + step / 2;
        const percent = value * 100 / my;
        const revY = (percent * (maxH - minH) / 100);
        const resY = maxH - revY;  //;
        point(resX, resY);
    }

    function point(x, y) {
        ctx.beginPath();
        r = 5;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }
}


function newCaseGraph(hi) {
    var canvas = document.getElementById("coronaBoardBarCanvasNewcase");
    var ctx = canvas.getContext("2d");
    const h = canvas.height;
    const w = canvas.width;

    var history = [hi[0]];

    for (var i = 1; i < hi.length; ++i) {
        history.push(hi[i] - hi[i - 1]);
    }

    const mx = history.length;
    const maxW = w - 10;
    const minW = 20;
    const my = Math.max(...history);
    const maxH = h - 10;
    const minH = 20;
    const step = (maxW - minW) / mx;


    //Background
    ctx.fillStyle = "#474444";
    ctx.fillRect(0,0, w, h);


    //HUD
    ctx.strokeStyle = "#000"
    //x line
    ctx.moveTo(0, maxH);
    ctx.lineTo(w, maxH);
    ctx.stroke();
    //y line
    ctx.moveTo(minW, 0);
    ctx.lineTo(minW, h);
    ctx.stroke();

    //max line
    ctx.setLineDash([4, 2]);
    ctx.strokeStyle = "#a8a0a0"
    ctx.moveTo(minW, minH);
    ctx.lineTo(maxW, minH);
    ctx.stroke();
    // 3/4 line
    ctx.moveTo(minW, (maxH + minH)  / 4);
    ctx.lineTo(maxW, (maxH + minH) / 4);
    ctx.stroke();
    // 1/2 line
    ctx.moveTo(minW, (maxH + minH) / 2);
    ctx.lineTo(maxW, (maxH + minH) / 2);
    ctx.stroke();
    // 1/4 line
    ctx.moveTo(minW, ((maxH + minH) / 4) * 3);
    ctx.lineTo(maxW, ((maxH + minH) / 4) * 3);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = "#000"
    ctx.fillStyle = "#78acf5";
    ctx.font = "20px Arial";
    ctx.fillText("0", 2, maxH + 2);
    ctx.fillText(my, 2, 17);
    ctx.font = "15px Arial";
    ctx.fillText(Math.round((my / 4) * 3), 2, (maxH + minH) / 4 - 3 );
    ctx.fillText(Math.round((my / 2)), 2, (maxH + minH) / 2 - 3);
    ctx.fillText(Math.round((my / 4)), 2, ((maxH + minH) / 4) * 3 - 3);

    // graph
    ctx.fillStyle = "#FF0000";
    for (var i = 0; i < history.length; ++i) {
        placeBar(history[i], i);
    }

    function placeBar(value, i) {
        const resX = i * step + minW;
        const percent = value * 100 / my;
        const revY = (percent * (maxH - minH) / 100);
        const resY = maxH - revY;  //;
        bar(resX, resY);
    }

    function bar(x, y) {
        ctx.beginPath();
        r = 5;
        ctx.fillRect(x, y, step, maxH - y);
    }
}
