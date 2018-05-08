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
			// Select cluster panel.
			locations.broadcasterDashboardSelector().click().
			
			then(() => );
			
		});
	}
}