const helper = require("../helper")
const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  console.log("#####RESULTS",results);
  return results;
}

async function read(table, filter, fields='*', others='') {
  const rows = await query(
    `SELECT ${fields}
     FROM ${table} 
     WHERE ${filter} ${others}`     
  );
  const data = helper.emptyOrRows(rows);
  if (data.length >0){
    return data;  
  }else{
    return null;
  }
}

async function create(table, fields, values) {
  const result = await query(
    `INSERT INTO ${table} 
    (${fields}) 
    VALUES 
    (${values})`
  );
  let message = "Error in creating data";
  if (result.affectedRows) {
    message = "Data created successfully";
  }
  return { message };
}

async function update(table, changes,id,field) {
  const result = await query(
    `UPDATE ${table} 
    SET ${changes} 
    WHERE ${field}=${id}`    
  );

  let message = "Error in updating Data";

  if (result.affectedRows) {
    message = "Data updated successfully";
  }

  return { message };
}


async function de1ete(table, field, id) {
  const result = await query(
    `DELETE FROM ${table} WHERE ${field}='${id}'`
  );
  let message = "Error in deleting data";
  if (result.affectedRows) {
    message = "Data deleted successfully";
  }
  return { message };
}

async function custom(sqlQy) {
  const rows = await query(
    sqlQy
  );
  const data = helper.emptyOrRows(rows);
  if (data.length >1){
    return data;  
  }else if(data.length === 1){
    return data[0];
  }else{
    return null;
  }
}

module.exports = {
  query,

  create,
  read,
  update,
  de1ete,
  custom
};

//SELECT mytest.comments.idcomments, mytest.comments.content, mytest.comments.stamp, mytest.comments.autorid, mytest.comments.postid
//FROM mytest.comments
//INNER JOIN mytest.usuario ON mytest.comments.autorid = 1;