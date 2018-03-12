"use strict";

module.exports = class TableParser {

  constructor() {}

  parseTableAndFillArray(tableLocationXpath) {
          var tableCells = [];
          // Find table element by its xpath.
          var table = element(by.xpath(tableLocationXpath));
          // Retrive all rows from table element.
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
				console.log('Length ----------------- ' + twoDArrayOfCells.length);
                                  for(let j = 0; j < twoDArrayOfCells.length; j ++)
                                  {
					console.log('Length &&&&&&&&&&&&&&&&&&& ' + twoDArrayOfCells[j].length);
                                          for(let k = 0; k < twoDArrayOfCells[j].length; k++)
                                          {
						console.log('FIILED');
                                                  tableCells[j][k] = twoDArrayOfCells[j][k].getText();
                                          }
                                  }
								  console.log('If printed befor - GOOD');
                                  resolve(tableCells);
                                });
						console.log('If printed befor - BAD');
                    });
          }); //End of promise object.
        } // End of parseTableAndFillArray function
}
