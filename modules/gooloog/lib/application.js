/**
 * New node file
 */

var logger = require('log4js').getLogger(__filename);

/**
 * Application prototype.
 *
 * @module
 */
var Application = module.exports = {};

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *
 * @api private
 */
Application.init = function(opts) {
	opts = opts || {};
	logger.info('app.init invoked');
	this.loaded = [];
	this.components = {};
	this.settings = {};
	this.set('base', opts.base);
	this.defaultConfiguration();
	this.state = STATE_INITED;
	logger.info('application inited: %j', this.get('serverId'));
};

/**
 * Get application base path
 *
 *  // cwd: /home/game/
 *  pomelo start
 *  // app.getBase() -> /home/game
 *
 * @return {String} application base path
 *
 * @memberOf Application
 */
Application.getBase = function() {
	return this.get('base') || process.cwd();
};

/**
 * Assign `setting` to `val`, or return `setting`'s value.
 *
 * Example:
 *
 *  app.set('key1', 'value1');
 *  app.get('key1');  // 'value1'
 *  app.key1;         // undefined
 *
 *  app.set('key2', 'value2', true);
 *  app.get('key2');  // 'value2'
 *  app.key2;         // 'value2'
 *
 * @param {String} setting the setting of application
 * @param {String} val the setting's value
 * @param {Boolean} attach whether attach the settings to application
 * @return {Server|Mixed} for chaining, or the setting value
 *
 * @memberOf Application
 */
Application.set = function(setting, val, attach) {
	if (arguments.length === 1) {
		return this.settings[setting];
	}
	this.settings[setting] = val;
	if (attach) {
		this[setting] = val;
	}
	return this;
};

/**
 * Get property from setting
 * 
 * @param {String}
 *            setting application setting
 * @return {String} val
 * 
 * @memberOf Application
 */
Application.get = function(setting) {
	return this.settings[setting];
};