(function(){
var box=document.getElementById('q'),out=document.getElementById('hits');if(!box)return;
var data=null;fetch('search.json').then(function(r){return r.json()}).then(function(d){data=d;run()});
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function run(){if(!data)return;var q=box.value.trim().toLowerCase();if(q.length<2){out.innerHTML='';return}
var terms=q.split(/\s+/),res=[];
data.forEach(function(s){var t=s.t.toLowerCase(),x=s.x.toLowerCase(),sc=0;
terms.forEach(function(w){if(t.indexOf(w)>=0)sc+=5;var i=x.indexOf(w);if(i>=0)sc+=1+Math.min(3,x.split(w).length-1)});
if(sc>=terms.length)res.push([sc,s])});
res.sort(function(a,b){return b[0]-a[0]});
out.innerHTML=res.slice(0,40).map(function(r){var s=r[1],x=s.x,i=x.toLowerCase().indexOf(terms[0]);
var snip=x.substr(Math.max(0,i-80),240);
return '<div><a href="'+s.p+'.html#'+s.a+'">'+esc(s.t)+'</a><small>'+esc(s.p)+'</small>'+esc(snip)+'</div>'}).join('')||'<div>No match.</div>'}
box.addEventListener('input',run);})();
