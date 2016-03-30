$(document).ready(function(){

  if($("#notebook").length > 0){
    retrieveNotebooks();
  }

  // Retrieve login information
  $("#loginCE").submit(function( event ) {
    var email = $("#email").val();
    var password = $("#password").val();

    loginCE(email, password)
    event.preventDefault();
  });

  // Launch logout function
  $("#logoutCE").submit(function(event) {
    logoutCE();
    event.preventDefault();
  });

  // Save a note
  $("#saveNote").submit(function( event ) {
    var subject = $("#subject").val();
    var notebook = $("#notebook").val();
    var body = $("#body").val();
    var tags = $("#tags").val();
    saveNote(subject, notebook, body, tags);
    event.preventDefault();
  });

  // grab highlighted text from the page
  // set up an event listener that triggers when chrome.extension.sendRequest is fired.
  chrome.extension.onRequest.addListener(
      function(request, sender, sendResponse) {
      // text selection is stored in request.selection
      $('textarea').val( request.selection );
  });

  if (chrome.tabs) {
      chrome.tabs.executeScript(null, {code: "chrome.extension.sendRequest({selection: window.getSelection().toString() });"});
  }

  // For links to the outside world
  $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
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

  xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);

      chrome.storage.sync.set({currentUser: response.user});

      changePopup('addANote.html')
    }
  }
  xhr.send(JSON.stringify(params));
}

function logoutCE() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", 'http://localhost:1337/logout', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == 4 && xhr.status == 200) {
      // var response = JSON.parse(xhr.responseText);
      changePopup('login.html')
    }
  }
  xhr.send();
}

// retrieves the current user's notebooks
function retrieveNotebooks() {
  chrome.storage.sync.get('currentUser', function(result) {
    if (result.currentUser) {
      var currentUser = result.currentUser;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", 'http://localhost:1337/api/notebooks/', true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
          var notebooksJSON = JSON.parse(xhr.responseText);

          var notebooks = [];

          for (var i = 0; i < notebooksJSON.length; i++) {
              notebooks.push([notebooksJSON[i].title, notebooksJSON[i]._id]);
          }

          chrome.storage.sync.set({notebooks: notebooks}, function() {
            for (var i = 0; i < notebooksJSON.length; i++) {
              var notebook = "<option>" + notebooksJSON[i].title + "</option>"
              $(notebook).appendTo("#notebook");
            }
          })

        }
      }
      xhr.send();
    }
  })
}

// Change to the correct view
function changePopup(url) {
  window.location.href = url;
  chrome.browserAction.setPopup({
      popup: url
  });
}

// Save a note to notebook
function saveNote(subject, notebook, body, tags) {
  var params = {
    subject: subject,
    notebook: notebook,
    body: body,
    tags: tags
  }

  chrome.storage.sync.get('currentUser', function(result) {
    var currentUser = result.currentUser;

    chrome.storage.sync.get('notebooks', function(result) {
      result = result.notebooks;

      var selectedNotebookName = $('#notebook').val();
      var selectedNotebookObj;

      for (var i = 0; i < result.length; i++) {
        console.log('getting here', result[i])
        if (result[i][0] === selectedNotebookName) var selectedNotebookObj = result[i];
      }

      console.log('selectedNotebookName?', selectedNotebookName);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://localhost:1337/api/notebooks/' + selectedNotebookObj[1] + '/notes/', true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
          window.location.href = 'noteSaved.html';
        }
      }
      xhr.send(JSON.stringify(params));
    })
  })
}

