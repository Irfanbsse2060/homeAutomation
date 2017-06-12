
/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');

module.exports = {

    getBulbLog:function(query_data)
    {

        return models.switch_log.findAll({where:{date:query_data.date,switchSwitchId:query_data.switches},include:[{model:models.switches,where:{applianceApplianceId:1}}] })
    },
    getFanLog:function(query_data){

        return models.switch_log.findAll({where:{date:query_data.date,switchSwitchId:query_data.switches},include:[{model:models.switches,where:{applianceApplianceId:2}}] });

    }



}

