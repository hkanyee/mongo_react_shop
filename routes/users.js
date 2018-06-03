var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

/* GET users listing. */
var db = mongoose.connect('mongodb://localhost:27017/hkanye_db', function(err) {
  if (err) {
    console.log('连接失败');
  } else {
    console.log('连接成功');
  }
})
var TestSchema = new mongoose.Schema({

  "name": {
    type: String
  },
  "price": {
    type: String
  }
}, {
  collection: "shop"
});

var Test1_Model = mongoose.model("test1", TestSchema);

router.get('/', function(req, res, next) {
  Test1_Model.find({}, function(error, docs) {

    if (error) {

      console.log("error :" + error);

    } else {

      res.json(docs);
    }

  });
});



module.exports = router;
