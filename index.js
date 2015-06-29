/**
 * index.js
 * 
 * main entry point to NPM 
 * exports main module which should be located in lib and be a file named the same name of the package
 * ex: apihero-ui-mymodule should have lib/apihero-ui-mymodule.js in lib
 * 
 * exports an array of paths which can be defined in package.json for apihero module loaders to locate files they may be interested in.
 * refer to the documentation for apihero module for specifics
 */
if (typeof process == 'undefined') return;
var fs   = require('fs');
var path = require('path');
var pkg	 = require("./package.json");
var main = path.join('./lib', pkg.name);
module.exports = fs.existsSync(main) ? require(main) : {};
module.exports.paths = (pkg.hasOwnProperty('files') ? pkg.files : []).map( function(file) {
	return path.join(__dirname, file);
});