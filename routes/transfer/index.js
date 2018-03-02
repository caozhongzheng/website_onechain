'use strict'
var chain = global.chain;
var config = require('../../config');
const wrapper = require('co-mysql');
const pool = wrapper(global.pool);
const uuid = require('node-uuid');
exports.get = function*() {
	if (this.session.user.access.indexOf('transfer') == -1) {
		yield this.render('/asset/index', {
			rules: rules,
			json: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
			data: data,
			list : list,
			date: new Date().Format('yyyy-MM-dd hh:mm')
		});
		return;
	};
	yield this.render('transfer/index');
}

exports.post = function*() {
	var args = this.request.body;
	args.type = 0;
	args.userId = config.userName;
	args.fee = config.feeOther * 10000;
	args.amount = parseInt(args.amount) * 10000
	args.time = new Date().getTime();
	args.Extras = this.session.user.name;
	var time = args.time;
	args = JSON.stringify(args);
	console.log('czz充值args=',args)
	var result = yield chain.invoke('zxCoinTransfer', ['', args]);
	console.log('czz充值result=',result)
	if (result.code == 0) {
		this.response.body = 'czz充值成功！'
	} else {
		this.response.body = 'czz充值失败！'
	}

}