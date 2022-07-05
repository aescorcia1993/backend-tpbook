const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getComments(id) { 
    if(id>0){
        return db.read("comments", `autorid = '${id}'`,"*", "ORDER BY autorid DESC")
    }
    return db.read("comments", `autorid != '-1'`,"*", "ORDER BY autorid DESC") 
}

async function getCommentsByPostId(id) { 
    if(id>0){
        let query = "SELECT idcomments, content, "
        + "stamp, autorid, postid, usuario.name "
        + "FROM comments "
        + "INNER JOIN usuario ON comments.autorid = usuario.idusuario AND "
        + `comments.postid = ${id}`
        let data = await db.custom(query)
        if (data === null) return null;
        if (data.length > 1 )return data;
        return [data];
    }else{
        return null
    }
}

async function register(body) {  
    return db.create(
      "comments", 
      "content, stamp, autorid, postid",       
      `"${body.content}",
      "${body.stamp}",
      "${body.autorid}",
      "${body.postid}"`) 
}

async function update(body) {  
    return db.update(
      "comments", 
      `idcomments="${body.idcomments}", 
      content="${body.content}", 
      stamp="${body.stamp}", 
      autorid="${body.autorid}"` , 
      body.autorid,
      "idcomments"
      ) 
}

async function remove(id) {  //Erasing Comments
    return db.de1ete(
        "comments", //table
        "idcomments", //key
      id) //id to erase
}

module.exports = {
    getComments,
    getCommentsByPostId,
    update,
    register,
    remove,
};