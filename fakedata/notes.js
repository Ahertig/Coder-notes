module.exports = [
	{
		"subject": "Intro to Express",
		"body": "* Express makes Node better at handling incoming http data\n* Express = \"node library for request handling\"\n* Express = a convenience\n* node’s request and response objects are built for handling requests and responses\n\n### Looking at an HTTP request\nRoute: verb or method plus URI  (often looks like a file path)\n\n_Verbs_: `GET` (read), `POST` (create), `PUT` (update), `DELETE`\n\n* Headers:  hostname plus meta information about browser\n* Body: string full of information for server\n\n### Looking at an HTTP response\n* Status code\n* Headers (includes length, type, date, and much more)\n* Body (i.e. payload)",
		"tags": ["express", "node", "javascript"],
		"dateCreated": "2016-01-19T15:04:35-08:00",
		"lastUpdate": "2016-03-24T09:39:41-07:00"
	},
	{
		"subject": "Express Tips and Tricks",
		"body": "**nodemon** is a useful package to auto-restart node server!\n\nInstructor quote: \"Always handle your errors!\"\n\n## examples\n\n    app.use(‘/path’)\n    next() \n    app.listen\n    app.get\n    app.all \n    response.send()\n    response.render() \n    response.end() \n    response.json \n    response.send()\n\n\n#### Recall:\n> Four score and seven errors ago, our forefathers brought forth upon this server a new application, conceived in Javascript, and dedicated to the proposition that all variables are instantiated equally.\n\n",
		"tags": ["express","javascript"],
		"dateCreated": "2016-03-21T16:48:10-07:00",
		"lastUpdate": "2016-03-29T00:41:15-07:00"
	},
	{
		"subject": "Write a spy function",
		"body": "https://repl.it/By9T\n\n     var spyOn = function (func) {\n      var callCount = 0,\n    \t  callVals  = [],\n    \t  retVals\t= [];\n      var spy = function () {\n    \tvar args = [].slice.call(arguments);\n    \tvar retVal = func.apply(this, args); // this is context\n    \tretVals.push(retVal);\n    \tcallVals = callVals.concat(args);\n    \tcallCount++;\n    \treturn retVal;\n      };\n      spy.getCallCount = function () { return callCount; };\n      spy.wasCalledWith = function (val) { return (callVals.indexOf(val) > -1); };\n      spy.returned = function (val) { return (retVals.indexOf(val) > -1); };\n      return spy;\n    };\n    \n    var person =\n    {name : \'ian\'\n    sayHi : function(greeting) {\n    return greeting + this.name\n    }\n    }\n\nuse call or apply to avoid this referring to global window object",
		"tags": ["testing", "REACTO"],
		"dateCreated": "2016-02-08T08:00:39-08:00",
		"lastUpdate": "2016-03-24T01:51:36-07:00"
	},
	{
		"subject": "Selection Sort",
		"body": "http://slides.com/gtelljohann/reacto-selection-sort#/1\n**Selection sort** starts at the first element in an array adn compares it with all elements to the right of it. It identifies the _smallest value_ and swaps the positions of those two elements. It then repeats the process with the rest of the array.\n\n    function selectionSort(array) {\n    \n    \t// For each element in the array...\n    \tfor (var i = 0; i < array.length; i++) {\n    \tvar minVal = array[i];\n    \tvar minIdx = i;\n    \n    \t// look through every element beginning there...\n    \tfor (var j = i + 1; j < array.length; j++) {\n    \n    \t\t// and keep track of the lowest one.\n    \t\tif (array[j] < array[minIdx]) {\n    \t\tminVal = array[j];\n    \t\tminIdx = j;\n    \t\t}\n    \t}\n    \n    \t// Swap the lowest value with the current element\n    \tarray[minIdx] = array[i];\n    \tarray[i] = minVal;\n    \t}\n    \treturn array;\n    \t}",
		"tags": ["javascript","REACTO"],
		"dateCreated": "2016-02-14T16:34:59-08:00",
		"lastUpdate": "2016-03-25T15:30:29-07:00"
	},
	{
		"subject": "Stack of stacks",
		"body": "Start with a data structure of fixed size: set of stacks and initialize with maximum value. If max value exceeded, create new stack\n\n### Possible solution \n \n     function Node(value) {\n     \tthis.value = value;\n     }\n\n     function Stack() {\n     \tthis.top = null;\n     \tthis.length = 0;\n     }\n     Stack.prototype.push = function(value) {\n     \tvar newNode = new Node(value);\n     \tif(!this.top) {\n     \t\tthis.top = newNode;\n     \t}\n     \telse {\n     \t\tnewNode.next = this.top;\n     \t\tthis.top = newNode;\n     \t}\n     }",
		"tags": ["javascript","REACTO"],
		"dateCreated": "2016-03-28T12:54:13-07:00",
		"lastUpdate": "2016-03-30T04:24:13-07:00"
	},
	{
		"subject": "Intro to Mongoose",
		"body": "Mongoose is MongoDB object modeling for NodeJS.\n###Example:\n     var mongoose = require('mongoose');\n     mongoose.connect('mongodb://localhost/test');\n     var Cat = mongoose.model('Cat', { name: String });\n     var kitty = new Cat({ name: 'Zildjian' });\n     kitty.save(function (err) {\n     \tif (err) {\n     \t\tconsole.log(err);\n     \t} else {\n     \t\tconsole.log('meow');\n     \t}\n     });",
		"tags": ["node","javascript","mongoose","mongodb","ORM"],
		"dateCreated": "2016-02-26T21:20:47-08:00",
		"lastUpdate": "2016-03-20T12:13:09-07:00"

	},
	{
		"subject": "Bubble Sort",
		"body": "A simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong order.",
		"tags": ["REACTO","javascript","algorithms"],
		"dateCreated": "2016-02-24T21:20:47-08:00",
		"lastUpdate": "2016-03-22T12:13:09-07:00"

	},
	{
		"subject": "Intro to NodeJS",
		"body": "* node = \"runtime environment\"\n* Chrome is also a runtime environment\n* module.exports is a way to store properties & functions across files\n* `module` is a global variable in node\n\n### require\n\n* finds a file\n* executes it\n* imports its files\n\n\n      var someVar = require(\'.\')\n      console.log(someVar.x);\n      var x = {\"blah\"} \n      module.exports =  { x:x };\n\nOR\n\n      module.exports.x = x;\n\n\n     function(input) { doSomething(input)});\n    output = aSyncFunc(foo,func() { return bar; }) \n        var nonRepeating = lines.filter(function(line, index) {\n      return line!=lines[index - 1];\n        })",
		"tags": ["node","javascript"],
		"dateCreated": "2016-02-20T21:20:47-08:00",
		"lastUpdate": "2016-03-18T12:13:09-07:00"
	},
	{
		"subject": "Sequelize",
		"body": "* **hasOne** * adds a foreign key to the target and singular association mixins to the source.\n* **belongsTo** * add a foreign key and singular association mixins to the source.\n* **hasMany** * adds a foreign key to target and plural association mixins to the source.\n* **belongsToMany** * creates an N:M association with a join table and adds plural association mixins to the source. The junction table is created with sourceId and targetId.",
		"tags": ["databases"],
		"dateCreated": "2016-03-13T20:31:26-07:00",
		"lastUpdate": "2016-03-30T20:57:10-07:00"
	},
	{
		"subject": "The JavaScript Engine",
		"body": "When V8 enters the _execution context_ of `bar` in the following code, a few steps will occur.\n\n     var foo = \'bar\';\n\n     function bar() {\n      var foo = \'baz\';\n     }\n\n     function baz(foo) {\n       foo = \'bam\';\n       bam = \'yay\';\n     }",
		"tags": ["javascript","browsers","compiling"],
		"dateCreated": "2016-03-03T16:08:48-08:00",
		"lastUpdate": "2016-03-19T19:15:36-07:00"
	},
	{
		"subject": "Lodash Note - Share with Ksenia!",
		"body": "Lodash Note for Ksenia\n### Check out these functions!\n#### Hello function\n\n     function hello() {\n          return \"hello\"\n     }\n     hello()\n\n#### Lodash function\n\n     var _ = require(\'lodash\')\n    \n     function testLodash() {\n            return _.chunk([\'a\', \'b\', \'c\', \'d\'], 2)\n     }\n    \n     testLodash()",
		"tags": ["lodash","javascript"],
		"dateCreated": "2016-02-09T10:23:05-08:00",
		"lastUpdate": "2016-03-02T00:44:25-08:00"
	}
]
