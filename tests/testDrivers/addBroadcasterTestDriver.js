const pathes =  require('../xpathes.js');
const locations = require('../selecfunc.js');
const fillForm = require('../fillform.js');

module.exports = {
		addBroadcaster: function() {
			// Fill a broadcaster's form.
			var broadcasterPannel = locations.broadcasterDashboardSelector();
			broadcasterPannel.click();
			fillForm.fillNewBroadcasterFormAndSave();
		}
}