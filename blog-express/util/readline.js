const fs = require("fs")
const path = require("path")
const readline = require("readline")

const fulfileName = path.resolve(__dirname,"../","../","log","access.log")

//create read stream
const readStream = fs.createReadStream(fulfileName)

//create readline object
const rl = readline.createInterface({
  input:readStream
})

let chromeNum = 0
let sum = 0

//read line
rl.on("line",(data)=>{
  if(!data){
    return 
  }
  sum++

  const arr = data.split("--")
  if(arr[2] && arr[2].indexOf('Chrome')>0){
    chromeNum ++
  }
})

//listen rl close
rl.on("close",()=>{
  console.log("chrome 占比",chromeNum/sum)
})