/**
 * Created by Irfan on 22-May-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var user = sequelize.define('user',{

        user_name:{
            type: datatypes.STRING,
            primaryKey:true
        },
        password:{
            type:datatypes.STRING,
            allowNull:false
        },
        name:{
            type:datatypes.STRING,
            allowNull:false
        }





    },{
        timestamps:false,
        freezeTableName:true,
        classMethods:{
            associate: function(models){
                user.belongsTo(models.account,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                user.belongsTo(models.user_type,{
                    foreignKey:{
                        allowNull:false
                    }

                })



            }
        }


    });
    return user;





}