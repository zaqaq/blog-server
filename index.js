const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./server/router/webApi')

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => {
    console.log('This server is running at http://localhost:' + 3001)
});
