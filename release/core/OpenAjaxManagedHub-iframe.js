var OpenAjax=OpenAjax||{};
OpenAjax.hub=OpenAjax.hub||{};
OpenAjax.gadgets=typeof OpenAjax.gadgets==="object"?OpenAjax.gadgets:typeof gadgets==="object"?gadgets:{};
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
(function(){
if(typeof gadgets==="undefined"){
if(typeof oaaConfig==="undefined"){
var _1=document.getElementsByTagName("script");
var _2=/openajax(?:managedhub-(?:all|core).*|-mashup)\.js$/i;
for(var i=_1.length-1;i>=0;i--){
var _3=_1[i].getAttribute("src");
if(!_3){
continue;
}
var m=_3.match(_2);
if(m){
var _4=_1[i].getAttribute("oaaConfig");
if(_4){
try{
oaaConfig=eval("({ "+_4+" })");
}
catch(e){
}
}
break;
}
}
}
if(typeof oaaConfig!=="undefined"&&oaaConfig.gadgetsGlobal){
gadgets=OpenAjax.gadgets;
}
}
})();
if(!OpenAjax.hub.IframeContainer){
(function(){
OpenAjax.hub.IframeContainer=function(_5,_6,_7){
_8(arguments);
var _9=this;
var _a=_7.Container.scope||window;
var _b=false;
var _c={};
var _d;
var _e;
var _f=_7.IframeContainer.timeout||15000;
var _10;
if(_7.Container.log){
var log=function(msg){
try{
_7.Container.log.call(_a,"IframeContainer::"+_6+": "+msg);
}
catch(e){
OpenAjax.hub._debugger();
}
};
}else{
log=function(){
};
}
this._init=function(){
_5.addContainer(this);
_e=OpenAjax.hub.IframeContainer._rpcRouter.add(_6,this);
_d=_66(_7,_a,log);
var _11=_7.IframeContainer.clientRelay;
var _12=OpenAjax.gadgets.rpc.getRelayChannel();
if(_7.IframeContainer.tunnelURI){
if(_12!=="wpm"&&_12!=="ifpc"){
throw new Error(OpenAjax.hub.Error.IncompatBrowser);
}
}else{
log("WARNING: Parameter 'IframeContaienr.tunnelURI' not specified. Connection will not be fully secure.");
if(_12==="rmr"&&!_11){
_11=OpenAjax.gadgets.rpc.getOrigin(_7.IframeContainer.uri)+"/robots.txt";
}
}
_13();
OpenAjax.gadgets.rpc.setupReceiver(_e,_11);
_14();
};
this.sendToClient=function(_15,_16,_17){
OpenAjax.gadgets.rpc.call(_e,"openajax.pubsub",null,"pub",_15,_16,_17);
};
this.remove=function(){
_18();
clearTimeout(_10);
OpenAjax.gadgets.rpc.removeReceiver(_e);
var _19=document.getElementById(_e);
_19.parentNode.removeChild(_19);
OpenAjax.hub.IframeContainer._rpcRouter.remove(_e);
};
this.isConnected=function(){
return _b;
};
this.getClientID=function(){
return _6;
};
this.getPartnerOrigin=function(){
if(_b){
var _1a=OpenAjax.gadgets.rpc.getReceiverOrigin(_e);
if(_1a){
return (/^([a-zA-Z]+:\/\/[^:]+).*/.exec(_1a)[1]);
}
}
return null;
};
this.getParameters=function(){
return _7;
};
this.getHub=function(){
return _5;
};
this.getIframe=function(){
return document.getElementById(_e);
};
function _8(_1b){
var hub=_1b[0],_6=_1b[1],_7=_1b[2];
if(!hub||!_6||!_7||!_7.Container||!_7.Container.onSecurityAlert||!_7.IframeContainer||!_7.IframeContainer.parent||!_7.IframeContainer.uri){
throw new Error(OpenAjax.hub.Error.BadParameters);
}
};
this._handleIncomingRPC=function(_1c,_1d,_1e){
switch(_1c){
case "pub":
_5.publishForClient(_9,_1d,_1e);
break;
case "sub":
var _1f="";
try{
_c[_1e]=_5.subscribeForClient(_9,_1d,_1e);
}
catch(e){
_1f=e.message;
}
return _1f;
case "uns":
var _20=_c[_1e];
_5.unsubscribeForClient(_9,_20);
delete _c[_1e];
return _1e;
case "con":
_21();
return true;
case "dis":
_14();
_18();
if(_7.Container.onDisconnect){
try{
_7.Container.onDisconnect.call(_a,_9);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from onDisconnect callback to constructor: "+e.message);
}
}
return true;
}
};
this._onSecurityAlert=function(_22){
_23(_65[_22]);
};
function _13(){
var _24=document.createElement("span");
_7.IframeContainer.parent.appendChild(_24);
var _25="<iframe id=\""+_e+"\" name=\""+_e+"\" src=\"javascript:'<html></html>'\"";
var _26="";
var _27=_7.IframeContainer.iframeAttrs;
if(_27){
for(var _28 in _27){
switch(_28){
case "style":
for(var _29 in _27.style){
_26+=_29+":"+_27.style[_29]+";";
}
break;
case "className":
_25+=" class=\""+_27[_28]+"\"";
break;
default:
_25+=" "+_28+"=\""+_27[_28]+"\"";
}
}
}
_26+="visibility:hidden;";
_25+=" style=\""+_26+"\"></iframe>";
_24.innerHTML=_25;
var _2a;
if(_7.IframeContainer.tunnelURI){
_2a="&parent="+encodeURIComponent(_7.IframeContainer.tunnelURI)+"&forcesecure=true";
}else{
_2a="&oahParent="+encodeURIComponent(OpenAjax.gadgets.rpc.getOrigin(window.location.href));
}
var _2b="";
if(_e!==_6){
_2b="&oahId="+_e.substring(_e.lastIndexOf("_")+1);
}
document.getElementById(_e).src=_7.IframeContainer.uri+"#rpctoken="+_d+_2a+_2b;
};
function _21(){
function _2c(_2d){
if(_2d){
_b=true;
clearTimeout(_10);
document.getElementById(_e).style.visibility="visible";
if(_7.Container.onConnect){
try{
_7.Container.onConnect.call(_a,_9);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from onConnect callback to constructor: "+e.message);
}
}
}
};
OpenAjax.gadgets.rpc.call(_e,"openajax.pubsub",_2c,"cmd","con");
};
function _18(){
if(_b){
_b=false;
document.getElementById(_e).style.visibility="hidden";
for(var s in _c){
_5.unsubscribeForClient(_9,_c[s]);
}
_c={};
}
};
function _23(_2e){
try{
_7.Container.onSecurityAlert.call(_a,_9,_2e);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from onSecurityAlert callback to constructor: "+e.message);
}
};
function _14(){
_10=setTimeout(function(){
_23(OpenAjax.hub.SecurityAlert.LoadTimeout);
_9._handleIncomingRPC=function(){
};
},_f);
};
this._init();
};
OpenAjax.hub.IframeHubClient=function(_2f){
if(!_2f||!_2f.HubClient||!_2f.HubClient.onSecurityAlert){
throw new Error(OpenAjax.hub.Error.BadParameters);
}
var _30=this;
var _31=_2f.HubClient.scope||window;
var _32=false;
var _33={};
var _34=0;
var _35;
if(_2f.HubClient.log){
var log=function(msg){
try{
_2f.HubClient.log.call(_31,"IframeHubClient::"+_35+": "+msg);
}
catch(e){
OpenAjax.hub._debugger();
}
};
}else{
log=function(){
};
}
this._init=function(){
var _36=OpenAjax.gadgets.util.getUrlParameters();
if(!_36.parent){
var _37=_36.oahParent+"/robots.txt";
OpenAjax.gadgets.rpc.setupReceiver("..",_37);
}
if(_2f.IframeHubClient&&_2f.IframeHubClient.requireParentVerifiable&&OpenAjax.gadgets.rpc.getReceiverOrigin("..")===null){
OpenAjax.gadgets.rpc.removeReceiver("..");
throw new Error(OpenAjax.hub.Error.IncompatBrowser);
}
OpenAjax.hub.IframeContainer._rpcRouter.add("..",this);
_35=OpenAjax.gadgets.rpc.RPC_ID;
if(_36.oahId){
_35=_35.substring(0,_35.lastIndexOf("_"));
}
};
this.connect=function(_38,_39){
if(_32){
throw new Error(OpenAjax.hub.Error.Duplicate);
}
function _3a(_3b){
if(_3b){
_32=true;
if(_38){
try{
_38.call(_39||window,_30,true);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from onComplete callback to connect(): "+e.message);
}
}
}
};
OpenAjax.gadgets.rpc.call("..","openajax.pubsub",_3a,"con");
};
this.disconnect=function(_3c,_3d){
if(!_32){
throw new Error(OpenAjax.hub.Error.Disconnected);
}
_32=false;
var _3e=null;
if(_3c){
_3e=function(_3f){
try{
_3c.call(_3d||window,_30,true);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from onComplete callback to disconnect(): "+e.message);
}
};
}
OpenAjax.gadgets.rpc.call("..","openajax.pubsub",_3e,"dis");
};
this.getPartnerOrigin=function(){
if(_32){
var _40=OpenAjax.gadgets.rpc.getReceiverOrigin("..");
if(_40){
return (/^([a-zA-Z]+:\/\/[^:]+).*/.exec(_40)[1]);
}
}
return null;
};
this.getClientID=function(){
return _35;
};
this.subscribe=function(_41,_42,_43,_44,_45){
_46();
_47(_41);
if(!_42){
throw new Error(OpenAjax.hub.Error.BadParameters);
}
_43=_43||window;
var _48=""+_34++;
_33[_48]={cb:_42,sc:_43,d:_45};
function _49(_4a){
if(_4a!==""){
delete _33[_48];
}
if(_44){
try{
_44.call(_43,_48,_4a==="",_4a);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from onComplete callback to subscribe(): "+e.message);
}
}
};
OpenAjax.gadgets.rpc.call("..","openajax.pubsub",_49,"sub",_41,_48);
return _48;
};
this.publish=function(_4b,_4c){
_46();
_4d(_4b);
OpenAjax.gadgets.rpc.call("..","openajax.pubsub",null,"pub",_4b,_4c);
};
this.unsubscribe=function(_4e,_4f,_50){
_46();
if(!_4e){
throw new Error(OpenAjax.hub.Error.BadParameters);
}
if(!_33[_4e]||_33[_4e].uns){
throw new Error(OpenAjax.hub.Error.NoSubscription);
}
_33[_4e].uns=true;
function _51(_52){
delete _33[_4e];
if(_4f){
try{
_4f.call(_50||window,_4e,true);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from onComplete callback to unsubscribe(): "+e.message);
}
}
};
OpenAjax.gadgets.rpc.call("..","openajax.pubsub",_51,"uns",null,_4e);
};
this.isConnected=function(){
return _32;
};
this.getScope=function(){
return _31;
};
this.getSubscriberData=function(_53){
_46();
if(_33[_53]){
return _33[_53].d;
}
throw new Error(OpenAjax.hub.Error.NoSubscription);
};
this.getSubscriberScope=function(_54){
_46();
if(_33[_54]){
return _33[_54].sc;
}
throw new Error(OpenAjax.hub.Error.NoSubscription);
};
this.getParameters=function(){
return _2f;
};
this._handleIncomingRPC=function(_55,_56,_57,_58){
if(_55==="pub"){
if(_33[_58]&&!_33[_58].uns){
try{
_33[_58].cb.call(_33[_58].sc,_56,_57,_33[_58].d);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from onData callback to subscribe(): "+e.message);
}
}
}
if(_56==="con"){
return true;
}
return false;
};
function _46(){
if(!_32){
throw new Error(OpenAjax.hub.Error.Disconnected);
}
};
function _47(_59){
if(!_59){
throw new Error(OpenAjax.hub.Error.BadParameters);
}
var _5a=_59.split(".");
var len=_5a.length;
for(var i=0;i<len;i++){
var p=_5a[i];
if((p==="")||((p.indexOf("*")!=-1)&&(p!="*")&&(p!="**"))){
throw new Error(OpenAjax.hub.Error.BadParameters);
}
if((p=="**")&&(i<len-1)){
throw new Error(OpenAjax.hub.Error.BadParameters);
}
}
};
function _4d(_5b){
if(!_5b||_5b===""||(_5b.indexOf("*")!=-1)||(_5b.indexOf("..")!=-1)||(_5b.charAt(0)==".")||(_5b.charAt(_5b.length-1)==".")){
throw new Error(OpenAjax.hub.Error.BadParameters);
}
};
this._init();
};
OpenAjax.hub.IframeContainer._rpcRouter=function(){
var _5c={};
function _5d(){
var r=_5c[this.f];
if(r){
return r._handleIncomingRPC.apply(r,arguments);
}
};
function _5e(_5f,_60){
var r=_5c[_5f];
if(r){
r._onSecurityAlert.call(r,_60);
}
};
return {add:function(id,_61){
function _62(id,_63){
if(id===".."){
if(!_5c[".."]){
_5c[".."]=_63;
}
return;
}
var _64=id;
while(document.getElementById(_64)){
_64=id+"_"+((32767*Math.random())|0).toString(16);
}
_5c[_64]=_63;
return _64;
};
OpenAjax.gadgets.rpc.register("openajax.pubsub",_5d);
OpenAjax.gadgets.rpc.config({securityCallback:_5e});
_65[OpenAjax.gadgets.rpc.SEC_ERROR_LOAD_TIMEOUT]=OpenAjax.hub.SecurityAlert.LoadTimeout;
_65[OpenAjax.gadgets.rpc.SEC_ERROR_FRAME_PHISH]=OpenAjax.hub.SecurityAlert.FramePhish;
_65[OpenAjax.gadgets.rpc.SEC_ERROR_FORGED_MSG]=OpenAjax.hub.SecurityAlert.ForgedMsg;
this.add=_62;
return _62(id,_61);
},remove:function(id){
delete _5c[id];
}};
}();
var _65={};
function _66(_67,_68,log){
if(!OpenAjax.hub.IframeContainer._prng){
var _69=new Date().getTime()+Math.random()+document.cookie;
OpenAjax.hub.IframeContainer._prng=OpenAjax._smash.crypto.newPRNG(_69);
}
var p=_67.IframeContainer||_67.IframeHubClient;
if(p&&p.seed){
try{
var _6a=p.seed.call(_68);
OpenAjax.hub.IframeContainer._prng.addSeed(_6a);
}
catch(e){
OpenAjax.hub._debugger();
log("caught error from 'seed' callback: "+e.message);
}
}
var _6b=(p&&p.tokenLength)||6;
return OpenAjax.hub.IframeContainer._prng.nextRandomB64Str(_6b);
};
})();
}
if(typeof OpenAjax._smash=="undefined"){
OpenAjax._smash={};
}
OpenAjax._smash.crypto={"strToWA":function(str,_6c){
var bin=Array();
var _6d=(1<<_6c)-1;
for(var i=0;i<str.length*_6c;i+=_6c){
bin[i>>5]|=(str.charCodeAt(i/_6c)&_6d)<<(32-_6c-i%32);
}
return bin;
},"hmac_sha1":function(_6e,_6f,_70){
var _71=Array(16),_72=Array(16);
for(var i=0;i<16;i++){
_71[i]=_6e[i]^909522486;
_72[i]=_6e[i]^1549556828;
}
var _73=this.sha1(_71.concat(this.strToWA(_6f,_70)),512+_6f.length*_70);
return this.sha1(_72.concat(_73),512+160);
},"newPRNG":function(_74){
var _75=this;
if((typeof _74!="string")||(_74.length<12)){
alert("WARNING: Seed length too short ...");
}
var _76=[43417,15926,18182,33130,9585,30800,49772,40144,47678,55453,4659,38181,65340,6787,54417,65301];
var _77=[];
var _78=0;
function _79(_7a){
return _75.hmac_sha1(_76,_7a,8);
};
function _7b(_7c){
var _7d=_79(_7c);
for(var i=0;i<5;i++){
_77[i]^=_7d[i];
}
};
_7b(_74);
return {"addSeed":function(_7e){
_7b(_7e);
},"nextRandomOctets":function(len){
var _7f=[];
while(len>0){
_78+=1;
var _80=_75.hmac_sha1(_77,(_78).toString(16),8);
for(i=0;(i<20)&(len>0);i++,len--){
_7f.push((_80[i>>2]>>(i%4))%256);
}
}
return _7f;
},"nextRandomB64Str":function(len){
var _81="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
var _82=this.nextRandomOctets(len);
var _83="";
for(var i=0;i<len;i++){
_83+=_81.charAt(_82[i]&63);
}
return _83;
}};
},"sha1":function(){
var _84=function(x,y){
var lsw=(x&65535)+(y&65535);
var msw=(x>>16)+(y>>16)+(lsw>>16);
return (msw<<16)|(lsw&65535);
};
var rol=function(num,cnt){
return (num<<cnt)|(num>>>(32-cnt));
};
function _85(t,b,c,d){
if(t<20){
return (b&c)|((~b)&d);
}
if(t<40){
return b^c^d;
}
if(t<60){
return (b&c)|(b&d)|(c&d);
}
return b^c^d;
};
function _86(t){
return (t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;
};
return function(_87,_88){
_87[_88>>5]|=128<<(24-_88%32);
_87[((_88+64>>9)<<4)+15]=_88;
var W=Array(80);
var H0=1732584193;
var H1=-271733879;
var H2=-1732584194;
var H3=271733878;
var H4=-1009589776;
for(var i=0;i<_87.length;i+=16){
var a=H0;
var b=H1;
var c=H2;
var d=H3;
var e=H4;
for(var j=0;j<80;j++){
W[j]=((j<16)?_87[i+j]:rol(W[j-3]^W[j-8]^W[j-14]^W[j-16],1));
var T=_84(_84(rol(a,5),_85(j,b,c,d)),_84(_84(e,W[j]),_86(j)));
e=d;
d=c;
c=rol(b,30);
b=a;
a=T;
}
H0=_84(a,H0);
H1=_84(b,H1);
H2=_84(c,H2);
H3=_84(d,H3);
H4=_84(e,H4);
}
return Array(H0,H1,H2,H3,H4);
};
}()};
if(!this.JSON){
JSON={};
}
(function(){
function f(n){
return n<10?"0"+n:n;
};
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(key){
return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z";
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){
return this.valueOf();
};
}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_89=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,_8a,_8b={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},rep;
function _8c(_8d){
_89.lastIndex=0;
return _89.test(_8d)?"\""+_8d.replace(_89,function(a){
var c=_8b[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_8d+"\"";
};
function str(key,_8e){
var i,k,v,_8f,_90=gap,_91,_92=_8e[key];
if(_92&&typeof _92==="object"&&typeof _92.toJSON==="function"){
_92=_92.toJSON(key);
}
if(typeof rep==="function"){
_92=rep.call(_8e,key,_92);
}
switch(typeof _92){
case "string":
return _8c(_92);
case "number":
return isFinite(_92)?String(_92):"null";
case "boolean":
case "null":
return String(_92);
case "object":
if(!_92){
return "null";
}
gap+=_8a;
_91=[];
if(Object.prototype.toString.apply(_92)==="[object Array]"){
_8f=_92.length;
for(i=0;i<_8f;i+=1){
_91[i]=str(i,_92)||"null";
}
v=_91.length===0?"[]":gap?"[\n"+gap+_91.join(",\n"+gap)+"\n"+_90+"]":"["+_91.join(",")+"]";
gap=_90;
return v;
}
if(rep&&typeof rep==="object"){
_8f=rep.length;
for(i=0;i<_8f;i+=1){
k=rep[i];
if(typeof k==="string"){
v=str(k,_92);
if(v){
_91.push(_8c(k)+(gap?": ":":")+v);
}
}
}
}else{
for(k in _92){
if(Object.hasOwnProperty.call(_92,k)){
v=str(k,_92);
if(v){
_91.push(_8c(k)+(gap?": ":":")+v);
}
}
}
}
v=_91.length===0?"{}":gap?"{\n"+gap+_91.join(",\n"+gap)+"\n"+_90+"}":"{"+_91.join(",")+"}";
gap=_90;
return v;
}
};
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_93,_94,_95){
var i;
gap="";
_8a="";
if(typeof _95==="number"){
for(i=0;i<_95;i+=1){
_8a+=" ";
}
}else{
if(typeof _95==="string"){
_8a=_95;
}
}
rep=_94;
if(_94&&typeof _94!=="function"&&(typeof _94!=="object"||typeof _94.length!=="number")){
throw new Error("JSON.stringify");
}
return str("",{"":_93});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(_96,_97){
var j;
function _98(_99,key){
var k,v,_9a=_99[key];
if(_9a&&typeof _9a==="object"){
for(k in _9a){
if(Object.hasOwnProperty.call(_9a,k)){
v=_98(_9a,k);
if(v!==undefined){
_9a[k]=v;
}else{
delete _9a[k];
}
}
}
}
return _97.call(_99,key,_9a);
};
cx.lastIndex=0;
if(cx.test(_96)){
_96=_96.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(_96.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+_96+")");
return typeof _97==="function"?_98({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
})();
OpenAjax.gadgets.util=function(){
function _9b(url){
var _9c;
var _9d=url.indexOf("?");
var _9e=url.indexOf("#");
if(_9e===-1){
_9c=url.substr(_9d+1);
}else{
_9c=[url.substr(_9d+1,_9e-_9d-1),"&",url.substr(_9e+1)].join("");
}
return _9c.split("&");
};
var _9f=null;
var _a0=[];
return {getUrlParameters:function(_a1){
if(_9f!==null&&typeof _a1==="undefined"){
return _9f;
}
var _a2={};
var _a3=_9b(_a1||document.location.href);
var _a4=window.decodeURIComponent?decodeURIComponent:unescape;
for(var i=0,j=_a3.length;i<j;++i){
var pos=_a3[i].indexOf("=");
if(pos===-1){
continue;
}
var _a5=_a3[i].substring(0,pos);
var _a6=_a3[i].substring(pos+1);
_a6=_a6.replace(/\+/g," ");
_a2[_a5]=_a4(_a6);
}
if(typeof _a1==="undefined"){
_9f=_a2;
}
return _a2;
},registerOnLoadHandler:function(_a7){
_a0.push(_a7);
},runOnLoadHandlers:function(){
for(var i=0,j=_a0.length;i<j;++i){
_a0[i]();
}
},"attachBrowserEvent":function(_a8,_a9,_aa,_ab){
if(_a8.addEventListener){
_a8.addEventListener(_a9,_aa,_ab);
}else{
if(_a8.attachEvent){
_a8.attachEvent("on"+_a9,_aa);
}
}
},"removeBrowserEvent":function(_ac,_ad,_ae,_af){
if(_ac.removeEventListener){
_ac.removeEventListener(_ad,_ae,_af);
}else{
if(_ac.detachEvent){
_ac.detachEvent("on"+_ad,_ae);
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
OpenAjax.gadgets.log=function(_b0){
OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.INFO,_b0);
};
OpenAjax.gadgets.warn=function(_b1){
OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.WARNING,_b1);
};
OpenAjax.gadgets.error=function(_b2){
OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.ERROR,_b2);
};
OpenAjax.gadgets.setLogLevel=function(_b3){
OpenAjax.gadgets.log.logLevelThreshold_=_b3;
};
OpenAjax.gadgets.log.logAtLevel=function(_b4,_b5){
if(_b4<OpenAjax.gadgets.log.logLevelThreshold_||!OpenAjax.gadgets.log._console){
return;
}
var _b6;
var _b7=OpenAjax.gadgets.log._console;
if(_b4==OpenAjax.gadgets.log.WARNING&&_b7.warn){
_b7.warn(_b5);
}else{
if(_b4==OpenAjax.gadgets.log.ERROR&&_b7.error){
_b7.error(_b5);
}else{
if(_b7.log){
_b7.log(_b5);
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
var _b8=false;
function _b9(){
if(!_b8){
_b8=true;
OpenAjax.gadgets.util.runOnLoadHandlers();
OpenAjax.gadgets.util.registerOnLoadHandler=function(_ba){
setTimeout(_ba,0);
};
if(window.detachEvent){
window.detachEvent("onload",_b9);
}
}
};
if(window.addEventListener){
document.addEventListener("DOMContentLoaded",_b9,false);
window.addEventListener("load",_b9,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",_b9);
}
}
}
})();
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
if(!OpenAjax.gadgets.rpctx.frameElement){
OpenAjax.gadgets.rpctx.frameElement=function(){
var _bb="__g2c_rpc";
var _bc="__c2g_rpc";
var _bd;
var _be;
function _bf(_c0,_c1,rpc){
try{
if(_c1!==".."){
var fe=window.frameElement;
if(typeof fe[_bb]==="function"){
if(typeof fe[_bb][_bc]!=="function"){
fe[_bb][_bc]=function(_c2){
_bd(OpenAjax.gadgets.json.parse(_c2));
};
}
fe[_bb](OpenAjax.gadgets.json.stringify(rpc));
return;
}
}else{
var _c3=document.getElementById(_c0);
if(typeof _c3[_bb]==="function"&&typeof _c3[_bb][_bc]==="function"){
_c3[_bb][_bc](OpenAjax.gadgets.json.stringify(rpc));
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
},init:function(_c4,_c5){
_bd=_c4;
_be=_c5;
return true;
},setup:function(_c6,_c7){
if(_c6!==".."){
try{
var _c8=document.getElementById(_c6);
_c8[_bb]=function(_c9){
_bd(OpenAjax.gadgets.json.parse(_c9));
};
}
catch(e){
return false;
}
}
if(_c6===".."){
_be("..",true);
var _ca=function(){
window.setTimeout(function(){
OpenAjax.gadgets.rpc.call(_c6,OpenAjax.gadgets.rpc.ACK);
},500);
};
OpenAjax.gadgets.util.registerOnLoadHandler(_ca);
}
return true;
},call:function(_cb,_cc,rpc){
_bf(_cb,_cc,rpc);
}};
}();
}
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
if(!OpenAjax.gadgets.rpctx.ifpc){
OpenAjax.gadgets.rpctx.ifpc=function(){
var _cd=[];
var _ce=0;
var _cf;
var _d0=2000;
var _d1={};
function _d2(_d3){
var _d4=[];
for(var i=0,j=_d3.length;i<j;++i){
_d4.push(encodeURIComponent(OpenAjax.gadgets.json.stringify(_d3[i])));
}
return _d4.join("&");
};
function _d5(src){
var _d6;
for(var i=_cd.length-1;i>=0;--i){
var ifr=_cd[i];
try{
if(ifr&&(ifr.recyclable||ifr.readyState==="complete")){
ifr.parentNode.removeChild(ifr);
if(window.ActiveXObject){
_cd[i]=ifr=null;
_cd.splice(i,1);
}else{
ifr.recyclable=false;
_d6=ifr;
break;
}
}
}
catch(e){
}
}
if(!_d6){
_d6=document.createElement("iframe");
_d6.style.border=_d6.style.width=_d6.style.height="0px";
_d6.style.visibility="hidden";
_d6.style.position="absolute";
_d6.onload=function(){
this.recyclable=true;
};
_cd.push(_d6);
}
_d6.src=src;
window.setTimeout(function(){
document.body.appendChild(_d6);
},0);
};
function _d7(arr,_d8){
for(var i=_d8-1;i>=0;--i){
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
},init:function(_d9,_da){
_cf=_da;
_cf("..",true);
return true;
},setup:function(_db,_dc){
_cf(_db,true);
return true;
},call:function(_dd,_de,rpc){
var _df=OpenAjax.gadgets.rpc.getRelayUrl(_dd);
++_ce;
if(!_df){
OpenAjax.gadgets.warn("No relay file assigned for IFPC");
return;
}
var src=null,_e0=[];
if(rpc.l){
var _e1=rpc.a;
src=[_df,"#",_d2([_de,_ce,1,0,_d2([_de,rpc.s,"","",_de].concat(_e1))])].join("");
_e0.push(src);
}else{
src=[_df,"#",_dd,"&",_de,"@",_ce,"&"].join("");
var _e2=encodeURIComponent(OpenAjax.gadgets.json.stringify(rpc)),_e3=_d0-src.length,_e4=Math.ceil(_e2.length/_e3),_e5=0,_e6;
while(_e2.length>0){
_e6=_e2.substring(0,_e3);
_e2=_e2.substring(_e3);
_e0.push([src,_e4,"&",_e5,"&",_e6].join(""));
_e5+=1;
}
}
do{
_d5(_e0.shift());
}while(_e0.length>0);
return true;
},_receiveMessage:function(_e7,_e8){
var _e9=_e7[1],_ea=parseInt(_e7[2],10),_eb=parseInt(_e7[3],10),_ec=_e7[_e7.length-1],_ed=_ea===1;
if(_ea>1){
if(!_d1[_e9]){
_d1[_e9]=[];
}
_d1[_e9][_eb]=_ec;
if(_d7(_d1[_e9],_ea)){
_ec=_d1[_e9].join("");
delete _d1[_e9];
_ed=true;
}
}
if(_ed){
_e8(OpenAjax.gadgets.json.parse(decodeURIComponent(_ec)));
}
}};
}();
}
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
if(!OpenAjax.gadgets.rpctx.rmr){
OpenAjax.gadgets.rpctx.rmr=function(){
var _ee=500;
var _ef=10;
var _f0={};
var _f1;
var _f2;
function _f3(_f4,_f5,_f6,_f7){
var _f8=function(){
document.body.appendChild(_f4);
_f4.src="about:blank";
if(_f7){
_f4.onload=function(){
_10d(_f7);
};
}
_f4.src=_f5+"#"+_f6;
};
if(document.body){
_f8();
}else{
OpenAjax.gadgets.util.registerOnLoadHandler(function(){
_f8();
});
}
};
function _f9(_fa){
if(typeof _f0[_fa]==="object"){
return;
}
var _fb=document.createElement("iframe");
var _fc=_fb.style;
_fc.position="absolute";
_fc.top="0px";
_fc.border="0";
_fc.opacity="0";
_fc.width="10px";
_fc.height="1px";
_fb.id="rmrtransport-"+_fa;
_fb.name=_fb.id;
var _fd=OpenAjax.gadgets.rpc.getRelayUrl(_fa);
if(!_fd){
_fd=OpenAjax.gadgets.rpc.getOrigin(OpenAjax.gadgets.util.getUrlParameters()["parent"])+"/robots.txt";
}
_f0[_fa]={frame:_fb,receiveWindow:null,relayUri:_fd,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0};
if(_fa!==".."){
_f3(_fb,_fd,_fe(_fa));
}
_ff(_fa);
};
function _ff(_100){
var _101=null;
_f0[_100].searchCounter++;
try{
var _102=OpenAjax.gadgets.rpc._getTargetWin(_100);
if(_100===".."){
_101=_102.frames["rmrtransport-"+OpenAjax.gadgets.rpc.RPC_ID];
}else{
_101=_102.frames["rmrtransport-.."];
}
}
catch(e){
}
var _103=false;
if(_101){
_103=_104(_100,_101);
}
if(!_103){
if(_f0[_100].searchCounter>_ef){
return;
}
window.setTimeout(function(){
_ff(_100);
},_ee);
}
};
function _105(_106,_107,from,rpc){
var _108=null;
if(from!==".."){
_108=_f0[".."];
}else{
_108=_f0[_106];
}
if(_108){
if(_107!==OpenAjax.gadgets.rpc.ACK){
_108.queue.push(rpc);
}
if(_108.waiting||(_108.queue.length===0&&!(_107===OpenAjax.gadgets.rpc.ACK&&rpc&&rpc.ackAlone===true))){
return true;
}
if(_108.queue.length>0){
_108.waiting=true;
}
var url=_108.relayUri+"#"+_fe(_106);
try{
_108.frame.contentWindow.location=url;
var _109=_108.width==10?20:10;
_108.frame.style.width=_109+"px";
_108.width=_109;
}
catch(e){
return false;
}
}
return true;
};
function _fe(_10a){
var _10b=_f0[_10a];
var _10c={id:_10b.sendId};
if(_10b){
_10c.d=Array.prototype.slice.call(_10b.queue,0);
_10c.d.push({s:OpenAjax.gadgets.rpc.ACK,id:_10b.recvId});
}
return OpenAjax.gadgets.json.stringify(_10c);
};
function _10d(_10e){
var _10f=_f0[_10e];
var data=_10f.receiveWindow.location.hash.substring(1);
var _110=OpenAjax.gadgets.json.parse(decodeURIComponent(data))||{};
var _111=_110.d||[];
var _112=false;
var _113=false;
var _114=0;
var _115=(_10f.recvId-_110.id);
for(var i=0;i<_111.length;++i){
var rpc=_111[i];
if(rpc.s===OpenAjax.gadgets.rpc.ACK){
_f2(_10e,true);
if(_10f.waiting){
_113=true;
}
_10f.waiting=false;
var _116=Math.max(0,rpc.id-_10f.sendId);
_10f.queue.splice(0,_116);
_10f.sendId=Math.max(_10f.sendId,rpc.id||0);
continue;
}
_112=true;
if(++_114<=_115){
continue;
}
++_10f.recvId;
_f1(rpc);
}
if(_112||(_113&&_10f.queue.length>0)){
var from=(_10e==="..")?OpenAjax.gadgets.rpc.RPC_ID:"..";
_105(_10e,OpenAjax.gadgets.rpc.ACK,from,{ackAlone:_112});
}
};
function _104(_117,_118){
var _119=_f0[_117];
try{
var _11a=false;
_11a="document" in _118;
if(!_11a){
return false;
}
_11a=typeof _118["document"]=="object";
if(!_11a){
return false;
}
var loc=_118.location.href;
if(loc==="about:blank"){
return false;
}
}
catch(ex){
return false;
}
_119.receiveWindow=_118;
function _11b(){
_10d(_117);
};
if(typeof _118.attachEvent==="undefined"){
_118.onresize=_11b;
}else{
_118.attachEvent("onresize",_11b);
}
if(_117===".."){
_f3(_119.frame,_119.relayUri,_fe(_117),_117);
}else{
_10d(_117);
}
return true;
};
return {getCode:function(){
return "rmr";
},isParentVerifiable:function(){
return true;
},init:function(_11c,_11d){
_f1=_11c;
_f2=_11d;
return true;
},setup:function(_11e,_11f){
try{
_f9(_11e);
}
catch(e){
OpenAjax.gadgets.warn("Caught exception setting up RMR: "+e);
return false;
}
return true;
},call:function(_120,from,rpc){
return _105(_120,rpc.s,from,rpc);
}};
}();
}
OpenAjax.gadgets.rpctx=OpenAjax.gadgets.rpctx||{};
if(!OpenAjax.gadgets.rpctx.wpm){
OpenAjax.gadgets.rpctx.wpm=function(){
var _121,_122;
var _123;
var _124=false;
var _125=false;
function _126(){
var hit=false;
function _127(_128){
if(_128.data=="postmessage.test"){
hit=true;
if(typeof _128.origin==="undefined"){
_125=true;
}
}
};
OpenAjax.gadgets.util.attachBrowserEvent(window,"message",_127,false);
window.postMessage("postmessage.test","*");
if(hit){
_124=true;
}
OpenAjax.gadgets.util.removeBrowserEvent(window,"message",_127,false);
};
function _129(_12a){
var rpc=OpenAjax.gadgets.json.parse(_12a.data);
if(!rpc||!rpc.f){
return;
}
var _12b=OpenAjax.gadgets.rpc.getRelayUrl(rpc.f)||OpenAjax.gadgets.util.getUrlParameters()["parent"];
var _12c=OpenAjax.gadgets.rpc.getOrigin(_12b);
if(!_125?_12a.origin!==_12c:_12a.domain!==/^.+:\/\/([^:]+).*/.exec(_12c)[1]){
return;
}
_121(rpc);
};
return {getCode:function(){
return "wpm";
},isParentVerifiable:function(){
return true;
},init:function(_12d,_12e){
_121=_12d;
_122=_12e;
_126();
if(!_124){
_123=function(win,msg,_12f){
win.postMessage(msg,_12f);
};
}else{
_123=function(win,msg,_130){
window.setTimeout(function(){
win.postMessage(msg,_130);
},0);
};
}
OpenAjax.gadgets.util.attachBrowserEvent(window,"message",_129,false);
_122("..",true);
return true;
},setup:function(_131,_132,_133){
if(_131===".."){
if(_133){
OpenAjax.gadgets.rpc._createRelayIframe(_132);
}else{
OpenAjax.gadgets.rpc.call(_131,OpenAjax.gadgets.rpc.ACK);
}
}
return true;
},call:function(_134,from,rpc){
var _135=OpenAjax.gadgets.rpc._getTargetWin(_134);
var _136=OpenAjax.gadgets.rpc.getRelayUrl(_134)||OpenAjax.gadgets.util.getUrlParameters()["parent"];
var _137=OpenAjax.gadgets.rpc.getOrigin(_136);
if(_137){
_123(_135,OpenAjax.gadgets.json.stringify(rpc),_137);
}else{
OpenAjax.gadgets.error("No relay set (used as window.postMessage targetOrigin)"+", cannot send cross-domain message");
}
return true;
},relayOnload:function(_138,data){
_122(_138,true);
}};
}();
}
if(!OpenAjax.gadgets.rpc){
OpenAjax.gadgets.rpc=function(){
var _139="__cb";
var _13a="";
var ACK="__ack";
var _13b=500;
var _13c=10;
var _13d={};
var _13e={};
var _13f={};
var _140={};
var _141=0;
var _142={};
var _143={};
var _144={};
var _145={};
var _146={};
var _147={};
var _148=(window.top!==window.self);
var _149=window.name;
var _14a=function(){
};
var _14b=0;
var _14c=1;
var _14d=2;
var _14e=(function(){
function _14f(name){
return function(){
OpenAjax.gadgets.log("gadgets.rpc."+name+"("+OpenAjax.gadgets.json.stringify(Array.prototype.slice.call(arguments))+"): call ignored. [caller: "+document.location+", isChild: "+_148+"]");
};
};
return {getCode:function(){
return "noop";
},isParentVerifiable:function(){
return true;
},init:_14f("init"),setup:_14f("setup"),call:_14f("call")};
})();
if(OpenAjax.gadgets.util){
_145=OpenAjax.gadgets.util.getUrlParameters();
}
function _150(){
return typeof window.postMessage==="function"?OpenAjax.gadgets.rpctx.wpm:typeof window.postMessage==="object"?OpenAjax.gadgets.rpctx.wpm:navigator.userAgent.indexOf("WebKit")>0?OpenAjax.gadgets.rpctx.rmr:navigator.product==="Gecko"?OpenAjax.gadgets.rpctx.frameElement:OpenAjax.gadgets.rpctx.ifpc;
};
function _151(_152,_153){
var tx=_154;
if(!_153){
tx=_14e;
}
_146[_152]=tx;
var _155=_147[_152]||[];
for(var i=0;i<_155.length;++i){
var rpc=_155[i];
rpc.t=_156(_152);
tx.call(_152,rpc.f,rpc);
}
_147[_152]=[];
};
var _157=false,_158=false;
function _159(){
if(_158){
return;
}
function _15a(){
_157=true;
};
OpenAjax.gadgets.util.attachBrowserEvent(window,"unload",_15a,false);
_158=true;
};
function _15b(_15c,_15d,_15e,data,_15f){
if(!_140[_15d]||_140[_15d]!==_15e){
OpenAjax.gadgets.error("Invalid auth token. "+_140[_15d]+" vs "+_15e);
_14a(_15d,_14d);
}
_15f.onunload=function(){
if(_143[_15d]&&!_157){
_14a(_15d,_14c);
OpenAjax.gadgets.rpc.removeReceiver(_15d);
}
};
_159();
data=OpenAjax.gadgets.json.parse(decodeURIComponent(data));
_154.relayOnload(_15d,data);
};
function _160(rpc){
if(rpc&&typeof rpc.s==="string"&&typeof rpc.f==="string"&&rpc.a instanceof Array){
if(_140[rpc.f]){
if(_140[rpc.f]!==rpc.t){
OpenAjax.gadgets.error("Invalid auth token. "+_140[rpc.f]+" vs "+rpc.t);
_14a(rpc.f,_14d);
}
}
if(rpc.s===ACK){
window.setTimeout(function(){
_151(rpc.f,true);
},0);
return;
}
if(rpc.c){
rpc.callback=function(_161){
OpenAjax.gadgets.rpc.call(rpc.f,_139,null,rpc.c,_161);
};
}
var _162=(_13d[rpc.s]||_13d[_13a]).apply(rpc,rpc.a);
if(rpc.c&&typeof _162!=="undefined"){
OpenAjax.gadgets.rpc.call(rpc.f,_139,null,rpc.c,_162);
}
}
};
function _163(url){
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
var host=url.substring(url.indexOf("://")+3);
var _164=host.indexOf("/");
if(_164!=-1){
host=host.substring(0,_164);
}
var _165=url.substring(0,url.indexOf("://"));
var _166="";
var _167=host.indexOf(":");
if(_167!=-1){
var port=host.substring(_167+1);
host=host.substring(0,_167);
if((_165==="http"&&port!=="80")||(_165==="https"&&port!=="443")){
_166=":"+port;
}
}
return _165+"://"+host+_166;
};
function _168(id){
if(typeof id==="undefined"||id===".."){
return window.parent;
}
id=String(id);
var _169=window.frames[id];
if(_169){
return _169;
}
_169=document.getElementById(id);
if(_169&&_169.contentWindow){
return _169.contentWindow;
}
return null;
};
var _154=_150();
_13d[_13a]=function(){
OpenAjax.gadgets.warn("Unknown RPC service: "+this.s);
};
_13d[_139]=function(_16a,_16b){
var _16c=_142[_16a];
if(_16c){
delete _142[_16a];
_16c(_16b);
}
};
function _16d(_16e,_16f,_170){
if(_143[_16e]===true){
return;
}
if(typeof _143[_16e]==="undefined"){
_143[_16e]=0;
}
var _171=document.getElementById(_16e);
if(_16e===".."||_171!=null){
if(_154.setup(_16e,_16f,_170)===true){
_143[_16e]=true;
return;
}
}
if(_143[_16e]!==true&&_143[_16e]++<_13c){
window.setTimeout(function(){
_16d(_16e,_16f,_170);
},_13b);
}else{
_146[_16e]=_14e;
_143[_16e]=true;
}
};
function _172(_173,rpc){
if(typeof _144[_173]==="undefined"){
_144[_173]=false;
var _174=OpenAjax.gadgets.rpc.getRelayUrl(_173);
if(_163(_174)!==_163(window.location.href)){
return false;
}
var _175=_168(_173);
try{
_144[_173]=_175.OpenAjax.gadgets.rpc.receiveSameDomain;
}
catch(e){
OpenAjax.gadgets.error("Same domain call failed: parent= incorrectly set.");
}
}
if(typeof _144[_173]==="function"){
_144[_173](rpc);
return true;
}
return false;
};
function _176(_177,url,_178){
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
_13e[_177]=url;
_13f[_177]=!!_178;
};
function _156(_179){
return _140[_179];
};
function _17a(_17b,_17c,_17d){
_17c=_17c||"";
_140[_17b]=String(_17c);
_16d(_17b,_17c,_17d);
};
function _17e(_17f,_180){
function init(_181){
var _182=_181?_181.rpc:{};
var _183=_182.parentRelayUrl;
if(_183.substring(0,7)!=="http://"&&_183.substring(0,8)!=="https://"&&_183.substring(0,2)!=="//"){
if(typeof _145.parent==="string"&&_145.parent!==""){
if(_183.substring(0,1)!=="/"){
var _184=_145.parent.lastIndexOf("/");
_183=_145.parent.substring(0,_184+1)+_183;
}else{
_183=_163(_145.parent)+_183;
}
}
}
var _185=!!_182.useLegacyProtocol;
_176("..",_183,_185);
if(_185){
_154=OpenAjax.gadgets.rpctx.ifpc;
_154.init(_160,_151);
}
var _186=_180||_145.forcesecure||false;
_17a("..",_17f,_186);
};
var _187={parentRelayUrl:OpenAjax.gadgets.config.NonEmptyStringValidator};
OpenAjax.gadgets.config.register("rpc",_187,init);
};
function _188(_189,_18a,_18b){
var _18c=_18b||_145.forcesecure||false;
var _18d=_18a||_145.parent;
if(_18d){
_176("..",_18d);
_17a("..",_189,_18c);
}
};
function _18e(_18f,_190,_191,_192){
if(!OpenAjax.gadgets.util){
return;
}
var _193=document.getElementById(_18f);
if(!_193){
throw new Error("Cannot set up gadgets.rpc receiver with ID: "+_18f+", element not found.");
}
var _194=_190||_193.src;
_176(_18f,_194);
var _195=OpenAjax.gadgets.util.getUrlParameters(_193.src);
var _196=_191||_195.rpctoken;
var _197=_192||_195.forcesecure;
_17a(_18f,_196,_197);
};
function _198(_199,_19a,_19b,_19c){
if(_199===".."){
var _19d=_19b||_145.rpctoken||_145.ifpctok||"";
if(window["__isgadget"]===true){
_17e(_19d,_19c);
}else{
_188(_19d,_19a,_19c);
}
}else{
_18e(_199,_19a,_19b,_19c);
}
};
return {config:function(_19e){
if(typeof _19e.securityCallback==="function"){
_14a=_19e.securityCallback;
}
},register:function(_19f,_1a0){
if(_19f===_139||_19f===ACK){
throw new Error("Cannot overwrite callback/ack service");
}
if(_19f===_13a){
throw new Error("Cannot overwrite default service:"+" use registerDefault");
}
_13d[_19f]=_1a0;
},unregister:function(_1a1){
if(_1a1===_139||_1a1===ACK){
throw new Error("Cannot delete callback/ack service");
}
if(_1a1===_13a){
throw new Error("Cannot delete default service:"+" use unregisterDefault");
}
delete _13d[_1a1];
},registerDefault:function(_1a2){
_13d[_13a]=_1a2;
},unregisterDefault:function(){
delete _13d[_13a];
},forceParentVerifiable:function(){
if(!_154.isParentVerifiable()){
_154=OpenAjax.gadgets.rpctx.ifpc;
}
},call:function(_1a3,_1a4,_1a5,_1a6){
_1a3=_1a3||"..";
var from="..";
if(_1a3===".."){
from=_149;
}
++_141;
if(_1a5){
_142[_141]=_1a5;
}
var rpc={s:_1a4,f:from,c:_1a5?_141:0,a:Array.prototype.slice.call(arguments,3),t:_140[_1a3],l:_13f[_1a3]};
if(_1a3!==".."&&!document.getElementById(_1a3)){
OpenAjax.gadgets.log("WARNING: attempted send to nonexistent frame: "+_1a3);
return;
}
if(_172(_1a3,rpc)){
return;
}
var _1a7=_146[_1a3];
if(!_1a7){
if(!_147[_1a3]){
_147[_1a3]=[rpc];
}else{
_147[_1a3].push(rpc);
}
return;
}
if(_13f[_1a3]){
_1a7=OpenAjax.gadgets.rpctx.ifpc;
}
if(_1a7.call(_1a3,from,rpc)===false){
_146[_1a3]=_14e;
_154.call(_1a3,from,rpc);
}
},getRelayUrl:function(_1a8){
var url=_13e[_1a8];
if(url&&url.substring(0,1)==="/"){
if(url.substring(1,2)==="/"){
url=document.location.protocol+url;
}else{
url=document.location.protocol+"//"+document.location.host+url;
}
}
return url;
},setRelayUrl:_176,setAuthToken:_17a,setupReceiver:_198,getAuthToken:_156,removeReceiver:function(_1a9){
delete _13e[_1a9];
delete _13f[_1a9];
delete _140[_1a9];
delete _143[_1a9];
delete _144[_1a9];
delete _146[_1a9];
},getRelayChannel:function(){
return _154.getCode();
},receive:function(_1aa,_1ab){
if(_1aa.length>4){
_154._receiveMessage(_1aa,_160);
}else{
_15b.apply(null,_1aa.concat(_1ab));
}
},receiveSameDomain:function(rpc){
rpc.a=Array.prototype.slice.call(rpc.a);
window.setTimeout(function(){
_160(rpc);
},0);
},getOrigin:_163,getReceiverOrigin:function(_1ac){
var _1ad=_146[_1ac];
if(!_1ad){
return null;
}
if(!_1ad.isParentVerifiable(_1ac)){
return null;
}
var _1ae=OpenAjax.gadgets.rpc.getRelayUrl(_1ac)||OpenAjax.gadgets.util.getUrlParameters().parent;
return OpenAjax.gadgets.rpc.getOrigin(_1ae);
},init:function(){
if(_154.init(_160,_151)===false){
_154=_14e;
}
if(_148){
_198("..");
}
},_getTargetWin:_168,_createRelayIframe:function(_1af,data){
var _1b0=OpenAjax.gadgets.rpc.getRelayUrl("..");
if(!_1b0){
return;
}
var src=_1b0+"#..&"+_149+"&"+_1af+"&"+encodeURIComponent(OpenAjax.gadgets.json.stringify(data));
var _1b1=document.createElement("iframe");
_1b1.style.border=_1b1.style.width=_1b1.style.height="0px";
_1b1.style.visibility="hidden";
_1b1.style.position="absolute";
function _1b2(){
document.body.appendChild(_1b1);
_1b1.src="javascript:\"<html></html>\"";
_1b1.src=src;
};
if(document.body){
_1b2();
}else{
OpenAjax.gadgets.util.registerOnLoadHandler(function(){
_1b2();
});
}
return _1b1;
},ACK:ACK,RPC_ID:_149,SEC_ERROR_LOAD_TIMEOUT:_14b,SEC_ERROR_FRAME_PHISH:_14c,SEC_ERROR_FORGED_MSG:_14d};
}();
OpenAjax.gadgets.rpc.init();
}

