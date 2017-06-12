/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var home = sequelize.define('home',{

        home_id:{
            type: datatypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        name:{
            type:datatypes.STRING,
            allowNull:false
        },
        description:{
            type:datatypes.STRING

        }




    },{
        timestamps:false,
        freezeTableName:true,
        classMethods:{
            associate: function(models){
                home.belongsTo(models.account,{

                    foreignKey:{
                        allowNull:false
                    }
                }),
                home.belongsTo(models.mode,{

                    foreignKey:{
                        allowNull:false
                    }
                })



            }
        }


    });
    return home;





}