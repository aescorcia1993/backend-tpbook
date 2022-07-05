const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getPublicationsById(id) { 
    let tables = "publications";
    let filters = `author='${id}'`;
    let fields = "idpublications, author, stamp,content, likes";
    if(id>0){
      return db.read(tables, filters,fields)
    }
    return db.read(tables, `idusuario=author`,fields) 
}

async function getAllPublications() { 
    let tables = "publications";
    let filters="stamp > 0";
    let result = await db.read(tables, filters);
    return  result
}

async function register(body) {  
    return db.create(
      "publications", 
      "author, stamp, content, likes", 
      `"${body.author}",
      "${body.stamp}",
      "${body.content}",
      "${body.likes}"`) 
}

async function update(body) {
    return db.update(
      "publications", 
      `author="${body.author}", 
      stamp="${body.stamp}",  
      content="${body.content}", 
      likes="${body.likes}"` , 
      body.idpublications,
      "idpublications"
      )
}

async function remove(id){ 
    return db.de1ete(
        "publications",
        "idpublications", 
      id) 
}

module.exports = {
    getPublicationsById,
    getAllPublications,
    update,
    register,
    remove,
};