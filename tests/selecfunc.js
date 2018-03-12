// imports
const xlocations =  require('./xpathes.js');

module.exports = {
 // Returns feeder locator on main UI pannel. 
 feederDashboardSelector: function(){
	return element(by.xpath(xlocations.feederXpath));
	}
  };
