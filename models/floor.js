/**
 * Created by Irfan on 22-May-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var floor = sequelize.define('floor',{

        floor_id:{
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
                floor.belongsTo(models.home,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                floor.belongsTo(models.floor_type,{

                    foreignKey:{
                        allowNull:false
                    }
                });



            }
        }


    });
    return floor;





}