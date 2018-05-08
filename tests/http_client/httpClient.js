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
								console.log('STATUS: ' + resp.statusCode);
								  var data = '';
								  // A chunk of data has been received.
								  resp.on('data', (chunk) => {
									console.log('chunk is ' + chunk);
								    data += chunk;
								  });
								  // The whole response has been received. Print out the result.
								  resp.on('end', () => {
									console.log('data is ' + data);
								    console.log(JSON.parse(data));
								    resolve(data);
								  }); 
							}).on("error", (err) => {
									console.log("Error: " + err.message);
									reject("Error while HTTP request");
								});
					}); // End of return expression - return Promise.
			})();
		},
		setResultToTestLink: function(res, testId){
			return new Promise((resolve, reject)=> {
				if(res === true)
				{
					console.log('request to test link is ' + testLinkconnection.testLinkURL + 'testid=' + testId + '&result=pass')
					doGetTo(testLinkconnection.testLinkURL + 'testid=' + testId + '&result=pass').then((resp) => {
						console.log('Test link response is ' + resp);
						resolve(res);
					}, (err)=> resolve(false)); 
				}else
				{
					doGetTo(testLinkconnection.testLinkURL + '&testid=' + testId + '&result=failed').then((resp)=> {
						console.log('Test link response is ' + resp);
						resolve(res);
					},(err) => {
						console.log("Test link err is " + err);
						resolve(false);
					});
				}
			});
		}
}