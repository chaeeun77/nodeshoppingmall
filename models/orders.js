//1번
const mongoose = require('mongoose'); //mongoose

//2번
const orderSchema = mongoose.Schema({

});

//3번
module.exports = mongoose.model("order", orderSchema)
//=뒤에 있는 내용부터 쓰고 앞에 model.exports를 쓴다.
