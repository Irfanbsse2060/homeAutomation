/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var account = sequelize.define('account',{

        account_id:{
            type: datatypes.INTEGER,
            primaryKey:true
        },
        status:{
            type:datatypes.STRING,
            allowNull:false
        }




    },{
        timestamps:false,
        freezeTableName:true


    });
    return account;





}