// imports
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const addFeederDriver = require('../testDrivers/addFeederDriver.js');
const addBroadcasterTestDriver = require('../testDrivers/addBroadcasterTestDriver.js');
const addReceiverTestDriver = require('../testDrivers/addReceiverTestDriver.js');
const fillForm = require('../tools_js/fillform.js');
const receiverConf = require('../suites_cfg/receiver_simple.js');

describe('WEB UI  tests', function() {
  it('User name and password are correct', function() {
	browser.get('http://zixi.staging.devcloud.zixi.com');
	element(by.model('vm.credentials.email')).sendKeys('admin@zixi.com');
 	element(by.model('vm.credentials.password')).sendKeys('mnk4DNK4');
	element(by.id('login_btn')).click();
	var dashboard = element(by.xpath(pathes.dashPath));
	expect(dashboard.getText()).toEqual('Dashboard');
  }); 

  // Add a new receiver to ZEN.
  it('Add receiver', function() {
	  addReceiverTestDriver.addReceiver(receiverConf); 
  });
  
});

