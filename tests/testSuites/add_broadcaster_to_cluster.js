// imports
const pathes =  require('../const/xpathes.js');
const locations = require('../tools_js/selecfunc.js');
const addFeederDriver = require('../testDrivers/addFeederDriver.js');
const addBroadcasterToClusterTestDriver = require('../testDrivers/addBroadcasterToClusterTestDriver.js');
const addReceiverTestDriver = require('../testDrivers/addReceiverTestDriver.js');
const fillForm = require('../tools_js/fillform.js');
const clusterConf = require('../suites_cfg/cluster_simple.js');


describe('Add broadcaster to a cluster', function() {
  
   //Add a new cluster to ZEN.
  it('Add a new broadcaster to cluster', function() {
	  var testId = '8603';
	  addBroadcasterToClusterTestDriver.addBroadcaster(clusterConf, testId).then(function(res){
		  expect(res).toBeTruthy();
	  }, function(err){
		  expect(err).toBeTruthy();
	  });
  });
  
  
});

