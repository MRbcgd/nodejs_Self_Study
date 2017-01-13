module.exports=function(){
  var express=require('express');//express 사용하기 위해
  var app=express();//express 사용하기 위해
  var bodyParser = require('body-parser');//req.body. 이용하기 위해
  var session = require('express-session');//session 사용하기 위해
  var MySQLStore = require('express-mysql-session')(session)//mysql과 session 연동
  var sessionStore = new MySQLStore({//mysql과 session 연동
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'qkrcjfgud12',
      database: 'nodejs'
  });
  app.use(session({//session 사용
      key: 'session_Test',
      secret: 'fasfjlksd8521515',
      store: sessionStore,
      resave: false,
      saveUninitialized: true
  }));
  app.use(bodyParser.urlencoded({ extended: false }));//req.body. 이용하기 위해
  app.set('views','./views');//jade 사용하기 위해
  app.set('view engine','jade');//jade 사용하기 위해

  return app;
}
