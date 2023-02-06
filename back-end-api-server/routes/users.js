// this file will define the API route handlers for articles
const Router = require('koa-router');

//we are going to parse request bodies so import koa-bodyparser
const bodyParser = require('koa-bodyparser');

const model = require('../models/users');
// since we are handling articles use a URI that begins with an approprate path
const router = Router({prefix: '/api/v1/users'});

router.get('/', getAll)
router.get('/:id([0-9]{1,})', getById);

async function getAll(ctx)
{
    let users = await model.getAll();
    if (users.length)
    {
        ctx.body = users;
    }
}

async function getById(ctx)
{
    let id = ctx.params.id;
    let user = await model.getById(id);
    if (user.length)
    {
        ctx.body = user[0];
    }
}

module.exports = router;