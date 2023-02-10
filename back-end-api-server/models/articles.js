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

exports.edit = async function edit (article)
{
    let query = "UPDATE articles SET ? WHERE ID = ?";
    console.log(article);
    const values = [article, article.ID];
    let data = await db.run_query(query, values);
    return data;
}

exports.del = async function del (article)
{
    let query = "DELETE FROM articles WHERE ID = ?";
    const values = [article, article.ID];
    let data = await db.run_query(query, values);
    return data;
}