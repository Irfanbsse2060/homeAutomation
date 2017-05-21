/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var sensor_type = sequelize.define('sensor_type',{

        st_id:{
            type: datatypes.INTEGER,
            primaryKey:true
        },
        name:{
            type:datatypes.STRING,
            allowNull:false
        }




    },{
        timestamps:false,
        freezeTableName:true


    });
    return sensor_type;





}/**
 * Created by Irfan on 22-May-17.
 */
