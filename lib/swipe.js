/*!
 * zarm-vue v1.3.0
 * (c) 2018-2018 ZhonganTech Engineering
 * Released under the MIT License.
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 114);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(31);
var toPrimitive = __webpack_require__(24);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(32);
var defined = __webpack_require__(18);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(3);
var ctx = __webpack_require__(35);
var hide = __webpack_require__(9);
var has = __webpack_require__(5);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(33);
var enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys');
var uid = __webpack_require__(16);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(3);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(17) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(18);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(27)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(29);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(46)(false);
var IE_PROTO = __webpack_require__(21)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(42);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(19);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(41);
var toAbsoluteIndex = __webpack_require__(45);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(86);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/drag/src/drag.vue?vue&type=script&lang=js


/* harmony default export */ var dragvue_type_script_lang_js = ({
  name: 'zaDrag',
  props: {
    dragStart: {
      type: Function,
      default: function _default() {}
    },
    dragMove: {
      type: Function,
      default: function _default() {}
    },
    dragEnd: {
      type: Function,
      default: function _default() {}
    }
  },
  created: function created() {
    this.dragState = {};
  },


  methods: {
    touchstart: function touchstart(event) {
      var dragState = this.dragState;
      var touch = event.touches[0];

      dragState.startX = touch.pageX;
      dragState.startY = touch.pageY;
      dragState.startTime = new Date();
      this.dragStart(event, dragState);
    },
    touchmove: function touchmove(event) {
      var dragState = this.dragState;
      var touch = event.touches[0];

      var currentX = touch.pageX;
      var currentY = touch.pageY;

      var offsetX = currentX - dragState.startX;
      var offsetY = currentY - dragState.startY;

      var state = extends_default()({}, dragState, {
        offsetX: offsetX,
        offsetY: offsetY,
        currentX: currentX,
        currentY: currentY
      });

      if (!this.dragMove(event, state)) return;

      this.dragState = state;
    },
    touchend: function touchend(event) {
      var dragState = this.dragState;
      if (!dragState.currentX && !dragState.currentY) return;

      this.dragEnd(event, dragState);

      this.dragState = {};
    },
    attachListener: function attachListener(listeners) {
      var _this = this;

      ['touchstart', 'touchmove', 'touchend'].forEach(function (key) {
        listeners[key] = _this[key];
      });
    }
  },
  render: function render() {
    var defaultSlots = this.$slots.default || [];

    var firstDefaultSlots = defaultSlots.find(function (s) {
      return s && s.tag;
    });
    if (!firstDefaultSlots) return null;
    if (firstDefaultSlots.componentOptions) {
      firstDefaultSlots.componentOptions.listeners = firstDefaultSlots.componentOptions.listeners || {};
      this.attachListener(firstDefaultSlots.componentOptions.listeners);
    } else if (firstDefaultSlots.data) {
      firstDefaultSlots.data.on = firstDefaultSlots.data.on || {};
      this.attachListener(firstDefaultSlots.data.on);
    }
    return firstDefaultSlots;
  }
});
// CONCATENATED MODULE: ./src/drag/src/drag.vue?vue&type=script&lang=js
 /* harmony default export */ var src_dragvue_type_script_lang_js = (dragvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/drag/src/drag.vue
var render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_dragvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var drag = (component.exports);
// CONCATENATED MODULE: ./src/drag/index.js


drag.install = function (Vue) {
  Vue.component(drag.name, drag);
};

/* harmony default export */ var src_drag = __webpack_exports__["default"] = (drag);

/***/ }),
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(28);
var toObject = __webpack_require__(26);
var IObject = __webpack_require__(32);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(14);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(65) });


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
module.exports = __webpack_require__(3).Object.assign;


/***/ }),
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(53);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/drag/index.js + 3 modules
var drag = __webpack_require__(61);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/swipe/src/swipe.vue?vue&type=script&lang=js



/* harmony default export */ var swipevue_type_script_lang_js = ({
  name: 'zaSwipe',
  components: {
    zaDrag: drag["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-swipe' },
    direction: {
      type: String,
      validator: function validator(v) {
        return ['left', 'right', 'top', 'bottom'].indexOf(v) >= 0;
      },
      default: 'left'
    },
    height: {
      type: [Number, String],
      default: 160
    },
    loop: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 300
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    autoPlayIntervalTime: {
      type: Number,
      default: 3000
    },
    moveDistanceRatio: {
      type: Number,
      default: 0.5
    },
    moveTimeSpan: {
      type: Number,
      default: 300
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    itemsStyle: function itemsStyle() {
      return {
        height: !this.isX && this.height + 'px',
        whiteSpace: this.isX && 'nowrap'
      };
    },
    paginationStyle: function paginationStyle() {
      return {
        display: this.isX && 'inline-block'
      };
    },
    isX: function isX() {
      return ['left', 'right'].indexOf(this.direction) > -1;
    }
  },
  data: function data() {
    return {
      currentActiveIndex: this.activeIndex
    };
  },

  watch: {
    activeIndex: function activeIndex(val, oldval) {
      if (val === this.currentActiveIndex) return;
      this.currentActiveIndex = val;
      this.onSlideTo(this.currentActiveIndex);
    }
  },
  mounted: function mounted() {
    this.startAutoPlay();
    window.addEventListener('resize', this.resize);
    this.$refs.swipeItems.addEventListener('webkitTransitionEnd', this.transitionEnd);
    this.$refs.swipeItems.addEventListener('transitionend', this.transitionEnd);

    this.onJumpTo(this.currentActiveIndex);
  },
  created: function created() {
    this.scrolling = false;
    this.translateX = 0;
    this.translateY = 0;
    this.moveInterval = null;
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.$refs.swipeItems.removeEventListener('webkitTransitionEnd', this.transitionEnd);
    this.$refs.swipeItems.removeEventListener('transitionend', this.transitionEnd);
  },

  methods: {
    onDragStart: function onDragStart() {
      this.scrolling = false;

      var activeIndex = this.currentActiveIndex;
      var maxLength = this.validSlotLength();
      if (activeIndex <= 0) {
        this.onJumpTo(0);
      } else if (activeIndex >= maxLength - 1) {
        this.onJumpTo(maxLength - 1);
      }

      this.pauseAutoPlay();
    },
    onDragMove: function onDragMove(event, _ref) {
      var offsetX = _ref.offsetX,
          offsetY = _ref.offsetY;

      var distanceX = Math.abs(offsetX);
      var distanceY = Math.abs(offsetY);

      if (this.isX && (distanceX < 5 || distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
        this.scrolling = true;
        return;
      }

      if (!this.isX && (distanceY < 5 || distanceY >= 5 && distanceX >= 1.73 * distanceY)) {
        this.scrolling = true;
        return;
      }

      this.scrolling = false;
      event.preventDefault();

      if (!this.loop) {
        if (this.isLastIndex()) {
          if (this.isX && offsetX < 0) return;
          if (!this.isX && offsetY < 0) return;
        }

        if (this.isFirstIndex()) {
          if (this.isX && offsetX > 0) return;
          if (!this.isX && offsetY > 0) return;
        }
      }

      this.doTransition({ x: this.translateX + offsetX, y: this.translateY + offsetY }, 0);
      return true;
    },
    onDragEnd: function onDragEnd(event, _ref2) {
      var offsetX = _ref2.offsetX,
          offsetY = _ref2.offsetY,
          startTime = _ref2.startTime;

      if (this.scrolling || !offsetX && !offsetY) {
        this.scrolling = false;
        return;
      }

      var dom = this.$refs.swipeItems;

      var moveDistanceRatio = this.isX ? Math.abs(offsetX / dom.offsetWidth) : Math.abs(offsetY / dom.offsetHeight);

      var timeSpan = new Date().getTime() - startTime.getTime();
      var activeIndex = this.currentActiveIndex;

      if (moveDistanceRatio >= this.moveDistanceRatio || timeSpan <= this.moveTimeSpan) {
        activeIndex = this.isX && offsetX > 0 || !this.isX && offsetY > 0 ? this.currentActiveIndex - 1 : this.currentActiveIndex + 1;
      }
      this.onSlideTo(activeIndex);

      this.$emit('change', activeIndex);

      this.startAutoPlay();
    },
    startAutoPlay: function startAutoPlay() {
      var _this = this;

      this.moveInterval = this.autoPlay && setInterval(function () {
        var activeIndex = _this.currentActiveIndex;
        var maxLength = _this.validSlotLength();
        var isLeftTop = ['left', 'top'].indexOf(_this.direction) > -1;
        activeIndex = isLeftTop ? activeIndex + 1 : activeIndex - 1;

        var isEnd = isLeftTop && activeIndex === maxLength || !isLeftTop && activeIndex === -1;

        if (!_this.loop && isEnd) {
          _this.pauseAutoPlay();
          return;
        }
        _this.onSlideTo(activeIndex);
      }, this.autoPlayIntervalTime);
    },
    pauseAutoPlay: function pauseAutoPlay() {
      if (this.moveInterval) {
        clearInterval(this.moveInterval);
      }
    },
    onSlideTo: function onSlideTo(index) {
      this.$emit('changeStart', this.currentActiveIndex);
      this.onMoveTo(index, this.speed);
    },
    onJumpTo: function onJumpTo(index) {
      this.onMoveTo(index, 0);
      this.$emit('change', index);
    },
    onMoveTo: function onMoveTo(index, speed) {
      var dom = this.$refs.swipeItems;
      if (!dom) return;

      this.translateX = -dom.offsetWidth * (index + this.loop);
      this.translateY = -dom.offsetHeight * (index + this.loop);
      this.doTransition({ x: this.translateX, y: this.translateY }, speed);

      var maxLength = this.validSlotLength();
      if (index > maxLength - 1) {
        index = 0;
      } else if (index < 0) {
        index = maxLength - 1;
      }
      this.currentActiveIndex = index;
    },
    doTransition: function doTransition(offset, duration) {
      var dom = this.$refs.swipeItems;
      var x = 0;
      var y = 0;

      if (this.isX) {
        x = offset.x;
      } else {
        y = offset.y;
      }

      dom.style.webkitTransitionDuration = duration + 'ms';
      dom.style.transitionDuration = duration + 'ms';
      dom.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      dom.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    },
    transitionEnd: function transitionEnd() {
      var activeIndex = this.currentActiveIndex;
      var dom = this.$refs.swipeItems;
      this.translateX = -dom.offsetWidth * (activeIndex + this.loop);
      this.translateY = -dom.offsetHeight * (activeIndex + this.loop);
      this.doTransition({ x: this.translateX, y: this.translateY }, 0);
      this.$emit('changeEnd', this.currentActiveIndex);
    },
    resize: function resize() {
      this.onJumpTo(this.currentActiveIndex);
    },
    isLastIndex: function isLastIndex() {
      return this.currentActiveIndex >= this.validSlotLength() - 1;
    },
    isFirstIndex: function isFirstIndex() {
      return this.currentActiveIndex <= 0;
    },
    validSlotLength: function validSlotLength() {
      return this.validSlots().length;
    },
    validSlots: function validSlots() {
      return this.$slots.default.filter(function (d) {
        return d.componentOptions && (d.componentOptions.tag === 'za-swipe-item' || d.componentOptions.tag === 'za-tab-pane');
      });
    }
  },
  render: function render(h) {
    var prefixCls = this.prefixCls,
        itemsStyle = this.itemsStyle,
        onDragStart = this.onDragStart,
        onDragMove = this.onDragMove,
        onDragEnd = this.onDragEnd,
        currentActiveIndex = this.currentActiveIndex,
        paginationStyle = this.paginationStyle,
        loop = this.loop,
        showPagination = this.showPagination,
        validSlots = this.validSlots;


    function deepCloneVNode(vnode) {
      if (!vnode) return;
      var clonedChildren = vnode.children && vnode.children.map(function (vd) {
        return deepCloneVNode(vd);
      });
      var cloned = h(vnode.tag, vnode.data, clonedChildren);
      cloned.text = vnode.text;
      cloned.isComment = vnode.isComment;
      cloned.componentOptions = vnode.componentOptions;
      cloned.elm = vnode.elm;
      cloned.context = vnode.context;
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;
      return cloned;
    }

    var pagination = this.$slots.default.map(function (item, index) {
      return h('li', {
        attrs: {
          role: 'tab'
        },
        key: 'pagination-' + index,
        'class': {
          active: index === currentActiveIndex
        },
        style: paginationStyle });
    });
    var validChildren = validSlots();

    var firstItem = loop ? deepCloneVNode(this.$slots.default[0]) : null;
    var lastItem = loop ? deepCloneVNode(validChildren[validChildren.length - 1]) : null;
    return h(
      'div',
      { 'class': prefixCls },
      [h(
        'za-drag',
        {
          attrs: {
            dragStart: onDragStart,
            dragMove: onDragMove,
            dragEnd: onDragEnd }
        },
        [h(
          'div',
          {
            ref: 'swipeItems',
            'class': prefixCls + '-items',
            style: itemsStyle },
          [lastItem, this.$slots.default, firstItem]
        )]
      ), showPagination && h(
        'div',
        { 'class': prefixCls + '-pagination' },
        [h('ul', [pagination])]
      )]
    );
  }
});
// CONCATENATED MODULE: ./src/swipe/src/swipe.vue?vue&type=script&lang=js
 /* harmony default export */ var src_swipevue_type_script_lang_js = (swipevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/swipe/src/swipe.vue
var render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_swipevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var swipe = (component.exports);
// CONCATENATED MODULE: ./src/swipe/index.js


swipe.install = function (Vue) {
  Vue.component(swipe.name, swipe);
};

/* harmony default export */ var src_swipe = __webpack_exports__["default"] = (swipe);

/***/ })
/******/ ]);