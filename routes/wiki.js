/*
 * Wiki operation.
 */
var markdown = require('markdown-js');
var dao = require('../models/wiki');

function WikiResult(id, title, author, date) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.date = getFormatDate(date);
}


exports.list = function(req, res) {
  dao.getAllWikis(function(err, items){
    var results = new Array();
    for(i in items){
      var result = new WikiResult(items[i]._id, items[i].title, items[i].author, items[i].update_at);
      results[i] = result;
    }
    var user = req.session.user;
    res.render('wiki/list', {user:user, title:'博客' ,results:results});
  });
};


exports.create = function(req, res, next) {
  var user = req.session.user;
  res.render('wiki/create', {user:user, title:'写博客', nodetitle:'',content:'', id:'', author:''});
};


exports.result = function(req, res, next) {
  var title = req.params.title;
  title = title.replace(/\+/g," ");
  console.log("title="+title);
  var user = req.session.user;
  dao.getWikiContentByTitle(title, function(err, item) {
    if(item == null || item.content == null) {
      res.render('404', {user:user, status: 404,title: 'Utility Center',});
    }
    else {
      res.render('wiki/result', {
        user:user, 
        node: markdown.makeHtml(item.content).toString(),
        title: item.title,
        author:item.author,
        date:getFormatDate(item.update_at),
        id: item._id
      });
    }
  });
};

exports.save = function(req, res) {
  var _id = req.body.id == null || req.body.id == "" ? null : req.body.id;
  var currentUser;
  if(req.session.user!=null)
    currentUser = req.session.user.name;
  else
    currentUser = req.body.author;
  dao.saveWiki(_id, req.body.title, currentUser, req.body.content, function(err, update_at, item) {
    if(err == null) {
      res.render('wiki/result', {
        user:currentUser,
        node: markdown.makeHtml(req.body.content).toString(),
        author: currentUser,
        title: req.body.title,
        date:getFormatDate(update_at),
        id: _id == null ? item._id : _id
      });
    }
  });
};

exports.edit = function(req, res) {
  var id = req.params.id;
  var user = req.session.user;
  dao.getWikiContentById(id, function(err, item) {
    if(item == null || item.content == null) {
      res.render('404', {user:user, status: 404,title: 'Utility Center',});
    } else {
      res.render('wiki/create', {user:user, title:'写博客', id:id, nodetitle:item.title, author:item.author, content:item.content});
    }
  });
};

exports.del = function(req, res) {
  var _id = req.body._id;
  dao.delWikiById(_id, function(err, count){
    if(err==null){
      res.send('success');
    }
    else
      res.send(err+'');
  });
}

function getFormatDate(date){
  if(date == null)
    return '';
  return date.getFullYear() + '-' + pad(date.getMonth()+1) + '-' + pad(date.getDate())
                  + ' ' + pad(date.getHours()) + ':' +pad(date.getMinutes());
}

function pad(n) {
  return n < 10 ? '0'+n : n;
}