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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 47:
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

/***/ })

/******/ });