const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getProfile(id) { //reading user profile
    return db.read("profile", `profile_user = '${id}'`,"*", "LIMIT 1")
}

async function register(body) { 
    return db.create(
      "profile", 
      "profile_user, description, birthdate, city, country, gender, job, picture", //fields
      `${body.profile_user},
      "${body.description}",
      "${body.birthdate}",
      "${body.city}",
      "${body.country}",
      "${body.gender}",
      "${body.job}",            
      "${body.picture}"      
      `) 
}

async function update(body) {  
    return db.update(
      "profile", 
      `profile_user="${body.profile_user}", 
      description="${body.description}", 
      birthdate="${body.birthdate}", 
      city="${body.city}", 
      country="${body.country}", 
      gender="${body.gender}", 
      job="${body.job}", 
      picture="${body.picture}"` , 
      body.profile_user,
      "idprofile"
      ) 
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