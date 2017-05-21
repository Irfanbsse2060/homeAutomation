/**
 * Created by Irfan on 22-May-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var palace = sequelize.define('palace',{

        palace_id:{
            type: datatypes.INTEGER,
            primaryKey:true
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
                palace.belongsTo(models.floor,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                palace.belongsTo(models.palace_type,{

                    foreignKey:{
                        allowNull:false
                    }
                });





            }
        }


    });
    return palace;





}/**
 * Created by Irfan on 22-May-17.
 */
