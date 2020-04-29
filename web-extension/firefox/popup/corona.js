
function openTab(tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tabZone");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
//  evt.currentTarget.className += " active";
  if (tabName == "Option") checkCorrectOne();
}

function checkCorrectOne() {
    let getter = browser.storage.local.get("optionDir");
    getter.then(function(it) {
        if (it.optionDir) {
            document.getElementById(it.optionDir).checked = true;
        }
        let yoyo = browser.storage.local.get("visible");
        yoyo.then(function(it) {
            document.getElementById("visible").checked = it.visible;
            let daaaaate = browser.storage.local.get("dataMode");
            daaaaate.then(function(it) {
                document.getElementById(it.dataMode).checked = true;
            }, function(err) {
                console.log(err);
            })
        }, function(err) {
            console.log(err);
        });
    }, function(err) {
        console.log(err);
    });
}

function whoIsChecked() {
    if (document.getElementById('bot').checked)
        return 'bot';
    if (document.getElementById('top').checked)
        return 'top';
    if (document.getElementById('left').checked)
        return 'left';
    if (document.getElementById('right').checked)
        return 'right';
}
function whoIsChecked2() {
    if (document.getElementById('number').checked)
        return 'number';
    if (document.getElementById('graph').checked)
        return 'graph';
}

function sendToAlltabs(message) {
    var gettingActiveTab = browser.tabs.query({currentWindow: true});
    gettingActiveTab.then((tabs) => {
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, message);
        }
    });
    var gettingActiveTab2 = browser.tabs.query({active : true, currentWindow: true});
    gettingActiveTab2.then((tabs) => {
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, message);
        }
    });
}

browser.tabs.executeScript(null, { file: "/content_scripts/getData.js" });

document.addEventListener("click", (e) => {
  whoIsChecked();
  if (e.target.classList.contains("tabZone")) {
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    openTab(e.target.textContent);

  } else if (e.target.classList.contains("validate")) {
    var f = e.target.id;
    var v = document.getElementsByName(e.target.id)[0].value;
    document.getElementsByName(e.target.id)[0].value = ""
    if (f && v) {
        console.log(f);
        console.log(v);
        sendToAlltabs({type : "NewData", field: f, value : v});
    }
  } else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
  }else if (e.target.classList.contains("save")) {
      console.log(whoIsChecked());
      console.log(whoIsChecked2());
      console.log(document.getElementById('visible').checked);
      console.log(document.getElementById('date').value);
      sendToAlltabs({type : "Option", dir: whoIsChecked(), visible: document.getElementById('visible').checked, date:document.getElementById('date').value, dataMode : whoIsChecked2()});
  } else {
      /*
      console.log(e.target.id);
      */
  }
});
