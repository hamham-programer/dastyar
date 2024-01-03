const { UserModel } = require("../../../../models/users");
const { EXPIRES_IN } = require("../../../../utils/constans");
const { RandomNumberGenrator, SiginAccessToken } = require("../../../../utils/functions");
const { getOtpSchema, checkOtpSchema } = require("../../../validators/user/auth.schema");
const Controller = require("../../controllers");
const createError = require("http-errors")
const {StatusCodes:HttpStatus} = require("http-status-codes")
class userAuthController extends Controller{
    async getOtp(req, res, next){
        try {
            await getOtpSchema.validateAsync(req.body)
            const {mobile} =req.body
            const code = RandomNumberGenrator()
            const result = await this.saveUser(mobile, code)
            if (!result) throw createError.Unauthorized("همکار گرامی ورود شما متاسفانه با خطا روبرو شد")
            return res.status(HttpStatus.OK).send({
                statusCode: HttpStatus.OK, 
                data:{
                    message:"همکار گرامی کد اعتبار سنجی با موفقیت ارسال شد",
                    mobile,
                    code
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req, res, next){
        try {
            await checkOtpSchema.validateAsync(req.body)            
            const {mobile, code} = req.body
            const user = await UserModel.findOne({mobile})
            if(!user) throw createError.NotFound("کاربری با این مشخصات یافت نشد")
            if(user.otp.code != code) throw createError.Unauthorized("کد ارسال شده صحیح نمی باشد")
            const now = Date.now()
            if(+user.otp.expiresIn < now) throw createError.Unauthorized("کد شما منقضی شده است")
            const accesstoken =await SiginAccessToken(user._id)
            return res.json({
                accesstoken,
                user
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async refreshToken(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async saveUser(mobile, code){
        let otp = {
            code,
            expiresIn: EXPIRES_IN
        }
        const result = await this.checkExistsUser(mobile)
        if(result){
            return (await this.updateUser(mobile, {otp}))
        }
        return await UserModel.create({
            mobile,
            otp,
            Role: "USER"
        })
    }
    async checkExistsUser(mobile){
        const user = await UserModel.findOne({mobile})
        return !!user
    }
    async updateUser(mobile, ObjectData={}){
        Object.keys(ObjectData).forEach(key =>{
            if(["", " ", NaN, undefined, 0, null].includes(ObjectData[key])) delete ObjectData[key]
        })
        const updateResult = await UserModel.updateOne({mobile}, {$set: ObjectData})
        return !!updateResult.modifiedCount
    }
}
module.exports ={
    userAuthController: new userAuthController()
}