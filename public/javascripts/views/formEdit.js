/**
 * Created by MASTER on 27.11.2016.
 */
const formFields = [
    "Картридж","Принтеры","Изображение","У нас","1","2","3","Замена чипа"
    ,"Замена фотобарабана","Прочий ремонт","Количество тонера","Ресурс","Аналоги"];

const type = [
    "Лазерный","?"];

const producer = [
    "HP","Samsung","Cannon","Xerox"];

const statusType = [
    "Новинка","Специальное предложение","Акция"];

var form = function(formData, url){
    this.formData = formData;
    this.url = url;
};

form.prototype.transformToHTML = function(){
    var form = "<form id='form' action='" + this.url + "' enctype='application/x-admin-form-urlencoded' method='POST'>\n";
    //console.log(form);
    form += "<table>";


    for(var i = 0; i < formFields.length; i++)
    {
        form += "<tr>";
        //form += "<div class='main'>";
        var id;
        var value;
        switch(i){
            case 0: id='name'; value=this.formData.name;  break;
            case 1: id='category'; value=this.formData.category;  break;
            case 2: id='image'; value=this.formData.image;  break;
            case 3: id='price'; value=this.formData.price;  break;
            case 4: id='status'; value=this.formData.status;  break;
            case 5: id='description'; value=this.formData.description;  break;
            case 6: id='producer'; value=this.formData.producer;  break;
            case 7: id='size'; value=this.formData.size;  break;
            case 8: id='weight'; value=this.formData.weight;  break;
            case 9: id='country'; value=this.formData.country;  break;
        }
        //form += "<div class='field'>";

        form += "<td>";
        form += "<label class='left'>" + formFields[i] + ": </label>";
        form += "</td>";

        form += "<td>";

        if(id != 'category' && id != 'status'){
            form += "<input size='100' name='" + id + "' type='text' value='" + value + "'><br>\n";
        }
        else{
            var arr;
            if(id =='category'){
                arr = categoryType;
            }
            else{
                arr = statusType;
            }
            //form += "<div width='100%'>\n";
            form += "<select name='" + id + "'>\n";
            for(var m = 0; m < arr.length; m++){
                if(value != arr[m]){
                    form += "<option value='" + arr[m] + "'>";
                    form += arr[m];
                    form += "</option>\n";
                }
                else{
                    form += "<option value='" + arr[m] + "' selected>";
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
    form += "<div>";
    form += "<input type='button' value='Сохранить' onclick='sendCartridgeForm()'>";
    form += "<input type='button' value='Удалить' onclick='deleteCartridgeRecord()'>";
    form += "</div>"
    form += "</td>";
    form += "</tr>";
    form += "</table>";

    form += "</form>";

    form = form.replace(/undefined/g," ");
    form = form.replace(/null/g," ");

    return form;
}

module.exports = form;