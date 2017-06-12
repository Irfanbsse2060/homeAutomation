/**
 * Created by Irfan on 11-Jun-17.
 */
/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');

module.exports = {

    getByFloor:function(query_data)
    {

        return models.palace.findAll({where:{floorFloorId:query_data.floors},include:models.palace_type});
    }



}