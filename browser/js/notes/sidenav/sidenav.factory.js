app.factory('SideNavFactory', function(NotesFactory, NotebookFactory) {

	var sideNavAPI = {
		
		createNote: function(notebook) {
			return NotesFactory.newNote(notebook._id)
			.then(function(newNote){
				console.log("sidenav newnote", newNote)
				NotesFactory.setCurrentNote(newNote);
				NotebookFactory.setCurrentNotebook(notebook);
			});
		},

		createNotebook: function(notebookTitle) {

			return NotebookFactory.createNotebook(notebookTitle)
			.then(function(newNotebook) {
				return sideNavAPI.createNote(newNotebook)
			})
		}
	}

	return sideNavAPI;

})	