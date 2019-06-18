const querystring = require("querystring")
const handleBlobRouter = require("./src/router/blob")
const handleUserRouter = require("./src/router/users")
const {get,set} = require("./src/db/redis")
const {access} = require("./src/util/log")

const SESSION_DATA = {}
//获取cookie过去时间
const getCookieExpire =()=>{
    const d = new Date()
    d.setTime(d.getTime()+(24*60*60*1000))
    console.log("d.toGMTString()-----",d.toGMTString())
    return d.toGMTString()
}
// promise post data
const getPostData = (req)=>{
    
    const promise = new Promise((resolve,reject)=>{
        if(req.method != "POST"){
            resolve({})
            return
        }
        if(req.headers["content-type"] != "application/json"){
            resolve({})
            return
        }
        let postData = ""
        req.on("data",chunk=>{
            postData += chunk.toString()
        })
        req.on("end",()=>{
            if(!postData){ 
                resolve({})
                return
            } 
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise 
}

const serverHandle = (req, res) => {
    //写访问日志
    access(`${req.method}--${req.url}--${req.headers["user-agent"]}--${Date.now()}`)
    //设置返回格式
    res.setHeader("Content-type", "application/json")
    const url = req.url
    req.path = url.split("?")[0]  

    //解析query
    req.query = querystring.parse(url.split("?")[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ""
    let cookieArr = cookieStr.split(";")
    cookieArr.forEach(item=>{
        if(!item){
            return
        }
        const key = item.split("=")[0]
        const value = item.split("=")[1]
        req.cookie[key] = value
    })

    //解析session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if(!userId){
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // set(userId,{})
    }
    // 获取sessionid
    req.sessionId = userId
    console.log("req.sessionId",req.sessionId)
    get(req.sessionId).then(sessionData=>{
        console.log("sessionData", sessionData)
        if(sessionData==null){
            //初始化redis中的session值
            // set(req.sessionId,{})
            req.session = {}
        }else{
            req.session = {}
        }
    })
    // 处理post data 
    getPostData(req).then(postData=>{
        req.body = postData
        const blobResult = handleBlobRouter(req, res)
        if(blobResult){
            blobResult.then(blogData=>{
               //设置cookie
               if(needSetCookie){
                res.setHeader("Set-Cookie",`userid=${userId};path="/";httpOnly;expires=${getCookieExpire()}`)
            }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
    
        const userResult = handleUserRouter(req,res)
        if (userResult) {
            userResult.then(userData=>{
                //设置cookie
                if(needSetCookie){
                    res.setHeader("Set-Cookie",`userid=${userId};path="/";httpOnly;expires=${getCookieExpire()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        //未命中路由，返回404
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write("404 not found")
        res.end()
    })

}

module.exports = serverHandle

//env:process.env.NODE_ENV