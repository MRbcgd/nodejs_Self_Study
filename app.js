var app=require('./config/mysql/express')();
var passport=require('./config/mysql/passport')(app);

var home=require('./router/mysql/home.js')(passport);
app.use('/home',home);
var auth=require('./router/mysql/auth.js')(passport);
app.use('/auth',auth);
var file=require('./router/file/fileUpload.js')(passport);
app.use('/file',file);
var filing=require('./router/file/textFiling.js')(passport);
app.use('/file',filing);
var count=require('./router/cookie/count.js')(passport);
app.use('/cookie',count);

app.listen(3003,function(){
  console.log('Connected 3003 port!');
});
