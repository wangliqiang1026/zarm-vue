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
/******/ 	return __webpack_require__(__webpack_require__.s = 95);
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

/***/ 15:
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

/***/ 36:
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

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);


_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 95:
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

/***/ })

/******/ });