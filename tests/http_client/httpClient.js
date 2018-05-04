// Imports.
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const fillForm = require('../tools_js/fillform.js');
const http = require('http');

module.exports = {
		doGetTo: function(url) {
			    // Self invoking module.
				return  (function(){
					return new Promise(function(resolve, reject) {
							console.log('URL is ' + url);
							http.get(url, (resp) => {
								  var data = '';
								  // A chunk of data has been received.
								  resp.on('data', (chunk) => {
									  console.log('chunk is ' + chunk);
								    data += chunk;
								  });
								  // The whole response has been received. Print out the result.
								  resp.on('end', () => {
									console.log(data);
								    console.log(JSON.parse(data));
								    resolve(data);
								  }); 
							}).on("error", (err) => {
									console.log("Error: " + err.message);
									reject("Error while HTTP request");
								});
					}); // End of return expression - return Promise.
			})();
		}
}