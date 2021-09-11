const XlsxPopulate = require('xlsx-populate')

let companyName = document.querySelector('#company'),
    layoutType  = document.querySelector('#type'),
    phone       = document.querySelector('#phone'),
    link        = document.querySelector('#link'),
    create      = document.querySelector('#create')


create.addEventListener('click', () => {

})

/* XlsxPopulate.fromBlankAsync()
    .then(workbook => {
        workbook.sheet("Sheet1").cell("A1").value("This is neat!");
        return workbook.toFileAsync("./out.xlsx");
    }) */

