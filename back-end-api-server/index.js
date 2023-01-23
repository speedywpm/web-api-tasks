//console.log("Hello API world!");

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

//route handler

const articles = require('./routes/articles.js');
app.use(articles.routes());

router.get('/api/v1', welcomeAPI);
app.use(router.routes());

// handler function

function welcomeAPI(ctx, next)
{
    ctx.body = {
        message: "Welcome to the top API!"
    }
}

app.listen(3000);