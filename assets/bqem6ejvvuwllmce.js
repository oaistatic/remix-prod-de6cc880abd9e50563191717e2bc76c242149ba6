import{r as u,f as It,b as kn,e as En,g as Dt,j as w,M as Q,a8 as Mt}from"./khl8ktun31iepecq.js";import{gp as D,R as tn,hm as on,bQ as je,b as In,dp as Dn,x as Mn,b2 as Pt,V as Pn,ab as Rn,I as Rt,af as rn,aH as Ne,F as Oe,E as Ue,ag as Ft,dC as Lt,hn as Nt,gZ as Ot,ct as Ut,gW as zt,dG as an,bL as Fn,L as Vt,g as sn,a as ee,cH as ge,cX as cn,l as Bt,dn as jt,P as qt,dT as Ht,D as Wt,cm as Gt}from"./haannt40upmuwmtk.js";import{d7 as qe,f as $t,kz as Ln,e_ as Se,i6 as Yt,y as Nn,rb as Kt,rc as Xt,rd as Jt,d as Qt,gN as Zt,eo as On,o as eo,re as no,hJ as to}from"./n4exq6o15ap1g74l.js";import{u as oo}from"./lw7vucdyqf9uqozi.js";import{V as te,i as Un,a as A,P as T,b as q,j as ro,R as io,g as se,u as ao,e as so,m as zn,h as co,T as Ee}from"./e66najub871r0jzn.js";var H=(e=>(e.StateUpdate="state_update",e.ActionRequest="action_request",e.ConversationUpdate="conversation_update",e.RelayMessage="relay_message",e.Unknown="unknown",e.UsageUpdate="usage_update",e.ToolUpdate="tool_update",e.TurnContext="turn_context",e.Performance="performance",e))(H||{}),B=(e=>(e.StartListeningIntently="start_listening",e.StopListeningIntently="stop_listening",e.HaltAllActivity="stop_speaking",e.ResumeListening="resume_listening",e.RelayMessage="relay_message",e))(B||{}),N=(e=>(e.Connecting="connecting",e.Idle="idle",e.Connected="connected",e.Halted="halted",e.Listening="listening",e.ListeningIntently="listening_intently",e.Thinking="thinking",e.Speaking="speaking",e))(N||{}),ze=(e=>(e.Add="add",e.Remove="remove",e))(ze||{});const lo=window.location.origin+"/voice";class Vn{static async getVoiceToken(n,t,o){const r={eventSource:t,voice:n.voice,voice_mode:n.voice_mode??"undefined",voice_session_id:n.voice_session_id},i=performance.now();return D.getToken.request(r),tn.post(`${lo}/get_token`,n,{additionalHeaders:o?{[on.ProofToken]:o}:{}}).then(a=>{const s=performance.now()-i;return D.getToken.success({...r,durationMs:s}),a}).catch(a=>{const s=performance.now()-i;throw D.getToken.failure({...r,durationMs:s,error:a?.message,voice_session_id:n.voice_session_id}),a})}static async getVoiceStatus(n,t){const o={eventSource:t,requested_voice_mode:n.requested_voice_mode??"null"},r=await je.getRequirementsToken();return D.getVoiceStatus.request(o),tn.safePost("/conversation/voice/status",{parameters:{},requestBody:n,additionalHeaders:{[on.ProofToken]:r}}).then(i=>(D.getVoiceStatus.success(o),i)).catch(i=>{throw D.getVoiceStatus.failure({...o,error:i?.message}),i})}}class uo{logger=te.createChild("VoiceTurnContext");publish=async()=>{throw new Error("VoiceTurnContext does not have a set publisher.")};store=In(Dn(Mn(()=>({parts:{},attachments:{}}))));useState(n){return this.store(n||(t=>t))}setPublisher(n){this.publish=n}async add({parts:n,attachments:t}){if(!n&&!t)return;let o={},r={};t&&(o=Object.fromEntries(t.map(a=>[this.makeId("attachment"),a]))),n&&(r=Object.fromEntries(n.map(a=>[this.makeId("part"),a])));const i={type:H.TurnContext,payload:{type:H.TurnContext,action:ze.Add,attachments:o,parts:r}};await this.publish(i),this.store.setState(a=>{a.parts=Object.assign(a.parts,r),a.attachments=Object.assign(a.attachments,o)}),this.logger.info("Added",{payload:i})}async remove({parts:n,attachments:t}){if(!n&&!t)return;this.logger.info("Removing turn context attachment",{parts:n,attachments:t});let o={},r={};const i=this.store.getState();t&&t.forEach(s=>{i.attachments[s]&&(o[s]=i.attachments[s])}),n&&n.forEach(s=>{i.parts[s]&&(r[s]=i.parts[s])});const a={type:H.TurnContext,payload:{type:H.TurnContext,action:ze.Remove,attachments:o,parts:r}};this.publish(a),this.store.setState(s=>{Object.keys(r).forEach(c=>{delete s.parts[c]}),Object.keys(o).forEach(c=>{delete s.attachments[c]})}),this.logger.info("Removed",{payload:a})}async clear(){this.store.setState(n=>{n.parts={},n.attachments={}}),this.logger.info("Cleared")}makeId(n){return`client:${n?`${n}:`:""}${Date.now()}-${Math.random().toString(36).substring(2,15)}`}}const He={conversationId:null,voiceSessionId:null,isActivityHalted:!1,isVoiceModeActive:!1,video:null,screenshare:null,dev:{room:null},credentials:{token:null,url:null,e2eeKey:null},server:{actions:null,connectionState:null,remoteState:null,messages:[],usage:null,toolUpdate:null,voiceConnectionQuality:null,turnContext:new uo},disconnectPending:void 0,showVoicePicker:!1,showNuxFullPage:!1},fo=e=>In(Dn(Mn(()=>He))),po=fo(),vo=u.createContext(null);function U(){return u.useContext(vo)??po}function j(e){return U()(e)}function ho(){return j(e=>!!(e.credentials.token&&e.credentials.url&&e.credentials.e2eeKey&&e.server.remoteState))}function mo(){return U()(n=>n.voiceStatus)}function go(){const{voiceName:e}=qe(),n=U();return async function(t,o){const r=await Vn.getVoiceStatus({...t,timezone_offset_min:new Date().getTimezoneOffset(),nonce:Pt(),voice:t.voice??e},o);return r?.chatreq&&je.startEnforcement(r?.chatreq),n.setState({voiceStatus:r}),r}}function Zi(){const[e,n]=u.useState(!1),t=U(),o=u.useCallback(async()=>{n(!0);const r=t.getState().dev.room;if(r){const i=r.localParticipant.isMicrophoneEnabled,a=i?"mute":"unmute";D.toggleMuteButton.click({toggleTo:a});try{await r.localParticipant.setMicrophoneEnabled(!i)}finally{n(!1)}}},[t]);return{isMuting:e,toggleMute:o}}function Ie(e,n){if(e){const{credentials:t,conversationId:o,voiceSessionId:r,voiceMode:i}=e;te.debug("setting credentials",e),n.setState(a=>{a.conversationId=o,a.credentials=t,a.voiceSessionId=r,a.voiceMode=i});return}te.debug("clearing credentials"),Bn(n)}function bo(){const e=j(i=>i.video!=null),n=j(i=>i.video==="starting"),t=U(),o=u.useCallback(i=>{t.setState(a=>{const s=a.video?"off":"on";D.toggleVideoButton.click({eventSource:i,toggleTo:s}),a.video?a.video=null:(a.screenshare&&(a.screenshare=null),a.video="starting")})},[t]),r=u.useCallback(i=>{t.setState(a=>{i?a.video="enabled":a.video=null})},[t]);return{isVideoEnabled:e,isStartingVideo:n,endStartingVideo:r,toggleVideo:o}}function yo(){const e=j(i=>i.screenshare!=null),n=j(i=>i.screenshare==="starting"),t=U(),o=u.useCallback(i=>{t.setState(a=>{const s=a.screenshare?"off":"on";D.toggleScreenShareButton.click({eventSource:i,toggleTo:s}),a.screenshare?a.screenshare=null:(a.video&&(a.video=null),a.screenshare="starting")})},[t]),r=u.useCallback(i=>{t.setState(a=>{i?a.screenshare="enabled":a.screenshare=null})},[t]);return{isScreenshareEnabled:e,isScreenshareStarting:n,toggleScreenShare:o,endStartingScreenshare:r}}function Bn(e){e.setState(n=>({...He,isVoiceModeActive:n.isVoiceModeActive}))}function So(e){const n=e.default_voice_mode,t=e.modes.find(o=>o.mode===n);if(!t)throw new Error("Voice status returned a default_voice_mode that does not exist in the modes array");return t}const wo=()=>{const e=Pn(),n=U(),t=u.useCallback(()=>n.getState().isVoiceModeActive,[n]);return u.useMemo(()=>new Proxy(e,{get(o,r){const i=o[r];return t()||r==="closeAll"?i:()=>{}}}),[t,e])};function jn(){const e=mo();if(!e)return{video:!1,screenshare:!1};const n=So(e);return{video:n?.features?.video??!1,screenshare:n?.features?.screen_sharing??!1}}var xo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Co(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var qn={exports:{}};(function(e){(function(n,t){e.exports?e.exports=t():n.log=t()})(xo,function(){var n=function(){},t="undefined",o=typeof window!==t&&typeof window.navigator!==t&&/Trident\/|MSIE /.test(window.navigator.userAgent),r=["trace","debug","info","warn","error"],i={},a=null;function s(p,g){var v=p[g];if(typeof v.bind=="function")return v.bind(p);try{return Function.prototype.bind.call(v,p)}catch{return function(){return Function.prototype.apply.apply(v,[p,arguments])}}}function c(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function l(p){return p==="debug"&&(p="log"),typeof console===t?!1:p==="trace"&&o?c:console[p]!==void 0?s(console,p):console.log!==void 0?s(console,"log"):n}function f(){for(var p=this.getLevel(),g=0;g<r.length;g++){var v=r[g];this[v]=g<p?n:this.methodFactory(v,p,this.name)}if(this.log=this.debug,typeof console===t&&p<this.levels.SILENT)return"No console available for logging"}function m(p){return function(){typeof console!==t&&(f.call(this),this[p].apply(this,arguments))}}function b(p,g,v){return l(p)||m.apply(this,arguments)}function d(p,g){var v=this,y,S,_,x="loglevel";typeof p=="string"?x+=":"+p:typeof p=="symbol"&&(x=void 0);function k(E){var M=(r[E]||"silent").toUpperCase();if(!(typeof window===t||!x)){try{window.localStorage[x]=M;return}catch{}try{window.document.cookie=encodeURIComponent(x)+"="+M+";"}catch{}}}function C(){var E;if(!(typeof window===t||!x)){try{E=window.localStorage[x]}catch{}if(typeof E===t)try{var M=window.document.cookie,Y=encodeURIComponent(x),W=M.indexOf(Y+"=");W!==-1&&(E=/^([^;]+)/.exec(M.slice(W+Y.length+1))[1])}catch{}return v.levels[E]===void 0&&(E=void 0),E}}function I(){if(!(typeof window===t||!x)){try{window.localStorage.removeItem(x)}catch{}try{window.document.cookie=encodeURIComponent(x)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch{}}}function O(E){var M=E;if(typeof M=="string"&&v.levels[M.toUpperCase()]!==void 0&&(M=v.levels[M.toUpperCase()]),typeof M=="number"&&M>=0&&M<=v.levels.SILENT)return M;throw new TypeError("log.setLevel() called with invalid level: "+E)}v.name=p,v.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},v.methodFactory=g||b,v.getLevel=function(){return _??S??y},v.setLevel=function(E,M){return _=O(E),M!==!1&&k(_),f.call(v)},v.setDefaultLevel=function(E){S=O(E),C()||v.setLevel(E,!1)},v.resetLevel=function(){_=null,I(),f.call(v)},v.enableAll=function(E){v.setLevel(v.levels.TRACE,E)},v.disableAll=function(E){v.setLevel(v.levels.SILENT,E)},v.rebuild=function(){if(a!==v&&(y=O(a.getLevel())),f.call(v),a===v)for(var E in i)i[E].rebuild()},y=O(a?a.getLevel():"WARN");var L=C();L!=null&&(_=O(L)),f.call(v)}a=new d,a.getLogger=function(p){if(typeof p!="symbol"&&typeof p!="string"||p==="")throw new TypeError("You must supply a name when creating a logger.");var g=i[p];return g||(g=i[p]=new d(p,a.methodFactory)),g};var h=typeof window!==t?window.log:void 0;return a.noConflict=function(){return typeof window!==t&&window.log===a&&(window.log=h),a},a.getLoggers=function(){return i},a.default=a,a})})(qn);var Ao=qn.exports;const To=Co(Ao);var Ve=function(e,n){return Ve=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])},Ve(e,n)};function $(e,n){if(typeof n!="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");Ve(e,n);function t(){this.constructor=e}e.prototype=n===null?Object.create(n):(t.prototype=n.prototype,new t)}function _o(e,n,t,o){function r(i){return i instanceof t?i:new t(function(a){a(i)})}return new(t||(t=Promise))(function(i,a){function s(f){try{l(o.next(f))}catch(m){a(m)}}function c(f){try{l(o.throw(f))}catch(m){a(m)}}function l(f){f.done?i(f.value):r(f.value).then(s,c)}l((o=o.apply(e,[])).next())})}function Hn(e,n){var t={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},o,r,i,a=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return a.next=s(0),a.throw=s(1),a.return=s(2),typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(l){return function(f){return c([l,f])}}function c(l){if(o)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(t=0)),t;)try{if(o=1,r&&(i=l[0]&2?r.return:l[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,l[1])).done)return i;switch(r=0,i&&(l=[l[0]&2,i.value]),l[0]){case 0:case 1:i=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(i=t.trys,!(i=i.length>0&&i[i.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!i||l[1]>i[0]&&l[1]<i[3])){t.label=l[1];break}if(l[0]===6&&t.label<i[1]){t.label=i[1],i=l;break}if(i&&t.label<i[2]){t.label=i[2],t.ops.push(l);break}i[2]&&t.ops.pop(),t.trys.pop();continue}l=n.call(e,t)}catch(f){l=[6,f],r=0}finally{o=i=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function oe(e){var n=typeof Symbol=="function"&&Symbol.iterator,t=n&&e[n],o=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function we(e,n){var t=typeof Symbol=="function"&&e[Symbol.iterator];if(!t)return e;var o=t.call(e),r,i=[],a;try{for(;(n===void 0||n-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(s){a={error:s}}finally{try{r&&!r.done&&(t=o.return)&&t.call(o)}finally{if(a)throw a.error}}return i}function xe(e,n,t){if(arguments.length===2)for(var o=0,r=n.length,i;o<r;o++)(i||!(o in n))&&(i||(i=Array.prototype.slice.call(n,0,o)),i[o]=n[o]);return e.concat(i||Array.prototype.slice.call(n))}function ne(e){return this instanceof ne?(this.v=e,this):new ne(e)}function ko(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=t.apply(e,n||[]),r,i=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",a),r[Symbol.asyncIterator]=function(){return this},r;function a(d){return function(h){return Promise.resolve(h).then(d,m)}}function s(d,h){o[d]&&(r[d]=function(p){return new Promise(function(g,v){i.push([d,p,g,v])>1||c(d,p)})},h&&(r[d]=h(r[d])))}function c(d,h){try{l(o[d](h))}catch(p){b(i[0][3],p)}}function l(d){d.value instanceof ne?Promise.resolve(d.value.v).then(f,m):b(i[0][2],d)}function f(d){c("next",d)}function m(d){c("throw",d)}function b(d,h){d(h),i.shift(),i.length&&c(i[0][0],i[0][1])}}function Eo(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e[Symbol.asyncIterator],t;return n?n.call(e):(e=typeof oe=="function"?oe(e):e[Symbol.iterator](),t={},o("next"),o("throw"),o("return"),t[Symbol.asyncIterator]=function(){return this},t);function o(i){t[i]=e[i]&&function(a){return new Promise(function(s,c){a=e[i](a),r(s,c,a.done,a.value)})}}function r(i,a,s,c){Promise.resolve(c).then(function(l){i({value:l,done:s})},a)}}function F(e){return typeof e=="function"}function We(e){var n=function(o){Error.call(o),o.stack=new Error().stack},t=e(n);return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var De=We(function(e){return function(n){e(this),this.message=n?n.length+` errors occurred during unsubscription:
`+n.map(function(t,o){return o+1+") "+t.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=n}});function Ce(e,n){if(e){var t=e.indexOf(n);0<=t&&e.splice(t,1)}}var ce=function(){function e(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var n,t,o,r,i;if(!this.closed){this.closed=!0;var a=this._parentage;if(a)if(this._parentage=null,Array.isArray(a))try{for(var s=oe(a),c=s.next();!c.done;c=s.next()){var l=c.value;l.remove(this)}}catch(p){n={error:p}}finally{try{c&&!c.done&&(t=s.return)&&t.call(s)}finally{if(n)throw n.error}}else a.remove(this);var f=this.initialTeardown;if(F(f))try{f()}catch(p){i=p instanceof De?p.errors:[p]}var m=this._finalizers;if(m){this._finalizers=null;try{for(var b=oe(m),d=b.next();!d.done;d=b.next()){var h=d.value;try{ln(h)}catch(p){i=i??[],p instanceof De?i=xe(xe([],we(i)),we(p.errors)):i.push(p)}}}catch(p){o={error:p}}finally{try{d&&!d.done&&(r=b.return)&&r.call(b)}finally{if(o)throw o.error}}}if(i)throw new De(i)}},e.prototype.add=function(n){var t;if(n&&n!==this)if(this.closed)ln(n);else{if(n instanceof e){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(n)}},e.prototype._hasParent=function(n){var t=this._parentage;return t===n||Array.isArray(t)&&t.includes(n)},e.prototype._addParent=function(n){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n},e.prototype._removeParent=function(n){var t=this._parentage;t===n?this._parentage=null:Array.isArray(t)&&Ce(t,n)},e.prototype.remove=function(n){var t=this._finalizers;t&&Ce(t,n),n instanceof e&&n._removeParent(this)},e.EMPTY=function(){var n=new e;return n.closed=!0,n}(),e}(),Wn=ce.EMPTY;function Gn(e){return e instanceof ce||e&&"closed"in e&&F(e.remove)&&F(e.add)&&F(e.unsubscribe)}function ln(e){F(e)?e():e.unsubscribe()}var $n={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},Io={setTimeout:function(e,n){for(var t=[],o=2;o<arguments.length;o++)t[o-2]=arguments[o];return setTimeout.apply(void 0,xe([e,n],we(t)))},clearTimeout:function(e){return clearTimeout(e)},delegate:void 0};function Yn(e){Io.setTimeout(function(){throw e})}function un(){}function ye(e){e()}var Ge=function(e){$(n,e);function n(t){var o=e.call(this)||this;return o.isStopped=!1,t?(o.destination=t,Gn(t)&&t.add(o)):o.destination=Ro,o}return n.create=function(t,o,r){return new Be(t,o,r)},n.prototype.next=function(t){this.isStopped||this._next(t)},n.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},n.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},n.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},n.prototype._next=function(t){this.destination.next(t)},n.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},n.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},n}(ce),Do=Function.prototype.bind;function Me(e,n){return Do.call(e,n)}var Mo=function(){function e(n){this.partialObserver=n}return e.prototype.next=function(n){var t=this.partialObserver;if(t.next)try{t.next(n)}catch(o){be(o)}},e.prototype.error=function(n){var t=this.partialObserver;if(t.error)try{t.error(n)}catch(o){be(o)}else be(n)},e.prototype.complete=function(){var n=this.partialObserver;if(n.complete)try{n.complete()}catch(t){be(t)}},e}(),Be=function(e){$(n,e);function n(t,o,r){var i=e.call(this)||this,a;if(F(t)||!t)a={next:t??void 0,error:o??void 0,complete:r??void 0};else{var s;i&&$n.useDeprecatedNextContext?(s=Object.create(t),s.unsubscribe=function(){return i.unsubscribe()},a={next:t.next&&Me(t.next,s),error:t.error&&Me(t.error,s),complete:t.complete&&Me(t.complete,s)}):a=t}return i.destination=new Mo(a),i}return n}(Ge);function be(e){Yn(e)}function Po(e){throw e}var Ro={closed:!0,next:un,error:Po,complete:un},$e=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function Kn(e){return e}function Fo(e){return e.length===0?Kn:e.length===1?e[0]:function(n){return e.reduce(function(t,o){return o(t)},n)}}var z=function(){function e(n){n&&(this._subscribe=n)}return e.prototype.lift=function(n){var t=new e;return t.source=this,t.operator=n,t},e.prototype.subscribe=function(n,t,o){var r=this,i=No(n)?n:new Be(n,t,o);return ye(function(){var a=r,s=a.operator,c=a.source;i.add(s?s.call(i,c):c?r._subscribe(i):r._trySubscribe(i))}),i},e.prototype._trySubscribe=function(n){try{return this._subscribe(n)}catch(t){n.error(t)}},e.prototype.forEach=function(n,t){var o=this;return t=dn(t),new t(function(r,i){var a=new Be({next:function(s){try{n(s)}catch(c){i(c),a.unsubscribe()}},error:i,complete:r});o.subscribe(a)})},e.prototype._subscribe=function(n){var t;return(t=this.source)===null||t===void 0?void 0:t.subscribe(n)},e.prototype[$e]=function(){return this},e.prototype.pipe=function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return Fo(n)(this)},e.prototype.toPromise=function(n){var t=this;return n=dn(n),new n(function(o,r){var i;t.subscribe(function(a){return i=a},function(a){return r(a)},function(){return o(i)})})},e.create=function(n){return new e(n)},e}();function dn(e){var n;return(n=e??$n.Promise)!==null&&n!==void 0?n:Promise}function Lo(e){return e&&F(e.next)&&F(e.error)&&F(e.complete)}function No(e){return e&&e instanceof Ge||Lo(e)&&Gn(e)}function Oo(e){return F(e?.lift)}function le(e){return function(n){if(Oo(n))return n.lift(function(t){try{return e(t,this)}catch(o){this.error(o)}});throw new TypeError("Unable to lift unknown Observable type")}}function Ae(e,n,t,o,r){return new Uo(e,n,t,o,r)}var Uo=function(e){$(n,e);function n(t,o,r,i,a,s){var c=e.call(this,t)||this;return c.onFinalize=a,c.shouldUnsubscribe=s,c._next=o?function(l){try{o(l)}catch(f){t.error(f)}}:e.prototype._next,c._error=i?function(l){try{i(l)}catch(f){t.error(f)}finally{this.unsubscribe()}}:e.prototype._error,c._complete=r?function(){try{r()}catch(l){t.error(l)}finally{this.unsubscribe()}}:e.prototype._complete,c}return n.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var o=this.closed;e.prototype.unsubscribe.call(this),!o&&((t=this.onFinalize)===null||t===void 0||t.call(this))}},n}(Ge),zo=We(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Xn=function(e){$(n,e);function n(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return n.prototype.lift=function(t){var o=new fn(this,this);return o.operator=t,o},n.prototype._throwIfClosed=function(){if(this.closed)throw new zo},n.prototype.next=function(t){var o=this;ye(function(){var r,i;if(o._throwIfClosed(),!o.isStopped){o.currentObservers||(o.currentObservers=Array.from(o.observers));try{for(var a=oe(o.currentObservers),s=a.next();!s.done;s=a.next()){var c=s.value;c.next(t)}}catch(l){r={error:l}}finally{try{s&&!s.done&&(i=a.return)&&i.call(a)}finally{if(r)throw r.error}}}})},n.prototype.error=function(t){var o=this;ye(function(){if(o._throwIfClosed(),!o.isStopped){o.hasError=o.isStopped=!0,o.thrownError=t;for(var r=o.observers;r.length;)r.shift().error(t)}})},n.prototype.complete=function(){var t=this;ye(function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var o=t.observers;o.length;)o.shift().complete()}})},n.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(n.prototype,"observed",{get:function(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0},enumerable:!1,configurable:!0}),n.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},n.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},n.prototype._innerSubscribe=function(t){var o=this,r=this,i=r.hasError,a=r.isStopped,s=r.observers;return i||a?Wn:(this.currentObservers=null,s.push(t),new ce(function(){o.currentObservers=null,Ce(s,t)}))},n.prototype._checkFinalizedStatuses=function(t){var o=this,r=o.hasError,i=o.thrownError,a=o.isStopped;r?t.error(i):a&&t.complete()},n.prototype.asObservable=function(){var t=new z;return t.source=this,t},n.create=function(t,o){return new fn(t,o)},n}(z),fn=function(e){$(n,e);function n(t,o){var r=e.call(this)||this;return r.destination=t,r.source=o,r}return n.prototype.next=function(t){var o,r;(r=(o=this.destination)===null||o===void 0?void 0:o.next)===null||r===void 0||r.call(o,t)},n.prototype.error=function(t){var o,r;(r=(o=this.destination)===null||o===void 0?void 0:o.error)===null||r===void 0||r.call(o,t)},n.prototype.complete=function(){var t,o;(o=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||o===void 0||o.call(t)},n.prototype._subscribe=function(t){var o,r;return(r=(o=this.source)===null||o===void 0?void 0:o.subscribe(t))!==null&&r!==void 0?r:Wn},n}(Xn);(function(e){$(n,e);function n(t){var o=e.call(this)||this;return o._value=t,o}return Object.defineProperty(n.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),n.prototype._subscribe=function(t){var o=e.prototype._subscribe.call(this,t);return!o.closed&&t.next(this._value),o},n.prototype.getValue=function(){var t=this,o=t.hasError,r=t.thrownError,i=t._value;if(o)throw r;return this._throwIfClosed(),i},n.prototype.next=function(t){e.prototype.next.call(this,this._value=t)},n})(Xn);var Vo={now:function(){return Date.now()},delegate:void 0},Bo=function(e){$(n,e);function n(t,o){return e.call(this)||this}return n.prototype.schedule=function(t,o){return this},n}(ce),pn={setInterval:function(e,n){for(var t=[],o=2;o<arguments.length;o++)t[o-2]=arguments[o];return setInterval.apply(void 0,xe([e,n],we(t)))},clearInterval:function(e){return clearInterval(e)},delegate:void 0},jo=function(e){$(n,e);function n(t,o){var r=e.call(this,t,o)||this;return r.scheduler=t,r.work=o,r.pending=!1,r}return n.prototype.schedule=function(t,o){var r;if(o===void 0&&(o=0),this.closed)return this;this.state=t;var i=this.id,a=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(a,i,o)),this.pending=!0,this.delay=o,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(a,this.id,o),this},n.prototype.requestAsyncId=function(t,o,r){return r===void 0&&(r=0),pn.setInterval(t.flush.bind(t,this),r)},n.prototype.recycleAsyncId=function(t,o,r){if(r===void 0&&(r=0),r!=null&&this.delay===r&&this.pending===!1)return o;o!=null&&pn.clearInterval(o)},n.prototype.execute=function(t,o){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var r=this._execute(t,o);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},n.prototype._execute=function(t,o){var r=!1,i;try{this.work(t)}catch(a){r=!0,i=a||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),i},n.prototype.unsubscribe=function(){if(!this.closed){var t=this,o=t.id,r=t.scheduler,i=r.actions;this.work=this.state=this.scheduler=null,this.pending=!1,Ce(i,this),o!=null&&(this.id=this.recycleAsyncId(r,o,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},n}(Bo),vn=function(){function e(n,t){t===void 0&&(t=e.now),this.schedulerActionCtor=n,this.now=t}return e.prototype.schedule=function(n,t,o){return t===void 0&&(t=0),new this.schedulerActionCtor(this,n).schedule(o,t)},e.now=Vo.now,e}(),qo=function(e){$(n,e);function n(t,o){o===void 0&&(o=vn.now);var r=e.call(this,t,o)||this;return r.actions=[],r._active=!1,r}return n.prototype.flush=function(t){var o=this.actions;if(this._active){o.push(t);return}var r;this._active=!0;do if(r=t.execute(t.state,t.delay))break;while(t=o.shift());if(this._active=!1,r){for(;t=o.shift();)t.unsubscribe();throw r}},n}(vn);new qo(jo);function Ho(e){return e&&F(e.schedule)}function Wo(e){return e[e.length-1]}function Jn(e){return Ho(Wo(e))?e.pop():void 0}var Qn=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function Zn(e){return F(e?.then)}function et(e){return F(e[$e])}function nt(e){return Symbol.asyncIterator&&F(e?.[Symbol.asyncIterator])}function tt(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function Go(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var ot=Go();function rt(e){return F(e?.[ot])}function it(e){return ko(this,arguments,function(){var n,t,o,r;return Hn(this,function(i){switch(i.label){case 0:n=e.getReader(),i.label=1;case 1:i.trys.push([1,,9,10]),i.label=2;case 2:return[4,ne(n.read())];case 3:return t=i.sent(),o=t.value,r=t.done,r?[4,ne(void 0)]:[3,5];case 4:return[2,i.sent()];case 5:return[4,ne(o)];case 6:return[4,i.sent()];case 7:return i.sent(),[3,2];case 8:return[3,10];case 9:return n.releaseLock(),[7];case 10:return[2]}})})}function at(e){return F(e?.getReader)}function ue(e){if(e instanceof z)return e;if(e!=null){if(et(e))return $o(e);if(Qn(e))return Yo(e);if(Zn(e))return Ko(e);if(nt(e))return st(e);if(rt(e))return Xo(e);if(at(e))return Jo(e)}throw tt(e)}function $o(e){return new z(function(n){var t=e[$e]();if(F(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Yo(e){return new z(function(n){for(var t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function Ko(e){return new z(function(n){e.then(function(t){n.closed||(n.next(t),n.complete())},function(t){return n.error(t)}).then(null,Yn)})}function Xo(e){return new z(function(n){var t,o;try{for(var r=oe(e),i=r.next();!i.done;i=r.next()){var a=i.value;if(n.next(a),n.closed)return}}catch(s){t={error:s}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}n.complete()})}function st(e){return new z(function(n){Qo(e,n).catch(function(t){return n.error(t)})})}function Jo(e){return st(it(e))}function Qo(e,n){var t,o,r,i;return _o(this,void 0,void 0,function(){var a,s;return Hn(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,11]),t=Eo(e),c.label=1;case 1:return[4,t.next()];case 2:if(o=c.sent(),!!o.done)return[3,4];if(a=o.value,n.next(a),n.closed)return[2];c.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return s=c.sent(),r={error:s},[3,11];case 6:return c.trys.push([6,,9,10]),o&&!o.done&&(i=t.return)?[4,i.call(t)]:[3,8];case 7:c.sent(),c.label=8;case 8:return[3,10];case 9:if(r)throw r.error;return[7];case 10:return[7];case 11:return n.complete(),[2]}})})}function Z(e,n,t,o,r){o===void 0&&(o=0),r===void 0&&(r=!1);var i=n.schedule(function(){t(),r?e.add(this.schedule(null,o)):this.unsubscribe()},o);if(e.add(i),!r)return i}function ct(e,n){return n===void 0&&(n=0),le(function(t,o){t.subscribe(Ae(o,function(r){return Z(o,e,function(){return o.next(r)},n)},function(){return Z(o,e,function(){return o.complete()},n)},function(r){return Z(o,e,function(){return o.error(r)},n)}))})}function lt(e,n){return n===void 0&&(n=0),le(function(t,o){o.add(e.schedule(function(){return t.subscribe(o)},n))})}function Zo(e,n){return ue(e).pipe(lt(n),ct(n))}function er(e,n){return ue(e).pipe(lt(n),ct(n))}function nr(e,n){return new z(function(t){var o=0;return n.schedule(function(){o===e.length?t.complete():(t.next(e[o++]),t.closed||this.schedule())})})}function tr(e,n){return new z(function(t){var o;return Z(t,n,function(){o=e[ot](),Z(t,n,function(){var r,i,a;try{r=o.next(),i=r.value,a=r.done}catch(s){t.error(s);return}a?t.complete():t.next(i)},0,!0)}),function(){return F(o?.return)&&o.return()}})}function ut(e,n){if(!e)throw new Error("Iterable cannot be null");return new z(function(t){Z(t,n,function(){var o=e[Symbol.asyncIterator]();Z(t,n,function(){o.next().then(function(r){r.done?t.complete():t.next(r.value)})},0,!0)})})}function or(e,n){return ut(it(e),n)}function rr(e,n){if(e!=null){if(et(e))return Zo(e,n);if(Qn(e))return nr(e,n);if(Zn(e))return er(e,n);if(nt(e))return ut(e,n);if(rt(e))return tr(e,n);if(at(e))return or(e,n)}throw tt(e)}function ir(e,n){return n?rr(e,n):ue(e)}We(function(e){return function(n){n===void 0&&(n=null),e(this),this.message="Timeout has occurred",this.name="TimeoutError",this.info=n}});function de(e,n){return le(function(t,o){var r=0;t.subscribe(Ae(o,function(i){o.next(e.call(n,i,r++))}))})}function ar(e,n,t,o,r,i,a,s){var c=[],l=0,f=0,m=!1,b=function(){m&&!c.length&&!l&&n.complete()},d=function(p){return l<o?h(p):c.push(p)},h=function(p){l++;var g=!1;ue(t(p,f++)).subscribe(Ae(n,function(v){n.next(v)},function(){g=!0},void 0,function(){if(g)try{l--;for(var v=function(){var y=c.shift();a||h(y)};c.length&&l<o;)v();b()}catch(y){n.error(y)}}))};return e.subscribe(Ae(n,d,function(){m=!0,b()})),function(){}}function dt(e,n,t){return t===void 0&&(t=1/0),F(n)?dt(function(o,r){return de(function(i,a){return n(o,i,r,a)})(ue(e(o,r)))},t):(typeof n=="number"&&(t=n),le(function(o,r){return ar(o,r,e,t)}))}function sr(e){return dt(Kn,e)}function cr(){return sr(1)}function hn(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return cr()(ir(e,Jn(e)))}function fe(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=Jn(e);return le(function(o,r){(t?hn(e,o,t):hn(e,o)).subscribe(r)})}var lr="lk";function ft(e){return typeof e>"u"?!1:ur(e)||dr(e)}function ur(e){var n;return e?e.hasOwnProperty("participant")&&e.hasOwnProperty("source")&&e.hasOwnProperty("track")&&typeof((n=e.publication)==null?void 0:n.track)<"u":!1}function dr(e){return e?e.hasOwnProperty("participant")&&e.hasOwnProperty("source")&&e.hasOwnProperty("publication")&&typeof e.publication<"u":!1}function fr(e){return e?e.hasOwnProperty("participant")&&e.hasOwnProperty("source")&&typeof e.publication>"u":!1}function ea(e){if(typeof e=="string"||typeof e=="number")return`${e}`;if(fr(e))return`${e.participant.identity}_${e.source}_placeholder`;if(ft(e))return`${e.participant.identity}_${e.publication.source}_${e.publication.trackSid}`;throw new Error(`Can't generate a id for the given track reference: ${e}`)}function na(e){return e instanceof Un}var pr=[A.ConnectionStateChanged,A.RoomMetadataChanged,A.ActiveSpeakersChanged,A.ConnectionQualityChanged,A.ParticipantConnected,A.ParticipantDisconnected,A.ParticipantPermissionsChanged,A.ParticipantMetadataChanged,A.ParticipantNameChanged,A.ParticipantAttributesChanged,A.TrackMuted,A.TrackUnmuted,A.TrackPublished,A.TrackUnpublished,A.TrackStreamStateChanged,A.TrackSubscriptionFailed,A.TrackSubscriptionPermissionChanged,A.TrackSubscriptionStatusChanged],vr=[...pr,A.LocalTrackPublished,A.LocalTrackUnpublished];T.TrackPublished,T.TrackUnpublished,T.TrackMuted,T.TrackUnmuted,T.TrackStreamStateChanged,T.TrackSubscribed,T.TrackUnsubscribed,T.TrackSubscriptionPermissionChanged,T.TrackSubscriptionFailed,T.LocalTrackPublished,T.LocalTrackUnpublished;var hr=[T.ConnectionQualityChanged,T.IsSpeakingChanged,T.ParticipantMetadataChanged,T.ParticipantPermissionsChanged,T.TrackMuted,T.TrackUnmuted,T.TrackPublished,T.TrackUnpublished,T.TrackStreamStateChanged,T.TrackSubscriptionFailed,T.TrackSubscriptionPermissionChanged,T.TrackSubscriptionStatusChanged];[...hr,T.LocalTrackPublished,T.LocalTrackUnpublished];var Te=To.getLogger("lk-components-js");Te.setDefaultLevel("WARN");function pt(e){return typeof e=="object"}function vt(e){return Array.isArray(e)&&e.filter(pt).length>0}function mr(e){return`${lr}-${e}`}function ta(e){const n=mn(e),t=ht(e.participant).pipe(de(()=>mn(e)),fe(n));return{className:mr(e.source===q.Source.Camera||e.source===q.Source.ScreenShare?"participant-media-video":"participant-media-audio"),trackObserver:t}}function mn(e){if(ft(e))return e.publication;{const{source:n,name:t,participant:o}=e;if(n&&t)return o.getTrackPublications().find(r=>r.source===n&&r.trackName===t);if(t)return o.getTrackPublicationByName(t);if(n)return o.getTrackPublication(n);throw new Error("At least one of source and name needs to be defined")}}function gr(e,...n){return new z(t=>{const o=()=>{t.next(e)};return n.forEach(r=>{e.on(r,o)}),()=>{n.forEach(r=>{e.off(r,o)})}}).pipe(fe(e))}function br(e,n){return new z(t=>{const o=(...r)=>{t.next(r)};return e.on(n,o),()=>{e.off(n,o)}})}function yr(e){return br(e,A.ConnectionStateChanged).pipe(de(([n])=>n),fe(e.state))}function Sr(e,...n){return new z(t=>{const o=()=>{t.next(e)};return n.forEach(r=>{e.on(r,o)}),()=>{n.forEach(r=>{e.off(r,o)})}}).pipe(fe(e))}function ht(e){return Sr(e,T.TrackMuted,T.TrackUnmuted,T.ParticipantPermissionsChanged,T.TrackPublished,T.TrackUnpublished,T.LocalTrackPublished,T.LocalTrackUnpublished,T.MediaDevicesError,T.TrackSubscriptionStatusChanged).pipe(de(n=>{const{isMicrophoneEnabled:t,isCameraEnabled:o,isScreenShareEnabled:r}=n,i=n.getTrackPublication(q.Source.Microphone),a=n.getTrackPublication(q.Source.Camera);return{isCameraEnabled:o,isMicrophoneEnabled:t,isScreenShareEnabled:r,cameraTrack:a,microphoneTrack:i,participant:n}}))}new TextEncoder;new TextDecoder;function oa(){return{className:"lk-room-container"}}function gn(e,n,t=!0){const o=[e.localParticipant,...Array.from(e.remoteParticipants.values())],r=[];return o.forEach(i=>{n.forEach(a=>{const s=Array.from(i.trackPublications.values()).filter(c=>c.source===a&&(!t||c.track)).map(c=>({participant:i,publication:c,source:c.source}));r.push(...s)})}),{trackReferences:r,participants:o}}function wr(e,n,t){var o,r;const i=(o=t.additionalRoomEvents)!=null?o:vr,a=(r=t.onlySubscribed)!=null?r:!0,s=Array.from(new Set([A.ParticipantConnected,A.ParticipantDisconnected,A.ConnectionStateChanged,A.LocalTrackPublished,A.LocalTrackUnpublished,A.TrackPublished,A.TrackUnpublished,A.TrackSubscriptionStatusChanged,...i]).values());return gr(e,...s).pipe(de(c=>{const l=gn(c,n,a);return Te.debug(`TrackReference[] was updated. (length ${l.trackReferences.length})`,l),l}),fe(gn(e,n,a)))}u.createContext(void 0);const xr=u.createContext(void 0);function Cr(){return u.useContext(xr)}function ra(e){const n=Cr(),t=e??n;if(!t)throw new Error("No TrackRef, make sure you are inside a TrackRefContext or pass the TrackRef explicitly");return t}u.createContext(void 0);const Ar=u.createContext(void 0);function mt(){return u.useContext(Ar)}function Ye(e){const n=mt(),t=e??n;if(!t)throw new Error("No room provided, make sure you are inside a Room context or pass the room explicitly");return t}const ia=u.createContext(void 0);function Tr(e,n,t=!0){const[o,r]=u.useState(n);return u.useEffect(()=>{if(t&&r(n),typeof window>"u"||!e)return;const i=e.subscribe(r);return()=>i.unsubscribe()},[e,t]),o}function _r(e){const n=Ye(e),t=u.useMemo(()=>yr(n),[n]);return Tr(t,n.state)}function aa(e={}){const n=Ye(e.room),[t,o]=u.useState(n.localParticipant),[r,i]=u.useState(t.isMicrophoneEnabled),[a,s]=u.useState(t.isMicrophoneEnabled),[c,l]=u.useState(t.lastMicrophoneError),[f,m]=u.useState(t.lastCameraError),[b,d]=u.useState(t.isMicrophoneEnabled),[h,p]=u.useState(void 0),[g,v]=u.useState(void 0),y=S=>{s(S.isCameraEnabled),i(S.isMicrophoneEnabled),d(S.isScreenShareEnabled),v(S.cameraTrack),p(S.microphoneTrack),l(S.participant.lastMicrophoneError),m(S.participant.lastCameraError),o(S.participant)};return u.useEffect(()=>{const S=ht(n.localParticipant).subscribe(y);return()=>S.unsubscribe()},[n]),{isMicrophoneEnabled:r,isScreenShareEnabled:b,isCameraEnabled:a,microphoneTrack:h,cameraTrack:g,lastMicrophoneError:c,lastCameraError:f,localParticipant:t}}function sa(e=[q.Source.Camera,q.Source.Microphone,q.Source.ScreenShare,q.Source.ScreenShareAudio,q.Source.Unknown],n={}){const t=Ye(n.room),[o,r]=u.useState([]),[i,a]=u.useState([]),s=u.useMemo(()=>e.map(c=>pt(c)?c.source:c),[JSON.stringify(e)]);return u.useEffect(()=>{const c=wr(t,s,{additionalRoomEvents:n.updateOnlyOn,onlySubscribed:n.onlySubscribed}).subscribe(({trackReferences:l,participants:f})=>{Te.debug("setting track bundles",l,f),r(l),a(f)});return()=>c.unsubscribe()},[t,JSON.stringify(n.onlySubscribed),JSON.stringify(n.updateOnlyOn),JSON.stringify(e)]),u.useMemo(()=>{if(vt(e)){const c=Er(e,i),l=Array.from(o);return i.forEach(f=>{c.has(f.identity)&&(c.get(f.identity)??[]).forEach(m=>{if(o.find(({participant:d,publication:h})=>f.identity===d.identity&&h.source===m))return;Te.debug(`Add ${m} placeholder for participant ${f.identity}.`);const b={participant:f,source:m};l.push(b)})}),l}else return o},[o,i,e])}function kr(e,n){const t=new Set(e);for(const o of n)t.delete(o);return t}function Er(e,n){const t=new Map;if(vt(e)){const o=e.filter(r=>r.withPlaceholder).map(r=>r.source);n.forEach(r=>{const i=r.getTrackPublications().map(s=>{var c;return(c=s.track)==null?void 0:c.source}).filter(s=>s!==void 0),a=Array.from(kr(new Set(o),new Set(i)));a.length>0&&t.set(r.identity,a)})}return t}const Ir=e=>{const n=t=>{let o=1-Math.max(-100,Math.min(-10,t))*-1/100;return o=Math.sqrt(o),o};return e.map(t=>t===-1/0?0:n(t))},Dr={bands:5,loPass:100,hiPass:600,updateInterval:32,analyserOptions:{fftSize:2048}};function Mr(e,n={}){var t;const o=e instanceof q?e:(t=e?.publication)==null?void 0:t.track,r={...Dr,...n},[i,a]=u.useState(new Array(r.bands).fill(0));return u.useEffect(()=>{if(!o||!(o!=null&&o.mediaStream))return;const{analyser:s,cleanup:c}=ro(o,r.analyserOptions),l=s.frequencyBinCount,f=new Float32Array(l),m=setInterval(()=>{s.getFloatFrequencyData(f);let b=new Float32Array(f.length);for(let g=0;g<f.length;g++)b[g]=f[g];b=b.slice(n.loPass,n.hiPass);const d=Ir(b),h=Math.ceil(d.length/r.bands),p=[];for(let g=0;g<r.bands;g++){const v=d.slice(g*h,(g+1)*h).reduce((y,S)=>y+=S,0);p.push(v/h)}a(p)},r.updateInterval);return()=>{c(),clearInterval(m)}},[o,o?.mediaStream,JSON.stringify(n)]),i}function V(){const e=mt(),n=u.useRef({debug:(...t)=>te.debug(`[${e?.name??"no room"}]`,...t),encoder:new TextEncoder,decoder:new TextDecoder}).current;return{room:e,...n}}function Pr(){Fr(),Lr(),Nr(),Rr()}function Rr(){const{room:e,debug:n}=V(),o=jn().video,r=u.useMemo(()=>{const i=["audioinput","audiooutput"];return o&&i.push("videoinput"),i},[o]);u.useEffect(()=>{async function i(){Promise.all(r.map(async a=>{const s=await io.getLocalDevices(a),c=e?.getActiveDevice(a);if(!s.find(f=>f.deviceId===c)){const f=await se(a);let m=null;f?m=f.deviceId:s[0]&&(m=s[0].deviceId),n(`switching ${a} to ${m}`),m&&await e?.switchActiveDevice(a,m)}}))}if(navigator)return navigator.mediaDevices.addEventListener("devicechange",i),()=>{navigator.mediaDevices.removeEventListener("devicechange",i)}},[e,n,r])}function Fr(){const{room:e,debug:n}=V(),t=e?.getActiveDevice("audioinput"),o=e?.getActiveDevice("audiooutput");u.useEffect(()=>{async function r(){const i=(await se("audioinput"))?.deviceId,a=(await se("audiooutput"))?.deviceId,s=async()=>{i&&t!==i&&(n("switching audio input to default"),await e?.switchActiveDevice("audioinput",i))},c=async()=>{if(a&&o!==a){n("switching audio output to default");try{await e?.switchActiveDevice("audiooutput",a)}catch(l){n("failed to switch audio output",l)}}};await Promise.all([s(),c()])}r()},[t,o,n,e])}function Lr(){const{isVideoEnabled:e,endStartingVideo:n}=bo(),{room:t,debug:o}=V(),i=jn().video,a=i?t?.getActiveDevice("videoinput"):void 0;u.useEffect(()=>{async function s(){if(e)try{await t?.localParticipant.setCameraEnabled(!0),n(!0)}catch{n(!1)}else await t?.localParticipant.setCameraEnabled(!1)}t&&s()},[e,n,t]),u.useEffect(()=>{async function s(){const c=(await se("videoinput"))?.deviceId;await(async()=>{c&&a!==c&&(o("switching video input to default"),await t?.switchActiveDevice("videoinput",c))})()}i&&s()},[a,o,t,i])}function Nr(){const{room:e}=V(),{isScreenshareEnabled:n,endStartingScreenshare:t}=yo();u.useEffect(()=>{async function o(){if(n)try{await e?.localParticipant.setScreenShareEnabled(!0,{video:{displaySurface:"monitor"}}),t(!0)}catch{t(!1)}else await e?.localParticipant.setScreenShareEnabled(!1)}e&&o()},[e,n,t])}function gt(){const{debug:e}=V(),n=j(o=>o.conversationId),t=Pn();return u.useCallback(async o=>{const r=o,i=n&&!Rn(n)?n:void 0,a=r??i;if(a){e(`refetch conversationId ${a}`);try{await $t(a,!0)}catch(s){const c="Failed to update conversation";e(c,s),t.danger(c)}}},[n,e,t])}const Or=5e3,Ur=2e3,zr=e=>{const n=U(),{room:t}=V(),o=j(h=>h.disconnectPending),r=j(h=>h.server.remoteState===N.Speaking),i=j(h=>h.conversationId)??void 0,a=Rt(i),s=u.useRef(!1),c=gt(),l=It(),f=kn();s.current=r||s.current;const m=u.useCallback(async h=>{clearTimeout(o),n.setState(g=>{g.disconnectPending=void 0}),t?.disconnect(),await c(a),n.setState(He);const p=a??h;p&&Ln(l,f,p),e?.refetchLater&&window.setTimeout(()=>{c(a)},Ur)},[o,t,c,a,e?.refetchLater,l,f,n]),b=s.current&&!a,d=u.useCallback(()=>{n.setState(h=>{h.disconnectPending=window.setTimeout(m,Or)})},[m,n]);return{disconnectPending:o!==void 0,shouldDelayDisconnect:b,delayDisconnect:d,immediateDisconnect:m}};function Vr(){const e=kn(),n=U(),{room:t,debug:o,decoder:r}=V(),{disconnectPending:i,shouldDelayDisconnect:a,delayDisconnect:s,immediateDisconnect:c}=zr(),l=gt(),f=u.useRef(!1),m=u.useRef(!1),b=u.useRef(!1),d=u.useRef(!1),h=Se(p=>p.lastVoiceSessionStartTime);u.useEffect(()=>{const p=async k=>{const{new_state:C}=k;if(n.setState(I=>{(I.voiceMode!=="advanced"||C!==N.Thinking)&&(I.server.remoteState=C)}),C===N.Listening&&!m.current&&h instanceof Date){const O=new Date().getTime()-h.getTime();D.firstListeningLatency.success({durationMs:O}),m.current=!0}if(C===N.ListeningIntently)D.voiceSessionListeningIntently.stateChange();else if(C===N.Listening){if(!b.current){const I=n.getState().voiceSessionId;D.voiceSessionFirstListening.stateChange({voice_session_id:I??"unknown"}),b.current=!0}b.current=!0,D.voiceSessionListening.stateChange()}else if(C===N.Thinking)D.voiceSessionThinking.stateChange();else if(C===N.Speaking){if(!d.current){const I=n.getState().voiceSessionId;D.voiceSessionFirstSpeaking.stateChange({voice_session_id:I??"unknown"}),d.current=!0}D.voiceSessionSpeaking.stateChange()}else C===N.Halted&&D.voiceSessionHalted.stateChange()},g=async k=>{n.setState(C=>{C.server.usage=k})},v=async k=>{n.setState(C=>{C.server.toolUpdate={...k}}),k.update_type==="hangup"&&(a?s():c())},y=async k=>{let C;try{C=JSON.parse(r.decode(k)),o("data recevied",C)}catch(I){o("error parsing data",I);return}switch(n.setState(I=>(I.server.messages.push({...C,timestamp:new Date,source:"remote"}),I)),C.type){case H.StateUpdate:o("state update",C.payload);const{new_state:I,delay_s:O}=C.payload;if([N.Thinking,N.Speaking].includes(I)&&n.getState().server.turnContext.clear(),I===N.Listening&&!f.current){f.current=!0,performance.mark("voice_mode.end");const L=performance.measure("voice_mode","voice_mode.start","voice_mode.end").duration.toFixed(0);D.voiceMode.connect({durationMs:L})}I===N.Thinking&&O&&(o(`${t?.name} delay thinking state by ${O} seconds`),p({new_state:N.ListeningIntently,delay_s:O}),await new Promise(L=>setTimeout(L,O*1e3))),p(C.payload);break;case H.ConversationUpdate:{o("conversation update",C.payload);const L=n.getState().conversationId,{conversation_id:E}=C.payload;if(L&&Rn(L)){rn.initThread(L,{kind:Ne.PrimaryAssistant}),rn.setServerIdForNewThread(L,E),n.setState(Y=>{Y.conversationId=E}),Ln(Nn,e,E);const M=Oe.getGizmoId(Ue(L));Yt(e,M)}await l(E),i&&c(E);break}case H.UsageUpdate:g(C.payload);break;case H.ToolUpdate:v(C.payload);break}},S=(k,C)=>{o("track published",k,C)},_=()=>{o("disconnected"),Bn(n),D.voiceSessionDisconnected.stateChange()},x=(k,C)=>{C instanceof Un&&(o(`Connection quality changed for participant ${C.identity}: ${k}`),n.setState(I=>{I.server.voiceConnectionQuality=k}))};return t?.on(A.DataReceived,y),t?.on(A.TrackPublished,S),t?.on(A.ConnectionQualityChanged,x),t?.on(A.Disconnected,_),()=>{t?.off(A.DataReceived,y),t?.off(A.TrackPublished,S),t?.off(A.ConnectionQualityChanged,x),t?.off(A.Disconnected,_)}},[o,r,s,i,c,h,e,l,t,a,n])}function Br(){jr(),qr(),Hr(),Wr(),Gr()}function jr(){const{room:e}=V(),n=U();u.useEffect(()=>{n.setState(t=>{t.dev.room=e})},[e,n])}function qr(){const{room:e}=V(),n=_r(e),t=U();u.useEffect(()=>{t.setState(o=>{o.server.connectionState=n})},[n,t])}function Hr(){const{room:e,debug:n,encoder:t}=V(),o=U();u.useEffect(()=>{const r=!!o.getState().server.actions;if(e&&!r){const i=async a=>{n("publishing action",a);const s={type:H.ActionRequest,payload:{action:a}};await e.localParticipant.publishData(t.encode(JSON.stringify(s)),{reliable:!0}),o.setState(c=>{c.server.messages.push({...s,timestamp:new Date,source:"local"})})};o.setState(a=>{a.server.actions={[B.StartListeningIntently]:()=>i(B.StartListeningIntently),[B.StopListeningIntently]:()=>i(B.StopListeningIntently),[B.HaltAllActivity]:()=>i(B.HaltAllActivity),[B.ResumeListening]:()=>i(B.ResumeListening),[B.RelayMessage]:()=>i(B.RelayMessage)}})}},[e,n,t,o])}function Wr(){const n=U()(t=>t.isVoiceModeActive);u.useEffect(()=>(Se.setState({isVoiceActive:n}),()=>{Se.setState({isVoiceActive:!1})}),[n])}function Gr(){const e=U(),{room:n,encoder:t}=V(),o=u.useCallback(async r=>{await n?.localParticipant.publishData(t.encode(JSON.stringify(r)),{reliable:!0}),e.setState(i=>{i.server.messages.push({...r,timestamp:new Date,source:"local"})})},[n,t,e]);u.useEffect(()=>{e.setState(r=>{r.server.turnContext.setPublisher(o)})},[o,e])}const ca=u.memo(function(){return Vr(),Br(),Pr(),null});function la(e){return{conversation_id:e.serverThreadId,parent_message_id:e.parentMessageId,voice_mode:e.isAdvancedMode?"advanced":"standard",eventSource:e.eventSource,clientThreadId:e.clientThreadId,gizmo_id:e.gizmoId,voice:e.voice}}function $r({requestMicPermissions:e}={requestMicPermissions:!1}){const n=En(),t=U(),o=wo(),{voiceName:r,voiceMainLanguage:i,voiceTrainingAllowed:a,videoTrainingAllowed:s}=qe(),c=j(v=>v.isVoiceModeActive),l=ho(),{room:f}=V(),m=go(),b=ao(),d=Ft(),h=n.formatMessage({id:"useVoiceModeButtonAction.error",defaultMessage:"Failed to start voice mode"}),p=u.useCallback(async()=>{l&&(await f?.disconnect(),Ie(null,t),t.setState(v=>{v.server.remoteState=N.Halted}))},[l,f,t]);return{startVoiceMode:u.useCallback(async v=>{l&&(await f?.disconnect(),Ie(null,t)),e&&await b();const y=await se("audioinput");t.setState(x=>{x.audioInputDevice=y,x.isVoiceModeActive=!0,x.voiceMode=v.voice_mode,x.server.remoteState=N.Connecting});const S=performance.now(),_=[8,4,4,4,12].map(x=>Math.floor(Math.random()*Math.pow(10,x)).toString(16).padStart(x,"0").toUpperCase()).join("-");try{D.livekit.connectCalled();const x=await m({conversation_id:v.conversation_id??null,requested_voice_mode:v.voice_mode??null,gizmo_id:v.gizmo_id??null,voice:v.voice,requested_default_model:v.requested_default_model??null},v.eventSource),{default_voice_mode:k,modes:C,chatreq:I}=x;performance.mark("livekit.start"),performance.mark("voice_mode.start");const{eventSource:O,voice:L,clientThreadId:E,voice_mode:M,gizmo_id:Y,...W}=v,pe=C.find(X=>X.mode===k);if(!pe)throw new Error("No voice status mode found for default mode "+k);const K=pe.default_model_slug,ve=k==="advanced"?K:void 0,he=I?await je.getEnforcementToken(I):null,me=v.gizmo_id?{kind:Ne.GizmoInteraction,gizmo_id:v.gizmo_id}:{kind:Ne.PrimaryAssistant};Kt(W);const G=await Vn.getVoiceToken({...W,voice:L??r,language_code:i,voice_session_id:_,timezone_offset_min:new Date().getTimezoneOffset(),voice_mode:k,model_slug:K,model_slug_advanced:ve,chatreq_token:I?.token,history_and_training_disabled:d,conversation_mode:me,voice_training_allowed:a,video_training_allowed:s},v.eventSource,he);G&&G.token&&G.url&&G.e2ee_key&&(Se.setState({lastVoiceSessionStartTime:new Date}),t.setState(X=>{X.server.remoteState=N.Listening}),Ie({conversationId:v.conversation_id??v.clientThreadId,voiceSessionId:_,voiceMode:G.voice_mode_decision.voice_mode,credentials:{...G,e2eeKey:G.e2ee_key}},t)),performance.mark("livekit.end"),D.livekit.success({durationMs:performance.measure("livekit","livekit.start","livekit.end").duration.toFixed(0),voice_session_id:_}),D.connectionLatency.success({durationMs:performance.now()-S})}catch(x){const k=so(t.getState());throw D.livekit.failure(x,{...k,voice_session_id:_,eventSource:v.eventSource,voice:v.voice??"(undefined)",requested_voice_mode:v.voice_mode??"(undefined)",gizmo_id:v.gizmo_id??"(undefined)"}),te.debug("failed to get voice token",x),t.setState(C=>{C.server.remoteState=N.Halted}),D.connectionLatency.failure({durationMs:performance.now()-S}),o.danger(h),x}},[b,h,m,l,d,e,f,o,s,i,r,t,a]),stopVoiceMode:p,isConnected:l,isVoiceModeActive:c}}const Yr=2,Kr=({viewport:e,canvasSize:n,shouldMeasurePerf:t,source:o})=>{const r=u.useRef({}),i=u.useCallback(a=>{const s=a.getExtension("WEBGL_debug_renderer_info");s&&(r.current.vendor=a.getParameter(s.UNMASKED_VENDOR_WEBGL),r.current.renderer=a.getParameter(s.UNMASKED_RENDERER_WEBGL))},[]);return u.useEffect(()=>{const a={vendor:r.current.vendor??"(unavailable)",renderer:r.current.renderer??"(unavailable)",width:e[0],height:e[1],canvasWidth:n[0],canvasHeight:n[1],dpr:window.devicePixelRatio,source:o};!Lt(a,r.current)&&t&&(r.current=a,zn(Yr).then(c=>{D.bloop.performance({...a,fps:c})}))},[n,t,e,o]),i},Xr=.25,Jr=3,bn=28,Pe=55,Re=200,yn=1.1,Qr=({viewport:e,initialScale:n,shouldCalibrate:t})=>{const[o,r]=u.useState(n),i=u.useRef(void 0),a=u.useRef(void 0),s=u.useRef(void 0),c=u.useRef("down"),l=u.useCallback(()=>{const f=c.current==="up"?Jr:Xr;zn(f).then(m=>{if(m<bn){c.current="down";const b=Math.max(m,1),d=Math.sqrt(b/bn);r(h=>h*d),a.current=window.setTimeout(l,Re)}else if(s.current){const b=m>=Pe,d=m>=s.current*yn;if(b||d)c.current="up",r(h=>h*yn),a.current=window.setTimeout(l,Re);else if(m<Pe){c.current="down";const h=Math.sqrt(m/Pe);r(p=>p*h)}}s.current=m})},[]);return u.useEffect(()=>{const[f,m]=e,[b,d]=i.current??[];return t&&(b!==f||d!==m)&&(i.current=e,clearTimeout(a.current),r(n),a.current=window.setTimeout(l,Re)),()=>{clearTimeout(a.current)}},[t,l,n,e]),o},Zr=60,ke=Math.floor(1e3/Zr);var ei=Nt,ni=Ut,ti=zt,oi=Ot,ri=Xt,ii=Math.max;function ai(e){if(!(e&&e.length))return[];var n=0;return e=ei(e,function(t){if(ri(t))return n=ii(t.length,n),!0}),oi(n,function(t){return ni(e,ti(t))})}var si=ai,ci=Jt,li=si,ui=ci(li),di=ui;const Fe=Dt(di),Ke=240,bt=2048,yt=new Array(Ke).fill(0),fi=e=>{const n=Mr(e,{bands:Ke,updateInterval:ke,loPass:0,hiPass:400,analyserOptions:{fftSize:bt}});return n.length===0?yt:n},Xe=e=>{const{magnitudes:n,binCount:t,gainMultiplier:o}=e;if(n.length===0)return new Array(t).fill(0);const r=Math.ceil(n.length/t),i=[];for(let a=0;a<n.length;a+=r){const s=Math.min(a+r,n.length),c=n.slice(a,s).sort((b,d)=>b-d),l=Math.floor(c.length/2);let f;c.length%2===0?f=(c[l-1]+c[l])/2:f=c[l],f=Math.abs(f),f*=o;const m=f/(f+1);i.push(m)}return i},St=(e,n)=>{const t=n.sampleRate,o=e.length,r=n.bandCount,i=n.binCount,a=n.gainMultipliers;if(a.length!==r)throw new Error("gainMultipliers must have length equal to bandCount");const s=o*2,c=t/s,l=e.map((h,p)=>p*c),f=20,m=t/2,b=new Array(r+1).fill(0).map((h,p)=>f*Math.pow(m/f,p/r)),d=new Array(r).fill(null).map(()=>[]);for(let h=0;h<l.length;h+=1)for(let p=0;p<r;p+=1)if(l[h]>=b[p]&&l[h]<b[p+1]){d[p].push(e[h]);break}for(let h=0;h<r;h+=1){const p=d[h],g=a[h];d[h]=Xe({magnitudes:p,binCount:i,gainMultiplier:g})}return d},Sn=60,wt=48e3,pi=1,vi=2,hi=40,mi=2;function wn({time:e,timeConstant:n}){return 1-Math.exp(-e/n)}function xn(e,n){const t=n[1]-n[0];return n[0]+e*t}const Le=e=>{if(!Array.isArray(e)||e.length!==2||typeof e[0]!="number"||typeof e[1]!="number")throw new Error("zip failed - received a value that is not a [number, number] tuple")},gi=e=>{const{prevAudioData:n,prevCumulativeAudioData:t,deltaTimeS:o,audioDataRaw:r}=e,i=r.map(b=>b*o*Sn*pi),a=wn({time:o,timeConstant:vi}),s=Fe(n,i).map(b=>(Le(b),xn(a,b))),c=r.map(b=>b*o*Sn*hi),l=Fe(t,c).map(b=>(Le(b),b[0]+b[1])),f=wn({time:o,timeConstant:mi}),m=Fe(t,l).map(b=>(Le(b),xn(f,b)));return{audioData:s,cumulativeAudioData:m}},ua=(e,n)=>{const t=fi(e),o=St(t,{sampleRate:wt,binCount:n.bins,bandCount:n.bands,gainMultipliers:n.gainMultipliers}),r=Xe({magnitudes:t,binCount:1,gainMultiplier:1});return{bandMagnitudes:o,cumulativeMagnitude:r}},re=te.createChild("GLCanvas");function bi({className:e,vert:n,frag:t,Behaviors:o,onViewportUpdate:r,onRenderComplete:i,onGlAvailable:a,onCanvasSizeUpdate:s,scale:c}){const l=u.useRef(null),f=u.useRef(null),[m,b]=u.useState(null),[d,h]=u.useState(),p=u.useRef(Qt(y=>{const{width:S,height:_}=y.contentRect,x=Math.floor(Math.min(S??0,_??0));b(x),r?.({width:x,height:x})},100)),g=Zt(p.current);if(an(()=>{const y=l.current,{width:S,height:_}=y??{};if(y&&m!=null&&S&&_){const x=y.getContext("webgl2",{premultipliedAlpha:!0});x?h(x):re.error("webgl2 context not supported")}},[m]),an(()=>{if(!d)return;const y=d.createProgram(),S=d.createShader(d.VERTEX_SHADER),_=d.createShader(d.FRAGMENT_SHADER);if(!y){re.debug("failed to create program");return}if(!S||!_){re.debug("failed to create shaders",S,_);return}let x="";if(d.shaderSource(S,n),d.compileShader(S),x+=`vertShader:
${d.getShaderInfoLog(S)}
`,d.attachShader(y,S),d.shaderSource(_,t),d.compileShader(_),x+=`fragShader:
${d.getShaderInfoLog(_)}
`,d.attachShader(y,_),d.linkProgram(y),d.useProgram(y),x+=d.getProgramInfoLog(y),!d.getProgramParameter(y,d.LINK_STATUS))throw`Could not compile WebGL program. 

${x}`;f.current=y,re.debug("program created"),a?.(d,y);const k=d.fenceSync(d.SYNC_GPU_COMMANDS_COMPLETE,0);return k&&(d.waitSync(k,0,d.TIMEOUT_IGNORED),i?.()),()=>{re.debug("cleaning up"),f.current=null,d.detachShader(y,S),d.detachShader(y,_),d.deleteShader(S),d.deleteShader(_),d.deleteProgram(y)}},[d,t,n]),m!=null&&d&&l.current){const y=l.current,S=m*window.devicePixelRatio*(c??1);y.width=S,y.height=S,d.viewport(0,0,S,S),s?.({width:S,height:S})}const v=f.current;return w.jsxs("div",{className:e,ref:g,children:[w.jsx("canvas",{ref:l,style:{width:m??void 0,height:m??void 0}},m),d&&v&&o&&w.jsx(o,{ctx:d,program:v})]})}function yi({GLUniformsSetter:e,textureImage:n,textureName:t,variablesRef:o,className:r,vert:i,frag:a,onViewportUpdate:s,onRenderComplete:c,onGlAvailable:l,onCanvasSizeUpdate:f,scale:m}){const b=u.useRef(void 0),d=u.useCallback(async(g,v)=>{if(b.current=new e(g,v),n&&t){const y=g.createTexture();g.bindTexture(g.TEXTURE_2D,y),g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE),g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE),g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR),g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR),g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,n);const S=g.getUniformLocation(v,t);g.activeTexture(g.TEXTURE0),g.bindTexture(g.TEXTURE_2D,y),g.uniform1i(S,0)}l?.(g,v)},[e,n,t,l]),h=u.useRef(void 0),p=u.useCallback(()=>{b.current&&o.current&&b.current.setVariablesAndRender(o.current),h.current=requestAnimationFrame(p)},[o]);return u.useEffect(()=>(p(),()=>{h.current&&cancelAnimationFrame(h.current)}),[p]),w.jsx(bi,{className:r,vert:i,frag:a,onViewportUpdate:s,onRenderComplete:c,onGlAvailable:d,onCanvasSizeUpdate:f,scale:m,Behaviors:()=>null})}const Si="webp",wi=512,xi=512,Ci="srgb",Ai=3,Ti="uchar",_i=72,ki=!1,Ei=8,Ii=!1,Di=!1,Mi="/assets/noise-watercolor-m3j88gni.webp",Pi={format:Si,width:wi,height:xi,space:Ci,channels:Ai,depth:Ti,density:_i,isProgressive:ki,paletteBitDepth:Ei,hasProfile:Ii,hasAlpha:Di,src:Mi};let xt;const _e=new window.Image;_e.crossOrigin="anonymous";_e.src=Pi.src;_e.onload=()=>{xt=_e};var Ri=`#version 300 es
#define E (2.71828182846)
#define pi (3.14159265358979323844)
#define NUM_OCTAVES (4)

precision highp float;

struct ColoredSDF {
  float distance;
  vec4 color;
};

struct SDFArgs {
  vec2 st;
  float amount;
  float duration;
  float time;
  float mainRadius;
};

float triangle(float t, float p) {
  return 2.0 * abs(t / p - floor(t / p + 0.5));
}

float spring(float t, float d) {
  return 1.0 - exp(-E * 2.0 * t) * cos((1.0 - d) * 115.0 * t);
}

float silkySmooth(float t, float k) {
  return atan(k * sin((t - 0.5) * pi)) / atan(k) * 0.5 + 0.5;
}

float scaled(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), float(0), float(1));
}

float fixedSpring(float t, float d) {
  float s = mix(
    1.0 - exp(-E * 2.0 * t) * cos((1.0 - d) * 115.0 * t),
    1.0,
    scaled(0.0, 1.0, t)
  );
  return s * (1.0 - t) + t;
}

float bounce(float t, float d) {
  return -sin(pi * (1.0 - d) * t) *
  (1.0 - t) *
  exp(-2.71828182846 * 2.0 * t) *
  t *
  10.0;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random(ivec2 st) {
  return random(vec2(st));
}

float random(float p) {
  return random(vec2(p));
}

float opSmoothUnion(float d1, float d2, float k) {
  if (k <= 0.0) {
    k = 0.000001;
  }
  float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k * h * (1.0 - h);
}

float opSmoothSubtraction(float d1, float d2, float k) {
  if (k <= 0.0) {
    k = 0.000001;
  }
  float h = clamp(0.5 - 0.5 * (d2 + d1) / k, 0.0, 1.0);
  return mix(d2, -d1, h) + k * h * (1.0 - h);
}

float opSmoothIntersection(float d1, float d2, float k) {
  if (k <= 0.0) {
    k = 0.000001;
  }
  float h = clamp(0.5 - 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) + k * h * (1.0 - h);
}

float sdRoundedBox(vec2 p, vec2 b, vec4 r) {
  r.xy = p.x > 0.0 ? r.xy : r.zw;
  r.x = p.y > 0.0 ? r.x : r.y;
  vec2 q = abs(p) - b + r.x;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

float sdArc(vec2 p, vec2 sca, vec2 scb, float ra, float rb) {
  p *= mat2(sca.x, sca.y, -sca.y, sca.x);
  p.x = abs(p.x);
  return scb.y * p.x > scb.x * p.y
    ? length(p - ra * scb) - rb
    : abs(length(p) - ra) - rb;
}

float arc(vec2 st, float startAngle, float length, float radius, float width) {
  return sdArc(
    st,
    vec2(sin(startAngle), cos(startAngle)),
    vec2(sin(length), cos(length)),
    radius,
    width
  );
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, s, -s, c);
  return m * v;
}

vec3 blendLinearBurn_13_5(vec3 base, vec3 blend) {
  
  return max(base + blend - vec3(1.0), vec3(0.0));
}

vec3 blendLinearBurn_13_5(vec3 base, vec3 blend, float opacity) {
  return blendLinearBurn_13_5(base, blend) * opacity + base * (1.0 - opacity);
}

vec4 permute(vec4 x) {
  return mod((x * 34.0 + 1.0) * x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = vec4(Pi0.z);
  vec4 iz1 = vec4(Pi1.z);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(vec4(0.0), gx0) - 0.5);
  gy0 -= sz0 * (step(vec4(0.0), gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(vec4(0.0), gx1) - 0.5);
  gy1 -= sz1 * (step(vec4(0.0), gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(
    vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110))
  );
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(
    vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111))
  );
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(
    vec4(n000, n100, n010, n110),
    vec4(n001, n101, n011, n111),
    fade_xyz.z
  );
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);

  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

/**
 * End new code for colored orb
 */

ColoredSDF applyIdleState(
  ColoredSDF sdf,
  SDFArgs args,
  bool isDarkMode /**
 * new bool
 */
) {
  float midRadius = 0.12; 
  float maxRadius = 0.3; 
  float t1 = 1.0; 
  float gamma = 3.0; 
  float omega = pi / 2.0; 

  
  float k = exp(-gamma) * omega;

  float radius;
  if (args.time <= t1) {
    
    float t_prime = args.time / t1;
    
    float springValue = 1.0 - exp(-gamma * t_prime) * cos(omega * t_prime);
    radius = midRadius * springValue;
  } else {
    
    float adjustedTime = args.time - t1;
    
    radius =
      midRadius + (maxRadius - midRadius) * (1.0 - exp(-k * adjustedTime));
  }

  
  float distance = length(args.st) - radius;

  
  sdf.distance = mix(sdf.distance, distance, args.amount);

  
  
  float alpha = sin(pi / 0.7 * args.time) * 0.3 + 0.7;
  vec4 color = vec4(isDarkMode ? vec3(1.0) : vec3(0.0), alpha);

  
  sdf.color = mix(sdf.color, color, args.amount);

  return sdf;
}

ColoredSDF applyIdleStateLegacy(ColoredSDF sdf, SDFArgs args, bool isDarkMode) {
  float connectedLinearAnimation = scaled(0.0, 2.0, args.duration);
  float connectedAnimation = fixedSpring(connectedLinearAnimation, 0.96);
  float circleSize =
    mix(
      pow(scaled(0.0, 3.0, args.time), 2.0) * 0.75 + 0.1,
      1.0,
      connectedAnimation
    ) *
    0.33;
  vec2 rotatedCoords = rotate(
    args.st,
    -args.time * pi -
      connectedAnimation * pi * 2.0 -
      pi * 2.0 * 5.0 * silkySmooth(scaled(0.0, 5.0, args.time), 2.0)
  );

  float strokeWidth = mix(circleSize / 2.0, circleSize, connectedAnimation);
  float connecting = abs(length(args.st) - circleSize) - strokeWidth;

  float connected = length(args.st) - circleSize;
  float idleDist = mix(connecting, connected, connectedAnimation);

  float d = min(sdf.distance, idleDist);
  sdf.distance = mix(sdf.distance, d, args.amount);
  float angle = atan(rotatedCoords.y, rotatedCoords.x);
  float alpha = mix(
    min(1.0, scaled(-pi, pi, angle)),
    1.0,
    connectedLinearAnimation
  );

  float spinningCircleDist =
    length(
      rotatedCoords -
        vec2(-mix(circleSize, strokeWidth, connectedAnimation), 0.0)
    ) -
    strokeWidth;

  alpha = min(
    1.0,
    max(
      alpha,
      smoothstep(0.005, 0.0, spinningCircleDist) + connectedAnimation * 4.0
    )
  );

  sdf.color = mix(
    sdf.color,
    vec4(isDarkMode ? vec3(1.0) : vec3(0.0), alpha),
    args.amount
  );
  return sdf;
}

ColoredSDF applyListenState(
  ColoredSDF sdf,
  SDFArgs args,
  float micLevel,
  float listenTimestamp, /* new */
  float touchDownTimestamp, /* new */
  float touchUpTimestamp, /* new */
  bool fadeBloopWhileListening /* new */
) {
  float breathingSequence = sin(args.time) * 0.5 + 0.5;
  float entryAnimation = fixedSpring(scaled(0.0, 3.0, args.duration), 0.9);

  float touch =
    fixedSpring(scaled(0.0, 1.0, args.time - touchDownTimestamp), 0.99) -
    fixedSpring(scaled(0.0, 0.8, args.time - touchUpTimestamp), 1.0);

  float listenAnimation = clamp(
    spring(scaled(0.0, 0.9, args.duration), 1.0),
    0.0,
    1.0
  );
  float radius = 0.0;
  float smoothlevel = micLevel;
  float l1 = smoothlevel;
  radius = 0.38 + l1 * 0.05 + breathingSequence * 0.03;
  radius *= 1.0 - (1.0 - entryAnimation) * 0.25;

  float ring = 10000.0;

  
  if (touch > 0.0) {
    touch = min(touch, listenAnimation); 
    float arcWidth = radius * 0.1;

    
    radius -= touch * arcWidth * 2.3;
    
    radius = min(
      radius,
      mix(radius, args.mainRadius - arcWidth * 2.3 - l1 * 0.01, touch)
    );

    float startAngle = 0.0;
    float arcLengthTouch =
      smoothstep(0.04, 1.0, touch) * pi * (1.0 - arcWidth / 3.0 / radius);

    float arcLength = 0.0;
    float radiusTouch =
      radius * fixedSpring(scaled(0.0, 1.0, args.duration), 1.0) * args.amount +
      l1 * 0.01;

    radiusTouch +=
      arcWidth * 1.3 * mix(-1.0, 1.0, smoothstep(0.0, 0.12, touch));

    float ringRadius = 0.0;
    arcLength = arcLengthTouch;
    ringRadius = radiusTouch;
    startAngle = pi / 2.0 - (args.time - touchDownTimestamp) / 2.0;

    ring = arc(args.st, startAngle, arcLength, ringRadius, arcWidth); 
  }

  float d = length(args.st) - radius;

  d = min(d, ring);

  sdf.distance = mix(sdf.distance, d, args.amount);

  if (fadeBloopWhileListening) {
    
    sdf.color.a = mix(
      sdf.color.a,
      mix(1.0, 1.0 - l1 * 0.6, listenAnimation),
      args.amount
    );
  } else {
    sdf.color.a = 1.0;
  }

  return sdf;
}

ColoredSDF applyThinkState(ColoredSDF sdf, SDFArgs args) {
  float d = 1000.0; 
  int count = 5; 
  float entryAnimation = spring(scaled(0.0, 1.0, args.duration), 1.0);

  float thinkingDotEntryAnimation = spring(
    scaled(0.1, 1.1, args.duration),
    1.0
  );
  float thinkingDotRadius =
    mix(0.2, 0.06, thinkingDotEntryAnimation) * args.amount;

  
  args.st.x -= thinkingDotRadius * 0.5 * thinkingDotEntryAnimation;

  for (int i = 0; i < count; i++) {
    float f = float(float(i) + 0.5) / float(count); 
    float a =
      -f * pi * 2.0 +
      args.time / 3.0 +
      spring(scaled(0.0, 10.0, args.duration), 1.0) * pi / 2.0;
    float ringRadi = args.mainRadius * 0.45 * entryAnimation;

    
    ringRadi -=
      (sin(
        entryAnimation * pi * 4.0 +
          a * pi * 2.0 +
          args.time * 3.0 -
          silkySmooth(args.time / 4.0, 2.0) * pi * 1.0
      ) *
        0.5 +
        0.5) *
      args.mainRadius *
      0.1;

    vec2 pos = vec2(cos(a), sin(a)) * ringRadi;
    float dd = length(args.st - pos) - args.mainRadius * 0.5;

    
    d = opSmoothUnion(
      d,
      dd,
      0.03 * scaled(0.0, 10.0, args.duration) + 0.8 * (1.0 - entryAnimation)
    );

    
    float dotAngle = f * pi * 2.0;
    float dotRingRadius =
      (sin(
        thinkingDotEntryAnimation * pi * 4.0 +
          a * pi * 2.0 +
          args.time * 0.1 * pi * 4.0
      ) *
        0.5 +
        0.5) *
      thinkingDotRadius *
      0.3;
    vec2 dotPos =
      vec2(-args.mainRadius, args.mainRadius) * 0.8 * thinkingDotEntryAnimation;
    vec2 dotOffset =
      vec2(cos(dotAngle + args.time), sin(dotAngle + args.time)) *
      dotRingRadius;
    float dotD = length(args.st - dotPos - dotOffset) - thinkingDotRadius * 0.8;
    d = opSmoothUnion(
      d,
      dotD,
      (1.0 - min(thinkingDotEntryAnimation, args.amount)) * thinkingDotRadius
    );
  }
  sdf.distance = mix(sdf.distance, d, args.amount);
  sdf.color.a = 1.0;
  return sdf;
}

ColoredSDF applySpeakState(
  ColoredSDF sdf,
  SDFArgs args,
  vec4 avgMag,
  float silenceAmount,
  float silenceDuration
) {
  float d = 1000.0;
  int barCount = 4;
  for (int i = 0; i < barCount; i++) {
    float f = float(float(i) + 0.5) / float(barCount); 

    
    float w = 1.0 / float(barCount) * 0.44;
    float h = w;

    
    float wave = sin(f * pi * 0.8 + args.time) * 0.5 + 0.5;
    float entryAnimation = spring(
      scaled(0.1 + wave * 0.4, 1.0 + wave * 0.4, args.duration),
      0.98
    );
    vec2 pos = vec2(f - 0.5, 0.0) * args.mainRadius * 1.9;
    pos.y = 0.25 * (1.0 - entryAnimation);

    
    if (silenceAmount > 0.0) {
      float bounceStagger = f / 5.0;
      float bounceDelay = 0.6;
      float bounceTimer = scaled(
        bounceDelay,
        bounceDelay + 1.0,
        fract((silenceDuration + bounceStagger) / 2.0) * 2.0
      );
      pos.y +=
        bounce(bounceTimer, 6.0) *
        w *
        0.25 *
        silenceAmount *
        pow(entryAnimation, 4.0) *
        pow(args.amount, 4.0); 
    }

    
    h += avgMag[i] * (0.1 + (1.0 - abs(f - 0.5) * 2.0) * 0.1);

    float dd = sdRoundedBox(args.st - pos, vec2(w, h), vec4(w));
    d = opSmoothUnion(d, dd, 0.2 * (1.0 - args.amount));

  }

  sdf.distance = mix(sdf.distance, d, args.amount);
  sdf.color.a = 1.0;
  return sdf;
}

ColoredSDF applyListenAndSpeakState(
  ColoredSDF sdf,
  SDFArgs args,
  float micLevel,
  vec4 avgMag,
  vec4 cumulativeAudio,
  int binCount,
  vec3 bloopColorMain,
  vec3 bloopColorLow,
  vec3 bloopColorMid,
  vec3 bloopColorHigh,
  sampler2D uTextureNoise,
  bool listening,
  bool isAdvancedBloop
) {
  float entryAnimation = fixedSpring(scaled(0.0, 2.0, args.duration), 0.92);

  
  
  float radius =
    (listening ? 0.37 : 0.43) * (1.0 - (1.0 - entryAnimation) * 0.25) +
    micLevel * 0.065;

  
  
  
  float maxDisplacement = 0.01;

  
  float oscillationPeriod = 4.0;
  
  float displacementOffset =
    maxDisplacement * sin(2.0 * pi / oscillationPeriod * args.time);
  
  vec2 adjusted_st = args.st - vec2(0.0, displacementOffset);

  
  if (!isAdvancedBloop) {
    sdf.color = mix(sdf.color, vec4(bloopColorMain, 1.0), args.amount);
    sdf.distance = mix(sdf.distance, length(adjusted_st) - radius, args.amount);
    return sdf;
  }

  
  
  vec4 uAudioAverage = avgMag;
  vec4 uCumulativeAudio = cumulativeAudio;

  
  float scaleFactor = 1.0 / (2.0 * radius);
  vec2 uv = adjusted_st * scaleFactor + 0.5;
  uv.y = 1.0 - uv.y;

  
  float noiseScale = 1.25; 
  float windSpeed = 0.075; 
  float warpPower = 0.19; 
  float waterColorNoiseScale = 18.0; 
  float waterColorNoiseStrength = 0.01; 
  float textureNoiseScale = 1.0; 
  float textureNoiseStrength = 0.08; 
  float verticalOffset = 0.09; 
  float waveSpread = 1.0; 
  float layer1Amplitude = 1.0; 
  float layer1Frequency = 1.0; 
  float layer2Amplitude = 1.0; 
  float layer2Frequency = 1.0; 
  float layer3Amplitude = 1.0; 
  float layer3Frequency = 1.0; 
  float fbmStrength = 1.0; 
  float fbmPowerDamping = 0.55; 
  float overallSoundScale = 1.0; 
  float blurRadius = 1.0;
  float timescale = 1.0;

  
  float time = args.time * timescale * 0.85;

  vec3 sinOffsets = vec3(
    uCumulativeAudio.x * 0.15 * overallSoundScale,
    -uCumulativeAudio.y * 0.5 * overallSoundScale,
    uCumulativeAudio.z * 1.5 * overallSoundScale
  );
  verticalOffset += 1.0 - waveSpread;

  
  float noiseX = cnoise(
    vec3(
      uv * 1.0 + vec2(0.0, 74.8572),
      (time + uCumulativeAudio.x * 0.05 * overallSoundScale) * 0.3
    )
  );
  float noiseY = cnoise(
    vec3(
      uv * 1.0 + vec2(203.91282, 10.0),
      (time + uCumulativeAudio.z * 0.05 * overallSoundScale) * 0.3
    )
  );

  uv += vec2(noiseX * 2.0, noiseY) * warpPower;

  
  float noiseA =
    cnoise(vec3(uv * waterColorNoiseScale + vec2(344.91282, 0.0), time * 0.3)) +
    cnoise(
      vec3(uv * waterColorNoiseScale * 2.2 + vec2(723.937, 0.0), time * 0.4)
    ) *
      0.5;
  uv += noiseA * waterColorNoiseStrength;
  uv.y -= verticalOffset;

  
  vec2 textureUv = uv * textureNoiseScale;
  float textureSampleR0 = texture(uTextureNoise, textureUv).r;
  float textureSampleG0 = texture(
    uTextureNoise,
    vec2(textureUv.x, 1.0 - textureUv.y)
  ).g;
  float textureNoiseDisp0 =
    mix(
      textureSampleR0 - 0.5,
      textureSampleG0 - 0.5,
      (sin(time + uCumulativeAudio.a * 2.0) + 1.0) * 0.5
    ) *
    textureNoiseStrength;
  textureUv += vec2(63.861 + uCumulativeAudio.x * 0.05, 368.937);
  float textureSampleR1 = texture(uTextureNoise, textureUv).r;
  float textureSampleG1 = texture(
    uTextureNoise,
    vec2(textureUv.x, 1.0 - textureUv.y)
  ).g;
  float textureNoiseDisp1 =
    mix(
      textureSampleR1 - 0.5,
      textureSampleG1 - 0.5,
      (sin(time + uCumulativeAudio.a * 2.0) + 1.0) * 0.5
    ) *
    textureNoiseStrength;
  textureUv += vec2(272.861, 829.937 + uCumulativeAudio.y * 0.1);
  textureUv += vec2(180.302 - uCumulativeAudio.z * 0.1, 819.871);
  float textureSampleR3 = texture(uTextureNoise, textureUv).r;
  float textureSampleG3 = texture(
    uTextureNoise,
    vec2(textureUv.x, 1.0 - textureUv.y)
  ).g;
  float textureNoiseDisp3 =
    mix(
      textureSampleR3 - 0.5,
      textureSampleG3 - 0.5,
      (sin(time + uCumulativeAudio.a * 2.0) + 1.0) * 0.5
    ) *
    textureNoiseStrength;
  uv += textureNoiseDisp0;

  
  vec2 st = uv * noiseScale;

  vec2 q = vec2(0.0);
  q.x = fbm(
    st * 0.5 +
      windSpeed * (time + uCumulativeAudio.a * 0.175 * overallSoundScale)
  );
  q.y = fbm(
    st * 0.5 +
      windSpeed * (time + uCumulativeAudio.x * 0.136 * overallSoundScale)
  );

  vec2 r = vec2(0.0);
  r.x = fbm(
    st +
      1.0 * q +
      vec2(0.3, 9.2) +
      0.15 * (time + uCumulativeAudio.y * 0.234 * overallSoundScale)
  );
  r.y = fbm(
    st +
      1.0 * q +
      vec2(8.3, 0.8) +
      0.126 * (time + uCumulativeAudio.z * 0.165 * overallSoundScale)
  );

  float f = fbm(st + r - q);
  float fullFbm = (f + 0.6 * f * f + 0.7 * f + 0.5) * 0.5;
  fullFbm = pow(fullFbm, fbmPowerDamping);
  fullFbm *= fbmStrength;

  
  blurRadius = blurRadius * 1.5;
  vec2 snUv =
    (uv + vec2((fullFbm - 0.5) * 1.2) + vec2(0.0, 0.025) + textureNoiseDisp0) *
    vec2(layer1Frequency, 1.0);
  float sn =
    noise(
      snUv * 2.0 + vec2(sin(sinOffsets.x * 0.25), time * 0.5 + sinOffsets.x)
    ) *
    2.0 *
    layer1Amplitude;
  float sn2 = smoothstep(
    sn - 1.2 * blurRadius,
    sn + 1.2 * blurRadius,
    (snUv.y - 0.5 * waveSpread) *
      (5.0 - uAudioAverage.x * 0.1 * overallSoundScale * 0.5) +
      0.5
  );

  vec2 snUvBis =
    (uv + vec2((fullFbm - 0.5) * 0.85) + vec2(0.0, 0.025) + textureNoiseDisp1) *
    vec2(layer2Frequency, 1.0);
  float snBis =
    noise(
      snUvBis * 4.0 +
        vec2(
          sin(sinOffsets.y * 0.15) * 2.4 + 293.0,
          time * 1.0 + sinOffsets.y * 0.5
        )
    ) *
    2.0 *
    layer2Amplitude;
  float sn2Bis = smoothstep(
    snBis - (0.9 + uAudioAverage.y * 0.4 * overallSoundScale) * blurRadius,
    snBis + (0.9 + uAudioAverage.y * 0.8 * overallSoundScale) * blurRadius,
    (snUvBis.y - 0.6 * waveSpread) * (5.0 - uAudioAverage.y * 0.75) + 0.5
  );

  vec2 snUvThird =
    (uv + vec2((fullFbm - 0.5) * 1.1) + textureNoiseDisp3) *
    vec2(layer3Frequency, 1.0);
  float snThird =
    noise(
      snUvThird * 6.0 +
        vec2(
          sin(sinOffsets.z * 0.1) * 2.4 + 153.0,
          time * 1.2 + sinOffsets.z * 0.8
        )
    ) *
    2.0 *
    layer3Amplitude;
  float sn2Third = smoothstep(
    snThird - 0.7 * blurRadius,
    snThird + 0.7 * blurRadius,
    (snUvThird.y - 0.9 * waveSpread) * 6.0 + 0.5
  );

  sn2 = pow(sn2, 0.8);
  sn2Bis = pow(sn2Bis, 0.9);

  
  vec3 sinColor;
  sinColor = blendLinearBurn_13_5(bloopColorMain, bloopColorLow, 1.0 - sn2);
  sinColor = blendLinearBurn_13_5(
    sinColor,
    mix(bloopColorMain, bloopColorMid, 1.0 - sn2Bis),
    sn2
  );
  sinColor = mix(
    sinColor,
    mix(bloopColorMain, bloopColorHigh, 1.0 - sn2Third),
    sn2 * sn2Bis
  );

  
  sdf.color = mix(sdf.color, vec4(sinColor, 1), args.amount);

  
  sdf.distance = mix(sdf.distance, length(adjusted_st) - radius, args.amount);

  return sdf;
}

float micSdf(vec2 st, float muted) {
  float d = 100.0;
  float strokeWidth = 0.03;
  vec2 elementSize = vec2(0.12, 0.26);
  vec2 elementPos = vec2(0.0, elementSize.y * 0.585);
  float element = sdRoundedBox(
    st - elementPos,
    elementSize,
    vec4(min(elementSize.x, elementSize.y))
  );
  element = element - strokeWidth;
  d = min(d, element);

  vec2 standSize = elementSize * 2.2;
  vec2 standPos = vec2(elementPos.x, elementPos.y - 0.05);
  st.y += 0.08;
  float ta = -pi / 2.0; 
  float tb = pi / 2.0; 
  float w = 0.0;
  float stand = sdArc(
    st - standPos,
    vec2(sin(ta), cos(ta)),
    vec2(sin(tb), cos(tb)),
    standSize.x,
    w
  );
  stand = min(
    stand,
    sdSegment(st - standPos, vec2(standSize.x, 0.06), vec2(standSize.x, 0.0))
  );
  stand = min(
    stand,
    sdSegment(st - standPos, vec2(-standSize.x, 0.06), vec2(-standSize.x, 0.0))
  );

  float foot = sdSegment(
    st - standPos,
    vec2(0.0, -standSize.x),
    vec2(0.0, -standSize.x * 1.66)
  );
  foot = min(
    foot,
    sdSegment(
      st - standPos,
      vec2(-standSize.x * 0.68, -standSize.x * 1.66),
      vec2(standSize.x * 0.68, -standSize.x * 1.66)
    )
  );
  stand = min(stand, foot);

  d = min(d, abs(stand) - strokeWidth);

  return d;
}

ColoredSDF applyBottomAlignedBarsAndMicState(
  ColoredSDF sdf,
  SDFArgs args,
  vec4 avgMag,
  float micLevel,
  bool isDarkMode
) {
  float d = 1000.0;
  int barCount = 5;
  int loopCount = barCount;
  if (args.amount == 0.0) {
    loopCount = 1; 
  }
  for (int i = 0; i < loopCount; i++) {
    float f = float(float(i) + 0.5) / float(barCount); 

    
    float w = 1.0 / float(barCount) * 0.42;
    float h = w;

    
    float entryDuration = 1.8;
    float entryAnimation =
      fixedSpring(scaled(0.0, entryDuration, args.duration), 0.94) *
      args.amount;
    vec2 pos = vec2(f - 0.5, 0.0) * args.mainRadius * 1.9;
    pos.x *= entryAnimation;

    if (i == 0) {
      float micScale = mix(6.0 - micLevel * 2.0, 6.0, args.amount);
      float yOffset = w * 2.0;
      d =
        micSdf(
          (args.st - pos + vec2(-w * 0.15 * args.amount, yOffset)) * micScale,
          1.0 - args.amount
        ) /
        micScale;
    } else {
      
      h += avgMag[i - 1] * (0.1 + (1.0 - abs(f - 0.5) * 2.0) * 0.1) * 0.7;
      h = mix(w, h, smoothstep(0.8, 1.0, entryAnimation));

      float bubbleInDur = 0.5;
      float bubbleOutDur = 0.4;

      
      float bubbleEffect =
        fixedSpring(
          scaled(
            f / 4.0,
            f / 4.0 + bubbleInDur,
            args.duration - entryDuration / 8.0
          ),
          1.0
        ) *
        pow(
          1.0 -
            scaled(
              f / 8.0 + bubbleInDur / 8.0,
              f / 4.0 + bubbleInDur / 8.0 + bubbleOutDur,
              args.duration - entryDuration / 8.0
            ),
          2.0
        );

      h += bubbleEffect * min(h, w);

      
      w *= args.amount;
      h *= args.amount;

      h = min(h, 0.23); 

      pos.y -= 0.25;
      pos.y += h;
      pos.y += bubbleEffect * w * 0.5;

      float dd = sdRoundedBox(args.st - pos, vec2(w, h), vec4(w));
      d = min(d, dd);
    }
  }

  sdf.distance = d; 
  sdf.color = mix(
    sdf.color,
    isDarkMode
      ? vec4(1.0)
      : vec4(0.0, 0.0, 0.0, 1.0),
    args.amount
  );
  return sdf;
}

ColoredSDF applyHaltState(ColoredSDF sdf, SDFArgs args) {
  
  float radius = mix(
    0.4,
    mix(0.4, 0.45, args.amount),
    sin(args.time * 0.25) * 0.5 + 0.5
  );
  float strokeWidth = mix(radius / 2.0, 0.02, args.amount);

  
  radius -= strokeWidth;

  radius *= mix(0.7, 1.0, args.amount);
  float circle = abs(length(args.st) - radius) - strokeWidth;

  sdf.distance = mix(sdf.distance, circle, args.amount);
  sdf.color.a = mix(sdf.color.a, pow(0.8, 2.2), scaled(0.5, 1.0, args.amount));
  return sdf;
}

vec3 blendNormal(vec3 base, vec3 blend) {
  return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
  return blendNormal(base, blend) * opacity + base * (1.0 - opacity);
}

in vec2 out_uv;
out vec4 fragColor;

layout(std140) uniform BlorbUniformsObject {
  float time;
  float micLevel;
  float touchDownTimestamp;
  float touchUpTimestamp;
  float stateListen;
  float listenTimestamp;
  float stateThink;
  float thinkTimestamp;
  float stateSpeak;
  float speakTimestamp;
  float readyTimestamp;
  float stateHalt;
  float haltTimestamp;
  float stateFailedToConnect;
  float failedToConnectTimestamp;
  vec4 avgMag;
  vec4 cumulativeAudio;
  vec2 viewport;
  float screenScaleFactor;
  float silenceAmount;
  float silenceTimestamp;
  bool isDarkMode;
  bool fadeBloopWhileListening;
  bool isNewBloop;
  bool isAdvancedBloop;
  vec3 bloopColorMain;
  vec3 bloopColorLow;
  vec3 bloopColorMid;
  vec3 bloopColorHigh;
} ubo; 

uniform sampler2D uTextureNoise; 

void main() {
  vec2 st = out_uv - 0.5;
  float viewRatio = ubo.viewport.y / ubo.viewport.x;
  st.y *= viewRatio;

  ColoredSDF sdf;
  sdf.distance = 1000.0;
  sdf.color = vec4(1.0);

  SDFArgs args;
  args.st = st;
  args.time = ubo.time;
  args.mainRadius = 0.49;

  SDFArgs idleArgs = args;
  SDFArgs listenArgs = args;
  SDFArgs thinkArgs = args;
  SDFArgs speakArgs = args;
  SDFArgs haltArgs = args;
  SDFArgs failedToConnectArgs = args;

  idleArgs.amount = 1.0;
  listenArgs.amount = ubo.stateListen;
  thinkArgs.amount = ubo.stateThink;
  speakArgs.amount = ubo.stateSpeak;
  haltArgs.amount = ubo.stateHalt;
  failedToConnectArgs.amount = ubo.stateFailedToConnect;

  idleArgs.duration = ubo.time - ubo.readyTimestamp;
  listenArgs.duration = ubo.time - ubo.listenTimestamp;
  thinkArgs.duration = ubo.time - ubo.thinkTimestamp;
  speakArgs.duration = ubo.time - ubo.speakTimestamp;
  haltArgs.duration = ubo.time - ubo.haltTimestamp;
  failedToConnectArgs.duration = ubo.time - ubo.failedToConnectTimestamp;

  if (ubo.isNewBloop) {
    sdf = applyIdleState(sdf, idleArgs, ubo.isDarkMode);
  } else {
    sdf = applyIdleStateLegacy(sdf, idleArgs, ubo.isDarkMode);
  }

  if (failedToConnectArgs.amount > 0.0) {
    sdf = applyHaltState(sdf, failedToConnectArgs);
  }

  if (listenArgs.amount > 0.0) {
    if (ubo.isAdvancedBloop) {
      if (speakArgs.amount > 0.0) {
        listenArgs.amount = 1.0;
      }

      
      int binCount = 1;
      sdf = applyListenAndSpeakState(
        sdf,
        listenArgs,
        ubo.micLevel,
        ubo.avgMag,
        ubo.cumulativeAudio,
        binCount,
        ubo.bloopColorMain,
        ubo.bloopColorLow,
        ubo.bloopColorMid,
        ubo.bloopColorHigh,
        uTextureNoise,
        true,
        ubo.isAdvancedBloop
      );
    } else {
      sdf = applyListenState(
        sdf,
        listenArgs,
        ubo.micLevel,
        ubo.listenTimestamp,
        ubo.touchDownTimestamp,
        ubo.touchUpTimestamp,
        ubo.fadeBloopWhileListening
      );
    }
  }

  if (thinkArgs.amount > 0.0) {
    sdf = applyThinkState(sdf, thinkArgs);
  }

  if (speakArgs.amount > 0.0) {
    if (ubo.isAdvancedBloop) {
      int binCount = 1;
      sdf = applyListenAndSpeakState(
        sdf,
        speakArgs,
        ubo.micLevel,
        ubo.avgMag,
        ubo.cumulativeAudio,
        binCount,
        ubo.bloopColorMain,
        ubo.bloopColorLow,
        ubo.bloopColorMid,
        ubo.bloopColorHigh,
        uTextureNoise,
        false,
        ubo.isAdvancedBloop
      );
    } else {
      float silenceDuration = ubo.time - ubo.silenceTimestamp;
      sdf = applySpeakState(
        sdf,
        speakArgs,
        ubo.avgMag,
        ubo.silenceAmount,
        silenceDuration
      );
    }
  }

  if (haltArgs.amount > 0.0) {
    sdf = applyHaltState(sdf, haltArgs);
  }

  float clampingTolerance = 0.0075 / ubo.screenScaleFactor;
  float clampedShape = smoothstep(clampingTolerance, 0.0, sdf.distance);
  float alpha = sdf.color.a * clampedShape;
  if (!ubo.isNewBloop) {
    alpha *= scaled(0.0, 1.0, ubo.time);
  }
  fragColor = vec4(sdf.color.rgb * alpha, alpha);
}`,Fi=`#version 300 es

out vec4 out_position;
out vec2 out_uv;

const vec4 blitFullscreenTrianglePositions[6] = vec4[](
  vec4(-1.0, -1.0, 0.0, 1.0),
  vec4(3.0, -1.0, 0.0, 1.0),
  vec4(-1.0, 3.0, 0.0, 1.0),
  vec4(-1.0, -1.0, 0.0, 1.0),
  vec4(3.0, -1.0, 0.0, 1.0),
  vec4(-1.0, 3.0, 0.0, 1.0)
);

void main() {
  out_position = blitFullscreenTrianglePositions[gl_VertexID];
  out_uv = out_position.xy * 0.5 + 0.5;
  out_uv.y = 1.0 - out_uv.y;
  gl_Position = out_position;
}`;class Je{#o;#a;#e;#r=[];#i={};#n;#t;static#s="BlorbUniformsObject";constructor(n,t){this.#e=n;const o=n.getUniformBlockIndex(t,Je.#s),r=n.getActiveUniformBlockParameter(t,o,n.UNIFORM_BLOCK_DATA_SIZE);this.#n=n.createBuffer(),n.bindBuffer(n.UNIFORM_BUFFER,this.#n),n.bufferData(n.UNIFORM_BUFFER,r,n.DYNAMIC_DRAW);const i=0;n.bindBufferBase(n.UNIFORM_BUFFER,i,this.#n),n.uniformBlockBinding(t,o,i);const a=n.getActiveUniformBlockParameter(t,o,n.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES);this.#r=[],this.#i={};for(let s=0;s<a.length;s++){const c=a[s],l=n.getActiveUniform(t,c);if(!l)throw new Error("No uniformInfo for index "+c);let f=l.name;f=f.replace(/\[0\]$/,"");const m=n.getActiveUniforms(t,[c],n.UNIFORM_OFFSET)[0];this.#r.push(f),this.#i[f]=m}this.#t=new ArrayBuffer(r),this.#o=new Float32Array(this.#t),this.#a=new Int32Array(this.#t)}setVariablesAndRender(n){for(const t of this.#r){const[,o]=t.split("."),i=this.#i[t]/4,a=n[o];typeof a=="number"?this.#o[i]=a:typeof a=="boolean"?this.#a[i]=a?1:0:Array.isArray(a)&&this.#o.set(a,i)}this.#e.bindBuffer(this.#e.UNIFORM_BUFFER,this.#n),this.#e.bufferSubData(this.#e.UNIFORM_BUFFER,0,this.#t),this.#e.drawArrays(this.#e.TRIANGLE_STRIP,0,6)}}function P(e){const n=e.replace("#",""),t=parseInt(n.substring(0,2),16)/255,o=parseInt(n.substring(2,4),16)/255,r=parseInt(n.substring(4,6),16)/255;return new Float32Array([t,o,r])}const ie={BLUE:{bloopColorMain:P("#DCF7FF"),bloopColorLow:P("#0181FE"),bloopColorMid:P("#A4EFFF"),bloopColorHigh:P("#FFFDEF")},DARK_BLUE:{bloopColorMain:P("#DAF5FF"),bloopColorLow:P("#0066CC"),bloopColorMid:P("#2EC6F5"),bloopColorHigh:P("#72EAF5")},GREYSCALE:{bloopColorMain:P("#D7D7D7"),bloopColorLow:P("#303030"),bloopColorMid:P("#989898"),bloopColorHigh:P("#FFFFFF")},WHITE:{bloopColorMain:P("#FFFFFF"),bloopColorLow:P("#FFFFFF"),bloopColorMid:P("#FFFFFF"),bloopColorHigh:P("#FFFFFF")},BLACK:{bloopColorMain:P("#000000"),bloopColorLow:P("#000000"),bloopColorMid:P("#000000"),bloopColorHigh:P("#000000")},ANGSTY_BLACK:{bloopColorMain:P("#494949"),bloopColorLow:P("#000000"),bloopColorMid:P("#7F7F7F"),bloopColorHigh:P("#696969")}},Li=({isAdvanced:e,overrideColor:n})=>{const t=Fn();return n&&ie[n]?ie[n]:e?ie.BLUE:t?ie.WHITE:ie.BLACK},Ni=()=>On().some(n=>n.voice==="shade"),Cn=Vt.JumpToShade,Oi=()=>{const e=sn.getItem(Cn)==="true",n=u.useCallback(()=>{sn.setItem(Cn,"true")},[]);return{alreadyTriggered:e,setAlreadyTriggered:n}};function Ui(){let e=null,n,t=0;const o=350;let r;const i=(s,c,l)=>s+(c-s)*l,a=(s,c)=>{if(s.length!==c.length)return!1;for(let l=0;l<s.length;l++)if(s[l]!==c[l])return!1;return!0};return function(c){const l=performance.now();if(!e)return n={bloopColorMain:new Float32Array(c.bloopColorMain),bloopColorLow:new Float32Array(c.bloopColorLow),bloopColorMid:new Float32Array(c.bloopColorMid),bloopColorHigh:new Float32Array(c.bloopColorHigh)},e={bloopColorMain:new Float32Array(c.bloopColorMain),bloopColorLow:new Float32Array(c.bloopColorLow),bloopColorMid:new Float32Array(c.bloopColorMid),bloopColorHigh:new Float32Array(c.bloopColorHigh)},t=l,r=n,r;let f=!1;const m=["bloopColorMain","bloopColorLow","bloopColorMid","bloopColorHigh"];for(const h of m)if(!a(c[h],e[h])){f=!0;break}f&&(n={bloopColorMain:new Float32Array(r.bloopColorMain),bloopColorLow:new Float32Array(r.bloopColorLow),bloopColorMid:new Float32Array(r.bloopColorMid),bloopColorHigh:new Float32Array(r.bloopColorHigh)},t=l,e={bloopColorMain:new Float32Array(c.bloopColorMain),bloopColorLow:new Float32Array(c.bloopColorLow),bloopColorMid:new Float32Array(c.bloopColorMid),bloopColorHigh:new Float32Array(c.bloopColorHigh)});let b=(l-t)/o;b>1&&(b=1);const d={bloopColorMain:new Float32Array(n.bloopColorMain.length),bloopColorLow:new Float32Array(n.bloopColorLow.length),bloopColorMid:new Float32Array(n.bloopColorMid.length),bloopColorHigh:new Float32Array(n.bloopColorHigh.length)};for(const h of m){const p=n[h].length;for(let g=0;g<p;g++){const v=n[h][g],y=c[h][g];d[h][g]=i(v,y,b)}}return r=d,d}}const An=[300,300],zi={bands:4,loPass:0,hiPass:400},Vi=e=>{const n=t=>{let i=1-Math.max(-100,Math.min(-10,t))*-1/100;return i=Math.sqrt(i),i};return e.map(t=>t===-1/0?0:n(t))};function Ct(e,n){const[t,o]=u.useState([]),r=u.useRef(void 0);return u.useEffect(()=>{if(!e)return;if(!r.current){const m=new AudioContext,b=m.createMediaElementSource(e),d=m.createAnalyser();b.connect(d),d.connect(m.destination),r.current={audioContext:m,mediaElementAudioSourceNode:b,analyserNode:d}}const{analyserNode:i,audioContext:a}=r.current,s=i?.frequencyBinCount??0,c=new Float32Array(s),f=setInterval(()=>{if(!i)return;i.getFloatFrequencyData(c);let m=c.slice(n.loPass,n.hiPass);const b=Vi(m),d=Math.ceil(b.length/n.bands),h=[];for(let p=0;p<n.bands;p++){const g=b.slice(p*d,(p+1)*d).reduce((v,y)=>v+y,0);h.push(g/d)}o(h)},n.updateInterval);return()=>{clearInterval(f),a&&a.close()}},[e,n.bands,n.hiPass,n.loPass,n.updateInterval]),t}const Bi=e=>{const n=Ct(e,{bands:Ke,updateInterval:ke,loPass:0,hiPass:400,analyserOptions:{fftSize:bt}});return n.length===0?yt:n},ji=(e,n)=>{const t=Bi(e),o=St(t,{sampleRate:wt,binCount:n.bins,bandCount:n.bands,gainMultipliers:n.gainMultipliers}),r=Xe({magnitudes:t,binCount:1,gainMultiplier:1});return{bandMagnitudes:o,cumulativeMagnitude:r}},qi=e=>{const[n,t]=u.useState({audioData:[0,0,0,0],cumulativeAudioData:[0,0,0,0]}),o=u.useRef([0,0,0,0]),r=u.useRef(void 0),i=u.useRef(performance.now()),{bandMagnitudes:a,cumulativeMagnitude:s}=ji(e,{bands:3,bins:1,gainMultipliers:[10,1,1]});o.current=[...a,s].flat();const c=u.useCallback(()=>{const l=performance.now(),f=(l-i.current)/1e3;i.current=l;const m=o.current,{audioData:b,cumulativeAudioData:d}=n,h=gi({deltaTimeS:f,audioDataRaw:m,prevAudioData:b,prevCumulativeAudioData:d});t(h)},[n]);return u.useEffect(()=>(r.current||(r.current=window.setInterval(c,ke)),()=>{clearInterval(r.current),r.current=void 0}),[c]),n},Tn=Promise.resolve();function At({url:e,readyToPlay:n}){const t=u.useRef(void 0),o=u.useRef(Tn);return u.useEffect(()=>(t.current||(t.current=document.createElement("audio")),()=>{o.current.then(()=>{t.current&&(t.current.pause(),t.current.removeAttribute("src"),t.current.remove(),o.current=Tn)})}),[]),u.useEffect(()=>{e&&t.current&&t.current.src!==e&&n&&o.current.then(()=>{t.current&&(t.current.crossOrigin="anonymous",t.current.src=e,o.current=t.current.play())})},[n,e]),t.current}function Hi({className:e,url:n}){const[t,o]=u.useState(!1),r=At({url:n,readyToPlay:t}),i=Ct(r,zi),a=u.useMemo(()=>[0,0,0,0],[]);return w.jsx(Tt,{className:e,isAdvanced:!1,avgMag:i,cumulativeAudioData:a,onRenderComplete:()=>o(!0)})}function Wi({className:e,url:n,overrideColor:t}){const[o,r]=u.useState(!1),i=At({url:n,readyToPlay:o}),a=qi(i),{audioData:s,cumulativeAudioData:c}=a;return w.jsx(Tt,{className:e,isAdvanced:!0,overrideColor:t,avgMag:s,cumulativeAudioData:c,onRenderComplete:()=>r(!0)})}const Tt=({className:e,avgMag:n,cumulativeAudioData:t,isAdvanced:o,overrideColor:r,onRenderComplete:i})=>{const a=Fn(),s=u.useMemo(()=>performance.now()/1e3,[]),c=u.useMemo(()=>performance.now()/1e3,[]),l=u.useRef(void 0),f=u.useRef(Ui()),[m,b]=u.useState(An),{canvasSizeRef:d,handleCanvasSizeUpdate:h}=co(An),p=u.useCallback(k=>{b([k.width,k.height])},[]),[g,v]=u.useState(performance.now()/1e3);u.useEffect(()=>{const k=setInterval(()=>{v(performance.now()/1e3)},ke);return()=>clearInterval(k)},[]);const y=Li({isAdvanced:o,overrideColor:r}),S=f.current(y),_=Kr({viewport:m,canvasSize:d.current,shouldMeasurePerf:!0,source:"VoicePicker"}),x=Qr({shouldCalibrate:!0,viewport:m,initialScale:1});return l.current={time:g,micLevel:0,stateListen:0,listenTimestamp:0,stateThink:0,thinkTimestamp:0,stateSpeak:1,speakTimestamp:c,readyTimestamp:s,stateHalt:0,haltTimestamp:0,touchDownTimestamp:0,touchUpTimestamp:0,stateFailedToConnect:0,failedToConnectTimestamp:0,avgMag:n,cumulativeAudio:t,isNewBloop:!0,isAdvancedBloop:o,bloopColorMain:Array.from(S.bloopColorMain),bloopColorLow:Array.from(S.bloopColorLow),bloopColorMid:Array.from(S.bloopColorMid),bloopColorHigh:Array.from(S.bloopColorHigh),isDarkMode:a,screenScaleFactor:window.devicePixelRatio,viewport:m,silenceAmount:0,silenceTimestamp:0,fadeBloopWhileListening:!1},w.jsx(yi,{className:ee("flex items-center justify-center",e),variablesRef:l,onViewportUpdate:p,onRenderComplete:i,textureImage:xt,textureName:"uTextureNoise",onGlAvailable:_,onCanvasSizeUpdate:h,scale:x,GLUniformsSetter:Je,vert:Fi,frag:Ri})};function Gi({isUnauthenticated:e,loading:n,handleLoginClick:t,handleCancelClick:o,handleConfirmClick:r,selectedVoice:i,currentVoiceName:a,cameFromNux:s}){const c="w-52 whitespace-nowrap rounded-full px-20 py-3 font-semibold";return e?w.jsxs(w.Fragment,{children:[w.jsx(ge,{className:ee(c,"text-white"),onClick:t,children:n?w.jsx(cn,{}):w.jsx(Q,{id:"IRALWH",defaultMessage:"Log in"})}),w.jsx(ge,{className:ee(c,"text-black dark:text-white"),color:"ghost",onClick:o,children:w.jsx(Q,{id:"8fumUc",defaultMessage:"Back to chat"})})]}):w.jsxs(w.Fragment,{children:[w.jsx(ge,{className:ee(c,"text-white"),onClick:r,children:n?w.jsx(cn,{}):i?.voice===a&&!s?w.jsx(Q,{id:"MyKAgb",defaultMessage:"Done"}):w.jsx(Q,{id:"7+3LaJ",defaultMessage:"Start new chat"})}),w.jsx(ge,{className:ee(c,"text-black dark:text-white"),color:"ghost",onClick:o,children:w.jsx(Q,{id:"dUn4Wd",defaultMessage:"Cancel"})})]})}const $i={offscreenLeft:{x:"-24rem",opacity:0},left:{x:"-12rem",opacity:.5},center:{x:"0",opacity:1},right:{x:"12rem",opacity:.5},offscreenRight:{x:"24rem",opacity:0}};function da({conversationId:e,onClose:n,cameFromNux:t=!1,initialVoiceName:o}){const{isUnauthenticated:r}=Bt(),i=eo(),{voiceName:a}=qe(),s=On(),[c,l]=u.useState(!1),f=Oe.getGizmoId(Ue(e)),[m,b]=u.useState(!1),[d,h]=u.useState(!1);u.useEffect(()=>{requestAnimationFrame(()=>b(!0))},[]);const[p,g]=u.useState(!1),[v,y]=u.useState(null);u.useEffect(()=>{if(s.length>0){const R=s.findIndex(J=>J.voice===(o||a));R>=0?y(R):y(2),g(!0)}},[s,a,o]);const S=v!=null?(v-2+s.length)%s.length:0,_=v!=null?(v-1+s.length)%s.length:1,x=v!=null?(v+1)%s.length:3,k=v!=null?(v+2)%s.length:4,C=s[v??0],I=s[S],O=s[_],L=s[x],E=s[k],M=Ni(),{alreadyTriggered:Y,setAlreadyTriggered:W}=Oi();u.useEffect(()=>{if(M&&!Y){const R=s.findIndex(J=>J.voice==="shade");R!==-1&&(y(R),W())}return()=>{M&&W()}},[M,Y,s,y,W]);const pe=u.useMemo(()=>{if(M&&C?.voice==="shade")return"ANGSTY_BLACK"},[C?.voice,M]),K=R=>{y(R)},{stopVoiceMode:ve,startVoiceMode:he}=$r({requestMicPermissions:t}),{setValue:me}=oo(jt.VoiceName),G=j(R=>R.voiceMode),X=t&&!f?"advanced":G,_t=u.useCallback(()=>{h(!t),setTimeout(()=>{const R=v!=null?s[v]?.voice:s[0]?.voice;sessionStorage.setItem("selectedVoiceName",R),i({authType:"login",callback:J=>{qt.logLogInButtonClicked({provider:J,location:"Voice Picker Page"})}})},Ee)},[t,i,v,s]),kt=u.useCallback(async()=>{h(!t),setTimeout(async()=>{l(!0);const R=v!=null?s[v]?.voice:s[0]?.voice;if(t||R!==a){t||D.voiceSelected.click({action:"changed",voice:R}),me(R),await ve(),Nn("/");try{await he({conversation_id:void 0,eventSource:"voice_picker",voice_mode:X,voice:R,clientThreadId:Ht(),gizmo_id:Oe.getGizmoId(Ue(e))})}catch(J){Wt.addError(`Failed to start voice mode after voice picker: ${J}`)}}else D.voiceSelected.click({action:"kept",voice:a});l(!1),n()},Ee)},[t,e,a,n,v,me,he,ve,X,s]),Et=()=>{h(!0),setTimeout(n,Ee)};no({setSelectedVoiceIndex:y,prevVoiceIndex:_,nextVoiceIndex:x});const[Qe,Ze]=u.useState(!1),en=R=>{R==="prev"?K(_):R==="next"&&K(x),Ze(!0),setTimeout(()=>{Ze(!1)},175)},nn=u.useMemo(()=>({className:"h-max min-h-bloop w-max min-w-bloop",url:C?.preview_url}),[C?.preview_url]);return!p||v==null?w.jsx("div",{className:"bg-token-main-surface-primary fixed start-0 top-0 z-50 flex h-full w-full"}):w.jsxs("div",{className:`fixed start-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-white transition-opacity duration-300 dark:bg-gray-800 ${m&&!d?"opacity-100":"opacity-0"}`,children:[w.jsx("h1",{className:"mt-36 mb-8 text-3xl font-semibold",children:r?w.jsx(Q,{id:"P4GR/e",defaultMessage:"Try voice mode for free"}):w.jsx(Q,{id:"2whyE9",defaultMessage:"Choose a voice"})}),w.jsx("div",{className:"flex h-full w-full items-center justify-center",children:C?t&&!f||X==="advanced"?w.jsx(Wi,{...nn,overrideColor:pe}):w.jsx(Hi,{...nn}):null}),w.jsx("div",{className:"mb-8 flex items-center justify-between text-center",children:w.jsxs("div",{className:"relative flex h-24 w-48",children:[w.jsx(ae,{voice:I,variant:"offscreenLeft"},I?.name),w.jsx(ae,{voice:O,variant:"left",onClick:()=>K(_)},O?.name),w.jsx(_n,{direction:"prev",onClick:()=>en("prev"),isFading:Qe}),w.jsx(ae,{voice:C,variant:"center"},C?.name),w.jsx(_n,{direction:"next",onClick:()=>en("next"),isFading:Qe}),w.jsx(ae,{voice:L,variant:"right",onClick:()=>K(x)},L?.name),w.jsx(ae,{voice:E,variant:"offscreenRight"},E?.name),w.jsx("div",{className:"pointer-events-none absolute h-full w-full -translate-x-52 transform bg-linear-to-r from-[var(--main-surface-background)] to-transparent"}),w.jsx("div",{className:"pointer-events-none absolute h-full w-full translate-x-52 transform bg-linear-to-l from-[var(--main-surface-background)] to-transparent"}),w.jsx("div",{className:"pointer-events-none absolute h-full w-full -translate-x-96 transform bg-white dark:bg-gray-800"}),w.jsx("div",{className:"pointer-events-none absolute h-full w-full translate-x-96 transform bg-white dark:bg-gray-800"})]})}),w.jsx("div",{className:"mb-36 flex flex-col space-y-3",children:w.jsx(Gi,{isUnauthenticated:r,loading:c,handleLoginClick:_t,handleCancelClick:Et,handleConfirmClick:kt,selectedVoice:C,currentVoiceName:a,cameFromNux:t})})]})}function ae({voice:e,variant:n,onClick:t}){return w.jsxs(Mt.button,{onClick:t,className:"absolute flex w-48 flex-col items-center justify-center select-none",variants:$i,animate:n,initial:n,transition:{duration:.25,ease:"easeInOut"},children:[w.jsx("p",{className:`text-lg ${n==="center"?"font-semibold":""}`,children:e?.name}),w.jsx("p",{className:"text-sm text-gray-600 dark:text-[var(--text-secondary)]",children:e?.description})]})}function _n({direction:e,onClick:n,isFading:t}){const o=e==="prev"?to:Gt,r=En(),i=e==="prev"?r.formatMessage({id:"ajuz05",defaultMessage:"Previous voice"}):r.formatMessage({id:"Dr8wrw",defaultMessage:"Next voice"});return w.jsx("button",{className:ee("absolute top-2 z-50 transition-opacity duration-175",e==="prev"?"-start-4":"-end-4",t?"opacity-20":"opacity-100"),onClick:n,"aria-label":i,children:w.jsx(o,{className:"text-token-text-quaternary hover:text-token-text-secondary h-6 w-6"})})}export{Ar as $,Oi as A,ke as B,ia as C,aa as D,ca as E,ft as F,yi as G,ra as I,ea as N,na as O,mn as R,xo as S,da as V,sa as W,Mr as X,ta as Y,Te as _,j as a,$r as b,mo as c,H as d,wo as e,zr as f,la as g,Zi as h,jn as i,bo as j,yo as k,ua as l,N as m,Li as n,Kr as o,Qr as p,xt as q,Bn as r,gi as s,Je as t,U as u,Fi as v,Ri as w,Co as x,oa as y,Ni as z};
//# sourceMappingURL=bqem6ejvvuwllmce.js.map
