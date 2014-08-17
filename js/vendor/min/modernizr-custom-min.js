window.Modernizr=function(e,t,n){function r(e){v.cssText=e}function o(e,t){return r(prefixes.join(e+";")+(t||""))}function a(e,t){return typeof e===t}function i(e,t){return!!~(""+e).indexOf(t)}function c(e,t){for(var r in e){var o=e[r];if(!i(o,"-")&&v[o]!==n)return"pfx"==t?o:!0}return!1}function l(e,t,r){for(var o in e){var i=t[e[o]];if(i!==n)return r===!1?e[o]:a(i,"function")?i.bind(r||t):i}return!1}function s(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+b.join(r+" ")+r).split(" ");return a(t,"string")||a(t,"undefined")?c(o,t):(o=(e+" "+w.join(r+" ")+r).split(" "),l(o,t,n))}var u="2.8.3",f={},p=!0,d=t.documentElement,m="modernizr",h=t.createElement(m),v=h.style,g,y={}.toString,E="Webkit Moz O ms",b=E.split(" "),w=E.toLowerCase().split(" "),j={svg:"http://www.w3.org/2000/svg"},C={},S={},x={},T=[],F=T.slice,N,M={}.hasOwnProperty,O;O=a(M,"undefined")||a(M.call,"undefined")?function(e,t){return t in e&&a(e.constructor.prototype[t],"undefined")}:function(e,t){return M.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=F.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var a=new o,i=t.apply(a,n.concat(F.call(arguments)));return Object(i)===i?i:a}return t.apply(e,n.concat(F.call(arguments)))};return r}),C.csstransforms=function(){return!!s("transform")},C.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(r){}return n},C.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==j.svg};for(var P in C)O(C,P)&&(N=P.toLowerCase(),f[N]=C[P](),T.push((f[N]?"":"no-")+N));return f.addTest=function(e,t){if("object"==typeof e)for(var r in e)O(e,r)&&f.addTest(r,e[r]);else{if(e=e.toLowerCase(),f[e]!==n)return f;t="function"==typeof t?t():t,"undefined"!=typeof p&&p&&(d.className+=" "+(t?"":"no-")+e),f[e]=t}return f},r(""),h=g=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=v[e[m]];return t||(t={},h++,e[m]=h,v[h]=t),t}function a(e,n,r){if(n||(n=t),g)return n.createElement(e);r||(r=o(n));var a;return a=r.cache[e]?r.cache[e].cloneNode():p.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!a.canHaveChildren||f.test(e)||a.tagUrn?a:r.frag.appendChild(a)}function i(e,n){if(e||(e=t),g)return e.createDocumentFragment();n=n||o(e);for(var a=n.frag.cloneNode(),i=0,c=r(),l=c.length;l>i;i++)a.createElement(c[i]);return a}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var r=o(e);return y.shivCSS&&!d&&!r.hasCSS&&(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),g||c(e,r),e}var s="3.7.0",u=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,d,m="_html5shiv",h=0,v={},g;!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,g=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){d=!0,g=!0}}();var y={elements:u.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:s,shivCSS:u.shivCSS!==!1,supportsUnknownElements:g,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:l,createElement:a,createDocumentFragment:i};e.html5=y,l(t)}(this,t),f._version=u,f._domPrefixes=w,f._cssomPrefixes=b,f.testProp=function(e){return c([e])},f.testAllProps=s,d.className=d.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(p?" js "+T.join(" "):""),f}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==m.call(e)}function o(e){return"string"==typeof e}function a(){}function i(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function c(){var e=h.shift();v=1,e?e.t?p(function(){("c"==e.t?F.injectCss:F.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),c()):v=0}function l(e,n,r,o,a,l,s){function u(t){if(!m&&i(f.readyState)&&(b.r=m=1,!v&&c(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&p(function(){E.removeChild(f)},50);for(var r in S[n])S[n].hasOwnProperty(r)&&S[n][r].onload()}}var s=s||F.errorTimeout,f=t.createElement(e),m=0,g=0,b={t:r,s:n,e:a,a:l,x:s};1===S[n]&&(g=1,S[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){u.call(this,g)},h.splice(o,0,b),"img"!=e&&(g||2===S[n]?(E.insertBefore(f,y?null:d),p(u,s)):S[n].push(f))}function s(e,t,n,r,a){return v=0,t=t||"j",o(e)?l("c"==t?w:b,e,t,this.i++,n,r,a):(h.splice(this.i++,0,e),1==h.length&&c()),this}function u(){var e=F;return e.loader={load:s,i:0},e}var f=t.documentElement,p=e.setTimeout,d=t.getElementsByTagName("script")[0],m={}.toString,h=[],v=0,g="MozAppearance"in f.style,y=g&&!!t.createRange().compareNode,E=y?f:d.parentNode,f=e.opera&&"[object Opera]"==m.call(e.opera),f=!!t.attachEvent&&!f,b=g?"object":f?"script":"img",w=f?"script":b,j=Array.isArray||function(e){return"[object Array]"==m.call(e)},C=[],S={},x={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}},T,F;F=function(e){function t(e){var e=e.split("!"),t=C.length,n=e.pop(),r=e.length,n={url:n,origUrl:n,prefixes:e},o,a,i;for(a=0;r>a;a++)i=e[a].split("="),(o=x[i.shift()])&&(n=o(n,i));for(a=0;t>a;a++)n=C[a](n);return n}function i(e,o,a,i,c){var l=t(e),s=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=r(o)?o:o[e]||o[i]||o[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,o,a,i,c):(S[l.url]?l.noexec=!0:S[l.url]=1,a.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(r(o)||r(s))&&a.load(function(){u(),o&&o(l.origUrl,c,i),s&&s(l.origUrl,c,i),S[l.url]=2})))}function c(e,t){function n(e,n){if(e){if(o(e))n||(s=function(){var e=[].slice.call(arguments);u.apply(this,e),f()}),i(e,s,t,0,c);else if(Object(e)===e)for(d in p=function(){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t}(),e)e.hasOwnProperty(d)&&(!n&&!--p&&(r(s)?s=function(){var e=[].slice.call(arguments);u.apply(this,e),f()}:s[d]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),f()}}(u[d])),i(e[d],s,t,d,c))}else!n&&f()}var c=!!e.test,l=e.load||e.both,s=e.callback||a,u=s,f=e.complete||a,p,d;n(c?e.yep:e.nope,!!l),l&&n(l)}var l,s,f=this.yepnope.loader;if(o(e))i(e,0,f,0);else if(j(e))for(l=0;l<e.length;l++)s=e[l],o(s)?i(s,0,f,0):j(s)?F(s):Object(s)===s&&c(s,f);else Object(e)===e&&c(e,f)},F.addPrefix=function(e,t){x[e]=t},F.addFilter=function(e){C.push(e)},F.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",T=function(){t.removeEventListener("DOMContentLoaded",T,0),t.readyState="complete"},0)),e.yepnope=u(),e.yepnope.executeStack=c,e.yepnope.injectJs=function(e,n,r,o,l,s){var u=t.createElement("script"),f,m,o=o||F.errorTimeout;u.src=e;for(m in r)u.setAttribute(m,r[m]);n=s?c:n||a,u.onreadystatechange=u.onload=function(){!f&&i(u.readyState)&&(f=1,n(),u.onload=u.onreadystatechange=null)},p(function(){f||(f=1,n(1))},o),l?u.onload():d.parentNode.insertBefore(u,d)},e.yepnope.injectCss=function(e,n,r,o,i,l){var o=t.createElement("link"),s,n=l?c:n||a;o.href=e,o.rel="stylesheet",o.type="text/css";for(s in r)o.setAttribute(s,r[s]);i||(d.parentNode.insertBefore(o,d),p(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};