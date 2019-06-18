const mysql = require("mysql")

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123",
    port:"3306",
    database:"blog"
})

conn.connect()

const sql = "select * from users"
const insert = `insert into users(username,password,realname) values("liuning1","1231","list1")`
// conn.query(insert)
conn.query(insert,(err,data)=>{
    if(err){
        console.error(err)
        return
    }
    console.log(data)
})

conn.end()