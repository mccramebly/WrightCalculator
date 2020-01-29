// <SCRIPT type="text/javascript" src="http://faculty.ccc.edu/jnadas/js/myfunctions.js"></script>
degrees = true;
saveline=[-2,-3,2,3];
I=NaN;
pi = Math.PI;
pideg = 180/pi;
pirad = 1/pideg;
degs = String.fromCharCode(176);
Sigma= String.fromCharCode(931);
sigma= String.fromCharCode(963);
mu= String.fromCharCode(956);
divide= String.fromCharCode(247);
radical = String.fromCharCode(8730);
P2= String.fromCharCode(178); // squared
FX = []; XX = []; XXN=0;
frac=0; fracname=['8 places','full','4 places','a/b',"%","DMS",'scient.'];
fracval=[8,false,4,true,1,-1,-2];
sfie = false;  // true should not combine like terms
/* FX[i] is the i'th term, FX[i][0] is the coefficient, FX[i][j] (j = 1 ... XX.length) power of XX[j] variable */
// ------------------------------------
function swfrac(fracval,maxfrac,dont) {
frac++;
if (fracval!==undefined) if (typeof(fracval)=="number") frac=fracval;
if (maxfrac===undefined) maxfrac=fracname.length; frac%=maxfrac;
var frac1=fracname[frac];
try{
 document.getElementById("frac").value=frac1;
 if (dont!==undefined) calc(dont); else calc();
 } catch (err) {1}
return frac1}
// ---------------------------------------------------
function dms(D) {
minsec = '['+degs+"'\""+String.fromCharCode(8217)+String.fromCharCode(8216)+"]";
if (typeof(D)=='number') D=(D|0)+degs+((60*(D%1)+0.000001)|0)+degs+myround(((60*D)%1)*60);
else if (typeof(D)=='string')
{ var re = new RegExp( "([0-9]+)"+degs+"([0-9]+)"+minsec+"([0-9.]+)"+minsec+'*','g'); D = D.replace( re,"$1+($2+($3/60))/60"+degs);
  re = new RegExp( "([0-9]+)"+degs+"([0-9.]+)"+minsec+'*','g'); D = D.replace( re,"$1+($2/60)"+degs);
  re = new RegExp(degs,'g'); if (D.search(re)>-1) D=D.replace(re,'');
  D = eval(D);
}
return D;
}
// ---------------------------------------------------
function dice(x,y){
p=0;
if (x==1 && y>0 && y<7) return 1;
if (x==2 && y>1 && y<13)
  p = (6-Math.abs(7-y));
else if(x==3 && y>2 && y<19)
  p = myround((((((( -0.00014189886540050267)*y +0.008939628520636234)*y -0.2129574511195642)*y +2.373585984634701)*y -12.756357742589898)*y +34.27245202648919)*y -35.91628990042955,0);
else if(x==4 && y>3 && y<25){
  y=14-Math.abs(14-y);
  p = myround(((((0.0032051282023530803*y -0.17919580405578017)*y +3.450757573125884)*y -27.87907923106104)*y +103.28729596361518)*y -144.44522132351995,0) }
if (p<0) p=0;
return p}
// ---------------------------------------------------
function imp(x,y){return !x || y}
// ---------------------------------------------------
function sod(x) { // sum of digits
x1=''+x; x2=0; for(var i=0;i<x1.length;i++) x2+=Number(x1[i])
return x2}
// ---------------------------------------------------
function base(x,y){  // if x is a string convert to decimal, if it is a number convert to the base
if (y===undefined) y=16; var x1,x2,x3;
if (typeof(x)=="string")
{ x1=parseInt(x,y);
  x2 = (x+".").search(/\./);
  if (x2>x.length-2) return x1;
  x3=x.slice(x2+1,(x+" ").search(/[^\d.]/));
  x2=parseInt(x3,y);
  return x1+x2/Math.pow(y,x3.length);
}
if(x===undefined) x=0;
x1=x.toString(y);
// x2=x1.search(/\./); if (x1.length>10 && x2>=0) { x1=x1.slice(0,x2+9) }
return x1}
// ---------------------------------------------------
function ln(a,b)
{ if (b===undefined) return Math.log(Math.abs(a));
  return Math.log(Math.abs(b))/Math.log(a);}
// ---------------------------------------------------
function mylog(a,b){
if (b===undefined) return Math.log(Math.abs(a))/Math.log(10);
return Math.log(Math.abs(b))/Math.log(a);
}
// ---------------------------------------------------
function div(x,y){return x%y===0}  // true if y divides into x evenly
// ---------------------------------------------------
function prime(x){
var pr4=2;
var pr5=x;
if (pr5<2) return "not prime";
var star="";
build = "Prime factors of "+x+"= ";
while (pr4*pr4 <= pr5)
{ var i=0;
  while (div(pr5,pr4)) { pr5/=pr4;i++};
  if (i)
  { build += star+pr4;
    if (i>1) build += "^"+i;
    star = " * ";
  }
  pr4 = pr4 + 1;
}
if (pr5==x) return "is prime "+x
if (pr5>1) build += star+pr5
return build}
// -------------------------------------------------------------------------
function xterm(plead, x, pxnn, xfrac) {// is leading term, coefficient, power of x, myround edit
lead=plead; if(typeof(plead)=="undefined")lead=false
xnn=pxnn; if(typeof(pxnn)=="undefined")xnn=0
if (xnn==0) return coeff(lead, x, "", xfrac)
if (xnn==1) return coeff(lead, x, "x", xfrac)
return coeff(lead, x, "x^"+xnn, xfrac)}
// -------------------------------------------------------------------------
function coeff(lead, x, xn, xfrac) {// is leading term, coefficient, variable, myround edit
if (typeof(xfrac)=='undefined') xfrac=fracval[frac]
if (x>0) return (lead?" ":" +") + ((x==1)&&(xn!="")?"":myround(x,xfrac)) + xn
if (x<0) return " -"+(x==-1&&(xn!="")?"":myround(-x, xfrac)) + xn
return (xn=="")?(lead?" 0":""):""}
// --------------------------
function round4(x,xfrac)
{if (xfrac==undefined) xfrac=4;
return myround(x,xfrac)}
// ---------------------------
function myround(x,places) { // places: true=fraction, n = # places, false = full accuracy, -1=pcnt, -2=scientific
if (typeof(x)!="number" || isNaN(x)) {return x}
if (typeof(places)=="undefined") places=4
if (typeof(places)=="number")
{ if (places==-1) return dms(x)
  else if (places<0) return x.toExponential()
  else if (places==1) return parseFloat((x*100).toFixed(2))+"% "
  else if (places<17) return parseFloat(x.toFixed(places))
  else return parseFloat(x.toString())}
if (typeof(places)=="boolean")
{ if (places)
  { var xx=x; p1 = 1; var p2 = 0; var q1 = 0; var q2 = 1
    var p = 0; var q = 0; var n = 0; var d = 0; var a = 0
    while (true)
    { if (x<0) {x = -x; p1 = -p1}
      a = Math.floor(x); x = Math.round((x-a)*10000000000)/10000000000;
      p = a*p1 + p2; q = a*q1 + q2;
      if  ( (Math.abs(p) > 10000000000 ) || (q > 999999 ) ) { n = p1; d = q1; break; }
      if ( x == 0 ) { n = p; d = q; break; }
      p2 = p1; p1 = p; q2 = q1; q1 = q; x = 1/x;}
    if (d == 1) return n.toString() ;
    else if (d>99999) return Math.round(n*10000/d)+"/10000" ;
    else return (n + "/" + d);
    } }
return parseFloat(x) }
// ---------------------------------------------------
function my(x,y){
if (typeof(y)=="undefined") y =fracval[frac]
else if (typeof(y)=="number") if (y<7) y=fracval[y]
return myround(x,y) }
// ---------------------------------------------------
function myval(x){
if (isNaN(x)){
try { return eval(x)} catch (err) { return "" } }
return parseFloat(x)}
// ---------------------------------------------------
function npr(n,x) { if (x>0) return (n*npr(n-1,x-1)); if (x==0) return(1); return (0)}
// ---------------------------------------------------
function fact(n) { return npr(n,n) }
// ---------------------------------------------------
function ncr(n,x) { if (x>0) return n*ncr(n-1,x-1)/x; if (x==0) return(1); return(0)}
// ---------------------------------------------------
function gcf2 (a, b) {
var gc1 = Math.floor(Math.abs(a)), gc2=Math.floor(Math.abs(b))
if ((gc1!=0) && (gc2!=0))
{ while ((gc3 = gc1 % gc2)!=0)
  { gc1 = gc2; gc2 = gc3 }
  return gc2 }
else if (a!=0) return Math.abs(a)
else if (b!=0) return Math.abs(b)
return (0);}
// ---------------------------------------------------
function gcf () {
if (gcf.arguments.length==0) return 1;
var gc1 = Math.abs(Math.floor(gcf.arguments[0]))
for (var i=1; i<gcf.arguments.length; i++) gc1=gcf2(gc1,gcf.arguments[i])
return gc1}
// ---------------------------------------------------
function gcfsum (a,b) {
if(a===undefined) a=0
if(b===undefined) b=0
if (b==0) return "1*"+a +'= '+a
var c1 = a, c2 = b, s1 = 1, s2 = 0, t1 = 0, t2 = 1
do
{ var c3 = c1 % c2; if (c3 == 0) break
  var d2 = Math.floor(c1 / c2), s3 = s1 - d2 * s2, t3 = t1 - d2 * t2; c1 = c2; c2 = c3
  s1 = s2; s2 = s3; t1 = t2; t2 = t3 } while (true)
if (s2==0) { return  t2+ "*"+ b }
else if (t2==0) { return  s2+ "*"+ a }
else if (s2 < 0) {return t2+ "*"+ b+ s2+ "*"+ a+ "= "+(t2*b+s2*a)}
else {return s2+ "*"+ a+ t2+ "*"+ b+ "= "+(t2*b+s2*a)} }
// ---------------------------------------------------
function addtolist(a,x){
if (a.length==0 || x>a[a.length-1]) {a.push(x);return}
for (var i=0; i<a.length; i++)
{ if (x>a[i]) continue
  if (x<a[i]) a.splice(i,0,x)
  return }}
// ---------------------------------------------------
function lcm () {
// var lc1=gcf.apply(this,lcm.arguments)
var lc1 = 1
for(var i in lcm.arguments) lc1 = lc1*lcm.arguments[i]/gcf2(lc1,lcm.arguments[i])
return lc1}
// ---------------------------------------------------
function clean (exdata, ssvar){ // ssvar true if trailing digits are subscripts . . .
var ex = exdata // convert special codes to normal
ex = ex.replace(/([\d]+) ([\d]+\/[\d]+)/g,"($1"+"+"+"$2)") //  1 2/3 is 1+2/3
ex = ex.replace(/\s/mg,"") // kill spaces -- put comment on this line if you move it ...
ex=ex.replace(/math./ig,"") // .replace(/[\{\[]/g,"(").replace(/[\}\]]/g,")");
ex=ex.replace(/([a-z]{3,4})\^-1/g,"a$1")
ex=ex.replace(/arc([a-z]{3,4})/g,"a$1")
// →
/*&#8805;<br>
 &#8804;<br>  */
ex = ex.replace(/\$/gi," " )//  no dollar signs!
var re = new RegExp( "~", "g"); ex = ex.replace( re,"!" )//  V
var re = new RegExp( String.fromCharCode(8804), "g"); ex = ex.replace( re,"<=" )//  implies
var re = new RegExp( String.fromCharCode(8805), "g"); ex = ex.replace( re,">=" )//  implies
var re = new RegExp( String.fromCharCode(8594), "g"); ex = ex.replace( re,"," )//  implies
var re = new RegExp( String.fromCharCode(8744), "g"); ex = ex.replace( re,"||" )//  V
var re = new RegExp( String.fromCharCode(8743), "g"); ex = ex.replace( re,"&&" )//
var re = new RegExp( String.fromCharCode(8800), "g"); ex = ex.replace( re,"!=" )//
var re = new RegExp( String.fromCharCode(8801), "g"); ex = ex.replace( re,"==" )//
var re = new RegExp( String.fromCharCode(8596), "g"); ex = ex.replace( re,"==" )//
var re = new RegExp( String.fromCharCode(8764), "g"); ex = ex.replace( re,"!" )//  ~
var re = new RegExp( String.fromCharCode(215), "g"); ex = ex.replace( re,"*" )//  ×
var re = new RegExp( String.fromCharCode(710), "g"); ex = ex.replace( re,"^" )//  ˆ
var re = new RegExp( String.fromCharCode(247), "g"); ex = ex.replace( re,"/" )//  ÷
var re = new RegExp( String.fromCharCode(8722), "g"); ex = ex.replace( re,"-" )// minus to -
var re = new RegExp( String.fromCharCode(8211), "g"); ex = ex.replace( re,"-" )// minus to -
var re = new RegExp( String.fromCharCode(178), "g"); ex = ex.replace( re,"^2" )
var re = new RegExp( String.fromCharCode(179), "g"); ex = ex.replace( re,"^3" )
var re = new RegExp( String.fromCharCode(185), "g"); ex = ex.replace( re,"^1" )
for (var ex1=4; ex1<10; ex1++)
{ var re = new RegExp( String.fromCharCode(ex1+8304), "g"); ex = ex.replace( re,"^"+ex1 )}
var re = new RegExp( String.fromCharCode(188), "g"); ex = ex.replace( re,"(1/4)" )//  �
var re = new RegExp( String.fromCharCode(189), "g"); ex = ex.replace( re,"(1/2)" )//  �
var re = new RegExp( String.fromCharCode(190), "g"); ex = ex.replace( re,"(3/4)" )//  �
var re = new RegExp( String.fromCharCode(928), "g"); ex = ex.replace( re,"PI" )// π
var re = new RegExp( String.fromCharCode(960), "g"); ex = ex.replace( re,"PI" )// π
var re = new RegExp( String.fromCharCode(8730)+"\\\(", "g"); ex = ex.replace( re,"sqrt(" )
var re = new RegExp( String.fromCharCode(8730)+"([0-9\.]+)", "g"); ex = ex.replace( re,"sqrt($1)" )// ? to sqrt
var re = new RegExp( String.fromCharCode(8730), "g"); ex = ex.replace( re,"sqrt(" )// √ to sqrt
minsec = '['+degs+"'\""+String.fromCharCode(8217)+String.fromCharCode(8216)+"]"
var re = new RegExp( "([0-9.]+)"+degs+"([0-9.]+)"+minsec+"([0-9.]+)"+minsec+'*','g'); ex = ex.replace( re,"$1+($2+($3/60))/60"+degs)
var re = new RegExp( "([0-9.]+)"+degs+"([0-9.]+)"+minsec+'*','g'); ex = ex.replace( re,"$1+($2/60)"+degs)
var re = new RegExp(degs,'g'); if (ex.search(re)>-1) {degrees=true; ex=ex.replace(re,'')}
ex = ex.replace(/e *\^ *\(/g,"exp(")
// count parentheses
var laststart=0; var pcount=0; var ppoint=0;
while (laststart<ex.length)
{ if ((ppoint=ex.slice(laststart).search(/[\(\)]/))>-1)
  { pcount += (ex.charAt(laststart+ppoint)=="("?1:-1);
    if (pcount<0)
    { ex = ex.slice(0,laststart+ppoint) + ex.slice(laststart+ppoint+1)
      pcount=0; ppoint-= 1;}
    laststart += ppoint+1}
  else {laststart=ex.length}}
while (pcount>0) { ex+=")"; pcount-=1 }
// change functions to lower case
ex = ex.replace(/log\(/gi,"mylog(").replace(/mymylog\(/gi,"mylog(")
ex=";"+ex.toUpperCase(); // kill lower case
//  ex = ex.replace(([^A-Z])([A-Z]+)\(/,
var laststart = 1
while (laststart<ex.length)
{ var ex1=ex.substr(laststart-1).search(/[^A-Z][A-Z]+\(/i)+1; if (ex1==0) break
  var ex2=ex.substr(laststart-1).match(/[^A-Z][A-Z]+\(/i)
  var ex20=ex2[0].slice(1)
  if (ex20.length>3) // $_xxx(
  { ex = ex.slice(0,laststart-1+ex1) + ex20.toLowerCase() + ex.slice(laststart-1+ex1+ex20.length)}
  laststart = laststart+ex1+ex20.length-1}
var exlist="; atan2 sin2 cos2 sind2 cosd2 charAt charCodeAt false fromCharCode if indexOf isFinite isNaN lastIndexOf length ln Number parseFloat parseInt pi pideg pirad toLowerCase toUpperCase true try unshift valueOf toString my " // not xy
var laststart = 1
while (laststart<ex.length)
{ var ex1=ex.substr(laststart-1).search(/[^A-Z][A-Z]+/i)+1; if (ex1==0) break
  var ex2=ex.substr(laststart-1).match(/[^A-Z][A-Z]+2*/i) // atan2 special
  var ex20=ex2[0].slice(1); var re=new RegExp(" "+ex20+" ","i")
  if ((ex2=exlist.search(re))>0)
  { ex = ex.slice(0,laststart-1+ex1) + exlist.substr(ex2+1,ex20.length) + ex.slice(laststart-1+ex1+ex20.length)}
  else
  { ex20test = ex20+"()"; try { eval(ex20test) } catch (err)
    { ex = ex.slice(0,laststart-1+ex1) + ex20.toUpperCase() + ex.slice(laststart-1+ex1+ex20.length)}} // not a valid function
  laststart = laststart+ex1+ex20.length }
// if (!ssvar) { ex = ex.replace(/[\[\{]/g,"("); ex = ex.replace(/[\]\}]/g,")") }// {} to ()
if (!ssvar) { ex = ex.replace(/([A-Z])([0-9]+)/gi,"$1^$2") } // exponents
if (degrees) ex=ex.replace(/(a*(sin|cos|tan|cot|csc|sec))(?!d)/gi,"$1d")
if (ssvar)
{ ex = ex.replace (/([0-9.])([A-Za-z])/g,"$1*$2") // 3a  -->  3*a
  ex = ex.replace (/([0-9.])([A-Za-z])/g,"$1*$2") // 3a  -->  3*a  MUST do twice
} else
{ ex = ex.replace (/([0-9.A-Z])([A-Za-z])/g,"$1*$2") // also a*b
  ex = ex.replace (/([0-9.A-Z])([A-Za-z])/g,"$1*$2") // MUST do twice
}

ex = ex.replace (/([^a-z~!^&!|%��+\-,;*?:\/\({[^=<>])\(/g,"$1*(")
ex = ex.replace (/\)([^~!^&!|%��+\-,;*?:\/\])}^=<>])/g,")*$1")
ex=ex.replace(/atan\^2\*/gi,"atan2")
ex=ex.replace(/sin\^2\*/gi,"sin2")
ex=ex.replace(/cos\^2\*/gi,"cos2")
ex=ex.replace(/sind\^2\*/gi,"sind2")
ex=ex.replace(/cosd\^2\*/gi,"cosd2")
ex=ex.replace(/N\**umber/gi,"Number")
ex=ex.replace(/X\*Y\*\(([^,)]+,)/g,"xy($1")
ex=ex.replace(/([\d\.])\*(E(\+|-)*\d)/g,"$1$2")
return ex.slice(1) }
// ---------------------------------------------------
function cleanx (exdata, getval, ssvar){ with(Math) { // defaults to false, false
// converts exdata to javascript
var ex = ";"+clean(exdata, ssvar) // replace special characters (one to one)
// a^b --> pow(a,b)
while ((pos = ex.search(/\^/))>0) {
  pos1 = pos-1; pco=0;
  if (ex.charAt(pos1)==")") {
    do { if (ex.charAt(pos1)==")") pco=pco+1
         else if (ex.charAt(pos1)=="(") pco=pco-1;
         pos1--; } while ( pco > 0 && pos1 >= 0 )}
  while (ex.charAt(pos1).search(/[0-9.A-Za-z]/)==0) pos1--
  pos1=pos1+1; pos2=pos+1
  if (ex.charAt(pos2)=="(") {
    do { if (ex.charAt(pos2)=="(") pco=pco+1
         else if (ex.charAt(pos2)==")") pco=pco-1;
         pos2++; } while ( pco > 0 );
  } else {
    if (ex.charAt(pos2)=='-') pos2=pos2+1
    if (ex.charAt(pos2).search(/[a-z]/i)==0 ) pos2=pos2+1
    else while (ex.charAt(pos2).search(/\.|\d/i)==0 ) pos2=pos2+1}
  ex = ex.substring(0,pos1)+"(pow("+ex.substring(pos1,pos)+","+ex.substring(pos+1,pos2)+"))"+ex.substr(pos2);
}
ex = ex.slice(1)
if (getval)
{ try
  {  ex = eval(ex) } catch (err) { ex = "****"}
  return ex
} else { return ex } } }
// --------------------------------------------------------------
function parse1() {
var FXX = []
while (GX.length)  // next expression
{ while (GX.length)
{ FXXi = FXX.push([])-1 // next term
  
  if (GX.search(/[\-\+0-9\.]/)==0) // leading constant
  { GXv = GX.match(/[+-]{0,1}[0-9\.]*/)[0]
    GX = GX.slice(GXv.length);
    if (GXv=="+" || GXv=="-") {GXv+="1"; GX = "*"+GX}
    else if(GX.charAt(0)=="^")
    { GXv1=Math.abs(Number(GXv)); GXv2=(GXv.charAt(0)=='-'?-1:1)
      GX=GX.slice(1); GXv = GX.match(/[+-]*[0-9\.]*/)[0]
      if (GXv.length==0){ // constant to an expression power
        GXv=""+GXv1; FXX[FXXi][XXN+1]='pow'}
      else {GX = GX.slice(GXv.length)
        GXv=' '+GXv2*Math.pow(GXv1,Number(GXv))}}
  }
  else {GXv='1'; GX = "*"+GX}
    
  FXX[FXXi][0]=Number(GXv); for (var i=0; i<XXN; i++) {FXX[FXXi][i+1]=0}
  GXs=""; while (GX.length) // collect factors
  { GXs = GX.charAt(0); var GXslash=false
    if (GXs.search(/[A-Z]/)==0) { GXs="*"; GX=GXs+GX } // force factor
    if (GXs.search(/[=,;]/)==0) {break} // next term
    else if(GXs.search(/[\+\-]/)==0) { break } // next term
    else if (GXs==")") { break }
    else if (GXs=="/")  // constant only
    { GX=GX.slice(1); GXv = GX.match(/[+-]*[0-9\.]*/)[0]
      if (GXv.length==0){
      // FXX[FXXi][FXX[FXXi].length]=GXs;
      GXs='*'; GXslash=true; GX='/'+GX
      }
      else {FXX[FXXi][0]/=Number(GXv); GX = GX.slice(GXv.length) }}
    if(GXs=="*")
    { GX=GX.slice(1); GXs = GX.charAt(0)
      if (GX.search(/[\-\+0-9\.]/)==0) // another constant
      { GXv = GX.slice(0,1+(GX.slice(1)+";").search(/[^0-9\.]/)) // not \-\+
        GX = GX.slice(GXv.length);
        if (GXv=="+" || GXv=="-") {GXv+="1"; GX="*"+GX}
        FXX[FXXi][0]*=(GXslash?1/Number(GXv):Number(GXv))}
      else if (GX.search(/[A-Z]/)==0) // variable
      { GXi=(GX+";").search(/[^a-zA-Z0-9]+/); GXv = GX.slice(0,GXi); GX = GX.slice(GXi)
        for (GXi=0;GXi<XXN;GXi++) { if (XX[GXi]==GXv) break } // assume it's OK
        if (GX.charAt(0)=="^")
        { GX=GX.slice(1); GXv = GX.match(/[+-]*[0-9\.]*/)[0]
          if (GXv.length==0){ // to an expression power
          }
          else GX = GX.slice(GXv.length)}
        else { GXv = "1" }
        FXX[FXXi][GXi+1]+=(GXslash?-Number(GXv):Number(GXv))}
      else if (GX.search(/[a-z]/)==0) // function / internal
      { GXi=(GX+";").search(/[^a-zA-Z0-9]+/); GXv = GX.slice(0,GXi)
        GX = GX.slice(GXi); FXX[FXXi][FXX[FXXi].length]=GXv
        if (GX.charAt(0)=="(") { GX = "*"+GX } } // force paren process
      else if (GX.search(/,/)==0) // function parm two
      { GXi=1; GXv = GX.slice(0,GXi)
        GX = GX.slice(GXi); FXX[FXXi][FXX[FXXi].length]=GXv
        GX = "*"+GX } // force paren process
      else if (GXs == "(" || GXs == ",")
      { GX=GX.slice(1);
        fxtemp = parse1()
        FXXi = FXX.length-1
        if (fxtemp.length>0){
        if (GXslash) {
          for (j=0;j<fxtemp.length;j++){
            fxtemp[j][0]=1/fxtemp[j][0]
            for (i=1;i<fxtemp.length;i++) fxtemp[j][i]=-fxtemp[j][i] }}
          FXX[FXXi][FXX[FXXi].length]=fxtemp }
        else
        { FXX[FXXi][0]=0
      } }
      else
      { FXXi = FXX.length-1
        FXX[FXXi].push(GXs) } }
    else if (GXs=="^") // constant powers only
    { GXv = GX.match(/[+-]*[0-9\.]+/)[0]
      if (GXv.length==0) { // to an expression power
      }
      else {
      FXX[FXXi][FXX[FXXi].length] = GXs
      FXX[FXXi][FXX[FXXi].length] = Number(GXv)
      GX = GX.slice(1+GXv.length) }}
    else if (GXs!='/') // bypass fudge
    { FXX[FXXi][FXX[FXXi].length]=GXs; GX=GX.slice(1)}
  }
   if (GXs.search(/[=,;)]/)==0) { break }
}
for (i=0; i<FXX.length; i++)  { FXX =  FXX.slice(0,i).concat(vmult(FXX[i]),FXX.slice(i+1))}
if (GXs.search(/[=,;]/)==0) {FXX[FXX.length-1].push(GXs); GX=GX.slice(1)}
if (GXs==")") {GX=GX.slice(1); break}}
return parse2(FXX) }
// --------------------------------------------------------------
function parse2(FXX) {
// i^2 = -1
for (i=0; i<FXX.length; i++)
{ if (FXX[i][FXX[i].length]=="=") {dosort=false}
  if (FXX[i][XXN]>0)
  { FXX[i][XXN]%=4
    if (FXX[i][XXN]>1) { FXX[i][0]*=-1; FXX[i][XXN]-=2}}}
// flip signs after minus
var equalsign = false
 // document.theForm.output.value += "FXX:"+FXX+"\n"
for (i=0; i<FXX.length; i++)
{ if (equalsign) {FXX[i][0]*=-1}
  if (FXX[i][FXX[i].length-1]=="=") { equalsign=true; FXX[i].pop() } }
// sort terms
for (var i=0; i<FXX.length; i++)
{ dosort=true;
  if (typeof(FXX[i][FXX[i].length-1])=="string")
  { dosort = (FXX[i][FXX[i].length-1].search(/[=;,\/]/)!=0) }
  if (dosort)
  { for (var j=i+1; j<FXX.length; j++)
    { var ij=0; for (var k=0; k<XXN; k++)
      { if (FXX[i][k+1]<FXX[j][k+1]) { ij= +1; break } // swap
        if (FXX[i][k+1]>FXX[j][k+1]) { ij= -1; break } } // leave
      if (ij>0&&!sfie) // swap them
      { var jk=FXX[j]; FXX[j]=FXX[i]; FXX[i]=jk;
        j=i; continue }
      else if ((ij==0)&&(FXX[i].length<XXN+2)&&(FXX[j].length<XXN+2)&&!sfie) // combine them
        { FXX[j][0]= FXX[i][0] + FXX[j][0]
          FXX.splice(i,1); i--; break }
    }
  }
  if (i>=0&&FXX.length>1) if (FXX[i][0]==0) { FXX.splice(i,1); i-- }
}
if (FXX.length==1&&FXX[0][0]==0) FXX=[]
// dump('sort', FXX)
return (FXX)}
// ------------------------------------------------------
function parse(gxin, XX1) { // parse next ( ) expression from gx into FX[]
// if (document.theForm.onechar.checked) {XX=gx.match(/[a-z]/g)}
// else {XX=gx.match(/[a-z][a-z0-9\.]*/g)}
GX=gxin; if (XX1==undefined) {XX=gxin.match(/[A-ZΘθ][A-Z0-9]*/ig)} else {XX = XX1} // use existing variable list ...
if (XX==null) {XX=[]}; XX=XX.sort();
var i=0; while (i<XX.length)
{ if (XX[i]==XX[i-1]||XX[i]=="I") XX.splice(i,1); else i++}
XX.push("I") // always add i at the end
XXN = XX.length // xxn is number of variables
var FXX = parse1()
return(FXX)}
// --------------------------
function simplify(FX,xfrac){return(fx2xx(parse(clean(FX)),xfrac))}
// --------------------------
function fx2xx(FX,xfrac){
var xx=""
for (var i=0; i<FX.length; i++)
{ var xv=""
  for (var j=0; j<XXN; j++) if (FX[i][j+1]!=0) { xv+=XX[j]; if (FX[i][j+1]!=1) xv+="^"+FX[i][j+1] }
  var fxi=XXN+1
  while (fxi<FX[i].length)
  { if (typeof(FX[i][fxi])=="object") xv+="("+fx2xx(FX[i][fxi],xfrac)+")"
    else if(FX[i][fxi]=="/") xv+='/'
    else  xv+=(xv.length==0?"":"*")+FX[i][fxi]
    fxi++ }
  xx += coeff(xx.length==0, FX[i][0], xv, xfrac)
}
if (xx.length==0) xx='0'
return xx.toLowerCase()}
// ----------------------------------------------------------------------------------
function vmult(fx) { // 2x(x+2)(x+3) -> 2x^3 +10x^2 +12x
fxij = [fx]
if (fx.length<XXN+2) return (fxij)
if (typeof(fx[XXN+1])!='object') return (fxij)
for (var i=XXN+1;i<fx.length; i++) // eliminate exponents
{ if (fx[i]=="^")
  { var fxij=fx[i-1]; var j=fx[i+1]; fx.splice(i-1,3)
    while (j>0) { fx.splice(i-1,0,fxij); j-- } } }
fxij = [fx]
while (fx.length>XXN+2)
{ if (typeof(fx[XXN+1])!='object') break
  if (typeof(fx[XXN+2])!='object') break
  fxij = []
  for (var i=0; i<fx[XXN+1].length;i++)
  { for (var j=0; j<fx[XXN+2].length;j++)
    { k=j+i*fx[XXN+2].length
      { fxij[k]=[]
        fxij[k][0]=fx[XXN+1][i][0]*fx[XXN+2][j][0]
        for (var l=1;l<XXN+1;l++)
        { fxij[k][l]=fx[XXN+1][i][l]+fx[XXN+2][j][l] } } } }
  fx.splice(XXN+1,2,fxij)
  }
if (fx.length==XXN+2)
{ var fxij=[]
  for (var i=0; i<fx[XXN+1].length;i++)
  { fxij[i]=[]; fxij[i][0]=fx[0]*fx[XXN+1][i][0]
    for (var j=1;j<XXN+1;j++) { fxij[i][j]=fx[j]+fx[XXN+1][i][j] } }
}
return ( fxij ) }
// ---------------------------------------------------
function savestuff(name,data){
if (name==undefined) name="jsdata"
if (name.length==0) name='jsdata'
if (data==undefined) data=document.theForm.input.value
if (data.length==0) data=document.theForm.input.value
val1=escape(data.replace(/\n/g,"<nl>").replace(/;/g,"<sc>"))
/*
var expirestring = '';
var expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 14);
expirestring = "\n;expires=" + expirationDate.toGMTString();
document.cookie = name+"="+val1+expirestring  ; // "path=//http://faculty.ccc.edu/jnadas/js/string.htm/"
*/
localStorage.setItem(name,val1)
// localStorage.jsdata = val1;
// sessionStorage.jsdata = val1;
}
// ---------------------------------------------------
function loadstuff(dontclear,name){
if (name==undefined) name="jsdata"
if (name.length==0) name='jsdata'
// var xx3 = unescape(localStorage.jsdata);
var xx3=unescape(localStorage.getItem(name))
xx4 = xx3.replace(/<br>/g,"\n").replace(/<sc>/g,";").replace(/<nl>/g,String.fromCharCode(10))  //  "\\n"
if (!dontclear) document.theForm.input.value = ""
document.theForm.input.value = document.theForm.input.value.replace(/\s*$/,'\n').replace(/^\n/,'') +xx4}
// ---------------------------------------------------
function addstuff(name){
if (name==undefined) name="jsdata"
if (name.length==0) name='jsdata'
var data=document.theForm.input.value
var xx3=unescape(localStorage.getItem(name))
xx4 = xx3.replace(/<br>/g,"\n").replace(/<sc>/g,";").replace(/<nl>/g,String.fromCharCode(10))  //  "\\n"
xx5 = xx4+"\n////\n"+data
xx6 = escape(xx5.replace(/\n/g,"<nl>").replace(/;/g,"<sc>"))
localStorage.setItem(name,xx6)
}
// -----------------------------------------------
function Print(xx) {
var $_xxx = ''
for (var i=0;i<xx.length;i++){
  if (typeof(xx[i])=='object') xx[i]='('+xx[i]+')'
  if (i>0 && (i<xx.length-1 || (!(xx[i]==='') && !(xx[i]===';')))) $_xxx+=', '
  if (!(i==xx.length-1 && xx[i]===' ')) $_xxx += xx[i]}
if (''+xx[i-1]===';') $_xxx+=' '
else if (!(''+xx[i-1]==='') && !(''+xx[i-1]===' ') && (xx[0]+'').slice(0,3)!='>>>' && $_xxx.slice(-2)!='? ') $_xxx=$_xxx.replace(/[\n\s]*$/,'\n')
return $_xxx}
// ---------------------------------------------------*/
function print(x) {
var $_xx = Array.prototype.slice.call(arguments)
var $_xxx = document.theForm.input.value + Print($_xx)
document.theForm.input.value=$_xxx
document.theForm.input.selectionStart = $_xxx.length
document.theForm.input.selectionEnd = $_xxx.length
document.theForm.input.focus()}
// ---------------------------------------------------*/
function vprint($_xxx_$_xxx) {
if (typeof($_mode)!='undefined')if($_mode==3)return
var $_xx = Array.prototype.slice.call(arguments)
var $_xxx = document.theForm.input.value
for (var i=0;i<$_xx.length;i++){
  if (i>0 && (i<$_xx.length-1 || $_xx[i]!=''||typeof($_xx[i])!='string')) $_xxx+=', '
  $_xxx += $_xx[i]
  if (typeof($_xx[i])=='string')
  { var $_xxxx = eval($_xx[i]); if (typeof($_xxxx)=='number') $_xxxx = my($_xxxx)
    $_xxx += ' = ' + $_xxxx }}
if (''+$_xx[i-1]!='' && ''+$_xx[i-1]!=' ' && ($_xx[0]+'').slice(0,3)!='>>>' && $_xxx.slice(-2)!='? ') $_xxx=$_xxx.replace(/[\n\s]*$/,'\n')
document.theForm.input.value=$_xxx
document.theForm.input.selectionStart = $_xxx.length
document.theForm.input.selectionEnd = $_xxx.length
document.theForm.input.focus()
return}
// ---------------------------------------------------*/
function Dpr(x){ // document write
var $_xx = Array.prototype.slice.call(arguments);
var $_xxx = Print($_xx)
document.write($_xxx)
if ($_xxx.slice(-1)=='\n') document.write('<br>')
}
// ---------------------------------------------------*/
function countin(string1,string2){
var re=new RegExp(string1,"g"); b=string2.match(re)
if (b==undefined) return 0; else return b.length;
}
// ---------------------------------------------------*/
function torf(tf1,tf2){
if (tf2!=undefined) var tf= !tf1||tf2; else var tf=tf1
return(tf?"T ":"F ")}
// ---------------------------------------------------*/
function asc(x) {return x.charCodeAt(0)}
// ---------------------------------------------------*/
function pad(x,y){ var T=''+x; while (T.length<y) T+=' '; return T}
// ---------------------------------------------------*/
function slim(x){return (''+x).replace(/[ \t]+/g,' ').replace(/^[\n ]*/,'').replace(/[ \n]*$/,'')}
// ---------------------------------------------------*/
function sin(x){return Math.sin(x)}
// ---------------------------------------------------*/
function sin2(x){return Math.sin(x)*Math.sin(x)}
// ---------------------------------------------------*/
function tan(x){return Math.tan(x)}
// ---------------------------------------------------*/
function cos(x){return Math.cos(x)}
// ---------------------------------------------------*/
function cos2(x){return Math.cos(x)*Math.cos(x)}
// ---------------------------------------------------*/
function atan(x){return Math.atan(x)}
// ---------------------------------------------------*/
function asin(x){return Math.asin(x)}
// ---------------------------------------------------*/
function acos(x){return Math.acos(x)}
// ---------------------------------------------------*/
function sqrt(x){return Math.sqrt(x)}
// ---------------------------------------------------*/
function abs(x){return Math.abs(x)}
// ---------------------------------------------------*/
function log(x){return Math.log(x)}
// ---------------------------------------------------*/
function exp(x){return Math.exp(x)}
// ---------------------------------------------------*/
function pow(x,y){return Math.pow(x,y)}
// ---------------------------------------------------*/
function sec(x){return 1/Math.cos(x)}
// ---------------------------------------------------*/
function csc(x){return 1/Math.sin(x)}
// ---------------------------------------------------*/
function cot(x){return 1/Math.tan(x)}
// ---------------------------------------------------*/
function acot(x){return Math.atan(1/x)}
// ---------------------------------------------------*/
function acsc(x){return Math.asin(1/x)}
// ---------------------------------------------------*/
function asec(x){return Math.acos(1/x)}
// ---------------------------------------------------*/
function sind(x){return Math.sin(x*Math.PI/180)}
// ---------------------------------------------------*/
function sind2(x){return Math.sin(x*Math.PI/180)*Math.sin(x*Math.PI/180)}
// ---------------------------------------------------*/
function tand(x){return Math.tan(x*Math.PI/180)}
// ---------------------------------------------------*/
function cosd(x){return Math.cos(x*Math.PI/180)}
// ---------------------------------------------------*/
function cosd2(x){return Math.cos(x*Math.PI/180)*Math.cos(x*Math.PI/180)}
// ---------------------------------------------------*/
function atand(x){return Math.atan(x)*180/Math.PI}
// ---------------------------------------------------*/
function asind(x){return Math.asin(x)*180/Math.PI}
// ---------------------------------------------------*/
function acosd(x){return Math.acos(x)*180/Math.PI}
// ---------------------------------------------------*/
function secd(x){return 1/Math.cos(x*Math.PI/180)}
// ---------------------------------------------------*/
function cscd(x){return 1/Math.sin(x*Math.PI/180)}
// ---------------------------------------------------*/
function cotd(x){return 1/Math.tan(x*Math.PI/180)}
// ---------------------------------------------------*/
function acotd(x){return Math.atan(1/x)*180/Math.PI}
// ---------------------------------------------------*/
function acscd(x){return Math.asin(1/x)*180/Math.PI}
// ---------------------------------------------------*/
function asecd(x){return Math.acos(1/x)*180/Math.PI}
// ---------------------------------------------------*/
function line(x,y,z,w){
if (typeof(x)=='undefined'){x=saveline[0];y=saveline[1];z=saveline[2];w=saveline[3]}
else if (typeof(x)=='object'){z=y[0];w=y[1];y=x[1];x=x[0]}
else if (typeof(w)=='undefined'){w=y+z; z=x+1}
saveline=[x,y,z,w]
if (x==z) return 'x='+x
return 'y='+xterm(true,slope(),1)+xterm(slope()==0,yval(0),0)}
// ---------------------------------------------------*/
function dist(x,y,z,w){
if (typeof(x)=='undefined'){x=saveline[0];y=saveline[1];z=saveline[2];w=saveline[3]}
else if (typeof(x)=='object'){z=y[0];w=y[1];y=x[1];x=x[0]}
else if (typeof(w)=='undefined'){w=y+z; z=x+1}
saveline=[x,y,z,w]; x=x-z; y=y-w
return Math.sqrt(x*x+y*y)}
// ---------------------------------------------------*/
function slope(x,y,z,w){
var q=0
if (typeof(x)=='undefined'){x=saveline[0];y=saveline[1];z=saveline[2];w=saveline[3]}
else if (typeof(x)=='object'){z=y[0];w=y[1];y=x[1];x=x[0]}
else if (typeof(w)=='undefined'){w=y+z; z=x+1}
saveline=[x,y,z,w]; x=x-z; y=y-w
return y/x}
// ---------------------------------------------------*/
function pspbola (x0,y0,x1,y1,m0) {
// input first point & slope and second point
// output a,b,c coefficients for parabola
var d=[[],[],[],[]];
if (m0==undefined) m0=(y1-y0)/(x1-x0)
d[1][1]=x0*x0; d[1][2]=x0; d[1][3]=1; d[1][4]=y0; // ax^2+bx+c=y
d[2][1]=2*x0; d[2][2]=1; d[2][3]=0; d[2][4]=m0;  // 2ax+b=m
d[3][1]=x1*x1; d[3][2]=x1; d[3][3]=1; d[3][4]=y1; // ax^2+bx+c=y
var d0 = d[1][1] * (d[2][2] * d[3][3] - d[2][3] * d[3][2]) - d[2][1] * (d[1][2] * d[3][3] - d[1][3] * d[3][2]) + d[3][1] * (d[1][2] * d[2][3] - d[1][3] * d[2][2])
a = (d[1][4] * (d[2][2] * d[3][3] - d[2][3] * d[3][2]) - d[2][4] * (d[1][2] * d[3][3] - d[1][3] * d[3][2]) + d[3][4] * (d[1][2] * d[2][3] - d[1][3] * d[2][2])) / d0
b = (d[1][1] * (d[2][4] * d[3][3] - d[2][3] * d[3][4]) - d[2][1] * (d[1][4] * d[3][3] - d[1][3] * d[3][4]) + d[3][1] * (d[1][4] * d[2][3] - d[1][3] * d[2][4])) / d0
c = (d[1][1] * (d[2][2] * d[3][4] - d[2][4] * d[3][2]) - d[2][1] * (d[1][2] * d[3][4] - d[1][4] * d[3][2]) + d[3][1] * (d[1][2] * d[2][4] - d[1][4] * d[2][2])) / d0
return ""+a+"x^2"+"+("+b+"x)+("+c+")"}
// ---------------------------------------------------*/
function xval(y,x1,y1,x2,y2){
if (typeof(y)=='undefined') return y;
if (typeof(x1)=='undefined'){x1=saveline[0];y1=saveline[1];x2=saveline[2];y2=saveline[3]}
else if (typeof(x1)=='object'){y2=x1[3];x2=x1[2];y1=x1[1];x1=x1[0]}
else if (typeof(y2)=='undefined'){y2=y1+x2; x2=x1+1}
saveline=[x1,y1,x2,y2]
if (x1==x2) return x1
var m=(y1-y2)/(x1-x2); var b=y1-m*x1
return (y-b)/m}
// ---------------------------------------------------*/
function yval(x,x1,y1,x2,y2){
if (typeof(x)=='undefined') return x;
if (typeof(x1)=='undefined'){x1=saveline[0];y1=saveline[1];x2=saveline[2];y2=saveline[3]}
else if (typeof(x1)=='object'){y2=x1[3];x2=x1[2];y1=x1[1];x1=x1[0]}
else if (typeof(y2)=='undefined'){y2=y1+x2; x2=x1+1}
saveline=[x1,y1,x2,y2]
if (x1==x2) return undefined
var m=(y1-y2)/(x1-x2); var b=y1-m*x1
return m*x+b}
// ---------------------------------------------------*/
function angle(x,y){
if (typeof(x)=='object'){y=x[1];x=x[0]}
var d=Math.sqrt(x*x+y*y)
var d=Math.acos(x/d)*180/Math.PI
if (y>0) return d; else return 360-d}
// ---------------------------------------------------*/
function quad(a,b,c) {
  var d2 = b*b-4*a*c
  if (d2<0) return [[-b/2/a,sqrt(-d2)/2/a],[-b/2/a,-sqrt(-d2)/2/a]]
  return [(-b+sqrt(d2))/2/a,(-b-sqrt(d2))/2/a]
}
// ---------------------------------------------------*/
function rand(x,y) {
  if (x==undefined) $$_random = Math.random()
  else {
    if (y==undefined) {y=x; x=0 }
    $$_random = Math.floor((Math.random()*(y+1-x))+x)}
  if(typeof($_mode)!='undefined'){
    if ($_mode==3 && $_randomI<$_random.length) return $_random[$_randomI++]
    $_random.push($$_random)}
  return($$_random) }
// ---------------------------------------------------*/
function int(x) {return Math.floor(x)}
// ---------------------------------------------------*/
function floor(x) {return Math.floor(x)}
// ---------------------------------------------------*/
function ceil(x) {return Math.ceil(x)}
// ---------------------------------------------------*/
function sum(A) {var s=0; for (var i=0;i<A.length;i++) s+=Number(A[i]); return s}
// ---------------------------------------------------*/
function xy(x,y) {X=x; Y=y; return [X,Y]}
// ---------------------------------------------------*/
