const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userData = require('./user.json');

const checkUser = (username) => {
    return userData.find(element => element.username == username) != undefined ;
}

const checkEmail = (email) => {
    return userData.find(element => element.email == email) != undefined ;
}

const createUser = (user) => {
    if(user){
        return 'not found data'
    }
    if(checkUser(user.username)){
        return 'username is already taken'
    }
    if(checkEmail(user.email)){
        return 'email is already taken'
    }
    if(user.password == user.repassword){
        return 'confirm password and password do not match'
    }

    userData.push({
        "username": user.username,
        "password":  bcrypt.hashSync(user.password, 10),
        "name" : user.name,
        "lastname" : user.lastname,
        "birthDate": user.birthDate,
        "email": user. email
    })
    fs.writeFileSync('./user.json', JSON.stringify(userData));
    
    return "success"
}

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
        let token = jwt.sign(payload, "PLANX-SECRET")
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