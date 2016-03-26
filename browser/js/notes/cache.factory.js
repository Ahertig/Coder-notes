app.factory('CacheFactory', function() {
	var CacheFactory = {}
	CacheFactory.cache = {
    	notes: [],
    	myNotebooks: [],
    	sharedNotebooks: [],
    	tags: [], 
    	currentNote: [], 
    	currentNotebook: []
    }

    CacheFactory.setCache = function(obj) {
    	angular.copy(obj.data, CacheFactory.cache[obj.type]);
        return CacheFactory.cache[obj.type];
    }

    CacheFactory.updateCache = function(itemType, newData, action) {
        if(newData && typeOfUpdate === "add")  {
            cache[itemType].push(newData)       
        } else if(newData && itemTypeOfUpdate === "remove") {
            var index = cache[itemType].indexOf(newData);
            cache[itemType].splice(index, 1)
        } else if(newData && itemTypeOfUpdate === "update") {
            var index = cache[itemType].indexOf(newData);
            cache[itemType][index] = newData;
        }

    }

    CacheFactory.getCache = function() {
    	return CacheFactory.cache;
        return cache[type];
    }

    return CacheFactory
})


   
