const { UserModel } = require("../models/users")
const JWT = require("jsonwebtoken")
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KET } = require("./constans")
const createError = require("http-errors")
function RandomNumberGenrator(){
    return Math.floor((Math.random()* 90000) + 10000)
} 
function SiginAccessToken (userId){
    return new Promise(async (resolve, reject) =>{
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
            userId: user._id
        };
        const secret = ""
        const options = {
            expiresIn: "1d"

        }
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) =>{
        if(err) reject(createError.InternalServerError("خطای سرور رخ داده است"))
        resolve(token)

    })    
    })
}
function SiginRefreshToken (userId){
    return new Promise(async (resolve, reject) =>{
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
            userId: user._id
        };
        const secret = ""
        const options = {
            expiresIn: "1d"
        }
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KET, options, (err, token) =>{
        if(err) reject(createError.InternalServerError("خطای سرور رخ داده است"))
        resolve(token)
    })    
    })
}

module.exports = {
    RandomNumberGenrator,
    SiginAccessToken
}