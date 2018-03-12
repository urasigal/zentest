"use strict";

module.exports = class TableParser {

  constructor() {}

  parseTableAndFillArray(tableLocationXpath) {
          var tableCells = [];
          // Find table element by its xpath.
          var table = element(by.xpath(tableLocationXpath));
          // Retrieve all rows from table element.
          return  new Promise(function(resolve, reject) {
	          table.all(by.tagName('tr')).then(function(tableRows){
	          // Walk through table's rows
	          let cellsArr = [];
	          for(let i = 0; i < tableRows.length; i++)
	          {
	              tableCells[i] = [];
	              let singleRow = tableRows[i];
	              cellsArr[i] = singleRow.all(by.tagName('td'));
	          }
	          Promise.all(cellsArr).then(function(twoDArrayOfCells){
	              for(let j = 0; j < twoDArrayOfCells.length; j ++)
	              {
	                  for(let k = 0; k < twoDArrayOfCells[j].length; k++)
	                  {
	                        tableCells[j][k] = twoDArrayOfCells[j][k].getText();
	                  }
	              }
	              resolve(tableCells);
	           });
	        });
          }); //End of promise object.
    } // End of parseTableAndFillArray function
}
