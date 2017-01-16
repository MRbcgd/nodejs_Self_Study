module.exports=function(passport){
  var router=require('express').Router();
  var fs=require('../../config/file/fs.js')();//File 관련 라이브러리

  router.get(['/textFiling','/textFiling/:title'],function(req,res){//url로 직접 들어왔을경우
    var user=req.user;
    var title=req.params.title;
    fs.readdir('./data', function(err,files){//fs.readdir(데이터폴도명,콜백(에러,파일배열화))
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      if(title){
        var file={};
        for (var i = 0; i < files.length; i++) {
          if(files[i]==title){
            file.title=files[i];
          }
        }
        fs.readFile('data/'+title,'utf8',function(err,data){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          res.render('file/textFiling',{user,files:files,file:file,description:data});
        });
      }
      else{
        res.render('./file/textFiling',{user,files:files});//파일명 전달
      }
    });
  });
  router.post('/textFiling',function(req,res){
    var title=req.body.title;
    var description=req.body.description;
    fs.writeFile('data/'+title,description,function(err){//writeFile(파일경로,내용,콜백)
      if(err){
        console.log(err);//해킹을 방지하기 위해 err는 콘솔로 개인이 볼수있게 한다.
        res.status(500).send('Internal Server Error');//status(500)은 컴퓨터간의 소통
      }
      res.redirect('textFiling/'+title);//저장후에 바로 확이하기 위해
    })
  });
  router.get('/add',function(req,res){
    var user=req.user;
    res.render('./file/add',{user});
  })
  router.get(['/textFiling/:title/edit'],function(req,res){//url로 직접 들어왔을경우
    var user=req.user;
    var title=req.params.title;
    fs.readdir('./data', function(err,files){//fs.readdir(데이터폴도명,콜백(에러,파일배열화))
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      if(title){
        var file={};
        for (var i = 0; i < files.length; i++) {
          if(files[i]==title){
            file.title=files[i];
          }
        }
        fs.readFile('data/'+title,'utf8',function(err,data){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          res.render('file/edit',{user,file:file,description:data});
        });
      }
    });
  });
  router.get(['/textFiling/:title/delete'],function(req,res){//url로 직접 들어왔을경우
    var user=req.user;
    var title=req.params.title;
    fs.readdir('./data', function(err,files){//fs.readdir(데이터폴도명,콜백(에러,파일배열화))
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      if(title){
        var file={};
        for (var i = 0; i < files.length; i++) {
          if(files[i]==title){
            file.title=files[i];
          }
        }
        fs.unlink('data/'+file.title, (err) => {
          if (err) throw err;
          console.log('successfully deleted '+file.title);
        });
        res.redirect('/file/textFiling');
      }
    });
  });
  return router;
}
