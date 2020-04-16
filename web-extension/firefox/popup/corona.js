
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
}

browser.tabs.executeScript(null, { file: "/content_scripts/getData.js" });

document.addEventListener("click", (e) => {
  console.log("click");
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
        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id, {field: f, value : v});
        });
    }
  } else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
  } else {
      /*
      console.log(e.target.id);
      */
  }
});
