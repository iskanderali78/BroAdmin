/**
 * Created by MASTER on 27.11.2016.
 */
const formFields = [
    "Картридж","Производитель","Тип","Принтеры"
    ,"Изображение","Количество тонера","Ресурс","Цвет"
    ,"Вендор","Аналоги","Статус","У нас","1","2","3","Замена чипа"
    ,"Замена фотобарабана","Прочий ремонт","Чистка и диагностика"];

var pcontroller = require('../../../controllers/printer');
var pmodel = require('../../../models/printerModel');

var controller = require('../../../controllers/cartridge');
var model = require('../../../models/cartridgeModel');

var config = require('config');

const type = config.get('type');

const status = config.get('status');

const producer = config.get('producers');

var form = function(formData, url, callback){
    var curCont = new pcontroller(pmodel);
        curCont.findAll(function(result0){
            //var na = [formData, result0];
            var altCont = new controller(model);
            altCont.findAll(function(result1){
                //console.log('formData: '+formData);
                //console.log('result0: '+result0);
                //console.log('result1: '+result1);
                var form = transformToHTML1(formData, result0, result1);
                callback(form);
            });
        });
};

function transformToHTML1(formData, printers, analogs){
        //console.log('formData' + formData);

        var form = "<form id='form' action='" + this.url + "' enctype='application/x-admin-form-urlencoded' method='POST'>\n";

        form += "<table>";

        for (var i = 0; i < formFields.length; i++) {
            form += "<tr>";

            var id;
            var value;

            switch (i) {
                case 0:
                    id = 'name';
                    value = formData.name;
                    break;
                case 1:
                    id = 'producer';
                    value = formData.producer;
                    break;
                case 2:
                    id = 'type';
                    value = formData.type;
                    break;
                case 3:
                    id = 'printers';
                    value = formData.printers;
                    break;
                case 4:
                    id = 'image';
                    value = formData.image;
                    break;
                case 5:
                    id = 'tonermass';
                    value = formData.tonermass;
                    break;
                case 6:
                    id = 'resource';
                    value = formData.resource;
                    break;
                case 7:
                    id = 'color';
                    value = formData.color;
                    break;
                case 8:
                    id = 'vendor';
                    value = formData.vendor;
                    break;
                case 9:
                    id = 'analog';
                    //value = 'sdds';
                    value = formData.analog;
                    break;
                case 10:
                    id = 'status';
                    value = formData.status;
                    break;
                case 11:
                    id = 'price0';
                    value = formData.price0;
                    break;
                case 12:
                    id = 'price1';
                    value = formData.price1;
                    break;
                case 13:
                    id = 'price2';
                    value = formData.price2;
                    break;
                case 14:
                    id = 'price3';
                    value = formData.price3;
                    break;
                case 15:
                    id = 'chipprice';
                    value = formData.chipprice;
                    break;
                case 16:
                    id = 'opcdrumreplacementprice';
                    value = formData.opcdrumreplacementprice;
                    break;
                case 17:
                    id = 'otherprice';
                    value = formData.otherprice;
                    break;
                case 18:
                    id = 'printercleananddiagnosticprice';
                    value = formData.printercleananddiagnosticprice;
                    break;
            }

            form += "<td>";
            form += "<label class='left'>" + formFields[i] + ": </label>";
            form += "</td>";

            form += "<td>";
            if (id != 'producer' && id != 'type'
                && id != 'status'
                && id != 'printers' && id != 'analog') {
                form += "<input size='100' name='" + id + "' type='text' value='" + value + "'><br>\n";
            }
            else {
                //console.log('id: ' + id);
                var arr;
                if (id == 'producer') {
                    arr = producer;
                }
                else if (id == 'type') {
                    arr = type;
                }
                else if (id == 'status') {
                    arr = status;
                }
                else if (id == 'printers') {
                    var obj = Object.keys(printers);
                    arr = [];
                    for (var s = 0; s < obj.length; s++) {
                        arr.push(printers[s].name);
                    }
                }
                else{
                    var obj = Object.keys(analogs);
                    arr = ['Не имеет аналогов'];
                    //arr = [" "];
                    for (var s = 0; s < obj.length; s++) {
                        if(analogs[s].name != formData.name){
                            arr.push(analogs[s].name);
                        }
                    }
                    //console.log('arr:' + arr);
                }
                if(id == 'printers'){
                    //form += "<select size=\"1\" multiple=\"multiple\" name='" + id + "'>\n";
                    form += "<select multiple=\"multiple\" name='" + id + "'>\n";
                }
                else if(id == 'analog'){
                    //form += "<select size=\"1\" multiple=\"multiple\" name='" + id + "'>\n";
                    form += "<select multiple=\"multiple\" name='" + id + "'>\n";
                }
                else{form += "<select name='" + id + "'>\n";}
                for (var m = 0; m < arr.length; m++) {
                    if (value != arr[m]) {
                        if(id == 'printers' && formData.printers[0] != undefined){
                            if(formData.printers[0].indexOf(arr[m]) != -1){
                                if(id == 'analog' && arr[m] == ' '){
                                    form += "<option type='checkbox' value='" + 'Не имеет аналогов' + "' selected>";
                                }
                                else{
                                    form += "<option type='checkbox' value='" + arr[m] + "' selected>";
                                }
                            }
                            else{
                                form += "<option type='checkbox' value='" + arr[m] + "'>";
                            }
                        }
                        else if(id == 'analog' && formData.analog[0] != undefined){
                            if(formData.analog[0].indexOf(arr[m]) != -1){
                                form += "<option type='checkbox' value='" + arr[m] + "' selected>";
                            }
                            else if(formData.analog[0].indexOf(' ') != -1 && arr[m] == 'Не имеет аналогов'){
                                form += "<option type='checkbox' value='" + arr[m] + "' selected>";
                            }
                            else{
                                form += "<option type='checkbox' value='" + arr[m] + "'>";
                            }
                        }
                        else{
                            form += "<option type='checkbox' value='" + arr[m] + "'>";
                        }
                        //form += "<option type='checkbox' value='" + arr[m] + "'>";
                        form += arr[m];
                        form += "</option>\n";

                    }
                    else {
                        form += "<option type='checkbox'  value='" + arr[m] + "' selected>";
                        form += arr[m];
                        form += "</option>\n";
                    }
                }
                form += "</select>\n";
            }

            form += "</td>";

            form += "<td>";
            form += "<label class='error' id='label" + id + "error' style='visibility: hidden'>" + "</label>";
            form += "</td>";

            form += "</tr>";
        }
        form += "<tr>";
        form += "<td>";

        form += "</td>";
        form += "</tr>";
        form += "</table>";

        form += "</form>";

        form += "<div>";
        form += "<input type='button' value='Сохранить' onclick='sendCartridgeForm()'>";
        form += "<input type='button' value='Удалить' onclick='deleteCartridgeRecord()'>";
        form += "</div>"

        form += "<div style=\"margin-top: 25.0px\">";
        form += "<input type='button' value='Редактор принтеров' onclick='editPrinters()'>";

        form += "</div>";

        form = form.replace(/undefined/g, " ");
        form = form.replace(/null/g, " ");

        return form;
}

module.exports = form;