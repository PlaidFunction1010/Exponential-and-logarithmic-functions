(function(){'use strict';
const names=['基本性質：logₐ a = 1','基本性質：logₐ 1 = 0','指數與對數互消','對數與指數互消','對數加法法則','對數減法法則','真數的次方法則','換底公式','底數與真數的次方','倒數性質','連鎖換底','同次方消去','指數對數交換'];
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
function frac(n,d=1){if(!d)throw Error('zero denominator');if(d<0){n=-n;d=-d}let g=gcd(Math.abs(n),d);return {n:n/g,d:d/g}}
const mul=(a,b)=>frac(a.n*b.n,a.d*b.d),div=(a,b)=>frac(a.n*b.d,a.d*b.n),add=(a,b)=>frac(a.n*b.d+b.n*a.d,a.d*b.d),neg=a=>frac(-a.n,a.d),eq=(a,b)=>a.n===b.n&&a.d===b.d;
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[ri(0,a.length-1)];
const latexF=x=>x.d===1?String(x.n):(x.n<0?'-':'')+'\\frac{'+Math.abs(x.n)+'}{'+x.d+'}';
const intPow=(b,k)=>k>=0?frac(b**k):frac(1,b**(-k));
function rootTex(base,p,q){let v=base**Math.abs(p);if(v>1000000)throw Error('large');let inner=p>=0?String(v):'\\frac{1}{'+v+'}';return q===1?inner:'\\sqrt'+(q===2?'':'['+q+']')+'{'+inner+'}'}
function valTex(b,p,q,diff){if(q===1&&p>=-3&&p<=4){let x=intPow(b,p);if(diff>=2&&x.d!==1&&x.d<=1000&&Math.random()<.25){let scaled=x.n*1000/x.d;if(Number.isInteger(scaled)){let s=(scaled/1000).toString();return s}}return latexF(x)}if(q===2&&p%2===0)return latexF(intPow(b,p/2));return rootTex(b,p,q)}
function baseTex(b,diff){if(diff===1)return String(b);let mode=ri(0,diff===2?2:3);if(mode===0)return String(b);if(mode===1)return '\\frac{1}{'+b+'}';if(mode===2)return '\\sqrt{'+(b*b)+'}';return (1/b).toString()}
function sample(diff){let b=pick(diff===1?[2,3,4,5]:[2,3,4,5,7,9]);let q=diff===1?1:pick(diff===2?[1,1,2]:[1,2,2,3]);let p=ri(-2,diff===1?4:5);if(p===0)p=2;let x=frac(p,q);return {b,p,q,x,tex:valTex(b,p,q,diff)}}
const log=(base,arg)=>'\\log_{'+base+'}'+(arg.startsWith('\\frac')||arg.startsWith('\\sqrt')?'\\left('+arg+'\\right)':'{'+arg+'}');
const clampWrong=(correct,candidates)=>{let arr=candidates.filter(x=>x&&x.d>0&&Math.abs(x.n)<10000&&x.d<1000&&!eq(x,correct));return arr.length?pick(arr):add(correct,frac(1))};
function build(id,diff,variant){let s=sample(diff),t=sample(diff),u=sample(diff),v=sample(diff),base=String(s.b),a=s.x,b=t.x,c=u.x,d=v.x,ans,wrong,tex,ex,kind=variant%3;
const other=()=>pick([frac(0),frac(1),frac(-1),frac(2)]);
switch(id){
case 1:{let bs=baseTex(s.b,diff);tex=log(bs,bs);ans=frac(1);wrong=pick([frac(0),frac(-1),frac(2)]);ex='相同的底數與真數，對數值恆為 1。';break}
case 2:{let bs=baseTex(s.b,diff);tex=log(bs,'1');ans=frac(0);wrong=pick([frac(1),frac(-1),frac(2)]);ex='任何合法底數的 0 次方都是 1。';break}
case 3:{let bs=baseTex(s.b,diff),arg=kind===0?String(t.b):kind===1?'\\frac{'+t.b+'}{'+s.b+'}':(diff===1?String(t.b*t.b):'\\sqrt{'+(t.b*t.b)+'}');let answer=kind===0?frac(t.b):kind===1?frac(t.b,s.b):frac(t.b);tex='{'+bs+'}^{'+log(bs,arg)+'}';ans=answer;wrong=clampWrong(ans,[frac(s.b),frac(t.b+s.b),frac(1),neg(ans)]);ex='利用 a^{logₐ b}=b，底數相同可直接消去。';break}
case 4:{let bs=baseTex(s.b,diff);tex=log(bs,'('+bs+')^{'+latexF(a)+'}');ans=a;wrong=clampWrong(ans,[neg(a),frac(a.d,a.n||1),add(a,frac(1))]);ex='利用 logₐ(aˣ)=x。';break}
case 5:{let x=sample(diff),y=sample(diff),z=sample(diff);let xs=[x,y,...(kind===1?[z]:[])];tex=xs.map(k=>log(String(s.b),valTex(s.b,k.p,k.q,diff))).join('+');ans=xs.reduce((r,k)=>add(r,k.x),frac(0));wrong=clampWrong(ans,[xs.reduce((r,k)=>add(r,neg(k.x)),frac(0)),add(ans,frac(1)),mul(x.x,y.x)]);ex='同底對數相加等於真數相乘後取對數；指數相加。';break}
case 6:{let xs=[s,t,...(kind===2?[u]:[])];tex=xs.map((k,i)=>log(String(s.b),valTex(s.b,k.p,k.q,diff))).join('-');ans=xs.slice(1).reduce((r,k)=>add(r,neg(k.x)),s.x);wrong=clampWrong(ans,[xs.reduce((r,k)=>add(r,k.x),frac(0)),neg(ans),add(ans,frac(1))]);ex='同底對數相減等於真數相除後取對數；指數相減。';break}
case 7:{let exponent=kind===0?frac(2):kind===1?frac(-2):frac(1,2);let arg=valTex(s.b,s.p,s.q,diff);tex=log(base,'\\left('+arg+'\\right)^{'+latexF(exponent)+'}');ans=mul(a,exponent);wrong=clampWrong(ans,[a,add(a,exponent),neg(ans)]);ex='logₐ(mᵗ)=t logₐm，先求原對數再乘指數。';break}
case 8:{let x=sample(diff),den=pick([frac(1),frac(2),frac(-1),frac(1,2)]);let cbase=kind===0?'2':kind===1?'3':'5';let arg1=valTex(Number(cbase),x.p,x.q,diff),arg2=valTex(Number(cbase),den.n,den.d,diff);tex='\\frac{'+log(cbase,arg1)+'}{'+log(cbase,arg2)+'}';ans=div(x.x,den);wrong=clampWrong(ans,[div(den,x.x),mul(x.x,den),neg(ans)]);ex='換底公式：分子與分母的對數值相除。';break}
case 9:{let m=kind===0?2:kind===1?-2:3,n=kind===0?3:kind===1?1:2;let power=mul(a,frac(n,m));tex=log('('+base+')^{'+m+'}','\\left('+s.tex+'\\right)^{'+n+'}');ans=power;wrong=clampWrong(ans,[mul(a,frac(m,n)),mul(a,frac(m)),neg(ans)]);ex='log_(a^m)(b^n)=(n/m)logₐb。';break}
case 10:{let x=pick([frac(2),frac(3),frac(-2),frac(1,2),frac(2,3)]);let bs=String(s.b),arg=valTex(s.b,x.n,x.d,diff);tex=log(bs,arg)+'\\cdot'+log(arg,bs);ans=frac(1);wrong=pick([frac(-1),frac(0),frac(2)]);ex='logₐb 與 log_ba 互為倒數，乘積為 1。';break}
case 11:{let x=pick([2,3]),y=pick([2,3]),z=pick([2,3]);let b0='2',b1=String(2**x),b2=String(2**(x*y)),b3=String(2**(x*y*z));let chain=[log(b0,b1),log(b1,b2),log(b2,b3)];if(kind===1)chain.reverse();tex=chain.join('\\cdot');ans=frac(x*y*z);wrong=clampWrong(ans,[frac(x+y+z),frac(x*y),frac(z)]);ex='連鎖換底可消去中間底數，等於 log₂('+b3+')。';break}
case 12:{let n=kind===0?2:kind===1?-1:3;tex=log('('+base+')^{'+n+'}','\\left('+s.tex+'\\right)^{'+n+'}');ans=a;wrong=clampWrong(ans,[mul(a,frac(n)),div(a,frac(n)),neg(a)]);ex='底數與真數同時取相同非零次方，對數值不變。';break}
case 13:{let k=kind===0?2:kind===1?3:-2;let aa=String(s.b),bb=String(t.b),cc=valTex(t.b,k,1,diff);tex='{'+aa+'}^{'+log(bb,cc)+'}';ans=intPow(s.b,k);wrong=clampWrong(ans,[frac(s.b*k),intPow(s.b,-k),frac(t.b**Math.abs(k))]);ex='a^(log_b c)=c^(log_b a)，且此題 log_b c='+k+'，所以結果為 '+s.b+' 的 '+k+' 次方。';break}
default:throw Error('invalid formula')}
if(Math.abs(ans.n)>5000||ans.d>1000)throw Error('too hard');if(!wrong||eq(ans,wrong))wrong=clampWrong(ans,[add(ans,frac(1)),neg(ans),frac(0)]);return {formula:id,variant:kind,prompt:tex,correct:ans,wrong,explain:ex,concept:names[id-1]};}
function generate(id,diff,variant){for(let i=0;i<120;i++){try{return build(id,diff,variant)}catch(e){}}throw Error('無法生成合法題目')}
const namesEn=['Identity: logₐ a = 1','Identity: logₐ 1 = 0','Exponential–log inverse','Logarithm–exponential inverse','Product rule','Quotient rule','Power rule','Change of base','Powers of base and argument','Reciprocal property','Chain rule','Equal powers cancellation','Logarithm–exponential exchange'];
const explanationsEn=[
'The logarithm of a number to its own base is 1.',
'Any valid base raised to the power 0 equals 1.',
'Use a^(logₐ b) = b: matching bases cancel.',
'Use logₐ(a^x) = x.',
'Use the product rule: adding logarithms with the same base adds their exponents.',
'Use the quotient rule: subtracting logarithms with the same base subtracts their exponents.',
'Use logₐ(m^t) = t · logₐ(m).',
'Use the change-of-base formula: divide the numerator logarithm by the denominator logarithm.',
'Use log_(a^m)(b^n) = (n/m) logₐ(b).',
'logₐ(b) and log_b(a) are reciprocals, so their product is 1.',
'In a chain of logarithms, the intermediate bases cancel.',
'Raising both the base and argument to the same nonzero power does not change the logarithm.',
'Use a^(log_b c) = c^(log_b a), then evaluate the resulting power.'
];
window.RM_ENGINE={names,namesEn,explanationsEn,generate,latexF,eq};
})();
