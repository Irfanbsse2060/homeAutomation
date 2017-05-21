/**
 * Created by Irfan on 22-May-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var switches = sequelize.define('switches',{

        switch_id:{
            type: datatypes.INTEGER,
            primaryKey:true
        },
        status:{
            type:datatypes.STRING,
            allowNull:false
        }




    },{
        timestamps:false,
        freezeTableName:true,
        classMethods:{
            associate: function(models){
                switches.belongsTo(models.appliance,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                switches.belongsTo(models.palace,{

                    foreignKey:{
                        allowNull:false
                    }
                });



            }
        }


    });
    return switches;





}