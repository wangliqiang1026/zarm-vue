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
/******/ 	return __webpack_require__(__webpack_require__.s = 158);
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return enumGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultThemeValidator; });
function enumGenerator() {
  var enumArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return function (v) {
    return enumArr.indexOf(v) >= 0;
  };
}

function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

function defaultThemeValidator(v) {
  return ['default', 'primary', 'info', 'success', 'warning', 'error'].indexOf(v) >= 0;
}

/***/ }),
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(23)('wks');
var uid = __webpack_require__(16);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/icon/src/icon.vue?vue&type=template&id=0584e33f&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[(_vm.prefixCls + "-" + _vm.type)] = !!_vm.type, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj ),on:{"click":_vm.handleClick}})
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/icon/src/icon.vue?vue&type=template&id=0584e33f&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/icon/src/icon.vue?vue&type=script&lang=js




/* harmony default export */ var iconvue_type_script_lang_js = ({
  name: 'zaIcon',
  props: {
    prefixCls: {
      type: String,
      default: 'za-icon'
    },
    type: String,
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: null
    }
  },
  methods: {
    handleClick: function handleClick(event) {
      this.$emit('click', event);
    }
  }
});
// CONCATENATED MODULE: ./src/icon/src/icon.vue?vue&type=script&lang=js
 /* harmony default export */ var src_iconvue_type_script_lang_js = (iconvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/icon/src/icon.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_iconvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var icon = __webpack_exports__["a"] = (component.exports);

/***/ }),
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
/* 25 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(5);
var TAG = __webpack_require__(7)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
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
/* 34 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/mask/src/mask.vue?vue&type=template&id=14cf712b&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.visible)?_c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[_vm.type] = !!_vm.type, _obj ),on:{"click":_vm.handleClick}}):_vm._e()
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/mask/src/mask.vue?vue&type=template&id=14cf712b&lang=html

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/mask/src/mask.vue?vue&type=script&lang=js


/* harmony default export */ var maskvue_type_script_lang_js = ({
  name: 'zaMask',
  props: {
    prefixCls: {
      type: String,
      default: 'za-mask'
    },
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator: function validator(v) {
        return ['transparent', 'light', 'normal', 'dark'].indexOf(v) >= 0;
      },
      default: 'normal'
    }
  },
  methods: {
    handleClick: function handleClick(event) {
      this.$emit('mask-close', event);
    }
  }
});
// CONCATENATED MODULE: ./src/mask/src/mask.vue?vue&type=script&lang=js
 /* harmony default export */ var src_maskvue_type_script_lang_js = (maskvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/mask/src/mask.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_maskvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var mask = (component.exports);
// CONCATENATED MODULE: ./src/mask/index.js


mask.install = function (Vue) {
  Vue.component(mask.name, mask);
};

/* harmony default export */ var src_mask = __webpack_exports__["default"] = (mask);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(120);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(84);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(78);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);


_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(3);
var LIBRARY = __webpack_require__(17);
var wksExt = __webpack_require__(44);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);


/***/ }),
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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/spinner/src/spinner.vue?vue&type=template&id=e386d678&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{ref:"svg",class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj[("size-" + _vm.size)] = !!_vm.size, _obj ),attrs:{"viewBox":("0 0 " + _vm.diameter + " " + _vm.diameter)}},[_c('circle',{class:(_vm.prefixCls + "-path"),style:({ strokeWidth: _vm.strokeWidth }),attrs:{"cx":_vm.half,"cy":_vm.half,"r":_vm.r,"fill":"none"}}),_vm._v(" "),_c('circle',{class:(_vm.prefixCls + "-line"),style:(_vm.style),attrs:{"cx":_vm.half,"cy":_vm.half,"r":_vm.r,"fill":"none"}})])
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/spinner/src/spinner.vue?vue&type=template&id=e386d678&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/spinner/src/spinner.vue?vue&type=script&lang=js




var diameter = 62;

/* harmony default export */ var spinnervue_type_script_lang_js = ({
  name: 'zaSpinner',
  props: {
    prefixCls: {
      type: String,
      default: 'za-spinner'
    },
    size: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['xl', 'lg', 'sm', 'xs']),
      default: null
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'primary'
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    percent: {
      type: Number,
      default: 15
    }
  },
  data: function data() {
    return {
      diameter: diameter
    };
  },

  computed: {
    half: function half() {
      return this.diameter / 2;
    },
    r: function r() {
      return this.half - this.strokeWidth / 2;
    },
    style: function style() {
      var round = 2 * Math.PI * this.r;
      return {
        strokeDasharray: round * this.percent / 100 + ' ' + round,
        strokeWidth: this.strokeWidth
      };
    }
  }
});
// CONCATENATED MODULE: ./src/spinner/src/spinner.vue?vue&type=script&lang=js
 /* harmony default export */ var src_spinnervue_type_script_lang_js = (spinnervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/spinner/src/spinner.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_spinnervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var spinner = (component.exports);
// CONCATENATED MODULE: ./src/spinner/index.js


spinner.install = function (Vue) {
  Vue.component(spinner.name, spinner);
};

/* harmony default export */ var src_spinner = __webpack_exports__["default"] = (spinner);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(12);
var dPs = __webpack_require__(58);
var enumBugKeys = __webpack_require__(22);
var IE_PROTO = __webpack_require__(21)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(27)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(57).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(17);
var $export = __webpack_require__(14);
var redefine = __webpack_require__(49);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(25);
var $iterCreate = __webpack_require__(59);
var setToStringTag = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(56);
var ITERATOR = __webpack_require__(7)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/popup/src/popup.vue?vue&type=template&id=29af31dc&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[(_vm.prefixCls + "-hidden")] = !_vm.currentVisible, _obj )},[_c('div',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-wrapper")] = true, _obj$1[(_vm.prefixCls + "-wrapper-" + _vm.direction)] = true, _obj$1 ),style:(_vm.transitionDurationStyle)},[_vm._t("default")],2),_vm._v(" "),_c('za-mask',{class:[("fade-" + _vm.animationState)],style:(_vm.animationDurationStyle),attrs:{"visible":_vm.maskVisible,"type":_vm.maskType},on:{"mask-close":_vm.onMaskClose}})],1)
var _obj;
var _obj$1;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/popup/src/popup.vue?vue&type=template&id=29af31dc&lang=html

// EXTERNAL MODULE: ./src/mask/index.js + 5 modules
var mask = __webpack_require__(36);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/popup/src/popup.vue?vue&type=script&lang=js




/* harmony default export */ var popupvue_type_script_lang_js = ({
  name: 'zaPopup',
  components: {
    zaMask: mask["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-popup'
    },
    direction: {
      type: String,
      validator: function validator(v) {
        return ['top', 'right', 'bottom', 'left'].indexOf(v) >= 0;
      },
      default: 'bottom'
    },
    visible: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 3000
    },
    animationDuration: {
      type: Number,
      default: 200
    },
    maskType: {
      type: String,
      validator: function validator(v) {
        return ['transparent', 'light', 'normal', 'dark'].indexOf(v) >= 0;
      },
      default: 'normal'
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    transitionDurationStyle: function transitionDurationStyle() {
      return {
        WebkitTransitionDuration: this.animationDuration + 'ms',
        transitionDuration: this.animationDuration + 'ms'
      };
    },
    animationDurationStyle: function animationDurationStyle() {
      return {
        WebkitAnimationDuration: this.animationDuration + 'ms',
        animationDuration: this.animationDuration + 'ms'
      };
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible,
      animationState: 'enter',
      maskVisible: this.mask && this.visible
    };
  },

  watch: {
    visible: function visible(value, oldValue) {
      var _this = this;

      if (value === this.currentVisible) return;
      if (this.timerEnter || this.timerLeave) {
        clearTimeout(this.timerEnter);
        clearTimeout(this.timerLeave);
      }
      if (value) {
        this.enter();
      } else {
        this.currentVisible = value;
        this.animationState = 'leave';
        this.timerLeave = setTimeout(function () {
          _this.maskVisible = false;
        }, this.animationDuration);
      }
    }
  },
  methods: {
    enter: function enter() {
      var _this2 = this;

      this.currentVisible = true;
      this.maskVisible = true;
      this.animationState = 'enter';

      if (this.duration === 0) return;
      if (this.timerEnter) {
        clearTimeout(this.timerEnter);
      }
      if (this.autoClose) {
        this.timerEnter = setTimeout(function () {
          _this2.leave('timeout');
        }, this.duration);
      }
    },
    leave: function leave(reason, event) {
      var _this3 = this;

      this.currentVisible = false;

      this.animationState = 'leave';
      this.$emit('update:visible', false);
      this.$emit('close', reason, event);

      if (this.timerLeave) {
        clearTimeout(this.timerLeave);
      }

      this.timerLeave = setTimeout(function () {
        _this3.maskVisible = false;
      }, this.animationDuration);
    },
    onMaskClose: function onMaskClose(event) {
      if (!this.closeOnClickModal) return;

      if (this.timerEnter) {
        clearTimeout(this.timerEnter);
      }
      this.leave('clickaway', event);
    },
    removeTimer: function removeTimer() {
      if (this.timerEnter || this.timerLeave) {
        clearTimeout(this.timerEnter);
        clearTimeout(this.timerLeave);
      }
    }
  },
  mounted: function mounted() {
    if (this.currentVisible) {
      this.enter();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeTimer();
  }
});
// CONCATENATED MODULE: ./src/popup/src/popup.vue?vue&type=script&lang=js
 /* harmony default export */ var src_popupvue_type_script_lang_js = (popupvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/popup/src/popup.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_popupvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var popup = (component.exports);
// CONCATENATED MODULE: ./src/popup/index.js


popup.install = function (Vue) {
  Vue.component(popup.name, popup);
};

/* harmony default export */ var src_popup = __webpack_exports__["default"] = (popup);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(33);
var hiddenKeys = __webpack_require__(22).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(60)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(50)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(5);
var toObject = __webpack_require__(26);
var IE_PROTO = __webpack_require__(21)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(12);
var getKeys = __webpack_require__(20);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(48);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(30);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(7)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var defined = __webpack_require__(18);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
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
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/wheel/src/wheel.vue?vue&type=template&id=1c428443&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"wrapper",class:_vm.prefixCls},[_c('div',{class:(_vm.prefixCls + "-content")},_vm._l((_vm.dataSource),function(item,index){return _c('div',{key:index+1,class:( _obj = {}, _obj[(_vm.prefixCls + "-item")] = true, _obj[(_vm.prefixCls + "-item-selected")] = _vm.value === item[_vm.valueMember], _obj )},[_vm._v("\n        "+_vm._s(_vm.itemRender(item))+"\n      ")])
var _obj;}))])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/wheel/src/wheel.vue?vue&type=template&id=1c428443&lang=html

// CONCATENATED MODULE: ./node_modules/.1.12.4@better-scroll/dist/bscroll.esm.js
/*!
 * better-normal-scroll v1.12.4
 * (c) 2016-2018 ustbhuangyi
 * Released under the MIT License.
 */
var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function eventMixin(BScroll) {
  BScroll.prototype.on = function (type, fn) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    if (!this._events[type]) {
      this._events[type] = [];
    }

    this._events[type].push([fn, context]);
  };

  BScroll.prototype.once = function (type, fn) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    function magic() {
      this.off(type, magic);

      fn.apply(context, arguments);
    }
    // To expose the corresponding function method in order to execute the off method
    magic.fn = fn;

    this.on(type, magic);
  };

  BScroll.prototype.off = function (type, fn) {
    var _events = this._events[type];
    if (!_events) {
      return;
    }

    var count = _events.length;
    while (count--) {
      if (_events[count][0] === fn || _events[count][0] && _events[count][0].fn === fn) {
        _events[count][0] = undefined;
      }
    }
  };

  BScroll.prototype.trigger = function (type) {
    var events = this._events[type];
    if (!events) {
      return;
    }

    var len = events.length;
    var eventsCopy = [].concat(toConsumableArray(events));
    for (var i = 0; i < len; i++) {
      var event = eventsCopy[i];

      var _event = slicedToArray(event, 2),
          fn = _event[0],
          context = _event[1];

      if (fn) {
        fn.apply(context, [].slice.call(arguments, 1));
      }
    }
  };
}

// ssr support
var inBrowser = typeof window !== 'undefined';
var ua = inBrowser && navigator.userAgent.toLowerCase();
var isWeChatDevTools = ua && /wechatdevtools/.test(ua);
var isAndroid = ua && ua.indexOf('android') > 0;

function getNow() {
  return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
}

function extend(target) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < rest.length; i++) {
    var source = rest[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}

function isUndef(v) {
  return v === undefined || v === null;
}

function getDistance(x, y) {
  return Math.sqrt(x * x + y * y);
}

var elementStyle = inBrowser && document.createElement('div').style;

var vendor = function () {
  if (!inBrowser) {
    return false;
  }
  var transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (var key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
}();

function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend';
    }
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

function addEvent(el, type, fn, capture) {
  el.addEventListener(type, fn, { passive: false, capture: !!capture });
}

function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, { passive: false, capture: !!capture });
}

function offset(el) {
  var left = 0;
  var top = 0;

  while (el) {
    left -= el.offsetLeft;
    top -= el.offsetTop;
    el = el.offsetParent;
  }

  return {
    left: left,
    top: top
  };
}

function offsetToBody(el) {
  var rect = el.getBoundingClientRect();

  return {
    left: -(rect.left + window.pageXOffset),
    top: -(rect.top + window.pageYOffset)
  };
}

var transform = prefixStyle('transform');

var hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle;
// fix issue #361
var hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);
var hasTransform = transform !== false;
var hasTransition = inBrowser && prefixStyle('transition') in elementStyle;

var style = {
  transform: transform,
  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
  transitionDuration: prefixStyle('transitionDuration'),
  transitionDelay: prefixStyle('transitionDelay'),
  transformOrigin: prefixStyle('transformOrigin'),
  transitionEnd: prefixStyle('transitionEnd')
};

var TOUCH_EVENT = 1;
var MOUSE_EVENT = 2;

var eventType = {
  touchstart: TOUCH_EVENT,
  touchmove: TOUCH_EVENT,
  touchend: TOUCH_EVENT,

  mousedown: MOUSE_EVENT,
  mousemove: MOUSE_EVENT,
  mouseup: MOUSE_EVENT
};

function getRect(el) {
  if (el instanceof window.SVGElement) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}

function preventDefaultException(el, exceptions) {
  for (var i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true;
    }
  }
  return false;
}

function tap(e, eventName) {
  var ev = document.createEvent('Event');
  ev.initEvent(eventName, true, true);
  ev.pageX = e.pageX;
  ev.pageY = e.pageY;
  e.target.dispatchEvent(ev);
}

function click(e) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';

  var eventSource = void 0;
  if (e.type === 'mouseup' || e.type === 'mousecancel') {
    eventSource = e;
  } else if (e.type === 'touchend' || e.type === 'touchcancel') {
    eventSource = e.changedTouches[0];
  }
  var posSrc = {};
  if (eventSource) {
    posSrc.screenX = eventSource.screenX || 0;
    posSrc.screenY = eventSource.screenY || 0;
    posSrc.clientX = eventSource.clientX || 0;
    posSrc.clientY = eventSource.clientY || 0;
  }
  var ev = void 0;
  var bubbles = true;
  var cancelable = true;
  if (typeof MouseEvent !== 'undefined') {
    try {
      ev = new MouseEvent(event, extend({
        bubbles: bubbles,
        cancelable: cancelable
      }, posSrc));
    } catch (e) {
      createEvent();
    }
  } else {
    createEvent();
  }

  function createEvent() {
    ev = document.createEvent('Event');
    ev.initEvent(event, bubbles, cancelable);
    extend(ev, posSrc);
  }

  // forwardedTouchEvent set to true in case of the conflict with fastclick
  ev.forwardedTouchEvent = true;
  ev._constructed = true;
  e.target.dispatchEvent(ev);
}

function dblclick(e) {
  click(e, 'dblclick');
}

function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild);
  } else {
    target.appendChild(el);
  }
}

function before(el, target) {
  target.parentNode.insertBefore(el, target);
}

function removeChild(el, child) {
  el.removeChild(child);
}

var DEFAULT_OPTIONS = {
  startX: 0,
  startY: 0,
  scrollX: false,
  scrollY: true,
  freeScroll: false,
  directionLockThreshold: 5,
  eventPassthrough: '',
  click: false,
  tap: false,
  /**
   * support any side
   * bounce: {
   *   top: true,
   *   bottom: true,
   *   left: true,
   *   right: true
   * }
   */
  bounce: true,
  bounceTime: 800,
  momentum: true,
  momentumLimitTime: 300,
  momentumLimitDistance: 15,
  swipeTime: 2500,
  swipeBounceTime: 500,
  deceleration: 0.0015,
  flickLimitTime: 200,
  flickLimitDistance: 100,
  resizePolling: 60,
  probeType: 0,
  preventDefault: true,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
  },
  HWCompositing: true,
  useTransition: true,
  useTransform: true,
  bindToWrapper: false,
  disableMouse: hasTouch,
  disableTouch: !hasTouch,
  observeDOM: true,
  autoBlur: true,
  /**
   * for picker
   * wheel: {
   *   selectedIndex: 0,
   *   rotate: 25,
   *   adjustTime: 400
   *   wheelWrapperClass: 'wheel-scroll',
   *   wheelItemClass: 'wheel-item'
   * }
   */
  wheel: false,
  /**
   * for slide
   * snap: {
   *   loop: false,
   *   el: domEl,
   *   threshold: 0.1,
   *   stepX: 100,
   *   stepY: 100,
   *   speed: 400,
   *   easing: {
   *     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
   *     fn: function (t) {
   *       return t * (2 - t)
   *     }
   *   }
   *   listenFlick: true
   * }
   */
  snap: false,
  /**
   * for scrollbar
   * scrollbar: {
   *   fade: true,
   *   interactive: false
   * }
   */
  scrollbar: false,
  /**
   * for pull down and refresh
   * pullDownRefresh: {
   *   threshold: 50,
   *   stop: 20
   * }
   */
  pullDownRefresh: false,
  /**
   * for pull up and load
   * pullUpLoad: {
   *   threshold: 50
   * }
   */
  pullUpLoad: false,
  /**
   * for mouse wheel
   * mouseWheel: {
   *   speed: 20,
   *   invert: false,
   *   easeTime: 300
   * }
   */
  mouseWheel: false,
  stopPropagation: false,
  /**
   * for zoom
   * zoom: {
   *   start: 1,
   *   min: 1,
   *   max: 4
   * }
   */
  zoom: false,
  /**
   * for infinity
   * infinity: {
   *   render(item, div) {
   *   },
   *   createTombstone() {
   *   },
   *   fetch(count) {
   *   }
   * }
   */
  infinity: false,
  /**
   * for double click
   * dblclick: {
   *   delay: 300
   * }
   */
  dblclick: false
};

function initMixin(BScroll) {
  BScroll.prototype._init = function (el, options) {
    this._handleOptions(options);

    // init private custom events
    this._events = {};

    this.x = 0;
    this.y = 0;
    this.directionX = 0;
    this.directionY = 0;

    this.setScale(1);

    this._addDOMEvents();

    this._initExtFeatures();

    this._watchTransition();

    if (this.options.observeDOM) {
      this._initDOMObserver();
    }

    if (this.options.autoBlur) {
      this._handleAutoBlur();
    }

    this.refresh();

    if (!this.options.snap) {
      this.scrollTo(this.options.startX, this.options.startY);
    }

    this.enable();
  };

  BScroll.prototype.setScale = function (scale) {
    this.lastScale = isUndef(this.scale) ? scale : this.scale;
    this.scale = scale;
  };

  BScroll.prototype._handleOptions = function (options) {
    this.options = extend({}, DEFAULT_OPTIONS, options);

    this.translateZ = this.options.HWCompositing && hasPerspective ? ' translateZ(0)' : '';

    this.options.useTransition = this.options.useTransition && hasTransition;
    this.options.useTransform = this.options.useTransform && hasTransform;

    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

    // If you want eventPassthrough I have to lock one of the axes
    this.options.scrollX = this.options.eventPassthrough === 'horizontal' ? false : this.options.scrollX;
    this.options.scrollY = this.options.eventPassthrough === 'vertical' ? false : this.options.scrollY;

    // With eventPassthrough we also need lockDirection mechanism
    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

    if (this.options.tap === true) {
      this.options.tap = 'tap';
    }
  };

  BScroll.prototype._addDOMEvents = function () {
    var eventOperation = addEvent;
    this._handleDOMEvents(eventOperation);
  };

  BScroll.prototype._removeDOMEvents = function () {
    var eventOperation = removeEvent;
    this._handleDOMEvents(eventOperation);
  };

  BScroll.prototype._handleDOMEvents = function (eventOperation) {
    var target = this.options.bindToWrapper ? this.wrapper : window;
    eventOperation(window, 'orientationchange', this);
    eventOperation(window, 'resize', this);

    if (this.options.click) {
      eventOperation(this.wrapper, 'click', this, true);
    }

    if (!this.options.disableMouse) {
      eventOperation(this.wrapper, 'mousedown', this);
      eventOperation(target, 'mousemove', this);
      eventOperation(target, 'mousecancel', this);
      eventOperation(target, 'mouseup', this);
    }

    if (hasTouch && !this.options.disableTouch) {
      eventOperation(this.wrapper, 'touchstart', this);
      eventOperation(target, 'touchmove', this);
      eventOperation(target, 'touchcancel', this);
      eventOperation(target, 'touchend', this);
    }

    eventOperation(this.scroller, style.transitionEnd, this);
  };

  BScroll.prototype._initExtFeatures = function () {
    if (this.options.snap) {
      this._initSnap();
    }
    if (this.options.scrollbar) {
      this._initScrollbar();
    }
    if (this.options.pullUpLoad) {
      this._initPullUp();
    }
    if (this.options.pullDownRefresh) {
      this._initPullDown();
    }
    if (this.options.wheel) {
      this._initWheel();
    }
    if (this.options.mouseWheel) {
      this._initMouseWheel();
    }
    if (this.options.zoom) {
      this._initZoom();
    }
    if (this.options.infinity) {
      this._initInfinite();
    }
  };

  BScroll.prototype._watchTransition = function () {
    if (typeof Object.defineProperty !== 'function') {
      return;
    }
    var me = this;
    var isInTransition = false;
    var key = this.useTransition ? 'isInTransition' : 'isAnimating';
    Object.defineProperty(this, key, {
      get: function get() {
        return isInTransition;
      },
      set: function set(newVal) {
        isInTransition = newVal;
        // fix issue #359
        var el = me.scroller.children.length ? me.scroller.children : [me.scroller];
        var pointerEvents = isInTransition && !me.pulling ? 'none' : 'auto';
        for (var i = 0; i < el.length; i++) {
          el[i].style.pointerEvents = pointerEvents;
        }
      }
    });
  };

  BScroll.prototype._handleAutoBlur = function () {
    this.on('scrollStart', function () {
      var activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        activeElement.blur();
      }
    });
  };

  BScroll.prototype._initDOMObserver = function () {
    var _this = this;

    if (typeof MutationObserver !== 'undefined') {
      var timer = void 0;
      var observer = new MutationObserver(function (mutations) {
        // don't do any refresh during the transition, or outside of the boundaries
        if (_this._shouldNotRefresh()) {
          return;
        }
        var immediateRefresh = false;
        var deferredRefresh = false;
        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          if (mutation.type !== 'attributes') {
            immediateRefresh = true;
            break;
          } else {
            if (mutation.target !== _this.scroller) {
              deferredRefresh = true;
              break;
            }
          }
        }
        if (immediateRefresh) {
          _this.refresh();
        } else if (deferredRefresh) {
          // attributes changes too often
          clearTimeout(timer);
          timer = setTimeout(function () {
            if (!_this._shouldNotRefresh()) {
              _this.refresh();
            }
          }, 60);
        }
      });
      var config = {
        attributes: true,
        childList: true,
        subtree: true
      };
      observer.observe(this.scroller, config);

      this.on('destroy', function () {
        observer.disconnect();
      });
    } else {
      this._checkDOMUpdate();
    }
  };

  BScroll.prototype._shouldNotRefresh = function () {
    var outsideBoundaries = this.x > this.minScrollX || this.x < this.maxScrollX || this.y > this.minScrollY || this.y < this.maxScrollY;

    return this.isInTransition || this.stopFromTransition || outsideBoundaries;
  };

  BScroll.prototype._checkDOMUpdate = function () {
    var scrollerRect = getRect(this.scroller);
    var oldWidth = scrollerRect.width;
    var oldHeight = scrollerRect.height;

    function check() {
      if (this.destroyed) {
        return;
      }
      scrollerRect = getRect(this.scroller);
      var newWidth = scrollerRect.width;
      var newHeight = scrollerRect.height;

      if (oldWidth !== newWidth || oldHeight !== newHeight) {
        this.refresh();
      }
      oldWidth = newWidth;
      oldHeight = newHeight;

      next.call(this);
    }

    function next() {
      var _this2 = this;

      setTimeout(function () {
        check.call(_this2);
      }, 1000);
    }

    next.call(this);
  };

  BScroll.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this._start(e);
        if (this.options.zoom && e.touches && e.touches.length > 1) {
          this._zoomStart(e);
        }
        break;
      case 'touchmove':
      case 'mousemove':
        if (this.options.zoom && e.touches && e.touches.length > 1) {
          this._zoom(e);
        } else {
          this._move(e);
        }
        break;
      case 'touchend':
      case 'mouseup':
      case 'touchcancel':
      case 'mousecancel':
        if (this.scaled) {
          this._zoomEnd(e);
        } else {
          this._end(e);
        }
        break;
      case 'orientationchange':
      case 'resize':
        this._resize();
        break;
      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        this._transitionEnd(e);
        break;
      case 'click':
        if (this.enabled && !e._constructed) {
          if (!preventDefaultException(e.target, this.options.preventDefaultException)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
        break;
      case 'wheel':
      case 'DOMMouseScroll':
      case 'mousewheel':
        this._onMouseWheel(e);
        break;
    }
  };

  BScroll.prototype.refresh = function () {
    var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';
    var wrapperRect = getRect(this.wrapper);
    this.wrapperWidth = wrapperRect.width;
    this.wrapperHeight = wrapperRect.height;

    var scrollerRect = getRect(this.scroller);
    this.scrollerWidth = Math.round(scrollerRect.width * this.scale);
    this.scrollerHeight = Math.round(scrollerRect.height * this.scale);

    this.relativeX = scrollerRect.left;
    this.relativeY = scrollerRect.top;

    if (isWrapperStatic) {
      this.relativeX -= wrapperRect.left;
      this.relativeY -= wrapperRect.top;
    }

    this.minScrollX = 0;
    this.minScrollY = 0;

    var wheel = this.options.wheel;
    if (wheel) {
      this.items = this.scroller.children;
      this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0;
      if (this.selectedIndex === undefined) {
        this.selectedIndex = wheel.selectedIndex || 0;
      }
      this.options.startY = -this.selectedIndex * this.itemHeight;
      this.maxScrollX = 0;
      this.maxScrollY = -this.itemHeight * (this.items.length - 1);
    } else {
      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
      if (!this.options.infinity) {
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
      }
      if (this.maxScrollX < 0) {
        this.maxScrollX -= this.relativeX;
        this.minScrollX = -this.relativeX;
      } else if (this.scale > 1) {
        this.maxScrollX = this.maxScrollX / 2 - this.relativeX;
        this.minScrollX = this.maxScrollX;
      }
      if (this.maxScrollY < 0) {
        this.maxScrollY -= this.relativeY;
        this.minScrollY = -this.relativeY;
      } else if (this.scale > 1) {
        this.maxScrollY = this.maxScrollY / 2 - this.relativeY;
        this.minScrollY = this.maxScrollY;
      }
    }

    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < this.minScrollX;
    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.minScrollY;

    if (!this.hasHorizontalScroll) {
      this.maxScrollX = this.minScrollX;
      this.scrollerWidth = this.wrapperWidth;
    }

    if (!this.hasVerticalScroll) {
      this.maxScrollY = this.minScrollY;
      this.scrollerHeight = this.wrapperHeight;
    }

    this.endTime = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.wrapperOffset = offset(this.wrapper);

    this.trigger('refresh');

    !this.scaled && this.resetPosition();
  };

  BScroll.prototype.enable = function () {
    this.enabled = true;
  };

  BScroll.prototype.disable = function () {
    this.enabled = false;
  };
}

var ease = {
  // easeOutQuint
  swipe: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function fn(t) {
      return 1 + --t * t * t * t * t;
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fn: function fn(t) {
      return t * (2 - t);
    }
  },
  // easeOutQuart
  bounce: {
    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    fn: function fn(t) {
      return 1 - --t * t * t * t;
    }
  }
};

function momentum(current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
  var distance = current - start;
  var speed = Math.abs(distance) / time;

  var deceleration = options.deceleration,
      itemHeight = options.itemHeight,
      swipeBounceTime = options.swipeBounceTime,
      wheel = options.wheel,
      swipeTime = options.swipeTime;

  var duration = swipeTime;
  var rate = wheel ? 4 : 15;

  var destination = current + speed / deceleration * (distance < 0 ? -1 : 1);

  if (wheel && itemHeight) {
    destination = Math.round(destination / itemHeight) * itemHeight;
  }

  if (destination < lowerMargin) {
    destination = wrapperSize ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - wrapperSize / rate * speed) : lowerMargin;
    duration = swipeBounceTime;
  } else if (destination > upperMargin) {
    destination = wrapperSize ? Math.min(upperMargin + wrapperSize / 4, upperMargin + wrapperSize / rate * speed) : upperMargin;
    duration = swipeBounceTime;
  }

  return {
    destination: Math.round(destination),
    duration: duration
  };
}

var DEFAULT_INTERVAL = 100 / 60;

function noop() {}

var requestAnimationFrame = function () {
  if (!inBrowser) {
    /* istanbul ignore if */
    return noop;
  }
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
  // if all else fails, use setTimeout
  function (callback) {
    return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2); // make interval as precise as possible.
  };
}();

var cancelAnimationFrame = function () {
  if (!inBrowser) {
    /* istanbul ignore if */
    return noop;
  }
  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
    window.clearTimeout(id);
  };
}();

var DIRECTION_UP = 1;
var DIRECTION_DOWN = -1;
var DIRECTION_LEFT = 1;
var DIRECTION_RIGHT = -1;

var PROBE_DEBOUNCE = 1;

var PROBE_REALTIME = 3;

function warn(msg) {
  console.error('[BScroll warn]: ' + msg);
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error('[BScroll] ' + msg);
  }
}

function coreMixin(BScroll) {
  BScroll.prototype._start = function (e) {
    var _eventType = eventType[e.type];
    if (_eventType !== TOUCH_EVENT) {
      if (e.button !== 0) {
        return;
      }
    }
    if (!this.enabled || this.destroyed || this.initiated && this.initiated !== _eventType) {
      return;
    }
    this.initiated = _eventType;

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
    }
    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.moved = false;
    this.distX = 0;
    this.distY = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.movingDirectionX = 0;
    this.movingDirectionY = 0;
    this.directionLocked = 0;

    this._transitionTime();
    this.startTime = getNow();

    if (this.options.wheel) {
      this.target = e.target;
    }

    this.stop();

    var point = e.touches ? e.touches[0] : e;

    this.startX = this.x;
    this.startY = this.y;
    this.absStartX = this.x;
    this.absStartY = this.y;
    this.pointX = point.pageX;
    this.pointY = point.pageY;

    this.trigger('beforeScrollStart');
  };

  BScroll.prototype._move = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }
    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    var point = e.touches ? e.touches[0] : e;
    var deltaX = point.pageX - this.pointX;
    var deltaY = point.pageY - this.pointY;

    this.pointX = point.pageX;
    this.pointY = point.pageY;

    this.distX += deltaX;
    this.distY += deltaY;

    var absDistX = Math.abs(this.distX);
    var absDistY = Math.abs(this.distY);

    var timestamp = getNow();

    // We need to move at least momentumLimitDistance pixels for the scrolling to initiate
    if (timestamp - this.endTime > this.options.momentumLimitTime && absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance) {
      return;
    }

    // If you are scrolling in one direction lock the other
    if (!this.directionLocked && !this.options.freeScroll) {
      if (absDistX > absDistY + this.options.directionLockThreshold) {
        this.directionLocked = 'h'; // lock horizontally
      } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
        this.directionLocked = 'v'; // lock vertically
      } else {
        this.directionLocked = 'n'; // no lock
      }
    }

    if (this.directionLocked === 'h') {
      if (this.options.eventPassthrough === 'vertical') {
        e.preventDefault();
      } else if (this.options.eventPassthrough === 'horizontal') {
        this.initiated = false;
        return;
      }
      deltaY = 0;
    } else if (this.directionLocked === 'v') {
      if (this.options.eventPassthrough === 'horizontal') {
        e.preventDefault();
      } else if (this.options.eventPassthrough === 'vertical') {
        this.initiated = false;
        return;
      }
      deltaX = 0;
    }

    deltaX = this.hasHorizontalScroll ? deltaX : 0;
    deltaY = this.hasVerticalScroll ? deltaY : 0;
    this.movingDirectionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;
    this.movingDirectionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;

    var newX = this.x + deltaX;
    var newY = this.y + deltaY;

    var top = false;
    var bottom = false;
    var left = false;
    var right = false;
    // Slow down or stop if outside of the boundaries
    var bounce = this.options.bounce;
    if (bounce !== false) {
      top = bounce.top === undefined ? true : bounce.top;
      bottom = bounce.bottom === undefined ? true : bounce.bottom;
      left = bounce.left === undefined ? true : bounce.left;
      right = bounce.right === undefined ? true : bounce.right;
    }
    if (newX > this.minScrollX || newX < this.maxScrollX) {
      if (newX > this.minScrollX && left || newX < this.maxScrollX && right) {
        newX = this.x + deltaX / 3;
      } else {
        newX = newX > this.minScrollX ? this.minScrollX : this.maxScrollX;
      }
    }
    if (newY > this.minScrollY || newY < this.maxScrollY) {
      if (newY > this.minScrollY && top || newY < this.maxScrollY && bottom) {
        newY = this.y + deltaY / 3;
      } else {
        newY = newY > this.minScrollY ? this.minScrollY : this.maxScrollY;
      }
    }

    if (!this.moved) {
      this.moved = true;
      this.trigger('scrollStart');
    }

    this._translate(newX, newY);

    if (timestamp - this.startTime > this.options.momentumLimitTime) {
      this.startTime = timestamp;
      this.startX = this.x;
      this.startY = this.y;

      if (this.options.probeType === PROBE_DEBOUNCE) {
        this.trigger('scroll', {
          x: this.x,
          y: this.y
        });
      }
    }

    if (this.options.probeType > PROBE_DEBOUNCE) {
      this.trigger('scroll', {
        x: this.x,
        y: this.y
      });
    }

    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

    var pX = this.pointX - scrollLeft;
    var pY = this.pointY - scrollTop;

    if (pX > document.documentElement.clientWidth - this.options.momentumLimitDistance || pX < this.options.momentumLimitDistance || pY < this.options.momentumLimitDistance || pY > document.documentElement.clientHeight - this.options.momentumLimitDistance) {
      this._end(e);
    }
  };

  BScroll.prototype._end = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }
    this.initiated = false;

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
    }
    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.trigger('touchEnd', {
      x: this.x,
      y: this.y
    });

    this.isInTransition = false;

    // ensures that the last position is rounded
    var newX = Math.round(this.x);
    var newY = Math.round(this.y);

    var deltaX = newX - this.absStartX;
    var deltaY = newY - this.absStartY;
    this.directionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;
    this.directionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;

    // if configure pull down refresh, check it first
    if (this.options.pullDownRefresh && this._checkPullDown()) {
      return;
    }

    // check if it is a click operation
    if (this._checkClick(e)) {
      this.trigger('scrollCancel');
      return;
    }

    // reset if we are outside of the boundaries
    if (this.resetPosition(this.options.bounceTime, ease.bounce)) {
      return;
    }

    this._translate(newX, newY);

    this.endTime = getNow();
    var duration = this.endTime - this.startTime;
    var absDistX = Math.abs(newX - this.startX);
    var absDistY = Math.abs(newY - this.startY);

    // flick
    if (this._events.flick && duration < this.options.flickLimitTime && absDistX < this.options.flickLimitDistance && absDistY < this.options.flickLimitDistance) {
      this.trigger('flick');
      return;
    }

    var time = 0;
    // start momentum animation if needed
    if (this.options.momentum && duration < this.options.momentumLimitTime && (absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)) {
      var top = false;
      var bottom = false;
      var left = false;
      var right = false;
      var bounce = this.options.bounce;
      if (bounce !== false) {
        top = bounce.top === undefined ? true : bounce.top;
        bottom = bounce.bottom === undefined ? true : bounce.bottom;
        left = bounce.left === undefined ? true : bounce.left;
        right = bounce.right === undefined ? true : bounce.right;
      }
      var wrapperWidth = this.directionX === DIRECTION_RIGHT && left || this.directionX === DIRECTION_LEFT && right ? this.wrapperWidth : 0;
      var wrapperHeight = this.directionY === DIRECTION_DOWN && top || this.directionY === DIRECTION_UP && bottom ? this.wrapperHeight : 0;
      var momentumX = this.hasHorizontalScroll ? momentum(this.x, this.startX, duration, this.maxScrollX, this.minScrollX, wrapperWidth, this.options) : { destination: newX, duration: 0 };
      var momentumY = this.hasVerticalScroll ? momentum(this.y, this.startY, duration, this.maxScrollY, this.minScrollY, wrapperHeight, this.options) : { destination: newY, duration: 0 };
      newX = momentumX.destination;
      newY = momentumY.destination;
      time = Math.max(momentumX.duration, momentumY.duration);
      this.isInTransition = true;
    } else {
      if (this.options.wheel) {
        newY = Math.round(newY / this.itemHeight) * this.itemHeight;
        time = this.options.wheel.adjustTime || 400;
      }
    }

    var easing = ease.swipe;
    if (this.options.snap) {
      var snap = this._nearestSnap(newX, newY);
      this.currentPage = snap;
      time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
      newX = snap.x;
      newY = snap.y;

      this.directionX = 0;
      this.directionY = 0;
      easing = this.options.snap.easing || ease.bounce;
    }

    if (newX !== this.x || newY !== this.y) {
      // change easing function when scroller goes out of the boundaries
      if (newX > this.minScrollX || newX < this.maxScrollX || newY > this.minScrollY || newY < this.maxScrollY) {
        easing = ease.swipeBounce;
      }
      this.scrollTo(newX, newY, time, easing);
      return;
    }

    if (this.options.wheel) {
      this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight));
    }
    this.trigger('scrollEnd', {
      x: this.x,
      y: this.y
    });
  };

  BScroll.prototype._checkClick = function (e) {
    // when in the process of pulling down, it should not prevent click
    var preventClick = this.stopFromTransition && !this.pulling;
    this.stopFromTransition = false;

    // we scrolled less than 15 pixels
    if (!this.moved) {
      if (this.options.wheel) {
        if (this.target && this.target.className === this.options.wheel.wheelWrapperClass) {
          var index = Math.abs(Math.round(this.y / this.itemHeight));
          var _offset = Math.round((this.pointY + offsetToBody(this.wrapper).top - this.wrapperHeight / 2) / this.itemHeight);
          this.target = this.items[index + _offset];
        }
        this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, true, true, ease.swipe);
        return true;
      } else {
        if (!preventClick) {
          var _dblclick = this.options.dblclick;
          var dblclickTrigged = false;
          if (_dblclick && this.lastClickTime) {
            var _dblclick$delay = _dblclick.delay,
                delay = _dblclick$delay === undefined ? 300 : _dblclick$delay;

            if (getNow() - this.lastClickTime < delay) {
              dblclickTrigged = true;
              dblclick(e);
            }
          }
          if (this.options.tap) {
            tap(e, this.options.tap);
          }

          if (this.options.click && !preventDefaultException(e.target, this.options.preventDefaultException)) {
            click(e);
          }
          this.lastClickTime = dblclickTrigged ? null : getNow();
          return true;
        }
        return false;
      }
    }
    return false;
  };

  BScroll.prototype._resize = function () {
    var _this = this;

    if (!this.enabled) {
      return;
    }
    // fix a scroll problem under Android condition
    if (isAndroid) {
      this.wrapper.scrollTop = 0;
    }
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(function () {
      _this.refresh();
    }, this.options.resizePolling);
  };

  BScroll.prototype._startProbe = function () {
    cancelAnimationFrame(this.probeTimer);
    this.probeTimer = requestAnimationFrame(probe);

    var me = this;

    function probe() {
      var pos = me.getComputedPosition();
      me.trigger('scroll', pos);
      if (!me.isInTransition) {
        me.trigger('scrollEnd', pos);
        return;
      }
      me.probeTimer = requestAnimationFrame(probe);
    }
  };

  BScroll.prototype._transitionTime = function () {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this.scrollerStyle[style.transitionDuration] = time + 'ms';

    if (this.options.wheel) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].style[style.transitionDuration] = time + 'ms';
      }
    }

    if (this.indicators) {
      for (var _i = 0; _i < this.indicators.length; _i++) {
        this.indicators[_i].transitionTime(time);
      }
    }
  };

  BScroll.prototype._transitionTimingFunction = function (easing) {
    this.scrollerStyle[style.transitionTimingFunction] = easing;

    if (this.options.wheel) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].style[style.transitionTimingFunction] = easing;
      }
    }

    if (this.indicators) {
      for (var _i2 = 0; _i2 < this.indicators.length; _i2++) {
        this.indicators[_i2].transitionTimingFunction(easing);
      }
    }
  };

  BScroll.prototype._transitionEnd = function (e) {
    if (e.target !== this.scroller || !this.isInTransition) {
      return;
    }

    this._transitionTime();
    var needReset = !this.pulling || this.movingDirectionY === DIRECTION_UP;
    if (needReset && !this.resetPosition(this.options.bounceTime, ease.bounce)) {
      this.isInTransition = false;
      if (this.options.probeType !== PROBE_REALTIME) {
        this.trigger('scrollEnd', {
          x: this.x,
          y: this.y
        });
      }
    }
  };

  BScroll.prototype._translate = function (x, y, scale) {
    assert(!isUndef(x) && !isUndef(y), 'Translate x or y is null or undefined.');
    if (isUndef(scale)) {
      scale = this.scale;
    }
    if (this.options.useTransform) {
      this.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')' + this.translateZ;
    } else {
      x = Math.round(x);
      y = Math.round(y);
      this.scrollerStyle.left = x + 'px';
      this.scrollerStyle.top = y + 'px';
    }

    if (this.options.wheel) {
      var _options$wheel$rotate = this.options.wheel.rotate,
          rotate = _options$wheel$rotate === undefined ? 25 : _options$wheel$rotate;

      for (var i = 0; i < this.items.length; i++) {
        var deg = rotate * (y / this.itemHeight + i);
        this.items[i].style[style.transform] = 'rotateX(' + deg + 'deg)';
      }
    }

    this.x = x;
    this.y = y;
    this.setScale(scale);

    if (this.indicators) {
      for (var _i3 = 0; _i3 < this.indicators.length; _i3++) {
        this.indicators[_i3].updatePosition();
      }
    }
  };

  BScroll.prototype._animate = function (destX, destY, duration, easingFn) {
    var me = this;
    var startX = this.x;
    var startY = this.y;
    var startScale = this.lastScale;
    var destScale = this.scale;
    var startTime = getNow();
    var destTime = startTime + duration;

    function step() {
      var now = getNow();

      if (now >= destTime) {
        me.isAnimating = false;
        me._translate(destX, destY, destScale);

        me.trigger('scroll', {
          x: me.x,
          y: me.y
        });

        if (!me.pulling && !me.resetPosition(me.options.bounceTime)) {
          me.trigger('scrollEnd', {
            x: me.x,
            y: me.y
          });
        }
        return;
      }
      now = (now - startTime) / duration;
      var easing = easingFn(now);
      var newX = (destX - startX) * easing + startX;
      var newY = (destY - startY) * easing + startY;
      var newScale = (destScale - startScale) * easing + startScale;

      me._translate(newX, newY, newScale);

      if (me.isAnimating) {
        me.animateTimer = requestAnimationFrame(step);
      }

      if (me.options.probeType === PROBE_REALTIME) {
        me.trigger('scroll', {
          x: me.x,
          y: me.y
        });
      }
    }

    this.isAnimating = true;
    cancelAnimationFrame(this.animateTimer);
    step();
  };

  BScroll.prototype.scrollBy = function (x, y) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;

    x = this.x + x;
    y = this.y + y;

    this.scrollTo(x, y, time, easing);
  };

  BScroll.prototype.scrollTo = function (x, y) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;

    this.isInTransition = this.options.useTransition && time > 0 && (x !== this.x || y !== this.y);

    if (!time || this.options.useTransition) {
      this._transitionTimingFunction(easing.style);
      this._transitionTime(time);
      this._translate(x, y);

      if (time && this.options.probeType === PROBE_REALTIME) {
        this._startProbe();
      }

      if (!time && (x !== this.x || y !== this.y)) {
        this.trigger('scroll', {
          x: x,
          y: y
        });
        // force reflow to put everything in position
        this._reflow = document.body.offsetHeight;
        if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
          this.trigger('scrollEnd', {
            x: x,
            y: y
          });
        }
      }

      if (this.options.wheel) {
        if (y > this.minScrollY) {
          this.selectedIndex = 0;
        } else if (y < this.maxScrollY) {
          this.selectedIndex = this.items.length - 1;
        } else {
          this.selectedIndex = Math.round(Math.abs(y / this.itemHeight));
        }
      }
    } else {
      this._animate(x, y, time, easing.fn);
    }
  };

  BScroll.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {
    if (!el) {
      return;
    }
    el = el.nodeType ? el : this.scroller.querySelector(el);

    if (this.options.wheel && el.className !== this.options.wheel.wheelItemClass) {
      return;
    }

    var pos = offset(el);
    pos.left -= this.wrapperOffset.left;
    pos.top -= this.wrapperOffset.top;

    // if offsetX/Y are true we center the element to the screen
    if (offsetX === true) {
      offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
    }
    if (offsetY === true) {
      offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
    }

    pos.left -= offsetX || 0;
    pos.top -= offsetY || 0;
    pos.left = pos.left > this.minScrollX ? this.minScrollX : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
    pos.top = pos.top > this.minScrollY ? this.minScrollY : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

    if (this.options.wheel) {
      pos.top = Math.round(pos.top / this.itemHeight) * this.itemHeight;
    }

    this.scrollTo(pos.left, pos.top, time, easing);
  };

  BScroll.prototype.resetPosition = function () {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var easeing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ease.bounce;

    var x = this.x;
    var roundX = Math.round(x);
    if (!this.hasHorizontalScroll || roundX > this.minScrollX) {
      x = this.minScrollX;
    } else if (roundX < this.maxScrollX) {
      x = this.maxScrollX;
    }

    var y = this.y;
    var roundY = Math.round(y);
    if (!this.hasVerticalScroll || roundY > this.minScrollY) {
      y = this.minScrollY;
    } else if (roundY < this.maxScrollY) {
      y = this.maxScrollY;
    }

    if (x === this.x && y === this.y) {
      return false;
    }

    this.scrollTo(x, y, time, easeing);

    return true;
  };

  BScroll.prototype.getComputedPosition = function () {
    var matrix = window.getComputedStyle(this.scroller, null);
    var x = void 0;
    var y = void 0;

    if (this.options.useTransform) {
      matrix = matrix[style.transform].split(')')[0].split(', ');
      x = +(matrix[12] || matrix[4]);
      y = +(matrix[13] || matrix[5]);
    } else {
      x = +matrix.left.replace(/[^-\d.]/g, '');
      y = +matrix.top.replace(/[^-\d.]/g, '');
    }

    return {
      x: x,
      y: y
    };
  };

  BScroll.prototype.stop = function () {
    if (this.options.useTransition && this.isInTransition) {
      this.isInTransition = false;
      cancelAnimationFrame(this.probeTimer);
      var pos = this.getComputedPosition();
      this._translate(pos.x, pos.y);
      if (this.options.wheel) {
        this.target = this.items[Math.round(-pos.y / this.itemHeight)];
      } else {
        this.trigger('scrollEnd', {
          x: this.x,
          y: this.y
        });
      }
      this.stopFromTransition = true;
    } else if (!this.options.useTransition && this.isAnimating) {
      this.isAnimating = false;
      cancelAnimationFrame(this.animateTimer);
      this.trigger('scrollEnd', {
        x: this.x,
        y: this.y
      });
      this.stopFromTransition = true;
    }
  };

  BScroll.prototype.destroy = function () {
    this.destroyed = true;
    this.trigger('destroy');
    if (this.options.useTransition) {
      cancelAnimationFrame(this.probeTimer);
    } else {
      cancelAnimationFrame(this.animateTimer);
    }
    this._removeDOMEvents();
    // remove custom events
    this._events = {};
  };
}

function snapMixin(BScroll) {
  BScroll.prototype._initSnap = function () {
    var _this = this;

    this.currentPage = {};
    var snap = this.options.snap;

    if (snap.loop) {
      var children = this.scroller.children;
      if (children.length > 1) {
        prepend(children[children.length - 1].cloneNode(true), this.scroller);
        this.scroller.appendChild(children[1].cloneNode(true));
      } else {
        // Loop does not make any sense if there is only one child.
        snap.loop = false;
      }
    }

    var el = snap.el;
    if (typeof el === 'string') {
      el = this.scroller.querySelectorAll(el);
    }

    this.on('refresh', function () {
      _this.pages = [];

      if (!_this.wrapperWidth || !_this.wrapperHeight || !_this.scrollerWidth || !_this.scrollerHeight) {
        return;
      }

      var stepX = snap.stepX || _this.wrapperWidth;
      var stepY = snap.stepY || _this.wrapperHeight;

      var x = 0;
      var y = void 0;
      var cx = void 0;
      var cy = void 0;
      var i = 0;
      var l = void 0;
      var m = 0;
      var n = void 0;
      var rect = void 0;
      if (!el) {
        cx = Math.round(stepX / 2);
        cy = Math.round(stepY / 2);

        while (x > -_this.scrollerWidth) {
          _this.pages[i] = [];
          l = 0;
          y = 0;

          while (y > -_this.scrollerHeight) {
            _this.pages[i][l] = {
              x: Math.max(x, _this.maxScrollX),
              y: Math.max(y, _this.maxScrollY),
              width: stepX,
              height: stepY,
              cx: x - cx,
              cy: y - cy
            };

            y -= stepY;
            l++;
          }

          x -= stepX;
          i++;
        }
      } else {
        l = el.length;
        n = -1;

        for (; i < l; i++) {
          rect = getRect(el[i]);
          if (i === 0 || rect.left <= getRect(el[i - 1]).left) {
            m = 0;
            n++;
          }

          if (!_this.pages[m]) {
            _this.pages[m] = [];
          }

          x = Math.max(-rect.left, _this.maxScrollX);
          y = Math.max(-rect.top, _this.maxScrollY);
          cx = x - Math.round(rect.width / 2);
          cy = y - Math.round(rect.height / 2);

          _this.pages[m][n] = {
            x: x,
            y: y,
            width: rect.width,
            height: rect.height,
            cx: cx,
            cy: cy
          };

          if (x > _this.maxScrollX) {
            m++;
          }
        }
      }

      _this._checkSnapLoop();

      var initPageX = snap._loopX ? 1 : 0;
      var initPageY = snap._loopY ? 1 : 0;
      _this._goToPage(_this.currentPage.pageX || initPageX, _this.currentPage.pageY || initPageY, 0);

      // Update snap threshold if needed.
      var snapThreshold = snap.threshold;
      if (snapThreshold % 1 === 0) {
        _this.snapThresholdX = snapThreshold;
        _this.snapThresholdY = snapThreshold;
      } else {
        _this.snapThresholdX = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].width * snapThreshold);
        _this.snapThresholdY = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].height * snapThreshold);
      }
    });

    this.on('scrollEnd', function () {
      if (snap.loop) {
        if (snap._loopX) {
          if (_this.currentPage.pageX === 0) {
            _this._goToPage(_this.pages.length - 2, _this.currentPage.pageY, 0);
          }
          if (_this.currentPage.pageX === _this.pages.length - 1) {
            _this._goToPage(1, _this.currentPage.pageY, 0);
          }
        } else {
          if (_this.currentPage.pageY === 0) {
            _this._goToPage(_this.currentPage.pageX, _this.pages[0].length - 2, 0);
          }
          if (_this.currentPage.pageY === _this.pages[0].length - 1) {
            _this._goToPage(_this.currentPage.pageX, 1, 0);
          }
        }
      }
    });

    if (snap.listenFlick !== false) {
      this.on('flick', function () {
        var time = snap.speed || Math.max(Math.max(Math.min(Math.abs(_this.x - _this.startX), 1000), Math.min(Math.abs(_this.y - _this.startY), 1000)), 300);

        _this._goToPage(_this.currentPage.pageX + _this.directionX, _this.currentPage.pageY + _this.directionY, time);
      });
    }

    this.on('destroy', function () {
      if (snap.loop) {
        var _children = _this.scroller.children;
        if (_children.length > 2) {
          removeChild(_this.scroller, _children[_children.length - 1]);
          removeChild(_this.scroller, _children[0]);
        }
      }
    });
  };

  BScroll.prototype._checkSnapLoop = function () {
    var snap = this.options.snap;

    if (!snap.loop || !this.pages || !this.pages.length) {
      return;
    }

    if (this.pages.length > 1) {
      snap._loopX = true;
    }
    if (this.pages[0] && this.pages[0].length > 1) {
      snap._loopY = true;
    }
    if (snap._loopX && snap._loopY) {
      warn('Loop does not support two direction at the same time.');
    }
  };

  BScroll.prototype._nearestSnap = function (x, y) {
    if (!this.pages.length) {
      return { x: 0, y: 0, pageX: 0, pageY: 0 };
    }

    var i = 0;
    // Check if we exceeded the snap threshold
    if (Math.abs(x - this.absStartX) <= this.snapThresholdX && Math.abs(y - this.absStartY) <= this.snapThresholdY) {
      return this.currentPage;
    }

    if (x > this.minScrollX) {
      x = this.minScrollX;
    } else if (x < this.maxScrollX) {
      x = this.maxScrollX;
    }

    if (y > this.minScrollY) {
      y = this.minScrollY;
    } else if (y < this.maxScrollY) {
      y = this.maxScrollY;
    }

    var l = this.pages.length;
    for (; i < l; i++) {
      if (x >= this.pages[i][0].cx) {
        x = this.pages[i][0].x;
        break;
      }
    }

    l = this.pages[i].length;

    var m = 0;
    for (; m < l; m++) {
      if (y >= this.pages[0][m].cy) {
        y = this.pages[0][m].y;
        break;
      }
    }

    if (i === this.currentPage.pageX) {
      i += this.directionX;

      if (i < 0) {
        i = 0;
      } else if (i >= this.pages.length) {
        i = this.pages.length - 1;
      }

      x = this.pages[i][0].x;
    }

    if (m === this.currentPage.pageY) {
      m += this.directionY;

      if (m < 0) {
        m = 0;
      } else if (m >= this.pages[0].length) {
        m = this.pages[0].length - 1;
      }

      y = this.pages[0][m].y;
    }

    return {
      x: x,
      y: y,
      pageX: i,
      pageY: m
    };
  };

  BScroll.prototype._goToPage = function (x) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var time = arguments[2];
    var easing = arguments[3];

    var snap = this.options.snap;

    if (!snap || !this.pages || !this.pages.length) {
      return;
    }

    easing = easing || snap.easing || ease.bounce;

    if (x >= this.pages.length) {
      x = this.pages.length - 1;
    } else if (x < 0) {
      x = 0;
    }

    if (!this.pages[x]) {
      return;
    }

    if (y >= this.pages[x].length) {
      y = this.pages[x].length - 1;
    } else if (y < 0) {
      y = 0;
    }

    var posX = this.pages[x][y].x;
    var posY = this.pages[x][y].y;

    time = time === undefined ? snap.speed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

    this.currentPage = {
      x: posX,
      y: posY,
      pageX: x,
      pageY: y
    };
    this.scrollTo(posX, posY, time, easing);
  };

  BScroll.prototype.goToPage = function (x, y, time, easing) {
    var snap = this.options.snap;
    if (!snap || !this.pages || !this.pages.length) {
      return;
    }

    if (snap.loop) {
      var len = void 0;
      if (snap._loopX) {
        len = this.pages.length - 2;
        if (x >= len) {
          x = len - 1;
        } else if (x < 0) {
          x = 0;
        }
        x += 1;
      } else {
        len = this.pages[0].length - 2;
        if (y >= len) {
          y = len - 1;
        } else if (y < 0) {
          y = 0;
        }
        y += 1;
      }
    }
    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.next = function (time, easing) {
    var snap = this.options.snap;
    if (!snap) {
      return;
    }

    var x = this.currentPage.pageX;
    var y = this.currentPage.pageY;

    x++;
    if (x >= this.pages.length && this.hasVerticalScroll) {
      x = 0;
      y++;
    }

    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.prev = function (time, easing) {
    var snap = this.options.snap;
    if (!snap) {
      return;
    }

    var x = this.currentPage.pageX;
    var y = this.currentPage.pageY;

    x--;
    if (x < 0 && this.hasVerticalScroll) {
      x = 0;
      y--;
    }

    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.getCurrentPage = function () {
    var snap = this.options.snap;
    if (!snap) {
      return null;
    }

    if (snap.loop) {
      var currentPage = void 0;
      if (snap._loopX) {
        currentPage = extend({}, this.currentPage, {
          pageX: this.currentPage.pageX - 1
        });
      } else {
        currentPage = extend({}, this.currentPage, {
          pageY: this.currentPage.pageY - 1
        });
      }
      return currentPage;
    }
    return this.currentPage;
  };
}

function wheelMixin(BScroll) {
  BScroll.prototype.wheelTo = function () {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (this.options.wheel) {
      this.y = -index * this.itemHeight;
      this.scrollTo(0, this.y);
    }
  };

  BScroll.prototype.getSelectedIndex = function () {
    return this.options.wheel && this.selectedIndex;
  };

  BScroll.prototype._initWheel = function () {
    var wheel = this.options.wheel;
    if (!wheel.wheelWrapperClass) {
      wheel.wheelWrapperClass = 'wheel-scroll';
    }
    if (!wheel.wheelItemClass) {
      wheel.wheelItemClass = 'wheel-item';
    }
    if (wheel.selectedIndex === undefined) {
      wheel.selectedIndex = 0;
      warn('wheel option selectedIndex is required!');
    }
  };
}

var INDICATOR_MIN_LEN = 8;

function scrollbarMixin(BScroll) {
  BScroll.prototype._initScrollbar = function () {
    var _this = this;

    var _options$scrollbar = this.options.scrollbar,
        _options$scrollbar$fa = _options$scrollbar.fade,
        fade = _options$scrollbar$fa === undefined ? true : _options$scrollbar$fa,
        _options$scrollbar$in = _options$scrollbar.interactive,
        interactive = _options$scrollbar$in === undefined ? false : _options$scrollbar$in;

    this.indicators = [];
    var indicator = void 0;

    if (this.options.scrollX) {
      indicator = {
        el: createScrollbar('horizontal'),
        direction: 'horizontal',
        fade: fade,
        interactive: interactive
      };
      this._insertScrollBar(indicator.el);

      this.indicators.push(new Indicator(this, indicator));
    }

    if (this.options.scrollY) {
      indicator = {
        el: createScrollbar('vertical'),
        direction: 'vertical',
        fade: fade,
        interactive: interactive
      };
      this._insertScrollBar(indicator.el);
      this.indicators.push(new Indicator(this, indicator));
    }

    this.on('refresh', function () {
      for (var i = 0; i < _this.indicators.length; i++) {
        _this.indicators[i].refresh();
      }
    });

    if (fade) {
      this.on('scrollEnd', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade();
        }
      });

      this.on('scrollCancel', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade();
        }
      });

      this.on('scrollStart', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade(true);
        }
      });

      this.on('beforeScrollStart', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade(true, true);
        }
      });
    }

    this.on('destroy', function () {
      _this._removeScrollBars();
    });
  };

  BScroll.prototype._insertScrollBar = function (scrollbar) {
    this.wrapper.appendChild(scrollbar);
  };

  BScroll.prototype._removeScrollBars = function () {
    for (var i = 0; i < this.indicators.length; i++) {
      this.indicators[i].destroy();
    }
  };
}

function createScrollbar(direction) {
  var scrollbar = document.createElement('div');
  var indicator = document.createElement('div');

  scrollbar.style.cssText = 'position:absolute;z-index:9999;pointerEvents:none';
  indicator.style.cssText = 'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';

  indicator.className = 'bscroll-indicator';

  if (direction === 'horizontal') {
    scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
    indicator.style.height = '100%';
    scrollbar.className = 'bscroll-horizontal-scrollbar';
  } else {
    scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
    indicator.style.width = '100%';
    scrollbar.className = 'bscroll-vertical-scrollbar';
  }

  scrollbar.style.cssText += ';overflow:hidden';
  scrollbar.appendChild(indicator);

  return scrollbar;
}

function Indicator(scroller, options) {
  this.wrapper = options.el;
  this.wrapperStyle = this.wrapper.style;
  this.indicator = this.wrapper.children[0];
  this.indicatorStyle = this.indicator.style;
  this.scroller = scroller;
  this.direction = options.direction;
  if (options.fade) {
    this.visible = 0;
    this.wrapperStyle.opacity = '0';
  } else {
    this.visible = 1;
  }

  this.sizeRatioX = 1;
  this.sizeRatioY = 1;
  this.maxPosX = 0;
  this.maxPosY = 0;
  this.x = 0;
  this.y = 0;

  if (options.interactive) {
    this._addDOMEvents();
  }
}

Indicator.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'touchstart':
    case 'mousedown':
      this._start(e);
      break;
    case 'touchmove':
    case 'mousemove':
      this._move(e);
      break;
    case 'touchend':
    case 'mouseup':
    case 'touchcancel':
    case 'mousecancel':
      this._end(e);
      break;
  }
};

Indicator.prototype.refresh = function () {
  if (this._shouldShow()) {
    this.transitionTime();
    this._calculate();
    this.updatePosition();
  }
};

Indicator.prototype.fade = function (visible, hold) {
  var _this2 = this;

  if (hold && !this.visible) {
    return;
  }

  var time = visible ? 250 : 500;

  visible = visible ? '1' : '0';

  this.wrapperStyle[style.transitionDuration] = time + 'ms';

  clearTimeout(this.fadeTimeout);
  this.fadeTimeout = setTimeout(function () {
    _this2.wrapperStyle.opacity = visible;
    _this2.visible = +visible;
  }, 0);
};

Indicator.prototype.updatePosition = function () {
  if (this.direction === 'vertical') {
    var y = Math.round(this.sizeRatioY * this.scroller.y);

    if (y < 0) {
      this.transitionTime(500);
      var height = Math.max(this.indicatorHeight + y * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.height = height + 'px';
      y = 0;
    } else if (y > this.maxPosY) {
      this.transitionTime(500);
      var _height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.height = _height + 'px';
      y = this.maxPosY + this.indicatorHeight - _height;
    } else {
      this.indicatorStyle.height = this.indicatorHeight + 'px';
    }
    this.y = y;

    if (this.scroller.options.useTransform) {
      this.indicatorStyle[style.transform] = 'translateY(' + y + 'px)' + this.scroller.translateZ;
    } else {
      this.indicatorStyle.top = y + 'px';
    }
  } else {
    var x = Math.round(this.sizeRatioX * this.scroller.x);

    if (x < 0) {
      this.transitionTime(500);
      var width = Math.max(this.indicatorWidth + x * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.width = width + 'px';
      x = 0;
    } else if (x > this.maxPosX) {
      this.transitionTime(500);
      var _width = Math.max(this.indicatorWidth - (x - this.maxPosX) * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.width = _width + 'px';
      x = this.maxPosX + this.indicatorWidth - _width;
    } else {
      this.indicatorStyle.width = this.indicatorWidth + 'px';
    }

    this.x = x;

    if (this.scroller.options.useTransform) {
      this.indicatorStyle[style.transform] = 'translateX(' + x + 'px)' + this.scroller.translateZ;
    } else {
      this.indicatorStyle.left = x + 'px';
    }
  }
};

Indicator.prototype.transitionTime = function () {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  this.indicatorStyle[style.transitionDuration] = time + 'ms';
};

Indicator.prototype.transitionTimingFunction = function (easing) {
  this.indicatorStyle[style.transitionTimingFunction] = easing;
};

Indicator.prototype.destroy = function () {
  this._removeDOMEvents();
  this.wrapper.parentNode.removeChild(this.wrapper);
};

Indicator.prototype._start = function (e) {
  var point = e.touches ? e.touches[0] : e;

  e.preventDefault();
  e.stopPropagation();

  this.transitionTime();

  this.initiated = true;
  this.moved = false;
  this.lastPointX = point.pageX;
  this.lastPointY = point.pageY;

  this.startTime = getNow();

  this._handleMoveEvents(addEvent);
  this.scroller.trigger('beforeScrollStart');
};

Indicator.prototype._move = function (e) {
  var point = e.touches ? e.touches[0] : e;

  e.preventDefault();
  e.stopPropagation();

  if (!this.moved) {
    this.scroller.trigger('scrollStart');
  }

  this.moved = true;

  var deltaX = point.pageX - this.lastPointX;
  this.lastPointX = point.pageX;

  var deltaY = point.pageY - this.lastPointY;
  this.lastPointY = point.pageY;

  var newX = this.x + deltaX;
  var newY = this.y + deltaY;

  this._pos(newX, newY);
};

Indicator.prototype._end = function (e) {
  if (!this.initiated) {
    return;
  }
  this.initiated = false;

  e.preventDefault();
  e.stopPropagation();

  this._handleMoveEvents(removeEvent);

  var snapOption = this.scroller.options.snap;
  if (snapOption) {
    var speed = snapOption.speed,
        _snapOption$easing = snapOption.easing,
        easing = _snapOption$easing === undefined ? ease.bounce : _snapOption$easing;

    var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

    var time = speed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);

    if (this.scroller.x !== snap.x || this.scroller.y !== snap.y) {
      this.scroller.directionX = 0;
      this.scroller.directionY = 0;
      this.scroller.currentPage = snap;
      this.scroller.scrollTo(snap.x, snap.y, time, easing);
    }
  }

  if (this.moved) {
    this.scroller.trigger('scrollEnd', {
      x: this.scroller.x,
      y: this.scroller.y
    });
  }
};

Indicator.prototype._pos = function (x, y) {
  if (x < 0) {
    x = 0;
  } else if (x > this.maxPosX) {
    x = this.maxPosX;
  }

  if (y < 0) {
    y = 0;
  } else if (y > this.maxPosY) {
    y = this.maxPosY;
  }

  x = Math.round(x / this.sizeRatioX);
  y = Math.round(y / this.sizeRatioY);

  this.scroller.scrollTo(x, y);
  this.scroller.trigger('scroll', {
    x: this.scroller.x,
    y: this.scroller.y
  });
};

Indicator.prototype._shouldShow = function () {
  if (this.direction === 'vertical' && this.scroller.hasVerticalScroll || this.direction === 'horizontal' && this.scroller.hasHorizontalScroll) {
    this.wrapper.style.display = '';
    return true;
  }
  this.wrapper.style.display = 'none';
  return false;
};

Indicator.prototype._calculate = function () {
  if (this.direction === 'vertical') {
    var wrapperHeight = this.wrapper.clientHeight;
    this.indicatorHeight = Math.max(Math.round(wrapperHeight * wrapperHeight / (this.scroller.scrollerHeight || wrapperHeight || 1)), INDICATOR_MIN_LEN);
    this.indicatorStyle.height = this.indicatorHeight + 'px';

    this.maxPosY = wrapperHeight - this.indicatorHeight;

    this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY;
  } else {
    var wrapperWidth = this.wrapper.clientWidth;
    this.indicatorWidth = Math.max(Math.round(wrapperWidth * wrapperWidth / (this.scroller.scrollerWidth || wrapperWidth || 1)), INDICATOR_MIN_LEN);
    this.indicatorStyle.width = this.indicatorWidth + 'px';

    this.maxPosX = wrapperWidth - this.indicatorWidth;

    this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX;
  }
};

Indicator.prototype._addDOMEvents = function () {
  var eventOperation = addEvent;
  this._handleDOMEvents(eventOperation);
};

Indicator.prototype._removeDOMEvents = function () {
  var eventOperation = removeEvent;
  this._handleDOMEvents(eventOperation);
  this._handleMoveEvents(eventOperation);
};

Indicator.prototype._handleMoveEvents = function (eventOperation) {
  if (!this.scroller.options.disableTouch) {
    eventOperation(window, 'touchmove', this);
  }
  if (!this.scroller.options.disableMouse) {
    eventOperation(window, 'mousemove', this);
  }
};

Indicator.prototype._handleDOMEvents = function (eventOperation) {
  if (!this.scroller.options.disableTouch) {
    eventOperation(this.indicator, 'touchstart', this);
    eventOperation(window, 'touchend', this);
  }
  if (!this.scroller.options.disableMouse) {
    eventOperation(this.indicator, 'mousedown', this);
    eventOperation(window, 'mouseup', this);
  }
};

function pullDownMixin(BScroll) {
  BScroll.prototype._initPullDown = function () {
    // must watch scroll in real time
    this.options.probeType = PROBE_REALTIME;
  };

  BScroll.prototype._checkPullDown = function () {
    var _options$pullDownRefr = this.options.pullDownRefresh,
        _options$pullDownRefr2 = _options$pullDownRefr.threshold,
        threshold = _options$pullDownRefr2 === undefined ? 90 : _options$pullDownRefr2,
        _options$pullDownRefr3 = _options$pullDownRefr.stop,
        stop = _options$pullDownRefr3 === undefined ? 40 : _options$pullDownRefr3;

    // check if a real pull down action

    if (this.directionY !== DIRECTION_DOWN || this.y < threshold) {
      return false;
    }

    if (!this.pulling) {
      this.pulling = true;
      this.trigger('pullingDown');
    }
    this.scrollTo(this.x, stop, this.options.bounceTime, ease.bounce);

    return this.pulling;
  };

  BScroll.prototype.finishPullDown = function () {
    this.pulling = false;
    this.resetPosition(this.options.bounceTime, ease.bounce);
  };

  BScroll.prototype.openPullDown = function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.options.pullDownRefresh = config;
    this._initPullDown();
  };

  BScroll.prototype.closePullDown = function () {
    this.options.pullDownRefresh = false;
  };
}

function pullUpMixin(BScroll) {
  BScroll.prototype._initPullUp = function () {
    // must watch scroll in real time
    this.options.probeType = PROBE_REALTIME;

    this.pullupWatching = false;
    this._watchPullUp();
  };

  BScroll.prototype._watchPullUp = function () {
    if (this.pullupWatching) {
      return;
    }
    this.pullupWatching = true;
    this.on('scroll', this._checkToEnd);
  };

  BScroll.prototype._checkToEnd = function (pos) {
    var _this = this;

    var _options$pullUpLoad$t = this.options.pullUpLoad.threshold,
        threshold = _options$pullUpLoad$t === undefined ? 0 : _options$pullUpLoad$t;

    if (this.movingDirectionY === DIRECTION_UP && pos.y <= this.maxScrollY + threshold) {
      // reset pullupWatching status after scroll end.
      this.once('scrollEnd', function () {
        _this.pullupWatching = false;
      });
      this.trigger('pullingUp');
      this.off('scroll', this._checkToEnd);
    }
  };

  BScroll.prototype.finishPullUp = function () {
    var _this2 = this;

    if (this.pullupWatching) {
      this.once('scrollEnd', function () {
        _this2._watchPullUp();
      });
    } else {
      this._watchPullUp();
    }
  };

  BScroll.prototype.openPullUp = function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.options.pullUpLoad = config;
    this._initPullUp();
  };

  BScroll.prototype.closePullUp = function () {
    this.options.pullUpLoad = false;
    if (!this.pullupWatching) {
      return;
    }
    this.pullupWatching = false;
    this.off('scroll', this._checkToEnd);
  };
}

function mouseWheelMixin(BScroll) {
  BScroll.prototype._initMouseWheel = function () {
    var _this = this;

    this._handleMouseWheelEvent(addEvent);

    this.on('destroy', function () {
      clearTimeout(_this.mouseWheelTimer);
      _this._handleMouseWheelEvent(removeEvent);
    });

    this.firstWheelOpreation = true;
  };

  BScroll.prototype._handleMouseWheelEvent = function (eventOperation) {
    eventOperation(this.wrapper, 'wheel', this);
    eventOperation(this.wrapper, 'mousewheel', this);
    eventOperation(this.wrapper, 'DOMMouseScroll', this);
  };

  BScroll.prototype._onMouseWheel = function (e) {
    var _this2 = this;

    if (!this.enabled) {
      return;
    }
    e.preventDefault();

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    if (this.firstWheelOpreation) {
      this.trigger('scrollStart');
    }
    this.firstWheelOpreation = false;

    var _options$mouseWheel = this.options.mouseWheel,
        _options$mouseWheel$s = _options$mouseWheel.speed,
        speed = _options$mouseWheel$s === undefined ? 20 : _options$mouseWheel$s,
        _options$mouseWheel$i = _options$mouseWheel.invert,
        invert = _options$mouseWheel$i === undefined ? false : _options$mouseWheel$i,
        _options$mouseWheel$e = _options$mouseWheel.easeTime,
        easeTime = _options$mouseWheel$e === undefined ? 300 : _options$mouseWheel$e;


    clearTimeout(this.mouseWheelTimer);
    this.mouseWheelTimer = setTimeout(function () {
      if (!_this2.options.snap && !easeTime) {
        _this2.trigger('scrollEnd', {
          x: _this2.x,
          y: _this2.y
        });
      }
      _this2.firstWheelOpreation = true;
    }, 400);

    var wheelDeltaX = void 0;
    var wheelDeltaY = void 0;

    switch (true) {
      case 'deltaX' in e:
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * speed;
          wheelDeltaY = -e.deltaY * speed;
        } else {
          wheelDeltaX = -e.deltaX;
          wheelDeltaY = -e.deltaY;
        }
        break;
      case 'wheelDeltaX' in e:
        wheelDeltaX = e.wheelDeltaX / 120 * speed;
        wheelDeltaY = e.wheelDeltaY / 120 * speed;
        break;
      case 'wheelDelta' in e:
        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed;
        break;
      case 'detail' in e:
        wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed;
        break;
      default:
        return;
    }

    var direction = invert ? -1 : 1;
    wheelDeltaX *= direction;
    wheelDeltaY *= direction;

    if (!this.hasVerticalScroll) {
      wheelDeltaX = wheelDeltaY;
      wheelDeltaY = 0;
    }

    var newX = void 0;
    var newY = void 0;
    if (this.options.snap) {
      newX = this.currentPage.pageX;
      newY = this.currentPage.pageY;

      if (wheelDeltaX > 0) {
        newX--;
      } else if (wheelDeltaX < 0) {
        newX++;
      }

      if (wheelDeltaY > 0) {
        newY--;
      } else if (wheelDeltaY < 0) {
        newY++;
      }

      this._goToPage(newX, newY);
      return;
    }

    newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
    newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

    this.movingDirectionX = this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
    this.movingDirectionY = this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

    if (newX > this.minScrollX) {
      newX = this.minScrollX;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > this.minScrollY) {
      newY = this.minScrollY;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    this.scrollTo(newX, newY, easeTime, ease.swipe);
    this.trigger('scroll', {
      x: this.x,
      y: this.y
    });
  };
}

function zoomMixin(BScroll) {
  BScroll.prototype._initZoom = function () {
    var _options$zoom = this.options.zoom,
        _options$zoom$start = _options$zoom.start,
        start = _options$zoom$start === undefined ? 1 : _options$zoom$start,
        _options$zoom$min = _options$zoom.min,
        min = _options$zoom$min === undefined ? 1 : _options$zoom$min,
        _options$zoom$max = _options$zoom.max,
        max = _options$zoom$max === undefined ? 4 : _options$zoom$max;

    this.scale = Math.min(Math.max(start, min), max);
    this.setScale(this.scale);
    this.scrollerStyle[style.transformOrigin] = '0 0';
  };

  BScroll.prototype._zoomTo = function (scale, originX, originY, startScale) {
    this.scaled = true;

    var lastScale = scale / (startScale || this.scale);
    this.setScale(scale);

    this.refresh();

    var newX = Math.round(this.startX - (originX - this.relativeX) * (lastScale - 1));
    var newY = Math.round(this.startY - (originY - this.relativeY) * (lastScale - 1));

    if (newX > this.minScrollX) {
      newX = this.minScrollX;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > this.minScrollY) {
      newY = this.minScrollY;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    if (this.x !== newX || this.y !== newY) {
      this.scrollTo(newX, newY, this.options.bounceTime);
    }

    this.scaled = false;
  };

  BScroll.prototype.zoomTo = function (scale, x, y) {
    var _offsetToBody = offsetToBody(this.wrapper),
        left = _offsetToBody.left,
        top = _offsetToBody.top;

    var originX = x + left - this.x;
    var originY = y + top - this.y;
    this._zoomTo(scale, originX, originY);
  };

  BScroll.prototype._zoomStart = function (e) {
    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);

    this.startDistance = getDistance(deltaX, deltaY);
    this.startScale = this.scale;

    var _offsetToBody2 = offsetToBody(this.wrapper),
        left = _offsetToBody2.left,
        top = _offsetToBody2.top;

    this.originX = Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 + left - this.x;
    this.originY = Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 + top - this.y;

    this.trigger('zoomStart');
  };

  BScroll.prototype._zoom = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
    var distance = getDistance(deltaX, deltaY);
    var scale = distance / this.startDistance * this.startScale;

    this.scaled = true;

    var _options$zoom2 = this.options.zoom,
        _options$zoom2$min = _options$zoom2.min,
        min = _options$zoom2$min === undefined ? 1 : _options$zoom2$min,
        _options$zoom2$max = _options$zoom2.max,
        max = _options$zoom2$max === undefined ? 4 : _options$zoom2$max;


    if (scale < min) {
      scale = 0.5 * min * Math.pow(2.0, scale / min);
    } else if (scale > max) {
      scale = 2.0 * max * Math.pow(0.5, max / scale);
    }

    var lastScale = scale / this.startScale;

    var x = this.startX - (this.originX - this.relativeX) * (lastScale - 1);
    var y = this.startY - (this.originY - this.relativeY) * (lastScale - 1);

    this.setScale(scale);

    this.scrollTo(x, y, 0);
  };

  BScroll.prototype._zoomEnd = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.isInTransition = false;
    this.isAnimating = false;
    this.initiated = 0;

    var _options$zoom3 = this.options.zoom,
        _options$zoom3$min = _options$zoom3.min,
        min = _options$zoom3$min === undefined ? 1 : _options$zoom3$min,
        _options$zoom3$max = _options$zoom3.max,
        max = _options$zoom3$max === undefined ? 4 : _options$zoom3$max;


    var scale = this.scale > max ? max : this.scale < min ? min : this.scale;

    this._zoomTo(scale, this.originX, this.originY, this.startScale);

    this.trigger('zoomEnd');
  };
}

// import { ease } from '../util/ease'

// Number of items to instantiate beyond current view in the scroll direction.
var RUNWAY_ITEMS = 30;

// Number of items to instantiate beyond current view in the opposite direction.
var RUNWAY_ITEMS_OPPOSITE = 10;

// The animation interval (in ms) for fading in content from tombstones.
var ANIMATION_DURATION_MS = 200;

// The number of pixels of default additional length to allow scrolling to.
var DEFAULT_SCROLL_RUNWAY = 2000;

function infiniteMixin(BScroll) {
  BScroll.prototype._initInfinite = function () {
    this.options.probeType = 3;
    this.maxScrollY = -DEFAULT_SCROLL_RUNWAY;
    this.infiniteScroller = new InfiniteScroller(this, this.options.infinity);
  };
}

function isTombstoneNode(node) {
  if (node && node.classList) {
    return node.classList.contains('tombstone');
  }
}

function InfiniteScroller(scroller, options) {
  var _this = this;

  this.options = options;
  assert(typeof this.options.createTombstone === 'function', 'Infinite scroll need createTombstone Function to create tombstone');

  assert(typeof this.options.fetch === 'function', 'Infinite scroll need fetch Function to fetch new data.');

  assert(typeof this.options.render === 'function', 'Infinite scroll need render Function to render each item.');

  this.firstAttachedItem = 0;
  this.lastAttachedItem = 0;

  this.anchorScrollTop = 0;
  this.anchorItem = {
    index: 0,
    offset: 0
  };
  this.tombstoneHeight = 0;
  this.tombstoneWidth = 0;
  this.tombstones = [];

  this.items = [];
  this.loadedItems = 0;
  this.requestInProgress = false;
  this.hasMore = true;

  this.scroller = scroller;
  this.wrapperEl = this.scroller.wrapper;
  this.scrollerEl = this.scroller.scroller;
  this.scroller.on('scroll', function () {
    _this.onScroll();
  });
  this.scroller.on('resize', function () {
    _this.onResize();
  });

  this.onResize();
}

InfiniteScroller.prototype.onScroll = function () {
  var scrollTop = -this.scroller.y;
  var delta = scrollTop - this.anchorScrollTop;
  if (scrollTop === 0) {
    this.anchorItem = {
      index: 0,
      offset: 0
    };
  } else {
    this.anchorItem = this._calculateAnchoredItem(this.anchorItem, delta);
  }

  this.anchorScrollTop = scrollTop;
  var lastScreenItem = this._calculateAnchoredItem(this.anchorItem, this.wrapperEl.offsetHeight);

  var start = this.anchorItem.index;
  var end = lastScreenItem.index;
  if (delta < 0) {
    start -= RUNWAY_ITEMS;
    end += RUNWAY_ITEMS_OPPOSITE;
  } else {
    start -= RUNWAY_ITEMS_OPPOSITE;
    end += RUNWAY_ITEMS;
  }
  this.fill(start, end);
  this.maybeRequestContent();
};

InfiniteScroller.prototype.onResize = function () {
  var tombstone = this.options.createTombstone();
  tombstone.style.position = 'absolute';
  this.scrollerEl.appendChild(tombstone);
  tombstone.style.display = '';
  this.tombstoneHeight = tombstone.offsetHeight;
  this.tombstoneWidth = tombstone.offsetWidth;
  this.scrollerEl.removeChild(tombstone);

  for (var i = 0; i < this.items.length; i++) {
    this.items[i].height = this.items[i].width = 0;
  }

  this.onScroll();
};

InfiniteScroller.prototype.fill = function (start, end) {
  this.firstAttachedItem = Math.max(0, start);
  if (!this.hasMore) {
    end = Math.min(end, this.items.length);
  }
  this.lastAttachedItem = end;
  this.attachContent();
};

InfiniteScroller.prototype.maybeRequestContent = function () {
  var _this2 = this;

  if (this.requestInProgress || !this.hasMore) {
    return;
  }
  var itemsNeeded = this.lastAttachedItem - this.loadedItems;
  if (itemsNeeded <= 0) {
    return;
  }
  this.requestInProgress = true;
  this.options.fetch(itemsNeeded).then(function (items) {
    if (items) {
      _this2.addContent(items);
    } else {
      _this2.hasMore = false;
      var tombstoneLen = _this2._removeTombstones();
      var curPos = 0;
      if (_this2.anchorItem.index <= _this2.items.length) {
        curPos = _this2._fixScrollPosition();
        _this2._setupAnimations({}, curPos);
        _this2.scroller.resetPosition(_this2.scroller.options.bounceTime);
      } else {
        _this2.anchorItem.index -= tombstoneLen;
        curPos = _this2._fixScrollPosition();
        _this2._setupAnimations({}, curPos);
        _this2.scroller.stop();
        _this2.scroller.resetPosition();
        _this2.onScroll();
      }
    }
  });
};

InfiniteScroller.prototype.addContent = function (items) {
  this.requestInProgress = false;
  for (var i = 0; i < items.length; i++) {
    if (this.items.length <= this.loadedItems) {
      this._addItem();
    }
    this.items[this.loadedItems++].data = items[i];
  }
  this.attachContent();
  this.maybeRequestContent();
};

InfiniteScroller.prototype.attachContent = function () {
  var unusedNodes = this._collectUnusedNodes();
  var tombstoneAnimations = this._createDOMNodes(unusedNodes);
  this._cleanupUnusedNodes(unusedNodes);
  this._cacheNodeSize();
  var curPos = this._fixScrollPosition();
  this._setupAnimations(tombstoneAnimations, curPos);
};

InfiniteScroller.prototype._removeTombstones = function () {
  var markIndex = void 0;
  var tombstoneLen = 0;
  var itemLen = this.items.length;
  for (var i = 0; i < itemLen; i++) {
    var currentNode = this.items[i].node;
    var currentData = this.items[i].data;
    if ((!currentNode || isTombstoneNode(currentNode)) && !currentData) {
      if (!markIndex) {
        markIndex = i;
      }
      if (currentNode) {
        this.scrollerEl.removeChild(currentNode);
      }
    }
  }
  tombstoneLen = itemLen - markIndex;
  this.items.splice(markIndex);
  this.lastAttachedItem = Math.min(this.lastAttachedItem, this.items.length);
  return tombstoneLen;
};

InfiniteScroller.prototype._collectUnusedNodes = function () {
  var unusedNodes = [];
  for (var i = 0; i < this.items.length; i++) {
    // Skip the items which should be visible.
    if (i === this.firstAttachedItem) {
      i = this.lastAttachedItem - 1;
      continue;
    }
    var currentNode = this.items[i].node;
    if (currentNode) {
      if (isTombstoneNode(currentNode)) {
        // Cache tombstones for reuse
        this.tombstones.push(currentNode);
        this.tombstones[this.tombstones.length - 1].style.display = 'none';
      } else {
        unusedNodes.push(currentNode);
      }
    }
    this.items[i].node = null;
  }
  return unusedNodes;
};

InfiniteScroller.prototype._createDOMNodes = function (unusedNodes) {
  var tombstoneAnimations = {};
  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {
    while (this.items.length <= i) {
      this._addItem();
    }
    var currentNode = this.items[i].node;
    var currentData = this.items[i].data;
    if (currentNode) {
      if (isTombstoneNode(currentNode) && currentData) {
        currentNode.style.zIndex = 1;
        tombstoneAnimations[i] = [currentNode, this.items[i].top - this.anchorScrollTop];
        this.items[i].node = null;
      } else {
        continue;
      }
    }
    var node = currentData ? this.options.render(currentData, unusedNodes.pop()) : this._getTombStone();
    node.style.position = 'absolute';
    this.items[i].top = -1;
    this.scrollerEl.appendChild(node);
    this.items[i].node = node;
  }
  return tombstoneAnimations;
};

InfiniteScroller.prototype._cleanupUnusedNodes = function (unusedNodes) {
  while (unusedNodes.length) {
    this.scrollerEl.removeChild(unusedNodes.pop());
  }
};

InfiniteScroller.prototype._cacheNodeSize = function () {
  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {
    // Only cache the height if we have the real contents, not a placeholder.
    if (this.items[i].data && !this.items[i].height) {
      this.items[i].height = this.items[i].node.offsetHeight;
      this.items[i].width = this.items[i].node.offsetWidth;
    }
  }
};

InfiniteScroller.prototype._fixScrollPosition = function () {
  this.anchorScrollTop = 0;
  for (var _i = 0; _i < this.anchorItem.index; _i++) {
    this.anchorScrollTop += this.items[_i].height || this.tombstoneHeight;
  }
  this.anchorScrollTop += this.anchorItem.offset;

  // Position all nodes.
  var curPos = this.anchorScrollTop - this.anchorItem.offset;
  var i = this.anchorItem.index;
  while (i > this.firstAttachedItem) {
    curPos -= this.items[i - 1].height || this.tombstoneHeight;
    i--;
  }

  return curPos;
};

InfiniteScroller.prototype._setupAnimations = function (tombstoneAnimations, curPos) {
  var _this3 = this;

  for (var i in tombstoneAnimations) {
    var animation = tombstoneAnimations[i];
    this.items[i].node.style.transform = 'translateY(' + (this.anchorScrollTop + animation[1]) + 'px) scale(' + this.tombstoneWidth / this.items[i].width + ', ' + this.tombstoneHeight / this.items[i].height + ')';
    // Call offsetTop on the nodes to be animated to force them to apply current transforms.
    /* eslint-disable no-unused-expressions */
    this.items[i].node.offsetTop;
    animation[0].offsetTop;
    this.items[i].node.style.transition = 'transform ' + ANIMATION_DURATION_MS + 'ms';
  }

  for (var _i2 = this.firstAttachedItem; _i2 < this.lastAttachedItem; _i2++) {
    var _animation = tombstoneAnimations[_i2];
    if (_animation) {
      var tombstoneNode = _animation[0];
      tombstoneNode.style.transition = 'transform ' + ANIMATION_DURATION_MS + 'ms, opacity ' + ANIMATION_DURATION_MS + 'ms';
      tombstoneNode.style.transform = 'translateY(' + curPos + 'px) scale(' + this.items[_i2].width / this.tombstoneWidth + ', ' + this.items[_i2].height / this.tombstoneHeight + ')';
      tombstoneNode.style.opacity = 0;
    }
    if (curPos !== this.items[_i2].top) {
      if (!_animation) {
        this.items[_i2].node.style.transition = '';
      }
      this.items[_i2].node.style.transform = 'translateY(' + curPos + 'px)';
    }
    this.items[_i2].top = curPos;
    curPos += this.items[_i2].height || this.tombstoneHeight;
  }

  this.scroller.maxScrollY = -(curPos - this.wrapperEl.offsetHeight + (this.hasMore ? DEFAULT_SCROLL_RUNWAY : 0));

  setTimeout(function () {
    for (var _i3 in tombstoneAnimations) {
      var _animation2 = tombstoneAnimations[_i3];
      _animation2[0].style.display = 'none';
      // Tombstone can be recycled now.
      _this3.tombstones.push(_animation2[0]);
    }
  }, ANIMATION_DURATION_MS);
};

InfiniteScroller.prototype._getTombStone = function () {
  var tombstone = this.tombstones.pop();
  if (tombstone) {
    tombstone.style.display = '';
    tombstone.style.opacity = 1;
    tombstone.style.transform = '';
    tombstone.style.transition = '';
    return tombstone;
  }
  return this.options.createTombstone();
};

InfiniteScroller.prototype._addItem = function () {
  this.items.push({
    data: null,
    node: null,
    height: 0,
    width: 0,
    top: 0
  });
};

InfiniteScroller.prototype._calculateAnchoredItem = function (initialAnchor, delta) {
  if (delta === 0) {
    return initialAnchor;
  }
  var i = initialAnchor.index;
  var tombstones = 0;

  delta += initialAnchor.offset;
  if (delta < 0) {
    while (delta < 0 && i > 0 && this.items[i - 1].height) {
      delta += this.items[i - 1].height;
      i--;
    }
    tombstones = Math.max(-i, Math.ceil(Math.min(delta, 0) / this.tombstoneHeight));
  } else {
    while (delta > 0 && i < this.items.length && this.items[i].height && this.items[i].height < delta) {
      delta -= this.items[i].height;
      i++;
    }
    if (i >= this.items.length || !this.items[i].height) {
      tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneHeight);
    }
  }
  i += tombstones;
  delta -= tombstones * this.tombstoneHeight;

  return {
    index: i,
    offset: delta
  };
};

function BScroll(el, options) {
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
  if (!this.wrapper) {
    warn('Can not resolve the wrapper DOM.');
  }
  this.scroller = this.wrapper.children[0];
  if (!this.scroller) {
    warn('The wrapper need at least one child element to be scroller.');
  }
  // cache style for better performance
  this.scrollerStyle = this.scroller.style;

  this._init(el, options);
}

initMixin(BScroll);
coreMixin(BScroll);
eventMixin(BScroll);
snapMixin(BScroll);
wheelMixin(BScroll);
scrollbarMixin(BScroll);
pullDownMixin(BScroll);
pullUpMixin(BScroll);
mouseWheelMixin(BScroll);
zoomMixin(BScroll);
infiniteMixin(BScroll);

BScroll.Version = '1.12.4';

/* harmony default export */ var bscroll_esm = (BScroll);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/wheel/src/wheel.vue?vue&type=script&lang=js




/* harmony default export */ var wheelvue_type_script_lang_js = ({
  name: 'zaWheel',
  props: {
    prefixCls: {
      type: String,
      default: 'za-wheel'
    },
    dataSource: {
      type: Array,
      required: true
    },
    valueMember: {
      type: String,
      default: 'value'
    },
    itemRender: {
      type: Function,
      default: function _default(item) {
        return item.label;
      }
    },
    selectedValue: {
      type: [String, Number],
      default: ''
    },
    defaultValue: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      BScroll: bscroll_esm,
      wrapper: null,
      value: this.getValue()
    };
  },
  mounted: function mounted() {
    var _this = this;

    var prefixCls = this.prefixCls;

    this.BScroll = new bscroll_esm(this.$refs.wrapper, {
      wheel: {
        selectedIndex: 0,
        wheelWrapperClass: prefixCls + '-content',
        wheelItemClass: prefixCls + '-item',
        adjustTime: 100
      },
      probeType: 3
    });

    if (this.disabled) {
      this.BScroll.disable();
    }

    var initIndex = this.getWheelSelectedIndex(this.value, this.dataSource);
    this.BScroll.wheelTo(initIndex);
    this.BScroll.on('scroll', function () {
      _this.$emit('transition', true);
    });

    this.BScroll.on('scrollEnd', function () {
      _this.scollEnd();
    });
  },

  watch: {
    selectedValue: function selectedValue(val) {
      if (val === this.value) return;
      if (this.disabled) {
        this.BScroll.disable();
      }
      var newIndex = this.getWheelSelectedIndex(val, this.dataSource);
      this.BScroll.wheelTo(newIndex);
      this.value = val;
      this.$emit('reset', val, this.index);
    },
    dataSource: function dataSource(val) {
      var newIndex = this.getWheelSelectedIndex(this.value, val);
      this.BScroll.wheelTo(newIndex);
    }
  },
  updated: function updated() {
    this.BScroll.refresh();
  },
  destroy: function destroy() {
    this.BScroll.destroy();
  },

  methods: {
    getValue: function getValue() {
      return this.defaultValue || this.selectedValue || this.data && this.data.length && this.data[0][this.valueMember];
    },
    fireValueChange: function fireValueChange(value) {
      if (value === this.value) {
        return;
      }

      if ('value' in this) {
        this.value = value;
      }
      this.$emit('change', value, this.index);
    },
    getWheelSelectedIndex: function getWheelSelectedIndex(value, dataSource) {
      var valueMember = this.valueMember;

      var _index = 0;

      dataSource.filter(function (item, index) {
        if (item[valueMember] === value) {
          _index = index;
          return true;
        }
        return false;
      });
      return _index;
    },
    scollEnd: function scollEnd() {
      var dataSource = this.dataSource,
          valueMember = this.valueMember;

      var index = this.BScroll.getSelectedIndex();
      var child = dataSource[index];
      if (child) {
        this.fireValueChange(child[valueMember]);
        this.$emit('transition', this.BScroll.isInTransition);
      } else if (console.warn) {
        console.warn('child not found', dataSource, index);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/wheel/src/wheel.vue?vue&type=script&lang=js
 /* harmony default export */ var src_wheelvue_type_script_lang_js = (wheelvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/wheel/src/wheel.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_wheelvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var wheel = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/button/src/button.vue?vue&type=template&id=34d4d0b2&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{class:( _obj = {
  block: _vm.block,
  bordered: _vm.bordered,
  active: _vm.active,
  focus: _vm.focus,
  disabled: _vm.disabled,
}, _obj[("" + _vm.prefixCls)] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj[("size-" + _vm.size)] = !!_vm.size, _obj[("shape-" + _vm.shape)] = !!_vm.shape, _obj ),on:{"click":_vm.handleClick}},[_c('span',{class:(_vm.prefixCls + "-content")},[(_vm.loading)?_c('za-spinner',{staticClass:"rotate360"}):_vm._t("icon"),_vm._v(" "),_c('span',[_vm._t("default")],2)],2)])
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/button/src/button.vue?vue&type=template&id=34d4d0b2&lang=html

// EXTERNAL MODULE: ./src/spinner/index.js + 5 modules
var spinner = __webpack_require__(47);

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/button/src/button.vue?vue&type=script&lang=js




/* harmony default export */ var buttonvue_type_script_lang_js = ({
  name: 'zaButton',
  components: {
    zaSpinner: spinner["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-button'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'default'
    },
    size: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['xl', 'lg', 'sm', 'xs']),
      default: null
    },
    shape: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['radius', 'round', 'circle']),
      default: null
    },
    block: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {};
  },

  methods: {
    handleClick: function handleClick(event) {
      this.$emit('click', event);
    }
  }
});
// CONCATENATED MODULE: ./src/button/src/button.vue?vue&type=script&lang=js
 /* harmony default export */ var src_buttonvue_type_script_lang_js = (buttonvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/button/src/button.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_buttonvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_button = (component.exports);
// CONCATENATED MODULE: ./src/button/index.js


src_button.install = function (Vue) {
  Vue.component(src_button.name, src_button);
};

/* harmony default export */ var src_button_0 = __webpack_exports__["default"] = (src_button);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(97);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('observable');


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('asyncIterator');


/***/ }),
/* 70 */
/***/ (function(module, exports) {



/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(28);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(24);
var has = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(31);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(54).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(29);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(28);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(16)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(5);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(14);
var redefine = __webpack_require__(49);
var META = __webpack_require__(75).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(23);
var setToStringTag = __webpack_require__(30);
var uid = __webpack_require__(16);
var wks = __webpack_require__(7);
var wksExt = __webpack_require__(44);
var wksDefine = __webpack_require__(43);
var enumKeys = __webpack_require__(74);
var isArray = __webpack_require__(73);
var anObject = __webpack_require__(12);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(24);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(48);
var gOPNExt = __webpack_require__(72);
var $GOPD = __webpack_require__(71);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(20);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(54).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(28).f = $propertyIsEnumerable;
  __webpack_require__(40).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(17)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
__webpack_require__(70);
__webpack_require__(69);
__webpack_require__(68);
module.exports = __webpack_require__(3).Symbol;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(80);
var step = __webpack_require__(79);
var Iterators = __webpack_require__(25);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(50)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(81);
var global = __webpack_require__(2);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(25);
var TO_STRING_TAG = __webpack_require__(7)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
__webpack_require__(82);
module.exports = __webpack_require__(44).f('iterator');


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  on: function on(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback, { passive: false });
    } else {
        el.attachEvent('on ' + type, function () {
          callback.call(el);
        });
      }
  },
  off: function off(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback, { passive: false });
    } else {
        el.detachEvent('off ' + type, callback);
      }
  },
  once: function once(el, type, callback) {
    var typeArray = type.split(' ');
    var recursiveFunction = function recursiveFunction(e) {
      e.target.removeEventListener(e.type, recursiveFunction, { passive: false });
      return callback(e);
    };

    for (var i = typeArray.length - 1; i >= 0; i -= 1) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },
  stopPropagation: function stopPropagation(e) {
    e.stopPropagation();
  }
});

/***/ }),
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
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);

function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()([eventName].concat(params)));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        var _parent;

        (_parent = parent).$emit.apply(_parent, babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()([eventName].concat(params)));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(14);
var core = __webpack_require__(3);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(26);
var $keys = __webpack_require__(20);

__webpack_require__(88)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
module.exports = __webpack_require__(3).Object.keys;


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/input/src/input.vue?vue&type=template&id=e73b9938&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {
  disabled: _vm.disabled
  }, _obj[this.prefixCls] = true, _obj )},[(_vm.type === "date")?_c('div',{class:(_vm.prefixCls + "-placeholder")},[_vm._v(_vm._s(_vm.placeholder))]):_vm._e(),_vm._v(" "),(_vm.type === "textarea")?_c('textarea',{ref:"input",attrs:{"readonly":_vm.readonly,"placeholder":_vm.placeholder,"disabled":_vm.disabled,"maxLength":_vm.maxLength,"rows":_vm.rows},domProps:{"value":_vm.currentValue},on:{"input":_vm.onInput,"focus":_vm.onFocus,"blur":_vm.onBlur}}):_c('input',{ref:"input",attrs:{"readonly":_vm.readonly,"type":_vm.type,"placeholder":_vm.placeholder,"disabled":_vm.disabled,"maxLength":_vm.maxLength},domProps:{"value":_vm.currentValue},on:{"input":_vm.onInput,"focus":_vm.onFocus,"blur":_vm.onBlur,"compositionStart":_vm.handleComposition,"compositionUpdate":_vm.handleComposition,"compositionEnd":_vm.handleComposition}}),_vm._v(" "),(_vm.clearable)?_c('za-icon',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-clear")] = true, _obj$1[(_vm.prefixCls + "-clear-show")] = !!(_vm.focused && _vm.currentValue && _vm.currentValue.length > 0), _obj$1 ),attrs:{"type":"wrong-round-fill"},on:{"click":_vm.onClear}}):_vm._e(),_vm._v(" "),(_vm.showLength && _vm.maxLength)?_c('div',{class:(_vm.prefixCls + "-length")},[_vm._v(_vm._s((_vm.length + "/" + _vm.maxLength)))]):_vm._e()],1)
var _obj;
var _obj$1;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/input/src/input.vue?vue&type=template&id=e73b9938&lang=html

// EXTERNAL MODULE: external "autosize"
var external_autosize_ = __webpack_require__(99);
var external_autosize_default = /*#__PURE__*/__webpack_require__.n(external_autosize_);

// EXTERNAL MODULE: ./src/icon/src/icon.vue + 4 modules
var icon = __webpack_require__(15);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/input/src/input.vue?vue&type=script&lang=js





/* harmony default export */ var inputvue_type_script_lang_js = ({
  name: 'zaInput',
  components: {
    zaIcon: icon["a" /* default */]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-input'
    },
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    value: [String, Number],
    maxLength: [String, Number],
    rows: {
      type: [String, Number],
      default: 2
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: Boolean,
      default: false
    },
    showLength: {
      type: Boolean,
      default: false
    },
    readonly: Boolean,
    clearable: Boolean
  },
  data: function data() {
    return {
      focused: this.focused || false,
      currentValue: this.value || ''
    };
  },

  computed: {
    length: function length() {
      return this.currentValue.length;
    }
  },
  watch: {
    'value': function value(val, oldValue) {
      this.setCurrentValue(val);
    }
  },
  methods: {
    onInput: function onInput(event) {
      var value = event.target.value;
      if (this.clearable && this.currentValue) {
        this.focused = true;
      }
      this.currentValue = value;
      this.$emit('input', value);
      this.$emit('change', value);
    },
    setCurrentValue: function setCurrentValue(value) {
      var _this = this;

      if (value === this.currentValue) return;
      if (this.type === 'textarea') {
        this.$nextTick(function (_) {
          _this.updateAutosize();
        });
      }
      this.currentValue = value;
    },
    onFocus: function onFocus(event) {
      if (this.clearable && this.currentValue) {
        this.focused = true;
      }
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      if (this.clearable) {
        this.focused = false;
      }
      this.$emit('blur', event);
    },
    handleComposition: function handleComposition(e) {
      if (e.type === 'compositionstart') {
        this.isOnComposition = true;
        this.$emit('compositionStart', e);
      }

      if (e.type === 'compositionupdate') {
        this.$emit('compositionUpdate', e);
      }

      if (e.type === 'compositionend') {
        this.isOnComposition = false;
        var value = e.target.value;
        this.$emit('compositionEnd', e);
        this.$emit('change', value);
      }
    },
    initAutosize: function initAutosize() {
      if (this.autosize) {
        external_autosize_default()(this.$refs.input);
      }
    },
    destroyAutosize: function destroyAutosize() {
      if (this.autosize) {
        external_autosize_default.a.destroy(this.$refs.input);
      }
    },
    updateAutosize: function updateAutosize() {
      if (this.autosize) {
        external_autosize_default.a.update(this.$refs.input);
      }
    },
    onClear: function onClear() {
      this.blurFromClear = true;
      this.currentValue = '';
      if (!this.isOnComposition) {
        this.focus();
      }
      this.$emit('clear', this.currentValue);
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    focus: function focus() {
      this.$refs.input.focus();
    }
  },
  mounted: function mounted() {
    if (this.type === 'textarea') {
      this.initAutosize();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.type === 'textarea') {
      this.destroyAutosize();
    }
  }
});
// CONCATENATED MODULE: ./src/input/src/input.vue?vue&type=script&lang=js
 /* harmony default export */ var src_inputvue_type_script_lang_js = (inputvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/input/src/input.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_inputvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var input = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/date-picker/src/date-picker.vue?vue&type=template&id=09b4b8b9&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[(_vm.prefixCls + "-block")] = _vm.isSelect, _obj ),on:{"click":_vm.handleClick}},[(_vm.isSelect)?_c('div',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-input")] = true, _obj$1[(_vm.prefixCls + "-placeholder")] = !_vm.date, _obj$1[(_vm.prefixCls + "-disabled")] = !!_vm.disabled, _obj$1 )},[_c('input',{attrs:{"type":"hidden"},domProps:{"value":_vm.date}}),_vm._v("\n      "+_vm._s(_vm.date ? _vm.formatFn(_vm.date) : _vm.placeholder)+"\n    ")]):_vm._e(),_vm._v(" "),_c('div',{class:( _obj$2 = {}, _obj$2[(_vm.prefixCls + "-container")] = true, _obj$2[_vm.customCls] = !!_vm.customCls, _obj$2 ),on:{"click":function($event){$event.stopPropagation();return (function () {})($event)}}},[_c('za-popup',{staticClass:"za-popup-inner",attrs:{"visible":_vm.currentVisible,"closeOnClickModal":_vm.closeOnClickModal},on:{"close":_vm.onMaskClick}},[_c('div',{class:(_vm.prefixCls + "-wrapper")},[_c('div',{class:(_vm.prefixCls + "-header")},[_c('div',{class:(_vm.prefixCls + "-cancel"),on:{"click":_vm.onCancel}},[_vm._v(_vm._s(_vm.cancelText))]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-title")},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-submit"),on:{"click":_vm.onOk}},[_vm._v(_vm._s(_vm.okText))])]),_vm._v(" "),_c('za-date-picker-view',{attrs:{"title":_vm.title,"placeholder":_vm.placeholder,"mode":_vm.mode,"min":_vm.min,"max":_vm.max,"value":_vm.date,"minuteStep":_vm.minuteStep},on:{"init":_vm.onInit,"cancel":_vm.onCancel,"change":_vm.onValueChange,"transition":_vm.onTransition}})],1)])],1)])
var _obj;
var _obj$1;
var _obj$2;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/date-picker/src/date-picker.vue?vue&type=template&id=09b4b8b9&lang=html

// EXTERNAL MODULE: ./src/popup/index.js + 5 modules
var popup = __webpack_require__(51);

// EXTERNAL MODULE: ./src/date-picker-view/index.js + 6 modules
var date_picker_view = __webpack_require__(102);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(38);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/object/keys.js
var keys = __webpack_require__(52);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// CONCATENATED MODULE: ./src/date-picker-view/src/util.js


function getFormatter(type) {
  var formatter = void 0;
  if (type === 'year') {
    formatter = 'yyyy年';
  } else if (type === 'month') {
    formatter = 'yyyy-MM';
  } else if (type === 'time') {
    formatter = 'HH:mm';
  } else if (type === 'datetime') {
    formatter = 'yyyy-MM-dd HH:mm';
  } else {
    formatter = 'yyyy-MM-dd';
  }
  return formatter;
}

function util_formatDate(date, fmt) {
  if (!date || !fmt) {
    return date;
  }

  date = new Date(date.toString().replace(/-/g, '/'));

  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds() };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ('' + date.getFullYear()).substr(4 - RegExp.$1.length));
  }

  keys_default()(o).forEach(function (k) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  });
  return fmt;
}

function util_formatFn(instance, value) {
  var format = instance.format;

  var type = typeof format === 'undefined' ? 'undefined' : typeof_default()(format);

  if (format && type === 'string') {
    return util_formatDate(value, format) || '';
  }

  if (type === 'function') {
    return format(value) || '';
  }

  return util_formatDate(value, getFormatter(instance.mode)) || '';
}

function formatValue(instance, value) {
  var valueFormat = instance.valueFormat;

  var type = typeof valueFormat === 'undefined' ? 'undefined' : typeof_default()(valueFormat);

  if (valueFormat && type === 'string') {
    return util_formatDate(value, valueFormat) || '';
  }
  if (type === 'function') {
    return valueFormat(value) || '';
  }
  return util_formatDate(value, getFormatter(instance.mode)) || '';
}
// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/date-picker/src/date-picker.vue?vue&type=script&lang=js






var isExtendDate = function isExtendDate(date) {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
};

/* harmony default export */ var date_pickervue_type_script_lang_js = ({
  name: 'zaDatePicker',
  components: {
    zaPopup: popup["default"],
    zaDatePickerView: date_picker_view["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-picker'
    },
    title: {
      type: String,
      default: '请选择'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    displayMember: {
      type: String,
      default: 'label'
    },
    valueMember: {
      type: String,
      default: 'value'
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    defaultValue: '',
    value: '',
    mode: String,
    format: [String, Function],
    valueFormat: String,
    min: {},
    max: {},
    customCls: String
  },
  data: function data() {
    return {
      isSelect: this.$options.name === 'zaDateSelect',
      currentVisible: this.visible,
      date: '',
      oldDate: ''
    };
  },
  created: function created() {
    var date = this.value && isExtendDate(this.value);
    var defaultDate = this.defaultValue && isExtendDate(this.defaultValue);
    this.date = defaultDate || date;
    this.oldDate = this.date;
  },

  watch: {
    visible: function visible(val, oldVal) {
      if (this.currentVisible === val) return;
      this.currentVisible = val;
    },
    value: function value(val, oldVal) {
      if (this.date === val) return;
      this.date = isExtendDate(val);
      this.oldDate = this.date;
    }
  },
  methods: {
    handleClick: function handleClick(event) {
      if (this.disabled) return;
      this.$emit('click', event);
      this.toggle();
    },
    onMaskClick: function onMaskClick(reason) {
      if (reason === 'clickaway') {
        this.onCancel();
      }
    },
    onCancel: function onCancel() {
      this.toggle();
      this.date = this.value || this.oldDate;
      this.$emit('cancel', this.date);
    },
    onOk: function onOk() {
      if (this.isScrolling) {
        return false;
      }
      var value = this.date || this.initDate;
      var formatDate = formatValue(this, value);
      this.date = value;
      this.oldDate = this.date;
      this.$emit('ok', this.valueFormat ? formatDate : value);
      this.$emit('input', this.valueFormat ? formatDate : value);
      this.toggle();
    },
    toggle: function toggle() {
      if (this.disabled) {
        return;
      }

      this.currentVisible = !this.currentVisible;
      this.$emit('update:visible', this.currentVisible);
    },
    formatFn: function formatFn(date) {
      return util_formatFn(this, date);
    },
    onTransition: function onTransition(isScrolling) {
      this.isScrolling = isScrolling;
    },
    close: function close(key) {
      this['' + key] = false;
    },
    onInit: function onInit(selected) {
      this.initDate = selected;
      this.$emit('init', selected);
    },
    onValueChange: function onValueChange(newValue) {
      this.date = newValue;
      var formatDate = formatValue(this, newValue);
      this.$emit('change', this.valueFormat ? formatDate : newValue);
    }
  }
});
// CONCATENATED MODULE: ./src/date-picker/src/date-picker.vue?vue&type=script&lang=js
 /* harmony default export */ var src_date_pickervue_type_script_lang_js = (date_pickervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/date-picker/src/date-picker.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_date_pickervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var date_picker = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/picker/src/picker.vue?vue&type=template&id=2b1c9422&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[(_vm.prefixCls + "-block")] = _vm.isSelect, _obj ),on:{"click":_vm.handleClick}},[(_vm.isSelect)?_c('div',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-input")] = true, _obj$1[(_vm.prefixCls + "-placeholder")] = !_vm.selectedValue.join(_vm.displayAddon), _obj$1[(_vm.prefixCls + "-disabled")] = !!_vm.disabled, _obj$1 )},[_c('input',{attrs:{"type":"hidden"},domProps:{"value":_vm.currentValue}}),_vm._v("\n      "+_vm._s(_vm.display() || _vm.placeholder)+"\n    ")]):_vm._e(),_vm._v(" "),_c('div',{class:( _obj$2 = {}, _obj$2[(_vm.prefixCls + "-container")] = true, _obj$2[_vm.customCls] = !!_vm.customCls, _obj$2 ),on:{"click":function($event){$event.stopPropagation();return (function () {})($event)}}},[_c('za-popup',{staticClass:"za-popup-inner",attrs:{"visible":_vm.currentVisible,"closeOnClickModal":_vm.closeOnClickModal},on:{"close":_vm.onMaskClick}},[_c('div',{class:(_vm.prefixCls + "-wrapper")},[_c('div',{class:(_vm.prefixCls + "-header")},[_c('div',{class:(_vm.prefixCls + "-cancel"),on:{"click":_vm.handleCancel}},[_vm._v(_vm._s(_vm.cancelText))]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-title")},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-submit"),on:{"click":_vm.handleOk}},[_vm._v(_vm._s(_vm.okText))])]),_vm._v(" "),_c('za-picker-view',{attrs:{"prefixCls":_vm.prefixCls,"value":_vm.selectedValue,"valueMember":_vm.valueMember,"dataSource":_vm.dataSource,"cols":_vm.cols,"selectedValue":_vm.selectedValue,"itemRender":_vm.itemRender},on:{"change":_vm.onChange,"transition":_vm.onTransition}})],1)])],1)])
var _obj;
var _obj$1;
var _obj$2;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/picker/src/picker.vue?vue&type=template&id=2b1c9422&lang=html

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(38);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/picker/src/utils.js


function getFormatter(type) {
  var formatter = void 0;
  if (type === 'year') {
    formatter = 'YYYY[年]';
  } else if (type === 'month') {
    formatter = 'YYYY-MM';
  } else if (type === 'time') {
    formatter = 'HH:mm';
  } else if (type === 'datetime') {
    formatter = 'YYYY-MM-DD HH:mm';
  } else {
    formatter = 'YYYY-MM-DD';
  }
  return formatter;
}

function isEmptyArray(a) {
  return !a || !a.length;
}

function formatFn(instance, value) {
  var format = instance.props.format;

  var type = typeof format === 'undefined' ? 'undefined' : typeof_default()(format);

  if (type === 'string') {
    return value.format(format);
  }

  if (type === 'function') {
    return format(value);
  }

  return value.format(getFormatter(instance.props.mode));
}

function isChildrenEqual(c1, c2, pure) {
  if (isEmptyArray(c1) && isEmptyArray(c2)) {
    return true;
  }
  if (pure) {
    return c1 === c2;
  }
  if (c1.length !== c2.length) {
    return false;
  }
  var len = c1.length;
  for (var i = 0; i < len; i += 1) {
    if (c1[i].value !== c2[i].value || c1[i].label !== c2[i].label) {
      return false;
    }
  }
  return true;
}

function arrayTreeFilter(data, filterFn, options) {
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'children';
  var children = data || [];
  var result = [];
  var level = 0;

  var filterInnerFn = function filterInnerFn(item) {
    return filterFn(item, level);
  };

  do {
    var foundItem = children.filter(filterInnerFn)[0];
    if (!foundItem) {
      break;
    }
    result.push(foundItem);
    children = foundItem[options.childrenKeyName] || [];
    level += 1;
  } while (children.length > 0);
  return result;
}

function formatToInit(data, member, cols) {
  var _data = data || [];
  var result = [];
  var level = 0;

  while (_data) {
    var foundValue = _data[member];

    if (!foundValue) {
      break;
    }

    if (cols && level >= cols) {
      break;
    }

    result.push(foundValue);
    if (Object.prototype.hasOwnProperty.call(_data, 'children')) {
      _data = _data.children[0];
    } else {
      break;
    }
    level += 1;
  }

  return result;
}

var filterValue = function filterValue(dataSource, value, member, level) {
  return dataSource.filter(function (item) {
    return item[member] === value[level];
  })[0];
};

function formatBackToObject(data, value, cascade, member, cols) {
  if (!cascade) {
    var _result = data.map(function (item, index) {
      return item.filter(function (itemInner) {
        return itemInner[member] === value[index];
      })[0];
    });
    return value.length === 1 ? _result[0] : _result;
  }

  var _data = data || [];
  var result = [];
  var level = 0;

  while (_data) {
    var curValue = filterValue(_data, value, member, level);
    if (!curValue) {
      break;
    }

    if (cols && level >= cols) {
      break;
    }

    result.push(curValue);
    if (Object.prototype.hasOwnProperty.call(curValue, 'children')) {
      _data = curValue.children;
    } else {
      break;
    }
    level += 1;
  }
  return result;
}

function isArray(data) {
  return Object.prototype.toString.call(data) === '[object Array]';
}

function hasChildrenObject(data) {
  return Object.prototype.hasOwnProperty.call(data, 'children') && Object.prototype.toString.call(data.children) !== '[object String]';
}
// EXTERNAL MODULE: ./src/popup/index.js + 5 modules
var popup = __webpack_require__(51);

// EXTERNAL MODULE: ./src/picker-view/index.js + 5 modules
var picker_view = __webpack_require__(101);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/picker/src/picker.vue?vue&type=script&lang=js






/* harmony default export */ var pickervue_type_script_lang_js = ({
  name: 'zaPicker',
  components: {
    zaPopup: popup["default"],
    zaPickerView: picker_view["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-picker'
    },
    title: {
      type: String,
      default: '请选择'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    visible: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },

    dataSource: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    displayMember: {
      type: String,
      default: 'label'
    },
    valueMember: {
      type: String,
      default: 'value'
    },
    defaultValue: [String, Array, Number],
    value: [String, Array, Number],
    displayAddon: {
      type: String,
      default: ''
    },
    displayRender: Function,
    customCls: String,
    cols: Number,
    itemRender: {
      type: Function,
      default: function _default(data) {
        return data.label;
      }
    }
  },
  data: function data() {
    var defaultValue = this.getInitValue();
    return {
      isSelect: this.$options.name === 'zaSelect',
      currentValue: defaultValue,
      currentVisible: this.visible,
      oldValue: defaultValue
    };
  },

  computed: {
    cascade: function cascade() {
      var dataSource = this.dataSource;

      return dataSource.length && !isArray(dataSource[0]) && hasChildrenObject(dataSource[0]);
    },
    data: function data() {
      var dataSource = this.dataSource;

      if (this.isSingleColumn) {
        return [this.dataSource];
      }
      return dataSource;
    },
    selectedValue: function selectedValue() {
      return this.isSingleColumn && !isArray(this.currentValue) ? [this.currentValue] : this.currentValue;
    },
    isSingleColumn: function isSingleColumn() {
      var dataSource = this.dataSource;

      return dataSource.length && !isArray(dataSource[0]) && !hasChildrenObject(dataSource[0]);
    }
  },
  watch: {
    visible: function visible(val, oldVal) {
      if (this.currentVisible === val) return;
      this.currentVisible = val;
    },
    value: function value(val, oldVal) {
      if (this.currentValue === val) return;
      this.currentValue = isArray(val) ? val : [val];
      this.oldValue = this.currentValue;
    }
  },
  methods: {
    getInitValue: function getInitValue() {
      var initValue = this.value || this.defaultValue || [];

      if (this.isSingleColumn) {
        return isArray(initValue) ? initValue : [initValue];
      }
      return initValue;
    },
    onChange: function onChange(selected) {
      var valueMember = this.valueMember;

      var value = selected.map(function (item) {
        return item[valueMember];
      });
      this.currentValue = this.isSingleColumn ? value[0] : value;
      this.$emit('change', this.currentValue);
    },
    handleCancel: function handleCancel() {
      this.toggle();
      this.currentValue = this.oldValue;
    },
    handleOk: function handleOk() {
      if (this.isScrolling) {
        return false;
      }
      this.toggle();
      var valueMember = this.valueMember,
          cols = this.cols,
          data = this.data,
          cascade = this.cascade;

      this.currentValue = this.getValue();
      this.oldValue = this.currentValue;

      var selectedValue = this.currentValue;
      if (!isArray(selectedValue)) {
        selectedValue = [selectedValue];
      }
      var _value = formatBackToObject(data, selectedValue, cascade, valueMember, cols);
      this.$emit('ok', _value);
      this.$emit('input', this.currentValue);
    },
    getValue: function getValue() {
      var valueMember = this.valueMember,
          data = this.data,
          currentValue = this.currentValue,
          cols = this.cols;

      if (!currentValue || !currentValue.length) {
        if (this.cascade) {
          return formatToInit(data[0], valueMember, cols);
        }
        return data.map(function (d) {
          return d[0][valueMember];
        });
      }
      return currentValue;
    },
    display: function display() {
      var _this = this;

      var currentValue = this.currentValue,
          data = this.data;

      if (this.cascade) {
        if (currentValue.length) {
          var treeChildren = arrayTreeFilter(data, function (item, level) {
            return item[_this.valueMember] === currentValue[level];
          });
          return this.displayGenerator(treeChildren);
        }
      }

      var treeChildren2 = data.map(function (d, index) {
        if (!isArray(currentValue)) {
          return d.filter(function (obj) {
            return currentValue === obj[_this.valueMember];
          })[0];
        }
        if (isArray(currentValue) && currentValue[index]) {
          return d.filter(function (obj) {
            return currentValue[index] === obj[_this.valueMember];
          })[0];
        }
        return undefined;
      }).filter(function (t) {
        return !!t;
      });

      return this.displayGenerator(treeChildren2);
    },
    displayGenerator: function displayGenerator(value) {
      var displayRender = this.displayRender,
          displayMember = this.displayMember,
          displayAddon = this.displayAddon;

      if (typeof displayRender === 'function') {
        return displayRender(value);
      }
      return value.map(function (v) {
        return v && v[displayMember];
      }).join(displayAddon);
    },
    handleClick: function handleClick(event) {
      if (this.disabled) return;
      this.$emit('click', event);
      this.toggle();
    },
    onMaskClick: function onMaskClick(reason) {
      if (reason === 'clickaway') {
        this.handleCancel();
      }
    },
    toggle: function toggle() {
      if (this.disabled) {
        return;
      }

      this.currentVisible = !this.currentVisible;
      this.$emit('update:visible', this.currentVisible);
    },
    onTransition: function onTransition(isScrolling) {
      this.isScrolling = isScrolling;
    }
  }
});
// CONCATENATED MODULE: ./src/picker/src/picker.vue?vue&type=script&lang=js
 /* harmony default export */ var src_pickervue_type_script_lang_js = (pickervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/picker/src/picker.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_pickervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var picker = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/cell/src/cell.vue?vue&type=template&id=f85f0920&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {
    disabled: _vm.disabled,
    'is-link': !_vm.disabled && !!_vm.isLink,
    'has-icon': !!_vm.hasIcon,
    'has-arrow': _vm.hasArrow,
    }, _obj[this.prefixCls] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj ),on:{"click":_vm.handleClick}},[_c('div',{class:(_vm.prefixCls + "-inner")},[_c('div',{class:(_vm.prefixCls + "-header")},[(_vm.$slots.icon)?_c('div',{class:(_vm.prefixCls + "-icon")},[_vm._t("icon")],2):_vm._e()]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-body")},[(_vm.$slots.title || _vm.title)?_c('div',{class:(_vm.prefixCls + "-title")},[_vm._t("title"),_vm._v(" "),(!_vm.$slots.title)?[_vm._v(_vm._s(_vm.title))]:_vm._e()],2):_vm._e(),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-content")},[_vm._t("default")],2)]),_vm._v(" "),(_vm.$slots.description || _vm.description)?_c('div',{class:(_vm.prefixCls + "-footer")},[_vm._t("description"),_vm._v(" "),(!_vm.$slots.description)?[_vm._v(_vm._s(_vm.description))]:_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.hasArrow)?_c('div',{class:(_vm.prefixCls + "-arrow")}):_vm._e()]),_vm._v(" "),(_vm.$slots.help || _vm.help)?_c('div',{class:(_vm.prefixCls + "-help")},[_vm._t("help"),_vm._v(" "),(!_vm.$slots.help)?[_vm._v(_vm._s(_vm.help))]:_vm._e()],2):_vm._e()])
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/cell/src/cell.vue?vue&type=template&id=f85f0920&lang=html

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/cell/src/cell.vue?vue&type=script&lang=js


/* harmony default export */ var cellvue_type_script_lang_js = ({
  name: 'zaCell',
  props: {
    prefixCls: {
      type: String,
      default: 'za-cell'
    },
    hasArrow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    theme: String,
    title: String,
    help: String,
    description: String
  },
  computed: {
    hasIcon: function hasIcon() {
      return this.$slots && this.$slots.icon && this.$slots.icon.length > 0;
    }
  },
  methods: {
    handleClick: function handleClick(event) {
      this.$emit('click', event);
    }
  }
});
// CONCATENATED MODULE: ./src/cell/src/cell.vue?vue&type=script&lang=js
 /* harmony default export */ var src_cellvue_type_script_lang_js = (cellvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/cell/src/cell.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_cellvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var cell = (component.exports);
// CONCATENATED MODULE: ./src/cell/index.js


cell.install = function (Vue) {
  Vue.component(cell.name, cell);
};

/* harmony default export */ var src_cell = __webpack_exports__["default"] = (cell);

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/modal/src/modal.vue?vue&type=template&id=41dbc255&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {
  radius: _vm.radius,
  }, _obj[("" + _vm.prefixCls)] = true, _obj[("fade-" + _vm.animationState)] = true, _obj ),style:(_vm.modalStyle)},[_c('div',{class:(_vm.prefixCls + "-wrapper")},[_c('div',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-dialog")] = true, _obj$1[(_vm.animationType + "-" + _vm.animationState)] = true, _obj$1[("fade-" + _vm.animationState)] = true, _obj$1 ),style:(_vm.dialogStyle),on:{"click":function (e) { return e.stopPropagation(); }}},[(_vm.$slots.title || _vm.title)?_c('div',{class:(_vm.prefixCls + "-header")},[_c('div',{class:(_vm.prefixCls + "-header-title")},[_vm._t("title"),_vm._v(" "),(!_vm.$slots.header)?[_vm._v(_vm._s(_vm.title))]:_vm._e()],2),_vm._v(" "),(_vm.showClose)?_c('div',{class:(_vm.prefixCls + "-header-close"),on:{"click":_vm.handleClose}},[_c('za-icon',{attrs:{"type":"wrong"}})],1):_vm._e()]):_vm._e(),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-body")},[_vm._t("default")],2),_vm._v(" "),(_vm.$slots.footer)?_c('div',{class:(_vm.prefixCls + "-footer")},[_vm._t("footer")],2):_vm._e()])]),_vm._v(" "),_c('za-mask',{attrs:{"visible":_vm.maskVisible,"type":_vm.maskType},on:{"mask-close":_vm.onMaskClose}})],1)
var _obj;
var _obj$1;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/modal/src/modal.vue?vue&type=template&id=41dbc255&lang=html

// EXTERNAL MODULE: ./src/mask/index.js + 5 modules
var mask = __webpack_require__(36);

// EXTERNAL MODULE: ./src/icon/index.js
var icon = __webpack_require__(39);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/modal/src/modal.vue?vue&type=script&lang=js




/* harmony default export */ var modalvue_type_script_lang_js = ({
  name: 'zaModal',
  components: {
    zaMask: mask["default"],
    zaIcon: icon["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-modal'
    },
    visible: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Boolean,
      default: false
    },
    animationType: {
      type: String,
      validator: function validator(v) {
        return ['fade', 'door', 'flip', 'rotate', 'zoom', 'moveUp', 'moveDown', 'moveLeft', 'moveRight', 'slideUp', 'slideDown', 'slideLeft', 'slideRight'].indexOf(v) >= 0;
      },
      default: 'zoom'
    },
    maskType: {
      type: String,
      validator: function validator(v) {
        return ['transparent', 'light', 'normal', 'dark'].indexOf(v) >= 0;
      },
      default: 'normal'
    },
    animationDuration: {
      type: Number,
      default: 200
    },
    width: {
      type: [String, Number],
      default: '70%'
    },
    minWidth: {
      type: Number,
      default: 270
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    title: String,
    showClose: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modalStyle: function modalStyle() {
      return {
        display: !this.currentVisible ? 'none' : '',
        WebkitAnimationDuration: this.animationDuration + 'ms',
        animationDuration: this.animationDuration + 'ms'
      };
    },
    dialogStyle: function dialogStyle() {
      return {
        width: this.width,
        minWidth: this.minWidth,
        WebkitAnimationDuration: this.animationDuration + 'ms',
        animationDuration: this.animationDuration + 'ms'
      };
    }
  },
  watch: {
    visible: function visible(value, oldValue) {
      var _this = this;

      if (value === this.currentVisible) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (value) {
        this.enter();
      } else {
        this.animationState = 'leave';
        this.timer = setTimeout(function () {
          _this.currentVisible = value;
          _this.maskVisible = false;
        }, this.animationDuration);
      }
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible,
      animationState: 'enter',
      maskVisible: this.visible
    };
  },

  methods: {
    enter: function enter() {
      this.currentVisible = true;
      this.maskVisible = true;
      this.animationState = 'enter';
    },
    leave: function leave(reason, event) {
      var _this2 = this;

      this.animationState = 'leave';
      this.$emit('update:visible', false);
      this.$emit('close', reason, event);

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(function () {
        _this2.currentVisible = false;
        _this2.maskVisible = false;
      }, this.animationDuration);
    },
    onMaskClose: function onMaskClose(event) {
      if (!this.closeOnClickModal) return;

      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.leave('clickaway', event);
    },
    handleClose: function handleClose(event) {
      this.leave('close', event);
    }
  },
  mounted: function mounted() {
    if (this.currentVisible) {
      this.enter();
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.timer);
  }
});
// CONCATENATED MODULE: ./src/modal/src/modal.vue?vue&type=script&lang=js
 /* harmony default export */ var src_modalvue_type_script_lang_js = (modalvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/modal/src/modal.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_modalvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var modal = (component.exports);
// CONCATENATED MODULE: ./src/modal/index.js


modal.install = function (Vue) {
  Vue.component(modal.name, modal);
};

/* harmony default export */ var src_modal = __webpack_exports__["default"] = (modal);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (function (node) {
  return (typeof node === 'undefined' ? 'undefined' : babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(node)) === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions');
});

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = require("autosize");

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/keyboard/src/keyboard.vue?vue&type=template&id=548b180b&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefixCls,on:{"click":function($event){$event.stopPropagation();return (function () {})($event)}}},[_c('div',{class:(_vm.prefixCls + "-keys")},_vm._l((_vm.getKeys()),function(text,index){return _c('div',{key:index,class:( _obj = {}, _obj[(_vm.prefixCls + "-item")] = true, _obj[(_vm.prefixCls + "-item-disabled")] = text.length === 0, _obj ),on:{"click":function($event){_vm.onKeyClick(text)}}},[(text === 'close')?[_c('za-icon',{attrs:{"type":"keyboard"}})]:[_vm._v("\n            "+_vm._s(text)+"\n        ")]],2)
var _obj;})),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-handle")},[_c('div',{class:( _obj = {}, _obj[(_vm.prefixCls + "-item")] = true, _obj[(_vm.prefixCls + "-item-delete")] = true, _obj ),on:{"touchstart":function($event){_vm.onLongPressIn('delete')},"touchend":_vm.onLongPressOut}},[_c('za-icon',{attrs:{"type":"deletekey"}})],1),_vm._v(" "),_c('div',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-item")] = true, _obj$1[(_vm.prefixCls + "-item-ok")] = true, _obj$1 ),on:{"click":function($event){_vm.onKeyClick('ok')}}},[_vm._v("确定")])])])
var _obj;
var _obj$1;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/keyboard/src/keyboard.vue?vue&type=template&id=548b180b&lang=html

// EXTERNAL MODULE: ./src/icon/index.js
var icon = __webpack_require__(39);

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/keyboard/src/keyboard.vue?vue&type=script&lang=js





var NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'close'];
var PRICE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'close'];
var IDCARD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'x', '0', 'close'];

/* harmony default export */ var keyboardvue_type_script_lang_js = ({
  name: 'zaKeyboard',
  props: {
    prefixCls: {
      type: String,
      default: 'za-keyboard'
    },
    type: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['number', 'price', 'idcard']),
      default: 'number'
    }
  },
  data: function data() {
    return {
      longPressTimer: null,
      pressBegin: 0,
      pressEnd: 800,
      longPressClick: null
    };
  },

  components: {
    zaIcon: icon["default"]
  },
  methods: {
    onLongPressIn: function onLongPressIn(key) {
      var self = this;
      self.$emit('keyClick', key);
      self.longPressTimer = setTimeout(function () {
        self.longPressTimer = setInterval(function () {
          self.$emit('keyClick', key);
        }, 100);
      }, 800);
    },
    onLongPressOut: function onLongPressOut() {
      clearInterval(this.longPressTimer);
    },
    onKeyClick: function onKeyClick(key) {
      if (key.length === 0) {
        return;
      }
      this.$emit('keyClick', key);
    },
    getKeys: function getKeys() {
      var type = this.type;

      switch (type) {
        case 'price':
          return PRICE_KEYS;

        case 'idcard':
          return IDCARD_KEYS;

        default:
          return NUMBER_KEYS;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/keyboard/src/keyboard.vue?vue&type=script&lang=js
 /* harmony default export */ var src_keyboardvue_type_script_lang_js = (keyboardvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/keyboard/src/keyboard.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_keyboardvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var keyboard = (component.exports);
// CONCATENATED MODULE: ./src/keyboard/index.js


keyboard.install = function (Vue) {
  Vue.component(keyboard.name, keyboard);
};

/* harmony default export */ var src_keyboard = __webpack_exports__["default"] = (keyboard);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/picker-view/src/picker-view.vue?vue&type=template&id=aa8f40d6&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:(_vm.prefixCls + "-panel")},[_c('div',{class:(_vm.prefixCls + "-mask-top")}),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-view")},_vm._l((_vm.data),function(item,index){return _c('Wheel',{key:index+1,attrs:{"index":index,"dataSource":item,"selectedValue":_vm.getValue()[index],"defaultValue":_vm.defaultValue[index],"valueMember":_vm.valueMember,"itemRender":_vm.itemRender,"disabled":_vm.disabled},on:{"reset":_vm.resetCols,"transition":_vm.onTransition,"change":_vm.onValueChange}})})),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-mask-bottom")})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/picker-view/src/picker-view.vue?vue&type=template&id=aa8f40d6&lang=html

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(113);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(53);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// EXTERNAL MODULE: ./src/wheel/src/wheel.vue + 5 modules
var wheel = __webpack_require__(62);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/picker-view/src/picker-view.vue?vue&type=script&lang=js







/* harmony default export */ var picker_viewvue_type_script_lang_js = ({
  name: 'zaPickerView',
  components: {
    Wheel: wheel["a" /* default */]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-picker'
    },
    dataSource: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    cols: {
      type: Number,
      default: Infinity
    },
    valueMember: {
      type: String,
      default: 'value'
    },
    itemRender: {
      type: Function,
      default: function _default(item) {
        return item.label;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedValue: Array
  },
  data: function data() {
    this.value = this.getValue();
    var newObj = this.getState();
    return assign_default()({
      isManual: false
    }, newObj);
  },

  watch: {
    dataSource: function dataSource() {
      var newObj = this.getState();
      this.data = newObj.data;
      this.value = newObj.value;
      this.oldValue = newObj.oldValue;
    }
  },
  methods: {
    getInitValue: function getInitValue(defaultValue) {
      if ('value' in this && this.value.length > 0) {
        return [].concat(this.value);
      }

      if ('defaultValue' in this && this.defaultValue.length > 0) {
        return [].concat(this.defaultValue);
      }

      return defaultValue;
    },
    isCascader: function isCascader() {
      return this.dataSource && this.dataSource[0] && !Object(validator["c" /* isArray */])(this.dataSource[0]);
    },
    resetCols: function resetCols(value, level) {
      var valueMember = this.valueMember,
          data = this.data,
          selectedValue = this.selectedValue;

      var hasObj = data[level].some(function (item) {
        return item[valueMember] === value;
      });

      if (selectedValue && !selectedValue.length && this.isCascader()) {
        this.value = selectedValue;
        var newObj = this.cascaderState();
        this.data = newObj.data;
      }
      if (!hasObj && this.isCascader()) {
        var _newObj = this.cascaderState(selectedValue);
        this.$set(data, level, _newObj.data[level]);
      }
    },
    getState: function getState() {
      var state = this.isCascader() ? this.cascaderState() : this.normalState();
      return state;
    },
    getValue: function getValue() {
      var _this = this;

      var data = this.data,
          selectedValue = this.selectedValue;

      if (selectedValue && selectedValue.length) {
        return selectedValue;
      }
      if (!data) {
        return [];
      }
      return data.map(function (c) {
        return c && c[0] && c[0][_this.valueMember];
      });
    },
    normalState: function normalState() {
      var valueMember = this.valueMember,
          dataSource = this.dataSource;

      var value = this.getInitValue(dataSource.map(function (item) {
        return item[0] && item[0][valueMember];
      }));

      return {
        value: value,

        objValue: this.dataSource.map(function (item, index) {
          return item.filter(function (d) {
            return d[valueMember] === value[index];
          })[0];
        }),
        data: dataSource
      };
    },
    cascaderState: function cascaderState(selected) {
      var valueMember = this.valueMember,
          cols = this.cols;

      var newValues = selected ? selected : this.getInitValue([]);
      var newObjValues = [];
      var newDateSource = [];

      var parseLevel = function parseLevel(_ref) {
        var _ref$level = _ref.level,
            level = _ref$level === undefined ? 0 : _ref$level,
            dataSource = _ref.dataSource;

        newDateSource[level] = dataSource.map(function (item, index) {
          var children = item.children,
              others = objectWithoutProperties_default()(item, ['children']);

          if (newValues[level] && item[valueMember] === newValues[level] || !newValues[level] && index === 0) {
            newValues[level] = item[valueMember];
            newObjValues[level] = others;

            if (Object(validator["c" /* isArray */])(children) && children.length > 0 && level + 1 < cols) {
              parseLevel({
                dataSource: children,
                level: level + 1
              });
            }
          }

          return others;
        });

        return newValues;
      };

      newValues = parseLevel({ dataSource: this.dataSource });
      return {
        value: newValues,
        objValue: newObjValues,
        data: newDateSource
      };
    },
    onValueChange: function onValueChange(selected, level) {
      var value = this.value;

      value[level] = selected;
      if (this.isCascader()) {
        value.length = level + 1;
      }

      var newObj = this.getState();
      this.value = newObj.value;
      this.objValue = newObj.objValue;
      this.data = newObj.data;
      this.isManual = true;
      this.$emit('change', newObj.objValue, level);
    },
    onTransition: function onTransition(isScrolling) {
      this.$emit('transition', isScrolling);
    }
  }
});
// CONCATENATED MODULE: ./src/picker-view/src/picker-view.vue?vue&type=script&lang=js
 /* harmony default export */ var src_picker_viewvue_type_script_lang_js = (picker_viewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/picker-view/src/picker-view.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_picker_viewvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var picker_view = (component.exports);
// CONCATENATED MODULE: ./src/picker-view/index.js


picker_view.install = function (Vue) {
  Vue.component(picker_view.name, picker_view);
};

/* harmony default export */ var src_picker_view = __webpack_exports__["default"] = (picker_view);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/date-picker-view/src/date-picker-view.vue?vue&type=template&id=484282be&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:(_vm.prefixCls + "-panel")},[_c('div',{class:(_vm.prefixCls + "-mask-top")}),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-view")},_vm._l((_vm.getColsValue().dataSource),function(item,index){return _c('Wheel',{key:index+1,attrs:{"index":index,"dataSource":item,"selectedValue":_vm.getColsValue().value[index],"defaultValue":_vm.getColsValue().value[index],"valueMember":_vm.valueMember,"disabled":_vm.disabled},on:{"change":_vm.onValueChange,"transition":_vm.onTransition}})})),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-mask-bottom")})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/date-picker-view/src/date-picker-view.vue?vue&type=template&id=484282be&lang=html

// EXTERNAL MODULE: ./src/wheel/src/wheel.vue + 5 modules
var wheel = __webpack_require__(62);

// CONCATENATED MODULE: ./src/date-picker-view/locale/zh_CN.js
/* harmony default export */ var zh_CN = ({
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分'
});
// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/date-picker-view/src/date-picker-view.vue?vue&type=script&lang=js





var DATETIME = 'datetime';
var DATE = 'date';
var TIME = 'time';
var MONTH = 'month';
var YEAR = 'year';
var ONE_DAY = 24 * 60 * 60 * 1000;

var getDaysInMonth = function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

var pad = function pad(n) {
  return n < 10 ? '0' + n : '' + n;
};

var cloneDate = function cloneDate(date) {
  return new Date(+date);
};

var setMonth = function setMonth(date, month) {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
  date.setMonth(month);
};

var getGregorianCalendar = function getGregorianCalendar(year, month, day, hour, minutes, seconds) {
  return new Date(year, month, day, hour, minutes, seconds);
};

var isExtendDate = function isExtendDate(date) {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
};

/* harmony default export */ var date_picker_viewvue_type_script_lang_js = ({
  name: 'zaDatePickerView',
  components: {
    Wheel: wheel["a" /* default */]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-picker'
    },
    title: {
      type: String,
      default: '请选择'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    displayMember: {
      type: String,
      default: 'label'
    },
    valueMember: {
      type: String,
      default: 'value'
    },
    defaultValue: '',
    value: '',
    displayAddon: {
      type: String,
      default: ''
    },
    displayGenerator: Function,
    customCls: String,
    cols: Number,
    mode: {
      type: String,
      validator: function validator(v) {
        return [YEAR, MONTH, DATE, TIME, DATETIME].indexOf(v) >= 0;
      },
      default: DATE
    },
    locale: {
      type: Object,
      default: function _default() {
        return zh_CN;
      }
    },
    minuteStep: {
      type: Number,
      default: 1
    },

    min: {},
    max: {}
  },
  watch: {
    value: function value(val, oldVal) {
      if (this.date === val) return;
      this.date = isExtendDate(val);
    }
  },
  data: function data() {
    return {
      date: ''
    };
  },
  created: function created() {
    var date = this.value && isExtendDate(this.value);
    var defaultDate = this.defaultValue && isExtendDate(this.defaultValue);
    this.date = defaultDate || date;
    this.$emit('init', this.getDate());
  },

  methods: {
    onValueChange: function onValueChange(selected, index) {
      var mode = this.mode;


      var newValue = cloneDate(this.getDate());
      if (mode === YEAR || mode === MONTH || mode === DATE || mode === DATETIME) {
        switch (index) {
          case 0:
            newValue.setFullYear(selected);
            break;
          case 1:
            setMonth(newValue, selected);
            break;
          case 2:
            newValue.setDate(selected);
            break;
          case 3:
            newValue.setHours(selected);
            break;
          case 4:
            newValue.setMinutes(selected);
            break;
          default:
            break;
        }
      } else {
        switch (index) {
          case 0:
            newValue.setHours(selected);
            break;
          case 1:
            newValue.setMinutes(selected);
            break;
          default:
            break;
        }
      }

      newValue = this.clipDate(newValue);
      this.date = newValue;
      this.$emit('change', newValue);
    },
    clipDate: function clipDate(date) {
      var mode = this.mode;

      var minDate = this.getMinDate();
      var maxDate = this.getMaxDate();
      if (mode === DATETIME) {
        if (date < minDate) {
          return cloneDate(minDate);
        }
        if (date > maxDate) {
          return cloneDate(maxDate);
        }
      } else if (mode === DATE) {
        if (+date + ONE_DAY <= +minDate) {
          return cloneDate(minDate);
        }
        if (date >= +maxDate + ONE_DAY) {
          return cloneDate(maxDate);
        }
      } else {
        var maxHour = maxDate.getHours();
        var maxMinutes = maxDate.getMinutes();
        var minHour = minDate.getHours();
        var minMinutes = minDate.getMinutes();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        if (hour < minHour || hour === minHour && minutes < minMinutes) {
          return cloneDate(minDate);
        }
        if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
          return cloneDate(maxDate);
        }
      }
      return date;
    },
    getColsValue: function getColsValue() {
      var mode = this.mode;

      var date = this.getDate();

      var dataSource = [];
      var value = [];

      if (mode === YEAR) {
        dataSource = this.getDateData();
        value = ['' + date.getFullYear()];
      }
      if (mode === MONTH) {
        dataSource = this.getDateData();
        value = ['' + date.getFullYear(), '' + date.getMonth()];
      }
      if (mode === DATE || mode === DATETIME) {
        dataSource = this.getDateData();
        value = ['' + date.getFullYear(), '' + date.getMonth(), '' + date.getDate()];
      }
      if (mode === DATETIME) {
        dataSource = dataSource.concat(this.getTimeData());
        value = value.concat(['' + date.getHours(), '' + date.getMinutes()]);
      }
      if (mode === TIME) {
        dataSource = this.getTimeData();
        value = ['' + date.getHours(), '' + date.getMinutes()];
      }

      return {
        dataSource: dataSource,
        value: value
      };
    },
    getDateData: function getDateData() {
      var locale = this.locale,
          mode = this.mode;

      var date = this.getDate();
      var yearCol = [];
      var monthCol = [];
      var dayCol = [];

      var selectYear = date.getFullYear();
      var selectMonth = date.getMonth();
      var minYear = this.getMinYear();
      var maxYear = this.getMaxYear();

      for (var i = minYear; i <= maxYear; i += 1) {
        yearCol.push({
          label: '' + (i + locale.year),
          value: '' + i
        });
      }

      if (mode === YEAR) {
        return [yearCol];
      }

      var minMonth = 0;
      var maxMonth = 11;
      if (selectYear === minYear) {
        minMonth = this.getMinMonth();
      }
      if (selectYear === maxYear) {
        maxMonth = this.getMaxMonth();
      }

      for (var _i = minMonth; _i <= maxMonth; _i += 1) {
        monthCol.push({
          label: '' + (_i + 1 + locale.month),
          value: '' + _i
        });
      }

      if (mode === MONTH) {
        return [yearCol, monthCol];
      }

      var minDay = 1;
      var maxDay = getDaysInMonth(date);

      if (selectYear === minYear && selectMonth === minMonth) {
        minDay = this.getMinDay();
      }

      if (selectYear === maxYear && selectMonth === maxMonth) {
        maxDay = this.getMaxDay();
      }

      for (var _i2 = minDay; _i2 <= maxDay; _i2 += 1) {
        dayCol.push({
          label: '' + (_i2 + locale.day),
          value: '' + _i2
        });
      }

      if (mode === DATE) {
        return [yearCol, monthCol, dayCol];
      }

      return [yearCol, monthCol, dayCol];
    },
    getTimeData: function getTimeData() {
      var locale = this.locale,
          mode = this.mode,
          minuteStep = this.minuteStep;

      var date = this.getDate();
      var hourCol = [];
      var minuteCol = [];

      var minHour = 0;
      var maxHour = 23;
      var minMinute = 0;
      var maxMinute = 59;

      var minDateHour = this.getMinHour();
      var maxDateHour = this.getMaxHour();
      var minDateMinute = this.getMinMinute();
      var maxDateMinute = this.getMaxMinute();
      var selectHour = date.getHours();

      if (mode === DATETIME) {
        var selectYear = date.getFullYear();
        var selectMonth = date.getMonth();
        var selectDay = date.getDate();
        var minYear = this.getMinYear();
        var maxYear = this.getMaxYear();
        var minMonth = this.getMinMonth();
        var maxMonth = this.getMaxMonth();
        var minDay = this.getMinDay();
        var maxDay = this.getMaxDay();

        if (selectYear === minYear && selectMonth === minMonth && selectDay === minDay) {
          minHour = minDateHour;
          if (selectHour === minHour) {
            minMinute = minDateMinute;
          }
        }

        if (selectYear === maxYear && selectMonth === maxMonth && selectDay === maxDay) {
          maxHour = maxDateHour;
          if (selectHour === maxHour) {
            maxMinute = maxDateMinute;
          }
        }
      } else {
        minHour = minDateHour;
        if (selectHour === minHour) {
          minMinute = minDateMinute;
        }

        maxHour = maxDateHour;
        if (selectHour === maxHour) {
          maxMinute = maxDateMinute;
        }
      }

      for (var i = minHour; i <= maxHour; i += 1) {
        hourCol.push({
          label: locale.hour ? '' + (i + locale.hour) : pad(i),
          value: '' + i
        });
      }

      for (var _i3 = minMinute; _i3 <= maxMinute; _i3 += minuteStep) {
        minuteCol.push({
          label: locale.minute ? '' + (_i3 + locale.minute) : pad(_i3),
          value: '' + _i3
        });
      }

      return [hourCol, minuteCol];
    },
    getDate: function getDate() {
      return this.date || this.getDefaultDate();
    },
    getDefaultDate: function getDefaultDate() {
      var min = this.min,
          mode = this.mode,
          minuteStep = this.minuteStep;

      if (min && this.getMinDate().getTime() >= Date.now()) {
        return this.getMinDate();
      }
      if (minuteStep && minuteStep > 1 && (mode === DATETIME || mode === TIME)) {
        return new Date(new Date().setMinutes(0));
      }
      return new Date();
    },
    getMinYear: function getMinYear() {
      return this.getMinDate().getFullYear();
    },
    getMaxYear: function getMaxYear() {
      return this.getMaxDate().getFullYear();
    },
    getMinMonth: function getMinMonth() {
      return this.getMinDate().getMonth();
    },
    getMaxMonth: function getMaxMonth() {
      return this.getMaxDate().getMonth();
    },
    getMinDay: function getMinDay() {
      return this.getMinDate().getDate();
    },
    getMaxDay: function getMaxDay() {
      return this.getMaxDate().getDate();
    },
    getMinHour: function getMinHour() {
      return this.getMinDate().getHours();
    },
    getMaxHour: function getMaxHour() {
      return this.getMaxDate().getHours();
    },
    getMinMinute: function getMinMinute() {
      return this.getMinDate().getMinutes();
    },
    getMaxMinute: function getMaxMinute() {
      return this.getMaxDate().getMinutes();
    },
    getMinDate: function getMinDate() {
      var minDate = isExtendDate(this.min);
      return minDate || this.getDefaultMinDate();
    },
    getMaxDate: function getMaxDate() {
      var maxDate = isExtendDate(this.max);
      return maxDate || this.getDefaultMaxDate();
    },
    getDefaultMinDate: function getDefaultMinDate() {
      return getGregorianCalendar(2000, 0, 1, 0, 0, 0);
    },
    getDefaultMaxDate: function getDefaultMaxDate() {
      return getGregorianCalendar(2030, 11, 30, 23, 59, 59);
    },
    onTransition: function onTransition(isScrolling) {
      this.$emit('transition', isScrolling);
    }
  }
});
// CONCATENATED MODULE: ./src/date-picker-view/src/date-picker-view.vue?vue&type=script&lang=js
 /* harmony default export */ var src_date_picker_viewvue_type_script_lang_js = (date_picker_viewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/date-picker-view/src/date-picker-view.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_date_picker_viewvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var date_picker_view = (component.exports);
// CONCATENATED MODULE: ./src/date-picker-view/index.js


date_picker_view.install = function (Vue) {
  Vue.component(date_picker_view.name, date_picker_view);
};

/* harmony default export */ var src_date_picker_view = __webpack_exports__["default"] = (date_picker_view);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(7)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(29);
var TAG = __webpack_require__(7)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(104);
var ITERATOR = __webpack_require__(7)('iterator');
var Iterators = __webpack_require__(25);
module.exports = __webpack_require__(3).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(6);
var createDesc = __webpack_require__(13);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(25);
var ITERATOR = __webpack_require__(7)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(12);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(35);
var $export = __webpack_require__(14);
var toObject = __webpack_require__(26);
var call = __webpack_require__(108);
var isArrayIter = __webpack_require__(107);
var toLength = __webpack_require__(41);
var createProperty = __webpack_require__(106);
var getIterFn = __webpack_require__(105);

$export($export.S + $export.F * !__webpack_require__(103)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
__webpack_require__(109);
module.exports = __webpack_require__(3).Array.from;


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/object/keys.js
var keys = __webpack_require__(52);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(38);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(34);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/toast/src/toast.vue?vue&type=template&id=3a332713&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[(_vm.prefixCls + "-open")] = _vm.currentVisible, _obj )},[_c('div',{class:(_vm.prefixCls + "-container")},[_vm._t("default",[_vm._v(_vm._s(_vm.message))])],2),_vm._v(" "),_c('za-mask',{attrs:{"type":"transparent","visible":_vm.currentVisible},on:{"mask-close":_vm.onMaskClose}})],1)
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/toast/src/toast.vue?vue&type=template&id=3a332713&lang=html

// EXTERNAL MODULE: ./src/mask/index.js + 5 modules
var mask = __webpack_require__(36);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/toast/src/toast.vue?vue&type=script&lang=js




/* harmony default export */ var toastvue_type_script_lang_js = ({
  name: 'zaToast',
  components: {
    zaMask: mask["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-toast'
    },
    visible: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMaskClose: function onMaskClose(event) {
      if (!this.closeOnClickModal) return;
      this.currentVisible = false;
      this.event = event;
      this.reason = 'clickaway';
    },
    enter: function enter() {
      var _this = this;

      if (this.duration === 0) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(function () {
        _this.currentVisible = false;
        _this.event = undefined;
        _this.reason = 'timeout';
      }, this.duration);
    },
    leave: function leave() {
      this.$emit('update:visible', false);
      this.$emit('close', this.reason, this.event);
    }
  },
  watch: {
    visible: function visible(value, oldValue) {
      if (value === this.currentVisible) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.currentVisible = value;
    },
    currentVisible: function currentVisible(value) {
      if (value) {
        this.enter();
      } else {
        this.leave();
      }
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible,
      message: ''
    };
  },
  mounted: function mounted() {
    if (this.currentVisible) {
      this.enter();
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.timer);
  }
});
// CONCATENATED MODULE: ./src/toast/src/toast.vue?vue&type=script&lang=js
 /* harmony default export */ var src_toastvue_type_script_lang_js = (toastvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/toast/src/toast.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_toastvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var toast = (component.exports);
// CONCATENATED MODULE: ./src/toast/index.js





toast.install = function (Vue) {
  Vue.component(toast.name, toast);
};

var instance = void 0;
var ToastConstructor = external_vue_default.a.extend(toast);

var initInstance = function initInstance() {
  instance = new ToastConstructor({
    el: document.createElement('div')
  });
};

toast.root = function (message, options) {
  if (external_vue_default.a.prototype.$isServer) return;
  options = options || {};
  if ((typeof message === 'undefined' ? 'undefined' : typeof_default()(message)) === 'object') {
    options = message;
    message = '';
  } else {
    options.message = message;
  }
  if (!instance) {
    initInstance();
  }
  keys_default()(options).forEach(function (key) {
    instance[key] = options[key];
  });
  document.body.appendChild(instance.$el);
  external_vue_default.a.nextTick(function () {
    instance.currentVisible = true;
  });
};

/* harmony default export */ var src_toast = __webpack_exports__["default"] = (toast);

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/object/keys.js
var keys = __webpack_require__(52);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(38);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(34);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/tooltip/src/tooltip.vue?vue&type=template&id=358b4dfe&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.currentVisible)?_c('div',{ref:"tooltip",class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj ),style:(_vm.styleCls)},[_c('div',{class:(_vm.prefixCls + "-inner")},[_vm._v(_vm._s(_vm.message))]),_vm._v(" "),_vm._t("default")],2):_vm._e()
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/tooltip/src/tooltip.vue?vue&type=template&id=358b4dfe&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/tooltip/src/tooltip.vue?vue&type=script&lang=js




/* harmony default export */ var tooltipvue_type_script_lang_js = ({
  name: 'zaTooltip',
  props: {
    prefixCls: {
      type: String,
      default: 'za-tooltip'
    },
    visible: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'default'
    },
    message: {
      type: [String, Number]
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible,
      styleCls: undefined
    };
  },

  watch: {
    currentVisible: function currentVisible(value, oldValue) {
      this.show();
    }
  },
  methods: {
    show: function show() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.$refs.tooltip && !_this.styleCls) {
          var rect = _this.$refs.tooltip.getBoundingClientRect();
          var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
          var top = rect.top + scrollTop;
          _this.styleCls = {
            left: rect.left + 'px',
            top: top + 'px',
            width: '' + rect.width
          };
        }
      });
    },
    close: function close() {
      this.currentVisible = false;
    }
  }
});
// CONCATENATED MODULE: ./src/tooltip/src/tooltip.vue?vue&type=script&lang=js
 /* harmony default export */ var src_tooltipvue_type_script_lang_js = (tooltipvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/tooltip/src/tooltip.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tooltipvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tooltip = (component.exports);
// CONCATENATED MODULE: ./src/tooltip/index.js





tooltip.install = function (Vue) {
  Vue.component(tooltip.name, tooltip);
};

var instance = void 0;
var TooltipConstructor = external_vue_default.a.extend(tooltip);

var initInstance = function initInstance() {
  instance = new TooltipConstructor({
    el: document.createElement('div')
  });
};

tooltip.root = function (message, options) {
  if (external_vue_default.a.prototype.$isServer) return;
  options = options || {};
  if ((typeof message === 'undefined' ? 'undefined' : typeof_default()(message)) === 'object') {
    options = message;
    message = '';
  } else {
    options.message = message;
  }
  if (!instance) {
    initInstance();
  }
  keys_default()(options).forEach(function (key) {
    instance[key] = options[key];
  });
  document.body.appendChild(instance.$el);
  external_vue_default.a.nextTick(function () {
    instance.currentVisible = true;
  });
  return instance;
};

/* harmony default export */ var src_tooltip = __webpack_exports__["default"] = (tooltip);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
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

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/keyboard-picker/src/keyboard-picker.vue?vue&type=template&id=4cc69d83&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.stopPropagation($event)}}},[_c('za-popup',{staticClass:"za-popup-inner",attrs:{"visible":_vm.currentVisible,"maskType":"transparent","closeOnClickModal":_vm.closeOnClickModal},on:{"close":_vm.onMaskClick}},[_c('za-keyboard',{attrs:{"prefixCls":_vm.prefixCls,"type":_vm.type},on:{"keyClick":_vm.onKeyClick}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/keyboard-picker/src/keyboard-picker.vue?vue&type=template&id=4cc69d83&lang=html

// EXTERNAL MODULE: ./src/utils/events.js
var events = __webpack_require__(85);

// EXTERNAL MODULE: ./src/popup/index.js + 5 modules
var popup = __webpack_require__(51);

// EXTERNAL MODULE: ./src/keyboard/index.js + 5 modules
var keyboard = __webpack_require__(100);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/keyboard-picker/src/keyboard-picker.vue?vue&type=script&lang=js






/* harmony default export */ var keyboard_pickervue_type_script_lang_js = ({
  name: 'zaKeyboardPicker',
  props: {
    prefixCls: {
      type: String,
      default: 'za-keyboard'
    },
    type: String,
    visible: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible
    };
  },

  watch: {
    visible: function visible(val, oldVal) {
      if (this.currentVisible === val) return;
      this.currentVisible = val;
    }
  },
  components: {
    zaPopup: popup["default"],
    zaKeyboard: keyboard["default"]
  },
  methods: {
    stopPropagation: function stopPropagation(e) {
      events["a" /* default */].stopPropagation(e);
    },
    onMaskClick: function onMaskClick(reason) {
      if (reason === 'clickaway') {
        this.onCancel();
      }
    },
    onKeyClick: function onKeyClick(key) {
      if (['ok', 'close'].indexOf(key) > -1) {
        this.onCancel();
      }
      this.$emit('keyClick', key);
    },
    onCancel: function onCancel() {
      this.currentVisible = !this.currentVisible;
      this.$emit('update:visible', this.currentVisible);
    }
  }
});
// CONCATENATED MODULE: ./src/keyboard-picker/src/keyboard-picker.vue?vue&type=script&lang=js
 /* harmony default export */ var src_keyboard_pickervue_type_script_lang_js = (keyboard_pickervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/keyboard-picker/src/keyboard-picker.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_keyboard_pickervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var keyboard_picker = (component.exports);
// CONCATENATED MODULE: ./src/keyboard-picker/index.js


keyboard_picker.install = function (Vue) {
  Vue.component(keyboard_picker.name, keyboard_picker);
};

/* harmony default export */ var src_keyboard_picker = __webpack_exports__["default"] = (keyboard_picker);

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/message/src/message.vue?vue&type=template&id=5f1651cc&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.currentVisible)?_c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj[("size-" + _vm.size)] = !!_vm.size, _obj ),on:{"click":_vm.handleClick}},[_c('div',{class:(_vm.prefixCls + "-header")},[(_vm.$slots.icon || _vm.icon)?_c('div',{class:(_vm.prefixCls + "-icon")},[_vm._t("icon"),_vm._v(" "),(!_vm.$slots.icon)?_c('za-icon',{attrs:{"type":_vm.icon}}):_vm._e()],2):_vm._e()]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-body")},[_vm._t("default")],2),_vm._v(" "),(_vm.closable || _vm.hasArrow)?_c('div',{class:(_vm.prefixCls + "-footer")},[(_vm.hasArrow)?_c('za-icon',{attrs:{"type":"arrow-right"}}):_vm._e(),_vm._v(" "),(_vm.closable)?_c('za-icon',{attrs:{"type":"wrong"},on:{"click":_vm.wrongIconClick}}):_vm._e()],1):_vm._e()]):_vm._e()
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/message/src/message.vue?vue&type=template&id=5f1651cc&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// EXTERNAL MODULE: ./src/icon/index.js
var icon = __webpack_require__(39);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/message/src/message.vue?vue&type=script&lang=js





/* harmony default export */ var messagevue_type_script_lang_js = ({
  name: 'zaMessage',
  components: {
    zaIcon: icon["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-message'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'primary'
    },
    size: {},
    closable: {
      type: Boolean,
      default: false
    },
    hasArrow: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible
    };
  },

  watch: {
    visible: function visible(val) {
      if (val !== this.currentVisible) return;
      this.currentVisible = val;
    }
  },
  methods: {
    handleClick: function handleClick(event) {
      this.$emit('click', event);
    },
    wrongIconClick: function wrongIconClick() {
      this.currentVisible = false;
      this.$emit('update:visible', false);
    }
  }
});
// CONCATENATED MODULE: ./src/message/src/message.vue?vue&type=script&lang=js
 /* harmony default export */ var src_messagevue_type_script_lang_js = (messagevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/message/src/message.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_messagevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var message = (component.exports);
// CONCATENATED MODULE: ./src/message/index.js


message.install = function (Vue) {
  Vue.component(message.name, message);
};

/* harmony default export */ var src_message = __webpack_exports__["default"] = (message);

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/swipe/src/swipe-item.vue?vue&type=template&id=1635a332&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:(_vm.prefixCls + "-item")},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/swipe/src/swipe-item.vue?vue&type=template&id=1635a332&lang=html

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/swipe/src/swipe-item.vue?vue&type=script&lang=js


/* harmony default export */ var swipe_itemvue_type_script_lang_js = ({
  name: 'zaSwipeItem',
  props: {
    prefixCls: {
      type: String,
      default: 'za-swipe' }
  }
});
// CONCATENATED MODULE: ./src/swipe/src/swipe-item.vue?vue&type=script&lang=js
 /* harmony default export */ var src_swipe_itemvue_type_script_lang_js = (swipe_itemvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/swipe/src/swipe-item.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_swipe_itemvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var swipe_item = (component.exports);
// CONCATENATED MODULE: ./src/swipe-item/index.js


swipe_item.install = function (Vue) {
  Vue.component(swipe_item.name, swipe_item);
};

/* harmony default export */ var src_swipe_item = __webpack_exports__["default"] = (swipe_item);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(14);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(118);
var $Object = __webpack_require__(3).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(119), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(14);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
module.exports = __webpack_require__(3).Number.isNaN;


/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(34);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/loading/src/loading.vue?vue&type=template&id=5935c1ec&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('za-toast',{attrs:{"prefixCls":_vm.prefixCls,"visible":_vm.currentVisible,"duration":0},on:{"update:visible":function($event){_vm.currentVisible=$event}}},[_c('za-spinner',{staticClass:"rotate360",attrs:{"size":"lg"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/loading/src/loading.vue?vue&type=template&id=5935c1ec&lang=html

// EXTERNAL MODULE: ./src/toast/index.js + 5 modules
var toast = __webpack_require__(111);

// EXTERNAL MODULE: ./src/spinner/index.js + 5 modules
var spinner = __webpack_require__(47);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/loading/src/loading.vue?vue&type=script&lang=js





/* harmony default export */ var loadingvue_type_script_lang_js = ({
  name: 'zaLoading',
  components: {
    zaToast: toast["default"],
    zaSpinner: spinner["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-loading'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentVisible: {
      get: function get() {
        return this.visible;
      },
      set: function set(val) {
        this.$emit('update:visible', val);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/loading/src/loading.vue?vue&type=script&lang=js
 /* harmony default export */ var src_loadingvue_type_script_lang_js = (loadingvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/loading/src/loading.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_loadingvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var loading = (component.exports);
// CONCATENATED MODULE: ./src/loading/src/directive.js


var directive_install = function install(Vue) {
  var LoadingConstructor = Vue.extend(loading);

  var toggleLoading = function toggleLoading(el, binding) {
    if (binding.value) {
      Vue.nextTick(function () {
        document.body.appendChild(el.instance.$el);
        el.domInserted = true;
        Vue.nextTick(function () {
          el.instance.visible = true;
        });
      });
    } else {
      el.instance.visible = false;
    }
  };

  Vue.directive('zaLoading', {
    bind: function bind(el, binding) {
      var loading = new LoadingConstructor({
        el: document.createElement('div'),
        props: {
          visible: binding.value
        }
      });
      el.instance = loading;
      toggleLoading(el, binding);
    },
    update: function update(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function unbind(el, binding) {
      if (el.domInserted) {
        document.body.removeChild(el.instance.$el);
      }
    }
  });
};

/* harmony default export */ var directive = (directive_install);
// CONCATENATED MODULE: ./src/loading/index.js




loading.install = function (Vue) {
  Vue.component(loading.name, loading);
};

var instance = void 0;
var loading_LoadingConstructor = external_vue_default.a.extend(loading);

var initInstance = function initInstance() {
  instance = new loading_LoadingConstructor({
    el: document.createElement('div')
  });
};

loading.root = function () {
  if (external_vue_default.a.prototype.$isServer) return;

  if (!instance) {
    initInstance();
    instance.close = function () {
      instance.visible = false;
    };
  }

  document.body.appendChild(instance.$el);
  external_vue_default.a.nextTick(function () {
    instance.visible = true;
  });
  return instance;
};

loading.directive = directive;

/* harmony default export */ var src_loading = __webpack_exports__["default"] = (loading);

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/object/keys.js
var keys = __webpack_require__(52);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(38);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(34);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: ./src/utils/vdom.js
var vdom = __webpack_require__(98);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/confirm/src/confirm.vue?vue&type=template&id=5dcd1a45&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('za-modal',{ref:"modal",attrs:{"closeOnClickModal":false,"visible":_vm.currentVisible,"radius":_vm.radius,"animationDuration":_vm.animationDuration,"title":_vm.title}},[_c('div',{class:_vm.prefixCls},[(!_vm.$slots.default)?[_vm._v(_vm._s(_vm.message))]:_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_c('template',{slot:"footer"},[_c('za-button',{attrs:{"block":"","bordered":""},on:{"click":_vm.cancel}},[_vm._v(_vm._s(_vm.cancelText))]),_vm._v(" "),_c('za-button',{attrs:{"block":"","bordered":"","theme":"primary"},on:{"click":_vm.ok}},[_vm._v(_vm._s(_vm.okText))])],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/confirm/src/confirm.vue?vue&type=template&id=5dcd1a45&lang=html

// EXTERNAL MODULE: ./src/modal/index.js + 5 modules
var modal = __webpack_require__(95);

// EXTERNAL MODULE: ./src/button/index.js + 5 modules
var src_button = __webpack_require__(63);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/confirm/src/confirm.vue?vue&type=script&lang=js





/* harmony default export */ var confirmvue_type_script_lang_js = ({
  name: 'zaConfirm',
  components: {
    zaModal: modal["default"],
    zaButton: src_button["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-confirm'
    },
    message: String,
    title: String,
    cancelText: {
      type: String,
      default: '关闭'
    },
    okText: {
      type: String,
      default: '确定'
    },
    visible: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Boolean,
      default: false
    },
    animationDuration: {
      type: Number,
      default: 200
    },
    ok: {
      type: Function,
      default: function _default() {}
    },
    cancel: {
      type: Function,
      default: function _default() {}
    }
  },
  watch: {
    visible: function visible(value, oldValue) {
      if (value === this.currentVisible) return;
      this.currentVisible = value;
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible
    };
  }
});
// CONCATENATED MODULE: ./src/confirm/src/confirm.vue?vue&type=script&lang=js
 /* harmony default export */ var src_confirmvue_type_script_lang_js = (confirmvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/confirm/src/confirm.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_confirmvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_confirm = (component.exports);
// CONCATENATED MODULE: ./src/confirm/index.js






src_confirm.install = function (Vue) {
  Vue.component(src_confirm.name, src_confirm);
};

var instance = void 0;
var ConfirmConstructor = external_vue_default.a.extend(src_confirm);
var noop = function noop() {
  return true;
};

var initInstance = function initInstance() {
  instance = new ConfirmConstructor({
    el: document.createElement('div')
  });
};

src_confirm.root = function (message, options) {
  if (external_vue_default.a.prototype.$isServer) return;
  options = options || {};
  if ((typeof message === 'undefined' ? 'undefined' : typeof_default()(message)) === 'object' && !Object(vdom["a" /* default */])(message)) {
    options = message;
    message = '';
  } else {
    options.message = message;
  }
  if (!instance) {
    initInstance();
  }
  keys_default()(options).forEach(function (key) {
    instance[key] = options[key];
  });
  if (Object(vdom["a" /* default */])(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  } else {
    delete instance.$slots.default;
  }
  document.body.appendChild(instance.$el);

  var ok = instance.ok || noop;
  var cancel = instance.cancel || noop;

  instance.ok = function (evt) {
    var shouldClose = ok(evt);
    if (shouldClose) {
      instance.visible = false;
      instance.ok = noop;
    }
  };
  instance.cancel = function (evt) {
    instance.visible = false;
    cancel(evt);
    instance.cancel = noop;
  };

  external_vue_default.a.nextTick(function () {
    instance.visible = true;
  });
};

/* harmony default export */ var src_confirm_0 = __webpack_exports__["default"] = (src_confirm);

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/object/keys.js
var keys = __webpack_require__(52);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(38);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(34);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: ./src/utils/vdom.js
var vdom = __webpack_require__(98);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/alert/src/alert.vue?vue&type=template&id=3723201d&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('za-modal',{ref:"modal",attrs:{"closeOnClickModal":false,"visible":_vm.currentVisible,"radius":_vm.radius,"animationDuration":_vm.animationDuration,"title":_vm.title}},[_c('div',{class:_vm.prefixCls},[(!_vm.$slots.default)?[_vm._v(_vm._s(_vm.message))]:_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_c('template',{slot:"footer"},[_c('za-button',{attrs:{"block":"","bordered":""},on:{"click":_vm.handleClose}},[_vm._v(_vm._s(_vm.cancelText))])],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/alert/src/alert.vue?vue&type=template&id=3723201d&lang=html

// EXTERNAL MODULE: ./src/modal/index.js + 5 modules
var modal = __webpack_require__(95);

// EXTERNAL MODULE: ./src/button/index.js + 5 modules
var src_button = __webpack_require__(63);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/alert/src/alert.vue?vue&type=script&lang=js





/* harmony default export */ var alertvue_type_script_lang_js = ({
  name: 'zaAlert',
  components: {
    zaModal: modal["default"],
    zaButton: src_button["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-alert'
    },
    message: String,
    title: String,
    cancelText: {
      type: String,
      default: '关闭'
    },
    visible: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Boolean,
      default: false
    },
    animationDuration: {
      type: Number,
      default: 200
    }
  },
  methods: {
    handleClose: function handleClose(event) {
      this.$refs.modal.leave('modal-close', event);
      this.$emit('update:visible', false);
      this.$emit('close', event);

      this.currentVisible = false;
    }
  },
  watch: {
    visible: function visible(value, oldValue) {
      if (value === this.currentVisible) return;
      this.currentVisible = value;
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible
    };
  }
});
// CONCATENATED MODULE: ./src/alert/src/alert.vue?vue&type=script&lang=js
 /* harmony default export */ var src_alertvue_type_script_lang_js = (alertvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/alert/src/alert.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_alertvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_alert = (component.exports);
// CONCATENATED MODULE: ./src/alert/index.js






src_alert.install = function (Vue) {
  Vue.component(src_alert.name, src_alert);
};

var instance = void 0;
var AlertConstructor = external_vue_default.a.extend(src_alert);

var initInstance = function initInstance() {
  instance = new AlertConstructor({
    el: document.createElement('div')
  });
};

src_alert.root = function (message, options) {
  if (external_vue_default.a.prototype.$isServer) return;
  options = options || {};
  if ((typeof message === 'undefined' ? 'undefined' : typeof_default()(message)) === 'object' && !Object(vdom["a" /* default */])(message)) {
    options = message;
    message = '';
  } else {
    options.message = message;
  }
  if (!instance) {
    initInstance();
  }
  keys_default()(options).forEach(function (key) {
    instance[key] = options[key];
  });
  if (Object(vdom["a" /* default */])(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  } else {
    delete instance.$slots.default;
  }
  document.body.appendChild(instance.$el);
  instance.$off();
  instance.$on('close', function (event) {
    instance.callback && instance.callback.call(instance, event);
  });
  external_vue_default.a.nextTick(function () {
    instance.currentVisible = true;
  });
};

/* harmony default export */ var src_alert_0 = __webpack_exports__["default"] = (src_alert);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(37);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/swipe-item/index.js + 5 modules
var swipe_item = __webpack_require__(117);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/tabs/src/tab-pane.vue?vue&type=script&lang=js




var paneIndex = 0;
/* harmony default export */ var tab_panevue_type_script_lang_js = ({
  name: 'zaTabPane',
  components: {
    zaSwipeItem: swipe_item["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-tab'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: String,
    name: [String, Number]
  },
  computed: {
    currentName: function currentName() {
      return this.container && this.container.value;
    },
    canSwipe: function canSwipe() {
      return this.container && this.container.canSwipe;
    },
    container: function container() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.name !== 'zaTabs') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    }
  },
  watch: {
    label: function label() {
      this.notifyParent();
    },
    name: function name() {
      this.notifyParent();
    },
    disabled: function disabled() {
      this.notifyParent();
    }
  },
  created: function created() {
    this._panelIndex = paneIndex;
    paneIndex += 1;

    this.notifyParent();
  },
  beforeDestroy: function beforeDestroy() {
    this.notifyParent(false);
  },

  methods: {
    notifyParent: function notifyParent() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.container) {
        this.container.notify(this, flag);
      }
    }
  },
  render: function render(h) {
    var _cls;

    var prefixCls = this.prefixCls,
        currentName = this.currentName,
        name = this.name,
        canSwipe = this.canSwipe;


    var cls = (_cls = {}, defineProperty_default()(_cls, prefixCls + '-panel-item', true), defineProperty_default()(_cls, 'active', name === currentName), _cls);

    var panel = canSwipe ? h('za-swipe-item', [this.$slots.default]) : h(
      'div',
      { 'class': prefixCls + '-panel' },
      [h(
        'div',
        { 'class': cls },
        [this.$slots.default]
      )]
    );

    return panel;
  }
});
// CONCATENATED MODULE: ./src/tabs/src/tab-pane.vue?vue&type=script&lang=js
 /* harmony default export */ var src_tab_panevue_type_script_lang_js = (tab_panevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/tabs/src/tab-pane.vue
var tab_pane_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tab_panevue_type_script_lang_js,
  tab_pane_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tab_pane = (component.exports);
// CONCATENATED MODULE: ./src/tab-pane/index.js


tab_pane.install = function (Vue) {
  Vue.component(tab_pane.name, tab_pane);
};

/* harmony default export */ var src_tab_pane = __webpack_exports__["default"] = (tab_pane);

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// EXTERNAL MODULE: ./src/message/index.js + 5 modules
var message = __webpack_require__(116);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/notice-bar/src/notice-bar.vue?vue&type=script&lang=js




/* harmony default export */ var notice_barvue_type_script_lang_js = ({
  name: 'zaNoticeBar',
  components: {
    zaMessage: message["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-noticebar'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'warning'
    },
    closable: {
      type: Boolean,
      default: false
    },
    hasArrow: {
      type: Boolean,
      default: false
    },
    autoscroll: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    },
    size: {},
    icon: {
      type: String,
      default: 'broadcast'
    }
  },
  computed: {
    currentVisible: {
      get: function get() {
        return this.visible;
      },
      set: function set(val) {
        this.$emit('update:visible', val);
      }
    },
    contentStyle: function contentStyle() {
      return {
        left: this.offset + 'px'
      };
    }
  },
  data: function data() {
    return {
      offset: 0
    };
  },

  methods: {
    handleClick: function handleClick(event) {
      this.currentVisible = false;
      this.$emit('click', event);
    },
    handleUpdate: function handleUpdate(val) {
      this.$emit('update:visible', val);
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (!this.autoscroll) return;

    var distance = this.$refs.wrapper.offsetWidth - this.$refs.content.offsetWidth;
    if (distance > 0) return;

    var delay = 1000;
    this.moveInterval = setInterval(function () {
      var offset = _this.offset;

      if ((offset < distance || offset >= 0) && delay > 0) {
        delay -= 50;
        return;
      }

      delay = 1000;
      offset = offset < distance ? 0 : offset - 1;

      _this.offset = offset;
    }, 50);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  },
  render: function render(h) {
    var prefixCls = this.prefixCls,
        theme = this.theme,
        currentVisible = this.currentVisible,
        closable = this.closable,
        hasArrow = this.hasArrow,
        handleClick = this.handleClick,
        handleUpdate = this.handleUpdate,
        contentStyle = this.contentStyle,
        icon = this.icon;


    return h(
      'za-message',
      {
        attrs: {
          size: 'lg',
          visible: currentVisible,

          closable: closable,
          theme: theme,
          hasArrow: hasArrow,

          icon: icon },
        on: {
          'updatevisible': handleUpdate,
          'click': handleClick
        }
      },
      [h(
        'div',
        { 'class': prefixCls, ref: 'wrapper' },
        [h(
          'div',
          { 'class': prefixCls + '-body', ref: 'content', style: contentStyle },
          [this.$slots.default]
        )]
      )]
    );
  }
});
// CONCATENATED MODULE: ./src/notice-bar/src/notice-bar.vue?vue&type=script&lang=js
 /* harmony default export */ var src_notice_barvue_type_script_lang_js = (notice_barvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/notice-bar/src/notice-bar.vue
var render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_notice_barvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var notice_bar = (component.exports);
// CONCATENATED MODULE: ./src/notice-bar/index.js


notice_bar.install = function (Vue) {
  Vue.component(notice_bar.name, notice_bar);
};

/* harmony default export */ var src_notice_bar = __webpack_exports__["default"] = (notice_bar);

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/number/is-nan.js
var is_nan = __webpack_require__(96);
var is_nan_default = /*#__PURE__*/__webpack_require__.n(is_nan);

// EXTERNAL MODULE: ./src/drag/index.js + 3 modules
var drag = __webpack_require__(61);

// EXTERNAL MODULE: ./src/icon/index.js
var icon = __webpack_require__(39);

// EXTERNAL MODULE: ./src/spinner/index.js + 5 modules
var spinner = __webpack_require__(47);

// EXTERNAL MODULE: ./src/utils/events.js
var events = __webpack_require__(85);

// CONCATENATED MODULE: ./src/utils/misc.js
function isThenable(obj) {
  return obj && typeof obj.then === 'function';
}

function warn(msg) {
  console && console.warn && console.warn(msg);
}
// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/pull/src/pull.vue?vue&type=script&lang=js








var REFRESH_STATE = {
  normal: 0,
  pull: 1,
  drop: 2,
  loading: 3,
  success: 4,
  failure: 5 };

var LOAD_STATE = {
  normal: 0,
  abort: 1,
  loading: 2,
  success: 3,
  failure: 4,
  complete: 5 };

/* harmony default export */ var pullvue_type_script_lang_js = ({
  name: 'zaPull',
  components: {
    zaDrag: drag["default"],
    zaIcon: icon["default"],
    zaSpinner: spinner["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-pull'
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    refreshDistance: {
      type: Number,
      default: 50
    },
    refreshInitDistance: {
      type: Number,
      default: 20
    },
    duration: {
      type: Number,
      default: 300
    },
    stayTime: {
      type: Number,
      default: 1000
    },
    loading: {
      type: Boolean,
      default: false
    },
    onRefresh: Function,
    onLoad: Function
  },
  data: function data() {
    return {
      offsetY: 0,
      currentDuration: 0,
      refreshState: '',
      loadState: ''
    };
  },
  created: function created() {
    this.refreshState = this.refreshing ? REFRESH_STATE.loading : REFRESH_STATE.normal;
    this.loadState = this.loading ? LOAD_STATE.loading : LOAD_STATE.normal;
  },
  mounted: function mounted() {
    events["a" /* default */].on(window, 'scroll', this.onSrcoll);
  },
  beforeDestroy: function beforeDestroy() {
    events["a" /* default */].off(window, 'scroll', this.onSrcoll);
  },

  watch: {
    refreshing: function refreshing(val) {
      var refreshState = val ? REFRESH_STATE.loading : REFRESH_STATE.normal;
      this.doRefreshAction(refreshState);
    },
    loading: function loading(val) {
      if (this.loadState === LOAD_STATE.complete) return;
      var loadState = val ? LOAD_STATE.loading : LOAD_STATE.normal;
      this.doLoadAction(loadState);
    }
  },
  computed: {
    refreshStyle: function refreshStyle() {
      var height = is_nan_default()(this.offsetY) ? this.offsetY : this.offsetY + 'px';
      return {
        WebkitTransitionDuration: this.currentDuration + 'ms',
        transitionDuration: this.currentDuration + 'ms',
        height: height
      };
    },
    loadStyle: function loadStyle() {
      return {
        height: '' + (this.loadState >= LOAD_STATE.loading ? 'auto' : 0)
      };
    }
  },
  methods: {
    onDragMove: function onDragMove(event, _ref) {
      var offsetY = _ref.offsetY;

      if (offsetY < 0) return;

      if (offsetY > 0 && document.documentElement.scrollTop + document.body.scrollTop > 0) return;

      if (this.refreshState >= REFRESH_STATE.loading) return;

      event.preventDefault();

      var offset = offsetY / 2;
      var action = offset - this.refreshInitDistance < this.refreshDistance ? REFRESH_STATE.pull : REFRESH_STATE.drop;

      this.doRefreshAction(action, offset);
      return true;
    },
    onDragEnd: function onDragEnd() {
      var _this = this;

      var onRefresh = this.onRefresh;


      if (this.refreshState === REFRESH_STATE.pull) {
        this.doRefreshAction(REFRESH_STATE.normal);
        return;
      }

      if (typeof onRefresh === 'function') {
        var P = onRefresh();
        if (!isThenable(P)) {
          return warn('on-refresh must return a Promise Object');
        }
        P.then(function (res) {
          var refreshState = res ? REFRESH_STATE.success : REFRESH_STATE.failure;
          _this.doRefreshAction(refreshState);
        }).catch(function () {
          _this.doRefreshAction(REFRESH_STATE.failure);
        });
      }
    },
    onSrcoll: function onSrcoll() {
      var _this2 = this;

      if (this.refreshState !== REFRESH_STATE.normal || this.loadState !== LOAD_STATE.normal) {
        return;
      }
      var onLoad = this.onLoad;


      if (!onLoad) return;

      var bottom = this.$refs.pull.getBoundingClientRect().bottom;
      var scrollHeight = document.documentElement.scrollHeight;
      var clientHeight = document.documentElement.clientHeight;

      if (scrollHeight <= clientHeight) return;

      if (bottom <= clientHeight) {
        this.doLoadAction(LOAD_STATE.loading);
        if (typeof onLoad === 'function') {
          var P = onLoad();
          if (!isThenable(P)) {
            return warn('on-load must return a Promise Object');
          }
          P.then(function (res) {
            var loadState = res ? LOAD_STATE.success : LOAD_STATE.complete;
            _this2.doLoadAction(loadState);
          }).catch(function () {
            _this2.doLoadAction(LOAD_STATE.failure);
          });
        }
      }
    },
    doLoadAction: function doLoadAction(loadState) {
      var _this3 = this;

      this.loadState = loadState;

      switch (loadState) {
        case LOAD_STATE.success:
          this.doLoadAction(LOAD_STATE.normal);
          break;

        case LOAD_STATE.failure:
          setTimeout(function () {
            _this3.doLoadAction(LOAD_STATE.abort);
          }, this.stayTime);
          break;

        default:
          break;
      }
    },
    doRefreshAction: function doRefreshAction(refreshState, offset) {
      var _this4 = this;

      var duration = this.duration,
          stayTime = this.stayTime;


      this.refreshState = refreshState;
      switch (refreshState) {
        case REFRESH_STATE.pull:
        case REFRESH_STATE.drop:
          this.doTransition({ offsetY: offset, duration: 0 });
          break;

        case REFRESH_STATE.loading:
          this.doTransition({ offsetY: 'auto', duration: duration });
          break;

        case REFRESH_STATE.success:
        case REFRESH_STATE.failure:
          this.doTransition({ offsetY: 'auto', duration: 0 });
          setTimeout(function () {
            _this4.doRefreshAction(REFRESH_STATE.normal);
          }, stayTime);
          break;

        default:
          this.doTransition({ offsetY: 0, duration: duration });
          break;
      }
    },
    doTransition: function doTransition(_ref2) {
      var offsetY = _ref2.offsetY,
          duration = _ref2.duration;

      this.offsetY = offsetY;
      this.currentDuration = duration;
    }
  },
  render: function render() {
    var _this5 = this;

    var h = arguments[0];
    var onDragMove = this.onDragMove,
        onDragEnd = this.onDragEnd,
        prefixCls = this.prefixCls,
        refreshStyle = this.refreshStyle,
        loadStyle = this.loadStyle,
        offsetY = this.offsetY,
        refreshDistance = this.refreshDistance,
        refreshInitDistance = this.refreshInitDistance,
        refreshState = this.refreshState,
        loadState = this.loadState;


    var percent = 0;
    if (offsetY >= refreshInitDistance) {
      percent = (offsetY - refreshInitDistance < refreshDistance ? offsetY - refreshInitDistance : refreshDistance) * 100 / (refreshDistance - refreshInitDistance);
    }

    var renderRefresh = function renderRefresh() {
      var refreshPull = void 0,
          refreshDrop = void 0,
          refreshLoading = void 0,
          refreshSuccess = void 0,
          refreshFailure = void 0;

      switch (refreshState) {
        case REFRESH_STATE.pull:
          refreshPull = _this5.$scopedSlots.refreshPull && _this5.$scopedSlots.refreshPull({
            percent: percent
          });
          return refreshPull || h(
            'div',
            { 'class': prefixCls + '-control' },
            [h('za-spinner', {
              attrs: { percent: percent }
            }), h('span', ['\u4E0B\u62C9\u5237\u65B0'])]
          );

        case REFRESH_STATE.drop:
          refreshDrop = _this5.$scopedSlots.refreshDrop && _this5.$scopedSlots.refreshDrop({
            percent: percent
          });
          return refreshDrop || h(
            'div',
            { 'class': prefixCls + '-control' },
            [h('za-spinner', {
              attrs: { percent: 100 }
            }), h('span', ['\u91CA\u653E\u7ACB\u5373\u5237\u65B0'])]
          );

        case REFRESH_STATE.loading:
          refreshLoading = _this5.$scopedSlots.refreshLoading && _this5.$scopedSlots.refreshLoading({
            percent: percent
          });
          return refreshLoading || h(
            'div',
            { 'class': prefixCls + '-control' },
            [h('za-spinner', { 'class': 'rotate360' }), h('span', ['\u52A0\u8F7D\u4E2D'])]
          );

        case REFRESH_STATE.success:
          refreshSuccess = _this5.$scopedSlots.refreshSuccess && _this5.$scopedSlots.refreshSuccess({
            percent: percent
          });
          return refreshSuccess || h(
            'div',
            { 'class': prefixCls + '-control' },
            [h('za-icon', {
              attrs: { type: 'right-round', theme: 'success' }
            }), h('span', ['\u52A0\u8F7D\u6210\u529F'])]
          );

        case REFRESH_STATE.failure:
          refreshFailure = _this5.$scopedSlots.refreshFailure && _this5.$scopedSlots.refreshFailure({
            percent: percent
          });
          return refreshFailure || h(
            'div',
            { 'class': prefixCls + '-control' },
            [h('za-icon', {
              attrs: { type: 'wrong-round', theme: 'error' }
            }), h('span', ['\u52A0\u8F7D\u5931\u8D25'])]
          );

        default:
          return null;
      }
    };

    var renderLoad = function renderLoad() {
      var loadComplete = void 0,
          loadLoading = void 0,
          loadFailure = void 0;

      switch (loadState) {
        case LOAD_STATE.loading:
          loadLoading = _this5.$scopedSlots.loadLoading && _this5.$scopedSlots.loadLoading({
            percent: percent
          });
          return loadLoading || h(
            'div',
            { 'class': prefixCls + '-control' },
            [h('za-spinner', { 'class': 'rotate360' }), h('span', ['\u52A0\u8F7D\u4E2D'])]
          );

        case LOAD_STATE.complete:
          loadComplete = _this5.$scopedSlots.loadComplete && _this5.$scopedSlots.loadComplete({
            percent: percent
          });
          return loadComplete || h(
            'div',
            { 'class': prefixCls + '-control' },
            [h('span', ['\u6211\u662F\u6709\u5E95\u7EBF\u7684'])]
          );

        case LOAD_STATE.failure:
          loadFailure = _this5.$scopedSlots.loadFailure && _this5.$scopedSlots.loadFailure({
            percent: percent
          });
          return loadFailure || h(
            'div',
            { 'class': prefixCls + '-control' },
            [h('za-icon', {
              attrs: { type: 'wrong-round', theme: 'error' }
            }), h('span', ['\u52A0\u8F7D\u5931\u8D25'])]
          );

        default:
          return null;
      }
    };

    return h(
      'za-drag',
      {
        attrs: {
          dragMove: onDragMove,
          dragEnd: onDragEnd }
      },
      [h(
        'div',
        {
          ref: 'pull',
          'class': '' + prefixCls },
        [h(
          'div',
          { 'class': prefixCls + '-refresh', style: refreshStyle },
          [renderRefresh()]
        ), this.$slots.default, h(
          'div',
          { 'class': prefixCls + '-load', style: loadStyle },
          [renderLoad()]
        )]
      )]
    );
  }
});
// CONCATENATED MODULE: ./src/pull/src/pull.vue?vue&type=script&lang=js
 /* harmony default export */ var src_pullvue_type_script_lang_js = (pullvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/pull/src/pull.vue
var render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_pullvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var pull = (component.exports);
// CONCATENATED MODULE: ./src/pull/index.js


pull.install = function (Vue) {
  Vue.component(pull.name, pull);
};

/* harmony default export */ var src_pull = __webpack_exports__["default"] = (pull);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(37);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/mixins/emitter.js
var emitter = __webpack_require__(87);

// CONCATENATED MODULE: ./src/mixins/find-parent.js


/* harmony default export */ var find_parent = ({
  data: function data() {
    return {
      parent: null
    };
  },


  methods: {
    findParent: function findParent(name) {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.name === name) {
          this.parent = parent;
          break;
        }
        parent = parent.$parent;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/accordion/src/accordionItem.vue?vue&type=script&lang=js





/* harmony default export */ var accordionItemvue_type_script_lang_js = ({
  name: 'zaAccordionItem',
  mixins: [emitter["a" /* default */], find_parent],
  props: {
    prefixCls: {
      type: String,
      default: 'za-accordion'
    },
    aiTag: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      active: false,
      itemAnimated: false,
      itemOpen: false,
      animatedHeight: ''
    };
  },
  created: function created() {
    this.findParent('zaAccordion');
    this.setDefaultActive();
  },

  computed: {
    itemActiveTag: function itemActiveTag() {
      var itemActiveTag = void 0;
      if (!this.aiTag) {
        itemActiveTag = -1;
      } else {
        itemActiveTag = this.aiTag;
      }
      return itemActiveTag;
    }
  },
  methods: {
    isActive: function isActive(tag, activeTag) {
      var itemTag = tag || this.aiTag;
      this.itemActiveTags = activeTag !== undefined ? activeTag : [];
      var result = this.itemActiveTags.indexOf(itemTag) > -1;
      return result;
    },
    setDefaultActive: function setDefaultActive() {
      var _this = this;

      var parent = this.parent,
          itemActiveTag = this.itemActiveTag;

      this.itemAnimated = parent.animated;
      this.itemOpen = parent.open;
      this.multiple = parent.multiple;
      this.active = this.isActive(itemActiveTag, parent.activeTag);
      this.$nextTick(function () {
        if (_this.itemAnimated) {
          _this.setAnimateStyle(_this.active);
        }
      });
    },
    setActive: function setActive() {
      var parent = this.parent,
          active = this.active,
          multiple = this.multiple,
          itemAnimated = this.itemAnimated;

      var activeStatus = void 0;
      if (multiple) {
        var accordionItemRefs = parent.$children;
        accordionItemRefs.forEach(function (item) {
          if (item.active) {
            item.active = false;
            setTimeout(function () {
              item.animatedHeight = { height: '0px' };
            }, 0);
          }
        });
        activeStatus = active ? 1 : 0;
      } else {
        activeStatus = active ? 1 : 0;
      }
      this.active = !activeStatus;
      if (itemAnimated) {
        this.setAnimateStyle(!activeStatus);
      }
    },
    onClickItem: function onClickItem() {
      var parent = this.parent,
          open = this.open;

      if (open) {
        return;
      }
      this.setActive();
      parent.onItemChange(this.itemActiveTag);
    },
    setAnimateStyle: function setAnimateStyle(active) {
      var _this2 = this;

      var newActive = active;
      if (newActive) {
        this.animatedHeight = { height: '0px' };
        setTimeout(function () {
          _this2.animatedHeight = { height: _this2.getContentHeight() + 'px' };
        }, 0);
      } else {
        this.animatedHeight = { height: this.getContentHeight() + 'px' };
        setTimeout(function () {
          _this2.animatedHeight = { height: '0px' };
        }, 0);
      }
    },
    getContentHeight: function getContentHeight() {
      var content = this.$refs.animateRoom;
      var children = content.children;
      var height = 0;
      var childrenArray = [].slice.call(children);
      childrenArray.forEach(function (item) {
        height += item.offsetHeight;
      });
      return height;
    }
  },
  render: function render() {
    var _ref, _ref2, _ref3;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        active = this.active,
        itemOpen = this.itemOpen,
        title = this.title,
        itemAnimated = this.itemAnimated,
        animatedHeight = this.animatedHeight;

    return h(
      'div',
      { 'class': (_ref = {}, defineProperty_default()(_ref, prefixCls + '-item', true), defineProperty_default()(_ref, 'active', active || itemOpen), _ref), ref: 'accordionItem' },
      [h(
        'div',
        { 'class': prefixCls + '-item-title', on: {
            'click': this.onClickItem
          }
        },
        [h('div', [title]), h('div', { 'class': (_ref2 = {}, defineProperty_default()(_ref2, prefixCls + '-item-arrow', true), defineProperty_default()(_ref2, prefixCls + '-item-arrow-hidden', itemOpen), _ref2) })]
      ), h(
        'div',
        { 'class': (_ref3 = {}, defineProperty_default()(_ref3, prefixCls + '-item-content', true), defineProperty_default()(_ref3, prefixCls + '-item-content-anim', itemAnimated), _ref3), ref: 'animateRoom', style: animatedHeight },
        [h(
          'div',
          { 'class': prefixCls + '-item-content-inner' },
          [this.$slots.default]
        )]
      )]
    );
  }
});
// CONCATENATED MODULE: ./src/accordion/src/accordionItem.vue?vue&type=script&lang=js
 /* harmony default export */ var src_accordionItemvue_type_script_lang_js = (accordionItemvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/accordion/src/accordionItem.vue
var accordionItem_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_accordionItemvue_type_script_lang_js,
  accordionItem_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var accordionItem = (component.exports);
// CONCATENATED MODULE: ./src/accordion-item/index.js


accordionItem.install = function (Vue) {
  Vue.component(accordionItem.name, accordionItem);
};

/* harmony default export */ var accordion_item = __webpack_exports__["default"] = (accordionItem);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/panel/src/panel-header.vue?vue&type=template&id=beab7352&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:(_vm.prefixCls + "-header")},[(_vm.$slots.title || _vm.title)?_c('div',{class:(_vm.prefixCls + "-title")},[_vm._t("title"),_vm._v(" "),(!_vm.$slots.title)?[_vm._v(_vm._s(_vm.title))]:_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.$slots.more || _vm.more)?_c('div',{class:(_vm.prefixCls + "-more")},[_vm._t("more"),_vm._v(" "),(!_vm.$slots.more)?[_vm._v(_vm._s(_vm.more))]:_vm._e()],2):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/panel/src/panel-header.vue?vue&type=template&id=beab7352&lang=html

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/panel/src/panel-header.vue?vue&type=script&lang=js


/* harmony default export */ var panel_headervue_type_script_lang_js = ({
  name: 'zaPanelHeader',
  props: {
    prefixCls: {
      type: String,
      default: 'za-panel'
    },
    title: {},
    more: {}
  },
  data: function data() {
    return {};
  },

  methods: {}
});
// CONCATENATED MODULE: ./src/panel/src/panel-header.vue?vue&type=script&lang=js
 /* harmony default export */ var src_panel_headervue_type_script_lang_js = (panel_headervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/panel/src/panel-header.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_panel_headervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var panel_header = (component.exports);
// CONCATENATED MODULE: ./src/panel-header/index.js


panel_header.install = function (Vue) {
  Vue.component(panel_header.name, panel_header);
};

/* harmony default export */ var src_panel_header = __webpack_exports__["default"] = (panel_header);

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/checkbox/src/checkbox-group.vue?vue&type=template&id=0724e8bd&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {
    'is-compact': _vm.compact,
    block: _vm.block,
    disabled: _vm.disabled,
  }, _obj[("" + _vm.prefixCls)] = true, _obj[("shape-" + _vm.shape)] = !!_vm.shape, _obj )},[_vm._t("default")],2)
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/checkbox/src/checkbox-group.vue?vue&type=template&id=0724e8bd&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/checkbox/src/checkbox-group.vue?vue&type=script&lang=js




/* harmony default export */ var checkbox_groupvue_type_script_lang_js = ({
  name: 'zaCheckboxGroup',
  props: {
    prefixCls: {
      type: String,
      default: 'za-checkbox-group'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'primary'
    },
    type: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['button', 'cell']),
      default: null
    },
    shape: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['radius', 'round']),
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    value: {}
  }
});
// CONCATENATED MODULE: ./src/checkbox/src/checkbox-group.vue?vue&type=script&lang=js
 /* harmony default export */ var src_checkbox_groupvue_type_script_lang_js = (checkbox_groupvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/checkbox/src/checkbox-group.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_checkbox_groupvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var checkbox_group = (component.exports);
// CONCATENATED MODULE: ./src/checkbox-group/index.js


checkbox_group.install = function (Vue) {
  Vue.component(checkbox_group.name, checkbox_group);
};

/* harmony default export */ var src_checkbox_group = __webpack_exports__["default"] = (checkbox_group);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/checkbox/src/checkbox.vue?vue&type=template&id=4b9b48e0
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.checkboxType === "cell")?_c('za-cell',{attrs:{"disabled":_vm.checkboxDisabled,"isLink":""},on:{"click":_vm.handleClick}},[_c('div',{class:_vm.cls},[_c('div',{class:(_vm.prefixCls + "-wrapper")},[_c('span',{class:(_vm.prefixCls + "-inner")}),_vm._v(" "),_c('span',{class:(_vm.prefixCls + "-text")},[_vm._t("default")],2),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],class:(_vm.prefixCls + "-input"),attrs:{"type":"checkbox","disabled":_vm.checkboxDisabled},domProps:{"value":_vm.label,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.label)>-1:(_vm.model)},on:{"change":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.label,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}}}})])])]):(_vm.checkboxType === "button")?_c('za-button',{class:_vm.cls,attrs:{"theme":_vm.theme,"size":"xs","block":_vm.block || _vm.isBlock,"disabled":_vm.checkboxDisabled,"bordered":!_vm.isChecked}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],class:(_vm.prefixCls + "-input"),attrs:{"type":"checkbox","disabled":_vm.checkboxDisabled},domProps:{"value":_vm.label,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.label)>-1:(_vm.model)},on:{"change":[function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.label,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}},_vm.onValueChange]}}),_vm._v(" "),_vm._t("default")],2):_c('div',{class:_vm.cls},[_c('div',{class:(_vm.prefixCls + "-wrapper")},[_c('span',{class:(_vm.prefixCls + "-inner")}),_vm._v(" "),_c('span',{class:(_vm.prefixCls + "-text")},[_vm._t("default")],2),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],class:(_vm.prefixCls + "-input"),attrs:{"type":"checkbox","disabled":_vm.checkboxDisabled},domProps:{"value":_vm.label,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.label)>-1:(_vm.model)},on:{"change":[function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.label,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}},_vm.onValueChange]}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/checkbox/src/checkbox.vue?vue&type=template&id=4b9b48e0

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(64);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(37);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/button/index.js + 5 modules
var src_button = __webpack_require__(63);

// EXTERNAL MODULE: ./src/cell/index.js + 5 modules
var cell = __webpack_require__(94);

// EXTERNAL MODULE: ./src/mixins/emitter.js
var emitter = __webpack_require__(87);

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/checkbox/src/checkbox.vue?vue&type=script&lang=js








/* harmony default export */ var checkboxvue_type_script_lang_js = ({
  name: 'zaCheckbox',
  mixins: [emitter["a" /* default */]],
  components: {
    zaButton: src_button["default"],
    zaCell: cell["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-checkbox'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'primary'
    },
    type: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['button', 'cell']),
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {},
    label: {},
    block: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      currentChecked: false
    };
  },


  computed: {
    model: {
      get: function get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.currentChecked;
      },
      set: function set(val) {
        if (this.isGroup) {
          this.dispatch('zaCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.currentChecked = val;
        }
      }
    },
    isGroup: function isGroup() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.name !== 'zaCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    isChecked: function isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      }
    },
    store: function store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    checkboxType: function checkboxType() {
      return this.isGroup ? this._checkboxGroup.type : this.type;
    },
    checkboxDisabled: function checkboxDisabled() {
      return this.isGroup ? this._checkboxGroup.disabled || this.disabled : this.disabled;
    },
    isBlock: function isBlock() {
      return this.isGroup ? this._checkboxGroup.block : this.block;
    },
    cls: function cls() {
      var _ref;

      var prefixCls = this.prefixCls,
          theme = this.theme,
          shape = this.shape,
          size = this.size,
          checkboxDisabled = this.checkboxDisabled,
          isChecked = this.isChecked;

      return _ref = {}, defineProperty_default()(_ref, '' + prefixCls, true), defineProperty_default()(_ref, 'theme-' + theme, !!theme), defineProperty_default()(_ref, 'shape-' + shape, !!shape), defineProperty_default()(_ref, 'size-' + size, !!size), defineProperty_default()(_ref, 'checked', !!isChecked), defineProperty_default()(_ref, 'disabled', !!checkboxDisabled), _ref;
    }
  },
  methods: {
    onValueChange: function onValueChange(event) {
      var _this = this;

      this.$nextTick(function (_) {
        if (_this.isGroup) {
          _this.dispatch('zaCheckboxGroup', 'change', [[].concat(toConsumableArray_default()(_this.model)), event]);
        } else {
          _this.$emit('change', _this.model, event);
        }
      });
    },
    handleClick: function handleClick(event) {
      if (this.checkboxDisabled) return;
      if (this.isGroup) {
        var index = this.model.indexOf(this.label);
        if (index >= 0) {
          this.model.splice(index, 1);
        } else {
          this.model.push(this.label);
        }
        this.onValueChange(event);
      } else {
        this.model = !this.model;
        this.onValueChange(event);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/checkbox/src/checkbox.vue?vue&type=script&lang=js
 /* harmony default export */ var src_checkboxvue_type_script_lang_js = (checkboxvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/checkbox/src/checkbox.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_checkboxvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_checkbox = (component.exports);
// CONCATENATED MODULE: ./src/checkbox/index.js


src_checkbox.install = function (Vue) {
  Vue.component(src_checkbox.name, src_checkbox);
};

/* harmony default export */ var src_checkbox_0 = __webpack_exports__["default"] = (src_checkbox);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/input/src/input-number.vue?vue&type=template&id=8a800dfc&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[(_vm.prefixCls + "-number")] = true, _obj['disabled'] = _vm.disabled, _obj['focus'] = _vm.visible, _obj ),on:{"click":_vm.onFocus}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.currentValue),expression:"!currentValue"}],class:(_vm.prefixCls + "-placeholder")},[_vm._v(_vm._s(_vm.placeholder))]),_vm._v(" "),_c('div',{ref:"content",class:(_vm.prefixCls + "-content")},[_vm._v(_vm._s(_vm.currentValue))]),_vm._v(" "),_c('input',{attrs:{"type":"hidden","disabled":_vm.disabled,"readonly":_vm.readonly},domProps:{"value":_vm.currentValue}}),_vm._v(" "),_c('KeyboardPicker',{ref:"picker",attrs:{"visible":_vm.visible,"type":_vm.type},on:{"update:visible":function($event){_vm.visible=$event},"keyClick":_vm.onKeyClick}})],1)
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/input/src/input-number.vue?vue&type=template&id=8a800dfc&lang=html

// EXTERNAL MODULE: ./src/utils/events.js
var events = __webpack_require__(85);

// EXTERNAL MODULE: ./src/keyboard-picker/index.js + 5 modules
var keyboard_picker = __webpack_require__(115);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/input/src/input-number.vue?vue&type=script&lang=js





/* harmony default export */ var input_numbervue_type_script_lang_js = ({
  name: 'zaInputNumber',
  props: {
    prefixCls: {
      type: String,
      default: 'za-input'
    },
    placeholder: String,
    type: {
      type: String,
      default: 'number'
    },
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: Boolean
  },
  data: function data() {
    return {
      currentValue: this.value || '',
      visible: false
    };
  },

  components: {
    KeyboardPicker: keyboard_picker["default"]
  },
  watch: {
    'value': function value(val, oldValue) {
      this.setCurrentValue(val);
    }
  },
  mounted: function mounted() {
    var _this = this;

    events["a" /* default */].on(document.body, 'click', this.onMaskClick);
    if (this.autoFocus || this.focused) {
      this.onFocus();
    }
    this.$nextTick(function () {
      if ('focused' in _this || 'autoFocus' in _this) {
        if (_this.focused || _this.autoFocus) {
          _this.onFocus();
        } else {
          _this.onBlur();
        }
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    events["a" /* default */].off(document.body, 'click', this.onMaskClick);
  },

  methods: {
    setCurrentValue: function setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.currentValue = value;
    },
    onMaskClick: function onMaskClick(e) {
      var _this2 = this;

      if (!this.visible) {
        return;
      }

      var cNode = function (node) {
        var picker = _this2.$refs.picker;
        while (node.parentNode && node.parentNode !== document.body) {
          if (node === picker) {
            return node;
          }
          node = node.parentNode;
        }
      }(e.target);

      if (!cNode) {
        this.onBlur();
      }
    },
    onKeyClick: function onKeyClick(key) {
      if (['close', 'ok'].indexOf(key) > -1) {
        this.onBlur();
        return;
      }
      var value = this.value;
      var newValue = key === 'delete' ? value.slice(0, value.length - 1) : value + key;

      if (newValue !== value) {
        this.currentValue = newValue;
        this.scrollToEnd();
        this.$emit('input', newValue);
        this.$emit('change', newValue);
        this.currentValue = newValue;
      }
    },
    scrollToStart: function scrollToStart() {
      if (!this.$refs.content) return;
      this.$refs.content.scrollLeft = 0;
    },
    scrollToEnd: function scrollToEnd() {
      if (!this.$refs.content) return;
      this.$refs.content.scrollLeft = this.$refs.content.scrollWidth;
    },
    onFocus: function onFocus() {
      if (this.visible) {
        return;
      }

      this.visible = true;
      this.scrollToEnd();
      this.$emit('focus', this.value);
    },
    onBlur: function onBlur() {
      if (!this.visible) {
        return;
      }

      this.visible = true;
      this.scrollToStart();
      this.$emit('blur', this.value);
    }
  }
});
// CONCATENATED MODULE: ./src/input/src/input-number.vue?vue&type=script&lang=js
 /* harmony default export */ var src_input_numbervue_type_script_lang_js = (input_numbervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/input/src/input-number.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_input_numbervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var input_number = (component.exports);
// CONCATENATED MODULE: ./src/input-number/index.js


input_number.install = function (Vue) {
  Vue.component(input_number.name, input_number);
};

/* harmony default export */ var src_input_number = __webpack_exports__["default"] = (input_number);

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/badge/src/badge.vue?vue&type=template&id=03fc42ba&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj[("shape-" + _vm.shape)] = !!_vm.shape, _obj )},[_vm._t("default"),_vm._v(" "),_c('sup',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-sup")] = true, _obj$1[(_vm.prefixCls + "-sup-up")] = _vm.sup, _obj$1 ),on:{"click":_vm.supClick}},[_vm._v("\n    "+_vm._s(_vm.text)+"\n    "),_vm._t("text")],2)],2)
var _obj;
var _obj$1;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/badge/src/badge.vue?vue&type=template&id=03fc42ba&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/badge/src/badge.vue?vue&type=script&lang=js




/* harmony default export */ var badgevue_type_script_lang_js = ({
  name: 'zaBadge',
  props: {
    prefixCls: {
      type: String,
      default: 'za-badge'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'error'
    },
    shape: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['dot', 'radius', 'round', 'circle']),
      default: null
    },
    sup: {
      type: Boolean,
      default: false
    },
    text: [String, Number]
  },
  methods: {
    supClick: function supClick(event) {
      this.$emit('click', event);
    }
  }
});
// CONCATENATED MODULE: ./src/badge/src/badge.vue?vue&type=script&lang=js
 /* harmony default export */ var src_badgevue_type_script_lang_js = (badgevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/badge/src/badge.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_badgevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var badge = (component.exports);
// CONCATENATED MODULE: ./src/badge/index.js


badge.install = function (Vue) {
  Vue.component(badge.name, badge);
};

/* harmony default export */ var src_badge = __webpack_exports__["default"] = (badge);

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/panel/src/panel.vue?vue&type=template&id=87485ad0&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefixCls},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/panel/src/panel.vue?vue&type=template&id=87485ad0&lang=html

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/panel/src/panel.vue?vue&type=script&lang=js


/* harmony default export */ var panelvue_type_script_lang_js = ({
  name: 'zaPanel',
  props: {
    prefixCls: {
      type: String,
      default: 'za-panel'
    }
  },
  data: function data() {
    return {};
  },

  methods: {}
});
// CONCATENATED MODULE: ./src/panel/src/panel.vue?vue&type=script&lang=js
 /* harmony default export */ var src_panelvue_type_script_lang_js = (panelvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/panel/src/panel.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_panelvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var panel = (component.exports);
// CONCATENATED MODULE: ./src/panel/index.js


panel.install = function (Vue) {
  Vue.component(panel.name, panel);
};

/* harmony default export */ var src_panel = __webpack_exports__["default"] = (panel);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/panel/src/panel-body.vue?vue&type=template&id=3ef676d2&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefixCls},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/panel/src/panel-body.vue?vue&type=template&id=3ef676d2&lang=html

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/panel/src/panel-body.vue?vue&type=script&lang=js


/* harmony default export */ var panel_bodyvue_type_script_lang_js = ({
  name: 'zaPanelBody',
  props: {
    prefixCls: {
      type: String,
      default: 'za-panel-body'
    }
  },
  data: function data() {
    return {};
  },

  methods: {}
});
// CONCATENATED MODULE: ./src/panel/src/panel-body.vue?vue&type=script&lang=js
 /* harmony default export */ var src_panel_bodyvue_type_script_lang_js = (panel_bodyvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/panel/src/panel-body.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_panel_bodyvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var panel_body = (component.exports);
// CONCATENATED MODULE: ./src/panel-body/index.js


panel_body.install = function (Vue) {
  Vue.component(panel_body.name, panel_body);
};

/* harmony default export */ var src_panel_body = __webpack_exports__["default"] = (panel_body);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/panel/src/panel-footer.vue?vue&type=template&id=11a3015b&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:(_vm.prefixCls + "-footer")},[(_vm.$slots.title || _vm.title)?_c('div',{class:(_vm.prefixCls + "-title")},[_vm._t("title"),_vm._v(" "),(!_vm.$slots.title)?[_vm._v(_vm._s(_vm.title))]:_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.$slots.more || _vm.more)?_c('div',{class:(_vm.prefixCls + "-more")},[_vm._t("more"),_vm._v(" "),(!_vm.$slots.more)?[_vm._v(_vm._s(_vm.more))]:_vm._e()],2):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/panel/src/panel-footer.vue?vue&type=template&id=11a3015b&lang=html

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/panel/src/panel-footer.vue?vue&type=script&lang=js


/* harmony default export */ var panel_footervue_type_script_lang_js = ({
  name: 'zaPanelFooter',
  props: {
    prefixCls: {
      type: String,
      default: 'za-panel'
    },
    title: {},
    more: {}
  },
  data: function data() {
    return {};
  },

  methods: {}
});
// CONCATENATED MODULE: ./src/panel/src/panel-footer.vue?vue&type=script&lang=js
 /* harmony default export */ var src_panel_footervue_type_script_lang_js = (panel_footervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/panel/src/panel-footer.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_panel_footervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var panel_footer = (component.exports);
// CONCATENATED MODULE: ./src/panel-footer/index.js


panel_footer.install = function (Vue) {
  Vue.component(panel_footer.name, panel_footer);
};

/* harmony default export */ var src_panel_footer = __webpack_exports__["default"] = (panel_footer);

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/progress/src/progress.vue?vue&type=template&id=08e1dae4&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj[(_vm.prefixCls + "-" + _vm.type)] = !!_vm.type, _obj )},[(_vm.type==='circle')?_c('div',{class:(_vm.prefixCls + "-inner")},[_c('za-spinner',{attrs:{"theme":_vm.theme,"strokeWidth":_vm.strokeWidth,"percent":_vm.percent}})],1):_c('div',{class:(_vm.prefixCls + "-inner"),style:({height: (_vm.strokeWidth + "px")})},[_c('div',{class:(_vm.prefixCls + "-bg"),style:({ width: (_vm.percent + "%") })})]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-text")},[_vm._t("default")],2)])
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/progress/src/progress.vue?vue&type=template&id=08e1dae4&lang=html

// EXTERNAL MODULE: ./src/spinner/index.js + 5 modules
var spinner = __webpack_require__(47);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/progress/src/progress.vue?vue&type=script&lang=js




/* harmony default export */ var progressvue_type_script_lang_js = ({
  name: 'zaProgress',
  components: {
    zaSpinner: spinner["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-progress'
    },
    theme: spinner["default"].props.theme,
    strokeWidth: spinner["default"].props.strokeWidth,
    percent: spinner["default"].props.percent,
    type: {
      type: String,
      validator: function validator(v) {
        return ['line', 'circle'].indexOf(v) >= 0;
      },
      default: 'line'
    }
  }
});
// CONCATENATED MODULE: ./src/progress/src/progress.vue?vue&type=script&lang=js
 /* harmony default export */ var src_progressvue_type_script_lang_js = (progressvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/progress/src/progress.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_progressvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var progress = (component.exports);
// CONCATENATED MODULE: ./src/progress/index.js


progress.install = function (Vue) {
  Vue.component(progress.name, progress);
};

/* harmony default export */ var src_progress = __webpack_exports__["default"] = (progress);

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/search-bar/src/search-bar.vue?vue&type=template&id=cf96fdd0&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefixCls},[_c('form',{ref:"searchForm",class:( _obj = {}, _obj[(_vm.prefixCls + "-form")] = true, _obj[(_vm.prefixCls + "-form-focus")] = !!(_vm.focus || (_vm.currentValue && _vm.currentValue.length > 0)), _obj ),attrs:{"action":"#"},on:{"submit":_vm.onSubmit}},[_c('div',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-content")] = true, _obj$1[("shape-" + _vm.shape)] = !!_vm.shape, _obj$1 )},[_c('div',{class:(_vm.prefixCls + "-mock")},[_c('div',{ref:"searchContainer",class:(_vm.prefixCls + "-mock-container")},[_c('za-icon',{attrs:{"type":"search"}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.isVisibility),expression:"isVisibility"}],class:(_vm.prefixCls + "-mock-placeholder")},[_vm._v(_vm._s(_vm.placeholder))])],1)]),_vm._v(" "),_c('za-input',{ref:"inputRef",attrs:{"type":"search","placeholder":_vm.placeholder,"value":_vm.currentValue,"disabled":_vm.disabled,"clearable":_vm.clearable},on:{"focus":_vm.onFocus,"compositionStart":_vm.handleComposition,"compositionUpdate":_vm.handleComposition,"compositionEnd":_vm.handleComposition,"change":_vm.onChange,"blur":_vm.onBlur,"clear":_vm.onClear}})],1),_vm._v(" "),_c('div',{ref:"cancelRef",class:( _obj$2 = {}, _obj$2[(_vm.prefixCls + "-cancel")] = true, _obj$2[(_vm.prefixCls + "-cancel-show")] = !!(_vm.showCancel || _vm.focusStatus || (_vm.currentValue && _vm.currentValue.length > 0)), _obj$2 ),on:{"click":_vm.onCancel}},[_vm._v(_vm._s(_vm.cancelText))])])])
var _obj;
var _obj$1;
var _obj$2;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/search-bar/src/search-bar.vue?vue&type=template&id=cf96fdd0&lang=html

// EXTERNAL MODULE: ./src/input/src/input.vue + 4 modules
var input = __webpack_require__(91);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/search-bar/src/search-bar.vue?vue&type=script&lang=js




/* harmony default export */ var search_barvue_type_script_lang_js = ({
  name: 'zaSearchBar',
  props: {
    prefixCls: {
      type: String,
      default: 'za-search-bar'
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    value: [String, Number],
    shape: [String],
    disabled: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      focusStatus: false,
      currentValue: this.defaultValue || this.value || '',
      isOnComposition: false
    };
  },

  components: {
    zaInput: input["a" /* default */]
  },
  watch: {
    'value': function value(_value, oldValue) {
      if (_value === this.currentValue) return;
      this.currentValue = _value;
    }
  },
  computed: {
    isVisibility: function isVisibility() {
      return this.currentValue ? 0 : 1;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.calculatePositon();
    });
  },

  methods: {
    calculatePositon: function calculatePositon() {
      var showCancel = this.showCancel;

      var formWidth = this.$refs.searchForm.getBoundingClientRect().width;
      var containerWidth = this.$refs.searchContainer.getBoundingClientRect().width;
      var ml = parseInt(window.getComputedStyle(this.$refs.cancelRef, '')['margin-left'].split('px')[0], 10);
      this.cancelOuterWidth = Math.ceil(ml + parseInt(this.$refs.cancelRef.getBoundingClientRect().width, 10));
      if (!showCancel) {
        this.$refs.cancelRef.style.cssText = 'margin-right: -' + this.cancelOuterWidth + 'px;';
        this.initPos = formWidth / 2 - containerWidth / 2;
      } else {
        this.initPos = formWidth / 2 - this.cancelOuterWidth / 2 - containerWidth / 2;
      }

      if (!this.currentValue) {
        this.$refs.searchContainer.style.transform = 'translate3d(' + this.initPos + 'px, 0, 0)';
        this.$refs.searchContainer.style.webkitTransform = 'translate3d(' + this.initPos + 'px, 0, 0)';
      } else {
        this.focusAnim(0);
      }
    },
    onFocus: function onFocus() {
      this.focusStatus = true;
      this.focusAnim();
      this.$emit('focus');
    },
    onChange: function onChange(value) {
      this.currentValue = value;
      if (!this.isOnComposition) {
        this.$emit('change', this.currentValue);
      }
    },
    handleComposition: function handleComposition(e) {
      if (e.type === 'compositionstart') {
        this.isOnComposition = true;
      }

      if (e.type === 'compositionend') {
        this.isOnComposition = false;
        var value = e.target.value;
        this.$emit('change', value);
      }
    },
    onBlur: function onBlur() {
      this.focusStatus = false;
      if (!this.currentValue) {
        this.blurAnim();
      }
      this.$emit('blur');
    },
    onClear: function onClear() {
      this.currentValue = '';
      this.isOnComposition = false;
      this.focus();
      this.$emit('clear', this.currentValue);
    },
    onCancel: function onCancel() {
      var showCancel = this.showCancel;

      if (!showCancel) {
        this.currentValue = '';
        this.isOnComposition = false;
        this.onBlur();
      }
      this.$emit('cancel');
    },
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      this.inputRef.blur();
      this.$emit('submit', this.currentValue);
    },
    focusAnim: function focusAnim() {
      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;

      this.$refs.searchContainer.style.cssText += 'transform: translate3d(10px, 0, 0);transition: ' + transition + 'ms;';
      this.$refs.cancelRef.style.cssText = 'margin-right: 0px;';
      this.$refs.cancelRef.classList.add('animation-ease');
    },
    blurAnim: function blurAnim() {
      var showCancel = this.showCancel;

      this.$refs.searchContainer.style.cssText += 'transform: translate3d(' + this.initPos + 'px, 0, 0);transition: 300ms;';
      if (!showCancel) {
        this.$refs.cancelRef.style.cssText = 'margin-right: -' + this.cancelOuterWidth + 'px;';
      }
    },
    focus: function focus() {
      this.$refs.inputRef.focus();
    }
  }
});
// CONCATENATED MODULE: ./src/search-bar/src/search-bar.vue?vue&type=script&lang=js
 /* harmony default export */ var src_search_barvue_type_script_lang_js = (search_barvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/search-bar/src/search-bar.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_search_barvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var search_bar = (component.exports);
// CONCATENATED MODULE: ./src/search-bar/index.js


search_bar.install = function (Vue) {
  Vue.component(search_bar.name, search_bar);
};
/* harmony default export */ var src_search_bar = __webpack_exports__["default"] = (search_bar);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/slider/src/slider.vue?vue&type=template&id=20aa424a&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {disabled: _vm.disabled}, _obj[("" + _vm.prefixCls)] = true, _obj )},[_c('div',{ref:"line",class:(_vm.prefixCls + "-line")},[_c('div',{class:(_vm.prefixCls + "-line-bg"),style:({width:(_vm.offset + "px")})})]),_vm._v(" "),_c('za-drag',{attrs:{"dragStart":_vm.onDragStart,"dragMove":_vm.onDragMove,"dragEnd":_vm.onDragEnd}},[_c('div',{class:(_vm.prefixCls + "-handle"),style:({left:(_vm.offset + "px")}),attrs:{"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"aria-valuenow":_vm.value}},[_c('div',{ref:"shadow",class:(_vm.prefixCls + "-handle-shadow")})])])],1)
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/slider/src/slider.vue?vue&type=template&id=20aa424a&lang=html

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/number/is-nan.js
var is_nan = __webpack_require__(96);
var is_nan_default = /*#__PURE__*/__webpack_require__.n(is_nan);

// EXTERNAL MODULE: ./src/drag/index.js + 3 modules
var drag = __webpack_require__(61);

// EXTERNAL MODULE: ./src/tooltip/index.js + 5 modules
var tooltip = __webpack_require__(112);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/slider/src/slider.vue?vue&type=script&lang=js






/* harmony default export */ var slidervue_type_script_lang_js = ({
  name: 'zaSlider',
  components: {
    zaDrag: drag["default"],
    zaTooltip: tooltip["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-slider'
    },
    visible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data: function data() {
    return {
      value: this.getInitValue(0),
      offset: 0,
      tooltip: null,
      offsetStart: 0
    };
  },
  mounted: function mounted() {
    this.init();
  },

  methods: {
    getInitValue: function getInitValue(defaultValue) {
      if (this.defaultValue) {
        return this.defaultValue;
      }
      return defaultValue;
    },
    onDragStart: function onDragStart() {
      var disabled = this.disabled;

      if (disabled) return;
      this.tooltip = this.$zaTooltip({ message: this.value });
      this.setShadowPosition();
    },
    onDragMove: function onDragMove(event, _ref) {
      var offsetX = _ref.offsetX;
      var disabled = this.disabled;

      if (disabled) return;
      event.preventDefault();
      var offset = this.offsetStart + offsetX;
      if (offset < 0) {
        offset = 0;
        var _value = this.getValueByOffset(offset);
        this.offset = offset;
        this.value = _value;
        this.tooltip.message = _value;
        this.setShadowPosition();
        return false;
      }
      if (offset > this.maxOffset()) {
        offset = this.maxOffset();
        var _value2 = this.getValueByOffset(offset);
        this.offset = offset;
        this.value = _value2;
        this.tooltip.message = _value2;
        this.setShadowPosition();
        return false;
      }
      var value = this.getValueByOffset(offset);
      offset = this.getOffsetByValue(value);
      this.offset = offset;
      this.value = value;
      this.tooltip.message = value;
      this.setShadowPosition();
      return true;
    },
    onDragEnd: function onDragEnd(event, _ref2) {
      var offsetX = _ref2.offsetX;

      this.tooltip.close();
      if (is_nan_default()(offsetX)) return;
      this.offsetStart += offsetX;

      this.$emit('change', event, this.value);
    },
    getValueByOffset: function getValueByOffset(offset) {
      var min = this.min,
          max = this.max,
          step = this.step;

      var percent = offset / this.maxOffset();
      var value = Math.round((min + (max - min) * percent) / step) * step;
      return Math.max(Math.min(value, max), min);
    },
    getOffsetByValue: function getOffsetByValue(value) {
      var min = this.min,
          max = this.max;

      return this.maxOffset() * ((value - min) / (max - min));
    },
    maxOffset: function maxOffset() {
      return this.$refs.line ? this.$refs.line.offsetWidth : 0;
    },
    init: function init() {
      var offset = this.getOffsetByValue(this.value);
      this.offsetStart = offset;
      this.offset = offset;
    },
    getLineOffsetWidth: function getLineOffsetWidth() {
      return {
        width: this.offset + 'px'
      };
    },
    getDragOffsetWidth: function getDragOffsetWidth() {
      return {
        left: this.offset + 'px'
      };
    },
    setShadowPosition: function setShadowPosition() {
      var rect = this.$refs.shadow.getBoundingClientRect();
      var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
      var top = rect.top + scrollTop;
      this.tooltip.styleCls = {
        left: rect.left + 'px',
        top: top + 'px',
        width: '' + rect.width
      };
    }
  }
});
// CONCATENATED MODULE: ./src/slider/src/slider.vue?vue&type=script&lang=js
 /* harmony default export */ var src_slidervue_type_script_lang_js = (slidervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/slider/src/slider.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_slidervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var slider = (component.exports);
// CONCATENATED MODULE: ./src/slider/index.js


slider.install = function (Vue) {
  Vue.component(slider.name, slider);
};

/* harmony default export */ var src_slider = __webpack_exports__["default"] = (slider);

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/stack-picker/src/stack-picker.vue?vue&type=template&id=5406cc33&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefixCls,on:{"click":_vm.handleClick}},[_c('div',{class:( _obj = {}, _obj[(_vm.prefixCls + "-input")] = true, _obj[(_vm.prefixCls + "-placeholder")] = !_vm.displayLabel, _obj[(_vm.prefixCls + "-disabled")] = _vm.disabled, _obj )},[_c('input',{attrs:{"type":"hidden"},domProps:{"value":_vm.value}}),_vm._v("\n    "+_vm._s(_vm.displayLabel || _vm.placeholder)+"\n    "),_c('div',{class:( _obj$1 = {}, _obj$1[(_vm.prefixCls + "-container")] = true, _obj$1[(_vm.prefixCls + "-hidden")] = !_vm.currentVisible, _obj$1 ),on:{"click":function($event){$event.stopPropagation();return (function () {})($event)}}},[_c('za-popup',{attrs:{"visible":_vm.currentVisible},on:{"close":_vm.onPopupClose}},[_c('div',{class:(_vm.prefixCls + "-wrapper")},[_c('div',{class:(_vm.prefixCls + "-header")},[_c('div',{class:(_vm.prefixCls + "-cancel"),on:{"click":_vm.handleCancel}},[_vm._v(_vm._s(_vm.cancelText))]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-title")},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-submit"),on:{"click":_vm.handleOk}},[_vm._v(_vm._s(_vm.okText))])]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-crumbs")},[_c('p',[_vm._v("选择："+_vm._s(_vm.currentValue.map(function (item) { return _vm.itemRender(item); }).join(_vm.labelAddon)))]),_vm._v(" "),(_vm.errorMsg)?_c('p',{class:(_vm.prefixCls + "-crumbs-error")},[_vm._v(_vm._s(_vm.errorMsg))]):_vm._e()]),_vm._v(" "),_c('div',{class:(_vm.prefixCls + "-stack-group")},_vm._l((_vm.renderGroup()),function(group,index){return _c('div',{key:index,class:( _obj = {
              'lower-hidden': !_vm.currentValue[index] || !_vm.currentValue[index][_vm.valueMember],
              }, _obj[(_vm.prefixCls + "-stack-column")] = true, _obj ),on:{"click":function($event){$event.stopPropagation();return (function (e) { return _vm.handleChange(index - 1); })($event)}}},[_c('div',{ref:"columns",refInFor:true,class:(_vm.prefixCls + "-stack-column-wrapper"),on:{"click":function($event){$event.stopPropagation();return (function () {})($event)}}},_vm._l((group),function(item,i){return _c('div',{key:("item" + i),class:( _obj = {
                    active: _vm.currentValue[index] && _vm.currentValue[index][_vm.valueMember] === item[_vm.valueMember],
                    }, _obj[(_vm.prefixCls + "-stack-item")] = true, _obj ),on:{"click":function($event){$event.stopPropagation();return (function (e) { return _vm.handleChange(index, item, index === _vm.renderGroup().length - 1); })($event)}}},[_vm._v("\n                    "+_vm._s(_vm.itemRender(item))+"\n                ")])
              var _obj;}))])
    var _obj;}))])])],1)])])
var _obj;
var _obj$1;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/stack-picker/src/stack-picker.vue?vue&type=template&id=5406cc33&lang=html

// EXTERNAL MODULE: ./src/popup/index.js + 5 modules
var popup = __webpack_require__(51);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/stack-picker/src/stack-picker.vue?vue&type=script&lang=js




/* harmony default export */ var stack_pickervue_type_script_lang_js = ({
  name: 'zaStackPicker',
  components: {
    zaPopup: popup["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-stack-picker'
    },
    dataSource: {
      type: Array,
      required: true
    },
    defaultValue: Array,
    value: Array,
    displayMember: {
      type: String,
      default: 'label'
    },
    valueMember: {
      type: String,
      default: 'value'
    },
    title: {
      type: String,
      default: '请选择'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    visible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    cols: {
      type: Number,
      default: Infinity
    },
    labelAddon: {
      type: String,
      default: ' > '
    },
    displayItems: {
      type: Number,
      default: 8
    },
    itemHeight: {
      type: Number,
      default: 50
    },
    displayRender: {
      type: Function,
      default: function _default(datas) {
        return datas.map(function (_ref) {
          var label = _ref.label;
          return label;
        }).join('');
      }
    },
    itemRender: {
      type: Function,
      default: function _default(d) {
        return d.label;
      }
    },
    validate: {
      type: Function,
      default: function _default() {}
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    }
  },
  watch: {
    visible: function visible(val, oldVal) {
      if (this.currentVisible === val) return;
      this.currentVisible = val;
    },
    value: function value(val, oldVal) {
      var param = {
        value: val,
        defaultValue: '',
        dataSource: this.dataSource,
        validate: this.validate
      };
      var newCurrentValue = this.resolveProps(param).currentValue;
      if (this.currentValue === val) return;
      this.currentValue = newCurrentValue;
    }
  },
  computed: {
    displayLabel: function displayLabel() {
      return this.displayRender(this.currentValue);
    }
  },
  data: function data() {
    var data = this.resolveProps(this);
    data.currentVisible = this.visible;
    data.oldValue = data.currentValue;
    return data;
  },

  methods: {
    resolveProps: function resolveProps(_ref2) {
      var _this = this;

      var value = _ref2.value,
          defaultValue = _ref2.defaultValue,
          dataSource = _ref2.dataSource,
          validate = _ref2.validate;

      var resolveValue = [];
      var v = value || defaultValue || [];
      v.reduce(function (list, item) {
        var valueItem = _this.obtainItem(list, item);

        if (valueItem) {
          resolveValue.push(valueItem);

          return valueItem.children || [];
        }

        return [];
      }, dataSource);

      return {
        currentValue: resolveValue,
        errorMsg: validate(v)
      };
    },
    obtainItem: function obtainItem(list, value) {
      var valueMember = this.valueMember;

      return list.filter(function (item) {
        return item[valueMember] === value;
      })[0];
    },
    reposition: function reposition() {
      var _this2 = this;

      var dataSource = this.dataSource,
          valueMember = this.valueMember,
          disabled = this.disabled,
          displayItems = this.displayItems,
          itemHeight = this.itemHeight,
          cols = this.cols,
          currentValue = this.currentValue;


      if (disabled) return;

      currentValue.reduce(function (data, item, index) {
        var value = item[valueMember];
        var valIndex = data.map(function (dataItem) {
          return dataItem[valueMember];
        }).indexOf(value);

        if (index < cols && valIndex >= 0) {
          var target = _this2.$refs.columns[index];
          var position = target.scrollTop;
          var viewTopIndex = valIndex - displayItems;

          if (position < (viewTopIndex + 1) * itemHeight || position > valIndex * itemHeight) {
            target.scrollTop = valIndex * itemHeight;
          }

          return data[valIndex].children || [];
        }

        return [];
      }, dataSource);
    },
    handleClick: function handleClick(event) {
      if (this.disabled) return;
      this.$emit('click', event);
      this.toggle();
    },
    toggle: function toggle() {
      if (this.disabled) {
        return;
      }
      this.currentVisible = !this.currentVisible;
      this.$emit('update:visible', this.currentVisible);
    },
    onPopupClose: function onPopupClose(reason) {
      if (reason === 'clickaway') {
        this.currentValue = this.oldValue;
        this.currentVisible = !this.currentVisible;
        this.$emit('update:visible', this.currentVisible);
      }
    },
    handleCancel: function handleCancel(event) {
      this.toggle();
      this.currentValue = this.oldValue;
      this.$emit('cancel', event);
    },
    renderGroup: function renderGroup() {
      var valueMember = this.valueMember,
          cols = this.cols,
          currentValue = this.currentValue;

      var group = [];
      var dataSource = this.dataSource;
      var i = 0;
      while (dataSource) {
        group.push(dataSource);

        var colVal = currentValue[i];
        var childrenData = ((colVal ? this.obtainItem(dataSource, colVal[valueMember]) : dataSource[0]) || {}).children;

        if (childrenData && childrenData.length && i < cols - 1) {
          dataSource = childrenData;
        } else {
          dataSource = null;
        }

        i += 1;
      }

      return group;
    },
    handleChange: function handleChange(index, item, isLast) {
      var _this3 = this;

      var validate = this.validate;

      var value = this.currentValue.slice(0, index);
      var errorMsg = null;

      if (item) {
        value[index] = item;
      }
      errorMsg = validate(value);
      if (isLast && !errorMsg) {
        this.currentValue = value;
        this.errorMsg = errorMsg;

        this.$emit('change', value.map(function (v) {
          return v[_this3.valueMember];
        }));
      } else {
        this.currentValue = value;
        this.errorMsg = errorMsg;

        this.$emit('change', value.map(function (v) {
          return v[_this3.valueMember];
        }));
      }
    },
    handleOk: function handleOk() {
      var _this4 = this;

      var validate = this.validate;

      var value = this.currentValue;
      var errorMsg = null;
      errorMsg = validate(value);
      if (!errorMsg) {
        this.errorMsg = errorMsg;
        this.oldValue = this.currentValue;
        this.$emit('input', value.map(function (v) {
          return v[_this4.valueMember];
        }));
        this.$emit('change', value.map(function (v) {
          return v[_this4.valueMember];
        }));
        this.$emit('ok', value);
        this.toggle();
      } else {
        this.errorMsg = errorMsg;
        this.$emit('input', value.map(function (v) {
          return v[_this4.valueMember];
        }));
        this.$emit('change', value.map(function (v) {
          return v[_this4.valueMember];
        }));
      }
    }
  },
  mounted: function mounted() {
    this.reposition();
  },
  updated: function updated() {
    this.reposition();
  }
});
// CONCATENATED MODULE: ./src/stack-picker/src/stack-picker.vue?vue&type=script&lang=js
 /* harmony default export */ var src_stack_pickervue_type_script_lang_js = (stack_pickervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/stack-picker/src/stack-picker.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_stack_pickervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var stack_picker = (component.exports);
// CONCATENATED MODULE: ./src/stack-picker/index.js


stack_picker.install = function (Vue) {
  Vue.component(stack_picker.name, stack_picker);
};

/* harmony default export */ var src_stack_picker = __webpack_exports__["default"] = (stack_picker);

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/actionsheet/src/actionsheet.vue?vue&type=template&id=86355734&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('za-popup',{attrs:{"visible":_vm.currentVisible},on:{"close":_vm.handlePopupClose}},[_c('div',{class:( _obj = {}, _obj[("" + _vm.prefixCls)] = true, _obj[("shape-" + _vm.shape)] = !!_vm.shape, _obj[(_vm.prefixCls + "-spacing")] = _vm.spacing, _obj )},[_c('div',{class:(_vm.prefixCls + "-actions")},_vm._l((_vm.actions),function(action,index){return _c('a',{key:index,class:( _obj = {}, _obj[(_vm.prefixCls + "-item")] = true, _obj[("theme-" + (action.theme))] = !!action.theme, _obj ),on:{"click":action.onClick}},[_vm._v(_vm._s(action.text))])
  var _obj;})),_vm._v(" "),(_vm.showCancel)?_c('div',{class:(_vm.prefixCls + "-cancel")},[_c('a',{class:(_vm.prefixCls + "-item"),on:{"click":_vm.onCancel}},[_vm._v(_vm._s(_vm.cancelText))])]):_vm._e()])])
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/actionsheet/src/actionsheet.vue?vue&type=template&id=86355734&lang=html

// EXTERNAL MODULE: ./src/popup/index.js + 5 modules
var popup = __webpack_require__(51);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/actionsheet/src/actionsheet.vue?vue&type=script&lang=js




/* harmony default export */ var actionsheetvue_type_script_lang_js = ({
  name: 'zaActionsheet',
  components: {
    zaPopup: popup["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-actionsheet'
    },
    shape: {
      type: String,
      default: ''
    },
    spacing: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    visible: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      currentVisible: this.visible
    };
  },

  watch: {
    visible: function visible(value, oldValue) {
      if (value === this.currentVisible) return;
      this.currentVisible = value;
    }
  },
  methods: {
    onCancel: function onCancel(event) {
      this.currentVisible = false;
      this.$emit('cancel', 'action', event);
      this.$emit('update:visible', false);
    },
    handlePopupClose: function handlePopupClose(reason, event) {
      if (reason === 'clickaway') {
        this.$emit('cancel', reason, event);
        this.$emit('update:visible', false);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/actionsheet/src/actionsheet.vue?vue&type=script&lang=js
 /* harmony default export */ var src_actionsheetvue_type_script_lang_js = (actionsheetvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/actionsheet/src/actionsheet.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_actionsheetvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var actionsheet = (component.exports);
// CONCATENATED MODULE: ./src/actionsheet/index.js


actionsheet.install = function (Vue) {
  Vue.component(actionsheet.name, actionsheet);
};

/* harmony default export */ var src_actionsheet = __webpack_exports__["default"] = (actionsheet);

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/stepper/src/stepper.vue?vue&type=template&id=268f990e&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:( _obj = {
    disabled: _vm.disabled,
  }, _obj[("" + _vm.prefixCls)] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj[("size-" + _vm.size)] = !!_vm.size, _obj[("shape-" + _vm.shape)] = !!_vm.shape, _obj )},[_c('span',{class:( _obj$1 = {
      disabled: _vm.subDisabled,
    }, _obj$1[(_vm.prefixCls + "-sub")] = true, _obj$1 ),on:{"click":_vm.handleSubClick}},[_c('za-icon',{attrs:{"type":"minus"}})],1),_vm._v(" "),_c('input',{class:(_vm.prefixCls + "-body"),attrs:{"type":"tel","disabled":_vm.disabled},domProps:{"value":_vm.currentValue},on:{"input":_vm.handleInput}}),_vm._v(" "),_c('span',{class:( _obj$2 = {
      disabled: _vm.plusDisabled,
    }, _obj$2[(_vm.prefixCls + "-plus")] = true, _obj$2 ),on:{"click":_vm.handlePlusClick}},[_c('za-icon',{attrs:{"type":"add"}})],1)])
var _obj;
var _obj$1;
var _obj$2;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/stepper/src/stepper.vue?vue&type=template&id=268f990e&lang=html

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/number/is-nan.js
var is_nan = __webpack_require__(96);
var is_nan_default = /*#__PURE__*/__webpack_require__.n(is_nan);

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// EXTERNAL MODULE: ./src/icon/index.js
var icon = __webpack_require__(39);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/stepper/src/stepper.vue?vue&type=script&lang=js






/* harmony default export */ var steppervue_type_script_lang_js = ({
  components: {
    zaIcon: icon["default"]
  },
  name: 'zaStepper',
  props: {
    prefixCls: {
      type: String,
      default: 'za-stepper'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'primary'
    },
    size: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['xl', 'lg', 'sm', 'xs']),
      default: null
    },
    shape: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['radius', 'circle']),
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    subDisabled: function subDisabled() {
      return !!(typeof this.min === 'number' && this.currentValue <= this.min) || this.disabled;
    },
    plusDisabled: function plusDisabled() {
      return !!(typeof this.max === 'number' && this.currentValue >= this.max) || this.disabled;
    }
  },
  watch: {
    'value': function value(val, oldValue) {
      if (val === this.currentValue) return;
      this.handleValue(val);
    }
  },
  data: function data() {
    return {
      currentValue: this.value || 0,
      lastValue: this.value || 0
    };
  },

  methods: {
    handleSubClick: function handleSubClick(event) {
      if (this.subDisabled) return;
      var value = this.currentValue - this.step;
      if (this.min !== null && value < this.min) {
        this.currentValue = this.min;
      } else {
        this.currentValue = value;
      }
      this.lastValue = this.currentValue;
      this.$emit('input', Number(this.currentValue));
      this.$emit('change', event);
    },
    handlePlusClick: function handlePlusClick(event) {
      if (this.plusDisabled) return;
      var value = this.currentValue + this.step;
      if (this.max !== null && value > this.max) {
        this.currentValue = this.max;
      } else {
        this.currentValue = value;
      }
      this.lastValue = this.currentValue;
      this.$emit('input', Number(this.currentValue));
      this.$emit('change', event);
    },
    handleInput: function handleInput(event) {
      var value = Number(event.target.value);
      this.handleValue(value, event);
    },
    handleValue: function handleValue(value, event) {
      var _this = this;

      if (is_nan_default()(value)) {
        if (value === '-') {
          this.currentValue = '-';
          return;
        }
        this.currentValue = value;
        this.$nextTick(function () {
          _this.currentValue = _this.lastValue;
        });
      } else if (this.min !== null && value < this.min) {
        this.currentValue = value;
        this.$nextTick(function () {
          _this.currentValue = _this.min;
          _this.lastValue = _this.currentValue;
          _this.$emit('input', Number(_this.currentValue));
          _this.$emit('change', event);
        });
      } else if (this.max !== null && value > this.max) {
        this.currentValue = value;
        this.$nextTick(function () {
          _this.currentValue = _this.max;
          _this.lastValue = _this.currentValue;
          _this.$emit('input', Number(_this.currentValue));
          _this.$emit('change', event);
        });
      } else {
        this.currentValue = value;
        this.lastValue = this.currentValue;
        this.$emit('input', Number(this.currentValue));
        this.$emit('change', event);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/stepper/src/stepper.vue?vue&type=script&lang=js
 /* harmony default export */ var src_steppervue_type_script_lang_js = (steppervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/stepper/src/stepper.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_steppervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var stepper = (component.exports);
// CONCATENATED MODULE: ./src/stepper/index.js


stepper.install = function (Vue) {
  Vue.component(stepper.name, stepper);
};

/* harmony default export */ var src_stepper = __webpack_exports__["default"] = (stepper);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/swipe-action/src/swipe-action.vue?vue&type=template&id=7b1ebd99&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.left.length || _vm.right.length)?_c('div',{ref:"wrap",class:("" + _vm.prefixCls)},[(_vm.left.length)?_c('div',{ref:"left",class:(_vm.prefixCls + "-actions-left")},_vm._l((_vm.left),function(button,index){return _c('div',{key:index,class:( _obj = {}, _obj[(_vm.prefixCls + "-button")] = true, _obj[("theme-" + (button.theme))] = true, _obj ),on:{"click":function($event){_vm.handleBtnClick(button, $event)}}},[_c('div',{class:(_vm.prefixCls + "-text")},[_vm._v(_vm._s(button.text || ('left' + index)))])])
var _obj;})):_vm._e(),_vm._v(" "),(_vm.right.length)?_c('div',{ref:"right",class:(_vm.prefixCls + "-actions-right")},_vm._l((_vm.right),function(button,index){return _c('div',{key:index,class:( _obj = {}, _obj[(_vm.prefixCls + "-button")] = true, _obj[("theme-" + (button.theme))] = true, _obj ),on:{"click":function($event){_vm.handleBtnClick(button, $event)}}},[_c('div',{class:(_vm.prefixCls + "-text")},[_vm._v(_vm._s(button.text || ('right' + index)))])])
      var _obj;})):_vm._e(),_vm._v(" "),_c('za-drag',{attrs:{"dragStart":_vm.onDragStart,"dragMove":_vm.onDragMove,"dragEnd":_vm.onDragEnd}},[_c('div',{ref:"content",class:(_vm.prefixCls + "-content")},[_vm._t("default")],2)])],1):_c('div',{class:(_vm.prefixCls + "-wrap")},[_c('div',{class:(_vm.prefixCls + "-content")},[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/swipe-action/src/swipe-action.vue?vue&type=template&id=7b1ebd99&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// EXTERNAL MODULE: ./src/drag/index.js + 3 modules
var drag = __webpack_require__(61);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/swipe-action/src/swipe-action.vue?vue&type=script&lang=js





/* harmony default export */ var swipe_actionvue_type_script_lang_js = ({
  name: 'zaSwipeAction',
  components: {
    zaDrag: drag["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-swipeAction' },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'default'
    },
    left: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    right: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    moveTimeSpan: {
      type: Number,
      default: 300
    },
    moveDistanceRatio: {
      type: Number,
      default: 0.5
    },
    offset: {
      type: Number,
      default: 10
    },
    duration: {
      type: Number,
      default: 300
    },
    autoClose: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getCurrentPosition: function getCurrentPosition(e) {
      return e.touches[0].pageX;
    },
    onDragStart: function onDragStart() {
      if (this.disabled || this.isClosing) {
        return;
      }
      if (this.isOpen) {
        this.close('close');
      }
    },
    onDragMove: function onDragMove(e, _ref) {
      var offsetX = _ref.offsetX,
          offsetY = _ref.offsetY;

      if (this.disabled || this.isClosing) return;

      var offset = this.offset,
          offsetLeft = this.offsetLeft;

      var btnsLeftWidth = this.$refs.left && this.$refs.left.offsetWidth;
      var btnsRightWidth = this.$refs.right && this.$refs.right.offsetWidth;
      if (offsetX > 0 && (!btnsLeftWidth || offsetLeft >= btnsLeftWidth + offset)) return false;
      if (offsetX < 0 && (!btnsRightWidth || offsetLeft <= -btnsRightWidth - offset)) return false;

      var distanceX = Math.abs(offsetX);
      var distanceY = Math.abs(offsetY);
      if (distanceX < 5 || distanceX >= 5 && distanceY >= 0.3 * distanceX) return false;

      e.preventDefault();
      this.doTransition({ offsetLeft: offsetX, duration: 0 });
      return true;
    },
    onDragEnd: function onDragEnd(e, _ref2) {
      var offsetX = _ref2.offsetX,
          startTime = _ref2.startTime;

      if (this.disabled) {
        return;
      }
      var duration = this.duration,
          moveDistanceRatio = this.moveDistanceRatio,
          moveTimeSpan = this.moveTimeSpan;

      var timeSpan = new Date().getTime() - startTime.getTime();
      var btnsLeftWidth = this.$refs.left && this.$refs.left.offsetWidth;
      var btnsRightWidth = this.$refs.right && this.$refs.right.offsetWidth;

      var distanceX = 0;
      var isOpen = false;

      if (offsetX / btnsLeftWidth > moveDistanceRatio || offsetX > 0 && timeSpan <= moveTimeSpan) {
        distanceX = btnsLeftWidth;
        isOpen = true;
      } else if (offsetX / btnsRightWidth < -moveDistanceRatio || offsetX < 0 && timeSpan <= moveTimeSpan) {
        distanceX = -btnsRightWidth;
        isOpen = true;
      }

      if (isOpen && !this.isOpen) {
        this.open(distanceX);
      } else if (!isOpen && this.isOpen) {
        this.close();
      } else {
        this.doTransition({ offsetLeft: distanceX, duration: duration });
      }
    },
    doTransition: function doTransition(_ref3) {
      var offsetLeft = _ref3.offsetLeft,
          duration = _ref3.duration;

      var dom = this.$refs.content;
      if (!dom) return;

      dom.style.webkitTransitionDuration = duration + 'ms';
      dom.style.transitionDuration = duration + 'ms';
      dom.style.webkitTransform = 'translate3d(' + offsetLeft + 'px, 0, 0)';
      dom.style.transform = 'translate3d(' + offsetLeft + 'px, 0, 0)';
    },
    handleBtnClick: function handleBtnClick(button, event) {
      event.preventDefault();
      if (typeof button.onClick === 'function') {
        button.onClick(event);
      }
      if (this.autoClose) {
        this.close('autoClose');
      }
    },
    open: function open(offsetLeft) {
      var duration = this.duration;
      this.$emit('open', offsetLeft > 0 ? 'left' : 'right');
      this.isOpen = true;
      this.doTransition({ offsetLeft: offsetLeft, duration: duration });
    },
    close: function close(reason) {
      var _this = this;

      this.isClosing = true;
      var duration = this.duration;

      this.isOpen = false;
      this.$emit('close', reason);

      this.timer = setTimeout(function () {
        _this.isClosing = false;
      }, duration);

      this.doTransition({ offsetLeft: 0, duration: duration });
    },
    onTouchAway: function onTouchAway(e) {
      var _this2 = this;

      if (this.isOpen) {
        var pNode = function (node) {
          while (node.parentNode && node.parentNode !== document.body) {
            if (node === _this2.$refs.wrap) {
              return node;
            }
            node = node.parentNode;
          }
        }(e.target);

        if (!pNode) {
          e.preventDefault();
          this.close('touchaway');
        }
      }
    }
  },
  created: function created() {
    this.isOpen = false;
    this.isClosing = false;
    this.offsetLeft = 0;
  },
  mounted: function mounted() {
    document.body.addEventListener('touchstart', this.onTouchAway);
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeEventListener('touchstart', this.onTouchAway);
    clearTimeout(this.timer);
  }
});
// CONCATENATED MODULE: ./src/swipe-action/src/swipe-action.vue?vue&type=script&lang=js
 /* harmony default export */ var src_swipe_actionvue_type_script_lang_js = (swipe_actionvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/swipe-action/src/swipe-action.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_swipe_actionvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var swipe_action = (component.exports);
// CONCATENATED MODULE: ./src/swipe-action/index.js


swipe_action.install = function (Vue) {
  Vue.component(swipe_action.name, swipe_action);
};

/* harmony default export */ var src_swipe_action = __webpack_exports__["default"] = (swipe_action);

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/switch/src/switch.vue?vue&type=template&id=7f0986e3&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:( _obj = {
    checked: !!_vm.currentCheck,
    disabled: _vm.disabled,
  }, _obj[("" + _vm.prefixCls)] = true, _obj[("theme-" + _vm.theme)] = !!_vm.theme, _obj[("size-" + _vm.size)] = !!_vm.size, _obj )},[_c('input',{class:(_vm.prefixCls + "-input"),attrs:{"type":"checkbox","disabled":_vm.disabled},domProps:{"checked":_vm.currentCheck,"value":_vm.currentCheck},on:{"change":_vm.handleChange}})])
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/switch/src/switch.vue?vue&type=template&id=7f0986e3&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/switch/src/switch.vue?vue&type=script&lang=js




/* harmony default export */ var switchvue_type_script_lang_js = ({
  name: 'zaSwitch',
  props: {
    prefixCls: {
      type: String,
      default: 'za-switch'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'primary'
    },
    size: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['xl', 'lg', 'sm', 'xs']),
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {}
  },
  data: function data() {
    return {
      currentCheck: this.value || false
    };
  },

  watch: {
    'value': function value(val, oldValue) {
      if (val === this.currentCheck) return;
      this.currentCheck = val;
    }
  },
  methods: {
    handleChange: function handleChange(event) {
      if (this.disabled) return;
      var checked = event.target.checked;
      this.$emit('input', checked);
      this.$emit('change', event);
    }
  }
});
// CONCATENATED MODULE: ./src/switch/src/switch.vue?vue&type=script&lang=js
 /* harmony default export */ var src_switchvue_type_script_lang_js = (switchvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/switch/src/switch.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_switchvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_switch = (component.exports);
// CONCATENATED MODULE: ./src/switch/index.js


src_switch.install = function (Vue) {
  Vue.component(src_switch.name, src_switch);
};

/* harmony default export */ var src_switch_0 = __webpack_exports__["default"] = (src_switch);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/accordion/src/accordion.vue?vue&type=template&id=2e80c76c&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefixCls},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/accordion/src/accordion.vue?vue&type=template&id=2e80c76c&lang=html

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/accordion/src/accordion.vue?vue&type=script&lang=js


/* harmony default export */ var accordionvue_type_script_lang_js = ({
  name: 'zaAccordion',
  props: {
    prefixCls: {
      type: String,
      default: 'za-accordion'
    },
    defaultActiveTag: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      activeTag: []
    };
  },
  created: function created() {
    this.activeTag = this.getActiveIndex();
  },

  methods: {
    onItemChange: function onItemChange(key) {
      var multiple = this.multiple,
          activeTag = this.activeTag;

      var hasKey = activeTag.indexOf(key) > -1;

      var newActiveIndex = [];
      if (!multiple) {
        if (hasKey) {
          newActiveIndex = activeTag.filter(function (i) {
            return i !== key;
          });
        } else {
          newActiveIndex = activeTag.slice(0);
          newActiveIndex.push(key);
        }
      } else {
        newActiveIndex = hasKey ? [] : [key];
      }
      this.activeTag = newActiveIndex;
      this.$emit('change', key);
    },
    getActiveIndex: function getActiveIndex() {
      var defaultActiveTag = this.defaultActiveTag,
          multiple = this.multiple;

      var defaultIndex = defaultActiveTag !== undefined ? defaultActiveTag : [];
      return multiple ? [defaultIndex[0]] : defaultIndex;
    }
  }
});
// CONCATENATED MODULE: ./src/accordion/src/accordion.vue?vue&type=script&lang=js
 /* harmony default export */ var src_accordionvue_type_script_lang_js = (accordionvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/accordion/src/accordion.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_accordionvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var accordion = (component.exports);
// CONCATENATED MODULE: ./src/accordion/index.js


accordion.install = function (Vue) {
  Vue.component(accordion.name, accordion);
};

/* harmony default export */ var src_accordion = __webpack_exports__["default"] = (accordion);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/radio/src/radio.vue?vue&type=template&id=39c86d14&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.radioType === "cell")?_c('za-cell',{attrs:{"disabled":_vm.radioDisabled,"isLink":""}},[(_vm.isChecked)?_c('za-icon',{attrs:{"slot":"description","type":"right","theme":_vm.radioDisabled ? null : _vm.groupTheme},slot:"description"}):_vm._e(),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],class:(_vm.prefixCls + "-input"),attrs:{"type":"radio","disabled":_vm.radioDisabled},domProps:{"checked":_vm.isChecked,"value":_vm.label,"checked":_vm._q(_vm.model,_vm.label)},on:{"change":[function($event){_vm.model=_vm.label},_vm.onValueChange]}}),_vm._v(" "),_vm._t("default")],2):(_vm.radioType === "button")?_c('za-button',{class:( _obj = {
    checked: _vm.isChecked,
    disabled: _vm.radioDisabled,
    block: _vm.isBlock,
  }, _obj[("" + _vm.prefixCls)] = true, _obj ),attrs:{"theme":_vm.groupTheme,"size":"xs","block":_vm.isBlock,"disabled":_vm.radioDisabled,"bordered":!_vm.isChecked,"shape":_vm.groupShape}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],class:(_vm.prefixCls + "-input"),attrs:{"type":"radio","disabled":_vm.radioDisabled},domProps:{"checked":_vm.isChecked,"value":_vm.label,"checked":_vm._q(_vm.model,_vm.label)},on:{"change":[function($event){_vm.model=_vm.label},_vm.onValueChange]}}),_vm._v(" "),_vm._t("default")],2):_c('div',{class:( _obj$1 = {
    checked: _vm.isChecked,
    disabled: _vm.radioDisabled,
  }, _obj$1[("" + _vm.prefixCls)] = true, _obj$1[("theme-" + _vm.groupTheme)] = !!_vm.groupTheme, _obj$1[("shape-" + _vm.groupShape)] = !!_vm.groupShape, _obj$1 )},[_c('div',{class:(_vm.prefixCls + "-wrapper")},[_c('span',{class:(_vm.prefixCls + "-inner")}),_vm._v(" "),(_vm.$slots.default)?_c('span',{class:(_vm.prefixCls + "-text")},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],class:(_vm.prefixCls + "-input"),attrs:{"type":"radio","disabled":_vm.radioDisabled},domProps:{"checked":_vm.isChecked,"value":_vm.label,"checked":_vm._q(_vm.model,_vm.label)},on:{"change":[function($event){_vm.model=_vm.label},_vm.onValueChange]}})])])
var _obj;
var _obj$1;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/radio/src/radio.vue?vue&type=template&id=39c86d14&lang=html

// EXTERNAL MODULE: ./src/button/index.js + 5 modules
var src_button = __webpack_require__(63);

// EXTERNAL MODULE: ./src/icon/index.js
var icon = __webpack_require__(39);

// EXTERNAL MODULE: ./src/cell/index.js + 5 modules
var cell = __webpack_require__(94);

// EXTERNAL MODULE: ./src/mixins/emitter.js
var emitter = __webpack_require__(87);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/radio/src/radio.vue?vue&type=script&lang=js






/* harmony default export */ var radiovue_type_script_lang_js = ({
  name: 'zaRadio',
  mixins: [emitter["a" /* default */]],
  components: {
    zaButton: src_button["default"],
    zaIcon: icon["default"],
    zaCell: cell["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-radio'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {}
  },
  beforeCreate: function beforeCreate() {
    var parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== 'zaRadioGroup') {
        parent = parent.$parent;
      } else {
        this._radioGroup = parent;
        return true;
      }
    }
  },

  computed: {
    model: {
      get: function get() {
        return this.store;
      },
      set: function set(val) {
        this.dispatch('zaRadioGroup', 'input', [val]);
      }
    },
    isChecked: function isChecked() {
      return this.model === this.label;
    },
    store: function store() {
      return this._radioGroup.value;
    },
    radioType: function radioType() {
      return this._radioGroup.type;
    },
    radioDisabled: function radioDisabled() {
      return this._radioGroup ? this._radioGroup.disabled || this.disabled : this.disabled;
    },
    isBlock: function isBlock() {
      return this._radioGroup.block;
    },
    groupShape: function groupShape() {
      return this._radioGroup.shape;
    },
    groupTheme: function groupTheme() {
      return this._radioGroup.theme;
    }
  },
  methods: {
    onValueChange: function onValueChange(event) {
      var _this = this;

      this.$emit('change', event);
      this.$nextTick(function (_) {
        _this.dispatch('zaRadioGroup', 'change', [_this._radioGroup.value]);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/radio/src/radio.vue?vue&type=script&lang=js
 /* harmony default export */ var src_radiovue_type_script_lang_js = (radiovue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/radio/src/radio.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_radiovue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_radio = (component.exports);
// CONCATENATED MODULE: ./src/radio/index.js


src_radio.install = function (Vue) {
  Vue.component(src_radio.name, src_radio);
};

/* harmony default export */ var src_radio_0 = __webpack_exports__["default"] = (src_radio);

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/radio/src/radio-group.vue?vue&type=template&id=22ef133b&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {
    'is-compact': _vm.compact,
    block: _vm.block,
    disabled: _vm.disabled,
  }, _obj[("" + _vm.prefixCls)] = true, _obj[("shape-" + _vm.shape)] = !!_vm.shape, _obj )},[_vm._t("default")],2)
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/radio/src/radio-group.vue?vue&type=template&id=22ef133b&lang=html

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/radio/src/radio-group.vue?vue&type=script&lang=js




/* harmony default export */ var radio_groupvue_type_script_lang_js = ({
  name: 'zaRadioGroup',
  props: {
    prefixCls: {
      type: String,
      default: 'za-radio-group'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'primary'
    },
    type: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['button', 'cell']),
      default: null
    },
    shape: {
      type: String,
      validator: Object(validator["b" /* enumGenerator */])(['radius', 'round']),
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    value: {}
  }
});
// CONCATENATED MODULE: ./src/radio/src/radio-group.vue?vue&type=script&lang=js
 /* harmony default export */ var src_radio_groupvue_type_script_lang_js = (radio_groupvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/radio/src/radio-group.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_radio_groupvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var radio_group = (component.exports);
// CONCATENATED MODULE: ./src/radio-group/index.js


radio_group.install = function (Vue) {
  Vue.component(radio_group.name, radio_group);
};

/* harmony default export */ var src_radio_group = __webpack_exports__["default"] = (radio_group);

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(37);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/utils/validator.js
var validator = __webpack_require__(1);

// EXTERNAL MODULE: ./src/mixins/emitter.js
var emitter = __webpack_require__(87);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/tabs/src/tab-nav.vue?vue&type=script&lang=js




/* harmony default export */ var tab_navvue_type_script_lang_js = ({
  name: 'zaTabItem',
  mixins: [emitter["a" /* default */]],
  props: {
    prefixCls: {
      type: String,
      default: 'za-tab'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: String,
    name: [String, Number],
    currentName: {}
  },
  methods: {
    handleClick: function handleClick(event) {
      if (this.disabled) return;

      this.$emit('nav-click', this, event);
    }
  },
  render: function render(h) {
    var _cls;

    var disabled = this.disabled,
        currentName = this.currentName,
        label = this.label,
        prefixCls = this.prefixCls,
        handleClick = this.handleClick;


    var cls = (_cls = {}, defineProperty_default()(_cls, prefixCls + '-header-item', true), defineProperty_default()(_cls, 'disabled', disabled), defineProperty_default()(_cls, 'active', this.name === currentName), _cls);

    return h(
      'div',
      { 'class': cls, on: {
          'click': handleClick
        }
      },
      [label]
    );
  }
});
// CONCATENATED MODULE: ./src/tabs/src/tab-nav.vue?vue&type=script&lang=js
 /* harmony default export */ var src_tab_navvue_type_script_lang_js = (tab_navvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/tabs/src/tab-nav.vue
var tab_nav_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tab_navvue_type_script_lang_js,
  tab_nav_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tab_nav = (component.exports);
// EXTERNAL MODULE: ./src/swipe/index.js + 3 modules
var swipe = __webpack_require__(114);

// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/tabs/src/tabs.vue?vue&type=script&lang=js






/* harmony default export */ var tabsvue_type_script_lang_js = ({
  name: 'zaTabs',
  components: {
    TabNav: tab_nav,
    zaSwipe: swipe["default"]
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-tab'
    },
    theme: {
      type: String,
      validator: validator["a" /* defaultThemeValidator */],
      default: 'primary'
    },
    lineWidth: [String, Number],
    value: {},
    canSwipe: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentIndex: function currentIndex() {
      var currentValue = this.currentValue;
      var panes = this.panes;
      var cur = 0;
      panes.some(function (child, index) {
        if (child.$options.name === 'zaTabPane' && child.name === currentValue) {
          cur = index;
          return true;
        }
        return false;
      });
      return cur;
    },
    paneNum: function paneNum() {
      return this.panes.length;
    },
    lineStyle: function lineStyle() {
      return {
        width: 100 / this.paneNum + '%',
        left: this.currentIndex / this.paneNum * 100 + '%',
        backgroundColor: this.lineWidth ? 'transparent' : ''
      };
    }
  },
  watch: {
    value: function value(val, oldVal) {
      if (val === this.currentValue) return;
      this.currentValue = val;
    }
  },
  data: function data() {
    return {
      panes: [],
      currentValue: this.value
    };
  },

  methods: {
    handleNavClick: function handleNavClick(item, event) {
      this.$emit('input', item.name);
      if (!this.canSwipe) {
        this.$emit('change', item, event);
      }
    },
    notify: function notify(pane, flag) {
      var index = this.getNotifyPaneIndex(pane);
      if (!flag) {
        this.panes.splice(index, 1);
      } else if (index < 0) {
        this.panes.push(pane);
      } else {
        this.panes.splice(index, 1, pane);
      }
    },
    getNotifyPaneIndex: function getNotifyPaneIndex(pane) {
      var index = -1;
      this.panes.some(function (p, i) {
        if (p._panelIndex === pane._panelIndex) {
          index = i;
          return true;
        }
        return false;
      });
      return index;
    },
    handleSwipeChange: function handleSwipeChange(index) {
      var newName = this.findValueByIndex(index);
      this.currentValue = newName;
      this.$emit('input', newName);
      this.$emit('change', this.panes[index]);
    },
    findValueByIndex: function findValueByIndex(index) {
      return this.panes[index].name;
    }
  },
  render: function render(h) {
    var _cls;

    var panes = this.panes,
        handleNavClick = this.handleNavClick,
        currentValue = this.currentValue,
        lineStyle = this.lineStyle,
        lineWidth = this.lineWidth,
        currentIndex = this.currentIndex,
        canSwipe = this.canSwipe,
        prefixCls = this.prefixCls,
        theme = this.theme,
        handleSwipeChange = this.handleSwipeChange;


    var cls = (_cls = {}, defineProperty_default()(_cls, '' + prefixCls, true), defineProperty_default()(_cls, 'theme-' + theme, !!theme), _cls);

    return h(
      'div',
      { 'class': cls },
      [h(
        'div',
        { 'class': prefixCls + '-header' },
        [h(
          'ul',
          {
            attrs: { role: 'tablist' }
          },
          [panes.map(function (pane, index) {
            return h('tab-nav', {
              attrs: {
                label: pane.label,
                name: pane.name,

                disabled: pane.disabled,
                currentName: currentValue
              },
              key: index, on: {
                'nav-click': handleNavClick
              }
            });
          })]
        ), h(
          'div',
          { 'class': prefixCls + '-line', style: lineStyle },
          [lineWidth && h('span', { 'class': prefixCls + '-line-inner', style: { width: lineWidth + 'px' } })]
        )]
      ), h(
        'div',
        { 'class': prefixCls + '-container' },
        [!canSwipe ? this.$slots.default : h(
          'za-swipe',
          {
            attrs: {
              showPagination: false,
              activeIndex: currentIndex
            },
            ref: 'swipe',
            on: {
              'change': handleSwipeChange
            }
          },
          [this.$slots.default]
        )]
      )]
    );
  }
});
// CONCATENATED MODULE: ./src/tabs/src/tabs.vue?vue&type=script&lang=js
 /* harmony default export */ var src_tabsvue_type_script_lang_js = (tabsvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/tabs/src/tabs.vue
var tabs_render, tabs_staticRenderFns




/* normalize component */

var tabs_component = Object(componentNormalizer["a" /* default */])(
  src_tabsvue_type_script_lang_js,
  tabs_render,
  tabs_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tabs = (tabs_component.exports);
// CONCATENATED MODULE: ./src/tabs/index.js


tabs.install = function (Vue) {
  Vue.component(tabs.name, tabs);
};

/* harmony default export */ var src_tabs = __webpack_exports__["default"] = (tabs);

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/uploader/src/uploader.vue?vue&type=template&id=dcab8dd0&lang=html
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {
  disabled: _vm.disabled,
  }, _obj[_vm.prefixCls] = true, _obj )},[_c('input',{ref:"file",class:(_vm.prefixCls + "-input"),attrs:{"type":"file","accept":_vm.accept,"multiple":_vm.multiple,"capture":_vm.capture},on:{"click":_vm.handleDefaultInput,"change":_vm.handleChange}}),_vm._v(" "),_c('span',{class:(_vm.prefixCls + "-trigger"),on:{"click":_vm.handleClick}}),_vm._v(" "),_vm._t("default")],2)
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/uploader/src/uploader.vue?vue&type=template&id=dcab8dd0&lang=html

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/array/from.js
var from = __webpack_require__(97);
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// CONCATENATED MODULE: ./src/uploader/src/changeImageSize.js

function changeImageSize(img, quality, fileType) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var width = img.width;
  var height = img.height;

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0, width, height);

  if (!(quality > 0 && quality <= 1 && production === 'development')) {
    console.error('请输入有效的压缩比例, 没有将默认使用 0.92');
  }

  return canvas.toDataURL(fileType, quality);
}
// CONCATENATED MODULE: ./src/uploader/src/util.js


function isImage(fileType) {
  var imageType = /image.*/;
  return !!fileType.match(imageType);
}

function getFileDetail(file) {
  var fileSize = file.size;

  var fileName = file.name;

  var fileType = file.type || fileName.substr(fileName.lastIndexOf('.') + 1);

  var isPic = isImage(fileType);

  return {
    fileName: fileName,
    fileSize: fileSize,
    fileType: fileType,
    isPic: isPic
  };
}

function createThumbnail(_ref, callback) {
  var file = _ref.file,
      quality = _ref.quality,
      fileType = _ref.fileType,
      maxWidth = _ref.maxWidth,
      maxHeight = _ref.maxHeight;

  var img = document.createElement('img');
  window.URL = window.URL || window.webkitURL;
  try {
    img.src = window.URL.createObjectURL(file);
  } catch (err) {
    return;
  }
  img.onload = function () {
    var imgUrl = void 0;

    if (quality || maxWidth || maxHeight) {
      imgUrl = changeImageSize(img, quality, fileType);
    } else {
      imgUrl = img.src;
    }

    callback(imgUrl);
  };
}

function handleFileInfo(_ref2, callback) {
  var file = _ref2.file,
      quality = _ref2.quality;

  var _getFileDetail = getFileDetail(file),
      fileSize = _getFileDetail.fileSize,
      fileType = _getFileDetail.fileType,
      isPic = _getFileDetail.isPic,
      fileName = _getFileDetail.fileName;

  var fileDetail = {
    file: file,
    fileType: fileType,
    fileSize: fileSize,
    fileName: fileName
  };

  var callbackFunc = function callbackFunc(url) {
    fileDetail.thumbnail = url;
    callback(fileDetail);
  };

  if (isPic) {
    createThumbnail({
      file: file,
      quality: quality,
      fileType: fileType
    }, callbackFunc);
  } else {
    callback(fileDetail);
  }
}
// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/uploader/src/uploader.vue?vue&type=script&lang=js




/* harmony default export */ var uploadervue_type_script_lang_js = ({
  name: 'zaUploader',
  props: {
    prefixCls: {
      type: String,
      default: 'za-uploader'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: String,
    capture: String,
    quality: Number,
    beforeChange: {
      type: Function,
      default: function _default() {}
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.$refs.file.click();
    },
    handleDefaultInput: function handleDefaultInput(event) {
      var beforeChange = this.beforeChange,
          disabled = this.disabled;

      event.target.value = null;
      if (beforeChange(event) === false || disabled) {
        event.preventDefault();
      }
    },
    handleChange: function handleChange(e) {
      var _this = this;

      var quality = this.quality,
          multiple = this.multiple;

      var files = from_default()(e.target.files);
      var fileList = [];

      var getFileInfoCb = function getFileInfoCb(data) {
        if (multiple) {
          fileList.push(data);

          if (files.length === fileList.length) {
            _this.$emit('change', fileList);
          }
        } else {
          _this.$emit('change', data);
        }
      };

      if (files) {
        files.map(function (file) {
          return handleFileInfo({ file: file, quality: quality }, getFileInfoCb);
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/uploader/src/uploader.vue?vue&type=script&lang=js
 /* harmony default export */ var src_uploadervue_type_script_lang_js = (uploadervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/uploader/src/uploader.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_uploadervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var uploader = (component.exports);
// CONCATENATED MODULE: ./src/uploader/index.js


uploader.install = function (Vue) {
  Vue.component(uploader.name, uploader);
};

/* harmony default export */ var src_uploader = __webpack_exports__["default"] = (uploader);

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/calendar/src/calendar.vue?vue&type=template&id=19c67067
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],class:("" + _vm.prefixCls)},[_c('div',{class:(_vm.prefixCls + "-action")},[_c('div',{staticClass:"cancel-btn",on:{"click":_vm.handlecancel}},[_vm._v(_vm._s(_vm.cancelBtnText))]),_vm._v(" "),_c('div',{staticClass:"ok-btn",on:{"click":_vm.handleok}},[_vm._v(_vm._s(_vm.okBtnText))])]),_vm._v(" "),_vm._l((_vm.monthItems),function(item){return _c('div',{class:(_vm.prefixCls + "-item")},[_c('div',{class:(_vm.prefixCls + "-month")},[_vm._v(_vm._s(item.monthText))]),_vm._v(" "),_c('ul',{class:(_vm.prefixCls + "-day")},_vm._l((_vm.titles),function(item,index){return _c('li',{key:index},[_vm._v(_vm._s(item))])})),_vm._v(" "),_c('date-item',{attrs:{"prefixCls":_vm.prefixCls,"min-date":_vm.minDate,"max-date":_vm.maxDate,"selected-suffix":_vm.selectedSuffix,"selected-value":_vm.selected,"month":item,"multi-selected":_vm.multiSelected,"name":"calendar"},on:{"changed":_vm.setChanged}})],1)})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/calendar/src/calendar.vue?vue&type=template&id=19c67067

// CONCATENATED MODULE: ./node_modules/.15.2.4@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/calendar/src/dateItem.vue?vue&type=template&id=3a19269e
var dateItemvue_type_template_id_3a19269e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{class:(_vm.prefixCls + "-date")},_vm._l((_vm.items),function(item,index){return _c('li',{key:index,class:( _obj = {}, _obj[(_vm.prefixCls + "-invalid")] = item.enabled==false, _obj[(_vm.prefixCls + "-selected")] = _vm.isSelected(item), _obj ),attrs:{"data-value":item.date},on:{"click":function($event){_vm.setChanged(item)}}},[_c('span',{staticClass:"date-item"},[_vm._v(_vm._s(item.text))]),_vm._v(" "),(_vm.isSelected(item))?_c('span',{class:(_vm.prefixCls + "-selected-suffix")},[_vm._v(_vm._s(_vm.selectedSuffix))]):_vm._e()])
var _obj;}))}
var dateItemvue_type_template_id_3a19269e_staticRenderFns = []


// CONCATENATED MODULE: ./src/calendar/src/dateItem.vue?vue&type=template&id=3a19269e

// EXTERNAL MODULE: ./node_modules/.6.26.0@babel-runtime/core-js/object/keys.js
var keys = __webpack_require__(52);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// CONCATENATED MODULE: ./src/calendar/src/date.js

var dateUtil = {
  compareDate: function compareDate(date1, date2) {
    var a = new Date(date1);
    var b = new Date(date2);
    return (new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() - new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()) / 1000 / 60 / 60 / 24;
  },
  addDays: function addDays(date, daysToAdd) {
    var tempDate = date.getDate();
    var newDate = new Date(date);
    newDate.setDate(tempDate + daysToAdd);
    return newDate;
  },
  addMonths: function addMonths(date, monthsToAdd) {
    var tempDate = date.getDate();
    var newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + monthsToAdd);
    if (tempDate !== newDate.getDate()) newDate.setDate(0);
    return newDate;
  },
  addYears: function addYears(date, yearsToAdd) {
    var tempDate = date.getDate();
    var newDate = new Date(date);
    newDate.setYear(newDate.getFullYear() + yearsToAdd);
    if (tempDate !== newDate.getDate()) newDate.setDate(0);
    return newDate;
  },
  formatDate: function formatDate(date, fmt) {
    if (!date || !fmt) {
      return date;
    }
    date = new Date(date.toString().replace(/-/g, '/'));
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds() };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ('' + date.getFullYear()).substr(4 - RegExp.$1.length));
    }
    keys_default()(o).forEach(function (k) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    });
    return fmt;
  }
};

/* harmony default export */ var src_date = (dateUtil);
// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/calendar/src/dateItem.vue?vue&type=script&lang=js




/* harmony default export */ var dateItemvue_type_script_lang_js = ({
  props: ['prefixCls', 'minDate', 'maxDate', 'selectedSuffix', 'selectedValue', 'month', 'multiSelected'],
  data: function data() {
    return {
      items: [],
      selected: this.selectedValue || []
    };
  },
  created: function created() {
    this.createDateItems();
  },

  watch: {
    month: function month() {
      this.createDateItems();
    }
  },
  methods: {
    setChanged: function setChanged(item) {
      if (item.enabled === false) {
        return;
      }
      this.$emit('changed', item.date);
    },
    isSelected: function isSelected(item) {
      if (this.multiSelected) {
        return this.selected[0] === item.date || this.selected[1] === item.date;
      }
      return this.selected[0] === item.date;
    },
    createDateItems: function createDateItems() {
      var self = this;
      var num = 42;
      var _enabled = void 0;
      var count = 1;
      var _oldDate = new Date(self.month.date);
      var _date = new Date(_oldDate.setDate(count));
      var weekday = self.getDay(_date);

      for (var i = 0; i < num; i++) {
        weekday = self.getDay(_date);
        if (i < 7 && i < weekday) {
          self.$set(self.items, i, {
            enabled: false,
            date: '',
            text: ''
          });
          continue;
        }
        _date.setDate(count);
        if (self.isCurrentMonth(_date, _oldDate)) {
          if (self.compareDate(_date, self.minDate) < 0) {
            _enabled = false;
          } else if (self.compareDate(_date, self.maxDate) > 0) {
            _enabled = false;
          } else {
            _enabled = true;
          }
          self.$set(self.items, i, {
            enabled: _enabled,
            date: src_date.formatDate(_date, 'yyyy-MM-dd'),
            text: _date.getDate()
          });
        }
        count++;
      }
    },
    getYear: function getYear(date) {
      return date.getFullYear();
    },
    getDate: function getDate(date, i) {
      return date.getDate(i);
    },
    getDay: function getDay(date) {
      return date.getDay();
    },
    getMonth: function getMonth(date) {
      return date.getMonth() + 1;
    },
    isCurrentMonth: function isCurrentMonth(date, oldDate) {
      var self = this;
      var y1 = self.getYear(date);
      var y2 = self.getYear(oldDate);
      var m1 = self.getMonth(date);
      var m2 = self.getMonth(oldDate);
      if (y1 === y2) {
        return m1 > m2 ? 0 : 1;
      }
      return y1 - y2 > 0 ? 0 : 1;
    },
    compareDate: function compareDate(a, b) {
      var start = new Date(a);
      var end = new Date(b);
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      end.setHours(0);
      end.setMinutes(0);
      end.setSeconds(0);
      return start.getTime() - end.getTime();
    }
  }
});
// CONCATENATED MODULE: ./src/calendar/src/dateItem.vue?vue&type=script&lang=js
 /* harmony default export */ var src_dateItemvue_type_script_lang_js = (dateItemvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/.15.2.4@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/calendar/src/dateItem.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_dateItemvue_type_script_lang_js,
  dateItemvue_type_template_id_3a19269e_render,
  dateItemvue_type_template_id_3a19269e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var dateItem = (component.exports);
// CONCATENATED MODULE: ./node_modules/.7.1.4@babel-loader/lib!./node_modules/.15.2.4@vue-loader/lib??vue-loader-options!./src/calendar/src/calendar.vue?vue&type=script&lang=js





var defaultMinDate = new Date();
var defaultMaxDate = src_date.addYears(new Date(), 1);

/* harmony default export */ var calendarvue_type_script_lang_js = ({
  name: 'zaCalendar',
  components: {
    dateItem: dateItem
  },
  props: {
    prefixCls: {
      type: String,
      default: 'za-calendar'
    },
    multiSelected: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    titles: {
      type: Array,
      default: function _default() {
        return ['日', '一', '二', '三', '四', '五', '六'];
      }
    },
    dateItemFormat: {
      type: String,
      default: 'yyyy年MM月'
    },
    min: {
      type: Date,
      default: function _default() {
        return defaultMinDate;
      }
    },
    max: {
      type: Date,
      default: function _default() {
        return defaultMaxDate;
      }
    },
    months: {
      type: Number,
      default: 13
    },
    okBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    selectedSuffix: String,
    selectedValue: Array
  },
  data: function data() {
    return {
      minDate: this.getMinDate(),
      maxDate: this.getMaxDate(),
      selected: this.getInitValue(),
      monthItems: []
    };
  },
  created: function created() {
    var _this = this;

    this.$nextTick(function () {
      _this.createMonthItems();
    });
  },

  watch: {
    visible: function visible(val) {
      if (val === true) {
        this.selected = this.getInitValue();
        this.setRangeSelected();
      }
    }
  },
  methods: {
    getInitValue: function getInitValue() {
      var value = this.selectedValue || [];

      return value;
    },
    getMinDate: function getMinDate() {
      var value = this.min || defaultMinDate;
      return value;
    },
    getMaxDate: function getMaxDate() {
      var value = this.max || defaultMaxDate;
      return value;
    },
    setChanged: function setChanged(item) {
      var self = this;
      self.scrollY = document.body.scrollTop;
      if (self.multiSelected) {
        if (self.selected.length === 0) {
          self.selected[0] = item;
        } else if (self.selected.length === 1) {
          if (src_date.compareDate(self.selected[0], item) > 0) {
            self.selected[1] = self.selected[0];
            self.selected[0] = item;
          } else {
            self.selected[1] = item;
          }
        } else {
          self.selected = [item];
        }
        self.setRangeSelected();
        self.$emit('changed', self.selected);
      } else {
        self.selected = [item];
        self.setRangeSelected();
        self.$emit('changed', self.selected);
      }
    },
    setRangeSelected: function setRangeSelected() {
      var self = this;
      var prefixCls = this.prefixCls;
      Array.prototype.forEach.call(self.$el.querySelectorAll('li[data-value]'), function (el) {
        var _date = el.getAttribute('data-value');
        if (_date === '') return;
        el.classList.remove(prefixCls + '-selected');
        el.classList.remove(prefixCls + '-start-selected');
        el.classList.remove(prefixCls + '-end-selected');
        el.classList.remove(prefixCls + '-range-selected');

        if (self.selected.length === 1) {
          if (_date === self.selected[0]) {
            el.classList.add(prefixCls + '-selected');
          }
          return;
        }

        if (src_date.compareDate(self.selected[0], self.selected[1]) < 0) {
          if (src_date.compareDate(_date, self.selected[0]) > 0 && src_date.compareDate(_date, self.selected[1]) < 0) {
            el.classList.add(prefixCls + '-range-selected');
          } else if (_date === self.selected[0]) {
            el.classList.add(prefixCls + '-start-selected');
            el.classList.add(prefixCls + '-selected');
          } else if (_date === self.selected[1]) {
            el.classList.add(prefixCls + '-end-selected');
            el.classList.add(prefixCls + '-selected');
          } else {
            el.classList.remove(prefixCls + '-range-selected');
          }
        } else {
          if (src_date.compareDate(_date, self.selected[1]) > 0 && src_date.compareDate(_date, self.selected[0]) < 0) {
            el.classList.add(prefixCls + '-range-selected');
          } else if (_date === self.selected[0]) {
            el.classList.add(prefixCls + '-end-selected');
            el.classList.add(prefixCls + '-selected');
          } else if (_date === self.selected[1]) {
            el.classList.add(prefixCls + '-start-selected');
            el.classList.add(prefixCls + '-selected');
          } else {
            el.classList.remove(prefixCls + '-range-selected');
          }
        }
      });
    },
    createMonthItems: function createMonthItems() {
      var self = this;
      var _minDate = self.minDate ? new Date(self.minDate) : new Date();
      var i = 0;
      var _start = void 0;

      while (i < self.months) {
        _start = self.setLastDate(_minDate, i);
        self.$set(self.monthItems, i, {
          monthText: src_date.formatDate(_start, self.dateItemFormat),
          date: self.resetDate(_start)
        });
        i++;
      }
    },
    setLastDate: function setLastDate(date, months) {
      var _date = new Date(date);
      _date.setDate(1);
      return src_date.addMonths(_date, months);
    },
    getDateYear: function getDateYear(d) {
      return d.getFullYear();
    },
    getDateMonth: function getDateMonth(d) {
      var _m = d.getMonth() + 1;
      return _m > 12 ? 12 : _m;
    },
    resetDate: function resetDate(d) {
      var _date = d.setDate(1);
      return _date;
    },
    handlecancel: function handlecancel() {
      this.$emit('update:visible', false);
    },
    handleok: function handleok() {
      this.$emit('ok', this.selected);
      this.$emit('update:visible', false);
    }
  }
});
// CONCATENATED MODULE: ./src/calendar/src/calendar.vue?vue&type=script&lang=js
 /* harmony default export */ var src_calendarvue_type_script_lang_js = (calendarvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/calendar/src/calendar.vue





/* normalize component */

var calendar_component = Object(componentNormalizer["a" /* default */])(
  src_calendarvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var calendar = (calendar_component.exports);
// CONCATENATED MODULE: ./src/calendar/index.js


calendar.install = function (Vue) {
  Vue.component(calendar.name, calendar);
};

/* harmony default export */ var src_calendar = __webpack_exports__["default"] = (calendar);

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _picker_src_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93);



var Select = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, _picker_src_picker__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
Select.name = 'zaSelect';

Select.install = function (Vue) {
  Vue.component(Select.name, Select);
};

/* harmony default export */ __webpack_exports__["default"] = (Select);

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93);


_src_picker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_picker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_picker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_picker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91);


_src_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _date_picker_src_date_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92);



var DateSelect = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, _date_picker_src_date_picker__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
DateSelect.name = 'zaDateSelect';

DateSelect.install = function (Vue) {
  Vue.component(DateSelect.name, DateSelect);
};

/* harmony default export */ __webpack_exports__["default"] = (DateSelect);

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_date_picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92);


_src_date_picker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_date_picker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_date_picker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_date_picker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 157 */,
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony import */ var _src_accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(146);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Accordion", function() { return _src_accordion__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_accordion_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(129);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccordionItem", function() { return _src_accordion_item__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _src_actionsheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(142);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Actionsheet", function() { return _src_actionsheet__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _src_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(125);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return _src_alert__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _src_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Badge", function() { return _src_badge__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _src_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(63);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _src_button__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _src_calendar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(151);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Calendar", function() { return _src_calendar__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _src_cell__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return _src_cell__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _src_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(132);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return _src_checkbox__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _src_checkbox_group__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(131);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxGroup", function() { return _src_checkbox_group__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _src_confirm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(124);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Confirm", function() { return _src_confirm__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _src_date_picker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(156);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatePicker", function() { return _src_date_picker__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _src_date_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(155);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateSelect", function() { return _src_date_select__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _src_date_picker_view__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(102);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatePickerView", function() { return _src_date_picker_view__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _src_drag__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(61);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Drag", function() { return _src_drag__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _src_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(39);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return _src_icon__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _src_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(154);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _src_input__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _src_input_number__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(133);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputNumber", function() { return _src_input_number__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _src_keyboard__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(100);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Keyboard", function() { return _src_keyboard__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _src_keyboard_picker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(115);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeyboardPicker", function() { return _src_keyboard_picker__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _src_loading__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(123);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Loading", function() { return _src_loading__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _src_mask__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(36);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mask", function() { return _src_mask__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _src_message__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(116);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return _src_message__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _src_modal__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(95);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _src_modal__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _src_notice_bar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(127);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoticeBar", function() { return _src_notice_bar__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _src_panel__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(135);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Panel", function() { return _src_panel__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _src_panel_header__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(130);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelHeader", function() { return _src_panel_header__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _src_panel_body__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(136);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelBody", function() { return _src_panel_body__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _src_panel_footer__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(137);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelFooter", function() { return _src_panel_footer__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _src_picker__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(153);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Picker", function() { return _src_picker__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _src_picker_view__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(101);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PickerView", function() { return _src_picker_view__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _src_popup__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(51);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popup", function() { return _src_popup__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _src_progress__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(138);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Progress", function() { return _src_progress__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _src_pull__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(128);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pull", function() { return _src_pull__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony import */ var _src_search_bar__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(139);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchBar", function() { return _src_search_bar__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony import */ var _src_select__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(152);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Select", function() { return _src_select__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _src_slider__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(140);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Slider", function() { return _src_slider__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony import */ var _src_spinner__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(47);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return _src_spinner__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony import */ var _src_stack_picker__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(141);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackPicker", function() { return _src_stack_picker__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/* harmony import */ var _src_stepper__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(143);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stepper", function() { return _src_stepper__WEBPACK_IMPORTED_MODULE_39__["default"]; });

/* harmony import */ var _src_swipe__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(114);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Swipe", function() { return _src_swipe__WEBPACK_IMPORTED_MODULE_40__["default"]; });

/* harmony import */ var _src_swipe_action__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(144);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwipeAction", function() { return _src_swipe_action__WEBPACK_IMPORTED_MODULE_41__["default"]; });

/* harmony import */ var _src_swipe_item__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(117);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwipeItem", function() { return _src_swipe_item__WEBPACK_IMPORTED_MODULE_42__["default"]; });

/* harmony import */ var _src_switch__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(145);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return _src_switch__WEBPACK_IMPORTED_MODULE_43__["default"]; });

/* harmony import */ var _src_radio__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(147);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Radio", function() { return _src_radio__WEBPACK_IMPORTED_MODULE_44__["default"]; });

/* harmony import */ var _src_radio_group__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(148);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioGroup", function() { return _src_radio_group__WEBPACK_IMPORTED_MODULE_45__["default"]; });

/* harmony import */ var _src_tabs__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(149);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return _src_tabs__WEBPACK_IMPORTED_MODULE_46__["default"]; });

/* harmony import */ var _src_tab_pane__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(126);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabPane", function() { return _src_tab_pane__WEBPACK_IMPORTED_MODULE_47__["default"]; });

/* harmony import */ var _src_toast__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(111);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toast", function() { return _src_toast__WEBPACK_IMPORTED_MODULE_48__["default"]; });

/* harmony import */ var _src_tooltip__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(112);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _src_tooltip__WEBPACK_IMPORTED_MODULE_49__["default"]; });

/* harmony import */ var _src_uploader__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(150);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Uploader", function() { return _src_uploader__WEBPACK_IMPORTED_MODULE_50__["default"]; });





















































var version = '1.2.1';
var components = [_src_accordion__WEBPACK_IMPORTED_MODULE_0__["default"], _src_accordion_item__WEBPACK_IMPORTED_MODULE_1__["default"], _src_actionsheet__WEBPACK_IMPORTED_MODULE_2__["default"], _src_alert__WEBPACK_IMPORTED_MODULE_3__["default"], _src_badge__WEBPACK_IMPORTED_MODULE_4__["default"], _src_button__WEBPACK_IMPORTED_MODULE_5__["default"], _src_calendar__WEBPACK_IMPORTED_MODULE_6__["default"], _src_cell__WEBPACK_IMPORTED_MODULE_7__["default"], _src_checkbox__WEBPACK_IMPORTED_MODULE_8__["default"], _src_checkbox_group__WEBPACK_IMPORTED_MODULE_9__["default"], _src_confirm__WEBPACK_IMPORTED_MODULE_10__["default"], _src_date_picker__WEBPACK_IMPORTED_MODULE_11__["default"], _src_date_picker_view__WEBPACK_IMPORTED_MODULE_13__["default"], _src_date_select__WEBPACK_IMPORTED_MODULE_12__["default"], _src_drag__WEBPACK_IMPORTED_MODULE_14__["default"], _src_icon__WEBPACK_IMPORTED_MODULE_15__["default"], _src_input__WEBPACK_IMPORTED_MODULE_16__["default"], _src_input_number__WEBPACK_IMPORTED_MODULE_17__["default"], _src_keyboard__WEBPACK_IMPORTED_MODULE_18__["default"], _src_keyboard_picker__WEBPACK_IMPORTED_MODULE_19__["default"], _src_loading__WEBPACK_IMPORTED_MODULE_20__["default"], _src_mask__WEBPACK_IMPORTED_MODULE_21__["default"], _src_message__WEBPACK_IMPORTED_MODULE_22__["default"], _src_modal__WEBPACK_IMPORTED_MODULE_23__["default"], _src_notice_bar__WEBPACK_IMPORTED_MODULE_24__["default"], _src_panel__WEBPACK_IMPORTED_MODULE_25__["default"], _src_panel_header__WEBPACK_IMPORTED_MODULE_26__["default"], _src_panel_body__WEBPACK_IMPORTED_MODULE_27__["default"], _src_panel_footer__WEBPACK_IMPORTED_MODULE_28__["default"], _src_picker__WEBPACK_IMPORTED_MODULE_29__["default"], _src_picker_view__WEBPACK_IMPORTED_MODULE_30__["default"], _src_popup__WEBPACK_IMPORTED_MODULE_31__["default"], _src_progress__WEBPACK_IMPORTED_MODULE_32__["default"], _src_pull__WEBPACK_IMPORTED_MODULE_33__["default"], _src_radio__WEBPACK_IMPORTED_MODULE_44__["default"], _src_radio_group__WEBPACK_IMPORTED_MODULE_45__["default"], _src_search_bar__WEBPACK_IMPORTED_MODULE_34__["default"], _src_select__WEBPACK_IMPORTED_MODULE_35__["default"], _src_slider__WEBPACK_IMPORTED_MODULE_36__["default"], _src_spinner__WEBPACK_IMPORTED_MODULE_37__["default"], _src_stack_picker__WEBPACK_IMPORTED_MODULE_38__["default"], _src_stepper__WEBPACK_IMPORTED_MODULE_39__["default"], _src_swipe__WEBPACK_IMPORTED_MODULE_40__["default"], _src_swipe_action__WEBPACK_IMPORTED_MODULE_41__["default"], _src_swipe_item__WEBPACK_IMPORTED_MODULE_42__["default"], _src_switch__WEBPACK_IMPORTED_MODULE_43__["default"], _src_tabs__WEBPACK_IMPORTED_MODULE_46__["default"], _src_tab_pane__WEBPACK_IMPORTED_MODULE_47__["default"], _src_toast__WEBPACK_IMPORTED_MODULE_48__["default"], _src_tooltip__WEBPACK_IMPORTED_MODULE_49__["default"], _src_uploader__WEBPACK_IMPORTED_MODULE_50__["default"]];

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (install.installed) return;

  components.map(function (component) {
    return Vue.component(component.name, component);
  });

  Vue.use(_src_loading__WEBPACK_IMPORTED_MODULE_20__["default"].directive);

  Vue.prototype.$zaToast = _src_toast__WEBPACK_IMPORTED_MODULE_48__["default"].root;
  Vue.prototype.$zaTooltip = _src_tooltip__WEBPACK_IMPORTED_MODULE_49__["default"].root;
  Vue.prototype.$zaLoading = _src_loading__WEBPACK_IMPORTED_MODULE_20__["default"].root;
  Vue.prototype.$zaAlert = _src_alert__WEBPACK_IMPORTED_MODULE_3__["default"].root;
  Vue.prototype.$zaConfirm = _src_confirm__WEBPACK_IMPORTED_MODULE_10__["default"].root;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}



/* harmony default export */ __webpack_exports__["default"] = ({
  install: install,
  version: version
});

/***/ })
/******/ ]);