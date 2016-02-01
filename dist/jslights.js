(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=undefined;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var EventEmitter=require("wolfy87-eventemitter");var ModuleEventEmitter=function(_EventEmitter){_inherits(ModuleEventEmitter,_EventEmitter);function ModuleEventEmitter(){_classCallCheck(this,ModuleEventEmitter);_get(Object.getPrototypeOf(ModuleEventEmitter.prototype),"constructor",this).apply(this,arguments)}_createClass(ModuleEventEmitter,[{key:"on",value:function on(evt,listener){_get(Object.getPrototypeOf(ModuleEventEmitter.prototype),"on",this).call(this,evt,listener);return{evt:evt,listener:listener}}},{key:"trigger",value:function trigger(evt,args){var arr=[];arr.push(args);args=arr;if(window.jsLights.monitor){this._monitoring(evt,args)}else{_get(Object.getPrototypeOf(ModuleEventEmitter.prototype),"trigger",this).call(this,evt,args)}this._registerTrigger(evt)}},{key:"unbind",value:function unbind(eventObj){if(!eventObj){return}_get(Object.getPrototypeOf(ModuleEventEmitter.prototype),"off",this).call(this,eventObj.evt,eventObj.listener)}},{key:"_monitoring",value:function _monitoring(evt,args){var start=performance.now();_get(Object.getPrototypeOf(ModuleEventEmitter.prototype),"trigger",this).call(this,evt,args);var end=performance.now();var time=end-start;var path=this.constructor.name;if(path=="jsLights"){path=evt}else{if(this.jsLights&&this.jsLights.path){path=this.jsLights.path}path+="->"+evt}if(!window.jsLights._monitStats[path]){window.jsLights._monitStats[path]={executed:0,totalExecTime:0}}var c=window.jsLights._monitStats[path];c.totalExecTime+=time;c.executed++;c.avgExecTime=c.totalExecTime/c.executed;c.totalExecTime=parseFloat(c.totalExecTime.toFixed(2));c.avgExecTime=parseFloat(c.avgExecTime.toFixed(2));if(!this._events)c.listeners=0;else c.listeners=Object.keys(this._events).length}},{key:"_registerTrigger",value:function _registerTrigger(evt){if(!this.jsLights){this.jsLights={}}if(!this.jsLights.triggered){this.jsLights.triggered={}}if(this.jsLights.triggered[evt]!==undefined){this.jsLights.triggered[evt]++}else{this.jsLights.triggered[evt]=1}}}]);return ModuleEventEmitter}(EventEmitter);var jsLights=function(_ModuleEventEmitter){_inherits(jsLights,_ModuleEventEmitter);function jsLights(){var _this=this;_classCallCheck(this,jsLights);_get(Object.getPrototypeOf(jsLights.prototype),"constructor",this).call(this);this.triggered=[];this._beforeDependency={};if(document.body){this.triggered.push("onDocumentReady")}else{document.addEventListener("DOMContentLoaded",function(){_this.registerEvent("onDocumentReady")})}}_createClass(jsLights,[{key:"assign",value:function assign(path,reference,dependency){this._onPassedDependencies({path:path,dependency:dependency},function(){return reference})}},{key:"register",value:function register(path,reference){var jsLights=this;return new(function(){function _class(){_classCallCheck(this,_class);this._after=[];this.path=path;this.reference=reference}_createClass(_class,[{key:"after",value:function after(path){if(typeof path=="string")this._after.push(path);else if(Array.isArray(path))this._after=this._after.concat(path);return this}},{key:"before",value:function before(path){if(jsLights.triggered.indexOf(path)!=-1){throw new Error(path+" is already trigger")}if(jsLights._beforeDependency[path]){if(jsLights._beforeDependency[path].indexOf(this.path)==-1){jsLights._beforeDependency[path].push(this.path)}}else{jsLights._beforeDependency[path]=[this.path]}return this}},{key:"instantiate",value:function instantiate(params){var _this2=this;jsLights._onPassedDependencies({path:this.path,override:params&&params.override?params.override:this.override,dependency:this._after},function(){return new _this2.reference(params)});return this}},{key:"execute",value:function execute(params){var _this3=this;jsLights._onPassedDependencies({path:this.path,override:params&&params.override?params.override:this.override,dependency:this._after},function(){return _this3.reference(params)});return this}},{key:"assign",value:function assign(params){var _this4=this;jsLights._onPassedDependencies({path:this.path,override:params&&params.override?params.override:this.override,dependency:this._after},function(){return _this4.reference});return this}}]);return _class}())}},{key:"override",value:function override(path,reference){var register=this.register(path,reference);register.override=true;register._after.push(path);return register}},{key:"instantiate",value:function instantiate(path,reference,dependency){this._onPassedDependencies({path:path,dependency:dependency},function(){return new reference})}},{key:"onPathInstantiated",value:function onPathInstantiated(path,cb){if(this.triggered.indexOf(path)!=-1){cb()}else{var self=this;this.once(path,function(){cb()})}}},{key:"_assign",value:function _assign(path,cb){var _this5=this;if(this._beforeDependency[path]){for(var i=0;i<this._beforeDependency[path].length;i++){var depPath=this._beforeDependency[path][i];this.once(depPath,function(){var index=_this5._beforeDependency[path].indexOf(depPath);_this5._beforeDependency[path].splice(index,1);_this5._assign(path,cb)});return}}var assign=cb();assign.jsLights={path:path};var components=path.split(".");var pointer=window;var i=0;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=components[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var component=_step.value;i++;if(!pointer[component]){pointer[component]={}}if(i==components.length){pointer[component]=assign}pointer=pointer[component]}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}this.registerEvent(path)}},{key:"_onPassedDependencies",value:function _onPassedDependencies(params,cb){var _this6=this;var events=params.dependency;var path=params.path;if(!events)events=[];if(typeof events=="string"){events=[events]}var checkDeps=function checkDeps(events,initial){if(_this6.triggered.indexOf(path)!=-1){if(params.override){_this6._assign(path,cb)}return}var deps=[];events.forEach(function(dependency){if(initial&&dependency.indexOf("->")!=-1){var eventsArr=dependency.split("->");var baseClass=eventsArr[0];var onBaseClass=eventsArr[1];_this6.onPathInstantiated(baseClass,function(){var baseClassObj=_this6._getPropertyByPath(baseClass);if(!baseClassObj){throw new Error(baseClass+" not found")}else if(!baseClassObj.on){throw new Error(baseClass+" has no .on function")}else{if(baseClassObj.jsLights&&baseClassObj.jsLights.triggered&&baseClassObj.jsLights.triggered[onBaseClass]){_this6.registerEvent(dependency)}else{baseClassObj.once(onBaseClass,function(){_this6.registerEvent(dependency)})}}})}if(_this6.triggered.indexOf(dependency)==-1){deps.push(dependency)}});if(deps.length==0){_this6._assign(path,cb);return false}return deps};var deps=checkDeps(events,true);if(!deps){return}deps.forEach(function(dependency){_this6.once(dependency,function(){checkDeps(deps)})})}},{key:"registerEvent",value:function registerEvent(event){if(this.triggered.indexOf(event)==-1){this.triggered.push(event)}this.trigger(event)}},{key:"_getPropertyByPath",value:function _getPropertyByPath(path){var parts=path.split(".");var property=window;for(var i=0;i<parts.length;i++){property=property[parts[i]];if(property===undefined)return undefined}if(i==0)return undefined;return property}}]);return jsLights}(ModuleEventEmitter);var jsl=new jsLights;jsl._monitStats={};jsl.stats=function(){console.table(jsl._monitStats)};jsl.eventEmitter=ModuleEventEmitter;window.jsLights=jsl},{"wolfy87-eventemitter":2}],2:[function(require,module,exports){(function(){"use strict";function EventEmitter(){}var proto=EventEmitter.prototype;var exports=this;var originalGlobalValue=exports.EventEmitter;function indexOfListener(listeners,listener){var i=listeners.length;while(i--){if(listeners[i].listener===listener){return i}}return-1}function alias(name){return function aliasClosure(){return this[name].apply(this,arguments)}}proto.getListeners=function getListeners(evt){var events=this._getEvents();var response;var key;if(evt instanceof RegExp){response={};for(key in events){if(events.hasOwnProperty(key)&&evt.test(key)){response[key]=events[key]}}}else{response=events[evt]||(events[evt]=[])}return response};proto.flattenListeners=function flattenListeners(listeners){var flatListeners=[];var i;for(i=0;i<listeners.length;i+=1){flatListeners.push(listeners[i].listener)}return flatListeners};proto.getListenersAsObject=function getListenersAsObject(evt){var listeners=this.getListeners(evt);var response;if(listeners instanceof Array){response={};response[evt]=listeners}return response||listeners};proto.addListener=function addListener(evt,listener){var listeners=this.getListenersAsObject(evt);var listenerIsWrapped=typeof listener==="object";var key;for(key in listeners){if(listeners.hasOwnProperty(key)&&indexOfListener(listeners[key],listener)===-1){listeners[key].push(listenerIsWrapped?listener:{listener:listener,once:false})}}return this};proto.on=alias("addListener");proto.addOnceListener=function addOnceListener(evt,listener){return this.addListener(evt,{listener:listener,once:true})};proto.once=alias("addOnceListener");proto.defineEvent=function defineEvent(evt){this.getListeners(evt);return this};proto.defineEvents=function defineEvents(evts){for(var i=0;i<evts.length;i+=1){this.defineEvent(evts[i])}return this};proto.removeListener=function removeListener(evt,listener){var listeners=this.getListenersAsObject(evt);var index;var key;for(key in listeners){if(listeners.hasOwnProperty(key)){index=indexOfListener(listeners[key],listener);if(index!==-1){listeners[key].splice(index,1)}}}return this};proto.off=alias("removeListener");proto.addListeners=function addListeners(evt,listeners){return this.manipulateListeners(false,evt,listeners)};proto.removeListeners=function removeListeners(evt,listeners){return this.manipulateListeners(true,evt,listeners)};proto.manipulateListeners=function manipulateListeners(remove,evt,listeners){var i;var value;var single=remove?this.removeListener:this.addListener;var multiple=remove?this.removeListeners:this.addListeners;if(typeof evt==="object"&&!(evt instanceof RegExp)){for(i in evt){if(evt.hasOwnProperty(i)&&(value=evt[i])){if(typeof value==="function"){single.call(this,i,value)}else{multiple.call(this,i,value)}}}}else{i=listeners.length;while(i--){single.call(this,evt,listeners[i])}}return this};proto.removeEvent=function removeEvent(evt){var type=typeof evt;var events=this._getEvents();var key;if(type==="string"){delete events[evt]}else if(evt instanceof RegExp){for(key in events){if(events.hasOwnProperty(key)&&evt.test(key)){delete events[key]}}}else{delete this._events}return this};proto.removeAllListeners=alias("removeEvent");proto.emitEvent=function emitEvent(evt,args){var listenersMap=this.getListenersAsObject(evt);var listeners;var listener;var i;var key;var response;for(key in listenersMap){if(listenersMap.hasOwnProperty(key)){listeners=listenersMap[key].slice(0);i=listeners.length;while(i--){listener=listeners[i];if(listener.once===true){this.removeListener(evt,listener.listener)}response=listener.listener.apply(this,args||[]);if(response===this._getOnceReturnValue()){this.removeListener(evt,listener.listener)}}}}return this};proto.trigger=alias("emitEvent");proto.emit=function emit(evt){var args=Array.prototype.slice.call(arguments,1);return this.emitEvent(evt,args)};proto.setOnceReturnValue=function setOnceReturnValue(value){this._onceReturnValue=value;return this};proto._getOnceReturnValue=function _getOnceReturnValue(){if(this.hasOwnProperty("_onceReturnValue")){return this._onceReturnValue}else{return true}};proto._getEvents=function _getEvents(){return this._events||(this._events={})};EventEmitter.noConflict=function noConflict(){exports.EventEmitter=originalGlobalValue;return EventEmitter};if(typeof define==="function"&&define.amd){define(function(){return EventEmitter})}else if(typeof module==="object"&&module.exports){module.exports=EventEmitter}else{exports.EventEmitter=EventEmitter}}).call(this)},{}]},{},[1]);