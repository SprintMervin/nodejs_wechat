/**
 * Created by HUI on 16/8/22.
 */
var express = require('express');
var webot = require('weixin-robot');
var API = require('wechat-api');
var config = require('./config');
var app = express();

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
webot.watch(app, { token: 'huitest', path: '/' });

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

var menu = JSON.stringify(require('./menu.json'));
api.createMenu(menu, function (err, result) {
    console.log(result);
});

// 启动监听
var server = app.listen(3000,function() {
    console.log('Listening on port %d',server.address().port);
});