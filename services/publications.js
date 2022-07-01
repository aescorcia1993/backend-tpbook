const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getPublications(id) { //reading user publications
    if(id>0){
        return db.read("publications", `author = '${id}'`,"*")
    }
    return db.read("publications", `author != '-1'`,"*") //We ask for all data
}

async function register(body) {  //Registering user profile
    return db.create(
      "publications", //table
      "idpublications, author, date, hour, content, likes", //fields
      `"${body.idpublications}",
      "${body.author}",
      "${body.date}",
      "${body.hour}",
      "${body.content}",
      "${body.likes}"    
      `) //values
}

async function update(body) {  //Updating publications
    return db.update(
      "publications", 
      `idpublications="${body.idpublications}", 
      author="${body.author}", 
      date="${body.date}", 
      hour="${body.hour}", 
      content="${body.content}", 
      likes="${body.likes}"` , 
      body.idpublications
      ) //values
}

async function remove(id) {  //Registering users
    return db.de1ete(
        "publications", //table
        "idpublications", //key
      id) //id to erase
}

module.exports = {
    getPublications,
    update,
    register,
    remove,
};