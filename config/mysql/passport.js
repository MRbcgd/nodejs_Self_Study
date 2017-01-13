module.exports=function(app){
  var conn=require('./db.js')();
  var passport = require('passport');//passport 사용하기 위해
  var LocalStrategy = require('passport-local').Strategy;//passport-local 사용하기 위해
  var FacebookStrategy = require('passport-facebook').Strategy;//facebook 타사인증
  app.use(passport.initialize());//passport 사용하기 위해
  app.use(passport.session());//passport 사용하기 위해


  passport.serializeUser(function(user, done) {//로그인 검증후, 세션 검증시 마다 authId를 통해 세션 호출
    done(null, user.authId);
  });
  passport.deserializeUser(function(id, done) {//세션이 호출마다 검증
    var sql='SELECT * FROM users WHERE authId=?';
    conn.query(sql,[id],function(err,results){
      if(err){//세션에 관한 오류발생시
        console.log(err);
        return done('There is no user');
      }
      else{
        return done(null,results[0]);
      }
    })
  });

  passport.use(new LocalStrategy(//로그인시
    function(username, password, done) {
      var uname=username;
      var pwd=password;
      var sql='SELECT * FROM users WHERE authId=?';
      conn.query(sql,['local:'+uname],function(err,results){
        if(err){
          console.log(err);
          return done('There is no user');
        }
        var user=results[0];
        if(uname===user.username && pwd===user.password){//아이디,패스워드 확인
          return done(null,user);//정보가 맞다면 전송
        }
        else{
          console.log('Wrong User, Try Again!');
          return done(null, false, { message: 'Incorrect username.' });//정보가 틀리면 auth/login으로 이동
        }
      })
      //done('<h1>Who are you?</h1><a href="/auth/login">login</a>');
    }
  ));
  passport.use(new FacebookStrategy({//facebook 타사인증
      clientID: '1887903354766711',
      clientSecret: '87bc244627e4ca18e100dfffe903f186',
      callbackURL: "/auth/facebook/callback"
     ,profileFields:['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      var authId='local:'+profile.id;
      var sql='SELECT * FROM users WHERE authId=?';
      conn.query(sql,[authId],function(err,results){
        if(err){
          console.log(err);
          return done('FACEBOOK LOGIN ERR');
        }
        else{
          if(results.length>0){
            var user=results[0];
            return done(null,user);
          }
          else{
            var newuser={
              authId:authId,
              displayName:profile.displayName,
            //  email:profile.email[0].value
            }
            var sql='INSERT INTO users SET ?';
            conn.query(sql,[newuser],function(err,results){
              if(err){
                console.log(err);
              }
              else{
                return done(null,results[0]);
              }
            })
          }
        }
      })
    }
  ));
  return passport;
}
