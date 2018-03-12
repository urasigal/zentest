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
	res.then(function(arr){
		console.log('Res length ' + arr.length);
		for(let k = 0; k < arr.length; k ++)
        {
			
            for(let p = 0; p < arr[k].length; p++)
			{
				console.log('Res length in end' + arr[k].length);
                arr[k][p].then(function(txt){console.log('In the end *' + txt + '*');
                	if(finder === txt)
                		return true;
                });
			}
        }
		browser.sleep(4000);
	  });
		return false;
	}
 };

