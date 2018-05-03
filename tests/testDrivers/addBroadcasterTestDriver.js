// Imports.
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const fillForm = require('../tools_js/fillform.js');
const httpClient = require('../http_client/httpClient.js');
const testLinkconnection = require('../test_link/testlink_cong.js');

// This module exports function that creates a new cluster in ZEN.
module.exports = {
		// Setup part.
		//////////////////////////////////////////////////////////////////////////////
		addBroadcaster: function(clusterConf, testId) {
			// This is the Promise object returned to 
			return  new Promise((resolve, reject) => {
			// Fill a broadcaster's (cluster) form.
			var broadcasterPannel = locations.broadcasterDashboardSelector();
			broadcasterPannel.click().then(function() {
				return new Promise((resolve, reject) => {resolve()});
			}).then(() => { return fillForm.fillNewBroadcasterFormAndSave(clusterConf);}).then( () => {
		// Testing part
		//////////////////////////////////////////////////////////////////////////////
			// Check if cluster was added.
			var broadcasterPannel = locations.broadcasterDashboardSelector();
				browser.sleep(5000).then(function(){
					return broadcasterPannel.click();
				}).then(function(){
					return fillForm.parseBroadcasterTable(clusterConf.clusterName);
					}).then(function(res){
							console.log('Cluster res is ' + res);
							// Make HTTP request
							if(res === true)
							{
								console.log('request to test link is ' + testLinkconnection.testLinkURL + 'testid=' + testId + '&result=pass')
								httpClient.doGetTo(testLinkconnection.testLinkURL + 'testid=' + testId + '&result=pass').then((resp) => {
									console.log('Test link response is ' + resp);
									resolve(res);
								}, (err) => {
									resolve(false);
								}); 
							}else
							{
								httpClient.doGetTo(testLinkconnection.testLinkURL + '&testid=' + testId + '&result=failed').then((resp)=> {
									console.log('Test link response is ' + resp);
									resolve(res);
								},(err) => {
									console.log("Test link err is " + err);
									resolve(false);
								});
							}
						},function(res){
							console.log('The res is ' + res);
							reject(res);
					});
				});
			});
		}
}