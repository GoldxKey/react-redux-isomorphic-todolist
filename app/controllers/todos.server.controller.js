'use strict';
var _ = require('lodash');
var todolist = [{id:1,text:'todo1',marked:false}, {id:2,text:'todo2',marked:false}];

exports.create = function (req, res, next) {

    var item = {
        id: todolist.length > 0 ? todolist[todolist.length - 1].id + 1 : 1,
        text: req.body.text,
        marked: !!req.body.marked
    };
    todolist.push(item);
    res.json({
        errCode: 0,
        errMsg: 'success',
        data: item
    });
};


exports.list = function (req, res, next) {
    res.json({
        errCode: 0,
        errMsg: 'success',
        data: todolist
    });
};


exports.read = function (req, res) {
    var existItems = _.filter(todolist, function (item) {
        return item.id == req.params.todosId;
    });
    res.json({
        errCode: 0,
        errMsg: 'success',
        data: existItems
    });
};


exports.update = function (req, res, next) {
    var todosId = req.params.todosId;
    var text = req.body.text;
    var marked = req.body.marked;
    todolist = _.map(todolist, function (item) {
        if (item.id == todosId) {
            return _.defaults({
                id: todosId,
                text: text,
                marked: marked
            }, item);
        } else {
            return item;
        }
    });
    res.json({
        errCode: 0,
        errMsg: 'success',
    });
};


exports.udpateAll = function (req, res, next) {
    var marked = req.body.marked;
    todolist = _.map(todolist, function (item) {
        return _.assign(item, {marked: marked})
    });
    res.json({
        errCode: 0,
        errMsg: 'success',
    });
}


exports.delete = function (req, res, next) {
    _.remove(todolist, function (item) {
        return item.id == req.params.todosId;
    });
    res.json({
        errCode: 0,
        errMsg: 'success',
    });
}

exports.initialList = todolist;