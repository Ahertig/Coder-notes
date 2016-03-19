$(document).ready(function(){

  $("#loginCE").submit(function( event ) {
    var email = $("#email").val();
    var password = $("#password").val();
    loginCE(email, password);
    event.preventDefault();
  });
});

function loginCE(email, password) {
  $.ajax({
    url: "http://localhost:1337/login",
    type: "POST",
    data: {
      "email": "email",
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

