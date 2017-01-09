function validateCartridgeForm(){
    var form = document.getElementById('form');
    if(form.name.value == '' || form.name.value == ' '){
        return false;
    }
    return true;
}

function sendForm(){

    var form = document.getElementById('form');
    if(validateCartridgeForm()){
        var addr = window.location.href;
        var arr = addr.split('/');
        var id = arr[arr.length - 1];

        var readdr;
        if(id != 'new'){
            readdr = "/updateprinter/" + id;
        }
        else{
            readdr = "/addprinter";
        }

        var xhr = new XMLHttpRequest();

        var body = 'name=' + form.name.value +
                '&category=' + form.category.value +
                '&image=' + form.image.value +
                '&price=' + form.price.value +
                '&status=' + form.status.value +
                '&description=' + form.description.value +
                '&producer=' + form.producer.value +
                '&size=' + form.size.value +
                '&weight=' + form.weight.value +
                '&country=' + form.country.value

            ;

        xhr.open("POST", readdr, true);
        xhr.setRequestHeader('Content-Type', 'application/x-admin-form-urlencoded');

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
                        window.location.href = '/edit/' + addr;
                    }
                    else if(xhr.responseText == 'errorAdd') {
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

function deleteRecord(){
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