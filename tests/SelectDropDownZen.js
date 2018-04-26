"use strict";


module.exports = class SelectDropDownZen {

  constructor() {}

  checkDropDown(finderString, outerDivPath, innerDivPath) {
	var result;
	var dropDownAccessTags = element(by.xpath(innerDivPath));
	var accessTagsOutercontainer =  element(by.xpath(outerDivPath));
	accessTagsOutercontainer.click().then(function(){
		dropDownAccessTags.all(by.tagName('div')).then(function(items){
			var length = items.length;
			for(var i = 0; i < length; i++)
			{
				let item;
				item = items[i];
				item.getText().then(function(tagName){
					if(tagName === finderString)
					{
						browser.actions().mouseMove(item).perform().then(function(){
							 item.click();
						});
					}
				});
			}
		});
	});
   }
}

