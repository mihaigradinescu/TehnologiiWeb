let log = (req, res, next) => {
    console.warn(req.headers)
    next()
}

module.exports.log = log