const mongoose = require('mongoose')
const mongoURL="mongodb://127.0.0.1:27017/inotebook"

const connectToMongo =async () =>{
    await mongoose.connect(mongoURL)
    .then(()=>{
        console.log("mongo connected");
    })
    .catch((e)=>{
        console.log("failed to connect Mongo",e.message);
    })
}

module.exports = connectToMongo;