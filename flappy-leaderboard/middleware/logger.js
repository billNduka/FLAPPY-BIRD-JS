function logger(req, res, next){
    const start = Date.now();

    res.on('finish', () => {
        console.log(`${new Date().toISOString()}   ${req.method}  ${req.originalUrl} ${res.statusCode}`);
    })

    next();
}

module.exports = logger;