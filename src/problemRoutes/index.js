const express = require("express")

const router = express.Router()

router.get("/error", (req, res) => {
    throw new Error("There is an ERROR!")
})

router.get("/nonExistant", (req, res, next) => {
    const err = new Error("Not found Error")
    err.httpStatusCode = 404
    next(err)
})

router.get("/unauthorised", (req, res, next) => {
    const err = new Error("Unauthorised!")
    err.httpStatusCode = 401
    next(err)
})

module.exports = router