const express = require("express")
const listEndpoints = require("express-list-endpoints")
const productsRoutes = require("./products")
const problemsRoutes = require("./problemRoutes")
const {notFoundErrorHndlr,
    unauthorizedErrorHndlr,
    forbiddenErrorHndlr,
    badRequestErrorHndlr,
    catchAllErrorHndlr } = require("./errorHandling")
    

const server = express()

const port = process.env.PORT || 3001

const logMiddleWare = (req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date()}`)
    next()
}

// const errorMiddleWare = (err, req, res, next) => {}

server.use(express.json())
server.use(logMiddleWare)

server.use("/products", productsRoutes)
//server.use("/problems", problemsRoutes)

server.use(notFoundErrorHndlr)
server.use(unauthorizedErrorHndlr)
server.use(forbiddenErrorHndlr)
server.use(badRequestErrorHndlr)
server.use(catchAllErrorHndlr)



console.log(listEndpoints(server))

server.listen(port, () => console.log("Server running on port:", port))
