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
/******/ 	return __webpack_require__(__webpack_require__.s = 115);
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

/***/ 100:
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

/***/ 115:
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

/***/ }),

/***/ 85:
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

/***/ })

/******/ });