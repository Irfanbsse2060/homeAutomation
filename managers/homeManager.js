/**
 * Created by Irfan on 11-Jun-17.
 */
var models= require('../models');
module.exports= {
    getByAccount:function(query_data){

        return models.home.findAll({where:{accountAccountId:query_data.account},include:models.mode})
    }



};