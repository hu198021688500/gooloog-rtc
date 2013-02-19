/**
 * New node file
 */

var EventEmitter = process.EventEmitter, channelPrefix = '#', userPrefix = '@';//, first = require('first');

// hack until socket.disconnect is fixed
function disconnect(socket) {
	if (socket.namespace.name === '') {
		return socket.disconnect();
	}
	socket.packet({
		type : 'disconnect'
	});
	socket.manager.onLeave(socket, socket.namespace.name);
	socket.emit('disconnect', 'booted');
}

/**
 * 聊天
 * @param {String} namespace [socket.io].sockets
 */
function Chat(namespace) {
	/*var chat = this;
	this.settings = {};
	this.namespace = namespace;

	function onWhisper(target, message, ack) {
		this.get('uid', function(err, uid) {
			if (err || !uid) {
				return ack && ack('Internal error');
			}
			if (namespace.clients(userPrefix + target).length) {
				namespace.to(userPrefix + target).emit('whisper', nickname, message);
			} else {
				ack && ack('Unknown user');
			}
		});
	}

	function onSay(message) {
		var socket = this;
		first(function() {
			socket.get('nickname', this);
		}).whilst(function() {
			socket.get('channel', this);
		}).then(function(nick, chan) {
			if (nick[0] || chan[0] || !nick[1]) {
				return;
			}
			namespace.to(channelPrefix + chan[1]).emit('say', nick[1], message);
		});
	}

	function onChannelJoin(channel, ack) {
		var socket = this;

		if (!chat.settings['channel join permission'])
			return ack && ack('Not permitted');
		if (chat.settings.lobby === channel)
			return ack && ack('Can\'t join lobby, please leave room instead');

		first(function() {
					socket.get('nickname', this);
				}).whilst(function() {
					socket.get('channel', this);
				}).then(function(nick, chan) {
			var errnick = nick[0], nickname = nick[1], errchannel = chan[0], oldchannel = chan[1];

			if (errnick || errchannel || !nickname)
				return ack && ack('Internal error');

			function onJoinAllow(allow) {
				if (!allow)
					return ack && ack('Not permitted');

				if (null !== oldchannel) {
					socket.leave(channelPrefix + oldchannel);
					if (oldchannel !== chat.settings.lobby)
						socket.broadcast.to(channelPrefix + oldchannel).emit(
								'leave', nickname);
				}
				socket.join(channelPrefix + channel);
				socket.set('channel', channel, function(err) {
							if (ack)
								ack(err && 'Can\'t change channel');
							if (err) {
								socket.log.warn('error joining', channel,
										'with', err, 'for client', socket.id);
								onLeave.call(socket);
							} else
								socket.broadcast.to(channelPrefix + channel)
										.emit('join', nickname);
						});
			}

			if ('function' === typeof chat.settings['channel join permission']) {
				chat.settings['channel join permission'](nickname, channel,
						onJoinAllow);
			} else {
				onJoinAllow.call(undefined, true);
			}
		});

	}
	// 离线
	function onLeave(ack) {
		var socket = this;

		first(function() {
					socket.get('nickname', this);
				}).whilst(function() {
					socket.get('channel', this);
				}).then(function(nick, chan) {
			var errnick = nick[0], nickname = nick[1], errchannel = chan[0], channel = chan[1];

			if (errnick || errchannel || !nickname)
				return ack && ack('Internal error');

			if (chat.lobby !== channel) {
				socket.leave(channelPrefix + channel);
				socket.broadcast.to(channelPrefix + channel).emit('leave',
						nickname);
			}
			socket.join(channelPrefix + chat.settings.lobby);
			socket.set('channel', chat.settings.lobby, function(err) {
						if (ack)
							ack(err && 'Can\'t join lobby');
						if (err) {
							socket.log.warn('error joining lobby with', err,
									'for client', socket.id);
							// state of this connection is not healthy anymore
							disconnect(socket);
						}
					});
		});

	}*/
	this.client = 1;
	// 连接
	namespace.on('connection', function(socket) {
		var uid = this.client++;
		socket.join(userPrefix + uid);

		//socket.on('whisper', onWhisper);
		//socket.on('say', onSay);
		//socket.on('join', onChannelJoin);
		//socket.on('leave', onLeave);
		// 在socket session中存储uid
		socket.set('uid', uid, function(err) {
			if (err) {
				socket.send('Can\'t set uid');
				socket.log.warn('error setting uid', uid, 'with', err, 'for client', socket.id);
				disconnect(socket);
				return;
			} else {
				// join lobby
				/*onLeave.call(socket, function(err) {
					if (err) {
						return;
					}
					chat.emit('connection', uid);
				});*/
			}
		});

	});
}

Chat.createChat = function(sio, options) {
	return new Chat(sio, options);
};

Chat.prototype.__proto__ = EventEmitter.prototype;

/**
 * 剔除用户
 * @param {Number} uid
 * @return {Object}
 */
Chat.prototype.kick = function(uid) {
	this.user(uid).forEach(function(v) {
		disconnect(v);
	});
	return this;
};

/**
 * 发送系统消息
 * @param {String} message
 * @return {Object}
 */
Chat.prototype.sendSystem = function(message) {
	this.namespace.send(message);
	return this;
};

/**
 * 获取指定用户客户端
 * @param {Number} uid
 * @return {Object}
 */
Chat.prototype.user = function(uid) {
	return this.namespace.clients(userPrefix + uid);
};

/**
 * 给单个用户发送消息
 * @param {Number} uid
 * @param {String} message
 * @return {Object}
 */
Chat.prototype.sendUser = function(uid, message) {
	this.namespace.to(userPrefix + uid).send(message);
	return this;
};

/**
 * 获取指定的频道
 * @param {Nuber}
 * @return {Object}
 */
Chat.prototype.channel = function(channel) {
	return this.namespace.clients(channelPrefix + channel);
};

/**
 * 给频道内的所有人发送消息
 * @param {String} channelId
 * @param {String} message
 * @return {Object}
 */
Chat.prototype.sendChannel = function(channelId, message) {
	this.namespace.to(channelPrefix + channelId).send(message);
	return this;
};

Chat.prototype.set = function(key, value) {
	this.namespace.settings[key] = value;
	return this;
};

Chat.prototype.get = function(key) {
	return this.namespace.settings[key];
};

/**
 * 
 * @param {Object} data {GID:"xx@xx.xx"}
 */
Chat.prototype.P2P = function(data) {
	
};

module.exports = Chat;