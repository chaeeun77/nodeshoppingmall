//1번
const express = require('express');
const router = express.Router();
const userModel = require("../models/user")
const bcrypt = require('bcryptjs')

// 회원가입
router.post('/register', (req, res) => {
    // email 중복체크 => passwrod 암호화 => database 저장 (이걸 역으로 진행함)
    userModel
        .findOne({email: req.body.useremail})
        .then(user => {
            if(user) {
                return res.json({
                    message: "이미 아이디가 존재합니다."
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.json({
                            message: err.message
                        })
                    } else {
                        const newUser = new userModel({
                            username: req.body.name,
                            email: req.body.useremail,
                            password: hash
                        })

                        newUser
                            .save()
                            .then(user => {
                                res.json({
                                    message: "saved data",
                                    userInfo: user
                                })
                            })
                            .catch(err => {
                                res.json({
                                    message: err.message
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//로그인
router.post('/login', (req, res) => {})



//2번 -> server에 가서 만들기
module.exports = router;