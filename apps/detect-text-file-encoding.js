"use strict"
//if(typeof TextDecoder==='undefined'){
//	document.body.innerHTML='The browser doesn\'t support TextDecoder';
//	throw 0;
//}
document.getElementById('fileelem').onchange=function(){
	if(this.files.length){
		var fileReader = new FileReader();
		fileReader.onload = function() {
			decodewithlbls(new DataView(this.result));
		};
		fileReader.readAsArrayBuffer(this.files[0]);
	}
};
function decodewithlbls(arrbufview){
	var lbls=['utf-8','ibm866','iso-8859-2','iso-8859-3','iso-8859-4','iso-8859-5','iso-8859-6','iso-8859-7','iso-8859-8','iso-8859-8-i','iso-8859-10','iso-8859-13','iso-8859-14','iso-8859-15','iso-8859-16','koi8-r','koi8-u','macintosh','windows-874','windows-1250','windows-1251','windows-1252','windows-1253','windows-1254','windows-1255','windows-1256','windows-1257','windows-1258','x-mac-cyrillic','gbk','gb18030','hz-gb-2312','big5','euc-jp','iso-2022-jp','shift-jis','euc-kr','iso-2022-kr','utf-16be','utf-16le','x-user-defined'];
	document.getElementById('res').innerHTML='';
	for(var lbl of lbls){
		try{
			var td=new TextDecoder(lbl,{fatal: true});
		}catch(e){
			document.getElementById('res').appendChild(document.createElement('p')).textContent=lbl+' is not supported by the browser.';
			continue;
		}
		try{
			var str=td.decode(arrbufview);
		}catch(e){
			document.getElementById('res').appendChild(document.createElement('p')).textContent=lbl+' failed when decoding.';
			continue;
		}
		document.getElementById('res').appendChild(document.createElement('p')).textContent=lbl+ ': '+str;
	}
}
