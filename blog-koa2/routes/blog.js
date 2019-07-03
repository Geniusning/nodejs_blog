const router = require('koa-router')()


router.prefix("/api")

router.get('/', async (ctx, next) => {
    ctx.body = {
      title:"liuning"
    }
})
router.get('/list', async (ctx, next) => {
  const query = ctx.query
  ctx.body = {
    errNo:1,
    query
  }
})
router.post("/login",async (ctx,next)=>{
  const {username,password} = ctx.request.body
  console.log("username",username)
  console.log("password",password)
  ctx.body = {
    errno :0,
    username,
    password
  }
})

module.exports = router