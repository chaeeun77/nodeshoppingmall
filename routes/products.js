const express = require('express');
const router = express.Router();
const productModel = require("../models/product");

//product data 불러오기
router.get('/total', (req, res) => {

    productModel
        .find() //배열로 결과를 불러온다.
        .then(docs => {
            res.json({
                count: docs.length,
                products: docs
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })



    // res.json({
    //     message: 'product data 불러오기'
    // })
})


// product data 생성하기
router.post('/register', (req, res) => {

    const newProduct = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: "saved data",
                productInfo: doc
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // const product = {
    //     name: req.body.productname,
    //     price: req.body.productprice
    // }
    // res.json({
    //     message: 'product data 생성하기',
    //     createdProduct: product //우리가 입력한 값을 뿌려주겠다.
    // })
})

//detail product get API
router.get('/:productId', (req, res) => {
    const id = req.params.productId
    productModel
        .findById(id)
        .then(doc => {
            res.json({
                message: "get product data from " + id,
                productInfo: doc
            })
        })

        .catch(err => {
            console.log("error object ", err)
            res.json({
                message: err.message
            })
        })
})



// product data 업데이트하기
router.put('/:productId', (req, res) => {
    const id = req.params.productId
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;

    }
    productModel
        .findByIdAndUpdate(id, {$set: updateOps})
        .then(result => {
            console.log("result is ", result)
            res.json({
                message: "updated product at " + id
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

    // res.json({
    //     message: 'product data 업데이트하기'
    // })
})



// product data delete 하기
router.delete('/:productId', (req, res) => {
    const id = req.params.productId

    productModel
        .findByIdAndDelete(id)
        .then(result => {
            res.json({
                message: "deleted product at " + id
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

    // res.json({
    //     message: 'product data delete 하기'
    // })
})

module.exports = router; //상수화 시킨 router를 모듈화해서 다른 곳에서도 표현시키도록 export시키겠다.