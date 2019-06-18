const {loginCheck} = require("../controller/userController")
const {SuccessModel,ErrorModel} = require("../model/resModel")
const {set} = require("../db/redis")
const handleUserRouter = (req,res)=>{
    const method = req.method

    if(method ==="GET" && req.path ==="/api/user/login"){
        const {username,password} = req.query
        const result = loginCheck(username,password)
        return result.then(data=>{
            if(data.username){ 
                req.session.username = data.username
                req.session.realname = data.realname
                console.log("req.session",req.session)
                //同步到redis
                set(req.sessionId,req.session)
                return new SuccessModel("登录成功")
            }else{
                return new ErrorModel("登录失败")
            }
        })
    }

    // //登录测试
    // if(method ==="GET" && req.path ==="/api/user/login-test"){
    //     if(req.session.username){
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session:req.session
    //             })
    //         )
    //     }
    //     return Promise.resolve(
    //         new ErrorModel("尚未登录")
    //     )
    // }
    
}

module.exports = handleUserRouter