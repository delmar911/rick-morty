(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();function ht(r){for(var e=[],t=0;t<r.length;){var i=r[t];if(i==="*"||i==="+"||i==="?"){e.push({type:"MODIFIER",index:t,value:r[t++]});continue}if(i==="\\"){e.push({type:"ESCAPED_CHAR",index:t++,value:r[t++]});continue}if(i==="{"){e.push({type:"OPEN",index:t,value:r[t++]});continue}if(i==="}"){e.push({type:"CLOSE",index:t,value:r[t++]});continue}if(i===":"){for(var n="",s=t+1;s<r.length;){var o=r.charCodeAt(s);if(o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122||o===95){n+=r[s++];continue}break}if(!n)throw new TypeError("Missing parameter name at ".concat(t));e.push({type:"NAME",index:t,value:n}),t=s;continue}if(i==="("){var a=1,c="",s=t+1;if(r[s]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<r.length;){if(r[s]==="\\"){c+=r[s++]+r[s++];continue}if(r[s]===")"){if(a--,a===0){s++;break}}else if(r[s]==="("&&(a++,r[s+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(s));c+=r[s++]}if(a)throw new TypeError("Unbalanced pattern at ".concat(t));if(!c)throw new TypeError("Missing pattern at ".concat(t));e.push({type:"PATTERN",index:t,value:c}),t=s;continue}e.push({type:"CHAR",index:t,value:r[t++]})}return e.push({type:"END",index:t,value:""}),e}function fe(r,e){e===void 0&&(e={});for(var t=ht(r),i=e.prefixes,n=i===void 0?"./":i,s=e.delimiter,o=s===void 0?"/#?":s,a=[],c=0,d=0,l="",h=function($){if(d<t.length&&t[d].type===$)return t[d++].value},f=function($){var v=h($);if(v!==void 0)return v;var A=t[d],he=A.type,ct=A.index;throw new TypeError("Unexpected ".concat(he," at ").concat(ct,", expected ").concat($))},u=function(){for(var $="",v;v=h("CHAR")||h("ESCAPED_CHAR");)$+=v;return $},p=function($){for(var v=0,A=o;v<A.length;v++){var he=A[v];if($.indexOf(he)>-1)return!0}return!1},E=function($){var v=a[a.length-1],A=$||(v&&typeof v=="string"?v:"");if(v&&!A)throw new TypeError('Must have text between two parameters, missing text after "'.concat(v.name,'"'));return!A||p(A)?"[^".concat(C(o),"]+?"):"(?:(?!".concat(C(A),")[^").concat(C(o),"])+?")};d<t.length;){var y=h("CHAR"),_=h("NAME"),H=h("PATTERN");if(_||H){var w=y||"";n.indexOf(w)===-1&&(l+=w,w=""),l&&(a.push(l),l=""),a.push({name:_||c++,prefix:w,suffix:"",pattern:H||E(w),modifier:h("MODIFIER")||""});continue}var m=y||h("ESCAPED_CHAR");if(m){l+=m;continue}l&&(a.push(l),l="");var T=h("OPEN");if(T){var w=u(),R=h("NAME")||"",B=h("PATTERN")||"",D=u();f("CLOSE"),a.push({name:R||(B?c++:""),pattern:R&&!B?E(w):B,prefix:w,suffix:D,modifier:h("MODIFIER")||""});continue}f("END")}return a}function ze(r,e){return Ve(fe(r,e),e)}function Ve(r,e){e===void 0&&(e={});var t=pe(e),i=e.encode,n=i===void 0?function(c){return c}:i,s=e.validate,o=s===void 0?!0:s,a=r.map(function(c){if(typeof c=="object")return new RegExp("^(?:".concat(c.pattern,")$"),t)});return function(c){for(var d="",l=0;l<r.length;l++){var h=r[l];if(typeof h=="string"){d+=h;continue}var f=c?c[h.name]:void 0,u=h.modifier==="?"||h.modifier==="*",p=h.modifier==="*"||h.modifier==="+";if(Array.isArray(f)){if(!p)throw new TypeError('Expected "'.concat(h.name,'" to not repeat, but got an array'));if(f.length===0){if(u)continue;throw new TypeError('Expected "'.concat(h.name,'" to not be empty'))}for(var E=0;E<f.length;E++){var y=n(f[E],h);if(o&&!a[l].test(y))throw new TypeError('Expected all "'.concat(h.name,'" to match "').concat(h.pattern,'", but got "').concat(y,'"'));d+=h.prefix+y+h.suffix}continue}if(typeof f=="string"||typeof f=="number"){var y=n(String(f),h);if(o&&!a[l].test(y))throw new TypeError('Expected "'.concat(h.name,'" to match "').concat(h.pattern,'", but got "').concat(y,'"'));d+=h.prefix+y+h.suffix;continue}if(!u){var _=p?"an array":"a string";throw new TypeError('Expected "'.concat(h.name,'" to be ').concat(_))}}return d}}function C(r){return r.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function pe(r){return r&&r.sensitive?"":"i"}function lt(r,e){if(!e)return r;for(var t=/\((?:\?<(.*?)>)?(?!\?)/g,i=0,n=t.exec(r.source);n;)e.push({name:n[1]||i++,prefix:"",suffix:"",modifier:"",pattern:""}),n=t.exec(r.source);return r}function dt(r,e,t){var i=r.map(function(n){return We(n,e,t).source});return new RegExp("(?:".concat(i.join("|"),")"),pe(t))}function ut(r,e,t){return ft(fe(r,t),e,t)}function ft(r,e,t){t===void 0&&(t={});for(var i=t.strict,n=i===void 0?!1:i,s=t.start,o=s===void 0?!0:s,a=t.end,c=a===void 0?!0:a,d=t.encode,l=d===void 0?function(v){return v}:d,h=t.delimiter,f=h===void 0?"/#?":h,u=t.endsWith,p=u===void 0?"":u,E="[".concat(C(p),"]|$"),y="[".concat(C(f),"]"),_=o?"^":"",H=0,w=r;H<w.length;H++){var m=w[H];if(typeof m=="string")_+=C(l(m));else{var T=C(l(m.prefix)),R=C(l(m.suffix));if(m.pattern)if(e&&e.push(m),T||R)if(m.modifier==="+"||m.modifier==="*"){var B=m.modifier==="*"?"?":"";_+="(?:".concat(T,"((?:").concat(m.pattern,")(?:").concat(R).concat(T,"(?:").concat(m.pattern,"))*)").concat(R,")").concat(B)}else _+="(?:".concat(T,"(").concat(m.pattern,")").concat(R,")").concat(m.modifier);else{if(m.modifier==="+"||m.modifier==="*")throw new TypeError('Can not repeat "'.concat(m.name,'" without a prefix and suffix'));_+="(".concat(m.pattern,")").concat(m.modifier)}else _+="(?:".concat(T).concat(R,")").concat(m.modifier)}}if(c)n||(_+="".concat(y,"?")),_+=t.endsWith?"(?=".concat(E,")"):"$";else{var D=r[r.length-1],$=typeof D=="string"?y.indexOf(D[D.length-1])>-1:D===void 0;n||(_+="(?:".concat(y,"(?=").concat(E,"))?")),$||(_+="(?=".concat(y,"|").concat(E,")"))}return new RegExp(_,pe(t))}function We(r,e,t){return r instanceof RegExp?lt(r,e):Array.isArray(r)?dt(r,e,t):ut(r,e,t)}function M(r){return typeof r=="object"&&!!r}function K(r){return typeof r=="function"}function x(r){return typeof r=="string"}function ne(r=[]){return Array.isArray(r)?r:[r]}function P(r){return`[Vaadin.Router] ${r}`}class qe extends Error{code;context;constructor(e){super(P(`Page not found (${e.pathname})`)),this.context=e,this.code=404}}const N=Symbol("NotFoundResult");function Ke(r){return new qe(r)}function Ge(r){return(Array.isArray(r)?r[0]:r)??""}function se(r){return Ge(r?.path)}function pt(r){return Array.isArray(r)&&r.length>0?r:void 0}const de=new Map;de.set("|false",{keys:[],pattern:/(?:)/u});function $e(r){try{return decodeURIComponent(r)}catch{return r}}function mt(r,e,t=!1,i=[],n){const s=`${r}|${String(t)}`,o=Ge(e);let a=de.get(s);if(!a){const l=[];a={keys:l,pattern:We(r,l,{end:t,strict:r===""})},de.set(s,a)}const c=a.pattern.exec(o);if(!c)return null;const d={...n};for(let l=1;l<c.length;l++){const h=a.keys[l-1],f=h.name,u=c[l];(u!==void 0||!Object.hasOwn(d,f))&&(h.modifier==="+"||h.modifier==="*"?d[f]=u?u.split(/[/?#]/u).map($e):[]:d[f]=u&&$e(u))}return{keys:[...i,...a.keys],params:d,path:c[0]}}var gt=mt;function Je(r,e,t,i,n){let s,o,a=0,c=se(r);return c.startsWith("/")&&(t&&(c=c.substring(1)),t=!0),{next(d){if(r===d)return{done:!0,value:void 0};r.__children??=pt(r.children);const l=r.__children??[],h=!r.__children&&!r.children;if(!s&&(s=gt(c,e,h,i,n),s))return{value:{keys:s.keys,params:s.params,path:s.path,route:r}};if(s&&l.length>0)for(;a<l.length;){if(!o){const u=l[a];u.parent=r;let p=s.path.length;p>0&&e.charAt(p)==="/"&&(p+=1),o=Je(u,e.substring(p),t,s.keys,s.params)}const f=o.next(d);if(!f.done)return{done:!1,value:f.value};o=null,a+=1}return{done:!0,value:void 0}}}}var vt=Je;function yt(r){if(K(r.route.action))return r.route.action(r)}function _t(r,e){let t=r;for(;t;)if(t=t.parent,t===e)return!0;return!1}function $t(r){return!!r&&typeof r=="object"&&"next"in r&&"params"in r&&"result"in r&&"route"in r}class wt extends Error{code;context;constructor(e,t){let i=`Path '${e.pathname}' is not properly resolved due to an error.`;const n=se(e.route);n&&(i+=` Resolution had failed on route: '${n}'`),super(i,t),this.code=t?.code,this.context=e}warn(){console.warn(this.message)}}function bt(r,e){const{path:t,route:i}=e;if(i&&!i.__synthetic){const n={path:t,route:i};if(i.parent&&r.chain)for(let s=r.chain.length-1;s>=0&&r.chain[s].route!==i.parent;s--)r.chain.pop();r.chain?.push(n)}}class Xe{baseUrl;#r;errorHandler;resolveRoute;#e;constructor(e,{baseUrl:t="",context:i,errorHandler:n,resolveRoute:s=yt}={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t,this.errorHandler=n,this.resolveRoute=s,Array.isArray(e)?this.#e={__children:e,__synthetic:!0,action:()=>{},path:""}:this.#e={...e,parent:void 0},this.#r={...i,hash:"",async next(){return N},params:{},pathname:"",resolver:this,route:this.#e,search:"",chain:[]}}get root(){return this.#e}get context(){return this.#r}get __effectiveBaseUrl(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...this.#e.__children??[]]}removeRoutes(){this.#e.__children=[]}async resolve(e){const t=this,i={...this.#r,...x(e)?{pathname:e}:e,next:d},n=vt(this.#e,this.__normalizePathname(i.pathname)??i.pathname,!!this.baseUrl),s=this.resolveRoute;let o=null,a=null,c=i;async function d(l=!1,h=o?.value?.route,f){const u=f===null?o?.value?.route:void 0;if(o=a??n.next(u),a=null,!l&&(o.done||!_t(o.value.route,h)))return a=o,N;if(o.done)throw Ke(i);c={...i,params:o.value.params,route:o.value.route,chain:c.chain?.slice()},bt(c,o.value);const p=await s(c);return p!=null&&p!==N?(c.result=$t(p)?p.result:p,t.#r=c,c):await d(l,h,p)}try{return await d(!0,this.#e)}catch(l){const h=l instanceof qe?l:new wt(c,{code:500,cause:l});if(this.errorHandler)return c.result=this.errorHandler(h),c;throw l}}setRoutes(e){this.#e.__children=[...ne(e)]}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,i=e.startsWith("/")?new URL(t).origin+e:`./${e}`,n=new URL(i,t).href;if(n.startsWith(t))return n.slice(t.length)}addRoutes(e){return this.#e.__children=[...this.#e.__children??[],...ne(e)],this.getRoutes()}}function Qe(r,e,t,i){const n=e.name??i?.(e);if(n&&(r.has(n)?r.get(n)?.push(e):r.set(n,[e])),Array.isArray(t))for(const s of t)s.parent=e,Qe(r,s,s.__children??s.children,i)}function we(r,e){const t=r.get(e);if(t){if(t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t[0]}}function Et(r,e={}){if(!(r instanceof Xe))throw new TypeError("An instance of Resolver is expected");const t=new Map,i=new Map;return(n,s)=>{let o=we(i,n);if(!o&&(i.clear(),Qe(i,r.root,r.root.__children,e.cacheKeyProvider),o=we(i,n),!o))throw new Error(`Route "${n}" not found`);let a=o.fullPath?t.get(o.fullPath):void 0;if(!a){let l=se(o),h=o.parent;for(;h;){const p=se(h);p&&(l=`${p.replace(/\/$/u,"")}/${l.replace(/^\//u,"")}`),h=h.parent}const f=fe(l),u=Object.create(null);for(const p of f)x(p)||(u[p.name]=!0);a={keys:u,tokens:f},t.set(l,a),o.fullPath=l}let d=Ve(a.tokens,{encode:encodeURIComponent,...e})(s)||"/";if(e.stringifyQueryParams&&s){const l={};for(const[f,u]of Object.entries(s))!(f in a.keys)&&u&&(l[f]=u);const h=e.stringifyQueryParams(l);h&&(d+=h.startsWith("?")?h:`?${h}`)}return d}}var At=Et;const xt=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,Z=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Rt(){function r(){return!0}return Ze(r)}function Ct(){try{return St()?!0:Pt()?Z?!Tt():!Rt():!1}catch{return!1}}function St(){return localStorage.getItem("vaadin.developmentmode.force")}function Pt(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function Tt(){return!!(Z&&Object.keys(Z).map(e=>Z[e]).filter(e=>e.productionMode).length>0)}function Ze(r,e){if(typeof r!="function")return;const t=xt.exec(r.toString());if(t)try{r=new Function(t[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return r(e)}window.Vaadin=window.Vaadin||{};const be=function(r,e){if(window.Vaadin.developmentMode)return Ze(r,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=Ct());function Ot(){/*! vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.2';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/}const Mt=function(){if(typeof be=="function")return be(Ot)};function Ut(r,e=window.Vaadin??={}){e.registrations??=[],e.registrations.push({is:"@vaadin/router",version:"2.0.0"})}Ut();Mt();const Nt=r=>{const e=getComputedStyle(r).getPropertyValue("animation-name");return e&&e!=="none"},It=(r,e)=>{const t=()=>{r.removeEventListener("animationend",t),e()};r.addEventListener("animationend",t)};async function Lt(r,e){return r.classList.add(e),await new Promise(t=>{if(Nt(r)){const i=r.getBoundingClientRect(),n=`height: ${i.bottom-i.top}px; width: ${i.right-i.left}px`;r.setAttribute("style",`position: absolute; ${n}`),It(r,()=>{r.classList.remove(e),r.removeAttribute("style"),t()})}else r.classList.remove(e),t()})}var Ee=Lt;function Ye(r){if(!r||!x(r.path))throw new Error(P('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!K(r.action)&&!Array.isArray(r.children)&&!K(r.children)&&!x(r.component)&&!x(r.redirect))throw new Error(P(`Expected route config "${r.path}" to include either "component, redirect" or "action" function but none found.`));r.redirect&&["bundle","component"].forEach(e=>{e in r&&console.warn(P(`Route config "${String(r.path)}" has both "redirect" and "${e}" properties, and "redirect" will always override the latter. Did you mean to only use "${e}"?`))})}function Ae(r){ne(r).forEach(e=>Ye(e))}function Ht({next:r,...e}){return e}function Y(r,e){const t=e.__effectiveBaseUrl;return t?new URL(r.replace(/^\//u,""),t).pathname:r}function et(r){return r.map(e=>e.path).reduce((e,t)=>t.length?`${e.replace(/\/$/u,"")}/${t.replace(/^\//u,"")}`:e,"")}function Dt(r){return et(r.map(e=>e.route))}function b({chain:r=[],hash:e="",params:t={},pathname:i="",redirectFrom:n,resolver:s,search:o=""},a){const c=r.map(d=>d.route);return{baseUrl:s?.baseUrl??"",getUrl:(d={})=>s?Y(ze(Dt(r))({...t,...d}),s):"",hash:e,params:t,pathname:i,redirectFrom:n,route:a??(Array.isArray(c)?c.at(-1):void 0)??null,routes:c,search:o,searchParams:new URLSearchParams(o)}}function xe(r,e){const t={...r.params};return{redirect:{from:r.pathname,params:t,pathname:e}}}function jt(r,e){if(e.location=b(r),r.chain){const t=r.chain.map(i=>i.route).indexOf(r.route);r.chain[t].element=e}return e}function ee(r,e,...t){if(typeof r=="function")return r.apply(e,t)}function Re(r,e,...t){return i=>i&&M(i)&&("cancel"in i||"redirect"in i)?i:ee(e?.[r],e,...t)}function kt(r,e){if(!Array.isArray(r)&&!M(r))throw new Error(P(`Incorrect "children" value for the route ${String(e.path)}: expected array or object, but got ${String(r)}`));const t=ne(r);t.forEach(i=>Ye(i)),e.__children=t}function W(r,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${r}`,{cancelable:r==="go",detail:e}))}function Ft(r){if(typeof r!="object")return String(r);const[e="Unknown"]=/ (.*)\]$/u.exec(String(r))??[];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(r)}`:e}function Bt(r){const{port:e,protocol:t}=r,s=t==="http:"&&e==="80"||t==="https:"&&e==="443"?r.hostname:r.host;return`${t}//${s}`}function Ce(r){if(r instanceof Element)return r.nodeName.toLowerCase()}function Se(r){if(r.defaultPrevented||r.button!==0||r.shiftKey||r.ctrlKey||r.altKey||r.metaKey)return;let e=r.target;const t=r instanceof MouseEvent?r.composedPath():r.path??[];for(let c=0;c<t.length;c++){const d=t[c];if("nodeName"in d&&d.nodeName.toLowerCase()==="a"){e=d;break}}for(;e&&e instanceof Node&&Ce(e)!=="a";)e=e.parentNode;if(!e||Ce(e)!=="a")return;const i=e;if(i.target&&i.target.toLowerCase()!=="_self"||i.hasAttribute("download")||i.hasAttribute("router-ignore")||i.pathname===window.location.pathname&&i.hash!==""||(i.origin||Bt(i))!==window.location.origin)return;const{hash:s,pathname:o,search:a}=i;W("go",{hash:s,pathname:o,search:a})&&r instanceof MouseEvent&&(r.preventDefault(),r.type==="click"&&window.scrollTo(0,0))}const zt={activate(){window.document.addEventListener("click",Se)},inactivate(){window.document.removeEventListener("click",Se)}};var Vt=zt;function Pe(r){if(r.state==="vaadin-router-ignore")return;const{hash:e,pathname:t,search:i}=window.location;W("go",{hash:e,pathname:t,search:i})}const Wt={activate(){window.addEventListener("popstate",Pe)},inactivate(){window.removeEventListener("popstate",Pe)}};var qt=Wt;let Te=[];const Kt={CLICK:Vt,POPSTATE:qt};function Oe(r=[]){Te.forEach(e=>e.inactivate()),r.forEach(e=>e.activate()),Te=r}const Gt=256;function z(){return{cancel:!0}}const Me={__renderId:-1,params:{},route:{__synthetic:!0,children:[],path:"",action(){}},pathname:"",async next(){return N}};class te extends Xe{location=b({resolver:this});ready=Promise.resolve(this.location);#r=new WeakSet;#e=new WeakSet;#l=this.#y.bind(this);#o=0;#s;__previousContext;#a;#i=null;#t=null;constructor(e,t){const n=document.head.querySelector("base")?.getAttribute("href");super([],{baseUrl:n?new URL(n,document.URL).href.replace(/[^/]*$/u,""):void 0,...t,resolveRoute:async s=>await this.#_(s)}),Oe(Object.values(Kt)),this.setOutlet(e),this.subscribe()}async#_(e){const{route:t}=e;if(K(t.children)){let n=await t.children(Ht(e));K(t.children)||({children:n}=t),kt(n,t)}const i={component:n=>{const s=document.createElement(n);return this.#e.add(s),s},prevent:z,redirect:n=>xe(e,n)};return await Promise.resolve().then(async()=>{if(this.#n(e))return await ee(t.action,t,e,i)}).then(n=>{if(n!=null&&(typeof n=="object"||typeof n=="symbol")&&(n instanceof HTMLElement||n===N||M(n)&&"redirect"in n))return n;if(x(t.redirect))return i.redirect(t.redirect)}).then(n=>{if(n!=null)return n;if(x(t.component))return i.component(t.component)})}setOutlet(e){e&&this.#g(e),this.#s=e}getOutlet(){return this.#s}async setRoutes(e,t=!1){return this.__previousContext=void 0,this.#a=void 0,Ae(e),super.setRoutes(e),t||this.#y(),await this.ready}addRoutes(e){return Ae(e),super.addRoutes(e)}async render(e,t=!1){this.#o+=1;const i=this.#o,n={...Me,...x(e)?{hash:"",search:"",pathname:e}:e,__renderId:i};return this.ready=this.#$(n,t),await this.ready}async#$(e,t){const{__renderId:i}=e;try{const n=await this.resolve(e),s=await this.#c(n);if(!this.#n(s))return this.location;const o=this.__previousContext;if(s===o)return this.#h(o,!0),this.location;if(this.location=b(s),t&&this.#h(s,i===1),W("location-changed",{router:this,location:this.location}),s.__skipAttach)return this.#v(s,o),this.__previousContext=s,this.location;this.#E(s,o);const a=this.#S(s);if(this.#C(s),this.#R(s,o),await a,this.#n(s))return this.#A(),this.__previousContext=s,this.location}catch(n){if(i===this.#o){t&&this.#h(this.context);for(const s of this.#s?.children??[])s.remove();throw this.location=b(Object.assign(e,{resolver:this})),W("error",{router:this,error:n,...e}),n}}return this.location}async#c(e,t=e){const i=await this.#d(t),s=i!==t?i:e,a=Y(et(i.chain??[]),this)===i.pathname,c=async(l,h=l.route,f)=>{const u=await l.next(!1,h,f);return u===null||u===N?a?l:h.parent!=null?await c(l,h.parent,u):u:u},d=await c(i);if(d==null||d===N)throw Ke(s);return d!==i?await this.#c(s,d):await this.#w(i)}async#d(e){const{result:t}=e;if(t instanceof HTMLElement)return jt(e,t),e;if(t&&"redirect"in t){const i=await this.#m(t.redirect,e.__redirectCount,e.__renderId);return await this.#d(i)}throw t instanceof Error?t:new Error(P(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Ft(t)}". Double check the action return value for the route.`))}async#w(e){return await this.#b(e).then(async t=>t===this.__previousContext||t===e?t:await this.#c(t))}async#b(e){const t=this.__previousContext??{},i=t.chain??[],n=e.chain??[];let s=Promise.resolve(void 0);const o=a=>xe(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let a=0;a<Math.min(i.length,n.length)&&!(i[a].route!==n[a].route||i[a].path!==n[a].path&&i[a].element!==n[a].element||!this.#p(i[a].element,n[a].element));e.__divergedChainIndex++,a++);if(e.__skipAttach=n.length===i.length&&e.__divergedChainIndex===n.length&&this.#p(e.result,t.result),e.__skipAttach){for(let a=n.length-1;a>=0;a--)s=this.#u(s,e,{prevent:z},i[a]);for(let a=0;a<n.length;a++)s=this.#f(s,e,{prevent:z,redirect:o},n[a]),i[a].element.location=b(e,i[a].route)}else for(let a=i.length-1;a>=e.__divergedChainIndex;a--)s=this.#u(s,e,{prevent:z},i[a])}if(!e.__skipAttach)for(let a=0;a<n.length;a++)a<e.__divergedChainIndex?a<i.length&&i[a].element&&(i[a].element.location=b(e,i[a].route)):(s=this.#f(s,e,{prevent:z,redirect:o},n[a]),n[a].element&&(n[a].element.location=b(e,n[a].route)));return await s.then(async a=>{if(a&&M(a)){if("cancel"in a&&this.__previousContext)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if("redirect"in a)return await this.#m(a.redirect,e.__redirectCount,e.__renderId)}return e})}async#u(e,t,i,n){const s=b(t);let o=await e;if(this.#n(t)&&(o=Re("onBeforeLeave",n.element,s,i,this)(o)),!(M(o)&&"redirect"in o))return o}async#f(e,t,i,n){const s=b(t,n.route),o=await e;if(this.#n(t))return Re("onBeforeEnter",n.element,s,i,this)(o)}#p(e,t){return e instanceof Element&&t instanceof Element?this.#e.has(e)&&this.#e.has(t)?e.localName===t.localName:e===t:!1}#n(e){return e.__renderId===this.#o}async#m(e,t=0,i=0){if(t>Gt)throw new Error(P(`Too many redirects when rendering ${e.from}`));return await this.resolve({...Me,pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:t+1,__renderId:i})}#g(e=this.#s){if(!(e instanceof Element||e instanceof DocumentFragment))throw new TypeError(P(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${e})`))}#h({pathname:e,search:t="",hash:i=""},n){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==i){const s=n?"replaceState":"pushState";window.history[s](null,document.title,e+t+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}#v(e,t){let i=this.#s;for(let n=0;n<(e.__divergedChainIndex??0);n++){const s=t?.chain?.[n].element;if(s)if(s.parentNode===i)e.chain[n].element=s,i=s;else break}return i}#E(e,t){this.#g(),this.#x();const i=this.#v(e,t);this.#i=[],this.#t=Array.from(i?.children??[]).filter(s=>this.#r.has(s)&&s!==e.result);let n=i;for(let s=e.__divergedChainIndex??0;s<(e.chain?.length??0);s++){const o=e.chain[s].element;o&&(n?.appendChild(o),this.#r.add(o),n===i&&this.#i.push(o),n=o)}}#A(){if(this.#t)for(const e of this.#t)e.remove();this.#t=null,this.#i=null}#x(){if(this.#t&&this.#i){for(const e of this.#i)e.remove();this.#t=null,this.#i=null}}#R(e,t){if(!(!t?.chain||e.__divergedChainIndex==null))for(let i=t.chain.length-1;i>=e.__divergedChainIndex&&this.#n(e);i--){const n=t.chain[i].element;if(n)try{const s=b(e);ee(n.onAfterLeave,n,s,{},this)}finally{if(this.#t?.includes(n))for(const s of n.children)s.remove()}}}#C(e){if(!(!e.chain||e.__divergedChainIndex==null))for(let t=e.__divergedChainIndex;t<e.chain.length&&this.#n(e);t++){const i=e.chain[t].element;if(i){const n=b(e,e.chain[t].route);ee(i.onAfterEnter,i,n,{},this)}}}async#S(e){const t=this.#t?.[0],i=this.#i?.[0],n=[],{chain:s=[]}=e;let o;for(let a=s.length-1;a>=0;a--)if(s[a].route.animate){o=s[a].route.animate;break}if(t&&i&&o){const a=M(o)&&o.leave?o.leave:"leaving",c=M(o)&&o.enter?o.enter:"entering";n.push(Ee(t,a)),n.push(Ee(i,c))}return await Promise.all(n),e}subscribe(){window.addEventListener("vaadin-router-go",this.#l)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.#l)}#y(e){const{pathname:t,search:i,hash:n}=e instanceof CustomEvent?e.detail:window.location;x(this.__normalizePathname(t))&&(e?.preventDefault&&e.preventDefault(),this.render({pathname:t,search:i,hash:n},!0))}static setTriggers(...e){Oe(e)}urlForName(e,t){return this.#a||(this.#a=At(this,{cacheKeyProvider(i){return"component"in i&&typeof i.component=="string"?i.component:void 0}})),Y(this.#a(e,t??void 0),this)}urlForPath(e,t){return Y(ze(e)(t??void 0),this)}static go(e){const{pathname:t,search:i,hash:n}=x(e)?new URL(e,"http://a"):e;return W("go",{pathname:t,search:i,hash:n})}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const re=globalThis,me=re.ShadowRoot&&(re.ShadyCSS===void 0||re.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),Ue=new WeakMap;let tt=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(me&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ue.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ue.set(t,e))}return e}toString(){return this.cssText}};const Jt=r=>new tt(typeof r=="string"?r:r+"",void 0,ge),rt=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,n,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[s+1],r[0]);return new tt(t,r,ge)},Xt=(r,e)=>{if(me)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),n=re.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,r.appendChild(i)}},Ne=me?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Jt(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Qt,defineProperty:Zt,getOwnPropertyDescriptor:Yt,getOwnPropertyNames:er,getOwnPropertySymbols:tr,getPrototypeOf:rr}=Object,ae=globalThis,Ie=ae.trustedTypes,ir=Ie?Ie.emptyScript:"",nr=ae.reactiveElementPolyfillSupport,q=(r,e)=>r,ue={toAttribute(r,e){switch(e){case Boolean:r=r?ir:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},it=(r,e)=>!Qt(r,e),Le={attribute:!0,type:String,converter:ue,reflect:!1,useDefault:!1,hasChanged:it};Symbol.metadata??=Symbol("metadata"),ae.litPropertyMetadata??=new WeakMap;let j=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Le){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&Zt(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:s}=Yt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:n,set(o){const a=n?.call(this);s?.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Le}static _$Ei(){if(this.hasOwnProperty(q("elementProperties")))return;const e=rr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(q("properties"))){const t=this.properties,i=[...er(t),...tr(t)];for(const n of i)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)t.unshift(Ne(n))}else e!==void 0&&t.push(Ne(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:ue).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const s=i.getPropertyOptions(n),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ue;this._$Em=n;const a=o.fromAttribute(t,s.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){const n=this.constructor,s=this[e];if(i??=n.getPropertyOptions(e),!((i.hasChanged??it)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:s},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,s]of i){const{wrapped:o}=s,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,s,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[q("elementProperties")]=new Map,j[q("finalized")]=new Map,nr?.({ReactiveElement:j}),(ae.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve=globalThis,oe=ve.trustedTypes,He=oe?oe.createPolicy("lit-html",{createHTML:r=>r}):void 0,nt="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+S,sr=`<${st}>`,L=document,G=()=>L.createComment(""),J=r=>r===null||typeof r!="object"&&typeof r!="function",ye=Array.isArray,or=r=>ye(r)||typeof r?.[Symbol.iterator]=="function",le=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,De=/-->/g,je=/>/g,O=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,Fe=/"/g,ot=/^(?:script|style|textarea|title)$/i,ar=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),ie=ar(1),k=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Be=new WeakMap,U=L.createTreeWalker(L,129);function at(r,e){if(!ye(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return He!==void 0?He.createHTML(e):e}const cr=(r,e)=>{const t=r.length-1,i=[];let n,s=e===2?"<svg>":e===3?"<math>":"",o=V;for(let a=0;a<t;a++){const c=r[a];let d,l,h=-1,f=0;for(;f<c.length&&(o.lastIndex=f,l=o.exec(c),l!==null);)f=o.lastIndex,o===V?l[1]==="!--"?o=De:l[1]!==void 0?o=je:l[2]!==void 0?(ot.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=O):l[3]!==void 0&&(o=O):o===O?l[0]===">"?(o=n??V,h=-1):l[1]===void 0?h=-2:(h=o.lastIndex-l[2].length,d=l[1],o=l[3]===void 0?O:l[3]==='"'?Fe:ke):o===Fe||o===ke?o=O:o===De||o===je?o=V:(o=O,n=void 0);const u=o===O&&r[a+1].startsWith("/>")?" ":"";s+=o===V?c+sr:h>=0?(i.push(d),c.slice(0,h)+nt+c.slice(h)+S+u):c+S+(h===-2?a:u)}return[at(r,s+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,o=0;const a=e.length-1,c=this.parts,[d,l]=cr(e,t);if(this.el=X.createElement(d,i),U.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=U.nextNode())!==null&&c.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(const h of n.getAttributeNames())if(h.endsWith(nt)){const f=l[o++],u=n.getAttribute(h).split(S),p=/([.?@])?(.*)/.exec(f);c.push({type:1,index:s,name:p[2],strings:u,ctor:p[1]==="."?lr:p[1]==="?"?dr:p[1]==="@"?ur:ce}),n.removeAttribute(h)}else h.startsWith(S)&&(c.push({type:6,index:s}),n.removeAttribute(h));if(ot.test(n.tagName)){const h=n.textContent.split(S),f=h.length-1;if(f>0){n.textContent=oe?oe.emptyScript:"";for(let u=0;u<f;u++)n.append(h[u],G()),U.nextNode(),c.push({type:2,index:++s});n.append(h[f],G())}}}else if(n.nodeType===8)if(n.data===st)c.push({type:2,index:s});else{let h=-1;for(;(h=n.data.indexOf(S,h+1))!==-1;)c.push({type:7,index:s}),h+=S.length-1}s++}}static createElement(e,t){const i=L.createElement("template");return i.innerHTML=e,i}}function F(r,e,t=r,i){if(e===k)return e;let n=i!==void 0?t._$Co?.[i]:t._$Cl;const s=J(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(r),n._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=n:t._$Cl=n),n!==void 0&&(e=F(r,n._$AS(r,e.values),n,i)),e}class hr{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??L).importNode(t,!0);U.currentNode=n;let s=U.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new Q(s,s.nextSibling,this,e):c.type===1?d=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(d=new fr(s,this,e)),this._$AV.push(d),c=i[++a]}o!==c?.index&&(s=U.nextNode(),o++)}return U.currentNode=L,n}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),J(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):or(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&J(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=X.createElement(at(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const s=new hr(n,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=Be.get(e.strings);return t===void 0&&Be.set(e.strings,t=new X(e)),t}k(e){ye(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new Q(this.O(G()),this.O(G()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ce{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,t=this,i,n){const s=this.strings;let o=!1;if(s===void 0)e=F(this,e,t,0),o=!J(e)||e!==this._$AH&&e!==k,o&&(this._$AH=e);else{const a=e;let c,d;for(e=s[0],c=0;c<s.length-1;c++)d=F(this,a[i+c],t,c),d===k&&(d=this._$AH[c]),o||=!J(d)||d!==this._$AH[c],d===g?e=g:e!==g&&(e+=(d??"")+s[c+1]),this._$AH[c]=d}o&&!n&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class lr extends ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class dr extends ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class ur extends ce{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=F(this,e,t,0)??g)===k)return;const i=this._$AH,n=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==g&&(i===g||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class fr{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const pr=ve.litHtmlPolyfillSupport;pr?.(X,Q),(ve.litHtmlVersions??=[]).push("3.3.1");const mr=(r,e,t)=>{const i=t?.renderBefore??e;let n=i._$litPart$;if(n===void 0){const s=t?.renderBefore??null;i._$litPart$=n=new Q(e.insertBefore(G(),s),s,void 0,t??{})}return n._$AI(r),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=globalThis;class I extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=mr(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}}I._$litElement$=!0,I.finalized=!0,_e.litElementHydrateSupport?.({LitElement:I});const gr=_e.litElementPolyfillSupport;gr?.({LitElement:I});(_e.litElementVersions??=[]).push("4.2.1");class vr extends I{static get properties(){return{url:{type:String},method:{type:String}}}firstUpdated(){this.getData()}_sendData(e){this.dispatchEvent(new CustomEvent("send-data",{detail:{data:e},bubbles:!0,composed:!0}))}getData(){console.log(this.url),fetch(this.url,{method:this.method}).then(e=>e.ok?e.json():Promise.reject(e)).then(e=>{this._sendData(e)}).catch(e=>{console.warn("Error fetching data:",e)})}}customElements.define("get-data",vr);class yr extends I{static properties={wiki:{type:Array},selectedCharacter:{type:Object},params:{type:Object}};static styles=rt`
    header{
      display: flex;
      justify-content:center;
    }
    .back{
      margin: 10px;
    }
    .container {
      display: flex;
      justify-content: center;
    }
    h1{
      color: white;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

    }

    .card {
      background-color: #A6CCCC;
      border-radius: 30px;
      margin: 10px;
      padding: 20px;
      width: 250px;
      text-align: center;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .card-content img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }

    .card-content h2 {
      font-size: 1.2em;
      margin: 0.5em 0;
    }

    .card-content p {
      margin: 0;
      font-size: 0.9em;
    }

    .hidden {
      display: none;
    }

    .detail {
      width: 30%;
      background: #A6CCCC;
      padding: 20px 10px 30px 10px;
      margin: 10px 10px 30px 10px;
      border-radius: 25px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.5s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

    }
    
    .detail img {
      width: 220px;
      height: 220px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    
    .detail h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #333;
    }
    
    .detail p {
      font-size: 1rem;
      margin: 0.3rem 0;
      color: #555;
      width: 100%;
      text-align: left;
      max-width: 300px;
    }
    
    .detail p strong {
      color: #111;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    button {
      background-color: #7bfd4f;
      border: none;
      border-radius: 2rem;
      padding: 1rem 2.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 20px;
    }

    button:hover {
      background-color: #EBE480;
    }
  `;constructor(){super(),this.wiki=[],this.params={},this.selectedCharacter=null,this.addEventListener("send-data",e=>this._dataFormat(e.detail.data))}async onBeforeEnter(e){const t=e.params.id;this.params=e.params,t&&await this._fetchCharacterById(t)}_dataFormat(e){this.wiki=e.results.map(t=>({id:t.id,name:t.name,species:t.species,status:t.status,image:t.image}))}async _fetchCharacterById(e){const t=await fetch(`https://rickandmortyapi.com/api/character/${e}`);this.selectedCharacter=await t.json()}_goToDetail(e){te.go(`/characters/${e}`)}render(){return ie`
      <get-data url="https://rickandmortyapi.com/api/character" method="GET"></get-data>
      <header>
      <h1>Personajes</h1>
     
    </header>
    <button class="back" @click=${()=>te.go("/")}>< Inicio</button>
      <div class="container">
      <div class="list">
      ${this.selectedCharacter?"":this.wiki.map(e=>ie`
        <div class="card" @click=${()=>this._goToDetail(e.id)}>
          <div class="card-content">
            <img src="${e.image}" alt="${e.name}" />
            <h2>${e.name}</h2>
            <p>Species: ${e.species} | ${e.status}</p>
          </div>
        </div>
      `)}
    </div>

        ${this.selectedCharacter?ie`
        <div class="detail">
          <img src="${this.selectedCharacter.image}" alt="${this.selectedCharacter.name}" />
          <h2>${this.selectedCharacter.name}</h2>
          <p><strong>Species:</strong> ${this.selectedCharacter.species}</p>
          <p><strong>Status:</strong> ${this.selectedCharacter.status}</p>
          <p><strong>Gender:</strong> ${this.selectedCharacter.gender}</p>
          <p><strong>Origin:</strong> ${this.selectedCharacter.origin.name}</p>
          <button @click=${()=>te.go("/characters")}>Volver</button>
        </div>
      `:""}
      </div>
    `}}customElements.define("rick-morty",yr);const _r=new URL("/rick-morty/assets/logoNombre-Dcy-0rbx.svg",import.meta.url).href,$r=new URL("/rick-morty/assets/logoPortal-Dgg2yXM6.png",import.meta.url).href;class wr extends I{static styles=rt`
    header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20vh;
    }
    .logoNombre {
      width: 28rem;
      padding: 2rem;
      margin-top: 2rem;
    }

    .container-main {
      display: flex;
      width: 100%;
      align-items: center;
    }

    aside,
    main {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 1rem;
    }
    .logoPortal {
      width: 30rem;
    }
    p {
      font-size: 1rem;
      text-align: center;
      margin: 0 5rem;
      color: white;
    }
    section {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    button {
      background-color: #7bfd4f;
      border: none;
      border-radius: 2rem;
      padding: 1rem 2.5rem;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #EBE480;
    }
  `;_navigate(e){e.preventDefault(),window.history.pushState({},"","/characters"),window.dispatchEvent(new PopStateEvent("popstate"))}render(){return ie`
      <div class="container">
        <header>
          <img
            class="logoNombre"
            src="${_r}"
            alt="Rick and Morty Portal"
          />
        </header>
        <div class="container-main">
          <aside class="img-portal">
            <img
              class="logoPortal"
              src="${$r}"
              alt="Rick and Morty Portal"
            />
          </aside>
          <main>
            <div>
              <p>
                <b> ¡Bienvenido al Portal de Rick y Morty!<br /></b>
                Aquí comienza tu aventura interdimensional a través del universo
                caótico, hilarante y a veces perturbador de Rick y Morty. Desde
                los personajes más icónicos hasta los episodios más memorables,
                este portal te llevará a través de galaxias lejanas, realidades
                paralelas y dimensiones que desafían toda lógica. Explora cada
                rincón del multiverso: conoce a los cientos de versiones de
                Rick, descubre a Mortys alternativos, revive los mejores
                momentos de la serie y accede a información detallada sobre cada
                episodio, planeta y criatura.
              </p>
              <section>
                <button @click="${this._navigate}">Personajes</button>
              </section>
            </div>
          </main>
        </div>
      </div>
    `}}customElements.define("home-page",wr);const br=document.querySelector("#outlet"),Er=new te(br);Er.setRoutes([{path:"/",component:"home-page"},{path:"/characters",component:"rick-morty"},{path:"/characters/:id",component:"rick-morty"}]);
