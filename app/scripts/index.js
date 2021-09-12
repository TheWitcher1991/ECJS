const XlsxPopulate = require('xlsx-populate')

let companyName = document.querySelector('#company'),
    layoutType  = document.querySelector('#type'),
    phone       = document.querySelector('#phone'),
    link        = document.querySelector('#link'),
    create      = document.querySelector('#create')

create.addEventListener('click', () => {
    if (layoutType.value === 'students') {
        XlsxPopulate.fromBlankAsync().then(workbook => {
            workbook.sheet(0).cell('A1').value(`Студенческая база ${companyName.value}`)
            workbook.sheet(0).cell('A2').value('№')
            workbook.sheet(0).cell('B2').value('Ф.И.О')
            workbook.sheet(0).cell('C2').value('Факультет')
            workbook.sheet(0).cell('D2').value('Направление')
            workbook.sheet(0).cell('E2').value('Курс')
            workbook.sheet(0).cell('F2').value('Группа')
            alert('Файл успешно создан')
            return workbook.toFileAsync('out.xlsx')
        })
    }
})