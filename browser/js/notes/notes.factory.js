app.factory('NotesFactory', function($http) {
	var NotesFactory = {};

	// NotesFactory.fetchMyNotes = function(id) {
	// 	return $http.get('/api/users/'+ id + '/notebooks')
	// 	.then(function(response) {
	// 		return response.data;
	// 	})

	// }

	NotesFactory.fetchMyNotebooks = function(id) {
		console.log("in notesfactory fetchMyNotebooks. fetching data for user",id)
		return $http.get('/api/users/'+ id + '/notebooks/own')
		.then(function(response) {
			console.log("got notebook data", response.data)
			return response.data;
			// res.json(response.data);
		}, function(err) {
			console.error("could not fetch notebooks for user",id)
		})

	}

	NotesFactory.tags = ["orange","yellow","red","green","violet"]

	// NotesFactory.notebooks = [
	// 	{
	// 		"title": "iaculis odio."
	// 	},
	// 	{
	// 		"title": "luctus lobortis."
	// 	},
	// 	{
	// 		"title": "Nam ac"
	// 	},
	// 	{
	// 		"title": "magna. Cras"
	// 	},
	// 	{
	// 		"title": "erat nonummy"
	// 	},
	// 	{
	// 		"title": "Nullam lobortis"
	// 	},
	// 	{
	// 		"title": "dis parturient"
	// 	},
	// 	{
	// 		"title": "Nam porttitor"
	// 	},
	// 	{
	// 		"title": "Duis gravida."
	// 	}]

	NotesFactory.notes = [
		{
			"_id" : "001",
			"subject": "dolor, nonummy ac,",
			"body": "sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit eget laoreet posuere, enim nisl elementum purus, accumsan interdum",
			"size": 55,
			"tags": ["orange"],
			"dateCreated": "1443597123",
			"lastUpdate": "1436909663"
		},
		{
			"_id" : "002",
			"subject": "nec mauris blandit",
			"body": "sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque",
			"size": 95,
			"tags": ["yellow"],
			"dateCreated": "1431964328",
			"lastUpdate": "1426507385"
		},
		{
			"_id" : "003",
			"subject": "eu, euismod ac,",
			"body": "congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et",
			"size": 89,
			"tags": ["red"],
			"dateCreated": "1451088738",
			"lastUpdate": "1442746785"
		},
		{
			"_id" : "004",
			"subject": "Maecenas libero est,",
			"body": "et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo",
			"size": 85,
			"tags": ["yellow"],
			"dateCreated": "1430325491",
			"lastUpdate": "1436728534"
		},
		{
			"_id" : "005",
			"subject": "sed, est. Nunc",
			"body": "a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien.",
			"size": 82,
			"tags": ["yellow"],
			"dateCreated": "1434187023",
			"lastUpdate": "1445510773"
		},
		{
			"_id" : "006",
			"subject": "nulla. Cras eu",
			"body": "lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam.",
			"size": 62,
			"tags": ["green"],
			"dateCreated": "1443720520",
			"lastUpdate": "1429268890"
		}]


	return NotesFactory; 
})