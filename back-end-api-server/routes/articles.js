// this file will define the API route handlers for articles
const Router = require('koa-router');

//we are going to parse request bodies so import koa-bodyparser
const bodyParser = require('koa-bodyparser');

// since we are handling articles use a URI that begins with an approprate path
const router = Router({prefix: '/api/v1/articles'});

//temp def some random articles in an array
//later change implement a database

let articles = [
    {title:'hello article', fullText:'some text here to fill the body'},
    {title:'another article', fullText:'again here is some text here to fill'},
    {title:'coventry university', fullText:'some news about coventry university'}
];

//routes are needed to connect path endpoints to handler functions
//when an article id needs to be matched we use a pattern to match
//a named route parameter. here the name of the parameter will be 'id'
//and we will define the pattern to match at least 1 numeral.

router.get('/', getAll)
router.post('/', bodyParser(), createArticle);
router.post('/', bodyParser(), updateArticle);

router.get('/:id([0-9]{1,})', getById);
router.get('/:id([0-9]{1,})', updateArticle);
router.get('/:id([0-9]{1,})', deleteArticle);

//define handler functions used above

function getAll(cnx, next)
{
    //use response body to send the articles as JSON
    cnx.body = articles;
}

function getById(cnx, next)
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
}

function createArticle(cnx, next)
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
}

function updateArticle(cnx, next)
{
    //edit an article
    //let {title, fullText} = cnx.request.body;
    //let updArticle = {title: 'updated', fullText: 'really updated'};

    //cnx.status = 201;
    //articles.push(updArticle);
}

function deleteArticle(cnx, next)
{
    //delete an article

}

// define the exported object when required from other scripts
module.exports = router;
