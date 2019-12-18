const passport = require("passport");
const config = require('../config.json')

const ExtractJwt = require("passport-jwt").ExtractJwt; //ใช้ในการ decode jwt ออกมา
const JwtStrategy = require("passport-jwt").Strategy; //ใช้ในการประกาศ Strategy

const userService = require('../database/user/userService')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
}

const jwtAuthUser = new JwtStrategy(jwtOptions, (payload, done) => {
    let user = userService.checkUser(payload.username)
    if (!user) done(null, false)
    else done(null, true)
});

passport.use('user-rule', jwtAuthUser);

const userAuth = passport.authenticate("user-rule", {
    session: false
});

module.exports = {
    userAuth
};