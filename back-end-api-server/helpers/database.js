const mysql = require('promise-mysql');
const info = require('../config');

//define an async utility function to get a connection
//run a sql query then end the connection

exports.run_query = async function run_query(query, values)
{
    try {
        const connection = await mysql.createConnection(info.config);
        let data = await connection.query(query, values);
        await connection.end();
        return data;
    }   
    catch (error) {
        //dont let the actual error propogate up to the response object
        //as it may contain sensitive server info
        //instead log it and show a generic error
        console.error(error, query, values);
        throw 'Database query error'
    }
}