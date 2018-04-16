// imports
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const addFeederDriver = require('../testDrivers/addFeederDriver.js');
const addBroadcasterTestDriver = require('../testDrivers/addBroadcasterTestDriver.js');
const addReceiverTestDriver = require('../testDrivers/addReceiverTestDriver.js');
const fillForm = require('../tools_js/fillform.js');

describe('WEB UI  tests', function() {
  it('User name and password are correct', function() {
	browser.get('http://zixi.staging.devcloud.zixi.com');
	element(by.model('vm.credentials.email')).sendKeys('admin@zixi.com');
 	element(by.model('vm.credentials.password')).sendKeys('mnk4DNK4');
	element(by.id('login_btn')).click();
	var dashboard = element(by.xpath(pathes.dashPath));
	expect(dashboard.getText()).toEqual('Dashboard');
  }); 

  it('Add feeder', function(){
//	var feederPannel = locations.feederDashboardSelector();
//	try{
//		feederPannel.click();
//	}catch(error)
//	{
//		console.log(error.message);
//		expect(false).toBeTruthy();
//	}
//	fillForm.fillNewFeederFormAndSave();
	  addFeederDriver.addFeederTestDriver().then(function(res){
		  expect(res).toBeTruthy();
	  }, function(err){
		  expect(err).toBeTruthy();
	  });
	  browser.sleep(20000).then(function() {
		  console.log('PASSED AFTER');
	});
  });
//  
//   //Add a new cluster to ZEN.
//  it('Add broadcaster', function() {
//	
//	  addBroadcasterTestDriver.addBroadcaster(); 
//	  
//  });
//
//  // Add a new receiver to ZEN.
//  it('Add receiver', function() {
//	  addReceiverTestDriver.addReceiver(); 
//  });
  
});

