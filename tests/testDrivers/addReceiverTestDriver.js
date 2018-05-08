// Imports.
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const fillForm = require('../tools_js/fillform.js');

module.exports = {
		// Setup part.
		//////////////////////////////////////////////////////////////////////////////
		// This function has to return a Promise.
		addReceiver: function(receiverConf, testId) {
			return  new Promise(function(resolve, reject) {
			locations.receiverDashboardSelector().click(). // Navigate to the receiver panel.
			// Fill a receiver form and save.
			then(() => { return fillForm.fillNewReceiverFormAndSave(receiverConf);
			}).then(() => return browser.sleep(5000)
			// Testing part
			//////////////////////////////////////////////////////////////////////////////
			// Check if cluster was added.
			).then(() => return locations.receiverDashboardSelector().click(); // Select receiver panel
			).then(function(){ return fillForm.parseTable(receiverConf.receiverName, pathes.receiverTableXpath);
			}).then((res)=> { // Set result to the Test Link and fulfill the Promise object
				resolve(httpClient.setResultToTestLink(res, testId));
				}, (res)=> reject(res)
			);	
		});
	}
}