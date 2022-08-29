
setTimeout(() => {
  // get the button by id
  let button = document.getElementById("runit");
  // on button click do this ...
  button.onclick = () => {
    //get the value of the selection
    var e = document.getElementById("type");
    var type = e.options[e.selectedIndex].value;
    const tabId = 2107527804
    console.log(tabId);
    //get the value of the number input
    var number = parseInt(document.getElementById("nbfriendrequests").value);
    //small check for the inputs
    if (type && number && Number.isInteger(number)) {
      //inject the script into the browser tab and do the work ...
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func:docReady(Start(type, number)),
            });
    } else {
      alert("please enter valid informations ");
    }
  };

}, 3000);



//this is the Js code that does all the job (because it's not clear up there )
//comments will be added soon :) ....
/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout              
 */

function waitForElement(querySelector, timeout = 0) {
  const startTime = new Date().getTime();
  return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
          const now = new Date().getTime();
          if (document.querySelector(querySelector)) {
              clearInterval(timer);
              resolve();
          } else if (timeout && now - startTime >= timeout) {
              clearInterval(timer);
              reject();
          }
      }, 100);
  });
}

function Check(type) {
  var error = false;
  var error2 = false;
  var pawn;
  let people = [];
  var totalfollowreq = Number.parseInt(document.getElementsByClassName("mt3 mr3 artdeco-pill artdeco-pill--blue artdeco-pill--3 artdeco-pill--toggle artdeco-pill--selected ember-view")[0].getAttribute("aria-label").split("(")[1].split(")")[0]);
  if (type == "oldest") {
      let pages = document.getElementsByClassName("artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view");
      let currentpage = document.getElementsByClassName(" artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view");
      if (currentpage[0] != pages[pages.length - 1] && totalfollowreq / pages.length >= 83.832) {
          let page = pages[pages.length - 1].getElementsByTagName("button");
          page[0].click();

          function getpeople() {
              if (totalfollowreq - ((pages.length) * 100.6) <= document.getElementsByClassName("invitation-card__action-btn").length) {
                  var oldpeople = document.getElementsByClassName("invitation-card__action-btn");
                  for (i = oldpeople.length - 1; i >= 0; i--) {
                      people[oldpeople.length - 1 - i] = oldpeople[i];
                  }
              } else {
                  error2 = true;
              }
          }
          getpeople();
      } else if (currentpage[0] != pages[pages.length - 1] && totalfollowreq / pages.length < 83.832) {
          let page = pages[pages.length - 2].getElementsByTagName("button");
          page[0].click();

          function getpeople() {
              if (totalfollowreq - ((pages.length - 1) * 100.6) <= document.getElementsByClassName("invitation-card__action-btn").length) {
                  var oldpeople = document.getElementsByClassName("invitation-card__action-btn");
                  for (i = oldpeople.length - 1; i >= 0; i--) {
                      people[oldpeople.length - 1 - i] = oldpeople[i];
                  }
              } else {
                  error2 = true;
              }
          }
          getpeople();
      } else if (currentpage[0] == pages[pages.length - 1]) {
          function getpeople() {
              if (totalfollowreq - ((pages.length - 1) * 100.6) <= document.getElementsByClassName("invitation-card__action-btn").length) {
                  var oldpeople = document.getElementsByClassName("invitation-card__action-btn");
                  for (i = oldpeople.length - 1; i >= 0; i--) {
                      people[oldpeople.length - 1 - i] = oldpeople[i];
                  }
              } else {
                  error2 = true;
              }
          }
          getpeople();
      }
      return [error, people, error2];
  } else if (type == "newest") {
      let pages = document.getElementsByClassName("artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view");
      let currentpage = document.getElementsByClassName(" artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view");
      if (currentpage[0] != pages[0]) {
          page = pages[0].getElementsByTagName("button");
          page[0].click();
      } /*********************************************** */
      function getpeople() {
          if (pawn != document.getElementsByClassName("invitation-card__action-btn")[0]) {
              people = document.getElementsByClassName("invitation-card__action-btn ");
          } else {
              error2 = true;
          }
      } /******************************************************* */
      getpeople();
      return [error, people, error2];
  } else {
      error = true;
      return [error, people, error2];
  }
}

function dismissing() {
  let c = 0;
  dismiss = document.querySelectorAll(".artdeco-toast-item__dismiss.artdeco-button.artdeco-button--circle.artdeco-button--muted" + ".artdeco-button--1.artdeco-button--tertiary.ember-view");
  dismiss.forEach((e) => {
      setTimeout(() => {
          e.click();
          c++;
          if (c == dismiss.length) {
              alert("the process is completed successfully");
          }
      }, 2000);
  });
}

function Start(type, number) {
  console.log(document.getElementsByClassName("mt3 mr3 artdeco-pill artdeco-pill--blue artdeco-pill--3 artdeco-pill--toggle artdeco-pill--selected ember-view"));
  var totalfollowreq = Number.parseInt(document.getElementsByClassName("mt3 mr3 artdeco-pill artdeco-pill--blue artdeco-pill--3 artdeco-pill--toggle artdeco-pill--selected ember-view")[0].getAttribute("aria-label").split("(")[1].split(")")[0]);
  if (Check(type)[2]) {
      setTimeout(() => {
          console.log("trying again");
          Start(type, number);
      }, 2000);
  } else {
      console.log("going ... ");
      let count = 0;
      let check = Check(type);
      let index = 0;
      let err = check[0];
      let people = check[1];
      console.log(people);

      function getjobdone(index, count) {
          setTimeout(() => {
              people[index].removeAttribute("disabled");
              people[index].click();
              waitForElement(".artdeco-modal__confirm-dialog-btn.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view", 3000 * count).then(function() {
                  let confirm = document.getElementsByClassName(" artdeco-modal__confirm-dialog-btn  artdeco-button artdeco-button--2 artdeco-button--primary ember-view");
                  confirm[0].click();
              }).catch(() => {
                  console.log("element did not load in 3 seconds");
              });
          }, 3100 * count);
      }
      if (number <= people.length && !err) {
          for (j = 0; j <= people.length - 1; j++) {
              if (count < number) {
                  count++;
                  getjobdone(index, count);
                  index++;
              }
          }
          setTimeout(() => {
              if (count == number) {
                  setTimeout(() => {
                      dismissing();
                  }, 2000);
              } else if (number > count) {
                  dismissing();
                  alert("there is still left " + people.length - count + " uncanceled requests of " + people.length + " requests please try again ");
              }
          }, 4000 * number);
      } else if (number > people.length && number <= totalfollowreq) {
          Start(type, people.length);
          setTimeout(() => {
              waitForElement(".invitation-card__action-btn", 3550 * people.length).then(function() {
                  Start(type, number - people.length);
              }).catch(() => {
                  console.log("element did not load in " + 3550 * people.length + " seconds");
              });
          }, 3750 * people.length);
      } else if (err) {
          alert("some error accured please try again ");
      }
  }
}

function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}












