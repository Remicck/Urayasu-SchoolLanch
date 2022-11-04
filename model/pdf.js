var pdf_table_extractor = require("pdf-table-extractor");

/**
 * PDFを扱うオブジェクト（Classの役割）を定義する（TypeScript化した際にClassに置き換える）
 */
var pdf = {
  filePath: "",
  init: function(filePath) {
    this.filePath = filePath;
  },
  extract: function() {
    pdf_table_extractor(this.filePath,this.success,this.error);
  },
  success: function(data) {
    let kondateResult = [];
    data.pageTables.forEach(function(page, i){
      // console.log(page.tables);
      page.tables.forEach(function(kondate){
        let _kondateResult = {
          date: "",
          menu: "",
        };
        kondate.forEach(function(menu_or_date){
          // if(menu_or_date.indexOf('提供') > 0){
          //   console.log('fooo');
          //   return false;
          // }

          if(menu_or_date.indexOf('月') > 0){
            _kondateResult.date = menu_or_date;
          }else{
            _kondateResult.menu = _kondateResult.menu + menu_or_date;
          }
        });
        // trimする
        if(_kondateResult.date){
          _kondateResult.date = _kondateResult.date.replace(/[^\S\n\r]/g, ""); 
          _kondateResult.date = _kondateResult.date.replace(/（.）/g, ""); 
        }
        if(_kondateResult.menu){
          _kondateResult.menu = _kondateResult.menu.replace(/[^\S\n\r]/g, "");
        }

        // 日付を生成する
        // 現在の年を取得する
        let now = new Date();
        let year = now.getFullYear();
        let month = _kondateResult.date.split('月')[0];
        if(month){
          let day = ("00"+_kondateResult.date.split('月')[1].split('日')[0]).slice(-2)
          kondateResult[year+"-"+month+"-"+day] = _kondateResult;
        }
      });
    })
    console.log(kondateResult)
  },
  error: function(err) {
    console.log('error!!', err);
  }

}

module.exports = pdf;