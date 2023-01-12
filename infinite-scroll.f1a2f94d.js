!function(){const e={form:document.querySelector(".js-search-form"),list:document.querySelector(".js-gallery"),backdrop:document.querySelector("[data-load]"),spinner:document.querySelector(".js-spinner")};function t(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function n(e,t){return t.get?t.get.call(e):t.value}function r(e,r){return n(e,t(e,r,"get"))}function i(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function s(e,t,n){i(e,t),t.set(e,n)}function o(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}function a(e,n,r){return o(e,t(e,n,"set"),r),r}var l=new WeakMap,c=new WeakMap,h=new WeakMap,u=new WeakMap,d=new WeakMap,p=new WeakMap;function f(e){return e.map((({urls:e,alt_description:t})=>`<li class="gallery__item">\n    <img src="${e.small}" alt="${t}" class="gallery-img">\n</li>`)).join("")}var m,g,v,w,y={};m=y,g="Spinner",v=function(){return M},w=function(e){return M=e},Object.defineProperty(m,g,{get:v,set:w,enumerable:!0,configurable:!0});var b=function(){return b=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},b.apply(this,arguments)},x={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",fadeColor:"transparent",animation:"spinner-line-fade-default",rotate:0,direction:1,speed:1,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:"0 0 1px transparent",position:"absolute"},M=function(){function e(e){void 0===e&&(e={}),this.opts=b(b({},x),e)}return e.prototype.spin=function(e){return this.stop(),this.el=document.createElement("div"),this.el.className=this.opts.className,this.el.setAttribute("role","progressbar"),q(this.el,{position:this.opts.position,width:0,zIndex:this.opts.zIndex,left:this.opts.left,top:this.opts.top,transform:"scale("+this.opts.scale+")"}),e&&e.insertBefore(this.el,e.firstChild||null),function(e,t){var n=Math.round(t.corners*t.width*500)/1e3+"px",r="none";!0===t.shadow?r="0 2px 4px #000":"string"==typeof t.shadow&&(r=t.shadow);for(var i=function(e){for(var t=/^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/,n=[],r=0,i=e.split(",");r<i.length;r++){var s=i[r].match(t);if(null!==s){var o=+s[2],a=+s[5],l=s[4],c=s[7];0!==o||l||(l=c),0!==a||c||(c=l),l===c&&n.push({prefix:s[1]||"",x:o,y:a,xUnits:l,yUnits:c,end:s[8]})}}return n}(r),s=0;s<t.lines;s++){var o=~~(360/t.lines*s+t.rotate),a=q(document.createElement("div"),{position:"absolute",top:-t.width/2+"px",width:t.length+t.width+"px",height:t.width+"px",background:P(t.fadeColor,s),borderRadius:n,transformOrigin:"left",transform:"rotate("+o+"deg) translateX("+t.radius+"px)"}),l=s*t.direction/t.lines/t.speed;l-=1/t.speed;var c=q(document.createElement("div"),{width:"100%",height:"100%",background:P(t.color,s),borderRadius:n,boxShadow:k(i,o),animation:1/t.speed+"s linear "+l+"s infinite "+t.animation});a.appendChild(c),e.appendChild(a)}}(this.el,this.opts),this},e.prototype.stop=function(){return this.el&&("undefined"!=typeof requestAnimationFrame?cancelAnimationFrame(this.animateId):clearTimeout(this.animateId),this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=void 0),this},e}();function q(e,t){for(var n in t)e.style[n]=t[n];return e}function P(e,t){return"string"==typeof e?e:e[t%e.length]}function k(e,t){for(var n=[],r=0,i=e;r<i.length;r++){var s=i[r],o=j(s.x,s.y,t);n.push(s.prefix+o[0]+s.xUnits+" "+o[1]+s.yUnits+s.end)}return n.join(", ")}function j(e,t,n){var r=n*Math.PI/180,i=Math.sin(r),s=Math.cos(r);return[Math.round(1e3*(e*s+t*i))/1e3,Math.round(1e3*(-e*i+t*s))/1e3]}const I=new(0,y.Spinner)({lines:9,length:36,width:17,radius:39,scale:1,corners:1,speed:.8,rotate:42,animation:"spinner-line-fade-quick",direction:1,color:"#1f9336",fadeColor:"transparent",top:"50%",left:"50%",shadow:"0 0 1px transparent",zIndex:2e9,className:"spinner",position:"absolute"}),_=()=>{I.spin(e.spinner),e.backdrop.classList.remove("is-hidden")},E=()=>{I.stop(),e.backdrop.classList.add("is-hidden")},T=new IntersectionObserver((function(t,n){t.forEach((t=>{t.isIntersecting&&(console.log(t.target),n.unobserve(t.target),S.incrementPage(),_(),S.getPhotos().then((({results:t})=>{const r=f(t);e.list.insertAdjacentHTML("beforeend",r);if(S.hasMorePhotos()){const e=document.querySelector(".gallery__item:last-child");n.observe(e)}})).catch((e=>console.log(e))).finally((()=>{E()})))}))}),{root:null,rootMargin:"100px",threshold:1});e.form.addEventListener("submit",(function(t){t.preventDefault();const n=t.currentTarget.elements.query.value;if(!n)return alert("Input any data!");e.list.innerHTML="",S.resetPage(),S.query=n,_(),S.getPhotos().then((({results:t,total:n})=>{if(0===t.length)return alert("Enter normal value");const r=f(t);e.list.insertAdjacentHTML("beforeend",r),S.setTotalPhotos(n);if(S.hasMorePhotos()){const e=document.querySelector(".gallery__item:last-child");T.observe(e)}})).catch((e=>console.log(e))).finally((()=>{E()}))}));const S=new class{getPhotos(){return fetch(`${r(this,l)}?client_id=${r(this,c)}&page=${r(this,u)}&query=${r(this,h)}&per_page=${r(this,d)}&color=black_and_white&orientation=landscape`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}setTotalPhotos(e){a(this,p,e)}hasMorePhotos(){return r(this,u)<Math.ceil(r(this,p)/r(this,d))}incrementPage(){a(this,u,r(this,u)+1)}resetPage(){a(this,u,1)}get query(){return r(this,h)}set query(e){a(this,h,e)}constructor(){s(this,l,{writable:!0,value:"https://api.unsplash.com/search/photos"}),s(this,c,{writable:!0,value:"LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc"}),s(this,h,{writable:!0,value:""}),s(this,u,{writable:!0,value:1}),s(this,d,{writable:!0,value:15}),s(this,p,{writable:!0,value:0})}}}();
//# sourceMappingURL=infinite-scroll.f1a2f94d.js.map
