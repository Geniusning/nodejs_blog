const redis = require("redis")
const {
  REDIS_CONF
} = require("../conf/db")

const redisClient = redis.createClient(REDIS_CONF)

// function set(key, val) {
//   redisClient.set(key, JSON.stringify(val), redis.print)
// }

// function get(key) {
//   const promise = new Promise((resolve, reject) => {
//       redisClient.get(key, (err, val) => {
//         if (err) {
//           console.log("err:",err)
//           reject(err)
//           return
//         }
//         if (val == null) {
//           resolve(null)
//           return
//         }

//         try {
//           resolve(
//             JSON.parse(val)
//           )
//         } catch (error) {
//           resolve(val)
//         }
//       })
//     })
//     return promise
//   }

  module.exports =redisClient