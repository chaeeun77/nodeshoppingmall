const express = require('express'); //서버를 불러오는것, const : 상수화시킨다.
const app = express(); // ()는 모음을 표시한다.

app.use((req, res) => {
    res.json({
        message: 'It works!'
    })
})//req : 사용자의 모든 요청을 추상화시킨것




const PORT = 5000;

app.listen(PORT, console.log('server start')); //log : 발자국을 남기겠다. 이거는 항상 맨 밑에 적도록 한다.


