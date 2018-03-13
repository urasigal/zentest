const pathes =  require('../xpathes.js');
const locations = require('../selecfunc.js');
const fillForm = require('../fillform.js');

module.exports = {
		addBroadcaster: function() {
			return  new Promise(function(resolve, reject) {
			// Fill a broadcaster's (cluster) form.
			var broadcasterPannel = locations.broadcasterDashboardSelector();
			broadcasterPannel.click().then(function() {
				fillForm.fillNewBroadcasterFormAndSave();
				
				// Check if cluster was added.
				
				var broadcasterPannel = locations.broadcasterDashboardSelector();
					browser.sleep(5000).then(function(){
						return broadcasterPannel.click();
					}).then(function(){
						return fillForm.parseBroadcasterTable('broadcasterqa');
						}).then(function(res){
								resolve(res);
							},function(res){
								console.log('The res is ' + res);
								reject(res);
							});
						});
			});
		});
		}
}