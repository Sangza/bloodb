
module.exports= function donor(req,res,next){
    if(req.user.role != 'donor') return res.status(403).send('Only a donor can do this');
    next();
}