// imports
const pathes =  require('../xpathes.js');
const locations = require('../selecfunc.js');
const fillForm = require('../fillform.js');
module.exports = {
	addFeederTestDriver: function (){
		// Fill the feeder's form.
		var feederPannel = locations.feederDashboardSelector();
		feederPannel.click();
		fillForm.fillNewFeederFormAndSave();
		/////////////////////////////////////////////////////////
		
		///////////////////////////////////////////////////////////
		var feederPannel = locations.feederDashboardSelector();
		 return  new Promise(function(resolve, reject) {
		
		browser.sleep(5000).then(function(){
			feederPannel.click().then(function(){
				fillForm.parseFeederTable('feederqa').then(function(res){
					console.log('The res is ' + res);
					resolve(res);
				});
			});
		});
		browser.sleep(6000).then(function(){
			reject(false);
			});
	});
	}
};