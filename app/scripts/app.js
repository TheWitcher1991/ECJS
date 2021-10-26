const { saveAs } = require('file-saver')

const XLSX = require('xlsx')

let companyName = document.querySelector('#company'),
    layoutType  = document.querySelector('#type'),
    phone       = document.querySelector('#phone'),
    link        = document.querySelector('#link'),
    create      = document.querySelector('#create')

let wb = XLSX.utils.book_new()

wb.Props = {
    Title: layoutType.value,
    Subject: "File",
    Author: companyName.value,
    CreatedDate: new Date()
}

wb.SheetNames.push("Sheet 1");

let ws_data = [ 
        ['Студенческая база'],
        ['№', 'Ф.И.О', 'Факультет', 'Направление', 'Курс', 'Группа']
    ],
    ws = XLSX.utils.aoa_to_sheet(ws_data)

wb.Sheets["Sheet 1"] = ws

let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'})

const s2ab = s => {
    let buf = new ArrayBuffer(s.length),
        view = new Uint8Array(buf)

    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF
    }

    return buf;            
}

create.addEventListener('click', () => {
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'out.xlsx')
    alert('Файл успешно создан')
    document.querySelector('.form').reset()
})