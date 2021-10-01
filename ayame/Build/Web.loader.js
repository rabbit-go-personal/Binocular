function createUnityInstance(e,t,n){function r(e){var t="unhandledrejection"==e.type&&"object"==typeof e.reason?e.reason:"object"==typeof e.error?e.error:null,n=t?t.toString():"string"==typeof e.message?e.message:"string"==typeof e.reason?e.reason:"";if(t&&"string"==typeof t.stack&&(n+="\n"+t.stack.substring(t.stack.lastIndexOf(n,0)?0:n.length).replace(/(^\n*|\n*$)/g,"")),n&&u.stackTraceRegExp&&u.stackTraceRegExp.test(n)){var r=e instanceof ErrorEvent?e.filename:t&&"string"==typeof t.fileName?t.fileName:t&&"string"==typeof t.sourceURL?t.sourceURL:"",i=e instanceof ErrorEvent?e.lineno:t&&"number"==typeof t.lineNumber?t.lineNumber:t&&"number"==typeof t.line?t.line:0;a(n,r,i)}}function i(e){e.preventDefault()}function a(e,t,n){if(u.startupErrorHandler)return void u.startupErrorHandler(e,t,n);if(!(u.errorHandler&&u.errorHandler(e,t,n)||(console.log("Invoking error handler due to\n"+e),"function"==typeof dump&&dump("Invoking error handler due to\n"+e),e.indexOf("UnknownError")!=-1||e.indexOf("Program terminated with exit(0)")!=-1||a.didShowErrorMessage))){var e="An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n"+e;e.indexOf("DISABLE_EXCEPTION_CATCHING")!=-1?e="An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace.":e.indexOf("Cannot enlarge memory arrays")!=-1?e="Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.":e.indexOf("Invalid array buffer length")==-1&&e.indexOf("Invalid typed array length")==-1&&e.indexOf("out of memory")==-1&&e.indexOf("could not allocate memory")==-1||(e="The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."),alert(e),a.didShowErrorMessage=!0}}function o(e,t){if("symbolsUrl"!=e){var r=u.downloadProgress[e];r||(r=u.downloadProgress[e]={started:!1,finished:!1,lengthComputable:!1,total:0,loaded:0}),"object"!=typeof t||"progress"!=t.type&&"load"!=t.type||(r.started||(r.started=!0,r.lengthComputable=t.lengthComputable,r.total=t.total),r.loaded=t.loaded,"load"==t.type&&(r.finished=!0));var i=0,a=0,o=0,s=0,l=0;for(var e in u.downloadProgress){var r=u.downloadProgress[e];if(!r.started)return 0;o++,r.lengthComputable?(i+=r.loaded,a+=r.total,s++):r.finished||l++}var d=o?(o-l-(a?s*(a-i)/a:0))/o:0;n(.9*d)}}function s(e,t,n){for(var r in m)if(m[r].hasUnityMarker(e)){t&&console.log('You can reduce startup time if you configure your web server to add "Content-Encoding: '+r+'" response header when serving "'+t+'" file.');var i=m[r];if(!i.worker){var a=URL.createObjectURL(new Blob(["this.require = ",i.require.toString(),"; this.decompress = ",i.decompress.toString(),"; this.onmessage = ",function(e){var t={id:e.data.id,decompressed:this.decompress(e.data.compressed)};postMessage(t,t.decompressed?[t.decompressed.buffer]:[])}.toString(),"; postMessage({ ready: true });"],{type:"application/javascript"}));i.worker=new Worker(a),i.worker.onmessage=function(e){return e.data.ready?void URL.revokeObjectURL(a):(this.callbacks[e.data.id](e.data.decompressed),void delete this.callbacks[e.data.id])},i.worker.callbacks={},i.worker.nextCallbackId=0}var o=i.worker.nextCallbackId++;return i.worker.callbacks[o]=n,void i.worker.postMessage({id:o,compressed:e},[e.buffer])}n(e)}function l(e){return new Promise(function(t,n){o(e);var r=new XMLHttpRequest;r.open("GET",u[e]),r.responseType="arraybuffer",r.addEventListener("progress",function(t){o(e,t)}),r.addEventListener("load",function(n){o(e,n),s(new Uint8Array(r.response),u[e],t)}),r.send()})}function d(){return l("frameworkUrl").then(function(e){var t=URL.createObjectURL(new Blob([e],{type:"application/javascript"}));return new Promise(function(e,n){var r=document.createElement("script");r.src=t,r.onload=function(){var n=unityFramework;unityFramework=null,r.onload=null,URL.revokeObjectURL(t),e(n)},document.body.appendChild(r),u.deinitializers.push(function(){document.body.removeChild(r)})})})}function f(){Promise.all([d(),l("codeUrl")]).then(function(e){u.wasmBinary=e[1],e[0](u)});var e=l("dataUrl");u.preRun.push(function(){u.addRunDependency("dataUrl"),e.then(function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=0,r="UnityWebData1.0\0";if(!String.fromCharCode.apply(null,e.subarray(n,n+r.length))==r)throw"unknown data format";n+=r.length;var i=t.getUint32(n,!0);for(n+=4;n<i;){var a=t.getUint32(n,!0);n+=4;var o=t.getUint32(n,!0);n+=4;var s=t.getUint32(n,!0);n+=4;var l=String.fromCharCode.apply(null,e.subarray(n,n+s));n+=s;for(var d=0,f=l.indexOf("/",d)+1;f>0;d=f,f=l.indexOf("/",d)+1)u.FS_createPath(l.substring(0,d),l.substring(d,f-1),!0,!0);u.FS_createDataFile(l,null,e.subarray(a,a+o),!0,!0,!0)}u.removeRunDependency("dataUrl")})})}n=n||function(){};var u={canvas:e,webglContextAttributes:{preserveDrawingBuffer:!1},streamingAssetsUrl:"StreamingAssets",downloadProgress:{},deinitializers:[],intervals:{},setInterval:function(e,t){var n=window.setInterval(e,t);return this.intervals[n]=!0,n},clearInterval:function(e){delete this.intervals[e],window.clearInterval(e)},preRun:[],postRun:[],print:function(e){console.log(e)},printErr:function(e){console.error(e)},locateFile:function(e){return e},disabledCanvasEvents:["contextmenu","dragstart"]};for(var c in t)u[c]=t[c];u.streamingAssetsUrl=new URL(u.streamingAssetsUrl,document.URL).href;var h=u.disabledCanvasEvents.slice();h.forEach(function(t){e.addEventListener(t,i)}),window.addEventListener("error",r),window.addEventListener("unhandledrejection",r);var b={Module:u,SetFullscreen:function(){return u.SetFullscreen?u.SetFullscreen.apply(u,arguments):void u.print("Failed to set Fullscreen mode: Player not loaded yet.")},SendMessage:function(){return u.SendMessage?u.SendMessage.apply(u,arguments):void u.print("Failed to execute SendMessage: Player not loaded yet.")},Quit:function(){return new Promise(function(t,n){u.shouldQuit=!0,u.onQuit=t,h.forEach(function(t){e.removeEventListener(t,i)}),window.removeEventListener("error",r),window.removeEventListener("unhandledrejection",r)})}};u.SystemInfo=function(){function e(e,t,n){return e=RegExp(e,"i").exec(t),e&&e[n]}for(var t,n,r,i,a,o,s=navigator.userAgent+" ",l=[["Firefox","Firefox"],["OPR","Opera"],["Edg","Edge"],["SamsungBrowser","Samsung Browser"],["Trident","Internet Explorer"],["MSIE","Internet Explorer"],["Chrome","Chrome"],["Safari","Safari"]],d=0;d<l.length;++d)if(n=e(l[d][0]+"[/ ](.*?)[ \\)]",s,1)){t=l[d][1];break}"Safari"==t&&(n=e("Version/(.*?) ",s,1)),"Internet Explorer"==t&&(n=e("rv:(.*?)\\)? ",s,1)||n);for(var f=[["Windows (.*?)[;)]","Windows"],["Android ([0-9_.]+)","Android"],["iPhone OS ([0-9_.]+)","iPhoneOS"],["iPad.*? OS ([0-9_.]+)","iPadOS"],["FreeBSD( )","FreeBSD"],["OpenBSD( )","OpenBSD"],["Linux|X11()","Linux"],["Mac OS X ([0-9_.]+)","macOS"],["bot|google|baidu|bing|msn|teoma|slurp|yandex","Search Bot"]],u=0;u<f.length;++u)if(i=e(f[u][0],s,1)){r=f[u][1],i=i.replace(/_/g,".");break}var c={"NT 5.0":"2000","NT 5.1":"XP","NT 5.2":"Server 2003","NT 6.0":"Vista","NT 6.1":"7","NT 6.2":"8","NT 6.3":"8.1","NT 10.0":"10"};i=c[i]||i,a=document.createElement("canvas"),a&&(gl=a.getContext("webgl2"),glVersion=gl?2:0,gl||(gl=a&&a.getContext("webgl"))&&(glVersion=1),gl&&(o=gl.getExtension("WEBGL_debug_renderer_info")&&gl.getParameter(37446)||gl.getParameter(7937)));var h="undefined"!=typeof SharedArrayBuffer,b="object"==typeof WebAssembly&&"function"==typeof WebAssembly.compile;return{width:screen.width,height:screen.height,userAgent:s.trim(),browser:t,browserVersion:n,mobile:/Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),os:r,osVersion:i,gpu:o,language:navigator.userLanguage||navigator.language,hasWebGL:glVersion,hasCursorLock:!!document.body.requestPointerLock,hasFullscreen:!!document.body.requestFullscreen,hasThreads:h,hasWasm:b,hasWasmThreads:function(){var e=b&&h&&new WebAssembly.Memory({initial:1,maximum:1,shared:!0});return e&&e.buffer instanceof SharedArrayBuffer}()}}(),u.abortHandler=function(e){return a(e,"",0),!0},Error.stackTraceLimit=Math.max(Error.stackTraceLimit||0,50);var m={gzip:{require:function(e){var t={"inflate.js":function(e,t,n){"use strict";function r(e){if(!(this instanceof r))return new r(e);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var n=o.inflateInit2(this.strm,t.windowBits);if(n!==d.Z_OK)throw new Error(f[n]);this.header=new c,o.inflateGetHeader(this.strm,this.header)}function i(e,t){var n=new r(t);if(n.push(e,!0),n.err)throw n.msg||f[n.err];return n.result}function a(e,t){return t=t||{},t.raw=!0,i(e,t)}var o=e("./zlib/inflate"),s=e("./utils/common"),l=e("./utils/strings"),d=e("./zlib/constants"),f=e("./zlib/messages"),u=e("./zlib/zstream"),c=e("./zlib/gzheader"),h=Object.prototype.toString;r.prototype.push=function(e,t){var n,r,i,a,f,u,c=this.strm,b=this.options.chunkSize,m=this.options.dictionary,g=!1;if(this.ended)return!1;r=t===~~t?t:t===!0?d.Z_FINISH:d.Z_NO_FLUSH,"string"==typeof e?c.input=l.binstring2buf(e):"[object ArrayBuffer]"===h.call(e)?c.input=new Uint8Array(e):c.input=e,c.next_in=0,c.avail_in=c.input.length;do{if(0===c.avail_out&&(c.output=new s.Buf8(b),c.next_out=0,c.avail_out=b),n=o.inflate(c,d.Z_NO_FLUSH),n===d.Z_NEED_DICT&&m&&(u="string"==typeof m?l.string2buf(m):"[object ArrayBuffer]"===h.call(m)?new Uint8Array(m):m,n=o.inflateSetDictionary(this.strm,u)),n===d.Z_BUF_ERROR&&g===!0&&(n=d.Z_OK,g=!1),n!==d.Z_STREAM_END&&n!==d.Z_OK)return this.onEnd(n),this.ended=!0,!1;c.next_out&&(0!==c.avail_out&&n!==d.Z_STREAM_END&&(0!==c.avail_in||r!==d.Z_FINISH&&r!==d.Z_SYNC_FLUSH)||("string"===this.options.to?(i=l.utf8border(c.output,c.next_out),a=c.next_out-i,f=l.buf2string(c.output,i),c.next_out=a,c.avail_out=b-a,a&&s.arraySet(c.output,c.output,i,a,0),this.onData(f)):this.onData(s.shrinkBuf(c.output,c.next_out)))),0===c.avail_in&&0===c.avail_out&&(g=!0)}while((c.avail_in>0||0===c.avail_out)&&n!==d.Z_STREAM_END);return n===d.Z_STREAM_END&&(r=d.Z_FINISH),r===d.Z_FINISH?(n=o.inflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===d.Z_OK):r!==d.Z_SYNC_FLUSH||(this.onEnd(d.Z_OK),c.avail_out=0,!0)},r.prototype.onData=function(e){this.chunks.push(e)},r.prototype.onEnd=function(e){e===d.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Inflate=r,n.inflate=i,n.inflateRaw=a,n.ungzip=i},"utils/common.js":function(e,t,n){"use strict";var r="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;n.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var n=t.shift();if(n){if("object"!=typeof n)throw new TypeError(n+"must be non-object");for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}}return e},n.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,n,r,i){if(t.subarray&&e.subarray)return void e.set(t.subarray(n,n+r),i);for(var a=0;a<r;a++)e[i+a]=t[n+a]},flattenChunks:function(e){var t,n,r,i,a,o;for(r=0,t=0,n=e.length;t<n;t++)r+=e[t].length;for(o=new Uint8Array(r),i=0,t=0,n=e.length;t<n;t++)a=e[t],o.set(a,i),i+=a.length;return o}},a={arraySet:function(e,t,n,r,i){for(var a=0;a<r;a++)e[i+a]=t[n+a]},flattenChunks:function(e){return[].concat.apply([],e)}};n.setTyped=function(e){e?(n.Buf8=Uint8Array,n.Buf16=Uint16Array,n.Buf32=Int32Array,n.assign(n,i)):(n.Buf8=Array,n.Buf16=Array,n.Buf32=Array,n.assign(n,a))},n.setTyped(r)},"utils/strings.js":function(e,t,n){"use strict";function r(e,t){if(t<65537&&(e.subarray&&o||!e.subarray&&a))return String.fromCharCode.apply(null,i.shrinkBuf(e,t));for(var n="",r=0;r<t;r++)n+=String.fromCharCode(e[r]);return n}var i=e("./common"),a=!0,o=!0;try{String.fromCharCode.apply(null,[0])}catch(e){a=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){o=!1}for(var s=new i.Buf8(256),l=0;l<256;l++)s[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;s[254]=s[254]=1,n.string2buf=function(e){var t,n,r,a,o,s=e.length,l=0;for(a=0;a<s;a++)n=e.charCodeAt(a),55296===(64512&n)&&a+1<s&&(r=e.charCodeAt(a+1),56320===(64512&r)&&(n=65536+(n-55296<<10)+(r-56320),a++)),l+=n<128?1:n<2048?2:n<65536?3:4;for(t=new i.Buf8(l),o=0,a=0;o<l;a++)n=e.charCodeAt(a),55296===(64512&n)&&a+1<s&&(r=e.charCodeAt(a+1),56320===(64512&r)&&(n=65536+(n-55296<<10)+(r-56320),a++)),n<128?t[o++]=n:n<2048?(t[o++]=192|n>>>6,t[o++]=128|63&n):n<65536?(t[o++]=224|n>>>12,t[o++]=128|n>>>6&63,t[o++]=128|63&n):(t[o++]=240|n>>>18,t[o++]=128|n>>>12&63,t[o++]=128|n>>>6&63,t[o++]=128|63&n);return t},n.buf2binstring=function(e){return r(e,e.length)},n.binstring2buf=function(e){for(var t=new i.Buf8(e.length),n=0,r=t.length;n<r;n++)t[n]=e.charCodeAt(n);return t},n.buf2string=function(e,t){var n,i,a,o,l=t||e.length,d=new Array(2*l);for(i=0,n=0;n<l;)if(a=e[n++],a<128)d[i++]=a;else if(o=s[a],o>4)d[i++]=65533,n+=o-1;else{for(a&=2===o?31:3===o?15:7;o>1&&n<l;)a=a<<6|63&e[n++],o--;o>1?d[i++]=65533:a<65536?d[i++]=a:(a-=65536,d[i++]=55296|a>>10&1023,d[i++]=56320|1023&a)}return r(d,i)},n.utf8border=function(e,t){var n;for(t=t||e.length,t>e.length&&(t=e.length),n=t-1;n>=0&&128===(192&e[n]);)n--;return n<0?t:0===n?t:n+s[e[n]]>t?n:t}},"zlib/inflate.js":function(e,t,n){"use strict";function r(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function i(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new p.Buf16(320),this.work=new p.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=z,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new p.Buf32(me),t.distcode=t.distdyn=new p.Buf32(ge),t.sane=1,t.back=-1,C):U}function o(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,a(e)):U}function s(e,t){var n,r;return e&&e.state?(r=e.state,t<0?(n=0,t=-t):(n=(t>>4)+1,t<48&&(t&=15)),t&&(t<8||t>15)?U:(null!==r.window&&r.wbits!==t&&(r.window=null),r.wrap=n,r.wbits=t,o(e))):U}function l(e,t){var n,r;return e?(r=new i,e.state=r,r.window=null,n=s(e,t),n!==C&&(e.state=null),n):U}function d(e){return l(e,pe)}function f(e){if(ve){var t;for(g=new p.Buf32(512),w=new p.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(_(S,e.lens,0,288,g,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;_(E,e.lens,0,32,w,0,e.work,{bits:5}),ve=!1}e.lencode=g,e.lenbits=9,e.distcode=w,e.distbits=5}function u(e,t,n,r){var i,a=e.state;return null===a.window&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new p.Buf8(a.wsize)),r>=a.wsize?(p.arraySet(a.window,t,n-a.wsize,a.wsize,0),a.wnext=0,a.whave=a.wsize):(i=a.wsize-a.wnext,i>r&&(i=r),p.arraySet(a.window,t,n-r,i,a.wnext),r-=i,r?(p.arraySet(a.window,t,n-r,r,0),a.wnext=r,a.whave=a.wsize):(a.wnext+=i,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=i))),0}function c(e,t){var n,i,a,o,s,l,d,c,h,b,m,g,w,me,ge,we,pe,ve,ke,ye,_e,xe,Se,Ee,Be=0,Ae=new p.Buf8(4),Le=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;n=e.state,n.mode===V&&(n.mode=q),s=e.next_out,a=e.output,d=e.avail_out,o=e.next_in,i=e.input,l=e.avail_in,c=n.hold,h=n.bits,b=l,m=d,xe=C;e:for(;;)switch(n.mode){case z:if(0===n.wrap){n.mode=q;break}for(;h<16;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(2&n.wrap&&35615===c){n.check=0,Ae[0]=255&c,Ae[1]=c>>>8&255,n.check=k(n.check,Ae,2,0),c=0,h=0,n.mode=F;break}if(n.flags=0,n.head&&(n.head.done=!1),!(1&n.wrap)||(((255&c)<<8)+(c>>8))%31){e.msg="incorrect header check",n.mode=ce;break}if((15&c)!==N){e.msg="unknown compression method",n.mode=ce;break}if(c>>>=4,h-=4,_e=(15&c)+8,0===n.wbits)n.wbits=_e;else if(_e>n.wbits){e.msg="invalid window size",n.mode=ce;break}n.dmax=1<<_e,e.adler=n.check=1,n.mode=512&c?K:V,c=0,h=0;break;case F:for(;h<16;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(n.flags=c,(255&n.flags)!==N){e.msg="unknown compression method",n.mode=ce;break}if(57344&n.flags){e.msg="unknown header flags set",n.mode=ce;break}n.head&&(n.head.text=c>>8&1),512&n.flags&&(Ae[0]=255&c,Ae[1]=c>>>8&255,n.check=k(n.check,Ae,2,0)),c=0,h=0,n.mode=j;case j:for(;h<32;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}n.head&&(n.head.time=c),512&n.flags&&(Ae[0]=255&c,Ae[1]=c>>>8&255,Ae[2]=c>>>16&255,Ae[3]=c>>>24&255,n.check=k(n.check,Ae,4,0)),c=0,h=0,n.mode=D;case D:for(;h<16;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}n.head&&(n.head.xflags=255&c,n.head.os=c>>8),512&n.flags&&(Ae[0]=255&c,Ae[1]=c>>>8&255,n.check=k(n.check,Ae,2,0)),c=0,h=0,n.mode=P;case P:if(1024&n.flags){for(;h<16;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}n.length=c,n.head&&(n.head.extra_len=c),512&n.flags&&(Ae[0]=255&c,Ae[1]=c>>>8&255,n.check=k(n.check,Ae,2,0)),c=0,h=0}else n.head&&(n.head.extra=null);n.mode=M;case M:if(1024&n.flags&&(g=n.length,g>l&&(g=l),g&&(n.head&&(_e=n.head.extra_len-n.length,n.head.extra||(n.head.extra=new Array(n.head.extra_len)),p.arraySet(n.head.extra,i,o,g,_e)),512&n.flags&&(n.check=k(n.check,i,g,o)),l-=g,o+=g,n.length-=g),n.length))break e;n.length=0,n.mode=W;case W:if(2048&n.flags){if(0===l)break e;g=0;do _e=i[o+g++],n.head&&_e&&n.length<65536&&(n.head.name+=String.fromCharCode(_e));while(_e&&g<l);if(512&n.flags&&(n.check=k(n.check,i,g,o)),l-=g,o+=g,_e)break e}else n.head&&(n.head.name=null);n.length=0,n.mode=H;case H:if(4096&n.flags){if(0===l)break e;g=0;do _e=i[o+g++],n.head&&_e&&n.length<65536&&(n.head.comment+=String.fromCharCode(_e));while(_e&&g<l);if(512&n.flags&&(n.check=k(n.check,i,g,o)),l-=g,o+=g,_e)break e}else n.head&&(n.head.comment=null);n.mode=G;case G:if(512&n.flags){for(;h<16;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(c!==(65535&n.check)){e.msg="header crc mismatch",n.mode=ce;break}c=0,h=0}n.head&&(n.head.hcrc=n.flags>>9&1,n.head.done=!0),e.adler=n.check=0,n.mode=V;break;case K:for(;h<32;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}e.adler=n.check=r(c),c=0,h=0,n.mode=Y;case Y:if(0===n.havedict)return e.next_out=s,e.avail_out=d,e.next_in=o,e.avail_in=l,n.hold=c,n.bits=h,R;e.adler=n.check=1,n.mode=V;case V:if(t===A||t===L)break e;case q:if(n.last){c>>>=7&h,h-=7&h,n.mode=de;break}for(;h<3;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}switch(n.last=1&c,c>>>=1,h-=1,3&c){case 0:n.mode=X;break;case 1:if(f(n),n.mode=ne,t===L){c>>>=2,h-=2;break e}break;case 2:n.mode=$;break;case 3:e.msg="invalid block type",n.mode=ce}c>>>=2,h-=2;break;case X:for(c>>>=7&h,h-=7&h;h<32;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if((65535&c)!==(c>>>16^65535)){e.msg="invalid stored block lengths",n.mode=ce;break}if(n.length=65535&c,c=0,h=0,n.mode=Q,t===L)break e;case Q:n.mode=J;case J:if(g=n.length){if(g>l&&(g=l),g>d&&(g=d),0===g)break e;p.arraySet(a,i,o,g,s),l-=g,o+=g,d-=g,s+=g,n.length-=g;break}n.mode=V;break;case $:for(;h<14;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(n.nlen=(31&c)+257,c>>>=5,h-=5,n.ndist=(31&c)+1,c>>>=5,h-=5,n.ncode=(15&c)+4,c>>>=4,h-=4,n.nlen>286||n.ndist>30){e.msg="too many length or distance symbols",n.mode=ce;break}n.have=0,n.mode=ee;case ee:for(;n.have<n.ncode;){for(;h<3;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}n.lens[Le[n.have++]]=7&c,c>>>=3,h-=3}for(;n.have<19;)n.lens[Le[n.have++]]=0;if(n.lencode=n.lendyn,n.lenbits=7,Se={bits:n.lenbits},xe=_(x,n.lens,0,19,n.lencode,0,n.work,Se),n.lenbits=Se.bits,xe){e.msg="invalid code lengths set",n.mode=ce;break}n.have=0,n.mode=te;case te:for(;n.have<n.nlen+n.ndist;){for(;Be=n.lencode[c&(1<<n.lenbits)-1],ge=Be>>>24,we=Be>>>16&255,pe=65535&Be,!(ge<=h);){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(pe<16)c>>>=ge,h-=ge,n.lens[n.have++]=pe;else{if(16===pe){for(Ee=ge+2;h<Ee;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(c>>>=ge,h-=ge,0===n.have){e.msg="invalid bit length repeat",n.mode=ce;break}_e=n.lens[n.have-1],g=3+(3&c),c>>>=2,h-=2}else if(17===pe){for(Ee=ge+3;h<Ee;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}c>>>=ge,h-=ge,_e=0,g=3+(7&c),c>>>=3,h-=3}else{for(Ee=ge+7;h<Ee;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}c>>>=ge,h-=ge,_e=0,g=11+(127&c),c>>>=7,h-=7}if(n.have+g>n.nlen+n.ndist){e.msg="invalid bit length repeat",n.mode=ce;break}for(;g--;)n.lens[n.have++]=_e}}if(n.mode===ce)break;if(0===n.lens[256]){e.msg="invalid code -- missing end-of-block",n.mode=ce;break}if(n.lenbits=9,Se={bits:n.lenbits},xe=_(S,n.lens,0,n.nlen,n.lencode,0,n.work,Se),n.lenbits=Se.bits,xe){e.msg="invalid literal/lengths set",n.mode=ce;break}if(n.distbits=6,n.distcode=n.distdyn,Se={bits:n.distbits},xe=_(E,n.lens,n.nlen,n.ndist,n.distcode,0,n.work,Se),n.distbits=Se.bits,xe){e.msg="invalid distances set",n.mode=ce;break}if(n.mode=ne,t===L)break e;case ne:n.mode=re;case re:if(l>=6&&d>=258){e.next_out=s,e.avail_out=d,e.next_in=o,e.avail_in=l,n.hold=c,n.bits=h,y(e,m),s=e.next_out,a=e.output,d=e.avail_out,o=e.next_in,i=e.input,l=e.avail_in,c=n.hold,h=n.bits,n.mode===V&&(n.back=-1);break}for(n.back=0;Be=n.lencode[c&(1<<n.lenbits)-1],ge=Be>>>24,we=Be>>>16&255,pe=65535&Be,!(ge<=h);){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(we&&0===(240&we)){for(ve=ge,ke=we,ye=pe;Be=n.lencode[ye+((c&(1<<ve+ke)-1)>>ve)],ge=Be>>>24,we=Be>>>16&255,pe=65535&Be,!(ve+ge<=h);){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}c>>>=ve,h-=ve,n.back+=ve}if(c>>>=ge,h-=ge,n.back+=ge,n.length=pe,0===we){n.mode=le;break}if(32&we){n.back=-1,n.mode=V;break}if(64&we){e.msg="invalid literal/length code",n.mode=ce;break}n.extra=15&we,n.mode=ie;case ie:if(n.extra){for(Ee=n.extra;h<Ee;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}n.length+=c&(1<<n.extra)-1,c>>>=n.extra,h-=n.extra,n.back+=n.extra}n.was=n.length,n.mode=ae;case ae:for(;Be=n.distcode[c&(1<<n.distbits)-1],ge=Be>>>24,we=Be>>>16&255,pe=65535&Be,!(ge<=h);){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(0===(240&we)){for(ve=ge,ke=we,ye=pe;Be=n.distcode[ye+((c&(1<<ve+ke)-1)>>ve)],ge=Be>>>24,we=Be>>>16&255,pe=65535&Be,!(ve+ge<=h);){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}c>>>=ve,h-=ve,n.back+=ve}if(c>>>=ge,h-=ge,n.back+=ge,64&we){e.msg="invalid distance code",n.mode=ce;break}n.offset=pe,n.extra=15&we,n.mode=oe;case oe:if(n.extra){for(Ee=n.extra;h<Ee;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}n.offset+=c&(1<<n.extra)-1,c>>>=n.extra,h-=n.extra,n.back+=n.extra}if(n.offset>n.dmax){e.msg="invalid distance too far back",n.mode=ce;break}n.mode=se;case se:if(0===d)break e;if(g=m-d,n.offset>g){if(g=n.offset-g,g>n.whave&&n.sane){e.msg="invalid distance too far back",n.mode=ce;break}g>n.wnext?(g-=n.wnext,w=n.wsize-g):w=n.wnext-g,g>n.length&&(g=n.length),me=n.window}else me=a,w=s-n.offset,g=n.length;g>d&&(g=d),d-=g,n.length-=g;do a[s++]=me[w++];while(--g);0===n.length&&(n.mode=re);break;case le:if(0===d)break e;a[s++]=n.length,d--,n.mode=re;break;case de:if(n.wrap){for(;h<32;){if(0===l)break e;l--,c|=i[o++]<<h,h+=8}if(m-=d,e.total_out+=m,n.total+=m,m&&(e.adler=n.check=n.flags?k(n.check,a,m,s-m):v(n.check,a,m,s-m)),m=d,(n.flags?c:r(c))!==n.check){e.msg="incorrect data check",n.mode=ce;break}c=0,h=0}n.mode=fe;case fe:if(n.wrap&&n.flags){for(;h<32;){if(0===l)break e;l--,c+=i[o++]<<h,h+=8}if(c!==(4294967295&n.total)){e.msg="incorrect length check",n.mode=ce;break}c=0,h=0}n.mode=ue;case ue:xe=O;break e;case ce:xe=I;break e;case he:return Z;case be:default:return U}return e.next_out=s,e.avail_out=d,e.next_in=o,e.avail_in=l,n.hold=c,n.bits=h,(n.wsize||m!==e.avail_out&&n.mode<ce&&(n.mode<de||t!==B))&&u(e,e.output,e.next_out,m-e.avail_out)?(n.mode=he,Z):(b-=e.avail_in,m-=e.avail_out,e.total_in+=b,e.total_out+=m,n.total+=m,n.wrap&&m&&(e.adler=n.check=n.flags?k(n.check,a,m,e.next_out-m):v(n.check,a,m,e.next_out-m)),e.data_type=n.bits+(n.last?64:0)+(n.mode===V?128:0)+(n.mode===ne||n.mode===Q?256:0),(0===b&&0===m||t===B)&&xe===C&&(xe=T),xe)}function h(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,C}function b(e,t){var n;return e&&e.state?(n=e.state,0===(2&n.wrap)?U:(n.head=t,t.done=!1,C)):U}function m(e,t){var n,r,i,a=t.length;return e&&e.state?(n=e.state,0!==n.wrap&&n.mode!==Y?U:n.mode===Y&&(r=1,r=v(r,t,a,0),r!==n.check)?I:(i=u(e,t,a,a))?(n.mode=he,Z):(n.havedict=1,C)):U}var g,w,p=e("../utils/common"),v=e("./adler32"),k=e("./crc32"),y=e("./inffast"),_=e("./inftrees"),x=0,S=1,E=2,B=4,A=5,L=6,C=0,O=1,R=2,U=-2,I=-3,Z=-4,T=-5,N=8,z=1,F=2,j=3,D=4,P=5,M=6,W=7,H=8,G=9,K=10,Y=11,V=12,q=13,X=14,Q=15,J=16,$=17,ee=18,te=19,ne=20,re=21,ie=22,ae=23,oe=24,se=25,le=26,de=27,fe=28,ue=29,ce=30,he=31,be=32,me=852,ge=592,we=15,pe=we,ve=!0;n.inflateReset=o,n.inflateReset2=s,n.inflateResetKeep=a,n.inflateInit=d,n.inflateInit2=l,n.inflate=c,n.inflateEnd=h,n.inflateGetHeader=b,n.inflateSetDictionary=m,n.inflateInfo="pako inflate (from Nodeca project)"},"zlib/constants.js":function(e,t,n){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},"zlib/messages.js":function(e,t,n){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},"zlib/zstream.js":function(e,t,n){"use strict";function r(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=r},"zlib/gzheader.js":function(e,t,n){"use strict";function r(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=r},"zlib/adler32.js":function(e,t,n){"use strict";function r(e,t,n,r){for(var i=65535&e|0,a=e>>>16&65535|0,o=0;0!==n;){o=n>2e3?2e3:n,n-=o;do i=i+t[r++]|0,a=a+i|0;while(--o);i%=65521,a%=65521}return i|a<<16|0}t.exports=r},"zlib/crc32.js":function(e,t,n){"use strict";function r(){for(var e,t=[],n=0;n<256;n++){e=n;for(var r=0;r<8;r++)e=1&e?3988292384^e>>>1:e>>>1;t[n]=e}return t}function i(e,t,n,r){var i=a,o=r+n;e^=-1;for(var s=r;s<o;s++)e=e>>>8^i[255&(e^t[s])];return e^-1}var a=r();t.exports=i},"zlib/inffast.js":function(e,t,n){"use strict";var r=30,i=12;t.exports=function(e,t){var n,a,o,s,l,d,f,u,c,h,b,m,g,w,p,v,k,y,_,x,S,E,B,A,L;n=e.state,a=e.next_in,A=e.input,o=a+(e.avail_in-5),s=e.next_out,L=e.output,l=s-(t-e.avail_out),d=s+(e.avail_out-257),f=n.dmax,u=n.wsize,c=n.whave,h=n.wnext,b=n.window,m=n.hold,g=n.bits,w=n.lencode,p=n.distcode,v=(1<<n.lenbits)-1,k=(1<<n.distbits)-1;e:do{g<15&&(m+=A[a++]<<g,g+=8,m+=A[a++]<<g,g+=8),y=w[m&v];t:for(;;){if(_=y>>>24,m>>>=_,g-=_,_=y>>>16&255,0===_)L[s++]=65535&y;else{if(!(16&_)){if(0===(64&_)){y=w[(65535&y)+(m&(1<<_)-1)];continue t}if(32&_){n.mode=i;break e}e.msg="invalid literal/length code",n.mode=r;break e}x=65535&y,_&=15,_&&(g<_&&(m+=A[a++]<<g,g+=8),x+=m&(1<<_)-1,m>>>=_,g-=_),g<15&&(m+=A[a++]<<g,g+=8,m+=A[a++]<<g,g+=8),y=p[m&k];n:for(;;){if(_=y>>>24,m>>>=_,g-=_,_=y>>>16&255,!(16&_)){if(0===(64&_)){y=p[(65535&y)+(m&(1<<_)-1)];continue n}e.msg="invalid distance code",n.mode=r;break e}if(S=65535&y,_&=15,g<_&&(m+=A[a++]<<g,g+=8,g<_&&(m+=A[a++]<<g,g+=8)),S+=m&(1<<_)-1,S>f){e.msg="invalid distance too far back",n.mode=r;break e}if(m>>>=_,g-=_,_=s-l,S>_){if(_=S-_,_>c&&n.sane){e.msg="invalid distance too far back",n.mode=r;break e}if(E=0,B=b,0===h){if(E+=u-_,_<x){x-=_;do L[s++]=b[E++];while(--_);E=s-S,B=L}}else if(h<_){if(E+=u+h-_,_-=h,_<x){x-=_;do L[s++]=b[E++];while(--_);if(E=0,h<x){_=h,x-=_;do L[s++]=b[E++];while(--_);E=s-S,B=L}}}else if(E+=h-_,_<x){x-=_;do L[s++]=b[E++];while(--_);E=s-S,B=L}for(;x>2;)L[s++]=B[E++],L[s++]=B[E++],L[s++]=B[E++],x-=3;x&&(L[s++]=B[E++],x>1&&(L[s++]=B[E++]))}else{E=s-S;do L[s++]=L[E++],L[s++]=L[E++],L[s++]=L[E++],x-=3;while(x>2);x&&(L[s++]=L[E++],x>1&&(L[s++]=L[E++]))}break}}break}}while(a<o&&s<d);x=g>>3,a-=x,g-=x<<3,m&=(1<<g)-1,e.next_in=a,e.next_out=s,e.avail_in=a<o?5+(o-a):5-(a-o),e.avail_out=s<d?257+(d-s):257-(s-d),n.hold=m,n.bits=g}},"zlib/inftrees.js":function(e,t,n){"use strict";var r=e("../utils/common"),i=15,a=852,o=592,s=0,l=1,d=2,f=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],u=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],c=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,n,b,m,g,w,p){var v,k,y,_,x,S,E,B,A,L=p.bits,C=0,O=0,R=0,U=0,I=0,Z=0,T=0,N=0,z=0,F=0,j=null,D=0,P=new r.Buf16(i+1),M=new r.Buf16(i+1),W=null,H=0;for(C=0;C<=i;C++)P[C]=0;for(O=0;O<b;O++)P[t[n+O]]++;for(I=L,U=i;U>=1&&0===P[U];U--);if(I>U&&(I=U),0===U)return m[g++]=20971520,m[g++]=20971520,p.bits=1,0;for(R=1;R<U&&0===P[R];R++);for(I<R&&(I=R),N=1,C=1;C<=i;C++)if(N<<=1,N-=P[C],N<0)return-1;if(N>0&&(e===s||1!==U))return-1;for(M[1]=0,C=1;C<i;C++)M[C+1]=M[C]+P[C];for(O=0;O<b;O++)0!==t[n+O]&&(w[M[t[n+O]]++]=O);if(e===s?(j=W=w,S=19):e===l?(j=f,D-=257,W=u,H-=257,S=256):(j=c,W=h,S=-1),F=0,O=0,C=R,x=g,Z=I,T=0,y=-1,z=1<<I,_=z-1,e===l&&z>a||e===d&&z>o)return 1;for(;;){E=C-T,w[O]<S?(B=0,A=w[O]):w[O]>S?(B=W[H+w[O]],A=j[D+w[O]]):(B=96,A=0),v=1<<C-T,k=1<<Z,R=k;do k-=v,m[x+(F>>T)+k]=E<<24|B<<16|A|0;while(0!==k);for(v=1<<C-1;F&v;)v>>=1;if(0!==v?(F&=v-1,F+=v):F=0,O++,0===--P[C]){if(C===U)break;C=t[n+w[O]]}if(C>I&&(F&_)!==y){for(0===T&&(T=I),x+=R,Z=C-T,N=1<<Z;Z+T<U&&(N-=P[Z+T],!(N<=0));)Z++,N<<=1;if(z+=1<<Z,e===l&&z>a||e===d&&z>o)return 1;y=F&_,m[y]=I<<24|Z<<16|x-g|0}}return 0!==F&&(m[x+F]=C-T<<24|64<<16|0),p.bits=I,0}}};for(var n in t)t[n].folder=n.substring(0,n.lastIndexOf("/")+1);var r=function(e){var n=[];return e=e.split("/").every(function(e){return".."==e?n.pop():"."==e||""==e||n.push(e)})?n.join("/"):null,e?t[e]||t[e+".js"]||t[e+"/index.js"]:null},i=function(e,t){return e?r(e.folder+"node_modules/"+t)||i(e.parent,t):null},a=function(e,t){var n=t.match(/^\//)?null:e?t.match(/^\.\.?\//)?r(e.folder+t):i(e,t):r(t);if(!n)throw"module not found: "+t;return n.exports||(n.parent=e,n(a.bind(null,n),n,n.exports={})),n.exports};return a(null,e)},decompress:function(e){this.exports||(this.exports=this.require("inflate.js"));try{return this.exports.inflate(e)}catch(e){}},hasUnityMarker:function(e){var t=10,n="UnityWeb Compressed Content (gzip)";if(t>e.length||31!=e[0]||139!=e[1])return!1;var r=e[3];if(4&r){if(t+2>e.length)return!1;if(t+=2+e[t]+(e[t+1]<<8),t>e.length)return!1}if(8&r){for(;t<e.length&&e[t];)t++;if(t+1>e.length)return!1;t++}return 16&r&&String.fromCharCode.apply(null,e.subarray(t,t+n.length+1))==n+"\0"}}};return new Promise(function(e,t){u.SystemInfo.hasWebGL?u.SystemInfo.hasWasm?(1==u.SystemInfo.hasWebGL&&u.print('Warning: Your browser does not support "WebGL 2.0" Graphics API, switching to "WebGL 1.0"'),u.startupErrorHandler=t,n(0),u.postRun.push(function(){n(1),delete u.startupErrorHandler,e(b)}),f()):t("Your browser does not support WebAssembly."):t("Your browser does not support WebGL.");
})}