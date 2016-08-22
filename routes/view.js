/**
 * Created by HUI on 16/8/22.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
    res.render('test', { title: 'Express' });
});
module.exports = router;
