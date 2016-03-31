app.factory('TonicFactory', function() {
	var TonicFactory = {};

	// Use this function to get selected text in window
	TonicFactory.getSelectionText = function() {
	    var text = "";
	    if (window.getSelection) {
	        text = window.getSelection().toString();
	    } else if (document.selection && document.selection.type != "Control") {
	        text = document.selection.createRange().text;
	    }
	    return text;
	}

	// Use this function to get selected text in textarea
	// TonicFactory.getSelectionText = function() {
	// 	// obtain the object reference for the <textarea>
	//     var txtarea = document.getElementById("notebody");
	//     // obtain the index of the first selected character
	//     var start = txtarea.selectionStart;
	//     // obtain the index of the last selected character
	//     var finish = txtarea.selectionEnd;
	//     // obtain the selected text
	//     var sel = txtarea.value.substring(start, finish);
	//     // do something with the selected content
	//     return sel;
	// }

	// TonicFactory.runTonic = function() {
	// 	console.log('hello')
	// 	document.getElementById("my-element").innerHTML = "";
	// 	var notebook = Tonic.createNotebook({
	// 	    element: document.getElementById("my-element"),
	// 	    source: TonicFactory.getSelectionText()
	// 	})
	// }

	return TonicFactory;
})




