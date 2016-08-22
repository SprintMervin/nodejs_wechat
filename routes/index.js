// var express = require('express');
// var router = express.Router();
// var weixin = require('weixin-api');
//
// /* GET home page. */
// // 接入验证
// router.get('/', function(req, res) {
//
//   // 签名成功
//   if (weixin.checkSignature(req)) {
//     res.status(200).send(req.query.echostr);
//   } else {
//     res.status(200).send('fail');
//   }
// });
//
// // config 根据自己的实际配置填写
// weixin.token = 'huitest';
//
// // 监听文本消息
// weixin.textMsg(function(msg) {
//   console.log("textMsg received");
//   console.log(JSON.stringify(msg));
//
//   var resMsg = {fromUserName : msg.toUserName,
//             toUserName : msg.fromUserName,
//              msgType : "text",
//              content : msg.content,
//              funcFlag : 0
//   };
//
//   // switch (msg.content) {
//   //   case "文本" :
//   //     // 返回文本消息
//   //     resMsg = {
//   //       fromUserName : msg.toUserName,
//   //       toUserName : msg.fromUserName,
//   //       msgType : "text",
//   //       content : "这是文本回复",
//   //       funcFlag : 0
//   //     };
//   //     break;
//   //
//   //   case "音乐" :
//   //     // 返回音乐消息
//   //     resMsg = {
//   //       fromUserName : msg.toUserName,
//   //       toUserName : msg.fromUserName,
//   //       msgType : "music",
//   //       title : "音乐标题",
//   //       description : "音乐描述",
//   //       musicUrl : "http://music.163.com/#/song?id=29979822",
//   //       HQMusicUrl : "高质量音乐url",
//   //       funcFlag : 0
//   //     };
//   //     break;
//   //
//   //   case "图文" :
//   //
//   //     var articles = [];
//   //     articles[0] = {
//   //       title : "PHP依赖管理工具Composer入门",
//   //       description : "PHP依赖管理工具Composer入门",
//   //       picUrl : "http://weizhifeng.net/images/tech/composer.png",
//   //       url : "http://weizhifeng.net/manage-php-dependency-with-composer.html"
//   //     };
//   //
//   //     articles[1] = {
//   //       title : "八月西湖",
//   //       description : "八月西湖",
//   //       picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
//   //       url : "http://weizhifeng.net/bayuexihu.html"
//   //     };
//   //
//   //     articles[2] = {
//   //       title : "「翻译」Redis协议",
//   //       description : "「翻译」Redis协议",
//   //       picUrl : "http://weizhifeng.net/images/tech/redis.png",
//   //       url : "http://weizhifeng.net/redis-protocol.html"
//   //     };
//   //
//   //     // 返回图文消息
//   //     resMsg = {
//   //       fromUserName : msg.toUserName,
//   //       toUserName : msg.fromUserName,
//   //       msgType : "news",
//   //       articles : articles,
//   //       funcFlag : 0
//   //     }
//   // }
//
//   weixin.sendMsg(resMsg);
// });
//
// // 监听图片消息
// weixin.imageMsg(function(msg) {
//   console.log("imageMsg received");
//   console.log(JSON.stringify(msg));
// });
//
// // 监听位置消息
// weixin.locationMsg(function(msg) {
//   console.log("locationMsg received");
//   console.log(JSON.stringify(msg));
// });
//
// // 监听链接消息
// weixin.urlMsg(function(msg) {
//   console.log("urlMsg received");
//   console.log(JSON.stringify(msg));
// });
//
// // 监听事件消息
// weixin.eventMsg(function(msg) {
//   console.log("eventMsg received");
//   console.log(JSON.stringify(msg));
// });
//
// // Start
// router.post('/', function(req, res) {
//
//   // loop
//   weixin.loop(req, res);
//
// });
// /* ending*/
//
// module.exports = router;


var express = require('express');
var webot = require('weixin-robot');
var API = require('wechat-api');
var config = require('../config');
var router = express.Router();

// 指定回复消息
webot.set('help','点击访问我的主页 ifuncc.com');

webot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return '欢迎关注 如需帮助请输入 help';
  }
});

//匹配正则
webot.set('test', {
  pattern: /^test/i,
  handler: function(info, next) {
    next(null, 'roger that!')
  }
});

// 接管消息请求
webot.watch(router, { token: 'huitest', path: '/weixin' });

//创建自定义菜单
var api = new API(config.appid, config.appsecret);
/*null
 { accessToken: 'bMawBdyY5idQLeX_-ODTWZVhOd51yIklU3oYPeeLTg_8BmqrmUAEEvszsKGDLconZxHOx6Nwd32W50X7ThzBWzgOCQanOeg4Vwv3xMhN7KU',
 expireTime: 1445244891114 }
 { errcode: 0, errmsg: 'ok' }*/
api.getAccessToken(function (err, token) {
  console.log(err);
  console.log(token);
});

var menu = JSON.stringify(require('../menu.json'));
api.createMenu(menu, function (err, result) {
  console.log(result);
});


router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express' });
});
module.exports=router;