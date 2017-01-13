module.exports=function(passport){
  var router=require('express').Router();
  var fs=require('fs');//File 관련 라이브러리
  var multer  = require('multer');//파일전송 라이브러리
  var uploads = multer({ dest: '../../file/uploads/'});//파일이 저장될 목적지 destination
  var storage = multer.diskStorage({//파일의 실제이름을 저장하기위해서
    destination: function (req, file, cb) {
      cb(null, 'file/uploads/')//저장경로
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)//파일의 실제이름
    }
  })
  var uploads = multer({ storage: storage })//실제 컴퓨터에 저장된다.

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
