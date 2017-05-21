/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var palace_type = sequelize.define('palace_type',{

        palace_id:{
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
    return palace_type;





}/**
 * Created by Irfan on 22-May-17.
 */
