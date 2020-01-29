// <SCRIPT type="text/javascript" src="matrix.js"></script>
hpdecpoint=0
var x=[[1,2,3,4,11,12,13,14],[5,6,7,8,15,16,17,18]] // must be rectangular
var y=[[5,6,7,8,15,16,17,18],[1,2,3,4,11,12,13,14]] // must be rectangular
// ---------------------------------------------------
function Mnotsame(x,y){
return (x.length===undefined || x[0].length===undefined || y.length===undefined || y[0].length===undefined || x.length!=y.length || x[0].length!=y[0].length)}
// ---------------------------------------------------
function Madd(x,y){
var t=[], i=0, j=0
if(typeof(x)=='number'){
  if (typeof(y)=='number') return(x+y)
  for (i=0; i<y.length; i++)
  { t[i]=[]
    for (j=0; j<y[i].length; j++) if (i==j) t[i][j] = x+y[i][j]; else t[i][j]=y[i][j]}
  return t
}
if (Mnotsame(x,y)) return [[]]
for (i=0; i<x.length; i++)
{ t[i]=[]
  for (j=0; j<x[i].length; j++) t[i][j] = x[i][j]+y[i][j]}
return t}
// ----------------------------------------------------------------------------------
function Msub(x,y){
var t=[], i=0, j=0
if(typeof(x)=='number'){
  if (typeof(y)=='number') return(x-y)
  t=[]
  for (i=0; i<y.length; i++)
  { t[i]=[]
    for (j=0; j<y[i].length; j++) if (i==j) t[i][j] = x-y[i][j]; else t[i][j] = -y[i][j];}
  return t
}
if (Mnotsame(x,y)) return [[]]
t=[]
for (i=0; i<x.length; i++)
{ t[i]=[]
  for (j=0; j<x[i].length; j++) t[i][j] = x[i][j]-y[i][j]}
return t}
// ----------------------------------------------------------------------------------
function Mmul(x,y){
var t=[]
if (typeof(x)=="number")
{ for (var j=0; j<y.length; j++)
  { t[j]=[]
    for (var k=0; k<y[j].length; k++) t[j][k]=y[j][k]*x}
return t}
if (x.length==undefined || x[0].length==undefined || y.length==undefined || y[0].length==undefined || x[0].length!=y.length) return [[]]
for (var i=0; i<x.length; i++)
{ t[i]=[]
  for (var j=0; j<y[0].length; j++)
  { var l=0
    for (var k=0; k<y.length; k++) l += x[i][k]*y[k][j]
    t [i][j]=l
} }
return t}
// ----------------------------------------------------------------------------------
function Mtran(x){
var t=[]
var n=x.length; var m=x[0].length
for (var i=0; i<m; i++)
{ t[i]=[]
  for (var j=0; j<n; j++) t[i][j]=x[j][i]}
return t}
// ----------------------------------------------------------------------------------
function Minv(x){
if (x.length==undefined || x[0].length==undefined || x[0].length!=x.length) return [[]]
var u=[], t=[], n=0, t1=0
n = x.length
for (var i=0; i<n; i++)
{ u[i]=[]; t[i]=[]
  for (var j=0; j<n; j++) { u[i][j] = x[i][j]; t[i][j]=(i==j?1:0) }}
for (var i=0; i<n; i++) // find a non zero row for every column
{ for (var i1=i; i1<n; i1++) {if (u[i1][i]!=0) {break}}
  if (i1==n) return [[]]
  if (i1!=i)
  { for (var j=0; j<n; j++)
    { u[i][j]+=u[i1][j]; t[i][j]+=t[i1][j]}}
  t1 = u[i][i]
  for (var j=0; j<n; j++)
  { u[i][j]/=t1; t[i][j]/=t1}
  for (var k=0; k<n; k++)
  { if (k!=i && u[k][i]!=0)
    { t1 = u[k][i]
      for (var j=0; j<n; j++)
      { u[k][j] -= u[i][j]*t1
        t[k][j] -= t[i][j]*t1 }}}}
// document.write("<br>end:  ",u," &nbsp; ",t)
return t}
// ----------------------------------------------------------------------------------
function Mdet(x){
if (x.length==undefined || x[0].length==undefined || x[0].length!=x.length) return [[]]
var u=[], n=0, t1=0
n = x.length
for (var i=0; i<n; i++)
{ u[i]=[]
  for (var j=0; j<n; j++) u[i][j] = x[i][j]}
for (var i=0; i<n; i++) // find a non zero row for every column
{ for (var i1=i; i1<n; i1++) {if (u[i1][i]!=0) {break}}
  if (i1==n) return 0
  if (i1!=i)
  { for (var j=0; j<n; j++)
    { u[i][j]+=u[i1][j]}}
  for (var k=0; k<n; k++)
  { if (k!=i && u[k][i]!=0)
    { t1 = u[k][i]/u[i][i]
      for (var j=0; j<n; j++)
      { u[k][j] -= u[i][j]*t1}}}}
var t=u[0][0]
for (i=1;i<n;i++)t*=u[i][i]
u = [[t]]
return t}
// ----------------------------------------------------------------------------------
function Lprint(x) {
if (typeof(x)!='object') print (my(x),'')
else
{ print ('[','')
  for (var i=0;i<x.length;i++){
    Lprint(x[i])
    if (i<x.length-1) print(',',''); else print(']','')}
} }
// ----------------------------------------------------------------------------------
function Mprint(x) {
print()
for (var i=0;i<x.length;i++)
{print("// "+i+":","")
 if (typeof(x[i])=='object'){
  for (var j=0;j<x[i].length-1;j++)
  print(my(x[i][j]),'','')
  print(my(x[i][j]))}
 else print (my(x[i]))}
print('// - - - -')}
// ----------------------------------------------------------------------------------
function Mdump(x){
for (var i=0; i<x.length; i++)
{ document.write("Row",i,": ")
  for (var j=0; j<x[i].length; j++) document.write(myround(x[i][j],true),",")
  document.write("<br>")
}}
// ----------------------------------------------------------------------------------
function Mparse(x)  // 1 by 1 treated like a scalar?
{ var t=[]; var t1=0;
  var w=x.replace(/\|/g,"").replace(/;/g,"\n").replace(/^\n*/,"").replace(/\n+/g,"\n").replace(/\n*$/,"")
  w=w.replace(/[ \t\0]+/g," ").replace(/\s*\n\s*/g,"\n")
  w=w.replace(/[\]\)] *,* *[\(\[]/g,"\n").replace(/[\[\]\(\)]/g,"").replace(/\.\.+/g," ").replace(/\:/g,",")
  w=w.replace(/(\d)\ +(\d)/g,"$1,$2")
  if (w.search(/\n/)==-1&&w.search(/,/)==-1){
    if(slim(x)=='') return(0)
    try {var w5=eval(cleanx(x))} catch(err) {var w5=0}
    return w5}
  w+="\n"
  while (w.length>1)
  { t[t1]=[]; var w2=w.search(/\n/); var w1=w.slice(0,w2)+","; w=w.slice(w2+1)
    w1=w1.replace(/ /g,",").replace(/,,+/g,",").replace(/^,+/,"")
    while (w1.length>1)
    { var w3=w1.search(/,/); var w4=w1.slice(0,w3); w1=w1.slice(w3+1);
      try {var w5=eval(cleanx(w4))} catch(err) {var w5=0}
      t[t1].push(w5)}; t1++}
  return t }
// - - - - - - -- - -- - - - - - - - - - - --
function Mpow(X,C)
{ if (C==undefined) CC=2; else CC=C
  var B=[]
  for (var i=0; i<X.length; i++)
  { B[i]=[]
    for (var j=0; j<X[i].length; j++)
    { F=[X[i][j]];
      for (k=1; k<CC; k++) F[k]=F[0]*F[k-1]
      B[i]=B[i].concat(F.reverse())}
    B[i]=B[i].concat([1])}
 return B}
// - - - - - - -- - -- - - - - - - - - - - --
function Msplit(X)
{ var B=[[]]
  // if (X[0].length<=X.length) return B
  for (var i=0; i<X.length; i++)
  { B[i]=[]; B[i][0]=X[i].pop() }
return B}
// -------------------------  high precision math ----------------------------
// ----------------------------------------------------------------------------------
function hptoInt(x){
var dp = x.lastIndexOf('.')
x=x.replace('.','')
if (dp>-1)hpdecpoint+= x.length - dp
return(x)}
// ----------------------------------------------------------------------------------
function hptoDec(x,n){
if (n>0) if (n<=x.length) x = x.slice(0,-n)+'.'+x.slice(-n)
return x}
// ----------------------------------------------------------------------------------
function hpadd(x,y){
hpdecpoint=0; var sx=hptoInt(''+x); var ndx=hpdecpoint
hpdecpoint=0; var sy=hptoInt(''+y); var ndy=hpdecpoint
while (ndx<ndy) {ndx++; sx+='0'}
while (ndy<ndx) {ndy++; sy+='0'}
var r=''; var a=0; var b=0; var c=0
var lx=sx.length-1; var ly=sy.length-1
var l=Math.max(lx,ly)+1
for (var i=0; i<l; i++)
{ if (i<=lx) a=0|sx[lx-i]; else a=0
  if (i<=ly) b=0|sy[ly-i]; else b=0
  c=c+a+b
  var d=c%10
  r=d+r; c=(c-d)/10 }
if (c>0) r=c+r
return hptoDec(r,ndx)}
// ----------------------------------------------------------------------------------
function hpsub(x,y){
hpdecpoint=0; var sx=hptoInt(''+x); var ndx=hpdecpoint
hpdecpoint=0; var sy=hptoInt(''+y); var ndy=hpdecpoint
while (ndx<ndy) {ndx++; sx+='0'}
while (ndy<ndx) {ndy++; sy+='0'}
var r=''; var a=0; var b=0; var c=0
var lx=sx.length-1; var ly=sy.length-1
var l=Math.max(lx,ly)+1
for (var i=0; i<l; i++)
{ if (i<=lx) a=0|sx[lx-i]; else a=0
  if (i<=ly) b=0|sy[ly-i]; else b=0
  d=c+a-b; c=0
  while (d<0) {d+=10;c--}
  var d=d%10; r=d+r}
if (c==0) s=r; else
{ var s="-"; for (i=0; i<r.length; i++) if (i==(r.length-1)) s=s+(10-(1*r[i])); else s=s+(9-(1*r[i]))  }
return hptoDec(s,ndx)}
// ----------------------------------------------------------------------------------
function hpmul(x,y){
hpdecpoint=0
var sx=hptoInt(''+x); var sy=hptoInt(''+y); var r=''
var ndxy = hpdecpoint
var lx=sx.length-1
for (var i=lx; i>=0; i--)
{ var ly=sy.length-1
  var r1=''; var c=0
  var vx=0|sx[i]
  for (var j=ly; j>=0; j--)
  { c+= vx*(0|sy[j])
    var d=c%10
    r1=d+r1; c=(c-d)/10}
  if (c>0) r1=c+r1
  r=hpadd (r,r1)
  sy=sy+'0'}
return hptoDec(r,ndxy)}
// ----------------------------------------------------------------------------------
function hpdiv(mm,nn){
 if (nn==0) return '∞'
 var m=mm; var n=nn
 var q=(m/n)|0
 var s=q+'.'
 var l=[]
 var ii=0
 var ll=0
 m=m-q*n
 while (m>0){
  m*=10
  while (m<n){s+='0';m*=10;l.push(0)}
  q=(m/n)|0
  s=s+q
  r=m-q*n
  if (r==0){ll=0;break}
  var f=false
  for (i=0;i<l.length;i++)if(r==l[i]){ii=i; f=true}
  ll=l.length-ii; l.push(r)
  if (f) break
  m=r}
return s.slice(0,s.length-ll)+"("+s.slice(s.length-ll)+')'}
// ----------------------------------------------------------------------------------
function hpsumdiv(x){
var sx=''+x; var vx=0|sx; var t=1; var lx=vx/2+1
for (var i=2; i<lx; i++) if ((vx%i)==0) t+=i
return t}
// ----------------------------------------------------------------------------------
function hpsumdig(x){
var sx=''+x; var t=0; var lx=sx.length
for (var i=0; i<lx; i++) t+=(0|sx[i])
return t}
// ----------------------------------------------------------------------------------
function hpfact(x){
var sx=''+x; var t='1'; var lx=0|x
for (var i=1; i<=lx; i++) t = hpmul(i,t)
return t}
// ----------------------------------------------------------------------------------
function hppow(a,b){
if ((a==undefined)&&(b==undefined))
return '\nx= "80538738812075974"; y= "80435758145817515"; z= "12602123297335631"; \nu= hpadd(hppow(y,3),hppow(z,3)); \nhpsub(u,hppow(x,3));'
c='1';d=base(b|0,2);e=''+a
while (d.length>0){
 if (d[d.length-1]=='1') c=hpmul(c,e)
 d=d.slice(0,-1)
 e=hpmul(e,e)}
return c}
// ----------------------------------------------------------------------------------
function hpless(a,b) { // a<b
var sx=''+a; var ndx = sx.indexOf('.'); if (ndx<0) ndx = sx.length
var sy=''+b; var ndy = sy.indexOf('.'); if (ndy<0) ndy = sy.length
while (ndx<ndy) {ndx++; sx='0'+sx}
while (ndy<ndx) {ndy++; sy='0'+sy}
return sx<sy}
// ----------------------------------------------------------------------------------
function Mclone(a){ // matrix clone: b=mclone(a)
if (typeof(a)=="object"){
var b=[]; for (var i=0; i<a.length; i++) b[i]= Mclone(a[i])}
else var b=a
return b}
// ----------------------------------------------------------------------------------






