const express = require('express');
const router = express.Router();
const orderModel = require('../models/orders')

//order(장바구니) data 불러오기
router.get('/total', (req, res) => {
    // res.json({
    //     message: 'order data 불러오기'
    // })
    orderModel
        .find()
        .populate('product', ['name', 'price']) //하위메뉴로 보이는것,
        .then(docs => {
            res.json({
                count: docs.length,
                orders: docs.map(doc => {
                    return{
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/orders/" + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//order data 생성하기
router.post('/', (req, res) => {
    // res.json({
    //     message: 'order data 생성하기'
    // })
    const newOrder = new orderModel({
        product: req.body.productId,
        quantity: req.body.qty
    })

    newOrder
        .save()
        .then(doc => {
            res.json({
                message: "saved order",
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: "http://localhost:5000/orders/" + doc._id
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

})

//order data 업데이트하기
router.put('/', (req, res) => {
    res.json({
        message: 'order data 업데이트하기'
    })
})

//order data delete하기
router.delete('/', (req, res) => {
    res.json({
        message: 'order data delete하기'
    })
})

//order datail get API
router.get('/:orderId', (req, res) => {
    const id = req.params.orderId
    orderModel
        .findById(id)
        .then(doc => {
            res.json({
                message: "get order data from " + id,
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/orders/total"
                    }
                }
            })
        })
        .catch(err => {
            console.log("error object ", err)
            res.json({
                message: err.message
            })
        })
})




module.exports = router;