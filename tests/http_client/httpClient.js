// Imports.
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const fillForm = require('../tools_js/fillform.js');
const https = require('https');

module.exports = {
		doGetTo: function(url) {
			function validURL(url) {
				  var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
				    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
				    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
				    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
				    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
				    '(\#[-a-z\d_]*)?$','i'); // fragment locater
				  if(!pattern.test(str)) {
				    alert("Please enter a valid URL.");
				    return false;
				  } else {
				    return true;
				  }
				}
			return  (function(){
				return new Promise(function(resolve, reject) {
					if(validURL(url))
					{	  
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
					}
				}); // End of return expression - return Promise.
			})();
		}
}