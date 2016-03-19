$(document).ready(function(){

  $("#loginCE").submit(function( event ) {
    loginCE();
    event.preventDefault();
  });
});

function loginCE() {
  console.log('inside login function')
  $.ajax({
    url: "http://localhost:1337/login",
    type: "POST",
    data: {
      "username": "username",
      "password": "password",
    },
    dataType: "html",
    success: function(data) {
      //
    }
  });
}


// Saving notes and retrieving user's notebook information

// function save() {
//   var xhr = new XMLHttpRequest();
//   // for example, when "add note" get request on save button
//   // is this like an event emitter or what the fuck?
//   xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
//   xhr.open("POST", chrome.extension.getURL('http://localhost:1337/api/:userId/:notebookId/notes'), true);
//   xhr.send();
// }


// function retrieveNotebooks() {
//   var xhr = new XMLHttpRequest();
//   // for example, when "add note" get request on save button
//   xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
//   xhr.open("GET", chrome.extension.getURL('http://localhost:1337/api/:userId/notebooks/'), true);
//   xhr.send();
// }

