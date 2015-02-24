var fs = require('fs');
var path = require('path');
var collection = [
	{
		'name': 'partials',
		'dir': './app/assemble/partials'
	},
	{
		'name': 'modules',
		'dir': './app/assemble/modules'
	}
];

var createScss = function(e) {
	var finallScss = '';
	console.log('Updating Assemble.io sass...');

	fs.readdir(e.dir, function(err, list) {
	  if (err) { throw err; }

	  var finalPath = './app/sass/' + e.name + '/_assemble-' + e.name +'.scss';

	  list.forEach(function(e) {
	  	var data = '@import "';

	    if (path.extname(e) === '.hbs') {
	      data = data + path.basename(e, '.hbs');
	      finallScss = finallScss + data + '";\n';
	    }
	  })

	  fs.writeFile(finalPath, finallScss, function(err) {
	  	if (err) { throw err; }

	  	console.log('Done! ' + e.name + ' updated!');
	  });
	});
};

collection.forEach(function(data) {
	createScss(data);
});