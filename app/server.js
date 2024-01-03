const express = require("express")
const {default:mongoose} = require("mongoose")
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors")
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

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
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended:true}))
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition:{
                openapi: "3.0.0",
                info:{
                    title: "App dastyar",
                    version:"0.0.1",
                    description: "نرم افزار دستیار ابزاری در خدمت صنعت هوشمند",
                    contact:{
                        name: "hamidreza shafiei",
                        url: "-",
                        email: "hr.shafiei1994@gmail.com"
                    }

                },
                server: [
                    {
                        url: "http:localhost:5000"
                    }
                ]
            },
            apis: ["./app/router/**/*.js"]
        }),
        {explorer: true}
        
        ))

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
        mongoose.connection.on("connected",()=>{
            console.log("اتصال با مونگو دی بی برقرار شد");
        })
        mongoose.connection.on("disconnected",()=>{
            console.log("اتصال با مونگو دی بی قطع شد");
        })
        process.on("SIGINT", async()=>{
            await mongoose.connection.close()
            process.exit(0)
        })

    }
    createRoutes(){
        this.#app.use(AllRoutes)

    }
    errorHandling(){
        this.#app.use((req,res,next) =>{
/*             return res.status(404).json({
                statusCode: 404,
                message: "آدرس موردنظر یافت نشد"
            }) */
            next(createError.NotFound("آدرس موردنظر یافت نشد"))
        })
        this.#app.use((error, req, res, next) =>{
            const statusCode = error.status || createError.InternalServerError().status
            const message = error.message || createError.InternalServerError().message
            return res.status(statusCode).json({
                statusCode,
                errors:{
                    message
                }

            })
        })

    }

}