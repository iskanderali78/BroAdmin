/**
 * Created by ISKANDER on 24.11.16.
 */
const tableHeaders = [
"Название","Категория","Изображение","Цена","Статус","Описание","Производитель","Размер","Вес","Страна"];

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
    return table;
}

function makeHeaders(){
    var headersRow = "<tr>\n";
    for(var i = 0; i < tableHeaders.length; i++){
        headersRow += "<th>";
        headersRow += tableHeaders[i];
        headersRow += "</th>\n";
    }
    headersRow += "<tr>\n";
    return headersRow;
}

function makeOneRow(values){
    var Row = "<tr>\n";
    for(var i = 0; i < tableHeaders.length; i++){
        Row += "<td align='center'>";
        switch(i){
            case 0: Row += values.name; break;
            case 1: Row += values.category; break;
            case 2: Row += "<img width='100.0px' src ='/images/" + values.image + "'>"; break;
            case 3: Row += values.price; break;
            case 4: Row += values.status; break;
            case 5: Row += values.description; break;
            case 6: Row += values.producer; break;
            case 7: Row += values.size; break;
            case 8: Row += values.weight; break;
            case 9: Row += values.country; break;
        }
        Row = Row.replace('undefined',' ');
        Row += "</td>\n";
    }
    Row += "<tr>\n";
    return Row;
}

function makeRows(rows){
    var Rows = makeOneRow(rows);
    return Rows;
}

module.exports = table;