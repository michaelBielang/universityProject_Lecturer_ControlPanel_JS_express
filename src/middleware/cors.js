/* eslint-disable no-unused-vars */
module.exports = (req, res, next) => {
    // Website you wish to allow to connect
    res.set('Access-Control-Allow-Origin', '*');
    // res.set('Vary', 'Origin');
    // Request methods you wish to allow
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization, Cookies');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Content-Type', 'application/json');

    // Pass to next layer of middleware
    next();
};