

module.exports = function receipent(req,res,next){
    if(req.user.role != 'recipient') return res.status(403).send('This can only be done by a recipient');
    next();
}