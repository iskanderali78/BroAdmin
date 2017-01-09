function information (adress)
{
    var arr = adress.split('.');
    var readdr = "/cartridges/" + arr[0];
    window.location.href = readdr;
}

function printerinformation (adress)
{
    var arr = adress.split('.');
    var readdr = "/printers/" + arr[0];
    window.location.href = readdr;
}

function newCartridgeRecord()
{
    var readdr = "/newcartridge";
    window.location.href = readdr;
}

function newPrinterRecord()
{
    var readdr = "/newprinter";
    window.location.href = readdr;
}

function createFilter(obj)
{
    var arr = document.getElementsByTagName("TD");
    for(var i = 0; i < arr.length; i++){
        var cl = arr[i].getAttribute('class');
        if((cl == 'category')){
            if(arr[i].innerHTML == obj){
                var cat = document.getElementById('checkCategory');
                cat.removeAttribute('hidden');
                cat.checked = true;
                cat.setAttribute('checked','checked');
            }
            else{
                arr[i].parentNode.setAttribute("hidden","true");
            }
        }
    }
}

function sortByStatus(){
    //Схема сортировки. Возможны варианты
    var scheme = ["Новинка","Специальное предложение","Акция"];
    var rows = document.getElementById('catalog').rows;
    var arr0 = [];
    var arr1 = [];
    var arr2 = [];
    var catalog = document.getElementById('catalog');
    var tbody0 = catalog.children[1];
    var tbody1 = tbody0.cloneNode();
    var rows = document.getElementById('catalog').rows;
    for(var i = 1; i < rows.length; i++){
        if(rows[i].children[2].innerHTML == scheme[0]){
            arr0.push(rows[i].cloneNode(true));
        }
        if(rows[i].children[2].innerHTML == scheme[1]){
            arr1.push(rows[i].cloneNode(true));
        }
        if(rows[i].children[2].innerHTML == scheme[2]){
            arr2.push(rows[i].cloneNode(true));
        }
    }
    for(var i = 0; i < arr0.length; i++){
        tbody1.appendChild(arr0[i]);
    }
    for(var i = 0; i < arr1.length; i++){
        tbody1.appendChild(arr1[i]);
    }
    for(var i = 0; i < arr2.length; i++){
        tbody1.appendChild(arr2[i]);
    }
    //Сброс исходного тела таблицы, на случай, если придется его вернуть
    if(tbody1.getAttribute("data-toggle") == null){
        tbody1.setAttribute("data-toggle",encodeURI(tbody0.innerHTML));
    }
    catalog.replaceChild(tbody1,tbody0);
}

function sortByPrice(obj){
    var rows = document.getElementById('catalog').rows;
    var arr0 = [];
    var arr1 = [];

    var catalog = document.getElementById('catalog');
    var tbody0 = catalog.children[1];
    var tbody1 = tbody0.cloneNode();
    if(tbody1.getAttribute("data-toggle") == null){
        tbody1.setAttribute("data-toggle",encodeURI(tbody0.innerHTML));
    }

    var rows = document.getElementById('catalog').rows;

    if(obj.getAttribute('class') == 'up'){
        obj.setAttribute('class','down');
        for(var i = 1; i < rows.length; i++){
            arr0.push({row: rows[i].cloneNode(true), value: rows[i].children[3].innerHTML});
        }
        arr1 = arr0.reverse();
        for(var i = 0; i < arr1.length; i++){
            tbody1.appendChild(arr1[i].row);
        }
        catalog.replaceChild(tbody1,tbody0);
    }
    else if(obj.getAttribute('class') == 'down'){
        obj.removeAttribute('class');
        var oldBody = decodeURI(tbody0.getAttribute('data-toggle'));
        tbody1.removeAttribute(('data-toggle'));
        tbody1.innerHTML = oldBody;
        catalog.replaceChild(tbody1,tbody0);
    }
    else{
        obj.setAttribute('class','up');
        for(var i = 1; i < rows.length; i++){
            arr0.push({row: rows[i].cloneNode(true), value: rows[i].children[3].innerHTML});
        }
        arr1 = arr0.sort(function(a,b){
            if(a.value > b.value){
                return 1;
            }
            if(a.value < b.value){
                return -1;
            }
            return 0;
        });
        for(var i = 0; i < arr1.length; i++){
            tbody1.appendChild(arr1[i].row);
        }
        catalog.replaceChild(tbody1,tbody0);
    }

}

function filterChange(obj)
{
    obj.setAttribute('hidden','true');
    removeFilter();
}

function removeFilter(){
    var arr = document.getElementsByTagName("TD");
    for(var i = 0; i < arr.length; i++){
        var cl = arr[i].getAttribute('class');
        if(cl == 'category'){
            arr[i].parentNode.removeAttribute("hidden");
        }
    }
}

function backToCartridges(){
    window.location.href = '/';
}