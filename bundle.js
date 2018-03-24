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

	var _ClassTest = __webpack_require__(12);

	var _ClassTest2 = _interopRequireDefault(_ClassTest);

	var _ClassTest3 = __webpack_require__(13);

	var _ClassTest4 = _interopRequireDefault(_ClassTest3);

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

	console.log('e:', _circleplus.e, _circleplus.circleArea);

	var cp = new _ClassTest.ColorPoint(200, 100, 'red');
	console.log('cp', cp, cp instanceof _ClassTest.ColorPoint, cp instanceof _ClassTest.Point);

	_ClassTest.B.Hello();
	new _ClassTest.A();

	console.log('子类是否继承父类：', Object.getPrototypeOf(_ClassTest.ColorPoint) === _ClassTest.Point);
	new _ClassTest2.default();
	new _ClassTest4.default();

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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (x) {
	    return Math.exp(x);
	};

	var _circle = __webpack_require__(2);

	Object.defineProperty(exports, 'circleArea', {
	    enumerable: true,
	    get: function get() {
	        return _circle.area;
	    }
	});
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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = exports.Point = function Point(x, y) {
	    _classCallCheck(this, Point);

	    this.x = x;
	    this.y = y;
	    console.log('this.x,this.y', this.x, this.y);
	};

	var ColorPoint = exports.ColorPoint = function (_Point) {
	    _inherits(ColorPoint, _Point);

	    function ColorPoint(x, y, color) {
	        _classCallCheck(this, ColorPoint);

	        var _this = _possibleConstructorReturn(this, (ColorPoint.__proto__ || Object.getPrototypeOf(ColorPoint)).call(this, x, y));
	        // 只有调用一下super,才能让父类的this应用于子类中,否则子类没有this


	        _this.color = color;
	        return _this;
	    }

	    _createClass(ColorPoint, [{
	        key: 'toString',
	        value: function toString() {
	            return this.color + ' ' + _get(ColorPoint.prototype.__proto__ || Object.getPrototypeOf(ColorPoint.prototype), 'toString', this).call(this);
	        }
	    }]);

	    return ColorPoint;
	}(Point);

	var A = exports.A = function () {
	    _createClass(A, null, [{
	        key: 'Hello',
	        value: function Hello() {
	            console.log('Hello world');
	        }
	    }]);

	    function A() {
	        _classCallCheck(this, A);

	        console.log('ClassA', this);
	    }

	    return A;
	}();
	// 可以把父类的静态属性一同继承过来


	var B = exports.B = function (_A) {
	    _inherits(B, _A);

	    function B() {
	        _classCallCheck(this, B);

	        // 调用super会调用它的父类，此时父类的this指向子类，
	        // 它只能用在子类的构造函数中，在其他地方调用会报错
	        return _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this));
	    }

	    return B;
	}(A);

	var C = function C() {
	    _classCallCheck(this, C);

	    this.p = 2;
	    console.log('C');
	};

	C.prototype.x = 12;

	var D = function (_C) {
	    _inherits(D, _C);

	    function D() {
	        _classCallCheck(this, D);

	        return _possibleConstructorReturn(this, (D.__proto__ || Object.getPrototypeOf(D)).apply(this, arguments));
	    }

	    _createClass(D, [{
	        key: 'm',
	        get: function get() {
	            // super指向父类的原型对象，只有在父类的原型对象上定义的属性用
	            // super.xxx才能访问到，这里可以用super访问到C.prototype定义
	            // 的属性，而不能直接访问到父类实例属性对象
	            console.log('m', _get(D.prototype.__proto__ || Object.getPrototypeOf(D.prototype), 'p', this), _get(D.prototype.__proto__ || Object.getPrototypeOf(D.prototype), 'x', this));
	            return _get(D.prototype.__proto__ || Object.getPrototypeOf(D.prototype), 'p', this);
	        }
	    }]);

	    return D;
	}(C);

	var E = function () {
	    function E() {
	        _classCallCheck(this, E);

	        this.x = 1;
	        console.log('constructor:', this);
	    }

	    _createClass(E, [{
	        key: 'print',
	        value: function print() {
	            console.log(this.x, this);
	        }
	    }]);

	    return E;
	}();

	var F = function (_E) {
	    _inherits(F, _E);

	    function F() {
	        _classCallCheck(this, F);

	        // 子类调用super，会导致父类中引入的this指向子类，父类方法中的
	        // this也会指向子类,所以父类的print中的this.x=2
	        var _this4 = _possibleConstructorReturn(this, (F.__proto__ || Object.getPrototypeOf(F)).call(this));

	        _this4.x = 12;

	        _set(F.prototype.__proto__ || Object.getPrototypeOf(F.prototype), 'x', 3, _this4);
	        console.log('super:', _this4.x, E, F.prototype.x, E.prototype.x);
	        return _this4;
	    }

	    _createClass(F, [{
	        key: 'm',
	        value: function m() {
	            _get(F.prototype.__proto__ || Object.getPrototypeOf(F.prototype), 'print', this).call(this);
	        }
	    }]);

	    return F;
	}(E);

	var G = function G() {
	    _classCallCheck(this, G);

	    this.x = 1;
	};

	var H = function (_G) {
	    _inherits(H, _G);

	    function H() {
	        _classCallCheck(this, H);

	        var _this5 = _possibleConstructorReturn(this, (H.__proto__ || Object.getPrototypeOf(H)).call(this));

	        _this5.x = 2;
	        _set(H.prototype.__proto__ || Object.getPrototypeOf(H.prototype), 'x', 3, _this5);
	        console.log('H', _this5.x, G.prototype);
	        return _this5;
	    }

	    return H;
	}(G);

	var Parent = function () {
	    function Parent() {
	        _classCallCheck(this, Parent);
	    }

	    _createClass(Parent, [{
	        key: 'myMethod',
	        value: function myMethod(msg) {
	            console.log('instance', msg);
	        }
	    }], [{
	        key: 'myMethod',
	        value: function myMethod(msg) {
	            console.log('static', msg);
	        }
	    }]);

	    return Parent;
	}();

	var Child = function (_Parent) {
	    _inherits(Child, _Parent);

	    function Child() {
	        _classCallCheck(this, Child);

	        return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
	    }

	    _createClass(Child, [{
	        key: 'myMethod',
	        value: function myMethod(msg) {
	            _get(Child.prototype.__proto__ || Object.getPrototypeOf(Child.prototype), 'myMethod', this).call(this, msg);
	        }
	    }], [{
	        key: 'myMethod',
	        value: function myMethod(msg) {
	            _get(Child.__proto__ || Object.getPrototypeOf(Child), 'myMethod', this).call(this, msg);
	        }
	    }]);

	    return Child;
	}(Parent);

	var Main = function Main() {
	    _classCallCheck(this, Main);

	    console.log('Hello');
	    var d = new D();
	    d.m;
	    var f = new F();
	    console.log(f.x);
	    var h = new H();
	    // f.m();
	    Child.myMethod(1);
	    var child = new Child();
	    child.myMethod(2);
	};

	exports.default = Main;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var E = function E() {
	    _classCallCheck(this, E);

	    this.x = 1;
	};

	var F = function (_E) {
	    _inherits(F, _E);

	    function F() {
	        _classCallCheck(this, F);

	        var _this = _possibleConstructorReturn(this, (F.__proto__ || Object.getPrototypeOf(F)).call(this));

	        _this.x = 3;
	        _set(F.prototype.__proto__ || Object.getPrototypeOf(F.prototype), 'x', 6, _this);
	        console.log('F中this.x:\n' + _this.x, '\nF中this:\n' + _this);
	        return _this;
	    }

	    return F;
	}(E);

	var A = function A() {
	    _classCallCheck(this, A);
	};

	var B = function (_A) {
	    _inherits(B, _A);

	    function B() {
	        _classCallCheck(this, B);

	        var _this2 = _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this));

	        console.log(_get(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), 'valueOf', _this2).call(_this2) instanceof B);
	        return _this2;
	    }

	    return B;
	}(A);

	var ClassTest2 = function ClassTest2() {
	    _classCallCheck(this, ClassTest2);

	    new F();
	    new B();
	};

	exports.default = ClassTest2;

/***/ })
/******/ ]);