/*
    keyb.js
    
    A utility for polling the keyboard. How cool!
    
    Example Usage:
    
        Keyb.isDown("W") // Is true if the W key is pressed.
        Keyb.isDown("<up>") // Is true if the up arrow key is pressed.
        Keyb.isJustDown("<space>") // Is true if the spacebar was just now pressed.
    
    Github:
    
        https://github.com/ehgoodenough/keyb
*/

for(var ua="undefined"!=typeof window?window.navigator.userAgent:"",isOSX=/OS X/.test(ua),isOpera=/Opera/.test(ua),maybeFirefox=!/like Gecko/.test(ua)&&!isOpera,vkey={0:isOSX?"<menu>":"<UNK>",1:"<mouse 1>",2:"<mouse 2>",3:"<break>",4:"<mouse 3>",5:"<mouse 4>",6:"<mouse 5>",8:"<backspace>",9:"<tab>",12:"<clear>",13:"<enter>",16:"<shift>",17:"<control>",18:"<alt>",19:"<pause>",20:"<caps-lock>",21:"<ime-hangul>",23:"<ime-junja>",24:"<ime-final>",25:"<ime-kanji>",27:"<escape>",28:"<ime-convert>",29:"<ime-nonconvert>",30:"<ime-accept>",31:"<ime-mode-change>",27:"<escape>",32:"<space>",33:"<page-up>",34:"<page-down>",35:"<end>",36:"<home>",37:"<left>",38:"<up>",39:"<right>",40:"<down>",41:"<select>",42:"<print>",43:"<execute>",44:"<snapshot>",45:"<insert>",46:"<delete>",47:"<help>",91:"<meta>",92:"<meta>",93:isOSX?"<meta>":"<menu>",95:"<sleep>",106:"<num-*>",107:"<num-+>",108:"<num-enter>",109:"<num-->",110:"<num-.>",111:"<num-/>",144:"<num-lock>",145:"<scroll-lock>",160:"<shift-left>",161:"<shift-right>",162:"<control-left>",163:"<control-right>",164:"<alt-left>",165:"<alt-right>",166:"<browser-back>",167:"<browser-forward>",168:"<browser-refresh>",169:"<browser-stop>",170:"<browser-search>",171:"<browser-favorites>",172:"<browser-home>",173:isOSX&&maybeFirefox?"-":"<volume-mute>",174:"<volume-down>",175:"<volume-up>",176:"<next-track>",177:"<prev-track>",178:"<stop>",179:"<play-pause>",180:"<launch-mail>",181:"<launch-media-select>",182:"<launch-app 1>",183:"<launch-app 2>",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"<meta>",224:"<meta>",226:"<alt-gr>",229:"<ime-process>",231:isOpera?"`":"<unicode>",246:"<attention>",247:"<crsel>",248:"<exsel>",249:"<erase-eof>",250:"<play>",251:"<zoom>",252:"<no-name>",253:"<pa-1>",254:"<clear>"},i=58;i<65;++i)vkey[i]=String.fromCharCode(i);for(var i=48;i<58;++i)vkey[i]=i-48+"";for(var i=65;i<91;++i)vkey[i]=String.fromCharCode(i);for(var i=96;i<106;++i)vkey[i]="<num-"+(i-96)+">";for(var i=112;i<136;++i)vkey[i]="F"+(i-111);
var Keyb={isDown:function(a){return void 0!=this.data[a]},isJustDown:function(a,b){return window.performance.now()-this.data[a]<(b||1e3/60)},isUp:function(a){return void 0==this.data[a]},setDown:function(a){this.data[a]=window.performance.now()},setUp:function(a){delete this.data[a]},data:{}};document.addEventListener("keydown",function(a){Keyb.isUp(vkey[a.keyCode])&&Keyb.setDown(vkey[a.keyCode])}),document.addEventListener("keyup",function(a){Keyb.setUp(vkey[a.keyCode])});
