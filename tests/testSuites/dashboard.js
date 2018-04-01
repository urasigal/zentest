// imports
const pathes =  require('../xpathes.js');
const locations = require('../selecfunc.js');
const addFeederDriver = require('../testDrivers/addFeederDriver.js');
const addBroadcasterTestDriver = require('../testDrivers/addBroadcasterTestDriver.js');
const addReceiverTestDriver = require('../testDrivers/addReceiverTestDriver.js');

describe('WEB UI login tests', function() {

  it('User name and password are correct', function() {
	browser.get('http://zixi.staging.devcloud.zixi.com');
	element(by.model('vm.credentials.email')).sendKeys('admin@zixi.com');
 	element(by.model('vm.credentials.password')).sendKeys('mnk4DNK4');
	element(by.id('login_btn')).click();
	var dashboard = element(by.xpath(pathes.dashPath));
	expect(dashboard.getText()).toEqual('Dashboard');
  });

  it('Add feeder', function(){
	var feederPannel = locations.feederDashboardSelector();
	feederPannel.click();
	fillForm.fillNewFeederFormAndSave();
	  addFeederDriver.addFeederTestDriver().then(function(res){
		  expect(res).toBeTruthy();
	  }, function(err){
		  expect(err).toBeTruthy();
	  });
	  browser.sleep(20000).then(function() {
		  console.log('PASSED AFTER');
	});
	  
  });
  
   Add a new cluster to ZEN.
  it('Add broadcaster', function() {
	
	  addBroadcasterTestDriver.addBroadcaster(); 
	  
  })

  // Add a new receiver to ZEN.
  it('Add receiver', function() {
	  addReceiverTestDriver.addReceiver(); 
  });
  
});

