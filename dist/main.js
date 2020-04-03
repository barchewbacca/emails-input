!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);var r;n(0);function i(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(t){t[t.BACKSPACE=8]="BACKSPACE",t[t.TAB=9]="TAB",t[t.ENTER=13]="ENTER",t[t.COMMA=188]="COMMA"}(r||(r={}));var c=function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,"containerNode",void 0),u(this,"component",this.createElement("div",t.COMPONENT_CLASSNAME)),u(this,"input",this.createElement("input",t.INPUT_CLASSNAME)),u(this,"entities",[]),u(this,"_addCallback",void 0),u(this,"_removeCallback",void 0),u(this,"handleKeydown",function(t){switch(t.keyCode||t.which){case r.ENTER:case r.COMMA:case r.ENTER:t.preventDefault(),n.addEntity(n.input.value);break;case r.TAB:if(""===n.input.value)return;t.preventDefault(),n.addEntity(n.input.value);break;case r.BACKSPACE:var e=n.entities[n.entities.length-1];""===n.input.value&&e&&(t.preventDefault(),n.removeEntity(e))}}),this.containerNode=e,this.initComponent(),this.addEventListeners()}var e,n,o;return e=t,(n=[{key:"createElement",value:function(t,e,n){var r=document.createElement(t);return r.className=e,n&&(r.textContent=n),r}},{key:"initComponent",value:function(){var t,e,n=this;this.containerNode.getAttributeNames().filter(function(t){return"data-component"!==t}).forEach(function(t){return n.input.setAttribute(t,n.containerNode.getAttribute(t))}),this.component.tabIndex=0,this.component.appendChild(this.input),null===(t=this.containerNode)||void 0===t||null===(e=t.parentNode)||void 0===e||e.replaceChild(this.component,this.containerNode)}},{key:"addEventListeners",value:function(){var t=this;this.component.addEventListener("focus",function(){t.input.focus(),t.component.classList.add("is-focused")}),this.input.addEventListener("focus",function(){return t.component.classList.add("is-focused")}),this.input.addEventListener("blur",function(){t.addEntity(t.input.value),t.component.classList.remove("is-focused")}),this.input.addEventListener("paste",function(){return setTimeout(function(){return t.input.value.split(",").forEach(function(e){return t.addEntity(e.trim())})},0)}),this.input.addEventListener("keydown",this.handleKeydown)}},{key:"addEntity",value:function(e){var n=this;if(""!==e&&!this.entities.some(function(t){return t===e})){var r=/^\S+@\S+\.\S+$/.test(e),i=t.ENTITY_CLASSNAME;r||(i+=" invalid");var o=this.createElement("div",i,e),a=this.createElement("button",t.REMOVE_BUTTON_CLASSNAME);a.innerHTML='<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" /></svg>',a.addEventListener("click",function(){return n.removeEntity(e)}),o.appendChild(a),this.component.insertBefore(o,this.input),this.entities.push(e),this.input.value="",this._addCallback(e)}}},{key:"removeEntity",value:function(e){var n=i(this.component.querySelectorAll(".".concat(t.ENTITY_CLASSNAME))).find(function(t){return t.textContent===e});this.component.removeChild(n),this.entities=this.entities.filter(function(t){return t!==e}),this._removeCallback(e)}},{key:"getEntities",value:function(){return this.entities}},{key:"replaceAll",value:function(t){var e=this;this.entities.forEach(function(t){return e.removeEntity(t)}),t.forEach(function(t){return e.addEntity(t.trim())})}},{key:"onEntityAdded",value:function(t){this._addCallback=function(e){return t(e)}}},{key:"onEntityRemoved",value:function(t){this._removeCallback=function(e){return t(e)}}}])&&a(e.prototype,n),o&&a(e,o),t}();function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}u(c,"COMPONENT_CLASSNAME","emails-input"),u(c,"INPUT_CLASSNAME","emails-input__input"),u(c,"ENTITY_CLASSNAME","emails-input__entity"),u(c,"REMOVE_BUTTON_CLASSNAME","emails-input__entity-btn");var s,d=new c(document.querySelector('[data-component="emails-input"]')),f=document.querySelector('[data-component="add-random"]'),m=["kawasaki@outlook.com","scarlet@msn.com","kmself@gmail.com","frederic@aol.com","stecoop@yahoo.com","rfoley@aol.com","mthurn@msn.com","gastown@att.net","jrifkin@icloud.com","smcnabb@optonline.net","avalon@msn.com","draper@live.com"],p=function(t){if(Array.isArray(t))return l(t)}(s=m)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(s)||function(t,e){if(t){if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();null==f||f.addEventListener("click",function(){var t=m[Math.floor(Math.random()*m.length)];t?(d.addEntity(t),m=m.filter(function(e){return e!==t})):alert("No random emails left!")});var v=document.querySelector('[data-component="get-valid-count"]');null==v||v.addEventListener("click",function(){return alert("Valid emails count: ".concat(d.component.querySelectorAll(".emails-input__entity:not(.invalid)").length))});var h=document.querySelector('[data-component="replace-all"]');null==h||h.addEventListener("click",function(){return d.replaceAll(p)}),d.onEntityAdded(function(t){return console.log("Entity added",t)}),d.onEntityRemoved(function(t){return console.log("Entity removed",t)})}]);
//# sourceMappingURL=main.js.map