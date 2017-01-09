var mongoose = require('mongoose');

var cartridgeController = function(cartridgeModel){
    this.cmodel = cartridgeModel;
};

cartridgeController.prototype.findOneByName = function(sname, callback)
{
    var me = this;
    var s;
    me.cmodel.findOne({name: sname}, function(err, name){
        if(err){
            console.log(err);
            s = 'error';
        }
        if(name){
            console.log('identity');
            s = name;
        }
        else{
            console.log('non identity');
            s = 'non identity';
        }
        callback(s);
    });
}

cartridgeController.prototype.findByCategory = function(scat, callback)
{
    var me = this;
    var s;
    me.cmodel.find(null, {category: scat}, function(err, cat){
        if(err){
            console.log(err);
        }
        if(cat){
            console.log('identity');
            s = cat;
        }
        else{
            console.log('non identity');
            s = 'non identity';
        }
        callback(s);
    });
}

cartridgeController.prototype.findOneByID = function(id, callback)
{
    var me = this;
    var s;
    me.cmodel.findOne({_id: id}, function(err, result){
        //console.log('result: ' + result);
        if(err){
            console.log(err);
            s = 'error';
        }
        if(result){
            console.log('identity');
            s = result;
        }
        else{

            console.log('non identity');
            s = 'non identity';
        }
        callback(s);
    });
}

cartridgeController.prototype.findAll = function(callback)
{
    var me = this;
    var s;
    me.cmodel.find({}, function(err, name){
        if(err){
            console.log(err);
        }
        if(name){
            console.log(1);
            console.log('name: ' + name);
            if(name.length != 0){
                s = name;
            }
            else{
                console.log('no result');
                s = 'no result';
            }
        }
        callback(s);
    });
}

cartridgeController.prototype.editRecord = function(id, data, callback)
{
    var me = this;
    var res;
    console.log('controller.data: ' + data.name);
    me.cmodel.findOneAndUpdate({_id: id},
        data,
        {},
        function(err, result){
            if(err){
                res = 'errorUpdateCartridge';
            }
            else{
                console.log('result:', result);
                res = 'successUpdateCartridge';
            }
            callback(res);
        });
}

cartridgeController.prototype.createRecord = function(newProduct, callback)
{
    var me = this;
    me.findOneByName(newProduct.name,function(result){
        if(result != 'error' && result != 'non identity'){
            callback('identity');
        }
        else{
            if(result == 'non identity')
            {
                newProduct.save(function (err, product){
                    if(err){
                        callback('errorAddCartridge');
                    }
                    else{
                        callback('successAddCartridge/' + product._id);
                    }
                });
            }
            else
            {
                callback('errorAddCartridge');
            }
        }
    });
}

cartridgeController.prototype.deleteRecord = function(id, callback)
{
    var me = this;
    me.findOneByID(id, function(result){
        if(result != 'error' && result != 'non identity'){
            me.cmodel.remove({_id: id},function(err, result){
                if(err){
                    callback('error');
                }
                if(result){
                    callback('success');
                }
            });
        }
        else{
            callback('error');
        }
    });
}

module.exports = cartridgeController;