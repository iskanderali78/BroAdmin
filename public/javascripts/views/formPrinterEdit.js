/**
 * Created by MASTER on 27.11.2016.
 */
const formFields = [
    "Принтер","Производитель","Тип"];

var config = require('config');

const type = config.get('type');

const producer = config.get('producers');

var form = function(formData, url){
    this.formData = formData;
    this.url = url;
};

form.prototype.transformToHTML = function(callback){
    var form = "<form id='form' action='" + this.url + "' enctype='application/x-admin-form-urlencoded' method='POST'>\n";
    //console.log(form);
    form += "<table>";


    for(var i = 0; i < formFields.length; i++)
    {
        form += "<tr>";
        //form += "<div class='main'>";
        var id;
        var value;
        console.log(this.formData);
        switch(i){
            case 0: id='name'; value=this.formData.name;  break;
            case 1: id='producer'; value=this.formData.producer;  break;
            case 2: id='type'; value=this.formData.type;  break;
        }
        //form += "<div class='field'>";

        form += "<td>";
        form += "<label class='left'>" + formFields[i] + ": </label>";
        form += "</td>";

        form += "<td>";
        if(id != 'producer' && id != 'type'){
            form += "<input size='100' name='" + id + "' type='text' value='" + value + "'><br>\n";
        }
        else{
            var arr;
            if(id =='producer'){
                arr = producer;
            }
            else{
                arr = type;
            }
            //form += "<div width='100%'>\n";
            form += "<select name='" + id + "'>\n";
            for(var m = 0; m < arr.length; m++){
                if(value != arr[m]){

                    form += "<option type='checkbox' value='" + arr[m] + "'>";
                    form += arr[m];
                    form += "</option>\n";

                }
                else{
                    form += "<option type='checkbox'  value='" + arr[m] + "' selected>";
                    form += arr[m];
                    form += "</option>\n";
                }
            }
            form += "</select>\n";
            //form += "<div>\n";
        }
        //form += "<label id='label" + id +  "error'>" + "</label>";
        //form += "</div>";
        //form += "</div>";
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
    form += "<input type='button' value='Сохранить' onclick='sendPrinterForm()'>";
    form += "<input type='button' value='Удалить' onclick='deletePrinterRecord()'>";
    form += "</div>"

    form = form.replace(/undefined/g," ");
    form = form.replace(/null/g," ");
//    console.log(form);
    return form;
}

//form.prototype.transformToHTML = function(){
//    var form = "<form id='form' action='" + this.url + "' enctype='application/x-admin-form-urlencoded' method='POST'>\n";
//    //console.log(form);
//    form += "<table>";
//
//
//    for(var i = 0; i < formFields.length; i++)
//    {
//        form += "<tr>";
//        //form += "<div class='main'>";
//        var id;
//        var value;
//        console.log(this.formData);
//        switch(i){
//            case 0: id='name'; value=this.formData.name;  break;
//            case 1: id='producer'; value=this.formData.producer;  break;
//            case 2: id='type'; value=this.formData.type;  break;
//        }
//        //form += "<div class='field'>";
//
//        form += "<td>";
//        form += "<label class='left'>" + formFields[i] + ": </label>";
//        form += "</td>";
//
//        form += "<td>";
//        if(id != 'producer' && id != 'type'){
//            form += "<input size='100' name='" + id + "' type='text' value='" + value + "'><br>\n";
//        }
//        else{
//            var arr;
//            if(id =='producer'){
//                arr = producer;
//            }
//            else{
//                arr = type;
//            }
//            //form += "<div width='100%'>\n";
//            form += "<select name='" + id + "'>\n";
//            for(var m = 0; m < arr.length; m++){
//                if(value != arr[m]){
//
//                    form += "<option type='checkbox' value='" + arr[m] + "'>";
//                    form += arr[m];
//                    form += "</option>\n";
//
//                }
//                else{
//                    form += "<option type='checkbox'  value='" + arr[m] + "' selected>";
//                    form += arr[m];
//                    form += "</option>\n";
//                }
//            }
//            form += "</select>\n";
//            //form += "<div>\n";
//        }
//        //form += "<label id='label" + id +  "error'>" + "</label>";
//        //form += "</div>";
//        //form += "</div>";
//        form += "</td>";
//
//        form += "<td>";
//        form += "<label class='error' id='label" + id + "error' style='visibility: hidden'>" + "</label>";
//        form += "</td>";
//
//        form += "</tr>";
//    }
//    form += "<tr>";
//    form += "<td>";
//
//
//    form += "</td>";
//    form += "</tr>";
//    form += "</table>";
//
//    form += "</form>";
//
//    form += "<div>";
//    form += "<input type='button' value='Сохранить' onclick='sendPrinterForm()'>";
//    form += "<input type='button' value='Удалить' onclick='deletePrinterRecord()'>";
//    form += "</div>"
//
//    form = form.replace(/undefined/g," ");
//    form = form.replace(/null/g," ");
////    console.log(form);
//    return form;
//}

module.exports = form;