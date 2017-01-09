/**
 * Created by MASTER on 04.01.2017.
 */
function createMap(){
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init(){
        myMap = new ymaps.Map("first_map", {
            center: [55.72085899996884, 37.787083999999986],
            zoom: 14.606566011235955
        });

        myPlacemark = new ymaps.Placemark([55.72085899996884, 37.787083999999986], {
                hintContent: 'Компания \"ЭкономПринт\".<br>Бюджетная заправка картриджей!<br>Экономьте с нами!!!',
                balloonContent: 'Компания \"ЭкономПринт\".<br>Бюджетная заправка картриджей!<br>Обслуживание и ремонт картриджей и принтеров! Действует система скидок!',
                iconContent: 'Э'
            }
//                      ,{
//                  iconLayout: 'default#image',
////                  iconImageHref: '/images/printer.png',
//                          iconImageHref: '/images/mapmarker.png',
//                  iconImageSize: [40, 40],
//                  iconImageOffset: [-2, -40]
//              }
        );
        myMap.geoObjects.add(myPlacemark);
    }
}

function checkMap(){
    //var mode = "about:blank";
    //var name = "hello";
    //var style = "width=200,height=200";
    //var chatwindow = window.open(mode,name,style);
    //chatwindow.document.write("Hi! I'm there!");
    if(window.location.href.indexOf('/contacts') != -1){
        createMap();
    }
}
