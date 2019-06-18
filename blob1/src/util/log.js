const fs = require('fs')
const path = require("path")

//写日志
function writeLog(writeStream,log){
    writeStream.write(log+"\n")
}
//访问日志
function createWriteStream(fileName){
    const fulfileName = path.resolve(__dirname,"../","../","log",fileName)
    const writeStream = fs.createWriteStream(fulfileName,{
        flags:"a"
    })
    return writeStream
}


//写访问日志
const accessWriteStream = createWriteStream("access.log")
function access(log){
    writeLog(accessWriteStream,log)
}

//写错误日志
const errorWriteStream = createWriteStream("error.log")
function errorLog(log){
    writeLog(errorWriteStream,log)
}

//写操作日志
const eventWriteStream = createWriteStream("event.log")
function eventLog(log){
    writeLog(eventWriteStream,log)
}

module.exports ={
    access,
    errorLog,
    eventLog
}