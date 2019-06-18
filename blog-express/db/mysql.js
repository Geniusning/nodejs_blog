const mysql = require("mysql")
const {MYSQL_CONF} = require("../conf/db")

//创建链接数据库
const conn = mysql.createConnection(MYSQL_CONF)

//开始连接
conn.connect()

//统一sql执行语句
function Exec(sql){
    const promise = new Promise((resolve,reject)=>{
        conn.query(sql,(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(data)
        })
    })
    return promise
}

module.exports = {
    Exec,
    escape:mysql.escape
}