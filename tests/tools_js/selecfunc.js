// imports
const xlocations =  require('../const/xpathes.js');

module.exports = {
 // Returns feeder locator on main UI pannel. 
 feederDashboardSelector: function(){
	return element(by.xpath(xlocations.feederXpath));
	},
 broadcasterDashboardSelector: function(){
	return element(by.xpath(xlocations.broadcasterXpath));
	},
 receiverDashboardSelector: function(){
	 return element(by.xpath(xlocations.receiverXpath));
	}
  };
