const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mydb2", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

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

sequelize.sync().then(() => console.log("Database synced"));

module.exports = { sequelize, User };

