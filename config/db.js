const mongoose = require("mongoose");

//database 연결
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose
    .connect(process.env.MONGO_URI, dboptions) //어디에 접속
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err.message)); //err을 담겠다.