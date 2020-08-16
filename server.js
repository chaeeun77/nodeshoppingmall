const express = require('express'); //서버를 불러오는것, const : 상수화시킨다.
const app = express(); // ()는 모음을 표시한다.
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
//order.js의 내용을 require(불러와서)하고 이를 상수화시킨다. 왜? 내용이 기니까

//database 연결
const dbaddress = "mongodb+srv://admin:codms13@cluster0.loeyr.mongodb.net/shoppingmall?retryWrites=true&w=majority"; //""사이에 주소가 들어갈것이다.
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose
    .connect(dbaddress, dboptions) //어디에 접속
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err.message)); //err을 담겠다.


//middle wear 설정 (서버가 시작이되면 요청과 응답 중간에서 꼭 거치는건데 dev 버전으로 표현하겠다.
app.use(morgan('dev'));

//bodyparser에 대한 middle wear 설정
app.use(bodyParser.json()); //bodyParser를 쓰기 위해서 이렇게 써야한다고 약속이 되어 있다.
app.use(bodyParser.urlencoded({extended: false}));

// router
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
//use : 실행시키겠다. orders라는 것을 요청하면 orderRoutes를 실행시키겠다.

const PORT = 5000;

app.listen(PORT, console.log('server start')); //log : 발자국을 남기겠다. 이거는 항상 맨 밑에 적도록 한다.


