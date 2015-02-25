var fs = require('fs');
var path = require('path');
var nodeDir = require('node-dir');
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


var iterate_through_dir_list = function(dirList, finalScss) {
	dirList.forEach(function(entry) {
  	var importPath = '@import "';

    if (path.extname(entry) === '.hbs') {
      importPath = importPath + path.basename(entry, '.hbs');
      finalScss = finalScss + importPath + '";\n';
    }
  });

  return finalScss;
};


collection.forEach(function(data) {
	nodeDir.files(data.dir, function(err, files) {
		var names = [];
		var finalScssFile = '';
		var finalPath = './app/sass/' + data.name + '/_assemble-' + data.name +'.scss';

		console.log('Updating Assemble.io sass...');

		if (err) {
			throw err;
		}

		files.forEach(function(entry) {
			if (path.extname(entry) === '.hbs') {
	      var regex = new RegExp('^.+' + data.name + '/');
	      var name = path.basename(entry, '.hbs');

	      if (!/^_+/.test(name)) {
	      	name = '_' + name;
	      }

	      entry = entry.replace(regex, '');
	      entry = entry.split('/');
	      entry[entry.length - 1] = name;
	      entry = entry.join('/');
	      names.push(entry);
	    }
	  });

	  names.forEach(function(name) {
	  	var importPath = '@import "';

      importPath = importPath + name;
      finalScssFile = finalScssFile + importPath + '";\n';
	  });

	  fs.writeFile(finalPath, finalScssFile, function(err) {
	  	if (err) { throw err; }

	  	console.log('Done! ' + data.name + ' updated!');
	  });

	})
});