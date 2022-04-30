module.exports = {
    get_bearer: function(req) {
        const bearerHeader = req.headers.authorization
        if (bearerHeader) {
            return bearerHeader.split(' ')[1]
        }
    }
}