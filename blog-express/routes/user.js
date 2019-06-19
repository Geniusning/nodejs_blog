var express = require('express');
var router = express.Router();
const {login} = require("../controller/userController")
const loginCheck = require("../middleware/loginCheck")
const {SuccessModel,ErrorModel} = require("../model/resModel")
/* GET home page. */
router.get('/login',loginCheck, function(req, res, next) {
    const {username,password} = req.query
    const result = login(username,password)
    return result.then(data=>{
        //设置session
        if(data.username){
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel("login failed")
        )  
    })
});

//login test
// router.get('/login-test', function(req, res, next) {
//     req.session.username = req.query.username
//     req.session.password = req.query.password
//     res.json(
//         new SuccessModel("test login seccess")
//     )
    
// });

module.exports = router;