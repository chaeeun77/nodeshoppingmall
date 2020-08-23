//1번
const mongoose = require('mongoose'); //mongoose

//2번
const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1 //기본 설정 값이 1이다. 주문을 할때 처음 설정값이 1이다.
    }
});

//3번
module.exports = mongoose.model("order", orderSchema)
//=뒤에 있는 내용부터 쓰고 앞에 model.exports를 쓴다.
