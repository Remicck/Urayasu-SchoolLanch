// var pdf = require("pdf-table-extractor");
var pdf = require("./model/pdf.js");

pdf.init("pdf/01_kitchen/202211/1102-1.pdf");
pdf.extract();