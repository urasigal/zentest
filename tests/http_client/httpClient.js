// Imports.
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const fillForm = require('../tools_js/fillform.js');
const https = require('https');

module.exports = {
		doGetTo: function(url) {
			    // Self invoking module.
				return  (function(){
					return new Promise(function(resolve, reject) {  
							https.get(url, (resp) => {
								  let data = '';
								  // A chunk of data has been received.
								  resp.on('data', (chunk) => {
								    data += chunk;
								  });
								  // The whole response has been received. Print out the result.
								  resp.on('end', () => {
								    console.log(JSON.parse(data).explanation);
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