/**
 * Created by Irfan on 22-May-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var user_type = sequelize.define('user_type',{

        user_id:{
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
    return user_type;





}