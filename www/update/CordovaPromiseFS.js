var CordovaPromiseFS=function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a){function b(a,c,d,e){a.getDirectory(c[0],{create:!0},function(a){c.length>1?b(a,c.slice(1),d,e):d(a)},e)}function c(a){return a=a.substr(0,a.lastIndexOf("/")+1),"/"===a[0]&&(a=a.substr(1)),a}function d(a){return a.substr(a.lastIndexOf("/")+1)}function e(a){return a=a||"","/"===a[0]&&(a=a.substr(1)),a&&a.indexOf(".")<0&&"/"!==a[a.length-1]&&(a+="/"),"./"===a&&(a=""),a}var f=[],g=0;a.exports=function(a){function h(a){return new C(function(b){return b(a)})}function i(a){return new C(function(c,d){return F.then(function(e){a?(a=a.split("/").filter(function(a){return a&&a.length>0&&"."!==a&&".."!==a}),b(e.root,a,c,d)):c(e.root)},d)})}function j(a,b){return new C(function(c,d){return"object"==typeof a?c(a):(a=e(a),b=b||{},F.then(function(e){e.root.getFile(a,b,c,d)},d))})}function k(a,b){return a=e(a),b=b||{},new C(function(c,d){return F.then(function(e){a&&"/"!==a?e.root.getDirectory(a,b,c,d):c(e.root)},d)})}function l(a,b){b=b||"";var c=b.indexOf("r")>-1,d=b.indexOf("e")>-1,e=b.indexOf("f")>-1,f=b.indexOf("d")>-1;return e&&f&&(e=!1,f=!1),new C(function(b,g){return k(a).then(function(a){var i=a.createReader();i.readEntries(function(a){var i=[h(a)];c&&a.filter(function(a){return a.isDirectory}).forEach(function(a){i.push(l(a.fullPath,"re"))}),C.all(i).then(function(a){var c=[];c=c.concat.apply(c,a),e&&(c=c.filter(function(a){return a.isFile})),f&&(c=c.filter(function(a){return a.isDirectory})),d||(c=c.map(function(a){return a.fullPath})),b(c)},g)},g)},g)})}function m(a){return new C(function(b,c){j(a).then(function(a){b(a)},function(a){1===a.code?b(!1):c(a)})})}function n(a){return i(c(a)).then(function(){return j(a,{create:!0})})}function o(a){return j(a).then(function(a){return a.toURL()})}function p(a,b){return b=b||"readAsText",j(a).then(function(a){return new C(function(c,d){a.file(function(a){var d=new FileReader;d.onloadend=function(){c(this.result)},d[b](a)},d)})})}function q(a){return p(a,"readAsDataURL")}function r(a){return p(a).then(JSON.parse)}function s(a,b,d){return i(c(a)).then(function(){return j(a,{create:!0})}).then(function(a){return new C(function(c,e){a.createWriter(function(a){a.onwriteend=c,a.onerror=e,"string"==typeof b?b=new Blob([b],{type:d||"text/plain"}):b instanceof Blob!=!0&&(b=new Blob([JSON.stringify(b,null,4)],{type:d||"application/json"})),a.write(b)},e)})})}function t(a,b){return i(c(b)).then(function(c){return j(a).then(function(a){return new C(function(e,f){a.moveTo(c,d(b),e,f)})})})}function u(a,b){return i(c(b)).then(function(c){return j(a).then(function(a){return new C(function(e,f){a.copyTo(c,d(b),e,f)})})})}function v(a,b){var c=b?j:m;return new C(function(b,d){c(a).then(function(a){a!==!1?a.remove(b,d):b(1)},d)}).then(function(a){return 1===a?!1:!0})}function w(a){return k(a).then(function(a){return new C(function(b,c){a.removeRecursively(b,c)})})}function x(){for(;f.length>0&&g<a.concurrency;){g++;var b=f.pop(),c=b.shift(),d=b.shift(),e=b.shift(),h=b.shift(),i=b.shift(),j=b.shift(),k=b.shift(),l=b.shift();c._aborted?g--:d?(c.download.call(c,e,h,i,j,k,l),c.onprogress&&c.onprogress(new ProgressEvent)):c.upload.call(c,h,e,i,j,l,k)}}function y(a){return g--,x(),a}function z(b,c,e,h,i){"function"==typeof h&&(i=h,h={}),E&&e.indexOf("://")<0&&(e=H(e)),h=h||{},h.retry&&h.retry.length||(h.retry=a.retry),h.retry=h.retry.concat(),h.file||b||(h.fileName=d(e));var j=new FileTransfer;i=i||h.onprogress,"function"==typeof i&&(j.onprogress=i);var k=new C(function(a,d){var i=function(g){if(0===h.retry.length)d(g);else{f.unshift([j,b,c,e,a,i,h.trustAllHosts||!1,h]);var k=h.retry.shift();k>0?setTimeout(y,k):y()}};h.retry.unshift(0),g++,i()});return k.then(y,y),k.progress=function(a){return j.onprogress=a,k},k.abort=function(){return j._aborted=!0,j.abort(),k},k}function A(a,b,c,d){return z(!0,a,b,c,d)}function B(a,b,c,d){return z(!1,b,a,c,d)}var C=a.Promise||window.Promise;if("undefined"==typeof C)throw new Error("No Promise library given in options.Promise");this.options=a=a||{},a.persistent=void 0!==a.persistent?a.persistent:!0,a.storageSize=a.storageSize||20971520,a.concurrency=a.concurrency||3,a.retry=a.retry||[];var D,E="undefined"!=typeof cordova;E?D=new C(function(a,b){document.addEventListener("deviceready",a,!1),setTimeout(function(){b(new Error("deviceready has not fired after 5 seconds."))},5100)}):(D=h(!0),"undefined"!=typeof webkitRequestFileSystem?(window.requestFileSystem=webkitRequestFileSystem,window.FileTransfer=function(){},FileTransfer.prototype.download=function(a,b,c,d){var e=new XMLHttpRequest;return e.open("GET",a),e.responseType="blob",e.onreadystatechange=function(){4==e.readyState&&(200===e.status?s(b,e.response).then(c,d):d(e.status))},e.send(),e},window.ProgressEvent=function(){},window.FileEntry=function(){}):window.requestFileSystem=function(a,b,c,d){d(new Error("requestFileSystem not supported!"))});var F=new C(function(b,c){D.then(function(){var d=a.persistent?1:0;"number"==typeof a.fileSystem&&(d=a.fileSystem),!E&&d>1&&(console.warn('Chrome does not support fileSystem "'+d+'". Falling back on "0" (temporary).'),d=0),window.requestFileSystem(d,a.storageSize,b,c),setTimeout(function(){c(new Error("Could not retrieve FileSystem after 5 seconds."))},5100)},c)});F.then(function(a){window.__fs=a},function(a){console.error("Could not get Cordova FileSystem:",a)});var G,H;return E?(H=function(b){return b=e(b),b.indexOf("://")<0?"cdvfile://localhost/"+(a.persistent?"persistent/":"temporary/")+b:b},G=function(a){return j(a).then(function(a){return a.toInternalURL()})}):(H=function(b){return b=e(b),"filesystem:"+location.origin+(a.persistent?"/persistent/":"/temporary/")+b},G=function(a){return j(a).then(function(a){return a.toURL()})}),{fs:F,normalize:e,file:j,filename:d,dir:k,dirname:c,create:n,read:p,readJSON:r,write:s,move:t,copy:u,remove:v,removeDir:w,list:l,ensure:i,exists:m,download:A,upload:B,toURL:o,isCordova:E,toInternalURLSync:H,toInternalURL:G,toDataURL:q,deviceready:D,options:a,Promise:C}}}]);