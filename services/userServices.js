/**
 * Created by Irfan on 11-Jun-17.
 */
var userManager = require('../managers/userManager');


module.exports= {

  findUser:function(data,callback){
      var query_data=data;
      userManager.findByUsername(query_data).then(function(user){

         if(user)
         {
             data.user=user;
             callback(null,data);

         }
         else
             callback('error occured in getting user',null);
      });

  }



};