const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getComments(id) { //reading user Comments
    if(id>0){
        return db.read("Comments", `idautorid = '${id}'`,"*", "ORDER BY idautorid DESC")
    }
    return db.read("Comments", `idautorid != '-1'`,"*", "ORDER BY idautorid DESC") //We ask for all data
}

async function register(body) {  //Registering user Comments
    return db.create(
      "Comments", //table
      "idcomments, content, stamp, autorid", //fields
      `"${body.idcomments}",
      "${body.content}",
      "${body.stamp}",
      "${body.autorid}"   
      `) //values
}

async function update(body) {  //Updating Comments
    return db.update(
      "Comments", 
      `idcomments="${body.idcomments}", 
      content="${body.content}", 
      stamp="${body.stamp}", 
      autorid="${body.autorid}"` , 
      body.autorid
      ) //values
}

async function remove(id) {  //Erasing Comments
    return db.de1ete(
        "comments", //table
        "idcomments", //key
      id) //id to erase
}

module.exports = {
    getComments,
    update,
    register,
    remove,
};