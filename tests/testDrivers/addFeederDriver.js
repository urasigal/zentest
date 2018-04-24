// /zentest/tests/testDrivers/addFeederDriver.js
// imports
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const fillForm = require('../tools_js/fillform.js')
module.exports = {
	addFeederTestDriver: function (feederConf){
		// Fill the feeder's form.
		try{
			var feederPannel = locations.feederDashboardSelector();
		}catch(error){
			return new Promise((resolve, reject) => {
				  reject(false);
				});
		}
		feederPannel.click().then(() => { return new Promise((resolve, reject) => {
			  resolve();
			});
		}).then(() => {fillForm.fillNewFeederFormAndSave();} );
		
		/////////////////////////////////////////////////////////
		
		///////////////////////////////////////////////////////////
		var feederPannel = locations.feederDashboardSelector();
		 return  new Promise(function(resolve, reject) {
		
		browser.sleep(5000).then(function(){
			feederPannel.click().then(function(){
				fillForm.parseFeederTable(feederConf.feederName).then(function(res){
							console.log('The res is ' + res);
							resolve(res);
						}, function(res){
							console.log('The res is ' + res);
							reject(res);
					});
				});
			});
			browser.sleep(6000).then(function(){
				reject(false);
				});
		 })	;
	}
};