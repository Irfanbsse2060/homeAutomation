/**
 * Created by Irfan on 11-Jun-17.
 */
/**
 * Created by Irfan on 11-Jun-17.
 */
var palaceManager = require('../managers/palaceManager');

module.exports ={

    findPalace:function(data,callback){

        var floor = data.floor;
        var floorArray = [];
        for(var j=0;j<floor.length;j++){
            floorArray.push(floor[j].dataValues.floor_id);

        }
        var query_data ={floors:floorArray};

        palaceManager.getByFloor(query_data).then(function(palace){

            if(palace)
            {
                data.palace = palace;
                callback(null,data);
            }

            else
                callback('error in getting floor data',null);


        });


    }



}