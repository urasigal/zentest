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
				return fillForm.fillNewReceiverFormAndSave();
			}).then(() => {
				 receiverPannel = locations.receiverDashboardSelector();
				return browser.sleep(5000);
			}).then(function(){
				return receiverPannel.click();
			}).then(function(){
				return fillForm.parseTable('receiverqa', pathes.receiverTableXpath);
			}).then(function(res){
					resolve(res);
				},function(res){
					console.log('The res is ' + res);
					reject(res);
				});		
			});
		}
}