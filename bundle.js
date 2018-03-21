/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _profile = __webpack_require__(1);

	var _circle = __webpack_require__(2);

	var circle = _interopRequireWildcard(_circle);

	var _exportDefault = __webpack_require__(3);

	var _exportDefault2 = _interopRequireDefault(_exportDefault);

	var _modules = __webpack_require__(4);

	var _modules2 = _interopRequireDefault(_modules);

	var _defaultNum = __webpack_require__(5);

	var _defaultNum2 = _interopRequireDefault(_defaultNum);

	var _MyClass = __webpack_require__(6);

	var _MyClass2 = _interopRequireDefault(_MyClass);

	var _Forward = __webpack_require__(7);

	var _circleplus = __webpack_require__(8);

	var math = _interopRequireWildcard(_circleplus);

	var _constrants = __webpack_require__(9);

	var constrants = _interopRequireWildcard(_constrants);

	var _crc = __webpack_require__(10);

	var _crc2 = _interopRequireDefault(_crc);

	var _foreach = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	circle.foo = '333';
	// import { area, circumference } from "./circle";

	circle.area1 = function () {};
	console.log('动态修改：', circle.foo, circle);

	console.log(_profile.firstName, _profile.lastName);
	_profile.o.firstName = 'chenyin';
	console.log('o:', _profile.o);
	console.log('圆面积：' + circle.area(4));
	console.log('圆周长' + circle.circumference(14));

	(0, _exportDefault2.default)();

	console.log('add:', (0, _modules2.default)(2, 2));

	console.log('default-num', _defaultNum2.default, _defaultNum.num);

	var cls = new _MyClass2.default();
	console.log('导出的类是：', cls, (0, _Forward.add1)(2, 2));

	console.log('exp:', (0, math.default)(2));
	// console.log('常量：',constrants.A);

	console.log('crc32', _crc2.default);

	console.log('add1', _modules2.default);

	console.log('foreach', _foreach.each);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var firstName = 'Michael';
	var lastName = 'Jackson';
	var year = 1958;
	var o = {};
	exports.firstName = firstName;
	exports.lastName = lastName;
	exports.year = year;
	exports.o = o;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.area = area;
	exports.circumference = circumference;
	function area(radius) {
	    return Math.PI * radius * radius;
	}
	function circumference(radius) {
	    return 2 * Math.PI * radius;
	}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    console.log('foo');
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.add1 = add1;
	function add(x, y) {
	    return x * y;
	}
	function add1(x, y) {
	    return x + y;
	}
	exports.default = add;
	var foo = exports.foo = "foo";

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = 42;
	var num = exports.num = 11;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function _class() {
	    _classCallCheck(this, _class);
	};

	exports.default = _class;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modules = __webpack_require__(4);

	Object.defineProperty(exports, 'add', {
	  enumerable: true,
	  get: function get() {
	    return _modules.add;
	  }
	});
	Object.defineProperty(exports, 'add1', {
	  enumerable: true,
	  get: function get() {
	    return _modules.add1;
	  }
	});
	Object.defineProperty(exports, 'myFoo', {
	  enumerable: true,
	  get: function get() {
	    return _modules.foo;
	  }
	});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (x) {
	    return Math.exp(x);
	};

	var e = exports.e = 2.71828182846;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var A = exports.A = 1;
	var B = exports.B = 2;
	var C = exports.C = 3;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = crc32;
	function crc32() {}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (obj) {};

	exports.each = each;
	function each(obj, iterator, context) {}
	exports.forEach = each;

/***/ })
/******/ ]);