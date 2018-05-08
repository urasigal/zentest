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
		// This function has to return a Promise.
		addBroadcaster: function(clusterConf, testId) {
			return  new Promise((resolve, reject) => {
			locations.broadcasterDashboardSelector().click().
			// Fill a receiver form and save.
			then(() => { return fillForm.fillNewBroadcasterFormAndSave(clusterConf);
			// Testing part
			//////////////////////////////////////////////////////////////////////////////
			// Check if cluster was added.
			}).then(() => browser.sleep(5000)
			).then(() => locations.broadcasterDashboardSelector().click()
			).then(()=> { return fillForm.parseBroadcasterTable(clusterConf.clusterName);
			}).then((res)=> { // Set result to the Test Link and fulfill the Promise object
				resolve(httpClient.setResultToTestLink(res, testId));
				}, (res)=> reject(res)
			);
		});
	}
}