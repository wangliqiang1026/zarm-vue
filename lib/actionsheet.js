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
/******/ 	return __webpack_require__(__webpack_require__.s = 142);
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

/***/ 142:
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

/***/ 51:
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

/***/ })

/******/ });