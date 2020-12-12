const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const { check, validationResult } = require("express-validator")

const router = express.Router()

const readFile = fileName => {
    const buf = fs.readFileSync(path.join(__dirname, fileName))
    const content = buf.toString()
    return JSON.parse(content)
}

router.get("/", (req, res, next) => {
    try {
        const products = readFile("products.json")
        if (req.query && req.query.product) {
            const filteredProducts = products.filter(
                product => product.hasOwnProperty("product") && product.product.toLowerCase() === req.query.product.toLowerCase())

            res.send(filteredProducts)
        } else {

        }
        res.send(products)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", (req, res, next) => {
    try {
    const products = readFile("products.json")
    const selectedProduct = products.filter(product => product.ID === req.params.id)
    if (selectedProduct.length > 0) {
        res.send(selectedProduct)
    } else {
        const err = new Error()
        err.httpStatusCode = 404
        next(err)
    }
    } catch (error) {
        next(error)
   } 
 })

router.post(
    "/",
    [
        check("name").exists().withMessage("Name is required"),
        check("description").exists().withMessage("Description is required"),
        check("brand").exists().withMessage("Brand is required"),
        check("price").isInt().withMessage("Price needs to be a number")
    ],
    (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const err = new Error()
            err.message = errors
            err.httpStatusCode = 400
            next(err)
        } else {
        const products = readFile("products.json")
        const newProduct = {
        ...req.body, 
        ID: uniqid(),
        modifiedAt: new Date(), 
            }
            products.push(newProduct)
            fs.writeFileSync(
                path.join(__dirname, "products.json"), JSON.stringify(products))
          res.status(201).send({ id: newProduct.ID})  
    }
} catch (error) {
        next(error)
    }
}
)

router.put("/:id", (req, res, next) => {
    const products = readFile("products.json")
    const newProducts = products.filter(product => product.ID !== req.params.id)

    const modifiedProduct = {
        ...req.body,
        ID: req.params.id,
        modifiedAt: new Date()
    }

    newProducts.push(modifiedProduct)
    fs.writeFileSync(path.join(__dirname, "products.json"), JSON.stringify(newProducts))
    res.send({ id: newProduct.ID})
 })

router.delete("/:id", (req, res, next) => {
    const products = readFile("products.json")
    const newProducts = products.filter(product => product.ID !== req.params.id)
    fs.writeFileSync(path.join(__dirname, "products.json"), JSON.stringify(newProducts))
    res.status(204).send({ id: newProduct.ID})
 })


module.exports = router