// Imports.
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const fillForm = require('../tools_js/fillform.js');

module.exports = {
		addReceiver: function(receiverConf) {
			return  new Promise(function(resolve, reject) {
			// Fill a broadcaster's (cluster) form.
			var receiverPannel = locations.receiverDashboardSelector();
			receiverPannel.click().then(function() {
				return fillForm.fillNewReceiverFormAndSave(receiverConf);
			}).then(() => {
				 receiverPannel = locations.receiverDashboardSelector();
				return browser.sleep(5000);
			}).then(function(){
				return receiverPannel.click();
			}).then(function(){
				return fillForm.parseTable(receiverConfre.ceiverName, pathes.receiverTableXpath);
			}).then(function(res){
					resolve(res);
				},function(res){
					console.log('The res is ' + res);
					reject(res);
				});		
			});
		}
}