/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var switch_log = sequelize.define('switch_log',{

        switchlog_id:{
            type: datatypes.INTEGER,
            primaryKey:true
        },
        status:{
            type:datatypes.INTEGER,
            allowNull:false
        },
        date:{
            type:datatypes.DATE,
            allowNull:false
        },
        time:{
            type:datatypes.TIME,
            allowNull:false
        }




    },{
        timestamps:false,
        freezeTableName:true,
        classMethods:{
            associate: function(models){
                switch_log.belongsTo(models.switches,{

                    foreignKey:{
                        allowNull:false
                    }
                });



            }
        }


    });
    return switch_log;





}/**
 * Created by Irfan on 22-May-17.
 */
