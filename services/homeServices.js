/**
 * Created by Irfan on 11-Jun-17.
 */
var homeManager = require('../managers/homeManager');

module.exports ={

    findHome:function(data,callback){

        user=data.user;

        var query_data={account:user[0].dataValues.accountAccountId}

        homeManager.getByAccount(query_data).then(function(home){

            if(home)
            {
                data.home = home;
                callback(null,data);
            }

            else
                callback('error in getting home data',null);


        });


    }



}