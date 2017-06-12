
/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');

module.exports = {

    getTempLog:function(query_data)
    {


        return models.sensor_log.findAll({where:{date:query_data.date,sensorSensorId:query_data.sensors},include:[{model:models.sensor,where:{sensorTypeStId:1}}] })
    },
    getLightLog:function(query_data){

        return models.sensor_log.findAll({where:{date:query_data.date,sensorSensorId:query_data.sensors},include:[{model:models.sensor,where:{sensorTypeStId:2}}] });

    }



}


