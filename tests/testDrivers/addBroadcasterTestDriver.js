// Imports.
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const fillForm = require('../tools_js/fillform.js');
const httpClient = require('../http_client/httpClient.js');

// This module exports function that creates a new cluster in ZEN.
module.exports = {
		addBroadcaster: function(clusterConf) {
			return  new Promise(function(resolve, reject) {
			// Fill a broadcaster's (cluster) form.
			var broadcasterPannel = locations.broadcasterDashboardSelector();
			broadcasterPannel.click().then(function() {
				fillForm.fillNewBroadcasterFormAndSave(clusterConf);
				
				// Check if cluster was added.
				var broadcasterPannel = locations.broadcasterDashboardSelector();
					browser.sleep(5000).then(function(){
						return broadcasterPannel.click();
					}).then(function(){
						return fillForm.parseBroadcasterTable(clusterConf.clusterName);
						}).then(function(res){
								console.log('The res is ' + res);
								httpClient.doGetTo('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(function(resp) {
									resolve(res);
								}); 
							},function(res){
								console.log('The res is ' + res);
								reject(res);
							});
						});
			});
		}
}