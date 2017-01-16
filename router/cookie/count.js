module.exports=function(passport){
  var router=require('express').Router();
  var cookieParser=require('../../config/cookie/cookie.js')();//cookie 사용을 위해
  router.use(cookieParser('ksdamfskmfsdkfmsdkl588883'));//cookie 사용을 위해 안에문자를 넣어주면 https방식
  //rmsid cookieParser() 하면 그냥 http

  //req.cookies.count와 req.signedCookies.count 는 http와 https 방식 차이
  router.get('/count',function(req,res){
    var user=req.user;
    if(req.signedCookies.count){//cookie가 있다면
      var count=parseInt(req.signedCookies.count);//정수화
    } else{
      var count=0;//없으면 초기화
    }
    count=count+1;
    res.cookie('count',count,{signed:true});//cookie에 저장, 뒤에 signed:true를 해주면 https 방식
    res.render('cookie/count',{count:req.signedCookies.count,user});
  })
  router.get('/count/reset',function(req,res){
    var user=req.user;
    var count=1;//없으면 초기화
    // if(req.signedCookies.count==0){
    //   res.redirect('/cookie/count');
    // }
    res.cookie('count',count,{signed:true});//cookie에 저장, 뒤에 signed:true를 해주면 https 방식
    res.redirect('/cookie/count');
  })

  return router;
}
