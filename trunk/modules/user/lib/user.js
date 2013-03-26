/**
 * 用户底层模块
 */

var util = require("util");
var crypto = require("crypto");
var redisClient = global.funs().getRedisClient();

var User = function() {
	this.keys = {
		incr : "user:s:incr",
		uid : "user:h:%s",
		email : "user:email"
	};
	
	/**
	 * 生成用户唯一ID
	 * @param {Function} callback
	 */
	this.getUID = function(callback) {
		redisClient.incr(this.keys.incr, callback);
	};
	
	/**
	 * 添加用户
	 * @param {Object} data
	 * @param {Function} callback
	 */
	this.add = function(data, callback) {
		var _this = this;
		var info = {
			"email" : "",
			"password" : "",
			"nick" : "",
			"sex" : 0,
			"birthday" : "",
			"avatar" : "",
			"signature" : ""
		};
		for (var key in info) {
			if (data[key]) {
				info[key] = data[key];
			}
		}
		redisClient.hget(_this.keys.email, info.email, function(err, result) {
			if (!err && result) {
				return callback(new Error("email is used."));
			}
			_this.getUID(function(err, uid){
				if (err) {
					return callback(err);
				}
				info.password = crypto.createHash("md5").update(info.password).digest("hex");
				redisClient.hmset(util.format(_this.keys.uid, uid), info, function(err1, result1) {
					if (!err1) {
						redisClient.hset(_this.keys.email, info.email, uid);
					}
					callback(err1, result1);
				});
			});
		});
	};

	/**
	 * 根据Email获取加密后的密码
	 * @param {String} email
	 * @param {Function} callback
	 */
	this.getPwdByEmail = function(email, callback){
		var _this = this;
		redisClient.hget(_this.keys.email, email, function(err, uid) {
			if (err) {
				return callback(err);
			}
			var hKey = util.format(_this.keys.uid, uid);
			redisClient.hget(hKey, "password", callback);
		});
	};
	
	/**
	 * 登录
	 * @param {String} email
	 * @param {String} password
	 * @param {Function} callback
	 */
	this.login = function(email, password, callback) {
		this.getPwdByEmail(email, function(err, pwd) {
			if (err) {
				return callback(err);
			}
			password = crypto.createHash("md5").update(password).digest("hex");
			callback(null, pwd == password);
		});
	};
	
	/**
	 * 详细信息
	 * @param {Number} uid
	 * @param {Function} callback
	 */
	this.getDetail = function(uid, callback) {
		var hKey = util.format(this.keys.uid, uid);
		redisClient.hgetall(hKey, callback);
	};
	
	/**
	 * 更新信息
	 * @param {Number} uid
	 * @param {Object} data
	 * @param {Function} callback
	 */
	this.update = function(uid, data, callback) {
		var userFields = ["email", "password", "nick", "sex", "birthday",
				"avatar", "signature"];
		for (var key in data) {
			if (!this.inArray(key, userFields)) {
				delete data[key];
			}
		}
		if (data.length == 0) {
			return callback(new Error("data is empty."));
		}
		var hKey = util.format(this.keys.uid, uid);
		redisClient.hmset(hKey, data, callback);
	};
	
	/**
	 * 
	 * @param {String} value
	 * @param {Object} array
	 */
	this.inArray = function(value, array) {
		for (var key in array) {
			if (array[key] == value) {
				return true;
			}
		}
		return false;
	};
};

var pro = User.prototype;

/**
 * 详细信息
 * @param {Array} uids
 * @param {Function} callback
 */
pro.getBatchDetail = function(uids, callback) {
	/*
	var source = "\
	local function getSex(user)\
		for n = 1, #user do\
			if user[n] == 'sex' then\
				return user[n + 1]\
			end\
		end\
		return 0\
	end\
	local users = {}\
	local myUID = KEYS[1]\
	local geohashkey = KEYS[2]\
	local selectSex = KEYS[3]\
	local uids = redis.pcall('smembers', geohashkey)\
    for k, v in pairs(uids) do\
		local user = redis.pcall('hgetall', 'auth:users:' .. tostring(v))\
		local sex = getSex(user)\
		if selectSex == 3 or (selectSex == 1 and sex == 1) or (selectSex == 2 and sex == 2) then\
			local isBlack = redis.pcall('zscore', 'auth:users_blacklist:' .. tostring(myUID), tostring(v))\
			if isBlack then\
				table.remove(uids, k)\
			else\
				local latAndLng = redis.pcall('hmget', 'lbs:geohash:' .. tostring(v), 'la', 'lo')\
			end\
		else\
			table.remove(uids, k)\
		end\
	end\
	local user = redis.pcall('hgetall', 'auth:users:10270')\
	return getSex(user)\
";
//table.getn(uids)
var sha = crypto.createHash('sha1').update(source).digest('hex');

redisClient.eval(source, 2, 10222, key, 1, function(err, rst) {
	console.log(err);
	console.log(rst);
});*/
/*
redisClient.evalsha(sha, 2, 10222, key, function(err,rst){
	console.log(err);
	console.log(rst);
});*/


	var hKey = util.format(this.keys.uid, uid);
	redisClient.hgetall(key, callback);
};

/**
 * 导出
 * @type 
 */
module.exports = User;

/*
exports = module.exports = User;
exports.createUserModel = function () {
    return new User();
};*/