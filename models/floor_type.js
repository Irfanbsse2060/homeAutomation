/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var floor_type = sequelize.define('floor_type',{

        floor_id:{
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
    return floor_type;





}