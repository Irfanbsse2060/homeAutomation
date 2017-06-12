
var switchlogManager = require('../managers/switchlogManager');

module.exports ={

    findBulbSwitchLog:function(data,callback){

        var switches = data.switches;

        var switchesArray = [];

        for(var j=0;j<switches.length;j++){
            switchesArray.push(switches[j].dataValues.switch_id);


        }
        var date =new Date();
        date.setDate(date.getDate()-2);
        var query_data = {switches:switchesArray,date:date};

        switchlogManager.getBulbLog(query_data).then(function(bulblogs){


            if(bulblogs)
            {
                data.bulb_log = bulblogs;
                callback(null,data);
            }
            else
                callback('errror occured at getting switches',null);

        })



    },

    findFanSwitchLog:function(data,callback){
        var switches = data.switches;

        var switchesArray = [];

        for(var j=0;j<switches.length;j++){
            switchesArray.push(switches[j].dataValues.switch_id);


        }
        var date =new Date();
        date.setDate(date.getDate()-3);
        var query_data = {switches:switchesArray,data:date};
        switchlogManager.getFanLog(query_data).then(function(fanlog){


            if(fanlog)
            {
                data.fan_log = fanlog;
                callback(null,data);
            }
            else
                callback('errror occured at getting switches',null);

        })



    }



}