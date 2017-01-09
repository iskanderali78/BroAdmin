function validateForm(){
    var form = document.getElementById('form');
    if(form.name.value == '' || form.name.value == ' '){
        return false;
    }
    return true;
}

function sendPrinterForm(){

    var form = document.getElementById('form');
    if(validateForm()){
        var addr = window.location.href;
        var arr = addr.split('/');
        var id = arr[arr.length - 1];

        var readdr;
        if(id != 'newprinter'){
            readdr = "/updateprinter/" + id;
        }
        else{
            readdr = "/addprinter";
        }

        var xhr = new XMLHttpRequest();

        var body = 'name=' + form.name.value +
                '&producer=' + form.producer.value +
                '&type=' + form.type.value;

        xhr.open("POST", readdr, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if(xhr.status == 200) {
                    if(xhr.responseText == 'successUpdate'){
                        alert('Запись успешно обновлена!');
                    }
                    else if(xhr.responseText == 'errorUpdate') {
                        alert('Ошибка обновления!');
                    }
                    else if(xhr.responseText.includes('successAdd')){
                        alert('Запись успешно добавлена! Вы будете автоматически перенаправлены на страницу ее радактирования!');
                        var arr = xhr.responseText.split('/');
                        var addr = arr[1];
                        window.location.href = '/editprinter/' + addr;
                    }
                    else if(xhr.responseText == 'errorAddPrinter') {
                        alert('Ошибка сохранения!');
                    }
                    else if(xhr.responseText == 'identity'){
                        alert('Ошибка сохранения записи! В базе данных уже присутствует товар с таким названием!');
                    }
                    else{
                        alert(xhr.responseText);
                    }
                }
            }
        };
        xhr.send(body);
    }
    else{
        alert('Вы не указали название товара! Попробуйте еще раз!');
    }
}

function sendCartridgeForm(){

    var form = document.getElementById('form');
    if(validateForm()){
        var addr = window.location.href;
        var arr = addr.split('/');
        var id = arr[arr.length - 1];

        var readdr;
        if(id != 'newcartridge'){
            readdr = "/updatecartridge/" + id;
        }
        else{
            readdr = "/addpcartridge";
        }

        var printers = [];
        for(var i = 0; i < form.printers.selectedOptions.length; i++){
            printers.push(form.printers.selectedOptions[i].innerHTML);
        }

        var analog = form.analog.value;
        analog = analog.replace('Не имеет аналогов',' ');

        var xhr = new XMLHttpRequest();

        var body = 'name=' + form.name.value +
        '&producer=' + form.producer.value +
        '&type=' + form.type.value +
        '&printers=' + printers +
        '&image=' + form.image.value +
        '&tonermass=' + form.tonermass.value +
        '&resource=' + form.resource.value +
        '&color=' + form.color.value +
        '&vendor=' + form.vendor.value +
        '&analog=' + analog +
        '&status=' + form.status.value +
        '&price0=' + form.price0.value +
        '&price1=' + form.price1.value +
        '&price2=' + form.price2.value +
        '&price3=' + form.price3.value +
        '&chipprice=' + form.chipprice.value +
        '&opcdrumreplacementprice=' + form.opcdrumreplacementprice.value +
        '&otherprice=' + form.otherprice.value +
        '&printercleananddiagnosticprice=' + form.printercleananddiagnosticprice.value

            ;

        xhr.open("POST", readdr, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if(xhr.status == 200) {
                    if(xhr.responseText == 'successUpdateCartridge'){
                        alert('Запись успешно обновлена!');
                    }
                    else if(xhr.responseText == 'errorUpdateCartridge') {
                        alert('Ошибка обновления!');
                    }
                    else if(xhr.responseText.includes('successAddCartridge')){
                        alert('Запись успешно добавлена! Вы будете автоматически перенаправлены на страницу ее радактирования!');
                        var arr = xhr.responseText.split('/');
                        var addr = arr[1];
                        window.location.href = '/editcartridge/' + addr;
                    }
                    else if(xhr.responseText == 'errorAddCartridge') {
                        alert('Ошибка сохранения!');
                    }
                    else if(xhr.responseText == 'identity'){
                        alert('Ошибка сохранения записи! В базе данных уже присутствует товар с таким названием!');
                    }
                    else{
                        alert(xhr.responseText);
                    }
                }
            }
        };
        xhr.send(body);
    }
    else{
        alert('Вы не указали название товара! Попробуйте еще раз!');
    }
}

function deleteCartridgeRecord(){
    var addr = window.location.href;
    var arr = addr.split('/');
    var id = arr[arr.length - 1];
    var readdr;
    if(id != 'new'){
        alert('Запись будет удалена! Вы будете перенаправлены на главную страницу!');
        readdr = "/delete/" + id;
    }
    else{
        alert('Запись не сохранится в базе данных! Вы будете перенаправлены на главную страницу!');
        readdr = "/";
    }
    window.location.href = readdr;
}

function editPrinters(){
    window.location.href = '/pcatalog';
}