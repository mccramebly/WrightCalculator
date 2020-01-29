// <SCRIPT type="text/javascript" src="http://faculty.ccc.edu/jnadas/js/statfns.js"></script>
function przt(){
var df = eval(document.theForm.sample.value)-1
if (document.theForm.CItype[1].checked && df > 0) return "t"; else return "z"}
// ---------------------------------------------------*/
function prdf(){
var df = eval(document.theForm.sample.value)-1
if (document.theForm.CItype[1].checked && df > 0) return " d.f.="+df+"\n";
return "\n"}
// ---------------------------------------------------*/
function cdf(z){
var df = eval(document.theForm.sample.value)-1
if (document.theForm.CItype[1].checked && df > 0) return (tcdf(z,df));
else return (zcdf(z)) }
// -------------------------
function znormal(z)
{ return(zcdf(z+.001)-zcdf(z-.001))/.002}
// ---------------------------------------------------*/
function zcdf(z){
var t=Math.abs(z), a1=0.0000053830, a2=0.0000488906, a3=0.0000380036;
var a4=0.0032776263, a5=0.0211410061, a6=0.0498673470;
t=Math.pow((((((a1*t+a2)*t+a3)*t+a4)*t+a5)*t+a6)*t+1,-16)/2;
if (z>=0) t=1-t;
return (t)}
// ---------------------------------------------------*/
function tcdf(x,df){
with (Math) {
var t=abs(x), tsq=x*x, p;
if (df==1) p=1-2*atan(t)/PI;
else if (df==2) p=1-t/sqrt(tsq+2);
else if (df==3) p=1-2*(atan(t/sqrt(3))+t*sqrt(3)/(tsq+3))/PI;
else if (df==4) p=1-t*(1+2/(tsq+4))/sqrt(tsq+4);
else {
var A9=df-0.5, B9=48*A9*A9, T9=x*x/df, Z8, P7, B7, z;
if (T9 >= 0.04) Z8=A9*log(1+T9);
else Z8=A9*(((1-T9*0.75)*T9/3-0.5)*T9+1)*T9;
P7=((0.4*Z8+3.3)*Z8+24)*Z8+85.5;
B7=0.8*pow(Z8, 2)+100+B9;
z=(1+(-P7/B7+Z8+3)/B9)*sqrt(Z8);
if (x<0) z=-z;
return(zcdf(z))}
return p}}
// ---------------------------------------------------*/
function cdfinv(z){
var df = eval(document.theForm.sample.value)-1;
if (document.theForm.CItype[1].checked && df > 0) return (tcdfinv(z,df));
else return (zcdfinv(z)) }
// ---------------------------------------------------*/
function zcdfinv(p) {
var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969, a4 = 138.357751867269;
var a5 = -30.6647980661472, a6 = 2.50662827745924, b1 = -54.4760987982241, b2 = 161.585836858041;
var b3 = -155.698979859887, b4 = 66.80131188771971, b5 = -13.2806815528857, c1 = -0.00778489400243029;
var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373, c5 = 4.37466414146497;
var c6 = 2.93816398269878, d1 = 0.00778469570904146, d2 = 0.32246712907004, d3 = 2.445134137143;
var d4 = 3.75440866190742, plow = 0.02425, phigh = 1 - plow, q , r;
if (p < plow)
{ q = Math.sqrt(-2 * Math.log(p));
  return ((((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1));
} else if (p <= phigh)
{ q = p - 0.5;
  r = q * q;
  return ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1));
} else if (p < 1)
{ q = Math.sqrt(-2 * Math.log(1 - p));
  return -((((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1));
}}
// ---------------------------------------------------*/
function tcdfinv(cdfp,df){
p=2-2*cdfp; // convert to two tailed alpha
var a, b, c, d, t, x, y;
with (Math)
{ if      (df == 1) t = cos(p*PI/2)/sin(p*PI/2);
  else if (df == 2) t = sqrt(2/(p*(2 - p)) - 2);
  else
  { a = 1/(df - 0.5);
    b = 48/(a*a);
    c = ((20700*a/b - 98)*a - 16)*a + 96.36;
    d = ((94.5/(b + c) - 3)/b + 1)*sqrt(a*PI*0.5)*df;
    x = d*p;
    y = pow(x, 2/df);
    if (y > 0.05 + a)
    { x = zcdfinv(1-0.5*p); y = x*x;
      if (df < 5) c = c + 0.3*(df - 4.5)*(x + 0.6);
      c = (((0.05*d*x - 5)*x - 7)*x - 2)*x + b + c;
      y = (((((0.4*y + 6.3)*y + 36)*y + 94.5)/c - y - 3)/b + 1)*x;
      y = a*y*y;
      if (y > 0.002) y = exp(y) - 1;
      else y = 0.5*y*y + y;
      t = sqrt(df*y) }
    else
    { y = ((1/(((df + 6)/(df*y) - 0.089*d - 0.822)*(df + 2)*3) + 0.5/(df + 4))*y - 1)*(df + 1)/(df + 2) + 1/y;
      t = sqrt(df*y)}}}
  return t }
// ---------------------------------------------------*/
function msd(msdd){
  var msdm=0; msdn=0; msdx=0; msdxx=0; for (msdi=0;msdi<msdd.length;msdi++)
  { if (typeof(msdd[msdi])!="object") {msdn++; msdx+=msdd[msdi]; msdxx+=msdd[msdi]*msdd[msdi]}
    else {msdn+=msdd[msdi][2]; msdx+=msdd[msdi][0]; msdxx+=msdd[msdi][0]*msdd[msdi][0]}}
  msdv=(msdxx-msdx*msdx/msdn)/(msdn-1)
  return([msdx/msdn,sqrt(msdv)])}
// ---------------------------------------------------*/
// ---------------------------------------------------*/
