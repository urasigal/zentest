// imports
const xpathes =  require('./xpathes.js');

const SelectDropDownZen = require('./SelectDropDownZen.js');
const TableParser = require('./TableParser.js');

module.exports = {
 	// Fill feeder form.
 fillNewFeederFormAndSave: function(){
	// Open feeder form.
    element(by.buttonText('Add')).click();
	// Provide feeder name - used by ZEN.
	element(by.model('vm.name')).sendKeys('feederqa');
	//  Select available access tags
	let selectDropDownZen = new SelectDropDownZen();
	selectDropDownZen.checkDropDown('infra', xpathes.feederAccessOuterContainer, xpathes.feederAccessTag);
	let userField = element(by.model('vm.api_user'));
	userField.clear().then(function(){userField.sendKeys('admin');
		}).then(function(){
				element(by.model('vm.api_password')).sendKeys('1234');
			});
	selectDropDownZen.checkDropDown('~~~~', xpathes.feederSSHOuterDropDown, xpathes.feederSSHInnerDropDown);
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
                		console.log('find the match');
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
		let res = tableParser.parseTableAndFillArray(xpathes.clusterTableXpath);
		 return new Promise(function(resolve, reject) {  res.then(function(arr){
			for(let k = 0; k < arr.length; k ++)
	        {
				
	            for(let p = 0; p < arr[k].length; p++)
				{
	                arr[k][p].then(function(txt){
	                	if(finder === txt)
	                	{
	                		console.log('find the match');
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
	  
  fillNewBroadcasterFormAndSave: function() {
		// Open feeder form.
		element(by.buttonText('Add')).click();
		element(by.model('vm.name')).sendKeys('broadcasterqa');
		let selectDropDownZen = new SelectDropDownZen();
		selectDropDownZen.checkDropDown('infra', xpathes.broadcasterAccessOuterContainer, xpathes.broadcasterAccessTag);
		element(by.model('vm.can_input')).click().then(function() {
			    return element(by.model('vm.can_process')).click();
			}).then(function(){
				return element(by.xpath('/html/body/div[1]/div/div/form/div[1]/div/div[5]/div[1]/div[1]')).click();
			}).then(function(){
				return element(by.xpath('/html/body/div[1]/div/div/form/div[1]/div/div[5]/div[1]/div[2]/div/div[1]')).click();
			}).then(function(){
				return element(by.buttonText('Continue')).click();
			}).then(function(){
				return element(by.model('vm.auth_mode')).click();
			}).then(function(){
				return element(by.xpath('/html/body/div[1]/div/div/form/div[1]/div/div[1]/select/option[4]')).click();
			}).then(function(){
				return element(by.model('vm.ffa_inputs')).click();
			}).then(function(){
				return element(by.model('vm.ffa_outputs')).click();
			}).then(function(){
				 element(by.buttonText('Save')).click();
			});
  	},
  	// Add a receiver entity to the ZEN.
  	fillNewReceiverFormAndSave: function() {
  		return new Promise( (resolve, reject ) => {
		// Open receiver form.
		element(by.buttonText('Add Receiver')).click();
		element(by.model('vm.name')).sendKeys('receiverqa');
		let selectDropDownZen = new SelectDropDownZen();
		
		selectDropDownZen.checkDropDown('infra', xpathes.receiverSSHKeyOuterXpath, xpathes.receiverSSHKeyInnerXpath);
		
		element(by.model('vm.api_user')).clear().then(function(){
				return element(by.model('vm.api_user')).sendKeys('admin');
			}).then(function() {
			    return element(by.model('vm.api_password')).sendKeys('1234');
			}).then(function(){
				
				selectDropDownZen.checkDropDown('~~~~', xpathes.receiverSSHKeyOuterXpath, xpathes.receiverSSHKeyInnerXpath);
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

