module.exports=function(){
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
  return uploads;
}
