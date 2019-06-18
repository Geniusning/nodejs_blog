var express = require('express');
var router = express.Router();
const {getList,getDetail,newBlog,updateBlog,deleteBlog} = require("../controller/blobController")
const {SuccessModel,ErrorModel} = require("../model/resModel")

/* GET home page. */
router.get('/list', function(req, res, next) {
    let author = req.query.author || ""
    const keyword = req.query.keyword || ""

    // if(req.query.isadmin){
    //     const loginCheckResult = loginCheck(req)
    //     if(loginCheckResult){
    //         //未登录
    //         return loginCheckResult
    //     }
    //     author = req.session.username
    // }
    const result = getList(author, keyword)
    result.then(listData=>{
        res.json(
            new SuccessModel(listData)
        )
    })
});

module.exports = router;
