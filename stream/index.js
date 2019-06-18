const fs = require("fs")
const path = require("path")
const http = require('http')

// const fileName1 = path.resolve(__dirname,"data.txt")
// const fileName2 = path.resolve(__dirname,"data-copy.txt")

// const readStream = fs.createReadStream(fileName1)
// const writeStream = fs.createWriteStream(fileName2)

// readStream.pipe(writeStream)

// readStream.on("end",()=>{
//     console.log("copy done")
// })

const server = http.createServer((req,res)=>{
    const fileName1 = path.resolve(__dirname,"data.txt")
    if(req.method==="GET"){
        const readStream = fs.createReadStream(fileName1)
        readStream.pipe(res)
    }
}).listen(3000)