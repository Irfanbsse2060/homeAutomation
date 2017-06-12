/**
 * Created by Irfan on 11-Jun-17.
 */
var sensorManager = require('../managers/sensorManager');

module.exports ={

    findSensor:function(data,callback){
        var palaces = data.palace;
        var palaceArray = [];
        for(var j=0;j<palaces.length;j++){
            palaceArray.push(palaces[j].dataValues.palace_id);

        }
        var query_data = {palaces:palaceArray}
        sensorManager.getByPalace(query_data).then(function(sensor){

            if(sensor)
            {
                data.sensor = sensor;
                callback(null,data);
            }
            else
                callback('errror occured at getting switches',null);

        })


    }



}