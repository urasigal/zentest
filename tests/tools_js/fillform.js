// imports
const xpathes =  require('../const/xpathes.js');
const SelectDropDownZen = require('../SelectDropDownZen.js');
const TableParser = require('../TableParser.js');

module.exports = {
 	// Fill feeder form.
 fillNewFeederFormAndSave: function(feederConf){
	// Open feeder form.
    element(by.buttonText('Add')).click();
	// Provide feeder name - used by ZEN.
	element(by.model('vm.name')).sendKeys(feederConf.feederName);
	//  Select available access tags
	let selectDropDownZen = new SelectDropDownZen();
	selectDropDownZen.checkDropDown(feederConf.accessTag, xpathes.feederAccessOuterContainer, xpathes.feederAccessTag);
	let userField = element(by.model('vm.api_user'));
	userField.clear().then(function(){userField.sendKeys(feederConf.apiUser);
		}).then(function(){
				element(by.model('vm.api_password')).sendKeys(feederConf.apiPass);
			});
	selectDropDownZen.checkDropDown(feederConf.sshKey, xpathes.feederSSHOuterDropDown, xpathes.feederSSHInnerDropDown);
	browser.sleep(2000).then(function(){element(by.buttonText('Save')).click();
		});
      },
      
  parseFeederTable: function(finder){
	let tableParser = new TableParser();
	let res = tableParser.parseTableAndFillArray(xpathes.feedersTableXpath);
	 return new Promise(function(resolve, reject) {  res.then(function(arr){
		for(let k = 0; k < arr.length; k ++)
        {
			
            for(let p = 0; p < arr[k].length; p++)
			{
                arr[k][p].then(function(txt){
                	if(finder === txt)
                	{
                		resolve(true);
                	}
                });
			}
        }
		browser.sleep(4000).then(function() {
			reject(false);
		});
	  });
	});
  },
  parseBroadcasterTable: function(finder){
		let tableParser = new TableParser();
		// res is a Promise.
		let res = tableParser.parseTableAndFillArray(xpathes.clusterTableXpath);
		 return new Promise(function(resolve, reject) {  res.then(function(arr){
			for(let k = 0; k < arr.length; k ++)
	        {
				
	            for(let p = 0; p < arr[k].length; p++)
				{
	                arr[k][p].then(function(txt){
	                	if(finder === txt)
	                	{
	                		resolve(true);
	                	}
	                });
				}
	        }
			browser.sleep(4000).then(function() {
				reject(false);
			});
		  });
		});
  },
  
  parseTable: function(finder, tableXpath){
		let tableParser = new TableParser();
		// res is a Promise.
		let res = tableParser.parseTableAndFillArray(xpathes.tableXpath);
		 return new Promise(function(resolve, reject) {  res.then(function(arr){
			for(let k = 0; k < arr.length; k ++)
	        {
				
	            for(let p = 0; p < arr[k].length; p++)
				{
	                arr[k][p].then(function(txt){
	                	if(finder === txt)
	                	{
	                		resolve(true);
	                	}
	                });
				}
	        }
			browser.sleep(4000).then(function() {
				reject(false);
			});
		  });
		});
},
	  
  fillNewBroadcasterFormAndSave: function(clusterConf) {
		// Open feeder form.
		element(by.buttonText('Add')).click().then(()=>{ 
			return 'clicked';
			}).then(res => {element(by.model('vm.name')).sendKeys(clusterConf.clusterName); // Set cluster name. 
			return 'keys sent';
			}).then(res => {
				let selectDropDownZen = new SelectDropDownZen();
				// Select access tag
				selectDropDownZen.checkDropDown(clusterConf.accessTag, xpathes.broadcasterAccessOuterContainer, xpathes.broadcasterAccessTag);
				// Check here if it is an ingest cluster.
				if(clusterConf.ingest) 
					return element(by.model('vm.can_input')).click();
				else
					return new Promise((resolve, reject) => resolve());
			}).then(function() {
				if(clusterConf.channelProc)
					return element(by.model('vm.can_process')).click();
				else new Promise((resolve, reject) => resolve());
			}).then(function(){ // Scaling account
				return element(by.xpath(xpathes.clusterScalingOuter)).click();
			}).then(function(){ // Scaling account
				return element(by.xpath(xpathes.clusterScalingInner)).click();
			}).then(function(){
				return element(by.buttonText('Continue')).click();
			}).then(function(){
				return element(by.model('vm.auth_mode')).click();// Select auth mode
			}).then(function(){
				return element(by.xpath('/html/body/div[1]/div/div/form/div[1]/div/div[1]/select/option[4]')).click();
			}).then(function(){
				if(clusterConf.pushInputs)
					return element(by.model('vm.ffa_inputs')).click();
				else new Promise((resolve, reject) => resolve());
			}).then(function(){
				if(clusterConf.pullOutputs)
					return element(by.model('vm.ffa_outputs')).click();
				else new Promise((resolve, reject) => resolve());
			}).then(function(){
				 element(by.buttonText('Save')).click();
			});
  	},
  	// Add a receiver entity to the ZEN.
  	fillNewReceiverFormAndSave: function(receiverConf) {
  		return new Promise( (resolve, reject ) => {
		// Open receiver form.
		element(by.buttonText('Add Receiver')).click();
		element(by.model('vm.name')).sendKeys(receiverConf.receiverName);
		let selectDropDownZen = new SelectDropDownZen();
		
		selectDropDownZen.checkDropDown(receiverConf.accessTag, xpathes.receiverSSHKeyOuterXpath, xpathes.receiverSSHKeyInnerXpath);
		
		element(by.model('vm.api_user')).clear().then(function(){
				return element(by.model('vm.api_user')).sendKeys(receiverConf.apiUser);
			}).then(function() {
			    return element(by.model('vm.api_password')).sendKeys(receiverConf.apiPass);
			}).then(function(){
				
				selectDropDownZen.checkDropDown(receiverName.sshKey, xpathes.receiverSSHKeyOuterXpath, xpathes.receiverSSHKeyInnerXpath);
				// Insert artificial delay. 
				return new Promise((resolve, reject) => {
				      setTimeout(() => {
				        resolve();
				      }, 2000);
				    });
				
			}).then(function(){
				 return element(by.buttonText('Save')).click();
			}).then(() => { resolve(""); });
  		})
  	}
 };

