/**
 * Created by Irfan on 11-Jun-17.
 */
/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');

module.exports = {

    getByPalace:function(query_data)
    {

        return models.sensor.findAll({where:{palacePalaceId:query_data.palaces},include:models.sensor_type})
    }



}