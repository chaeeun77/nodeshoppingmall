//1번
const mongoose = require('mongoose');

//2번
const productShcema = mongoose.Schema({
    name: String,
    price: Number
}); //스키마 : 엑셀에서 칸 같은거

//3번
module.exports = mongoose.model("product", productShcema)
//model화 해서 export해서 mongoose의 model을 새로 만들고 이름이 product! 여기에 productSchema의 내용을 넣음
//DB 설계시 1번-3번 순서로 만든다.

