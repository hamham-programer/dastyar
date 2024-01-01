const { error } = require("console");
const express = require("express")
const {default:mongoose} = require("mongoose")
const path = require("path")
module.exports = class Application{
    #app = express();
    #PORT;
    #DB_URI;
    constructor(PORT, DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDb();
        this.createServer();
        this.createRoutes();
        this.errorHandling()

    }
    configApplication(){
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended:true}))
        this.#app.use(express.static(path.join(__dirname, "..", "public")))

    }
    createServer(){
        const http = require("http")
        const server = http.createServer(this.#app)
        server.listen(this.#PORT, () =>{
            console.log("server run on http://localhost:" + this.#PORT);
        })
    }
    connectToMongoDb(){
/*         mongoose.connect(this.#DB_URI, (error)=>{
            if(error) return console.log("connected to MongoDb");
            return console.log("faild to connect to MongoDb");
        }) */
        mongoose.connect(this.#DB_URI).then(()=>{
            console.log("connected to MongoDb");
        })

    }
    createRoutes(){

    }
    errorHandling(){
        this.#app.use((req,res,next) =>{
            return res.status(404).json({
                statusCode: 404,
                message: "آدرس موردنظر یافت نشد"
            })
        })
        this.#app.use((error, req, res, next) =>{
            const statusCode = error.status || 500
            const message = error.message || "internalServerError"
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })

    }

}