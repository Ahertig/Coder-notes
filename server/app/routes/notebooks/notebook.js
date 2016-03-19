//get a notebook of a user
router.get('/:notebookID', function(req, res,next){
	Notebook.findById(req.params.notebookID)
	.then(function(notebook){
		res.send(notebook);
	})
	.then(null. next)
})



//update existing notebook 
router.put('/:notebookID', function(req, res, next) {
    
	Notebook.findByID(req.params.notebookID)
	.then(function(notebook){
		notebook.set(res.body);
		return notebook.save()
	})
	.then(function(updatednotebook){
		res.send(updatednotebook);
	})
	.then(null, next)
})

//remove a notebook 
router.delete('/:notebookID', function(req, res, next){
	var notebook;
	Notebook.findByID(req.params.notebookID)
	.populate('notes')
	.then(function(_notebook){
		notebook = _notebook;
		return Promise.map(notebook.notes, function(note){
			note.trash = true;
		})
	})
	.then(function(){
		notebook.remove()
	})
    // need to delete notebookID from user notebooks
    //to be continued :)
})

router.use('/:notebookId/notes', require('../notes'));