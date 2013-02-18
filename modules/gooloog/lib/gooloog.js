/**
 * New node file
 */

var application = require('./application.js');

/**
 * Expose `createApplication()`.
 *
 * @module
 */

var Gooloog = module.exports = {};

/**
 * Framework version.
 */

Gooloog.version = '0.1';

/**
 * auto loaded components
 */
Gooloog.components = {};

/**
 * auto loaded filters
 * @type {Object}
 */
Gooloog.filters = {};

var self = this;

/**
 * Create an Gooloog application.
 *
 * @return {Application}
 * @memberOf Pomelo
 * @api public
 */
Gooloog.createApp = function(opts) {
	var app = application;
	app.init(opts);
	self.app = app;
	return app;
};
