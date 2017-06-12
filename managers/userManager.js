/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');
module.exports = {

    findByUsername:function(query_data){

        return models.user.findAll({where:{user_name:query_data.email},include:models.user_type});
    }




}

