const {getList,getDetail,newBlog,updateBlog,deleteBlog} = require("../controller/blobController")
const {SuccessModel,ErrorModel} = require("../model/resModel")

//统一的登录验证函数
const loginCheck = (req)=>{
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel("尚未登录")
        )
    }
}

const handleBlobRouter = (req, res) => {
    const method = req.method
    const id = req.query.id
    //get blob list
    if (method == "GET" && req.path == "/api/blob/list") {
        let author = req.query.author || ""
        const keyword = req.query.keyword || ""

        if(req.query.isadmin){
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                //未登录
                return loginCheckResult
            }
            author = req.session.username
        }
        const result = getList(author, keyword)
        return result.then(listData=>{
             return new SuccessModel(listData)
        })
    }

    //get blob detail
    if (method == "GET" && req.path == "/api/blob/detail") {

        const result = getDetail(id)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }

    //create new blob
    if (method == "POST" && req.path == "/api/blob/new") {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data=>{
            return new SuccessModel(data)
        }).catch(err=>{
            return new ErrorModel(err)
        })
    }

    //update blob
    if (method == "POST" && req.path == "/api/blob/update") {
        const loginCheckResult = loginCheck(req)
       if(loginCheckResult){
           //未登录
           return loginCheckResult
       }
         const result = updateBlog(id,req.body)
         return result.then(val=>{
             if (val){
                 return new SuccessModel()
             }else{
                return new ErrorModel("更新失败")
             }
         })
    }

    //delete blob
    if (method == "GET" && req.path == "/api/blob/delete") {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }
        const author = req.session.username
        const result = deleteBlog(id,author)
        return result.then(val=>{
            if (val){
                return new SuccessModel()
            }else{
               return new ErrorModel("删除失败")
            }
        })
    }
}

module.exports = handleBlobRouter