const notFoundErrorHndlr = (err, req, res, next) => {
    if(err.httpStatusCode=== 404) {
      res.status(404).send("Error! Not Found!")  
    } next(err)

    
}

const unauthorizedErrorHndlr = (err, req, res, next) => {
    if(err.httpStatusCode=== 401) {
    res.status(401).send("Error! Not Authorised!")
    } next(err)

    
}

const forbiddenErrorHndlr = (err, req, res, next) => {
    if(err.httpStatusCode=== 403) {
    res.status(403).send("Error! Forbidden!")
    }next(err)

    
}

const badRequestErrorHndlr = (err, req, res, next) => {

    if(err.httpStatusCode=== 400) {
    res.status(400).send("Error! badRequest!")
    } next(err)
    
}

const catchAllErrorHndlr = (err, req, res, next) => {
    if (!res.headersSent) {
      res.status(err.httpStatusCode || 500).send("Generic server Error! ")  
    }
}

module.exports = {
    notFoundErrorHndlr,
    unauthorizedErrorHndlr,
    forbiddenErrorHndlr,
    badRequestErrorHndlr,
    catchAllErrorHndlr

}