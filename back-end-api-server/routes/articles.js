// this file will define the API route handlers for articles
const Router = require('koa-router');

//we are going to parse request bodies so import koa-bodyparser
const bodyParser = require('koa-bodyparser');

const model = require('../models/articles');
// since we are handling articles use a URI that begins with an approprate path
const router = Router({prefix: '/api/v1/articles'});

//temp def some random articles in an array
//later change implement a database

//const articles = [
//    {title:'hello article', fullText:'some text here to fill the body'},
//    {title:'another article', fullText:'again here is some text here to fill'},
//    {title:'coventry university', fullText:'some news about coventry university'}
//];

//routes are needed to connect path endpoints to handler functions
//when an article id needs to be matched we use a pattern to match
//a named route parameter. here the name of the parameter will be 'id'
//and we will define the pattern to match at least 1 numeral.

router.get('/', getAll)
router.post('/', bodyParser(), createArticle);
router.post('/', bodyParser(), updateArticle);
router.post('/', bodyParser(), deleteArticle);
router.get('/:id([0-9]{1,})', getById);
router.get('/update/:id([0-9]{1,})', updateArticle);
router.get('/delete/:id([0-9]{1,})', deleteArticle);

//define handler functions used above

//function getAll(cnx, next)
//{
//    //use response body to send the articles as JSON
//    cnx.body = articles;
//}

async function getAll(ctx)
{
    let articles = await model.getAll();
    if (articles.length)
    {
        ctx.body = articles;
    }
}

/*function getById(cnx, next)
{
    //get id from the route parameters
   let id = cnx.params.id;
    //if article exists, return it as json
    if ((id < articles.length+1) && (id > 0))
    {
        cnx.body = articles[id-1];
    }
    else
    {
        cnx.status = 404;
    }
}*/

async function getById(ctx)
{
    let id = ctx.params.id;
    let article = await model.getById(id);
    if (article.length)
    {
        ctx.body = article[0];
    }
}

/*function createArticle(cnx, next)
{
    //the body parser gives us access to the request body on cnx.request.body
    //extract the title and fullText we were sent
    let {title, fullText} = cnx.request.body;
    
    //define new article for addition to the array
    let newArticle = {title:title, fullText:fullText};
    articles.push(newArticle);
    //send back appropriate JSON and status code.
    //once we move to a db storage, the newArticle sent back will now have its ID

    cnx.status = 201;
    cnx.body = newArticle;
}*/

async function createArticle(ctx)
{
    const body = ctx.request.body;
    let result = await model.add(body);
    if (result)
    {
        ctx.status = 201;
        ctx.body = {TD: result.insertId}
    }
}

/*function updateArticle(cnx,next)
{
    //edit an article
    // i give an id already which article to update
    // 
    //let {title, fullText} = cnx.request.body;
    let updArticle = {title: 'myliu', fullText: 'savo katinuka'}; //supposedly whats to update
    let articleID = cnx.originalUrl
    const lastItem = articleID.substring(articleID.lastIndexOf('/') + 1)
    const numID = Number(lastItem);
    cnx.status = 201;
    console.log(numID); // i get the id
    articles[numID-1] = updArticle; //-1 because arrays are counted from 0
    //gets an article id, therefore gives it to an array and the text to update
    //need to create something to see updates itself.
    cnx.body = articles;
}*/

async function updateArticle(ctx)
{
    //edit an existing article
    const body = ctx.request.body;
    let articleID = ctx.originalUrl
    const lastItem = articleID.substring(articleID.lastIndexOf('/') + 1)
    const numID = Number(lastItem);
    console.log(numID); // i get the id
    let updArticle = {title: 'updated', allText: "top update"};
    console.log(updArticle.allText);
    let result = await model.edit(updArticle.title, updArticle.allText, numID);
    if (result)
    {
        ctx.status = 201;
        ctx.body = {TD: result.insertId}
    }
}

/*function deleteArticle(cnx, next)
{
    //delete an article
    // idea is to use a splice, as it is able to remove an element from an array and reindex it
    let articleID = cnx.originalUrl
    const lastItem = articleID.substring(articleID.lastIndexOf('/') + 1)
    const numID = Number(lastItem);
    console.log(numID); // i get the id
    delete articles[numID-1];
    cnx.status = 201;
    cnx.body = articles;
}*/

async function deleteArticle(ctx)
{
    //todo delete an article
    const body = ctx.request.body;
    let articleID = ctx.originalUrl
    const lastItem = articleID.substring(articleID.lastIndexOf('/') + 1)
    const numID = Number(lastItem);
    console.log(numID)
    let result = await model.del(numID);
    if (result)
    {
        ctx.status = 201;
        ctx.body = {TD: result.insertId}
    }
}

// define the exported object when required from other scripts
module.exports = router;
