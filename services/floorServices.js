/**
 * Created by Irfan on 11-Jun-17.
 */
var floorManager = require('../managers/floorManager');

module.exports ={

    findFloor:function(data,callback){


        var home = data.home;
        var query_data = {home_id:home[0].dataValues.home_id}
        floorManager.getByhome(query_data).then(function(floor){

            if(floor)
            {
                data.floor = floor;
                callback(null,data);
            }

            else
                callback('error in getting floor data',null);


        });


    }



}