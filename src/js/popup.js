// get the button by id
let button = document.getElementById("runit");
// on button click do this ...
button.onclick = () => {
  //get the value of the selection 
  var e = document.getElementById("type");
  var type = e.options[e.selectedIndex].value;
  //get the value of the number input 
  var number = parseInt(document.getElementById("nbfriendrequests").value);
  //small check for the inputs 
  if (type && number && Number.isInteger(number)) {
    //inject the script into the browser tab and do the work ... 
    chrome.tabs.executeScript({
      code:
        'function Check(type) { var error = false; var error2 = false; var pawn; let people = []; if (type == "oldest") { let page = document.getElementsByClassName( "artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view" ); let currentpage = document.getElementsByClassName( " artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view" ); if (currentpage[0] != page[page.length - 1]) { page = page[page.length - 1].getElementsByTagName("button"); pawn = document.getElementsByClassName("invitation-card__action-btn")[0]; page[0].click(); } function getpeople() { if ( pawn != document.getElementsByClassName("invitation-card__action-btn")[0] ) { var oldpeople = document.getElementsByClassName( "invitation-card__action-btn" ); for (i = oldpeople.length - 1; i >= 0; i--) { people[oldpeople.length - 1 - i] = oldpeople[i]; } } else { error2 = true; } } getpeople(); return [error, people, error2]; } else if (type == "newest") { let page = document.getElementsByClassName( "artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view" ); let currentpage = document.getElementsByClassName( " artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view" ); if (currentpage[0] != page[0]) { page = page[0].getElementsByTagName("button"); pawn = document.getElementsByClassName("invitation-card__action-btn")[0]; page[0].click(); } /*********************************************** */ function getpeople() { if ( pawn != document.getElementsByClassName("invitation-card__action-btn")[0] ) { people = document.getElementsByClassName( "invitation-card__action-btn " ); } else { error2 = true; } } /******************************************************* */ getpeople(); return [error, people, error2]; } else { error = true; return [error, people, error2]; } } function dismissing() { let c = 0; dismiss = document.querySelectorAll( ".artdeco-toast-item__dismiss.artdeco-button.artdeco-button--circle.artdeco-button--muted" + ".artdeco-button--1.artdeco-button--tertiary.ember-view" ); dismiss.forEach((e) => { setTimeout(() => { e.click(); c++; if (c == dismiss.length) { alert("the process is completed successfully"); } }, 2000); }); } function Start(type, number) { if (Check(type)[2]) { setTimeout(() => { Start(type, number); }, 4000); } else { let count = 0; let check = Check(type); let index =0; let err = check[0]; let people = check[1]; function getjobdone(index,count){ setTimeout(()=> { people[index].click(); setTimeout(()=> { let confirm = document.getElementsByClassName( " artdeco-modal__confirm-dialog-btn  artdeco-button artdeco-button--2 artdeco-button--primary ember-view" ); confirm[0].click(); },1000*count); },3000*count); } if (number <= people.length && !err) { for (j = 0; j <= people.length - 1; j++) { if (count < number) { count++; getjobdone(index,count); index++; } } setTimeout(() => { if (count == number) { setTimeout(() => { dismissing(); }, 2000); } else if (number > count) { dismissing(); alert( "there is still left " + people.length - count + " uncanceled requests of " + people.length + " requests please try again " ); } }, 3500*number); } else if (number > people.length) { alert( "please enter a number that is less than or equal to  " + people.length ); } else if (err) { alert("some error accured please try again "); } } } setTimeout(() => { Start("'+type+'", '+number+'); }, 5000);',
    });
  } else {
    alert("please enter valid informations ");
  }
};

//this is the Js code that does all the job (because it's not clear up there )
//comments will be added soon :) ....

function Check(type) {
  var error = false;
  var error2 = false;
  var pawn;
  let people = [];
  if (type == "oldest") {
    let page = document.getElementsByClassName(
      "artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view"
    );
    let currentpage = document.getElementsByClassName(
      " artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view"
    );
    if (currentpage[0] != page[page.length - 1]) {
      page = page[page.length - 1].getElementsByTagName("button");
      pawn = document.getElementsByClassName("invitation-card__action-btn")[0];

      page[0].click();
    }
    function getpeople() {
      if (
        pawn !=
        document.getElementsByClassName("invitation-card__action-btn")[0]
      ) {
        var oldpeople = document.getElementsByClassName(
          "invitation-card__action-btn"
        );
        for (i = oldpeople.length - 1; i >= 0; i--) {
          people[oldpeople.length - 1 - i] = oldpeople[i];
        }
      } else {
        error2 = true;
      }
    }
    getpeople();
    return [error, people, error2];
    
  } else if (type == "newest") {
    let page = document.getElementsByClassName(
      "artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view"
    );
    let currentpage = document.getElementsByClassName(
      " artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view"
    );
    if (currentpage[0] != page[0]) {
      page = page[0].getElementsByTagName("button");
      pawn = document.getElementsByClassName("invitation-card__action-btn")[0];
      page[0].click();
    }



    /*********************************************** */


    function getpeople() {
      if (
        pawn !=
        document.getElementsByClassName("invitation-card__action-btn")[0]
      ) {
        people = document.getElementsByClassName(
          "invitation-card__action-btn "
        );
      } else {
        error2 = true;
      }
    }


    /******************************************************* */

      getpeople();
      return [error, people, error2];
  } else {
    error = true;
    return [error, people, error2];
  }
}
function dismissing() {
  let c = 0;
  dismiss = document.querySelectorAll(
    ".artdeco-toast-item__dismiss.artdeco-button.artdeco-button--circle.artdeco-button--muted" +
      ".artdeco-button--1.artdeco-button--tertiary.ember-view"
  );

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
  if (Check(type)[2]) {
    setTimeout(() => {
      Start(type, number);
    }, 4000);
  } else {
    let count = 0;
    let check = Check(type);
    let index =0;
    let err = check[0];
    let people = check[1];
    function getjobdone(index,count){
      setTimeout(()=> {
        people[index].click(); setTimeout(()=> {
        let confirm = document.getElementsByClassName(
          " artdeco-modal__confirm-dialog-btn  artdeco-button artdeco-button--2 artdeco-button--primary ember-view"
        );
        confirm[0].click();
       },1000*count);
      },3000*count);
    
    }
    if (number <= people.length && !err) {
      for (j = 0; j <= people.length - 1; j++) {
        if (count < number) {
          
          count++; 
          getjobdone(index,count);
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
          alert(
            "there is still left " +
              people.length -
              count +
              " uncanceled requests of " +
              people.length +
              " requests please try again "
          );
        }
      }, 3500*number);
     
     
    } else if (number > people.length) {
      alert(
        "please enter a number that is less than or equal to  " + people.length
      );
    } else if (err) {
      alert("some error accured please try again ");
    }
  }
}
