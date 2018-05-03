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
		let res = tableParser.parseTableAndFillArray(tableXpath);
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
		return new Promise((resolve, reject) => 
		{
			element(by.buttonText('Add')).click().then(() =>{
				return element(by.model('vm.name')).sendKeys(clusterConf.clusterName);
			}).then(()=> {
				let selectDropDownZen = new SelectDropDownZen();
				selectDropDownZen.checkDropDown(clusterConf.accessTag, xpathes.broadcasterAccessOuterContainer, xpathes.broadcasterAccessTag);
				return new Promise( (resolve, reject) => resolve() );
			}).then(()=>{
				if(clusterConf.ingest)
				{
					return element(by.model('vm.can_input')).click();
				}
				return new Promise( (resolve, reject) => resolve() );
			}).then(() => {
			if(clusterConf.channelProc)
				return element(by.model('vm.can_process')).click();
			else return new Promise( (resolve, reject) => resolve() );
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
				{
					return element(by.model('vm.ffa_inputs')).click();
				}
				else 
				{
					return new Promise((resolve, reject) => resolve());
				}
			}).then(function(){
				if(clusterConf.pullOutputs)
				{
					return element(by.model('vm.ffa_outputs')).click();
					}
				else 
				{
					return new Promise((resolve, reject) => resolve());
				}
			}).then(function(){
				 return element(by.buttonText('Save')).click();
			}).then( () => { resolve(); });
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
				
				selectDropDownZen.checkDropDown(receiverConf.sshKey, xpathes.receiverSSHKeyOuterXpath, xpathes.receiverSSHKeyInnerXpath);
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

