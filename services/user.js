const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function login(body) { //Logging users, validating name and password
  return db.read("usuario", `name = '${body.user}' AND password = '${body.password}'`,"*",  `LIMIT 1`)
}

async function register(body) {  //Registering users
  return db.create(
    "usuario", //table
    "name, password, correo, celular, direccion", //fields
    `"${body.user}","${body.password}","${body.email}","${body.phone}","${body.address}"`) //values
}

async function remove(id) {  //Remove publications, profiles and user
  return db.de1ete(
    "usuario", //table
    "idusuario", //key
    id) //id to erase
}

module.exports = {
  login,
  register,
  remove,
};
