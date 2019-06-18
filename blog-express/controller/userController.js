const {Exec,escape}  = require("../db/mysql")
const {genPassword} = require("../util/crypto")
const loginCheck = (username,pwd)=>{
    username = escape(escape)  //预防sql注入攻击
    pwd = genPassword(pwd) //加密密码
    pwd = escape(pwd)//预防sql注入攻击
    let sql = `select username,realname from users where username=${username} and password=${pwd}`
    return Exec(sql).then(rows=>{
        console.log("rows--------------",rows)
        return rows[0] || {}
    })
}

module.exports = {
    loginCheck
}