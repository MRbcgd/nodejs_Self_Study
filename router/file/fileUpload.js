module.exports=function(passport){
  var router=require('express').Router();
  var uploads=require('../../config/file/multer.js')();

  router.get('/fileUpload',function(req,res){
    var user=req.user;
    res.render('./file/fileUpload',{user});
  })
  router.post('/fileUpload',uploads.single('userfile'),function(req,res){
    console.log('uploaded : '+req.file.filename,req.file);
    res.redirect('/home');
  })
  return router;
}
