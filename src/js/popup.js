// get the button by id
let button = document.getElementById("runit");

button.onclick = () => {
  window.close();
  var e = document.getElementById("type");
  var type = e.options[e.selectedIndex].value;
  var number = document.getElementById("friendrequests").value;
  if (type && number) {
    chrome.tabs.executeScript({
      code:
        'function unfollow(type, number) { var people = []; let count = 0; var error = false; if (type == "oldest") { let page = document.querySelectorAll( ".artdeco-pagination__indicator.artdeco-pagination__indicator--number.ember-view" ); page = page[page.length - 1].getElementsByTagName("button"); page[0].click(); setTimeout(() => { var oldpeople = document.getElementsByClassName( "invitation-card__action-btn" ); for (i = oldpeople.length - 1; i >= 0; i--) { people[oldpeople.length - 1 - i] = oldpeople[i]; } }, 1000); } else if (type == "newest") { let page = document.querySelectorAll( ".artdeco-pagination__indicator.artdeco-pagination__indicator--number.ember-view" ); page = page[0].getElementsByTagName("button"); page[0].click(); setTimeout(() => { people = document.getElementsByClassName("invitation-card__action-btn "); }, 1000); } else { console.log("some error accured please try again "); error = true; } setInterval(function () { for (j = 0; j <= people.length - 1; j++) { if (!error) { if (count < number) { people[j].click(); let confirm = document.querySelector( ".artdeco-modal__confirm-dialog-btn.artdeco-modal__confirm-dialog-btn" + ".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view" ); confirm.click(); function dismissing() { dismiss = document.querySelector( ".artdeco-toast-item__dismiss.artdeco-button.artdeco-button--circle.artdeco-button--muted" + ".artdeco-button--1.artdeco-button--tertiary.ember-view" ); if (dismiss != null) { dismiss.click(); } } setTimeout(() => { dismissing(); }, 1000); count++; } } } }, 1000); } unfollow("'+type+'", '+number+');',
    });
  } else {
    alert("please enter valid informations ");
  }
};

