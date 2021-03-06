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
/******/ 	return __webpack_require__(__webpack_require__.s = 127);
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

/***/ 116:
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

/***/ 127:
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

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);


_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_icon__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ })

/******/ });