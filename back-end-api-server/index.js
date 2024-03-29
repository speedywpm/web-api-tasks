const Koa = require('koa');

const app = new Koa();

//const router = new Router();

//route handler
const special = require('./routes/special.js');
const articles = require('./routes/articles.js');
const users = require('./routes/users.js');
//const database = require('.config.js');

app.use(special.routes());
app.use(articles.routes());
app.use(users.routes());

//router.get('/api/v1', welcomeAPI);
//app.use(router.routes());


let port = process.env.PORT || 3001;
app.listen(port);