const db = require('../helpers/database');
//get single article by id

exports.getById = async function getById (id) {
    let query = "SELECT * FROM articles WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}

//list articles in db

exports.getAll = async function getAll (page, limit, order)
{
    //to do: use page, limit, order to give pagination
    let query = "SELECT * FROM articles;";
    let data = await db.run_query(query);
    return data;
}

//create new article in db
exports.add = async function add (article)
{
    let query = "INSERT INTO articles SET ?";
    let data = await db.run_query(query, article);
    return data;
}

exports.edit = async function edit (article, allText, artID)
{
    let query = "UPDATE articles SET title = ?, allText = ? WHERE ID = ?";
    console.log(article);
    let data = await db.run_query(query, article, allText, artID);
    return data;
}

exports.del = async function del (article)
{
    let query = "DELETE FROM articles WHERE ID = ?";
    let data = await db.run_query(query, article);
    return data;
}