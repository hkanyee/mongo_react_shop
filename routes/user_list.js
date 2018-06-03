var express = require('express');
var cookieParser=require('cookie-parser');
var mongoose = require('mongoose');
var router = express.Router();
/* GET users listing. */

router.use(cookieParser());
var db = mongoose.connect('mongodb://localhost:27017/hkanye_db', function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
})
var TestSchema = new mongoose.Schema({

    	"username" : { type:String },
    	"password": { type:String }
	},{collection:"shop_user"});
  var Test2Schema = new mongoose.Schema({

      	"username" : { type:String },
      	"items": { type:String }
  	},{collection:"user_items"});

var TestModel = mongoose.model("test2", TestSchema );
var TestModel_1 = mongoose.model("test3", Test2Schema );

router.post('/login', function(req, res, next) {
  // res.send("hello world");
  TestModel.find({ "username": req.body.username }, function (error, docs) {

 	 if(error){

    	console.log("error :" + error);

 	 }else{
     if(docs==""){

        let newUser={
          username:req.body.username,
          password:req.body.password
        }
        TestModel.create(newUser,(err)=>{
          if (err) {
            return console.log(err);
          }
          res.cookie('username',req.body.username,{path:'/',maxAge:24*3600*1000});
          res.cookie('password',req.body.password,{path:'/',maxAge:24*3600*1000});
          res.send(`<a href="/">登录成功，点击返回首页</a>`)
        })
     }else{
       if(docs[0].password==req.body.password){
         res.cookie('username',req.body.username,{path:'/',maxAge:24*3600*1000});
         res.cookie('password',req.body.password,{path:'/',maxAge:24*3600*1000});
         res.send(`<a href="/">登录成功，点击返回首页</a>`)
       }else{
         res.send(`<a href="/">登录失败</a>`)
       }
       	console.log(docs[0].password); //docs: age为28的所有文档
     }
	}
	});
});

router.get('/cookie', function(req, res, next){
      res.json(req.cookies);
      // console.log(req.cookies);
})

//更改用户的购买的商品的响应
router.post('/items', function(req, res, next){
  console.log(res.req.body.items);
  let items={
    username:res.req.cookies.username,
    items:res.req.body.items
  }
  TestModel_1.find({'username':res.req.cookies.username}, function (error, docs) {
    if(error){

       console.log("error :" + error);

    }else{
      console.log(docs);
      if(docs==''){
        TestModel_1.create
        (items,
          (err)=>{
            res.send("ok");
          })
      }else{
        console.log("1");
        var condition ={username:res.req.cookies.username};
        var update={$set:{'items':res.req.body.items}};
        TestModel_1.update(condition,update, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.error("更新用户名成功")
        }
      })

    }
  }
})
})

router.post('/get_items', function(req, res, next){
  TestModel_1.find({ "username": res.req.body.name }, function (error, docs) {
    console.log(docs);
    res.json(docs);
})
})

router.post('/logout',function(req, res, next){
  console.log("okkkk");
  res.cookie('username', '', { expires: 0, path: '/' });
  res.cookie('password', '', { expires: 0, path: '/' });
  res.send("退出登录成功");
  // res.clearCookie('username', { path: '/' });
  // res.clearCookie('password', { path: '/' });
})


module.exports = router;
