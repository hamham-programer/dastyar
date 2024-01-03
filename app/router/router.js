const { HomerRoutes } = require("./api")
const { UserAuthRoutes } = require("./user/auth")

const router = require("express").Router()
router.use("/user", UserAuthRoutes)
router.use("/", HomerRoutes)

module.exports ={
    AllRoutes: router
}