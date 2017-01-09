var express = require('express');
var router = express.Router();

var controller = require('../controllers/cartridge');
var model = require('../models/cartridgeModel');

var pcontroller = require('../controllers/printer');
var pmodel = require('../models/printerModel');

router.get('/', function(req, res, next) {
      var context = {
        title: 'Москва заправка картриджей рядом с метро \"Рязанский проспект\"'
      };
      res.render('main', context);
});

router.get('/contacts', function(req, res, next) {
    var context = {
        title: 'Москва заправка картриджей рядом с метро \"Рязанский проспект\"'
    };
    res.render('contacts', context);
});

router.get('/newcartridge', function(req,res,next){
  var readdr = "/addcartridge";
  var data = {
      name: "",
      producer: "",
      type: "",
      printers: [],
      image: "",
      tonermass: "",
      resource: "",
      color: "",
      vendor: "",
      analog: [],
      status: "",
      price0: 0,
      price1: 0,
      price2: 0,
      price3: 0,
      chipprice: 0,
      opcdrumreplacementprice: 0,
      otherprice: 0,
      printercleananddiagnosticprice: 0
  };
  var editForm = require('../public/javascripts/views/formCartridgeEdit');
  var edit = new editForm(data, readdr, function(result){
          var context = {
              title: 'BroAdmin',
              header: 'Создание новой записи картриджа',
              form: result
          };
          res.render('edit', context);
  });
});

router.get('/newprinter', function(req,res,next){
    var readdr = "/addprinter";
    var data = {
        name: "",
        producer: "",
        type: ""
    };
    var editForm = require('../public/javascripts/views/formPrinterEdit');
    var edit = new editForm(data, readdr);
    var html = edit.transformToHTML();
    var context = {
        title: 'BroAdmin',
        header: 'Редактирование информации о принтере',
        form: html
    };
    res.render('edit',context);
});

router.get('/printers',function(req,res,next){
    console.log(req.url);
    var curCont = new pcontroller(pmodel);
    curCont.findAll(function(result){
    if(result != 'no result'){
      var catalogTable = require('../public/javascripts/views/tableAllPrinterViewHTML');
      var catalog = new catalogTable(result);
      var html = catalog.transformToHTML();
      var context = {
        title: 'BroAdmin',
        header: 'Каталог принтеров',
        table: html
      };
      res.render('pcatalog', context);
    }
    else{
      html = "<p>В базе данных отсутствуют записи!</p>";
      var context = {
        title: 'BroAdmin',
        header: 'Каталог принтеров',
        table: html
      };
      res.render('pcatalog', context);
    }
  });
});

router.get('/cartridges/*',function(req,res,next){
    var arr = req.url.split('/');
    var addr = '/editcartidge/' + arr[2];
    res.redirect(addr);
});

router.get('/printers/*',function(req,res,next){
    var arr = req.url.split('/');
    var addr = '/editprinter/' + arr[2];
    res.redirect(addr);
});

router.get('/editcartidge/*',function(req,res,next){
    var arr = req.url.split('/');
    var addr = arr[2];
    var readdr = "/updatecartidge/" + addr;
    var curCont = new controller(model);
    curCont.findOneByID(addr, function(result){
        //var editForm = require('../public/javascripts/views/formCartridgeEdit');
        //
        //var edit = new editForm(result, readdr);
        //
        //var html = edit.transformToHTML();
        //var context = {
        //    title: 'BroAdmin',
        //    header: 'Редактирование информации о картридже',
        //    form: html
        //};
        //res.render('edit',context);

        var editForm = require('../public/javascripts/views/formCartridgeEdit');
        var edit = new editForm(result, readdr, function(data){
            var context = {
                title: 'BroAdmin',
                header: 'Редактирование записи картриджа',
                form: data
            };
            res.render('edit', context);
        });
    });

});

router.get('/editprinter/*',function(req,res,next){
    var arr = req.url.split('/');
    var addr = arr[2];
    var readdr = "/updateprinter/" + addr;
    var curCont = new pcontroller(pmodel);
  curCont.findOneByID(addr, function(result){
    var editForm = require('../public/javascripts/views/formPrinterEdit');

    var edit = new editForm(result, readdr);

    var html = edit.transformToHTML();
    var context = {
        title: 'BroAdmin',
        header: 'Редактирование информации о принтере',
        form: html
    };
    res.render('edit',context);
  });
});

router.post('/addprinter',function(req,res,next){
    var data = req.body;
    var curCont = new pcontroller(pmodel);
    var nmodel = new pmodel(data);
    curCont.createRecord(nmodel, function(result){
      if(result == 'identity'){
        res.send('identity');
      }
      else if(result == 'error'){
        res.send('errorAddPrinter');
      }
      else{
        res.send(result);
      }
    });
});

router.post('/addcartridge',function(req,res,next){
    var data = req.body;
    var curCont = new controller(model);
    var nmodel = new model(data);
    curCont.createRecord(nmodel, function(result){
        if(result == 'identity'){
            res.send('identity');
        }
        else if(result == 'error'){
            res.send('errorAddCartridge');
        }
        else{
            res.send(result);
        }
    });
});

router.post('/updateprinter/*', function(req, res, next) {
    var arr = req.url.split('/');
    console.log("arr " + arr);
    var addr = arr[2];
    console.log("addr " + addr);
    console.log("req.body.name " + req.body.name);
    var data = {
        name: req.body.name,
        producer: req.body.producer,
        type: req.body.type
    }
    console.log("data " + data);
    var curCont = new pcontroller(pmodel);
    curCont.editRecord(addr, data, function(result){
        console.log('result: ' + result);
        res.send(result);
    });
});

router.post('/updatecartridge/*', function(req, res, next) {
    var arr = req.url.split('/');
    console.log("arr " + arr);
    var addr = arr[2];
    console.log("addr " + addr);
    console.log("req: " + req);
    //console.log("req.body: " + req.body.values);
    console.log("req.body.name " + req.body.name);
    console.log("req.body.printers " + req.body.printers);
    console.log("req.body.analog " + req.body.analog);
    console.log(req.body);
    var data = {
        name: req.body.name,
        producer: req.body.producer,
        type: req.body.type,
        printers: req.body.printers,
        image: req.body.image,
        tonermass: req.body.tonermass,
        resource: req.body.resource,
        color: req.body.color,
        vendor: req.body.vendor,
        analog: req.body.analog,
        status: req.body.status,
        price0: req.body.price0,
        price1: req.body.price1,
        price2: req.body.price2,
        price3: req.body.price3,
        chipprice: req.body.chipprice,
        opcdrumreplacementprice: req.body.opcdrumreplacementprice,
        otherprice: req.body.otherprice,
        printercleananddiagnosticprice: req.body.printercleananddiagnosticprice
    }
    console.log("data " + data);
    var curCont = new controller(model);
    curCont.editRecord(addr, data, function(result){
        console.log('result: ' + result);
        res.send(result);
    });
});

router.get('/deleteprinter/*', function(req, res, next) {

    var arr = req.url.split('/');
    var addr = arr[2];
    console.log(addr);
    var curCont = new pcontroller(pmodel);
    curCont.deleteRecord(addr, function(){
        res.redirect('/pcatalog');
    });
});

module.exports = router;