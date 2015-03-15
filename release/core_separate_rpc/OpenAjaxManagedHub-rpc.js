OpenAjax.gadgets.util=function(){
function _1(_2){
var _3;
var _4=_2.indexOf("?");
var _5=_2.indexOf("#");
if(_5===-1){
_3=_2.substr(_4+1);
}else{
_3=[_2.substr(_4+1,_5-_4-1),"&",_2.substr(_5+1)].join("");
}
return _3.split("&");
};
var _6=null;
var _7=[];
return {getUrlParameters:function(_8){
if(_6!==null&&typeof _8==="undefined"){
return _6;
}
var _9={};
var _a=_1(_8||document.location.href);
var _b=window.decodeURIComponent?decodeURIComponent:unescape;
for(var i=0,j=_a.length;i<j;++i){
var _c=_a[i].indexOf("=");
if(_c===-1){
continue;
}
var _d=_a[i].substring(0,_c);
var _e=_a[i].substring(_c+1);
_e=_e.replace(/\+/g," ");
_9[_d]=_b(_e);
}
if(typeof _8==="undefined"){
_6=_9;
}
return _9;
},registerOnLoadHandler:function(_f){
_7.push(_f);
},runOnLoadHandlers:function(){
for(var i=0,j=_7.length;i<j;++i){
_7[i]();
}
},"attachBrowserEvent":function(_10,_11,_12,_13){
if(_10.addEventListener){
_10.addEventListener(_11,_12,_13);
}else{
if(_10.attachEvent){
_10.attachEvent("on"+_11,_12);
}
}
},"removeBrowserEvent":function(_14,_15,_16,_17){
if(_14.removeEventListener){
_14.removeEventListener(_15,_16,_17);
}else{
if(_14.detachEvent){
_14.detachEvent("on"+_15,_16);
}
}
}};
}();
OpenAjax.gadgets.util.getUrlParameters();
OpenAjax.gadgets.json=OpenAjax.gadgets.json||{};
if(!OpenAjax.gadgets.json.stringify){
OpenAjax.gadgets.json={parse:function(str){
try{
return window.JSON.parse(str);
}
catch(e){
return false;
}
},stringify:function(obj){
try{
return window.JSON.stringify(obj);
}
catch(e){
return null;
}
}};
}
OpenAjax.gadgets.log=function(_18){
OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.INFO,_18);
};
OpenAjax.gadgets.warn=function(_19){
OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.WARNING,_19);
};
OpenAjax.gadgets.error=function(_1a){
OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.ERROR,_1a);
};
OpenAjax.gadgets.setLogLevel=function(_1b){
OpenAjax.gadgets.log.logLevelThreshold_=_1b;
};
OpenAjax.gadgets.log.logAtLevel=function(_1c,_1d){
if(_1c<OpenAjax.gadgets.log.logLevelThreshold_||!OpenAjax.gadgets.log._console){
return;
}
var _1e;
var _1f=OpenAjax.gadgets.log._console;
if(_1c==OpenAjax.gadgets.log.WARNING&&_1f.warn){
_1f.warn(_1d);
}else{
if(_1c==OpenAjax.gadgets.log.ERROR&&_1f.error){
_1f.error(_1d);
}else{
if(_1f.log){
_1f.log(_1d);
}
}
}
};
OpenAjax.gadgets.log.INFO=1;
OpenAjax.gadgets.log.WARNING=2;
OpenAjax.gadgets.log.ERROR=3;
OpenAjax.gadgets.log.NONE=4;
OpenAjax.gadgets.log.logLevelThreshold_=OpenAjax.gadgets.log.INFO;
OpenAjax.gadgets.log._console=window.console?window.console:window.opera?window.opera.postError:undefined;
(function(){
if(!window.__isgadget){
var _20=false;
function _21(){
if(!_20){
_20=true;
OpenAjax.gadgets.util.runOnLoadHandlers();
OpenAjax.gadgets.util.registerOnLoadHandler=function(_22){
setTimeout(_22,0);
};
if(window.detachEvent){
window.detachEvent("onload",_21);
}
}
};
if(window.addEventListener){
document.addEventListener("DOMContentLoaded",_21,false);
window.addEventListener("load",_21,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",_21);
}
}
}
})();
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
if(!OpenAjax.gadgets.rpctx.frameElement){
OpenAjax.gadgets.rpctx.frameElement=function(){
var _23="__g2c_rpc";
var _24="__c2g_rpc";
var _25;
var _26;
function _27(_28,_29,rpc){
try{
if(_29!==".."){
var fe=window.frameElement;
if(typeof fe[_23]==="function"){
if(typeof fe[_23][_24]!=="function"){
fe[_23][_24]=function(_2a){
_25(OpenAjax.gadgets.json.parse(_2a));
};
}
fe[_23](OpenAjax.gadgets.json.stringify(rpc));
return;
}
}else{
var _2b=document.getElementById(_28);
if(typeof _2b[_23]==="function"&&typeof _2b[_23][_24]==="function"){
_2b[_23][_24](OpenAjax.gadgets.json.stringify(rpc));
return;
}
}
}
catch(e){
}
return true;
};
return {getCode:function(){
return "fe";
},isParentVerifiable:function(){
return false;
},init:function(_2c,_2d){
_25=_2c;
_26=_2d;
return true;
},setup:function(_2e,_2f){
if(_2e!==".."){
try{
var _30=document.getElementById(_2e);
_30[_23]=function(_31){
_25(OpenAjax.gadgets.json.parse(_31));
};
}
catch(e){
return false;
}
}
if(_2e===".."){
_26("..",true);
var _32=function(){
window.setTimeout(function(){
OpenAjax.gadgets.rpc.call(_2e,OpenAjax.gadgets.rpc.ACK);
},500);
};
OpenAjax.gadgets.util.registerOnLoadHandler(_32);
}
return true;
},call:function(_33,_34,rpc){
_27(_33,_34,rpc);
}};
}();
}
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
if(!OpenAjax.gadgets.rpctx.ifpc){
OpenAjax.gadgets.rpctx.ifpc=function(){
var _35=[];
var _36=0;
var _37;
var _38=2000;
var _39={};
function _3a(_3b){
var _3c=[];
for(var i=0,j=_3b.length;i<j;++i){
_3c.push(encodeURIComponent(OpenAjax.gadgets.json.stringify(_3b[i])));
}
return _3c.join("&");
};
function _3d(src){
var _3e;
for(var i=_35.length-1;i>=0;--i){
var ifr=_35[i];
try{
if(ifr&&(ifr.recyclable||ifr.readyState==="complete")){
ifr.parentNode.removeChild(ifr);
if(window.ActiveXObject){
_35[i]=ifr=null;
_35.splice(i,1);
}else{
ifr.recyclable=false;
_3e=ifr;
break;
}
}
}
catch(e){
}
}
if(!_3e){
_3e=document.createElement("iframe");
_3e.style.border=_3e.style.width=_3e.style.height="0px";
_3e.style.visibility="hidden";
_3e.style.position="absolute";
_3e.onload=function(){
this.recyclable=true;
};
_35.push(_3e);
}
_3e.src=src;
window.setTimeout(function(){
document.body.appendChild(_3e);
},0);
};
function _3f(arr,_40){
for(var i=_40-1;i>=0;--i){
if(typeof arr[i]==="undefined"){
return false;
}
}
return true;
};
return {getCode:function(){
return "ifpc";
},isParentVerifiable:function(){
return true;
},init:function(_41,_42){
_37=_42;
_37("..",true);
return true;
},setup:function(_43,_44){
_37(_43,true);
return true;
},call:function(_45,_46,rpc){
var _47=OpenAjax.gadgets.rpc.getRelayUrl(_45);
++_36;
if(!_47){
OpenAjax.gadgets.warn("No relay file assigned for IFPC");
return;
}
var src=null,_48=[];
if(rpc.l){
var _49=rpc.a;
src=[_47,"#",_3a([_46,_36,1,0,_3a([_46,rpc.s,"","",_46].concat(_49))])].join("");
_48.push(src);
}else{
src=[_47,"#",_45,"&",_46,"@",_36,"&"].join("");
var _4a=encodeURIComponent(OpenAjax.gadgets.json.stringify(rpc)),_4b=_38-src.length,_4c=Math.ceil(_4a.length/_4b),_4d=0,_4e;
while(_4a.length>0){
_4e=_4a.substring(0,_4b);
_4a=_4a.substring(_4b);
_48.push([src,_4c,"&",_4d,"&",_4e].join(""));
_4d+=1;
}
}
do{
_3d(_48.shift());
}while(_48.length>0);
return true;
},_receiveMessage:function(_4f,_50){
var _51=_4f[1],_52=parseInt(_4f[2],10),_53=parseInt(_4f[3],10),_54=_4f[_4f.length-1],_55=_52===1;
if(_52>1){
if(!_39[_51]){
_39[_51]=[];
}
_39[_51][_53]=_54;
if(_3f(_39[_51],_52)){
_54=_39[_51].join("");
delete _39[_51];
_55=true;
}
}
if(_55){
_50(OpenAjax.gadgets.json.parse(decodeURIComponent(_54)));
}
}};
}();
}
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
if(!OpenAjax.gadgets.rpctx.rmr){
OpenAjax.gadgets.rpctx.rmr=function(){
var _56=500;
var _57=10;
var _58={};
var _59;
var _5a;
function _5b(_5c,_5d,_5e,_5f){
var _60=function(){
document.body.appendChild(_5c);
_5c.src="about:blank";
if(_5f){
_5c.onload=function(){
_76(_5f);
};
}
_5c.src=_5d+"#"+_5e;
};
if(document.body){
_60();
}else{
OpenAjax.gadgets.util.registerOnLoadHandler(function(){
_60();
});
}
};
function _61(_62){
if(typeof _58[_62]==="object"){
return;
}
var _63=document.createElement("iframe");
var _64=_63.style;
_64.position="absolute";
_64.top="0px";
_64.border="0";
_64.opacity="0";
_64.width="10px";
_64.height="1px";
_63.id="rmrtransport-"+_62;
_63.name=_63.id;
var _65=OpenAjax.gadgets.rpc.getRelayUrl(_62);
if(!_65){
_65=OpenAjax.gadgets.rpc.getOrigin(OpenAjax.gadgets.util.getUrlParameters()["parent"])+"/robots.txt";
}
_58[_62]={frame:_63,receiveWindow:null,relayUri:_65,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0};
if(_62!==".."){
_5b(_63,_65,_66(_62));
}
_67(_62);
};
function _67(_68){
var _69=null;
_58[_68].searchCounter++;
try{
var _6a=OpenAjax.gadgets.rpc._getTargetWin(_68);
if(_68===".."){
_69=_6a.frames["rmrtransport-"+OpenAjax.gadgets.rpc.RPC_ID];
}else{
_69=_6a.frames["rmrtransport-.."];
}
}
catch(e){
}
var _6b=false;
if(_69){
_6b=_6c(_68,_69);
}
if(!_6b){
if(_58[_68].searchCounter>_57){
return;
}
window.setTimeout(function(){
_67(_68);
},_56);
}
};
function _6d(_6e,_6f,_70,rpc){
var _71=null;
if(_70!==".."){
_71=_58[".."];
}else{
_71=_58[_6e];
}
if(_71){
if(_6f!==OpenAjax.gadgets.rpc.ACK){
_71.queue.push(rpc);
}
if(_71.waiting||(_71.queue.length===0&&!(_6f===OpenAjax.gadgets.rpc.ACK&&rpc&&rpc.ackAlone===true))){
return true;
}
if(_71.queue.length>0){
_71.waiting=true;
}
var url=_71.relayUri+"#"+_66(_6e);
try{
_71.frame.contentWindow.location=url;
var _72=_71.width==10?20:10;
_71.frame.style.width=_72+"px";
_71.width=_72;
}
catch(e){
return false;
}
}
return true;
};
function _66(_73){
var _74=_58[_73];
var _75={id:_74.sendId};
if(_74){
_75.d=Array.prototype.slice.call(_74.queue,0);
_75.d.push({s:OpenAjax.gadgets.rpc.ACK,id:_74.recvId});
}
return OpenAjax.gadgets.json.stringify(_75);
};
function _76(_77){
var _78=_58[_77];
var _79=_78.receiveWindow.location.hash.substring(1);
var _7a=OpenAjax.gadgets.json.parse(decodeURIComponent(_79))||{};
var _7b=_7a.d||[];
var _7c=false;
var _7d=false;
var _7e=0;
var _7f=(_78.recvId-_7a.id);
for(var i=0;i<_7b.length;++i){
var rpc=_7b[i];
if(rpc.s===OpenAjax.gadgets.rpc.ACK){
_5a(_77,true);
if(_78.waiting){
_7d=true;
}
_78.waiting=false;
var _80=Math.max(0,rpc.id-_78.sendId);
_78.queue.splice(0,_80);
_78.sendId=Math.max(_78.sendId,rpc.id||0);
continue;
}
_7c=true;
if(++_7e<=_7f){
continue;
}
++_78.recvId;
_59(rpc);
}
if(_7c||(_7d&&_78.queue.length>0)){
var _81=(_77==="..")?OpenAjax.gadgets.rpc.RPC_ID:"..";
_6d(_77,OpenAjax.gadgets.rpc.ACK,_81,{ackAlone:_7c});
}
};
function _6c(_82,_83){
var _84=_58[_82];
try{
var _85=false;
_85="document" in _83;
if(!_85){
return false;
}
_85=typeof _83["document"]=="object";
if(!_85){
return false;
}
var loc=_83.location.href;
if(loc==="about:blank"){
return false;
}
}
catch(ex){
return false;
}
_84.receiveWindow=_83;
function _86(){
_76(_82);
};
if(typeof _83.attachEvent==="undefined"){
_83.onresize=_86;
}else{
_83.attachEvent("onresize",_86);
}
if(_82===".."){
_5b(_84.frame,_84.relayUri,_66(_82),_82);
}else{
_76(_82);
}
return true;
};
return {getCode:function(){
return "rmr";
},isParentVerifiable:function(){
return true;
},init:function(_87,_88){
_59=_87;
_5a=_88;
return true;
},setup:function(_89,_8a){
try{
_61(_89);
}
catch(e){
OpenAjax.gadgets.warn("Caught exception setting up RMR: "+e);
return false;
}
return true;
},call:function(_8b,_8c,rpc){
return _6d(_8b,rpc.s,_8c,rpc);
}};
}();
}
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
if(!OpenAjax.gadgets.rpctx.wpm){
OpenAjax.gadgets.rpctx.wpm=function(){
var _8d,_8e;
var _8f;
var _90=false;
var _91=false;
function _92(){
var hit=false;
function _93(_94){
if(_94.data=="postmessage.test"){
hit=true;
if(typeof _94.origin==="undefined"){
_91=true;
}
}
};
OpenAjax.gadgets.util.attachBrowserEvent(window,"message",_93,false);
window.postMessage("postmessage.test","*");
if(hit){
_90=true;
}
OpenAjax.gadgets.util.removeBrowserEvent(window,"message",_93,false);
};
function _95(_96){
var rpc=OpenAjax.gadgets.json.parse(_96.data);
if(!rpc||!rpc.f){
return;
}
var _97=OpenAjax.gadgets.rpc.getRelayUrl(rpc.f)||OpenAjax.gadgets.util.getUrlParameters()["parent"];
var _98=OpenAjax.gadgets.rpc.getOrigin(_97);
if(!_91?_96.origin!==_98:_96.domain!==/^.+:\/\/([^:]+).*/.exec(_98)[1]){
return;
}
_8d(rpc);
};
return {getCode:function(){
return "wpm";
},isParentVerifiable:function(){
return true;
},init:function(_99,_9a){
_8d=_99;
_8e=_9a;
_92();
if(!_90){
_8f=function(win,msg,_9b){
win.postMessage(msg,_9b);
};
}else{
_8f=function(win,msg,_9c){
window.setTimeout(function(){
win.postMessage(msg,_9c);
},0);
};
}
OpenAjax.gadgets.util.attachBrowserEvent(window,"message",_95,false);
_8e("..",true);
return true;
},setup:function(_9d,_9e,_9f){
if(_9d===".."){
if(_9f){
OpenAjax.gadgets.rpc._createRelayIframe(_9e);
}else{
OpenAjax.gadgets.rpc.call(_9d,OpenAjax.gadgets.rpc.ACK);
}
}
return true;
},call:function(_a0,_a1,rpc){
var _a2=OpenAjax.gadgets.rpc._getTargetWin(_a0);
var _a3=OpenAjax.gadgets.rpc.getRelayUrl(_a0)||OpenAjax.gadgets.util.getUrlParameters()["parent"];
var _a4=OpenAjax.gadgets.rpc.getOrigin(_a3);
if(_a4){
_8f(_a2,OpenAjax.gadgets.json.stringify(rpc),_a4);
}else{
OpenAjax.gadgets.error("No relay set (used as window.postMessage targetOrigin)"+", cannot send cross-domain message");
}
return true;
},relayOnload:function(_a5,_a6){
_8e(_a5,true);
}};
}();
}
if(!OpenAjax.gadgets.rpc){
OpenAjax.gadgets.rpc=function(){
var _a7="__cb";
var _a8="";
var ACK="__ack";
var _a9=500;
var _aa=10;
var _ab={};
var _ac={};
var _ad={};
var _ae={};
var _af=0;
var _b0={};
var _b1={};
var _b2={};
var _b3={};
var _b4={};
var _b5={};
var _b6=(window.top!==window.self);
var _b7=window.name;
var _b8=function(){
};
var _b9=0;
var _ba=1;
var _bb=2;
var _bc=(function(){
function _bd(_be){
return function(){
OpenAjax.gadgets.log("gadgets.rpc."+_be+"("+OpenAjax.gadgets.json.stringify(Array.prototype.slice.call(arguments))+"): call ignored. [caller: "+document.location+", isChild: "+_b6+"]");
};
};
return {getCode:function(){
return "noop";
},isParentVerifiable:function(){
return true;
},init:_bd("init"),setup:_bd("setup"),call:_bd("call")};
})();
if(OpenAjax.gadgets.util){
_b3=OpenAjax.gadgets.util.getUrlParameters();
}
function _bf(){
return typeof window.postMessage==="function"?OpenAjax.gadgets.rpctx.wpm:typeof window.postMessage==="object"?OpenAjax.gadgets.rpctx.wpm:navigator.userAgent.indexOf("WebKit")>0?OpenAjax.gadgets.rpctx.rmr:navigator.product==="Gecko"?OpenAjax.gadgets.rpctx.frameElement:OpenAjax.gadgets.rpctx.ifpc;
};
function _c0(_c1,_c2){
var tx=_c3;
if(!_c2){
tx=_bc;
}
_b4[_c1]=tx;
var _c4=_b5[_c1]||[];
for(var i=0;i<_c4.length;++i){
var rpc=_c4[i];
rpc.t=_c5(_c1);
tx.call(_c1,rpc.f,rpc);
}
_b5[_c1]=[];
};
var _c6=false,_c7=false;
function _c8(){
if(_c7){
return;
}
function _c9(){
_c6=true;
};
OpenAjax.gadgets.util.attachBrowserEvent(window,"unload",_c9,false);
_c7=true;
};
function _ca(_cb,_cc,_cd,_ce,_cf){
if(!_ae[_cc]||_ae[_cc]!==_cd){
OpenAjax.gadgets.error("Invalid auth token. "+_ae[_cc]+" vs "+_cd);
_b8(_cc,_bb);
}
_cf.onunload=function(){
if(_b1[_cc]&&!_c6){
_b8(_cc,_ba);
OpenAjax.gadgets.rpc.removeReceiver(_cc);
}
};
_c8();
_ce=OpenAjax.gadgets.json.parse(decodeURIComponent(_ce));
_c3.relayOnload(_cc,_ce);
};
function _d0(rpc){
if(rpc&&typeof rpc.s==="string"&&typeof rpc.f==="string"&&rpc.a instanceof Array){
if(_ae[rpc.f]){
if(_ae[rpc.f]!==rpc.t){
OpenAjax.gadgets.error("Invalid auth token. "+_ae[rpc.f]+" vs "+rpc.t);
_b8(rpc.f,_bb);
}
}
if(rpc.s===ACK){
window.setTimeout(function(){
_c0(rpc.f,true);
},0);
return;
}
if(rpc.c){
rpc.callback=function(_d1){
OpenAjax.gadgets.rpc.call(rpc.f,_a7,null,rpc.c,_d1);
};
}
var _d2=(_ab[rpc.s]||_ab[_a8]).apply(rpc,rpc.a);
if(rpc.c&&typeof _d2!=="undefined"){
OpenAjax.gadgets.rpc.call(rpc.f,_a7,null,rpc.c,_d2);
}
}
};
function _d3(url){
if(!url){
return "";
}
url=url.toLowerCase();
if(url.indexOf("//")==0){
url=window.location.protocol+url;
}
if(url.indexOf("://")==-1){
url=window.location.protocol+"//"+url;
}
var _d4=url.substring(url.indexOf("://")+3);
var _d5=_d4.indexOf("/");
if(_d5!=-1){
_d4=_d4.substring(0,_d5);
}
var _d6=url.substring(0,url.indexOf("://"));
var _d7="";
var _d8=_d4.indexOf(":");
if(_d8!=-1){
var _d9=_d4.substring(_d8+1);
_d4=_d4.substring(0,_d8);
if((_d6==="http"&&_d9!=="80")||(_d6==="https"&&_d9!=="443")){
_d7=":"+_d9;
}
}
return _d6+"://"+_d4+_d7;
};
function _da(id){
if(typeof id==="undefined"||id===".."){
return window.parent;
}
id=String(id);
var _db=window.frames[id];
if(_db){
return _db;
}
_db=document.getElementById(id);
if(_db&&_db.contentWindow){
return _db.contentWindow;
}
return null;
};
var _c3=_bf();
_ab[_a8]=function(){
OpenAjax.gadgets.warn("Unknown RPC service: "+this.s);
};
_ab[_a7]=function(_dc,_dd){
var _de=_b0[_dc];
if(_de){
delete _b0[_dc];
_de(_dd);
}
};
function _df(_e0,_e1,_e2){
if(_b1[_e0]===true){
return;
}
if(typeof _b1[_e0]==="undefined"){
_b1[_e0]=0;
}
var _e3=document.getElementById(_e0);
if(_e0===".."||_e3!=null){
if(_c3.setup(_e0,_e1,_e2)===true){
_b1[_e0]=true;
return;
}
}
if(_b1[_e0]!==true&&_b1[_e0]++<_aa){
window.setTimeout(function(){
_df(_e0,_e1,_e2);
},_a9);
}else{
_b4[_e0]=_bc;
_b1[_e0]=true;
}
};
function _e4(_e5,rpc){
if(typeof _b2[_e5]==="undefined"){
_b2[_e5]=false;
var _e6=OpenAjax.gadgets.rpc.getRelayUrl(_e5);
if(_d3(_e6)!==_d3(window.location.href)){
return false;
}
var _e7=_da(_e5);
try{
_b2[_e5]=_e7.OpenAjax.gadgets.rpc.receiveSameDomain;
}
catch(e){
OpenAjax.gadgets.error("Same domain call failed: parent= incorrectly set.");
}
}
if(typeof _b2[_e5]==="function"){
_b2[_e5](rpc);
return true;
}
return false;
};
function _e8(_e9,url,_ea){
if(!/http(s)?:\/\/.+/.test(url)){
if(url.indexOf("//")==0){
url=window.location.protocol+url;
}else{
if(url.charAt(0)=="/"){
url=window.location.protocol+"//"+window.location.host+url;
}else{
if(url.indexOf("://")==-1){
url=window.location.protocol+"//"+url;
}
}
}
}
_ac[_e9]=url;
_ad[_e9]=!!_ea;
};
function _c5(_eb){
return _ae[_eb];
};
function _ec(_ed,_ee,_ef){
_ee=_ee||"";
_ae[_ed]=String(_ee);
_df(_ed,_ee,_ef);
};
function _f0(_f1,_f2){
function _f3(_f4){
var _f5=_f4?_f4.rpc:{};
var _f6=_f5.parentRelayUrl;
if(_f6.substring(0,7)!=="http://"&&_f6.substring(0,8)!=="https://"&&_f6.substring(0,2)!=="//"){
if(typeof _b3.parent==="string"&&_b3.parent!==""){
if(_f6.substring(0,1)!=="/"){
var _f7=_b3.parent.lastIndexOf("/");
_f6=_b3.parent.substring(0,_f7+1)+_f6;
}else{
_f6=_d3(_b3.parent)+_f6;
}
}
}
var _f8=!!_f5.useLegacyProtocol;
_e8("..",_f6,_f8);
if(_f8){
_c3=OpenAjax.gadgets.rpctx.ifpc;
_c3.init(_d0,_c0);
}
var _f9=_f2||_b3.forcesecure||false;
_ec("..",_f1,_f9);
};
var _fa={parentRelayUrl:OpenAjax.gadgets.config.NonEmptyStringValidator};
OpenAjax.gadgets.config.register("rpc",_fa,_f3);
};
function _fb(_fc,_fd,_fe){
var _ff=_fe||_b3.forcesecure||false;
var _100=_fd||_b3.parent;
if(_100){
_e8("..",_100);
_ec("..",_fc,_ff);
}
};
function _101(_102,_103,_104,_105){
if(!OpenAjax.gadgets.util){
return;
}
var _106=document.getElementById(_102);
if(!_106){
throw new Error("Cannot set up gadgets.rpc receiver with ID: "+_102+", element not found.");
}
var _107=_103||_106.src;
_e8(_102,_107);
var _108=OpenAjax.gadgets.util.getUrlParameters(_106.src);
var _109=_104||_108.rpctoken;
var _10a=_105||_108.forcesecure;
_ec(_102,_109,_10a);
};
function _10b(_10c,_10d,_10e,_10f){
if(_10c===".."){
var _110=_10e||_b3.rpctoken||_b3.ifpctok||"";
if(window["__isgadget"]===true){
_f0(_110,_10f);
}else{
_fb(_110,_10d,_10f);
}
}else{
_101(_10c,_10d,_10e,_10f);
}
};
return {config:function(_111){
if(typeof _111.securityCallback==="function"){
_b8=_111.securityCallback;
}
},register:function(_112,_113){
if(_112===_a7||_112===ACK){
throw new Error("Cannot overwrite callback/ack service");
}
if(_112===_a8){
throw new Error("Cannot overwrite default service:"+" use registerDefault");
}
_ab[_112]=_113;
},unregister:function(_114){
if(_114===_a7||_114===ACK){
throw new Error("Cannot delete callback/ack service");
}
if(_114===_a8){
throw new Error("Cannot delete default service:"+" use unregisterDefault");
}
delete _ab[_114];
},registerDefault:function(_115){
_ab[_a8]=_115;
},unregisterDefault:function(){
delete _ab[_a8];
},forceParentVerifiable:function(){
if(!_c3.isParentVerifiable()){
_c3=OpenAjax.gadgets.rpctx.ifpc;
}
},call:function(_116,_117,_118,_119){
_116=_116||"..";
var from="..";
if(_116===".."){
from=_b7;
}
++_af;
if(_118){
_b0[_af]=_118;
}
var rpc={s:_117,f:from,c:_118?_af:0,a:Array.prototype.slice.call(arguments,3),t:_ae[_116],l:_ad[_116]};
if(_116!==".."&&!document.getElementById(_116)){
OpenAjax.gadgets.log("WARNING: attempted send to nonexistent frame: "+_116);
return;
}
if(_e4(_116,rpc)){
return;
}
var _11a=_b4[_116];
if(!_11a){
if(!_b5[_116]){
_b5[_116]=[rpc];
}else{
_b5[_116].push(rpc);
}
return;
}
if(_ad[_116]){
_11a=OpenAjax.gadgets.rpctx.ifpc;
}
if(_11a.call(_116,from,rpc)===false){
_b4[_116]=_bc;
_c3.call(_116,from,rpc);
}
},getRelayUrl:function(_11b){
var url=_ac[_11b];
if(url&&url.substring(0,1)==="/"){
if(url.substring(1,2)==="/"){
url=document.location.protocol+url;
}else{
url=document.location.protocol+"//"+document.location.host+url;
}
}
return url;
},setRelayUrl:_e8,setAuthToken:_ec,setupReceiver:_10b,getAuthToken:_c5,removeReceiver:function(_11c){
delete _ac[_11c];
delete _ad[_11c];
delete _ae[_11c];
delete _b1[_11c];
delete _b2[_11c];
delete _b4[_11c];
},getRelayChannel:function(){
return _c3.getCode();
},receive:function(_11d,_11e){
if(_11d.length>4){
_c3._receiveMessage(_11d,_d0);
}else{
_ca.apply(null,_11d.concat(_11e));
}
},receiveSameDomain:function(rpc){
rpc.a=Array.prototype.slice.call(rpc.a);
window.setTimeout(function(){
_d0(rpc);
},0);
},getOrigin:_d3,getReceiverOrigin:function(_11f){
var _120=_b4[_11f];
if(!_120){
return null;
}
if(!_120.isParentVerifiable(_11f)){
return null;
}
var _121=OpenAjax.gadgets.rpc.getRelayUrl(_11f)||OpenAjax.gadgets.util.getUrlParameters().parent;
return OpenAjax.gadgets.rpc.getOrigin(_121);
},init:function(){
if(_c3.init(_d0,_c0)===false){
_c3=_bc;
}
if(_b6){
_10b("..");
}
},_getTargetWin:_da,_createRelayIframe:function(_122,data){
var _123=OpenAjax.gadgets.rpc.getRelayUrl("..");
if(!_123){
return;
}
var src=_123+"#..&"+_b7+"&"+_122+"&"+encodeURIComponent(OpenAjax.gadgets.json.stringify(data));
var _124=document.createElement("iframe");
_124.style.border=_124.style.width=_124.style.height="0px";
_124.style.visibility="hidden";
_124.style.position="absolute";
function _125(){
document.body.appendChild(_124);
_124.src="javascript:\"<html></html>\"";
_124.src=src;
};
if(document.body){
_125();
}else{
OpenAjax.gadgets.util.registerOnLoadHandler(function(){
_125();
});
}
return _124;
},ACK:ACK,RPC_ID:_b7,SEC_ERROR_LOAD_TIMEOUT:_b9,SEC_ERROR_FRAME_PHISH:_ba,SEC_ERROR_FORGED_MSG:_bb};
}();
OpenAjax.gadgets.rpc.init();
}

