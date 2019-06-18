var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
    const {username,password} = req.body
  res.json({
      errNo:0,
      data:{
          username:username,
          pass:password
      }
  })
});

router.get  ('/session-test', function(req, res, next) {
    const session = req.session
    if(session.viewNum == null){
        session.viewNum = 0
    }
    session.viewNum ++
    res.json({
        viewNum:session.viewNum
    })
});

module.exports = router;