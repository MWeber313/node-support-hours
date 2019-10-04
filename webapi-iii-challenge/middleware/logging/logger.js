function logger(req, res, next) {
    console.log(`A ${req.method} to ${req.path} at ${Date.now()}`)
    next();
};

module.exports = logger;