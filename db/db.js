const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1/community"

main().catch(err => console.log(`Database failed to start due to the following error: ${err}`))

async function main(){
  await mongoose.connect(url, () => console.log(`DataBase Online`))
}


module.exports = mongoose