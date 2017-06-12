/**
 * Created by Irfan on 11-Jun-17.
 */

var sensorlogManager  = require('../managers/sensorlogManager');

module.exports  = {

    findTempSensorLog:function(data,callback){

        var sensor = data.sensor;

        var sensorArray = [];
        for(var j=0;j<sensor.length;j++){

            sensorArray.push(sensor[j].dataValues.sensor_id);

        }
        var date =new Date();
        date.setDate(date.getDate()-2);
        var query_data = {sensors:sensorArray,date:date};
        sensorlogManager.getTempLog(query_data).then(function(templog){
            if(templog)
            {
                data.temp_sensor_log = templog;
                callback(null, data);

            }
            else
                callback('error in getting temp sensor log',null);


        });


    },
    findLightSensorLog:function(data,callback){

        var sensor = data.sensor;

        var sensorArray = [];
        for(var j=0;j<sensor.length;j++){

            sensorArray.push(sensor[j].dataValues.sensor_id);

        }
        var date =new Date();
        date.setDate(date.getDate()-2);
        var query_data = {sensors:sensorArray,date:date};

        sensorlogManager.getTempLog(query_data).then(function(lightlog){
            if(lightlog)
            {
                data.light_sensor_log = lightlog;
                callback(null,data);

            }
            else
            {
                callback('error in getting light sensor log',null);
            }



        });


    }





}