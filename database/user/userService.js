const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json')

const userData = require('./user.json');

//เช็คว่าผู้ใช้นี้ไหม
const checkUser = (username) => {
    return userData.find(element => element.username == username) != undefined ;
}

//เช็คว่ามีอีเมล์นี้ไหม
const checkEmail = (email) => {
    return userData.find(element => element.email == email) != undefined ;
}

//สร้างผู้ใช้ใหม่
const createUser = (user) => {
    //validate
    if(checkUser(user.username)){
        return 'username is already taken'
    }
    if(checkEmail(user.email)){
        return 'email is already taken'
    }
    if(user.password != user.repassword){
        return 'confirm password and password do not match'
    }

    userData.push({
        "username": user.username,
        "password":  bcrypt.hashSync(user.password, 10), //เข้ารหัสด้วย bcrypt
        "name" : user.name,
        "lastname" : user.lastname,
        "birthDate": user.birthDate,
        "email": user. email
    })
    fs.writeFileSync('./database/user/user.json', JSON.stringify(userData));
    return "success"
}

//เข้าสู่ระบบ รีเทริน token
const authenticate = ({
    username,
    password
}) => {
    let user = userData.find(element => element.username == username)

    if (user && bcrypt.compareSync(password, user.password)) { 
        const payload = {
            username: username,
            iat: new Date().getTime() //iatมาจากคำว่า issued at time (สร้างเมื่อ)
        };
        let token = jwt.sign(payload, config.secret) //สร้าง JWT
        return {
            username,
            token
        }
    }
    return false
}

module.exports = {
    authenticate,
    createUser,
    checkUser,
    checkEmail
};