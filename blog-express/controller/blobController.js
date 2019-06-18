const {Exec} = require("../db/mysql")
const xss = require("xss")
const getList = (author, keyword) => {
    let sql = `select * from blobs where 1=1 `
    if(author){
        sql += `and author="${author}" `
    }
    if(keyword){
        sql += `and title like "%${keyword}%" `
    }
    sql += `order by createtime desc`

    return Exec(sql)

}
const getDetail = (id) => {
    let sql = `select * from blobs where id="${id}"`
    return Exec(sql).then(rows=>{
        return rows[0]
    })
}
const newBlog = (blobData = {})=>{
    let title = xss(blobData.title)  //预防xss攻击
    let content = blobData.content
    let createtime =  Date.now()
    let author = blobData.author

    let sql = `insert into blobs(title,content,createtime,author) values("${title}","${content}","${createtime}","${author}")`

    return Exec(sql).then(insertData=>{
        // console.log(insertData)
        return {
            id:insertData.insertId
        }
    })
}
const updateBlog = (id,blobData = {})=>{
    const title = blobData.title
    const content = blobData.content

    let sql = `update blobs set title="${title}",content="${content}" where id=${id}`

    return Exec(sql).then(updateData=>{
        if(updateData.affectedRows>0){
            return true  
        }
        return false
    })
}

const deleteBlog = (id,author)=>{

    let sql = `delete from blobs where id="${id}" and author="${author}"`
    return Exec(sql).then(delData=>{
        console.log("delData=",delData)
        if(delData.affectedRows>0){
            return true
        }
        return false
    })

}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}