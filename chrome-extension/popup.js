$(document).ready(function(){

  // Testing: retrieve login information
  $("#loginCE").submit(function( event ) {
    var email = $("#email").val();
    var password = $("#password").val();
    loginCE(email, password);
    event.preventDefault();
  });

  // Testing with public notebooks route: Retrieve notebooks so that user can choose which notebook to add a note to
  $.ajax({
    url: "http://localhost:1337/api/public/notebooks/all",
    type: "GET",
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      $.each(data, function(notebook) {
        var notebook = "<option>" + notebook.title + "</option>"
        $(notebook).appendTo("#notebook option");
      })
    }
  });

});

// Testing: Login to the chrome extension
function loginCE(email, password) {
  $.ajax({
    url: "http://localhost:1337/login",
    type: "POST",
    data: {
      "email": email,
      "password": password
    },
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
    }
  });
}

// function retrieveNotebooks() {
  
// }


// Saving notes and retrieving user's notebook information

// function save() {
//   var xhr = new XMLHttpRequest();
//   // for example, when "add note" get request on save button
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

