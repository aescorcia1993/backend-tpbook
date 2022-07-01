const helper = require("../helper")
const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);

  return results;
}

async function read(table, filter, fields='*', others='') {
  const rows = await query(
    `SELECT ${fields}
     FROM ${table} 
     WHERE ${filter} ${others}`     
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

async function update(table, changes,id) {
  const result = await query(
    `UPDATE ${table} 
    SET ${changes} 
    WHERE profile_user=${id}`    
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

module.exports = {
  query,

  create,
  read,
  update,
  de1ete,
};
