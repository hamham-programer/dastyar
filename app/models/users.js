const { default: mongoose } = require("mongoose");

const UsertSchema = new mongoose.Schema({
    first_name : {type: String},
    last_name : {type: String},
    username : {type: String, lowercase: true},
    mobile : {type: String, required: true, unique: true},
    email : {type: String, lowercase: true},
    password: {type:String},
    otp : {type: Object, default:{
        code: "",
        expiresIn: 0
    }},
    Role : {type: String, default: "USER"},
    birthday: {type: String}

},{
    timestamps: true,
    toJSON:{
        virtual: true
    }
})
module.exports = {
    UserModel: mongoose.model("user", UsertSchema)
}