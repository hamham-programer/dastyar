const { getOtpSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controllers");
const createError = require("http-errors")

module.exports =new class HomeController extends Controller{
    async indexPage(req,res,next){
        try {
            return res.status(200).send("index page dastyar")

            
        } catch (error) {
            next(createError.BadRequest(error.message))
            
        }
    }
    
}