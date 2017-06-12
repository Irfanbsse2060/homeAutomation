/**
 * Created by Irfan on 11-Jun-17.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var jwt = require('jsonwebtoken');
var models = require('../models');


//services
var userServices = require('../services/userServices');
var homeService = require('../services/homeServices');
var floorService = require('../services/floorServices');
var palaceService = require('../services/palaceServices');
var switchService = require('../services/switchServices');
var sensorService = require('../services/sensorServices');
var switchLogService = require('../services/switchLogService');
var sensorlogService = require('../services/sensorlogServices');



router.get('/',function(req,res,next){

    console.log('auth ='+req.get('Authorization'));
    var  Stringtoken = req.get('Authorization');
    var StringTokenArray = Stringtoken.split(' ');

    var token = StringTokenArray[1];

    jwt.verify(token, 'irfanbsse2060', function(err, decoded) {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            console.log('decoded'+req.decoded);
            console.log(req.decoded.username);

            var data = {
                email:req.decoded.username
            }
            async.waterfall([

                function findUser(callback){
                    userServices.findUser(data,callback);

                },
                function findHome(data,callback){
                    homeService.findHome(data,callback);

                },
                function findFloor(data,callback){
                    floorService.findFloor(data,callback);

                },
                function findPalace(data,callback){
                    palaceService.findPalace(data,callback);
                },
                function findSwitch(data,callback)
                {
                    switchService.findSwitch(data,callback);
                },
                function findSensor(data,callback){

                    sensorService.findSensor(data,callback);
                }




            ],function(error,result){

                if(error)
                    console.log('error = '+error)
                else
                {
                    var nowData = {
                        floors:[],
                        palaces:[],
                        switches:[],
                        sensors:[],
                        mode:{}

                    }



                    nowData.mode.id=result.home[0].dataValues.mode.dataValues.id;
                    nowData.mode.name=result.home[0].dataValues.mode.dataValues.name;

                    for(var i=0;i<result.switches.length;i++) {
                        nowData.switches.push(result.switches[i].dataValues);
                    }

                    for(var j=0;j<result.sensor.length;j++) {
                        nowData.sensors.push(result.sensor[j].dataValues);
                    }
                    for(var k=0;k<result.floor.length;k++) {
                        nowData.floors.push(result.floor[k].dataValues);


                    }
                    for(var m=0;m<result.palace.length;m++) {
                        nowData.palaces.push(result.palace[m].dataValues);


                    }


                    console.log('now data ='+nowData);

                    res.json(nowData);

                }



            });



           /* async.waterfall([
                function getUser(callback){



                    models.user.findAll({where:{user_name:req.decoded.username} ,include:[{model:models.account}] }).then(function(user) {
                        if (user) {
                            console.log(user);
                            var homedata={};
                            homedata.user = user;
                            callback(null,homedata);
                        }
                        else
                        {
                            callback('error occured at getting user',null);
                        }

                    });


                },
                function getHome(homedata,callback){
                    var user= homedata.user;
                    models.home.findAll({where:{accountAccountId:user[0].dataValues.accountAccountId}}).then(function(home){
                        if (home) {
                            console.log(home);
                            homedata.home =home;
                            callback(null,homedata);
                        }
                        else
                        {
                            callback('error occured at getting home',null);
                        }

                    });


                },
                function getMode(homedata,callback){
                    var home = homedata.home;
                    models.mode.findAll({where:{id:home[0].dataValues.modeId}}).then(function(mode) {
                        if(mode){
                            homedata.mode= mode;
                            callback(null,homedata);
                        }
                        else
                        {
                            callback('error occured at getting mode',null);
                        }


                    });
                },
                function getFloor(homedata,callback){
                    var home = homedata.home;
                    models.floor.findAll({where:{homeHomeId:home[0].dataValues.home_id},include:models.floor_type}).then(function(floor){
                        if (floor) {
                            homedata.floor = floor;

                            callback(null,homedata);
                        }
                        else
                        {
                            callback('error occured at getting floor',null);
                        }

                    });


                },
                function getPalaces(homedata,callback){
                    var floor = homedata.floor;
                    var floorArray = [];
                    for(var j=0;j<floor.length;j++){
                        floorArray.push(floor[j].dataValues.floor_id);

                    }
                    models.palace.findAll({where:{floorFloorId:floorArray},include:models.palace_type}).then(function(palace){

                        if (palace) {
                            homedata.palace = palace;

                            callback(null,homedata);


                        }
                        else
                        {
                            callback('error occured at getting palace',null);
                        }

                    });




                },
                function getSwitches(homedata,callback){
                    var palaces = homedata.palace;
                    var palaceArray = [];
                    for(var j=0;j<palaces.length;j++){
                        palaceArray.push(palaces[j].dataValues.palace_id);

                    }

                    models.switches.findAll({where:{palacePalaceId:palaceArray},include:models.appliance}).then(function(switches){
                        if (switches) {
                            homedata.switches=switches;
                            callback(null,homedata);

                        }
                        else
                        {
                            callback('error occured at getting switches',null);
                        }

                    });






                },
                function getSensor(homedata,callback){
                    var palaces = homedata.palace;
                    var palaceArray = [];
                    for(var j=0;j<palaces.length;j++){
                        palaceArray.push(palaces[j].dataValues.palace_id);

                    }
                    models.sensor.findAll({where:{palacePalaceId:palaceArray},include:models.sensor_type}).then(function(sensor){
                        if (sensor) {
                            homedata.sensor=sensor;
                            callback(null,homedata);

                        }
                        else
                        {
                            callback('error occured at getting switches',null);
                        }

                    });


                }




            ],function(error, result){

                if(error){
                    console.log('error occured'+error);
                }
                else {
                    //console.log('result = '+result);

                    var nowData = {
                        floors:[],
                        palaces:[],
                        switches:[],
                        sensors:[],
                        mode:{}

                    }



                    nowData.mode.id=result.mode[0].dataValues.id;
                    nowData.mode.name=result.mode[0].dataValues.name;

                    for(var i=0;i<result.switches.length;i++) {
                        nowData.switches.push(result.switches[i].dataValues);
                    }

                    for(var j=0;j<result.sensor.length;j++) {
                        nowData.sensors.push(result.sensor[j].dataValues);
                    }
                    for(var k=0;k<result.floor.length;k++) {
                        nowData.floors.push(result.floor[k].dataValues);


                    }
                    for(var m=0;m<result.palace.length;m++) {
                        nowData.palaces.push(result.palace[m].dataValues);


                    }


                    console.log('now data ='+nowData);

                    res.json(nowData);



                }


            });*/






        }
    });


});

module.exports= router;