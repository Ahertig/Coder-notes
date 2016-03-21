console.log(this);

$(document).ready(function(){

  // Retrieve login information
  $("#loginCE").submit(function( event ) {
    var email = $("#email").val();
    var password = $("#password").val();
    loginCE(email, password);
    event.preventDefault();
  });

  // Save a note
  $("#saveNote").submit(function( event ) {
    var body = $("#body").val();
    saveNote(body);
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

// Login to the chrome extension
function loginCE(email, password) {
  var params = {
    email: email,
    password: password
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:1337/login', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.setRequestHeader("Content-length", params.length);
  xhr.setRequestHeader("Connection", "close");

  xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == 4 && xhr.status == 200) {
      changePopup('popup.html')
    }
  }
  xhr.send(JSON.stringify(params));
}

// Change to the correct view
function changePopup(url) {
  chrome.browserAction.setPopup({
      popup: url
  });
}

// Save a note to notebook
function saveNote(body) {
  var params = {
    body: body,
    subject: "here's a subject"
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:1337/api/users/56edbb745da4ce9ea00313a8/notebooks/56edbb745da4ce9ea0031377/notes/', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      changePopup('noteSaved.html')
    }
  }
  xhr.send(JSON.stringify(params));
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

