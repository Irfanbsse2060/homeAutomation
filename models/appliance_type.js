/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var appliance = sequelize.define('appliance',{

        appliance_id:{
            type: datatypes.INTEGER,
            primaryKey:true
        },
        type:{
            type:datatypes.STRING,
            allowNull:false
        }




    },{
        timestamps:false,
        freezeTableName:true


    });
    return appliance;





}/**
 * Created by Irfan on 22-May-17.
 */
