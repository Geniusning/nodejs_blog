/*
 * @Author: undefined 
 * @Date: 2019-06-20 10:55:32 
 * @Last Modified by:   undefined 
 * @Last Modified time: 2019-06-20 10:55:32 
 */

// asd
const fs = require("fs")
const path = require("path")


// function getFileData(filename,callback){
//     const fulfilename = path.resolve(__dirname,"file",filename)
//     fs.readFile(fulfilename,(err,data)=>{
//         if (err){
//             console.error(err)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// getFileData("a.json",(aData)=>{
//     console.log(aData)
//     getFileData(aData.next,(bData)=>{
//         console.log(bData)
//     })
// })

function getFileData(filename) {
    let promist = new Promise((resolve,reject)=>{
        const fulfilename = path.resolve(__dirname,"file",filename)
        fs.readFile(fulfilename,(err,data)=>{
            if (err){
                reject(err)
                return
            }
            resolve(JSON.parse(data.toString()))
            
        })
    })
    return promist
}

// getFileData("a.json").then(aData=>{
//     console.log(aData)
//     return getFileData(aData.next)
// }).then(bData=>{
//     console.log(bData)
//     return getFileData(bData.next)
// }).then(cData=>{
//     console.log(cData)
// })

async function readData(){
    const aData = await getFileData("a.json")
    return aData
}
async function test(){
    const aData = await readData()
    const bData = await getFileData(aData.next)
    console.log(bData)
}
test()