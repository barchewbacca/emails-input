!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);var i;n(0);function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(t){t[t.BACKSPACE=8]="BACKSPACE",t[t.TAB=9]="TAB",t[t.ENTER=13]="ENTER",t[t.COMMA=188]="COMMA"}(i||(i={}));var a=/^\S+@\S+\.\S+$/,u=function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._containerNode=e,r(this,"componentNode",void 0),r(this,"_input",void 0),r(this,"_entityList",[]),r(this,"_addCallback",void 0),r(this,"_removeCallback",void 0),r(this,"_handleKeydown",function(t){switch(t.keyCode||t.which){case i.ENTER:case i.COMMA:case i.ENTER:t.preventDefault(),n.addEntity(n._input.value);break;case i.TAB:var e=n._input.value;if(""===e)return;t.preventDefault(),n.addEntity(e);break;case i.BACKSPACE:var o=n._entityList[n._entityList.length-1];""===n._input.value&&o&&(t.preventDefault(),n.removeEntity(o))}}),this._renderComponent(),this._addEventListeners()}var e,n,u;return e=t,(n=[{key:"_renderComponent",value:function(){var e,n,i=this;this.componentNode=this._createElement("div",t.COMPONENT_CLASSNAME),this.componentNode.tabIndex=0,this._input=this._createElement("input",t.INPUT_CLASSNAME),Array.prototype.slice.call(this._containerNode.attributes).filter(function(t){return"data-component"!==t.name}).forEach(function(t){return i._input.setAttribute(t.name,t.value)}),this.componentNode.appendChild(this._input),null===(e=this._containerNode)||void 0===e||null===(n=e.parentNode)||void 0===n||n.replaceChild(this.componentNode,this._containerNode)}},{key:"_createElement",value:function(t,e,n){var i=document.createElement(t);return i.className=e,n&&(i.textContent=n),i}},{key:"_addEventListeners",value:function(){var e=this;this.componentNode.addEventListener("focus",function(){e._input.focus(),e.componentNode.classList.add(t.FOCUSED_CLASSNAME)}),this._input.addEventListener("focus",function(){return e.componentNode.classList.add(t.FOCUSED_CLASSNAME)}),this._input.addEventListener("blur",function(){e.addEntity(e._input.value),e.componentNode.classList.remove(t.FOCUSED_CLASSNAME)}),this._input.addEventListener("paste",function(){return setTimeout(function(){return e._input.value.split(",").forEach(function(t){return e.addEntity(t.trim())})},0)}),this._input.addEventListener("keydown",this._handleKeydown)}},{key:"addEntity",value:function(e){var n,i=this;if(""!==e&&!this._entityList.some(function(t){return t===e})){var o=this._createElement("button",t.REMOVE_BUTTON_CLASSNAME);o.innerHTML='<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" /></svg>',o.addEventListener("click",function(){return i.removeEntity(e)});var r=a.test(e),u=t.ENTITY_CLASSNAME;r||(u+=" ".concat(t.INVALID_CLASSNAME));var c=this._createElement("div",u,e);c.appendChild(o),this.componentNode.insertBefore(c,this._input),this._entityList.push(e),this._input.value="",null===(n=this._addCallback)||void 0===n||n.call(this,e)}}},{key:"removeEntity",value:function(e){var n,i=Array.prototype.slice.call(this.componentNode.querySelectorAll(".".concat(t.ENTITY_CLASSNAME))).filter(function(t){return t.textContent===e})[0];this.componentNode.removeChild(i),this._entityList=this._entityList.filter(function(t){return t!==e}),null===(n=this._removeCallback)||void 0===n||n.call(this,e)}},{key:"getEntities",value:function(){return this._entityList}},{key:"replaceAll",value:function(t){var e=this;this._entityList.forEach(function(t){return e.removeEntity(t)}),t.forEach(function(t){return e.addEntity(t.trim())})}},{key:"onEntityAdded",value:function(t){this._addCallback=function(e){return t(e)}}},{key:"onEntityRemoved",value:function(t){this._removeCallback=function(e){return t(e)}}}])&&o(e.prototype,n),u&&o(e,u),t}();r(u,"COMPONENT_CLASSNAME","emails-input"),r(u,"INPUT_CLASSNAME","emails-input__input"),r(u,"ENTITY_CLASSNAME","emails-input__entity"),r(u,"REMOVE_BUTTON_CLASSNAME","emails-input__entity-btn"),r(u,"FOCUSED_CLASSNAME","is-focused"),r(u,"INVALID_CLASSNAME","is-invalid");var c=new u(document.querySelector('[data-component="emails-input"]')),l=document.querySelector('[data-component="add-random"]'),s=["kawasaki@outlook.com","scarlet@msn.com","kmself@gmail.com","frederic@aol.com","stecoop@yahoo.com","rfoley@aol.com","mthurn@msn.com","gastown@att.net","jrifkin@icloud.com","smcnabb@optonline.net","avalon@msn.com","draper@live.com"],d=[].concat(s);null==l||l.addEventListener("click",function(){var t=s[Math.floor(Math.random()*s.length)];t?(c.addEntity(t),s=s.filter(function(e){return e!==t})):alert("No random emails left!")});var f=document.querySelector('[data-component="get-valid-count"]');null==f||f.addEventListener("click",function(){return alert("Valid emails count: ".concat(c.componentNode.querySelectorAll(".emails-input__entity:not(.is-invalid)").length))});var v=document.querySelector('[data-component="replace-all"]');null==v||v.addEventListener("click",function(){return c.replaceAll(d)}),c.onEntityAdded(function(t){return console.log("Added:",t)}),c.onEntityRemoved(function(t){return console.log("Removed:",t)})}]);
//# sourceMappingURL=main.js.map