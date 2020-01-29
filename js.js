<!--
Numbers -----------------------------
toExponential(x)	Converts a number into an exponential notation
toFixed(x)	Formats a number with x numbers of digits after the decimal point
toPrecision(x)	Formats a number to x length
toString()	Converts a number to a string
valueOf()	Returns the primitive value of a number

Arrays -------------------------------

.concat()	Joins two or more arrays, and returns a copy of the joined arrays
.indexOf()	Search the array for an element and returns its position
.join(',')	Joins all elements of an array into a string
.lastIndexOf()	Search the array for an element, starting at the end, and returns its position
.pop()	Removes the last element of an array, and returns that element
.push()	Adds new elements to the end of an array, and returns the new length
.reverse()	Reverses the order of the elements in an array
.shift()	Removes the first element of an array, and returns that element
.slice()	Selects a part of an array, and returns the new array
.sort()	Sorts the elements of an array  .sort(function(a, b){return a-b})
.splice(a,n,x1,x2,...)	Adds/Removes elements from an array
		deletes 'n' items starting 'a' replaces them with x1,x2, etc
		updates the array, returns the items that wre deleted.
.toString()	Converts an array to a string, and returns the result
.unshift()	Adds new elements to the beginning of an array, and returns the new length
.valueOf()	Returns the primitive value of an array

Strings -----------------------------
 .length  PROPERTY, not method
 .charAt()	Returns the character at the specified index (position)
 .charCodeAt()	Returns the Unicode of the character at the specified index
 String.fromCharCode()	Converts Unicode values to characters
 .indexOf(s,n)	Returns the position of the first found occurrence of s starting at position n
 .lastIndexOf(s)	Returns the position of the last found occurrence of s
 .match(\###\gi)	Searches a string for a match against regular expression ###, and returns matches in array
Number(s)       NaN, number
 .replace(a,b) replace <a> with <b> where <a> is a string or a regex and <b> is a string
 .search()	Searches a string for value, or regular expression, and returns the position of the match
 .slice(f,t)	Extracts a part of a string and returns a new string	1st 9 = .slice(0,9) last 9 = .slice(-9)
 .substring(f,t)	Extracts the characters from a string, beginning at a specified start position, and through the specified end position
 .split('')	Splits a string into an array of substrings
 .substr(f,t-f)	Extracts the characters from a string, beginning at a specified start position, and through the specified number of characters
 .toLowerCase()	Converts a string to lowercase letters
 .toString()	Returns the value of a String object
 .toUpperCase()	Converts a string to uppercase letters
 .trim()		Removes whitespace from both ends of a string
 .valueOf()	Returns the primitive value of a String object
examples:
s = 'asdfgh'
s.split('').sort().join('')  = 'adfghs'
s.replace('sd','*')  = 'a*fgh'
s.replace(/[sF]/ig,'*')  = 'a*d*gh'
s.replace(RegExp('as|fg','g'),'*') = '*d*h'
patter = /as|fg/gi OR patter = RegExp('as|fg','gi')
patter.test(s) = true
s.search(patter) = 0
s.replace(patter,'*') = '*d*h'

Dates ---------------------------------
d = new Date()
var d = new Date(dateString)
var d = new Date(year, month, day, hours, minutes, seconds, milliseconds)
Methods:
getDate()	Returns the day of the month (from 1-31)
getDay()	Returns the day of the week (from 0-6)
getFullYear()	Returns the year (four digits)
getHours()	Returns the hour (from 0-23)
getMilliseconds()	Returns the milliseconds (from 0-999)
getMinutes()	Returns the minutes (from 0-59)
getMonth()	Returns the month (from 0-11)
getSeconds()	Returns the seconds (from 0-59)
getTime()	Returns the number of milliseconds since midnight Jan 1, 1970
toDateString()	Converts the date portion of a Date object into a readable string
toString()	Converts a Date object to a string
toTimeString()	Converts the time portion of a Date object to a string
Examples:
D = new Date() // Thu Jan 26 2017 19:01:05 GMT-0600 (CST)
D.toDateString() // Thu Jan 26 2017
D.toLocaleDateString() // 1/26/2017
D.toLocaleTimeString() // 7:01:05 PM
C=Date.parse(D) // 1485478865000
new Date(C+24*3600000) // Fri Jan 27 2017 19:01:05 GMT-0600 (CST)
tt1 = new Date(); elapsed time counter; tt2 = new Date(); print(tt2-tt1)


Myfunctions.js and matrix.js ----------------
addtolist(a,x){
base(x,y){  // if x is a string convert to decimal, if it is a number convert to the base
clean (exdata, ssvar){ // ssvar true if trailing digits are subscripts . . .
cleanx (exdata, getval, ssvar){ with(Math) { // defaults to false, false
coeff(lead, x, xn, xfrac) {// is leading term, coefficient, variable, myround edit
dice(x,y){
div(x,y){return x%y==0}  // true if y divides into x evenly
dms(D) {
Dpr(x) { Document.write
exp(x){return Math.exp(x)}
fact(n) { return npr(n,n) }
fx2xx(FX,xfrac){
gcf () {
gcf2 (a, b) {
gcfsum (a,b) {
imp(x,y){return !x || y}
int(x) {return Math.floor(x)}
lcm () {
ln(a,b){ // log base a (b)  a defaults to e
loadstuff(dontclear,name){
log(x){return Math.log(x)}
my(x,y){  // my(1/3,0) = 0.33333333;  my(1/3,1) = 0.3333333333333333;  my(1/3,2) = 0.3333;  my(1/3,3) = 1/3;  my(1/3,4) = 33.3% ;  my(1/3,5) = 0°20°0;  my(1/3,6) = 0.333333;  my(1/3,7) = 0.3333333;  my(1/3,8) = 0.33333333
mylog(a,b){ // log base a (b) a defaults to 10
myround(x,places) { // places: true=fraction, n = # places, false = full accuracy, -1=pcnt, -2=scientific
myval(x){
ncr(n,x) {
npr(n,x) {
pad(x,y){ var T=''+x; while (T.length<y) T+=' '; return T}
parse(gxin, XX1) { // parse next ( ) expression from gx into FX[]
parse1() {
parse2(FXX) {
pause () {
pow(x,y){return Math.pow(x,y)}
prime(x){
print(x) {
Print(xx) {
rand(x,y) {
round4(x,xfrac)
savestuff(name,data){
slim(x){return (''+x).replace(/\s/g,'').toUpperCase()}
sqrt(x){return Math.sqrt(x)}
swfrac(docalc,maxval) {
torf(tf1,tf2){
vmult(fx) { // 2x(x+2)(x+3) -> 2x^3 +10x^2 +12x
vprint(xxx_xxx) {
xterm(plead, x, pxnn, xfrac) {// is leading term, coefficient, power of x, myround edit
xy(x,y) {X=x; Y=y; return [X,Y]}

straight line from (x,y) to (z,w) ---------- saveline [0 thru 3]
slope(x,y,z,w){
yval(q){ // y(x) from saveline[]
xval(q){ // x(y) from saveline[]
dist(x,y,z,w){
line(x,y,z,w){

statfns.js --------------------------------------
cdf(z){ // uses parameter/statistic flag to call zcdf() or tcdf()
cdfinv(z){ // uses parameter/statistic flag to call zcdfinv() or tcdfinv()
prdf(){
przt(){
tcdf(x,df){
tcdfinv(cdfp,df){
zcdf(z){
zcdfinv(p) {

trig functions ---------------------------------
acos(x){return Math.acos(x)}
acosd(x){return Math.acos(x)*180/Math.PI}
acot(x){return Math.atan(1/x)}
acotd(x){return Math.atan(1/x)*180/Math.PI}
acsc(x){return Math.asin(1/x)}
acscd(x){return Math.asin(1/x)*180/Math.PI}
angle(x,y){ 0-360 angle of point(x,y)
asec(x){return Math.acos(1/x)}
asecd(x){return Math.acos(1/x)*180/Math.PI}
asin(x){return Math.asin(x)}
asind(x){return Math.asin(x)*180/Math.PI}
atan(x){return Math.atan(x)}
atand(x){return Math.atan(x)*180/Math.PI}
cos(x){return Math.cos(x)}
cos2(x){return Math.cos(x)*Math.cos(x)}
cosd(x){return Math.cos(x*Math.PI/180)}
cosd2(x){return Math.cos(x*Math.PI/180)*Math.cos(x*Math.PI/180)}
cot(x){return 1/Math.tan(x)}
cotd(x){return 1/Math.tan(x*Math.PI/180)}
csc(x){return 1/Math.sin(x)}
cscd(x){return 1/Math.sin(x*Math.PI/180)}
sec(x){return 1/Math.cos(x)}
secd(x){return 1/Math.cos(x*Math.PI/180)}
sin(x){return Math.sin(x)}
sin2(x){return Math.sin(x)*Math.sin(x)}
sind(x){return Math.sin(x*Math.PI/180)}
sind2(x){return Math.sin(x*Math.PI/180)*Math.sin(x*Math.PI/180)}
tan(x){return Math.tan(x)}
tand(x){return Math.tan(x*Math.PI/180)}

Matrix functions -------------------------------
Madd(x,y){
Mclone(a){ // matrix clone: b=mclone(a)
Mdet(x){
Mdump(x){
Minv(x){
Mmul(x,y){
Mnotsame(x,y){
Mparse(x)  // 1 by 1 treated like a scalar?
Mpow(X,C)
Mprint(x) // square matrix
Lprint(x) // printed on one line
Msplit(X)
Msub(x,y){
Mtran(x){

high precision math ----------------------------
hpadd(x,y){
hpdiv(mm,nn){
hpfact(x){
hpless(x,y){ // x<y
hpmul(x,y){
hppow(a,b){
hpsumdig(x){
hpsumdiv(x){

-->
