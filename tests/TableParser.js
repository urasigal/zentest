"use strict";

module.exports = class TableParser {

  constructor() {}
  
  // This function is taking a path to table and returns a Promise object
  // that will have eventually resolved to 2D array of tables WEB elements.
  parseTableAndFillArray(tableLocationXpath) { // The argument has to be a xpath of tbody of HTML table element.
          var tableCells = []; // It will be a two dimension array.
          // Find table (tbody) element by its xpath.
          var table = element(by.xpath(tableLocationXpath));
          // Retrieve all rows from table element.
          return  new Promise((resolve, reject) => {
	          table.all(by.tagName('tr')).then((tableRows) => { // Eventually the tableRows will accept 'tr' elements 
	          // Walk through table's rows
	          let cellsArr = [];
	          for(let i = 0; i < tableRows.length; i++)
	          {
	              tableCells[i] = []; // make an array's element to be also an array.
	              let singleRow = tableRows[i];
	              cellsArr[i] = singleRow.all(by.tagName('td')); // Each element of the cellsArr array will be a Promise which
	              												// will on success resolved to td elements.
	          }
	          Promise.all(cellsArr).then((twoDArrayOfCells)=> {
	              for(let j = 0; j < twoDArrayOfCells.length; j ++)
	              {
	                  for(let k = 0; k < twoDArrayOfCells[j].length; k++)
	                  {
	                        tableCells[j][k] = twoDArrayOfCells[j][k];
	                  }
	              }
	              resolve(tableCells); // 2D array rowsSize * colomnSize 
	           });
	        });
          }); //End of promise object.
    } // End of parseTableAndFillArray function
}
