define('mip-example/mip-example', ['require', 'common/vue-dependencies/utils', 'node_modules/style-inject/0.3.0/dist/style-inject.es', 'node_modules/mustache/2.3.2/mustache', 'node_modules/babel-runtime/6.26.0/core-js/json/stringify'], function (require, utils, styleInject, mustache, _JSON$stringify) { 'use strict';

  styleInject = styleInject && styleInject.hasOwnProperty('default') ? styleInject['default'] : styleInject;
  mustache = mustache && mustache.hasOwnProperty('default') ? mustache['default'] : mustache;
  _JSON$stringify = _JSON$stringify && _JSON$stringify.hasOwnProperty('default') ? _JSON$stringify['default'] : _JSON$stringify;

  function sayHi() {
    console.log('hi');
  }

  function loadEtpl() {
    new Promise(function (resolve, reject) { require(['etpl/src/main'], resolve, reject) }).then(function (etpl) {
      return console.log(etpl);
    });
  }

  var __mip_child_component_mip_example_item__ = {
    mounted: function mounted() {
      sayHi();
      console.log('this is mip example item');
    },
    destroyed: function destroyed() {
      utils.sayBye();
    }
  };

  var css = ".outside-common-dep {\n  background: #fff;\n}\n.outside-common {\n  background-image: url('https://www.baidu.com/assets/mip-logo-7351c3171fe7cf62.png');\n}\n";
  styleInject(css);

  //

  var script = {
    data: function data() {
      return {
        name: 'haha'
      };
    },
    mounted: function mounted() {
      sayHi();

      loadEtpl();
    },
    destroyed: function destroyed() {
      utils.sayBye();
    }
  };

  MIP[typeof __mip_child_component_mip_example_item__ === 'function' ? 'registerCustomElement' : 'registerVueCustomElement']('mip-example-item', __mip_child_component_mip_example_item__);
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm._v(_vm._s(_vm.name))]);
  };
  var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "mip-example.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(_JSON$stringify(css.map)))) + ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var __mip_component_mip_example__ = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  MIP[typeof __mip_component_mip_example__ === 'function' ? 'registerCustomElement' : 'registerVueCustomElement']('mip-example', __mip_component_mip_example__);

});
