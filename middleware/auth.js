const jwt = require('jsonwebtoken');
const config = require('config');


module.exports =  function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) res.status(401).send('unauthorized');
    try {
        const decoded = jwt.verify(tokeb, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).send('Forbidden');
    }
}