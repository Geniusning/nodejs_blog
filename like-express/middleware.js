const http = require("http")
const slice = Array.prototype.slice

class likeExpress {
  constructor() {
    //存放中间件列表
    this.routes = {
      all: [],  //app.user(....)
      get: [],
      post: []
    }
  }
  register(path){
    const info = {}
    if(typeof path =="string"){
      info.path = path
      info.stack = slice.call(arguments,1)
    }else{
      info.path = "/"
      info.stack = slice.call(arguments,0)
    }
  }
  use(){
    const info = this.register(this,arguments)
    this.routes.all.push(info)
  }
  get(){
    const info = this.register.apply(this,arguments)
    this.routes.get.push(info)
  }
  post(){
    const info = this.register.apply(this,arguments)
    this.routes.post.push(info)
  }
  //核心  next 机制
  handle(req,res,stack){
    const next = ()=>{
      const middleware = stack.unshift()
      if(middleware){
        middleware(req,res,next)
      }
    }
    next()
  }


  match(url,method){
    let stack= []
    if(url=="/favicon.ico"){
      return stack
    }

    //获取routes
    let curRoutes= []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])

    curRoutes.forEach(routeInfo=>{
      if(url.indexOf(routeInfo.path)==0){
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }


  callback(){
    return (req,res)=>{
      res.json = (data)=>{
        res.setHeader("Content-type","application/json")
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url
      const method = req.method.toLowerCase()

      const resultList = this.match(url,method)
      this.handle(req,res,resultList)
    }
  }
  listen(...args){
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}