const db = require('../helpers/database');
//get single user by id

exports.getById = async function getById (id) {
    let query = "SELECT * FROM users WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}

//list users in db

exports.getAll = async function getAll (page, limit, order)
{
    let query = "SELECT * FROM users;";
    let data = await db.run_query(query);
    return data;
}