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
		browser.sleep(5000).then(function(){
			feederPannel.click().then(function(){
	                return fillForm.parseFeederTable('feederqa');
	        	});
		});
		browser.sleep(3000);
		return false;
	}
};