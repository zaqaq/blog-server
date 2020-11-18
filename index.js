const Koa = require('koa')
const Router  = require('@koa/router')

const app = new Koa()
const router = new Router()

const users = require('./server/models-operate/user')

var home = async(ctx) => {
    // await users.addUser({
    //     firstName: 'wind',
    //     lastName: 'b456'
    // });
    //const allUsers = await users.findUser();
    users.updateUser();
    //console.log(allUsers);
    
    
    ctx.type = 'html'
    ctx.body = `<a href='#'>Home page1</a>`
}

router.get('/',home)

app.use(router.routes());

app.listen(3001, () => {
    console.log('This server is running at http://localhost:' + 3001)
});
