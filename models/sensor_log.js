/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var sensor_log = sequelize.define('sensor_log',{

        sensorlog_id:{
            type: datatypes.INTEGER,
            primaryKey:true
        },
        value:{
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
                sensor_log.belongsTo(models.sensor,{

                    foreignKey:{
                        allowNull:false
                    }
                });



            }
        }


    });
    return sensor_log;





}/**
 * Created by Irfan on 22-May-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
