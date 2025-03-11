const {  DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  name:
  { 
    type: DataTypes.STRING, 
    allowNull: false 
      
  },

  email: 
   {
    
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
    },

  phone: 
   {
     type: DataTypes.STRING,
     allowNull: false
     
    },

});

sequelize.sync();
module.exports = User;
