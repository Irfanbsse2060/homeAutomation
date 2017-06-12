/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');

module.exports = {

    getByhome:function(query_data)
    {


        return models.floor.findAll({where:{homeHomeId:query_data.home_id},include:models.floor_type})
    }



}