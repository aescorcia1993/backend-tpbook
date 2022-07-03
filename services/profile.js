const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getProfile(id) { //reading user profile
    return db.read("profile", `profile_user = '${id}'`,"*", "LIMIT 1")
}

async function register(body) {  //Registering user profile
    return db.create(
      "profile", //table
      "profile_user, description, birthdate, city, country, gender, job, picture", //fields
      `${body.profile_user},
      "${body.description}",
      "${body.birthdate}",
      "${body.city}",
      "${body.country}",
      "${body.gender}",
      "${body.job}",            
      "${body.picture}"      
      `) //values
}

async function update(body) {  //Registering user profile

    return db.update(
      "profile", 
      `idprofile="${body.idprofile}", 
      profile_user="${body.profile_user}", 
      description="${body.description}", 
      birthdate="${body.birthdate}", 
      city="${body.city}", 
      country="${body.country}", 
      gender="${body.gender}", 
      job="${body.job}", 
      picture="${body.picture}"` , 
      body.profile_user
      ) //values
}

async function remove(id) {  //Registering users
    return db.de1ete(
        "profile", //table
        "profile_user", //key
      id) //id to erase
}

module.exports = {
    getProfile,
    update,
    register,
    remove,
};