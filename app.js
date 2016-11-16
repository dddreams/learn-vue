const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const rest = require('./rest');

const controller = require('./controller');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// redirect to /static/index.html:
// app.use(async (ctx, next) => {
//     ctx.response.redirect('/static/index.html');
// });

app.use(bodyParser());

app.use(rest.restify());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');