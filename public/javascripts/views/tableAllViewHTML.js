/**
 * Created by ISKANDER on 24.11.16.
 */
const tableHeaders = [
"Картридж","Внешний вид","Производитель","Модели аппаратов","Статус","У нас","1 шт.","2 шт.","от 3 шт."];

const categoryType = [
    "Фоновая плита","Керамическая плитка","Керамический гранит","Клинкер",
    "Мозаика","Теплый пол","Строительная химия","Сантехника","Мебель для ванной"];

var table = function(tableData){
    this.tableData = tableData;
};

table.prototype.transformToHTML = function(tableData){
    var table = "<table id='catalog' border='1' width='100%' rules='all'>\n";
    table += "<thead>\n";
    table += makeHeaders();
    table += "</thead>\n";
    table += "<tbody>\n";
    table += makeRows(this.tableData);
    table += "</tbody>\n";
    table += "</table>";
//    console.log(table);
    return table;
}

function makeHeaders(){

    var headersRow = "<tr>\n";
    for(var i = 0; i < 6; i++){
        if(tableHeaders[i] != "Производитель"){
            if(tableHeaders[i] == "Статус товара"){
                headersRow += "<th rowspan='2' onclick='sortByStatus()'>";
            }
            else if(tableHeaders[i] == "У нас"){
                headersRow += "<th rowspan='2' onclick='sortByPrice(this)'>";
            }
            //else if(tableHeaders[i] == "Модели аппаратов"){
            //    headersRow += "<th rowspan='2' width='30%'>";
            //}
            else{
                headersRow += "<th rowspan='2'>";
            }
            headersRow += tableHeaders[i];
            headersRow += "</th>\n";
        }
        else{
            headersRow += "<th rowspan='2' id='producer'>";
            headersRow += tableHeaders[i] +
                "<br><input id='checkProducer' type='checkbox' hidden='true' onclick='filterChange(this)'>";
            headersRow += "</th>\n";
        }
    }
    headersRow += "<th colspan='3'>";
    headersRow += "На выезде";
    headersRow += "</th>\n";
    headersRow += "</tr>\n";
    headersRow += "<tr>\n";
    for(var i = 6; i < tableHeaders.length; i++){
        headersRow += "<th>";
        headersRow += tableHeaders[i];
        headersRow += "</th>\n";
    }
    headersRow += "</tr>\n";

    return headersRow;
}

function makeOneRow(values, id){
    var Row = "<tr>\n";
    for(var i = 0; i < tableHeaders.length; i++){
        var uid = "r" + id + "c" + i;
        Row += "<td id='";
        Row += uid;
        Row += "' align='center'";
        if(tableHeaders[i] == "Картридж"){
            Row += " onclick='information(\"" + values._id + "\")'";
        }
        if(tableHeaders[i] == "Производитель"){
            Row += " onclick='createFilter(\"" + values.producer + "\")' class='producer'";
        }
        Row += ">";
        console.log('i: '+i);
        switch(i){
            case 0: Row += values.name; break;
            case 1: Row += "<img width='100.0px' src ='/images/" + values.image + "'>"; break;
            case 2: Row += values.producer; break;

            case 3:
                //console.log('values.printers: ' + values.printers);
                var arr0 = values.printers[0].split(',');
                var arr1 = [];
                for(var l = 0; l < arr0.length; l++)
                {
                    var str = "<a href=\"printerName\\" + arr0[l] + "\">";
                    str += arr0[i];
                    str += "</a>";
                    arr1.push(str);
                }
                var rearr = arr1.join(',</br>');
                //console.log('arr1: ' + arr1);
                //console.log('rearr: ' + rearr);
                Row += rearr;
                break;

            case 4:
                console.log('status: '+values.status);
                Row += values.status;
                console.log('status: '+values.status);
                break;
            case 5: Row += values.price0; break;
            case 6: Row += values.price1; break;
            case 7: Row += values.price2; break;
            case 8: Row += values.price3; break;
        }
        Row += "</td>\n";
        console.log('Row: '+Row);
    }
    Row += "</tr>\n";
    return Row;
}

function makeRows(rows){
    var Rows = "";
    for(var i = 0; i < rows.length; i++){
        Rows += makeOneRow(rows[i], i);
    }
    return Rows;
}

module.exports = table;