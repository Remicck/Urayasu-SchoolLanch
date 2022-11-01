var pdf_table_extractor = require("pdf-table-extractor");
 
//PDF parsed
function success(result)
{
   console.log('result', JSON.stringify(result));
}
 
//Error
function error(err)
{
   console.error('Error: ' + err);
}
 
pdf_table_extractor("pdf/1013-1.pdf",success,error);