// imports
const xlocations =  require('../const/xpathes.js');

module.exports = {
 // Returns feeder locator on main UI pannel. 
 feederDashboardSelector: function(){
	var dashFeeder = element(by.xpath(xlocations.feederXpath));
	if (typeof dashFeeder === 'undefined') {
	    throw new Error("Feeder's dashbord tab is not found");
	}
	return dashFeeder;
 },
 broadcasterDashboardSelector: function(){
	return element(by.xpath(xlocations.broadcasterXpath));
	},
 receiverDashboardSelector: function(){
	 return element(by.xpath(xlocations.receiverXpath));
	}
  };
