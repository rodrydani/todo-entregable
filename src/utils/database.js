const { Sequelize } = require("sequelize");

//crear una instancia con aprametros de configuracion de nuestra base de datos
//necesitamos un objeto de configuracion. Son las credenciales de mi base de datos

const db = new Sequelize({
database: "todoapp",
username: "postgres",
host: "localhost",
port: "5432",
password: "1234",
dialect: "postgres"
});

module.exports = db;