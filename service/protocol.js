/**
 * 协议
 */

exports.cmds = {
	1 : {
		module : 'user',
		method : 'login'
	},
	2 : {
		module : 'chat',
		method : 'P2P'
	}
};

exports.DS = {
	'login' : {
		service : 'user',
		method : 'login'
	}
};

exports.NS = {
	'add_friend' : {
		service : 'user',
		method : 'addFriend'
	},
	"chat_P2P" : {
		service : 'chat',
		method : 'P2P'
	}
};