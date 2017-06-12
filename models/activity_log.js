/**
 * Created by Irfan on 09-Jun-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var activity_log = sequelize.define('activity_log',{

        aid:{
            type: datatypes.INTEGER,
            primaryKey:true
        },
        action:{
            type:datatypes.INTEGER,
            allowNull:false
        },
        date:{
            type:datatypes.DATE,
            allowNull:false
        }




    },{
        timestamps:false,
        freezeTableName:true,
        classMethods:{
            associate: function(models){
                activity_log.belongsTo(models.home,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                activity_log.belongsTo(models.switches,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                activity_log.belongsTo(models.user,{

                    foreignKey:{
                        allowNull:false
                    }
                });



            }
        }


    });
    return activity_log;





}