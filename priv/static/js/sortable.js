!function(a){"use strict";"function"==typeof define&&define.amd?define(a):"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=a():window.Sortable=a()}(function(){"use strict";function a(a,c){this.el=a,this.options=c=c||{};var d={group:Math.random(),store:null,handle:null,draggable:a.children[0]&&a.children[0].nodeName||(/[uo]l/i.test(a.nodeName)?"li":"*"),ghostClass:"sortable-ghost",ignore:"a, img",filter:null};for(var f in d)c[f]=c[f]||d[f];F.forEach(function(d){c[d]=b(this,c[d]||G),e(a,d.substr(2).toLowerCase(),c[d])},this),a[x]=c.group;for(var g in this)"_"===g.charAt(0)&&(this[g]=b(this,this[g]));e(a,"mousedown",this._onTapStart),e(a,"touchstart",this._onTapStart),B&&e(a,"selectstart",this._onTapStart),e(a,"dragover",this._onDragOver),e(a,"dragenter",this._onDragOver),I.push(this._onDragOver),c.store&&this.sort(c.store.get(this))}function b(a,b){var c=H.call(arguments,2);return b.bind?b.bind.apply(b,[a].concat(c)):function(){return b.apply(a,c.concat(H.call(arguments)))}}function c(a,b,c){if("*"===b)return a;if(a){c=c||z,b=b.split(".");var d=b.shift().toUpperCase(),e=new RegExp("\\s("+b.join("|")+")\\s","g");do if(!(""!==d&&a.nodeName!=d||b.length&&((" "+a.className+" ").match(e)||[]).length!=b.length))return a;while(a!==c&&(a=a.parentNode))}return null}function d(a){a.dataTransfer.dropEffect="move",a.preventDefault()}function e(a,b,c){a.addEventListener(b,c,!1)}function f(a,b,c){a.removeEventListener(b,c,!1)}function g(a,b,c){if(a)if(a.classList)a.classList[c?"add":"remove"](b);else{var d=(" "+a.className+" ").replace(/\s+/g," ").replace(" "+b+" ","");a.className=d+(c?" "+b:"")}}function h(a,b,c){if(a&&a.style){if(void 0===c)return z.defaultView&&z.defaultView.getComputedStyle?c=z.defaultView.getComputedStyle(a,""):a.currentStyle&&(c=a.currentStyle),void 0===b?c:c[b];a.style[b]=c+("string"==typeof c?"":"px")}}function i(a,b,c){if(a){var d=a.getElementsByTagName(b),e=0,f=d.length;if(c)for(;f>e;e++)c(d[e],e);return d}return[]}function j(a){return a.draggable=!1}function k(){C=!1}function l(a,b){var c=a.lastElementChild.getBoundingClientRect();return b.clientY-(c.top+c.height)>5}function m(a){for(var b=a.tagName+a.className+a.src+a.href+a.textContent,c=b.length,d=0;c--;)d+=b.charCodeAt(c);return d.toString(36)}var n,o,p,q,r,s,t,u,v,w,x="Sortable"+(new Date).getTime(),y=window,z=y.document,A=y.parseInt,B=!!z.createElement("div").dragDrop,C=!1,D=function(a,b){var c=z.createEvent("Event");return c.initEvent(a,!0,!0),c.item=b,c},E=function(a,b,c){a.dispatchEvent(D(b,c||a))},F="onAdd onUpdate onRemove onStart onEnd onFilter".split(" "),G=function(){},H=[].slice,I=[];return a.prototype={constructor:a,_applyEffects:function(){g(n,this.options.ghostClass,!0)},_onTapStart:function(a){var b=a.touches&&a.touches[0],f=(b||a).target,g=this.options,h=this.el,k=g.filter;if("mousedown"!==a.type||0===a.button){if("function"==typeof k){if(k.call(this,f,this))return E(h,"filter",f),void 0}else if(k&&(k=k.split(",").filter(function(a){return c(f,a.trim(),h)}),k.length))return E(h,"filter",f),void 0;if(g.handle&&(f=c(f,g.handle,h)),f=c(f,g.draggable,h),f&&"selectstart"==a.type&&"A"!=f.tagName&&"IMG"!=f.tagName&&f.dragDrop(),f&&!n&&f.parentNode===h){v=a,p=this.el,n=f,q=n.nextSibling,u=this.options.group,n.draggable=!0,g.ignore.split(",").forEach(function(a){i(f,a.trim(),j)}),b&&(v={target:f,clientX:b.clientX,clientY:b.clientY},this._onDragStart(v,!0),a.preventDefault()),e(z,"mouseup",this._onDrop),e(z,"touchend",this._onDrop),e(z,"touchcancel",this._onDrop),e(this.el,"dragstart",this._onDragStart),e(this.el,"dragend",this._onDrop),e(z,"dragover",d);try{z.selection?z.selection.empty():window.getSelection().removeAllRanges()}catch(l){}E(n,"start")}}},_emulateDragOver:function(){if(w){h(o,"display","none");var a=z.elementFromPoint(w.clientX,w.clientY),b=a,c=this.options.group,d=I.length;if(b)do{if(b[x]===c){for(;d--;)I[d]({clientX:w.clientX,clientY:w.clientY,target:a,rootEl:b});break}a=b}while(b=b.parentNode);h(o,"display","")}},_onTouchMove:function(a){if(v){var b=a.touches[0],c=b.clientX-v.clientX,d=b.clientY-v.clientY,e="translate3d("+c+"px,"+d+"px,0)";w=b,h(o,"webkitTransform",e),h(o,"mozTransform",e),h(o,"msTransform",e),h(o,"transform",e),a.preventDefault()}},_onDragStart:function(a,b){var c=a.dataTransfer;if(this._offUpEvents(),b){var d,f=n.getBoundingClientRect(),g=h(n);o=n.cloneNode(!0),h(o,"top",f.top-A(g.marginTop,10)),h(o,"left",f.left-A(g.marginLeft,10)),h(o,"width",f.width),h(o,"height",f.height),h(o,"opacity","0.8"),h(o,"position","fixed"),h(o,"zIndex","100000"),p.appendChild(o),d=o.getBoundingClientRect(),h(o,"width",2*f.width-d.width),h(o,"height",2*f.height-d.height),e(z,"touchmove",this._onTouchMove),e(z,"touchend",this._onDrop),e(z,"touchcancel",this._onDrop),this._loopId=setInterval(this._emulateDragOver,150)}else c.effectAllowed="move",c.setData("Text",n.textContent),e(z,"drop",this._onDrop);setTimeout(this._applyEffects)},_onDragOver:function(a){if(!C&&u===this.options.group&&(void 0===a.rootEl||a.rootEl===this.el)){var b=this.el,d=c(a.target,this.options.draggable,b);if(0===b.children.length||b.children[0]===o||b===a.target&&l(b,a))b.appendChild(n);else if(d&&d!==n&&void 0!==d.parentNode[x]){r!==d&&(r=d,s=h(d),t=d.getBoundingClientRect());var e,f=t,g=f.right-f.left,i=f.bottom-f.top,j=/left|right|inline/.test(s.cssFloat+s.display),m=d.offsetWidth>n.offsetWidth,p=d.offsetHeight>n.offsetHeight,q=(j?(a.clientX-f.left)/g:(a.clientY-f.top)/i)>.5,v=d.nextElementSibling;C=!0,setTimeout(k,30),e=j?d.previousElementSibling===n&&!m||q&&m:v!==n&&!p||q&&p,e&&!v?b.appendChild(n):d.parentNode.insertBefore(n,e?v:d)}}},_offUpEvents:function(){f(z,"mouseup",this._onDrop),f(z,"touchmove",this._onTouchMove),f(z,"touchend",this._onDrop),f(z,"touchcancel",this._onDrop)},_onDrop:function(a){clearInterval(this._loopId),f(z,"drop",this._onDrop),f(z,"dragover",d),f(this.el,"dragend",this._onDrop),f(this.el,"dragstart",this._onDragStart),f(this.el,"selectstart",this._onTapStart),this._offUpEvents(),a&&(a.preventDefault(),a.stopPropagation(),o&&o.parentNode.removeChild(o),n&&(j(n),g(n,this.options.ghostClass,!1),p.contains(n)?n.nextSibling!==q&&E(n,"update"):(E(p,"remove",n),E(n,"add")),E(n,"end")),p=n=o=q=v=w=r=s=u=null,this.options.store&&this.options.store.set(this))},toArray:function(){for(var a,b=[],d=this.el.children,e=0,f=d.length;f>e;e++)a=d[e],c(a,this.options.draggable,this.el)&&b.push(a.getAttribute("data-id")||m(a));return b},sort:function(a){var b={},d=this.el;this.toArray().forEach(function(a,e){var f=d.children[e];c(f,this.options.draggable,d)&&(b[a]=f)},this),a.forEach(function(a){b[a]&&(d.removeChild(b[a]),d.appendChild(b[a]))})},closest:function(a,b){return c(a,b||this.options.draggable,this.el)},destroy:function(){var a=this.el,b=this.options;F.forEach(function(c){f(a,c.substr(2).toLowerCase(),b[c])}),f(a,"mousedown",this._onTapStart),f(a,"touchstart",this._onTapStart),f(a,"selectstart",this._onTapStart),f(a,"dragover",this._onDragOver),f(a,"dragenter",this._onDragOver),Array.prototype.forEach.call(a.querySelectorAll("[draggable]"),function(a){a.removeAttribute("draggable")}),I.splice(I.indexOf(this._onDragOver),1),this._onDrop(),this.el=null}},a.utils={on:e,off:f,css:h,find:i,bind:b,closest:c,toggleClass:g,createEvent:D,dispatchEvent:E},a.version="0.5.2",a});
