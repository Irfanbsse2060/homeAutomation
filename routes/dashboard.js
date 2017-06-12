/**
 * Created by Irfan on 09-Jun-17.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');
var async = require('async');



//services
var userServices = require('../services/userServices');
var homeService = require('../services/homeServices');
var floorService = require('../services/floorServices');
var palaceService = require('../services/palaceServices');
var switchService = require('../services/switchServices');
var sensorService = require('../services/sensorServices');
var switchLogService = require('../services/switchLogService');
var sensorlogService = require('../services/sensorlogServices');


// basically request for /dashboard
router.get('/',function(req,res,nex){


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
                },
                function findBulbSwitchLog(data,callback){
                    switchLogService.findBulbSwitchLog(data,callback);

                },
                function findFanSwitchLog(data,callback){
                    switchLogService.findFanSwitchLog(data,callback);

                },
                function findTempSensorLog(data,callback){
                    sensorlogService.findTempSensorLog(data,callback);
                },
                function findLightSensorLog(data,callback){
                    sensorlogService.findLightSensorLog(data,callback);

                }





            ],function(error,result){

                if(error)
                    console.log('error = '+error)
                else
                {
                    var dashboardData={
                        overview:{
                            bulb:{
                                totalon:0,
                                total:0


                            },
                            fan:{
                                totalon:0,
                                total:0
                            },
                            mode:{

                            }


                        },
                        temp_sensor_log:[],
                        light_sensor_log:[],
                        bulb_log:[],
                        fan_log:[]

                    };

                    for(var i=0;i<result.switches.length;i++){
                        var single_switch = result.switches[i];
                        console.log(single_switch);

                        if(single_switch.dataValues.applianceApplianceId==1)
                        {
                            dashboardData.overview.bulb.total = dashboardData.overview.bulb.total+1;
                            if(single_switch.dataValues.status==1)
                                dashboardData.overview.bulb.totalon = dashboardData.overview.bulb.totalon+1;
                        }
                        else
                        {
                            dashboardData.overview.fan.total = dashboardData.overview.fan.total+1;
                            if(single_switch.dataValues.status==1)
                                dashboardData.overview.fan.totalon = dashboardData.overview.fan.totalon+1;
                        }

                    }

                    dashboardData.overview.mode.id=result.home[0].dataValues.mode.dataValues.id;
                    dashboardData.overview.mode.name=result.home[0].dataValues.mode.dataValues.name;

                    for(var i=0;i<result.bulb_log.length;i++) {
                        dashboardData.bulb_log.push(result.bulb_log[i].dataValues);


                    }
                    for(var k=0;k<result.bulb_log.length;k++) {
                        dashboardData.fan_log.push(result.bulb_log[k].dataValues);


                    }


                    for(var j=0;j<result.temp_sensor_log.length;j++) {
                        dashboardData.temp_sensor_log.push(result.temp_sensor_log[j].dataValues);


                    }
                    for(var k=0;k<result.light_sensor_log.length;k++) {
                        dashboardData.light_sensor_log.push(result.light_sensor_log[k].dataValues);


                    }


                    console.log('dashboard data ='+dashboardData);
                    console.log('result'+result);

                    res.json(dashboardData);

                }



            });


      /*      async.waterfall([
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
                    models.floor.findAll({where:{homeHomeId:home[0].dataValues.home_id}}).then(function(floor){
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
                    models.palace.findAll({where:{floorFloorId:floorArray}}).then(function(palace){

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

                        models.switches.findAll({where:{palacePalaceId:palaceArray}}).then(function(switches){
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
                    models.sensor.findAll({where:{palacePalaceId:palaceArray}}).then(function(sensor){
                        if (sensor) {
                            homedata.sensor=sensor;
                            callback(null,homedata);

                        }
                        else
                        {
                            callback('error occured at getting switches',null);
                        }

                    });


                },
                function getLogData(homedata,callback){
                    var switches = homedata.switches;
                    var sensor = homedata.sensor;
                    var switchesArray = [];
                    var sensorArray = [];
                    for(var j=0;j<switches.length;j++){
                        switchesArray.push(switches[j].dataValues.switch_id);
                        if(j<sensor.length)
                            sensorArray.push(sensor[j].dataValues.sensor_id);

                    }
                    var date =new Date();
                    date.setDate(date.getDate()-2);



                    models.switch_log.findAll({where:{date:date,switchSwitchId:switchesArray},include:[{model:models.switches,where:{applianceApplianceId:1}}] }).then(function(switch_log){
                        if (switch_log) {
                            homedata.bulb_log=switch_log;
                            models.switch_log.findAll({where:{date:date,switchSwitchId:switchesArray},include:[{model:models.switches,where:{applianceApplianceId:2}}] }).then(function(switch_log) {

                                if (switch_log) {
                                    homedata.fan_log=switch_log;
                                    models.sensor_log.findAll({where:{date:date,sensorSensorId:sensorArray},include:[{model:models.sensor,where:{sensorTypeStId:1}}] }).then(function(sensor_log) {

                                       if(sensor_log)
                                       {
                                           homedata.temp_sensor_log =  sensor_log;

                                           models.sensor_log.findAll({where:{date:date,sensorSensorId:sensorArray},include:[{model:models.sensor,where:{sensorTypeStId:2}}] }).then(function(sensor_log) {

                                               if(sensor_log)
                                               {
                                                   homedata.light_sensor_log =  sensor_log;
                                                   callback(null,homedata);
                                               }

                                           });


                                       }



                                    });


                                }

                            });

                        }
                        else
                        {
                            callback('error occured at getting switches',null);
                        }

                    });

                },





            ],function(error, result){

               if(error){
                   console.log('error occured'+error);
               }
               else {
                   //console.log('result = '+result);

                   var dashboardData={
                       overview:{
                           bulb:{
                               totalon:0,
                               total:0


                           },
                           fan:{
                               totalon:0,
                               total:0
                           },
                           mode:{

                           }


                       },
                       temp_sensor_log:[],
                       light_sensor_log:[]

                   };

                   for(var i=0;i<result.switches.length;i++){
                       var single_switch = result.switches[i];
                       console.log(single_switch);

                       if(single_switch.dataValues.applianceApplianceId==1)
                       {
                           dashboardData.overview.bulb.total = dashboardData.overview.bulb.total+1;
                           if(single_switch.dataValues.status==1)
                               dashboardData.overview.bulb.totalon = dashboardData.overview.bulb.totalon+1;
                       }
                       else
                       {
                           dashboardData.overview.fan.total = dashboardData.overview.fan.total+1;
                           if(single_switch.dataValues.status==1)
                               dashboardData.overview.fan.totalon = dashboardData.overview.fan.totalon+1;
                       }

                   }

                   dashboardData.overview.mode.id=result.mode[0].dataValues.id;
                   dashboardData.overview.mode.name=result.mode[0].dataValues.name;


                   for(var j=0;j<result.temp_sensor_log.length;j++) {
                       dashboardData.temp_sensor_log.push(result.temp_sensor_log[j].dataValues);


                   }
                   for(var k=0;k<result.light_sensor_log.length;k++) {
                       dashboardData.light_sensor_log.push(result.light_sensor_log[k].dataValues);


                   }


                   console.log('dashboard data ='+dashboardData);


                   res.json(dashboardData);

               }


            });*/






        }
    });






});

module.exports= router;