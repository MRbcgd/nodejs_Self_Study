module.exports=function(passport){
  var router=require('express').Router();
  router.get('/',function(req,res){
    var user=req.user;
    res.render('./mysql/index',{user});
  })
  return router;
}
