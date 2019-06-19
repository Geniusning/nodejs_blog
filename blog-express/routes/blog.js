var express = require('express');
var router = express.Router();
const loginCheck = require("../middleware/loginCheck")
const {getList,getDetail,newBlog,updateBlog,deleteBlog} = require("../controller/blobController")
const {SuccessModel,ErrorModel} = require("../model/resModel")
const {login} = require("../controller/userController")

router.get('/list', function(req, res, next) {
    let author = req.query.author || ""
    const keyword = req.query.keyword || ""

    if(req.query.isadmin){
        const loginCheckResult = login(req)
        if(loginCheckResult){
            //未登录
            res.json(
                new ErrorModel("no login")
            )
        }
        author = req.session.username
    }
    const result = getList(author, keyword)
    result.then(listData=>{
        res.json(
            new SuccessModel(listData)
        )
    })
});
router.get("/detail",(req,res,next)=>{
    const result = getDetail(req.query.id)
    return result.then(data=>{
        res.json(
            new SuccessModel(data)
        ) 
    })
})
router.post("/new",loginCheck,(req,res,next)=>{
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data=>{
        res.json(
            new SuccessModel(data)
        ) 
    })
})
router.post("/update",loginCheck,(req,res,next)=>{
    const result = updateBlog(req.query.id,req.body)
         return result.then(val=>{
            if (val){
               res.json(
                new SuccessModel()
               )
            }else{
                 res.json(
                    new ErrorModel("更新失败")
                 )
            }
        })
})
router.post("/delete",loginCheck,(req,res,next)=>{
    const author = req.session.username
        const result = deleteBlog(id,author)
        return result.then(val=>{
            if (val){
                res.json(
                    new SuccessModel()
                ) 
            }else{
                res.json(
                    new ErrorModel("删除失败")
                )
            }
        })
})
module.exports = router;
