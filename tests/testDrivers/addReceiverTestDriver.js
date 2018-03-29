// Imports.
const pathes =  require('../xpathes.js');
const locations = require('../selecfunc.js');
const fillForm = require('../fillform.js');

module.exports = {
		addReceiver: function() {
			return  new Promise(function(resolve, reject) {
			// Fill a broadcaster's (cluster) form.
			var receiverPannel = locations.receiverDashboardSelector();
			receiverPannel.click().then(function() {
				fillForm.fillNewReceiverFormAndSave();
				
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
		}
}