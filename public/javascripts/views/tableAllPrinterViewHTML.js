/**
 * Created by ISKANDER on 24.11.16.
 */
const tableHeaders = [
"Название принтера","Производитель","Тип"];

var config = require('config');

const producers = config.get('producers');

const type = config.get('type');


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
    for(var i = 0; i < tableHeaders.length; i++){
//        if(tableHeaders[i] != "Категория"){
//            if(tableHeaders[i] == "Статус товара"){
//                headersRow += "<th onclick='sortByStatus()'>";
//            }
//            else if(tableHeaders[i] == "Цена"){
//                headersRow += "<th onclick='sortByPrice(this)'>";
//            }
//            else{
                headersRow += "<th>";
//            }
            headersRow += tableHeaders[i];
            headersRow += "</th>\n";
//        }
//        else{
//            headersRow += "<th id='category'>";
//            headersRow += tableHeaders[i] +
//                "<br><input id='checkCategory' type='checkbox' hidden='true' onclick='filterChange(this)'>";
//            headersRow += "</th>\n";
//        }

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
        if(tableHeaders[i] == "Название принтера"){
            Row += " ondblclick='printerinformation(\"" + values._id + "\")'";
        }
//        if(tableHeaders[i] == "Категория"){
//            Row += " onclick='createFilter(\"" + values.category + "\")' class='category'";
//        }
        Row += ">";
        switch(i){
            case 0: Row += values.name; break;
            case 1: Row += values.producer; break;
            case 2: Row += values.type; break;
        }
        Row += "</td>\n";
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